import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { createPersistedQueryLink } from "@apollo/client/link/persisted-queries";
import { fetch } from "cross-fetch";
import { sha256 } from "crypto-hash";

const persistedQueryLink = createPersistedQueryLink({
    sha256,
    useGETForHashedQueries: true,
});

const httpLink = new HttpLink({
    uri: "http://localhost:3000/graphql",
    // fetch,
    fetch: (input: RequestInfo | URL, init?: RequestInit) => {
        // dump raw fetch args
        console.debug({ input, init });
        return fetch(input, init);
    },
});

export const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: persistedQueryLink.concat(httpLink),
});
