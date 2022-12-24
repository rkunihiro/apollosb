import { useGetPrivateMessageQuery } from "../queries";

export function PrivateMessage(): JSX.Element {
    const { data, loading } = useGetPrivateMessageQuery();
    if (loading) {
        return <div>Loading...</div>;
    }
    if (!data || !data.privateMessage) {
        return <div>No message</div>;
    }
    return <div>{data.privateMessage}</div>;
}
