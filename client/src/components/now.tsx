import { useQuery } from "@apollo/client";
import { gql } from "graphql-tag";

const getCurrentDateQuery = gql`
    query getCurrentDate {
        now
    }
`;

export function Now(): JSX.Element | null {
    const { data, loading } = useQuery<{ now: string }>(getCurrentDateQuery);
    if (loading) {
        return <div>Loading...</div>;
    }
    if (!data || !data.now) {
        return null;
    }
    return <div>{data.now}</div>;
}
