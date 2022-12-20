import { useQuery } from "@apollo/client";
import { gql } from "graphql-tag";

const getMessageQuery = gql`
    query getMessage {
        message
    }
`;

export function Message(): JSX.Element {
    const { data, loading } = useQuery<{ message?: string }>(getMessageQuery);
    if (loading) {
        return <div>Loading...</div>;
    }
    if (!data || !data.message) {
        return <div>No message</div>;
    }
    return <div>{data.message}</div>;
}
