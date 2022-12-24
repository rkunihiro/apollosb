import { useLazyQuery, useQuery } from "@apollo/client";
import { gql } from "graphql-tag";

export const getCurrentDateQuery = gql`
    query getCurrentDate {
        now
    }
`;

export const getMessageQuery = gql`
    query getMessage {
        message
    }
`;

export const getPrivateMessageQuery = gql`
    query getPrivateMessage {
        privateMessage
    }
`;

export const getAddQuery = gql`
    query getAdd($a: Int!, $b: Int!) {
        add(a: $a, b: $b)
    }
`;

interface GetCurrentDateQueryResult {
    now: string;
}

interface GetMessageQueryResult {
    message: string;
}

interface GetPrivateMessageQueryResult {
    privateMessage: string;
}

interface GetAddQueryResult {
    add: number;
}

export const useGetCurrentDateQuery = () => useQuery<GetCurrentDateQueryResult>(getCurrentDateQuery);

export const useGetMessageQuery = () => useQuery<GetMessageQueryResult>(getMessageQuery);

export const useGetPrivateMessageQuery = () => useQuery<GetPrivateMessageQueryResult>(getPrivateMessageQuery);

export const useAddQuery = () => useQuery<GetAddQueryResult>(getAddQuery);
export const useAddLazyQuery = () => useLazyQuery<GetAddQueryResult>(getAddQuery);
