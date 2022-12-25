import { startStandaloneServer } from "@apollo/server/standalone";

import { RedisKeyValueCache } from "./cache";
import { JsonLogger } from "./logger";
import { createGraphQLServer } from "./server";

(async (port = 3000) => {
    const cache = new RedisKeyValueCache(process.env["REDIS_URL"] ?? "redis://localhost:6379");
    const logger = new JsonLogger();
    const server = createGraphQLServer({ cache, logger });
    const { url } = await startStandaloneServer(server, {
        listen: { port, path: "/graphql" },
    });
    logger.log(`🚀 Start server ${url}`);
})();
