import { createRoot } from "react-dom/client";

import { App } from "./app";

function onLoad() {
    const container = document.getElementById("container");
    if (container) {
        createRoot(container).render(<App />);
    }
}

addEventListener("load", onLoad);
