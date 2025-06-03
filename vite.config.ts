import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import basicSsl from "@vitejs/plugin-basic-ssl";

import path from "path";



// basicSsl()
// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            "@Turtle": path.resolve(__dirname, "src/Turtle"),
            "@TurtleApp": path.resolve(__dirname, "src/TurtleApp"),
        },
    },

    plugins: [react()],
    build: {
        outDir: "build",
        target: "es2017",
    },
    clearScreen: false,
    server: {
        strictPort: true,
        port: 3000,
        host: "0.0.0.0",
        proxy: {
            "/api": "http://127.0.0.1:8080",
            "/my.io": {
                target: `ws://localhost:8080`,
                ws: true,
            },
        },
    },
});
