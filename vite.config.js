import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig(({ command, mode }) => {
    // const isProduction = mode === "production";

    return {
        plugins: [
            laravel({
                input: ["resources/css/app.css", "resources/js/app.jsx"],
                refresh: true,
            }),
            react(),
            tailwindcss(),

            /* PHASE 6 PERFORMANCE OPTIMIZATIONS - COMMENTED OUT
            // Bundle analyzer (only in build)
            command === "build" &&
                visualizer({
                    filename: "dist/bundle-analysis.html",
                    open: false,
                    gzipSize: true,
                    brotliSize: true,
                }),
            */
        ].filter(Boolean),

        resolve: {
            alias: {
                "@": "/resources/js/src",
            },
        },

        /* PHASE 6 PERFORMANCE OPTIMIZATIONS - COMMENTED OUT */
    };
});
