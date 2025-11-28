/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.js",
        "./resources/**/*.jsx",
        "./resources/**/*.vue",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                // Brand Color Palette
                "primary-bg": "#07070a", // Near-black background
                surface: "#0f1115", // Cards/surface background
                "primary-blue": "#1B82F4", // Main accent blue
                "accent-cyan": "#00D1FF", // Glow effects cyan
                "subtle-highlight": "#22313f", // Muted highlights
                "primary-text": "#E6EEF6", // Soft white text
                "muted-text": "#9AA7B2", // Muted text color

                // Additional semantic colors
                success: "#10B981",
                warning: "#F59E0B",
                error: "#EF4444",
                info: "#3B82F6",
            },
            fontFamily: {
                // Headings - Serif (mysterious)
                heading: ["Cinzel", "Cormorant Garamond", "serif"],

                // Body - Sans (readable)
                body: ["Inter", "Nunito Sans", "sans-serif"],

                // Default sans-serif override
                sans: ["Inter", "Nunito Sans", "system-ui", "sans-serif"],
            },
            fontSize: {
                // Responsive heading sizes
                hero: [
                    "3.5rem",
                    { lineHeight: "1.1", letterSpacing: "-0.02em" },
                ], // 56px
                display: [
                    "4.5rem",
                    { lineHeight: "1", letterSpacing: "-0.03em" },
                ], // 72px
                "2xl": [
                    "2rem",
                    { lineHeight: "1.2", letterSpacing: "-0.01em" },
                ], // 32px
                "3xl": [
                    "2.5rem",
                    { lineHeight: "1.2", letterSpacing: "-0.01em" },
                ], // 40px
            },
            spacing: {
                18: "4.5rem", // 72px
                88: "22rem", // 352px
                100: "25rem", // 400px
                112: "28rem", // 448px
            },
            maxWidth: {
                container: "1200px",
            },
            borderRadius: {
                xl: "12px",
                "2xl": "16px",
                "3xl": "24px",
            },
            boxShadow: {
                "glow-sm": "0 0 10px rgba(27, 130, 244, 0.3)",
                glow: "0 0 20px rgba(27, 130, 244, 0.4)",
                "glow-lg": "0 0 30px rgba(27, 130, 244, 0.5)",
                "cyan-glow": "0 0 20px rgba(0, 209, 255, 0.4)",
                card: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                "card-hover":
                    "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            },
            animation: {
                "fade-in": "fadeIn 0.5s ease-in-out",
                "slide-up": "slideUp 0.5s ease-out",
                "slide-down": "slideDown 0.3s ease-out",
                "scale-in": "scaleIn 0.3s ease-out",
                "glow-pulse": "glowPulse 2s ease-in-out infinite",
                "meteor-trail": "meteorTrail 3s linear infinite",
                float: "float 3s ease-in-out infinite",
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                slideUp: {
                    "0%": { transform: "translateY(20px)", opacity: "0" },
                    "100%": { transform: "translateY(0)", opacity: "1" },
                },
                slideDown: {
                    "0%": { transform: "translateY(-20px)", opacity: "0" },
                    "100%": { transform: "translateY(0)", opacity: "1" },
                },
                scaleIn: {
                    "0%": { transform: "scale(0.9)", opacity: "0" },
                    "100%": { transform: "scale(1)", opacity: "1" },
                },
                glowPulse: {
                    "0%, 100%": {
                        boxShadow: "0 0 20px rgba(27, 130, 244, 0.4)",
                    },
                    "50%": { boxShadow: "0 0 30px rgba(27, 130, 244, 0.6)" },
                },
                meteorTrail: {
                    "0%": {
                        transform: "translateX(-100px) translateY(-100px)",
                        opacity: "0",
                    },
                    "10%": { opacity: "1" },
                    "90%": { opacity: "1" },
                    "100%": {
                        transform: "translateX(100px) translateY(100px)",
                        opacity: "0",
                    },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-10px)" },
                },
            },
            backdropBlur: {
                xs: "2px",
            },
            zIndex: {
                60: "60",
                70: "70",
                80: "80",
                90: "90",
                100: "100",
            },
        },
    },
    plugins: [
        // Add custom utilities
        function ({ addUtilities }) {
            const newUtilities = {
                ".text-gradient": {
                    background:
                        "linear-gradient(135deg, #1B82F4 0%, #00D1FF 100%)",
                    "-webkit-background-clip": "text",
                    "-webkit-text-fill-color": "transparent",
                    "background-clip": "text",
                },
                ".bg-gradient-primary": {
                    background:
                        "linear-gradient(135deg, #1B82F4 0%, #00D1FF 100%)",
                },
                ".bg-gradient-dark": {
                    background:
                        "linear-gradient(135deg, #07070a 0%, #0f1115 100%)",
                },
                ".scrollbar-thin": {
                    "scrollbar-width": "thin",
                    "scrollbar-color": "#1B82F4 #0f1115",
                },
                ".scrollbar-thin::-webkit-scrollbar": {
                    width: "6px",
                },
                ".scrollbar-thin::-webkit-scrollbar-track": {
                    background: "#0f1115",
                },
                ".scrollbar-thin::-webkit-scrollbar-thumb": {
                    background: "#1B82F4",
                    "border-radius": "3px",
                },
                ".scrollbar-thin::-webkit-scrollbar-thumb:hover": {
                    background: "#00D1FF",
                },
            };
            addUtilities(newUtilities);
        },
    ],
};
