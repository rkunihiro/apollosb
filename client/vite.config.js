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
    // esbuild: false,
    esbuild: {
        platform: "browser",
        target: [
            //
            "chrome96",
            "safari15",
        ],
        define: {
            "process.env.NODE_ENV": '"production"',
        },
    },
    server: {
        port: 8080,
        host: "0.0.0.0",
        // strictPort: true,
        // open: true,
    },
    build: {
        minify: "esbuild",
        // minify: "terser",
        // minify: false,
        sourcemap: true,
        copyPublicDir: true,
    },
    preview: {
        port: 8080,
        strictPort: true,
    },
});

export default config;
