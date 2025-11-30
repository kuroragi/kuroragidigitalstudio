import React from "react";
import {
    MeteorCanvas,
    ParallaxLayer,
    ParallaxContainer,
    ParallaxSection,
    ParallaxText,
    useScrollAnimation,
    SmoothScroll,
    ParallaxPresets,
    MeteorPresets,
} from "../components/animations";

const ParallaxTest = () => {
    const fadeInUp = useScrollAnimation({ delay: 200 });
    const slideInLeft = useScrollAnimation({ delay: 400 });
    const scaleIn = useScrollAnimation({ delay: 600 });

    const scrollToSection = (sectionId) => {
        SmoothScroll.scrollTo(`#${sectionId}`, { offset: 80 });
    };

    return (
        <div className="min-h-screen bg-primary-bg text-primary-text">
            {/* Hero Section with Meteor Canvas */}
            <ParallaxSection
                id="hero"
                className="relative"
                minHeight="100vh"
                background={
                    <MeteorCanvas
                        className="absolute inset-0"
                        {...MeteorPresets.standard}
                    />
                }
            >
                <div className="relative z-10 flex items-center justify-center h-screen">
                    <div className="text-center px-4">
                        <ParallaxText speed={0.3} className="mb-6">
                            <h1 className="text-6xl md:text-8xl font-cinzel font-bold bg-gradient-to-r from-primary-blue via-accent-cyan to-primary-blue bg-clip-text text-transparent">
                                Parallax Test
                            </h1>
                        </ParallaxText>

                        <ParallaxText speed={0.5} className="mb-8">
                            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
                                Testing advanced parallax system with GPU
                                acceleration and performance optimization
                            </p>
                        </ParallaxText>

                        <ParallaxText speed={0.7}>
                            <button
                                onClick={() => scrollToSection("layers")}
                                className="px-8 py-3 bg-primary-blue hover:bg-accent-cyan text-white rounded-lg transition-colors duration-300"
                            >
                                Explore Parallax Layers
                            </button>
                        </ParallaxText>
                    </div>
                </div>
            </ParallaxSection>

            {/* Multi-Layer Parallax Section */}
            <ParallaxContainer
                id="layers"
                className="relative min-h-screen bg-gradient-to-b from-gray-900 to-primary-bg"
            >
                {/* Background Layer - Slow */}
                <ParallaxLayer
                    speed={0.2}
                    className="absolute inset-0 opacity-30"
                >
                    <div className="w-full h-full bg-gradient-to-br from-primary-blue/20 to-accent-cyan/20"></div>
                </ParallaxLayer>

                {/* Mid Layer - Medium */}
                <ParallaxLayer
                    speed={0.5}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    <div className="grid grid-cols-3 gap-8 opacity-20">
                        {[...Array(9)].map((_, i) => (
                            <div
                                key={i}
                                className="w-24 h-24 bg-gradient-to-br from-primary-blue to-accent-cyan rounded-lg"
                            ></div>
                        ))}
                    </div>
                </ParallaxLayer>

                {/* Content Layer - Static */}
                <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <div ref={fadeInUp.ref} style={fadeInUp.style}>
                            <h2 className="text-4xl md:text-6xl font-cinzel font-bold mb-6">
                                Multi-Layer Parallax
                            </h2>
                        </div>

                        <div ref={slideInLeft.ref} style={slideInLeft.style}>
                            <p className="text-xl text-gray-300 mb-8">
                                Different layers moving at different speeds
                                create depth and immersion
                            </p>
                        </div>

                        <div ref={scaleIn.ref} style={scaleIn.style}>
                            <div className="grid md:grid-cols-3 gap-6">
                                {[
                                    {
                                        title: "Background",
                                        speed: "0.2x",
                                        desc: "Slowest layer for depth",
                                    },
                                    {
                                        title: "Midground",
                                        speed: "0.5x",
                                        desc: "Medium speed elements",
                                    },
                                    {
                                        title: "Foreground",
                                        speed: "0.8x",
                                        desc: "Fast moving details",
                                    },
                                ].map((layer, index) => (
                                    <div
                                        key={index}
                                        className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-gray-700"
                                    >
                                        <h3 className="text-xl font-semibold text-primary-blue mb-2">
                                            {layer.title}
                                        </h3>
                                        <div className="text-2xl font-bold text-accent-cyan mb-2">
                                            {layer.speed}
                                        </div>
                                        <p className="text-gray-400">
                                            {layer.desc}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Foreground Layer - Fast */}
                <ParallaxLayer
                    speed={0.8}
                    className="absolute inset-0 pointer-events-none"
                >
                    <div className="absolute top-10 left-10 w-6 h-6 bg-accent-cyan rounded-full opacity-60"></div>
                    <div className="absolute top-32 right-20 w-4 h-4 bg-primary-blue rounded-full opacity-40"></div>
                    <div className="absolute bottom-20 left-1/4 w-8 h-8 bg-accent-cyan/30 rounded-full"></div>
                </ParallaxLayer>
            </ParallaxContainer>

            {/* Horizontal Parallax Section */}
            <div
                id="horizontal"
                className="relative min-h-screen bg-gradient-to-r from-primary-bg to-gray-900 overflow-hidden"
            >
                <ParallaxLayer
                    {...ParallaxPresets.horizontalSlide}
                    className="absolute inset-0"
                >
                    <div className="flex items-center h-full whitespace-nowrap">
                        <div className="text-9xl font-cinzel font-bold text-gray-800 opacity-20 ml-[-200px]">
                            HORIZONTAL PARALLAX HORIZONTAL PARALLAX
                        </div>
                    </div>
                </ParallaxLayer>

                <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
                    <div className="text-center">
                        <h2 className="text-5xl font-cinzel font-bold mb-6">
                            Horizontal Movement
                        </h2>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            Parallax doesn't have to be vertical. Watch the
                            background text slide horizontally as you scroll.
                        </p>
                    </div>
                </div>
            </div>

            {/* Reverse Parallax Section */}
            <div
                id="reverse"
                className="relative min-h-screen bg-gradient-to-b from-gray-900 to-black"
            >
                <ParallaxLayer
                    {...ParallaxPresets.reverse}
                    className="absolute inset-0 opacity-50"
                >
                    <div className="w-full h-full bg-gradient-to-t from-primary-blue/10 to-accent-cyan/10"></div>
                </ParallaxLayer>

                <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
                    <div className="text-center max-w-3xl">
                        <h2 className="text-5xl font-cinzel font-bold mb-6">
                            Reverse Parallax
                        </h2>
                        <p className="text-xl text-gray-300 mb-8">
                            This background moves in the opposite direction,
                            creating a unique visual effect.
                        </p>

                        <button
                            onClick={() => scrollToSection("hero")}
                            className="px-8 py-3 bg-accent-cyan hover:bg-primary-blue text-white rounded-lg transition-colors duration-300"
                        >
                            Back to Top
                        </button>
                    </div>
                </div>
            </div>

            {/* Performance Info */}
            <div className="fixed bottom-4 left-4 bg-black/80 text-white p-3 rounded text-sm font-mono z-50 max-w-xs">
                <div className="text-primary-blue font-semibold mb-1">
                    Parallax System Active
                </div>
                <div className="text-xs space-y-1">
                    <div>• GPU-accelerated transforms</div>
                    <div>• Intersection Observer optimization</div>
                    <div>• Reduced motion support</div>
                    <div>• Smooth scroll integration</div>
                </div>
            </div>
        </div>
    );
};

export default ParallaxTest;
