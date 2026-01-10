import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";

import path from "path";


// basicSsl()
// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            "@Turtle": path.resolve(__dirname, "src/Turtle"),
            "@TurtleData": path.resolve(__dirname, "src/TurtleData"),
            "@TurtleApp": path.resolve(__dirname, "src/TurtleApp"),
            "@TurtleCrm": path.resolve(__dirname, "src/TurtleCrm"),
            "@TurtleSecurity": path.resolve(__dirname, "src/TurtleSecurity"),
            "@TurtlePostman": path.resolve(__dirname, "src/TurtlePostman"),
            "@TurtleChat": path.resolve(__dirname, "src/TurtleChat"),
            "@TurtleSim": path.resolve(__dirname, "src/TurtleSim"),
            "@TurtleBlueprints": path.resolve(__dirname, "src/TurtleBlueprints"),
            "@NavBar": path.resolve(__dirname, "src/NavBar"),
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
            "/turtleio": {
                target: `ws://localhost:8080`,
                ws: true,
            },
        },
    },
});
