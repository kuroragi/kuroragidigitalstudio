import React from "react";
import Hero from "./Hero";
import { MeteorPresets } from "../animations";

/**
 * Hero Variants for different pages/purposes
 */

// Homepage Hero - Full featured with parallax
export const HomeHero = (props) => (
    <Hero
        title="Shaping Ideas Into Digital Mastery"
        subtitle="Premium digital solutions crafted with precision, innovation, and uncompromising quality for forward-thinking businesses."
        ctaPrimary={{ text: "Explore Our Work", link: "/portfolio" }}
        ctaSecondary={{ text: "Get In Touch", link: "/contact" }}
        meteorPreset="standard"
        enableParallax={true}
        showScrollIndicator={true}
        {...props}
    />
);

// About Hero - Focused on company story
export const AboutHero = (props) => (
    <Hero
        title="Crafting Digital Excellence Since Day One"
        subtitle="We are Kuroragi Digital Studio - a team of passionate developers, designers, and strategists dedicated to transforming your vision into digital reality."
        ctaPrimary={{ text: "Our Story", link: "#story" }}
        ctaSecondary={{ text: "Meet The Team", link: "#team" }}
        meteorPreset="subtle"
        enableParallax={true}
        showScrollIndicator={true}
        {...props}
    />
);

// Services Hero - Focus on capabilities
export const ServicesHero = (props) => (
    <Hero
        title="Digital Solutions That Drive Results"
        subtitle="From web development to digital strategy, we deliver comprehensive solutions tailored to your business needs and growth objectives."
        ctaPrimary={{ text: "View Services", link: "#services" }}
        ctaSecondary={{ text: "Request Quote", link: "/contact" }}
        meteorPreset="standard"
        enableParallax={true}
        showScrollIndicator={true}
        {...props}
    />
);

// Portfolio Hero - Showcase focus
export const PortfolioHero = (props) => (
    <Hero
        title="Exceptional Work Speaks For Itself"
        subtitle="Discover our portfolio of successful projects, innovative solutions, and satisfied clients across various industries and technologies."
        ctaPrimary={{ text: "Browse Portfolio", link: "#portfolio" }}
        ctaSecondary={{ text: "Start Your Project", link: "/contact" }}
        meteorPreset="intense"
        enableParallax={true}
        showScrollIndicator={true}
        {...props}
    />
);

// Blog Hero - Content focus
export const BlogHero = (props) => (
    <Hero
        title="Insights & Innovation"
        subtitle="Stay ahead with our latest thoughts on technology, design trends, development best practices, and industry insights."
        ctaPrimary={{ text: "Latest Articles", link: "#articles" }}
        ctaSecondary={{ text: "Subscribe", link: "#subscribe" }}
        meteorPreset="subtle"
        enableParallax={true}
        showScrollIndicator={true}
        {...props}
    />
);

// Contact Hero - Action oriented
export const ContactHero = (props) => (
    <Hero
        title="Let's Build Something Amazing Together"
        subtitle="Ready to transform your ideas into digital reality? Get in touch and let's discuss how we can help you achieve your goals."
        ctaPrimary={{ text: "Send Message", link: "#contact-form" }}
        ctaSecondary={{ text: "Schedule Call", link: "#schedule" }}
        meteorPreset="standard"
        enableParallax={true}
        showScrollIndicator={true}
        {...props}
    />
);

// Minimal Hero - Simple content pages
export const MinimalHero = ({
    title = "Page Title",
    subtitle = "Page description goes here.",
    ...props
}) => (
    <div className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-primary-bg to-gray-900">
        <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full bg-gradient-to-br from-primary-blue/10 to-accent-cyan/10"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-cinzel font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {title}
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
                {subtitle}
            </p>
        </div>
    </div>
);

// Error Hero - 404 pages etc
export const ErrorHero = ({
    title = "404",
    subtitle = "Page not found",
    errorCode = "404",
    ...props
}) => (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-bg via-gray-900 to-black">
        <div className="absolute inset-0 opacity-10">
            <MeteorCanvas {...MeteorPresets.minimal} />
        </div>

        <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
            <div className="text-8xl md:text-9xl font-cinzel font-bold text-primary-blue/50 mb-4">
                {errorCode}
            </div>
            <h1 className="text-3xl md:text-5xl font-cinzel font-bold mb-6 text-white">
                {title}
            </h1>
            <p className="text-lg text-gray-400 mb-8">{subtitle}</p>
            <div className="flex gap-4 justify-center">
                <a
                    href="/"
                    className="px-6 py-3 bg-primary-blue hover:bg-accent-cyan text-white rounded-lg transition-colors duration-300"
                >
                    Go Home
                </a>
                <button
                    onClick={() => window.history.back()}
                    className="px-6 py-3 border border-gray-600 hover:border-white text-gray-300 hover:text-white rounded-lg transition-colors duration-300"
                >
                    Go Back
                </button>
            </div>
        </div>
    </div>
);

/**
 * Hero Configuration Presets
 */
export const HeroConfigs = {
    // Performance optimized for mobile
    mobile: {
        meteorPreset: "minimal",
        enableParallax: false,
        showScrollIndicator: false,
    },

    // High performance for desktop
    desktop: {
        meteorPreset: "standard",
        enableParallax: true,
        showScrollIndicator: true,
    },

    // Accessibility focused
    accessible: {
        meteorPreset: "minimal",
        enableParallax: false,
        showScrollIndicator: true,
    },

    // Maximum visual impact
    showcase: {
        meteorPreset: "intense",
        enableParallax: true,
        showScrollIndicator: true,
    },
};

/**
 * Responsive Hero Hook
 * Automatically adjusts hero settings based on device capabilities
 */
export const useResponsiveHero = () => {
    const [config, setConfig] = React.useState(HeroConfigs.desktop);

    React.useEffect(() => {
        const updateConfig = () => {
            const isMobile = window.innerWidth < 768;
            const prefersReducedMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;
            const isLowEnd =
                navigator.hardwareConcurrency < 4 || navigator.deviceMemory < 4;

            if (prefersReducedMotion || isLowEnd) {
                setConfig(HeroConfigs.accessible);
            } else if (isMobile) {
                setConfig(HeroConfigs.mobile);
            } else {
                setConfig(HeroConfigs.desktop);
            }
        };

        updateConfig();
        window.addEventListener("resize", updateConfig);

        return () => window.removeEventListener("resize", updateConfig);
    }, []);

    return config;
};

export default Hero;
