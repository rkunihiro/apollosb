import { useGetMessageQuery } from "../queries";

export function Message(): JSX.Element {
    const { data, loading } = useGetMessageQuery();
    if (loading) {
        return <div>Loading...</div>;
    }
    if (!data || !data.message) {
        return <div>No message</div>;
    }
    return <div>{data.message}</div>;
}
