import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig(({ command, mode }) => {
    const isProduction = mode === "production";

    return {
        plugins: [
            laravel({
                input: ["resources/css/app.css", "resources/js/app.jsx"],
                refresh: true,
            }),
            react(),
            tailwindcss(),

            // Bundle analyzer (only in build)
            command === "build" &&
                visualizer({
                    filename: "dist/bundle-analysis.html",
                    open: false,
                    gzipSize: true,
                    brotliSize: true,
                }),
        ].filter(Boolean),

        resolve: {
            alias: {
                "@": "/resources/js/src",
            },
        },

        // Performance optimizations
        build: {
            // Target modern browsers for smaller bundles
            target: "es2020",

            // Optimize chunks
            rollupOptions: {
                output: {
                    // Manual chunk splitting for better caching
                    manualChunks: {
                        // Vendor chunks
                        "react-vendor": [
                            "react",
                            "react-dom",
                            "react-router-dom",
                        ],
                    },

                    // Optimize chunk naming
                    chunkFileNames: (chunkInfo) => {
                        const name = chunkInfo.name.toLowerCase();
                        return `js/${name}-[hash].js`;
                    },

                    assetFileNames: (assetInfo) => {
                        const extType = assetInfo.name.split(".").pop();
                        if (["css"].includes(extType)) {
                            return `css/[name]-[hash].[ext]`;
                        }
                        if (
                            [
                                "png",
                                "jpg",
                                "jpeg",
                                "gif",
                                "svg",
                                "webp",
                            ].includes(extType)
                        ) {
                            return `images/[name]-[hash].[ext]`;
                        }
                        return `assets/[name]-[hash].[ext]`;
                    },
                },

                // External dependencies (for CDN loading if needed)
                external: isProduction ? [] : [],
            },

            // Enable source maps in development only
            sourcemap: !isProduction,

            // Minification options
            minify: isProduction ? "terser" : false,
            terserOptions: isProduction
                ? {
                      compress: {
                          drop_console: true,
                          drop_debugger: true,
                          pure_funcs: ["console.log", "console.debug"],
                      },
                      mangle: {
                          safari10: true,
                      },
                      format: {
                          comments: false,
                      },
                  }
                : undefined,

            // Chunk size warnings
            chunkSizeWarningLimit: 500,

            // CSS optimization
            cssCodeSplit: true,

            // Asset inlining threshold
            assetsInlineLimit: 4096, // 4KB
        },

        // Development server optimizations
        server: {
            warmup: {
                // Pre-warm frequently used modules
                clientFiles: [
                    "resources/js/src/components/**/*.jsx",
                    "resources/js/src/pages/**/*.jsx",
                    "resources/js/src/hooks/**/*.js",
                ],
            },
        },

        // Dependency optimization
        optimizeDeps: {
            include: ["react", "react-dom", "react-router-dom"],
            exclude: [
                // Large libraries that should be loaded lazily
            ],
        },

        // CSS optimization
        css: {
            devSourcemap: !isProduction,
        },

        // Experimental features
        experimental: {
            renderBuiltUrl(filename, { hostType }) {
                if (hostType === "js") {
                    // Use relative URLs for better CDN compatibility
                    return { relative: true };
                }
                return { relative: true };
            },
        },
    };
});
