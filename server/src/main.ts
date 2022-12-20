import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginCacheControl } from "@apollo/server/plugin/cacheControl";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { startStandaloneServer } from "@apollo/server/standalone";
import { gql } from "graphql-tag";

const typeDefs = gql`
    enum CacheControlScope {
        PUBLIC
        PRIVATE
    }

    directive @cacheControl(
        maxAge: Int
        scope: CacheControlScope
        inheritMaxAge: Boolean
    ) on FIELD_DEFINITION | OBJECT | INTERFACE | UNION

    type Query {
        "Message"
        message: String

        "Current date time"
        now: String @cacheControl(maxAge: 0)
    }

    schema {
        query: Query
    }
`;

const resolvers = {
    Query: {
        message() {
            return "Hello,World!";
        },
        now() {
            return new Date().toISOString();
        },
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    cache: "bounded",
    introspection: true,
    plugins: [
        //
        ApolloServerPluginCacheControl({ defaultMaxAge: 60 }),
        ApolloServerPluginLandingPageLocalDefault(),
    ],
    // persistedQueries: { ttl: 60 },
});

(async (port = 3000) => {
    const { url } = await startStandaloneServer(server, {
        listen: { port, path: "/graphql" },
    });
    console.log(`🚀 Start server ${url}`);
})();
