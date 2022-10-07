import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path"


export default defineConfig({
    resolve: { alias: { '@': '/src' } },
    plugins: [vue()],
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@import "@/assets/scss/main.scss";`,
            },
        },
        devSourcemap: true,
    },

})