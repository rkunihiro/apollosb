import { startStandaloneServer } from "@apollo/server/standalone";

import { server } from "./server";

(async (port = 3000) => {
    const { url } = await startStandaloneServer(server, {
        listen: { port, path: "/graphql" },
    });
    console.log(`🚀 Start server ${url}`);
})();
