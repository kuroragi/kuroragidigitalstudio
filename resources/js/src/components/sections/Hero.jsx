import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    MeteorCanvas,
    ParallaxSection,
    ParallaxText,
    useScrollAnimation,
    MeteorPresets,
} from "../animations";
import Button from "../ui/Button";
import { useAccessibility } from "../../hooks/useAccessibility";

/**
 * Hero Component
 * Full-screen hero section with meteor canvas background, parallax text, and CTA
 */
const Hero = ({
    title = "Shaping Ideas Into Digital Mastery",
    subtitle = "Premium digital solutions crafted with precision, innovation, and uncompromising quality for forward-thinking businesses.",
    ctaPrimary = { text: "Explore Our Work", link: "/portfolio" },
    ctaSecondary = { text: "Get In Touch", link: "/contact" },
    meteorPreset = "standard",
    className = "",
    enableParallax = true,
    showScrollIndicator = true,
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const { prefersReducedMotion } = useAccessibility();
    const fadeInUp = useScrollAnimation({
        delay: prefersReducedMotion ? 0 : 300,
        duration: prefersReducedMotion ? 0 : 800,
    });
    const slideInLeft = useScrollAnimation({
        delay: prefersReducedMotion ? 0 : 600,
        duration: prefersReducedMotion ? 0 : 800,
    });
    const slideInRight = useScrollAnimation({
        delay: prefersReducedMotion ? 0 : 900,
        duration: prefersReducedMotion ? 0 : 800,
    });

    // Entrance animation trigger
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    // Scroll to next section
    const scrollToNextSection = () => {
        const nextSection = document.querySelector(
            '[data-section="after-hero"]'
        );
        if (nextSection) {
            nextSection.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        } else {
            window.scrollTo({
                top: window.innerHeight,
                behavior: "smooth",
            });
        }
    };

    const heroContent = (
        <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-20">
            <div className="max-w-6xl mx-auto text-center">
                {/* Screen reader only description */}
                <div className="sr-only">
                    Main hero section showcasing Kuroragi Digital Studio - a
                    premium digital agency specializing in web development,
                    design, and digital solutions.
                </div>
                {/* Main Title */}
                <div
                    className={`transition-all duration-1000 ease-out ${
                        isVisible
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-8"
                    }`}
                    style={{ transitionDelay: "200ms" }}
                >
                    {enableParallax ? (
                        <ParallaxText speed={0.3} className="mb-6">
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-cinzel font-bold leading-tight">
                                <span className="bg-gradient-to-r from-white via-accent-cyan to-primary-blue bg-clip-text text-transparent">
                                    {title.split(" ").slice(0, 2).join(" ")}
                                </span>
                                <br />
                                <span className="bg-gradient-to-r from-primary-blue via-accent-cyan to-white bg-clip-text text-transparent">
                                    {title.split(" ").slice(2).join(" ")}
                                </span>
                            </h1>
                        </ParallaxText>
                    ) : (
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-cinzel font-bold leading-tight mb-6">
                            <span className="bg-gradient-to-r from-white via-accent-cyan to-primary-blue bg-clip-text text-transparent">
                                {title.split(" ").slice(0, 2).join(" ")}
                            </span>
                            <br />
                            <span className="bg-gradient-to-r from-primary-blue via-accent-cyan to-white bg-clip-text text-transparent">
                                {title.split(" ").slice(2).join(" ")}
                            </span>
                        </h1>
                    )}
                </div>

                {/* Subtitle */}
                <div
                    className={`transition-all duration-1000 ease-out ${
                        isVisible
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-8"
                    }`}
                    style={{ transitionDelay: "500ms" }}
                >
                    {enableParallax ? (
                        <ParallaxText speed={0.5} className="mb-12">
                            <p className="text-lg md:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                                {subtitle}
                            </p>
                        </ParallaxText>
                    ) : (
                        <p className="text-lg md:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12">
                            {subtitle}
                        </p>
                    )}
                </div>

                {/* CTA Buttons */}
                <div
                    className={`transition-all duration-1000 ease-out ${
                        isVisible
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-8"
                    }`}
                    style={{ transitionDelay: "800ms" }}
                >
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <Button
                            as={Link}
                            to={ctaPrimary.link}
                            variant="primary"
                            size="large"
                            className="group relative overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                {ctaPrimary.text}
                                <svg
                                    className="w-5 h-5 transition-transform group-hover:translate-x-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                                    />
                                </svg>
                            </span>
                        </Button>

                        <Button
                            as={Link}
                            to={ctaSecondary.link}
                            variant="outline"
                            size="large"
                            className="group"
                        >
                            <span className="flex items-center gap-2">
                                {ctaSecondary.text}
                                <svg
                                    className="w-5 h-5 transition-transform group-hover:scale-110"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                    />
                                </svg>
                            </span>
                        </Button>
                    </div>
                </div>

                {/* Scroll Indicator */}
                {showScrollIndicator && (
                    <div
                        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ease-out ${
                            isVisible
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-8"
                        }`}
                        style={{ transitionDelay: "1200ms" }}
                    >
                        <button
                            onClick={scrollToNextSection}
                            className="group flex flex-col items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300"
                            aria-label="Scroll to next section"
                        >
                            <span className="text-sm font-medium">
                                Scroll Down
                            </span>
                            <div className="w-6 h-10 border-2 border-gray-400 group-hover:border-white rounded-full flex justify-center relative overflow-hidden transition-colors duration-300">
                                <div className="w-1 h-3 bg-gray-400 group-hover:bg-white rounded-full mt-2 animate-bounce"></div>
                            </div>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );

    // Return with or without parallax wrapper based on enableParallax prop
    if (enableParallax) {
        return (
            <section
                role="banner"
                aria-label="Hero section - Digital agency showcase"
                className="relative overflow-hidden"
            >
                <ParallaxSection
                    className={`relative overflow-hidden ${className}`}
                    minHeight="100vh"
                    background={
                        !prefersReducedMotion ? (
                            <MeteorCanvas
                                className="absolute inset-0"
                                {...MeteorPresets[meteorPreset]}
                                aria-hidden="true"
                            />
                        ) : (
                            <div
                                className="absolute inset-0 bg-gradient-to-br from-primary-bg to-surface"
                                aria-hidden="true"
                            />
                        )
                    }
                >
                    {heroContent}
                </ParallaxSection>
            </section>
        );
    }

    return (
        <section
            role="banner"
            aria-label="Hero section - Digital agency showcase"
            className={`relative min-h-screen overflow-hidden ${className}`}
        >
            {/* Meteor Canvas Background */}
            {!prefersReducedMotion ? (
                <MeteorCanvas
                    className="absolute inset-0"
                    {...MeteorPresets[meteorPreset]}
                    aria-hidden="true"
                />
            ) : (
                <div
                    className="absolute inset-0 bg-gradient-to-br from-primary-bg to-surface"
                    aria-hidden="true"
                />
            )}

            {/* Background Overlay */}
            <div
                className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-bg/20 to-primary-bg/60"
                aria-hidden="true"
            ></div>

            {heroContent}
        </section>
    );
};

export default Hero;
