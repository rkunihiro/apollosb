import { gql } from "graphql-tag";

export const typeDefs = gql`
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
        message: String @cacheControl(maxAge: 180)

        "Private message"
        privateMessage: String @cacheControl(maxAge: 60, scope: PRIVATE)

        "Current date time"
        now: String @cacheControl(maxAge: 0)

        "Compute add"
        add(a: Int!, b: Int!): Int @cacheControl(maxAge: 60)
    }

    schema {
        query: Query
    }
`;

export const resolvers = {
    Query: {
        message() {
            return `Public message ${new Date().toISOString()}`;
        },

        privateMessage() {
            return `Private message ${new Date().toISOString()}`;
        },

        now() {
            return new Date().toISOString();
        },

        add(_parent: unknown, args: { a: number; b: number }) {
            return args.a + args.b;
        },
    },
};
