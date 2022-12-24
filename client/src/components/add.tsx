import { useState } from "react";
import { useAddLazyQuery } from "../queries";

import styles from "./add.module.scss";

export function Add(): JSX.Element {
    const [a, updateA] = useState<string>("0");
    const [b, updateB] = useState<string>("0");
    const [execAddQuery, { data, loading }] = useAddLazyQuery();

    return (
        <div className={styles["add"]}>
            <input
                type="number"
                value={a}
                onChange={({ target }) => {
                    if (/^[0-9]+$/.test(target.value)) {
                        updateA(target.value);
                    }
                }}
            />
            <span>+</span>
            <input
                type="number"
                value={b}
                onChange={({ target }) => {
                    if (/^[0-9]+$/.test(target.value)) {
                        updateB(target.value);
                    }
                }}
            />
            <button
                onClick={() => {
                    execAddQuery({
                        variables: {
                            a: parseInt(a, 10),
                            b: parseInt(b, 10),
                        },
                    }).then((...args: unknown[]) => {
                        console.log(...args);
                    });
                }}
            >
                =
            </button>
            <span>{loading ? "(loading)" : !data ? "" : data.add}</span>
        </div>
    );
}
