import React from "react";
import {
    HomeHero,
    ServicesHero,
    PortfolioHero,
    MinimalHero,
    useResponsiveHero,
} from "../components/sections";

const HeroTest = () => {
    const responsiveConfig = useResponsiveHero();
    const [currentHero, setCurrentHero] = React.useState("home");

    const heroes = {
        home: <HomeHero {...responsiveConfig} />,
        services: <ServicesHero {...responsiveConfig} />,
        portfolio: <PortfolioHero {...responsiveConfig} />,
        minimal: (
            <MinimalHero
                title="Minimal Hero"
                subtitle="Simple and clean design for content pages"
            />
        ),
    };

    return (
        <div className="min-h-screen bg-primary-bg">
            {/* Hero Selector */}
            <div className="fixed top-4 left-4 z-50 bg-black/80 backdrop-blur-sm rounded-lg p-4">
                <h3 className="text-white font-semibold mb-3">Hero Variants</h3>
                <div className="space-y-2">
                    {Object.keys(heroes).map((heroType) => (
                        <button
                            key={heroType}
                            onClick={() => setCurrentHero(heroType)}
                            className={`block w-full text-left px-3 py-1 rounded text-sm transition-colors ${
                                currentHero === heroType
                                    ? "bg-primary-blue text-white"
                                    : "text-gray-300 hover:text-white hover:bg-gray-700"
                            }`}
                        >
                            {heroType.charAt(0).toUpperCase() +
                                heroType.slice(1)}{" "}
                            Hero
                        </button>
                    ))}
                </div>

                <div className="mt-4 pt-3 border-t border-gray-600 text-xs text-gray-400">
                    <div>Responsive: {responsiveConfig.meteorPreset}</div>
                    <div>
                        Parallax:{" "}
                        {responsiveConfig.enableParallax ? "On" : "Off"}
                    </div>
                </div>
            </div>

            {/* Current Hero */}
            {heroes[currentHero]}

            {/* Sample Content After Hero */}
            <div
                data-section="after-hero"
                className="min-h-screen bg-gradient-to-b from-primary-bg to-gray-900 flex items-center justify-center"
            >
                <div className="text-center px-4">
                    <h2 className="text-4xl font-cinzel font-bold text-white mb-6">
                        Content After Hero
                    </h2>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        This section demonstrates how the hero scroll indicator
                        works. The hero component automatically detects this
                        section for smooth scrolling.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HeroTest;
