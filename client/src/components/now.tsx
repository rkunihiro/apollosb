import { useGetCurrentDateQuery } from "../queries";

export function Now(): JSX.Element | null {
    const { data, loading } = useGetCurrentDateQuery();
    if (loading) {
        return <div>Loading...</div>;
    }
    if (!data || !data.now) {
        return null;
    }
    return <div>{data.now}</div>;
}
