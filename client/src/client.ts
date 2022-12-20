import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { createPersistedQueryLink } from "@apollo/client/link/persisted-queries";
import { fetch } from "cross-fetch";
import { sha256 } from "crypto-hash";

const uri = "http://localhost:3000/graphql";

const httpLink = new HttpLink({
    uri,
    // fetch,
    fetch: (input: RequestInfo | URL, init?: RequestInit) => {
        // dump raw fetch args
        console.debug({ input, init });
        return fetch(input, init);
    },
});

const persistedQueryLink = createPersistedQueryLink({
    sha256,
    useGETForHashedQueries: true,
});

const link = persistedQueryLink.concat(httpLink);

const cache = new InMemoryCache();

export const client = new ApolloClient({ cache, link });
