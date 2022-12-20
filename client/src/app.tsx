import { ApolloProvider } from "@apollo/client";

import { client } from "./client";
import { Message } from "./components/message";
import { Now } from "./components/now";

export function App(): JSX.Element {
    return (
        <ApolloProvider client={client}>
            <Message />
            <Now />
        </ApolloProvider>
    );
}
