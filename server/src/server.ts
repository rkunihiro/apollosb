import { ApolloServer } from "@apollo/server";
// import ApolloServerPluginResponseCache from "@apollo/server-plugin-response-cache";
import { ApolloServerPluginCacheControl } from "@apollo/server/plugin/cacheControl";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";

import type { KeyValueCache } from "@apollo/utils.keyvaluecache";
import type { Logger } from "@apollo/utils.logger";

import { resolvers, typeDefs } from "./schema";

interface CreateServerOptions {
    cache: KeyValueCache;
    logger?: Logger;
}

export function createGraphQLServer({ cache, logger = console }: CreateServerOptions): ApolloServer {
    return new ApolloServer({
        cache: "bounded",
        logger,

        introspection: true,
        plugins: [
            ApolloServerPluginCacheControl({ defaultMaxAge: 60 }),
            // ApolloServerPluginResponseCache({ cache }),
            ApolloServerPluginLandingPageLocalDefault(),
            {
                async requestDidStart(context) {
                    const { operationName, query, variables } = context?.request;
                    if (operationName !== "IntrospectionQuery") {
                        logger.info({ time: new Date().toISOString(), operationName, query, variables });
                    }
                },
            },
        ],
        persistedQueries: { cache },
        stopOnTerminationSignals: true,

        typeDefs,
        resolvers,
    });
}
