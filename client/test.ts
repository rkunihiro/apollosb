import { gql } from "graphql-tag";

import { client } from "./client";

async function main() {
    const result = await client.query({
        query: gql`
            query getMessage {
                message
            }
        `,
    });
    console.log(result);
}

if (require.main === module) {
    main();
}
