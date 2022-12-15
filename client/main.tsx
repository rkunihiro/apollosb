import { ApolloProvider, useQuery } from "@apollo/client";
import { gql } from "graphql-tag";
import { createRoot } from "react-dom/client";

import { client } from "./client";

const getMessageQuery = gql`
    query getMessage {
        message
    }
`;

function Message() {
    const { data, loading } = useQuery<{ message?: string }>(getMessageQuery);
    if (loading) {
        return <div>Loading...</div>;
    }
    if (!data || !data.message) {
        return <div>No message</div>;
    }
    return <div>{data.message}</div>;
}

function App() {
    return (
        <ApolloProvider client={client}>
            <Message />
        </ApolloProvider>
    );
}

function onLoad() {
    const container = document.getElementById("container");
    if (container) {
        createRoot(container).render(<App />);
    }
}

addEventListener("load", onLoad);
