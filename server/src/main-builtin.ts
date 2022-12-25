import { createServer } from "node:http";

import { HTTPGraphQLRequest } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

// import { RedisKeyValueCache } from "./cache";
import { MemoryKeyValueCache } from "./cache";
import { JsonLogger } from "./logger";
import { createGraphQLServer } from "./server";

(async (port = 3000) => {
    // const cache = new RedisKeyValueCache(process.env["REDIS_URL"] ?? "redis://localhost:6379");
    const cache = new MemoryKeyValueCache();
    const logger = new JsonLogger();

    const server = createGraphQLServer({ cache, logger });

    const httpServer = createServer(async (req, res) => {
        // Parse request
        const { method, url, headers } = req;
        const { search } = new URL(url ?? `http://${headers.host}`, `http://${headers.host}`);
        const body = await new Promise<string | object>((resolve) => {
            let buf = "";
            req.on("data", (chunk) => {
                if (chunk) {
                    buf += chunk;
                }
            });
            req.on("end", () => {
                if (/application\/json/.test(headers["content-type"] as string)) {
                    resolve(JSON.parse(buf));
                } else {
                    resolve(buf);
                }
            });
        });

        const headersMap = new Map<string, string>();
        for (const k in headers) {
            const v = headers[k];
            if (Array.isArray(v)) {
                headersMap.set(k, v.join("; "));
            }
            if (typeof v === "string") {
                headersMap.set(k, v);
            }
        }
        const httpGraphQLRequest: HTTPGraphQLRequest = {
            method: method ? method.toUpperCase() : "GET",
            headers: headersMap,
            search,
            body,
        };

        // Execute server
        const result = await server.executeHTTPGraphQLRequest({ httpGraphQLRequest, context: async () => ({}) });

        // Response
        for (const [k, v] of result.headers) {
            res.setHeader(k, v);
        }
        res.writeHead(200, "OK");
        if (result.body.kind === "complete") {
            res.write(result.body.string, () => {
                res.end();
            });
        }
        if (result.body.kind === "chunked") {
            for await (const chunk of result.body.asyncIterator) {
                await new Promise<void>((resolve) =>
                    res.write(chunk, () => {
                        resolve();
                    }),
                );
            }
            res.end();
        }
    });

    server.addPlugin(ApolloServerPluginDrainHttpServer({ httpServer }));

    await server.start();
    logger.log("start GraphQL server");

    await new Promise<void>((resolve) => {
        httpServer.listen(port, resolve);
    });
    logger.log("start server");
})();
