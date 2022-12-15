import pluginReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

/** @type {import("vite").UserConfig} */
const config = defineConfig({
    root: __dirname,
    base: "/",
    publicDir: "public",
    cacheDir: ".vite",
    plugins: [
        //
        pluginReact(),
    ],
    esbuild: {
        platform: "browser",
        target: [
            //
            "chrome96",
            "safari15",
        ],
    },
    build: {
        minify: "esbuild",
        // minify: false,
    },
});

export default config;
