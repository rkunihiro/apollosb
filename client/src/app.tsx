import { ApolloProvider } from "@apollo/client";

import { client } from "./client";
import { Add } from "./components/add";
import { ClearButton, RefetchButton } from "./components/button";
import { Message } from "./components/message";
import { Now } from "./components/now";
import { PrivateMessage } from "./components/privateMessage";

export function App(): JSX.Element {
    return (
        <ApolloProvider client={client}>
            <Message />
            <PrivateMessage />
            <Now />
            <div>
                <RefetchButton />
                <ClearButton />
            </div>
            <Add />
        </ApolloProvider>
    );
}

export default App;
