import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import path from "path"


export default defineConfig({
    resolve: { alias: { '@': '/src' } },
    plugins: [
        vue(),
        createSvgIconsPlugin({
            iconDirs: [path.resolve(process.cwd(), "src/assets/svg")],
            symbolId: "icon-[dir]-[name]",
            customDomId: "spritesheet",
        }),
    ],
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@import "@/assets/scss/main.scss";`,
            },
        },
        devSourcemap: true,
    },
    base: "./"

})

/*export default defineConfig(({ command, mode }) => {
    const env = loadEnv(mode, process.cwd(), "");

    return {
        base: command === "serve" ? "" : "/dist/",
        build: {
            manifest: true,
            outDir: "../dist/",
            rollupOptions: {
                input: {
                    app: "./src/main.js",
                },
            },
        },
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `@import "@assets/scss/main.scss";`,
                },
            },
            devSourcemap: true,
        },
        envDir: "",
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"),
                "@assets": path.resolve(__dirname, "./src/assets"),
                "@templates": path.resolve(__dirname, "./src/templates"),
                "@layout": path.resolve(__dirname, "./src/templates/layout"),
                "@components": path.resolve(__dirname, "./src/templates/components"),
                "@objects": path.resolve(__dirname, "./src/templates/objects"),
                "@views": path.resolve(__dirname, "./src/templates/views"),
            },
        },
        plugins: [
            vue(),
            createSvgIconsPlugin({
                iconDirs: [path.resolve(process.cwd(), "src/assets/svg")],
                symbolId: "icon-[dir]-[name]",
                customDomId: "spritesheet",
            }),
        ],
        optimizeDeps: {
            include: ["vue", "vue-router"],
            exclude: [],
        },
    };
});
 */