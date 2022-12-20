import { analyzeMetafile, build, BuildOptions } from "esbuild";

const options: BuildOptions = {
    entryPoints: {
        main: "./src/main.ts",
    },
    outdir: "./dist",

    format: "cjs",
    platform: "node",
    target: "node16",
    tsconfig: "./tsconfig.json",

    bundle: true,
    minify: true,
    keepNames: true,
    sourcemap: true,
    metafile: true,

    external: [],
    define: {
        "process.env.NODE_ENV": '"production"',
    },
};

(async () => {
    const { metafile } = await build(options);
    if (metafile) {
        const result = await analyzeMetafile(metafile);
        console.log(result);
    }
})();
