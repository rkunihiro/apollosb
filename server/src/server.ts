import { ApolloServer } from "@apollo/server";
// import ApolloServerPluginResponseCache from "@apollo/server-plugin-response-cache";
import { ApolloServerPluginCacheControl } from "@apollo/server/plugin/cacheControl";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";

import { cache } from "./redis";
import { resolvers, typeDefs } from "./schema";

export const server = new ApolloServer({
    cache: "bounded",
    logger: console,

    introspection: true,
    plugins: [
        ApolloServerPluginCacheControl({ defaultMaxAge: 60 }),
        // ApolloServerPluginResponseCache({ cache }),
        ApolloServerPluginLandingPageLocalDefault(),
        {
            async requestDidStart(context) {
                const { operationName, query, variables } = context?.request;
                console.log(JSON.stringify({ time: new Date().toISOString(), operationName, query, variables }));
            },
        },
    ],
    persistedQueries: { cache },
    stopOnTerminationSignals: true,

    typeDefs,
    resolvers,
});
