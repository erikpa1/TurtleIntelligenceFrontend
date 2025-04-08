import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import basicSsl from "@vitejs/plugin-basic-ssl";

import path from "path";

// basicSsl()
// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            "@css": path.resolve(__dirname, "src/css"),
            "@api": path.resolve(__dirname, "src/api"),
            "@shared": path.resolve(__dirname, "src/shared"),
            "@dt": path.resolve(__dirname, "src/dt"),
            "@assets": path.resolve(__dirname, "src/data/assets"),
            "@commands": path.resolve(__dirname, "src/commands"),
            "@data": path.resolve(__dirname, "src/data"),
            "@external": path.resolve(__dirname, "src/external"),
            "@components": path.resolve(__dirname, "src/components"),
            "@app-gui": path.resolve(__dirname, "src/app-gui"),
            "@uitoolkit": path.resolve(__dirname, "src/uitoolkit"),
        },
    },

    plugins: [react(),],
    build: {
        outDir: "build",
    },
    clearScreen: false,
    server: {
        strictPort: true,
        port: 3000,
        host: "0.0.0.0",
        proxy: {
            "/api": "http://127.0.0.1:8080",
            "/.auth/": "http://127.0.0.1:8080",
        },
    },
});
