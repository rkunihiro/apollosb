import { useApolloClient } from "@apollo/client";
import { useCallback, useState } from "react";
import { getCurrentDateQuery, getMessageQuery, getPrivateMessageQuery } from "../queries";

interface Props {
    title?: string;
}

export function RefetchButton({ title = "refetch" }: Props): JSX.Element {
    const [disabled, setDisabled] = useState<boolean>(false);
    const client = useApolloClient();

    const onClick = useCallback(() => {
        console.log("button click");
        (async () => {
            await client.refetchQueries({
                include: [
                    //
                    getMessageQuery,
                    getPrivateMessageQuery,
                    getCurrentDateQuery,
                ],
            });
            setDisabled(() => false);
        })();
        setDisabled(() => true);
    }, []);

    return (
        <button type="button" onClick={onClick} disabled={disabled ? true : undefined}>
            {disabled ? "loading..." : title}
        </button>
    );
}

export function ClearButton({ title = "clear" }: Props): JSX.Element {
    const [disabled, setDisabled] = useState<boolean>(false);
    const client = useApolloClient();

    const onClick = useCallback(() => {
        console.log("button click");
        (async () => {
            await client.clearStore();
            setDisabled(() => false);
        })();
        setDisabled(() => true);
    }, []);

    return (
        <button type="button" onClick={onClick} disabled={disabled ? true : undefined}>
            {disabled ? "loading..." : title}
        </button>
    );
}
