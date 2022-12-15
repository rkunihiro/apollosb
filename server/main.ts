import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginCacheControl } from "@apollo/server/plugin/cacheControl";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { startStandaloneServer } from "@apollo/server/standalone";
import { gql } from "graphql-tag";

const typeDefs = gql`
    type Query {
        "Message"
        message: String
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
