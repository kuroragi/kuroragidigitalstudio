// Animation components export
export { default as MeteorCanvas } from "./MeteorCanvas";
export { default as MeteorPerformanceMonitor } from "./MeteorPerformanceMonitor";

// Parallax components export
export {
    default as ParallaxLayer,
    ParallaxContainer,
    ParallaxSection,
    ParallaxText,
    useParallaxScroll,
} from "./ParallaxLayer";

// Scroll effects and utilities
export {
    useScrollAnimation,
    SmoothScroll,
    useParallaxPerformance,
    ParallaxPresets,
    StaggerUtils,
} from "./ScrollEffects";

// Animation utilities
export const MeteorPresets = {
    // Subtle background animation - gentle falling stars
    subtle: {
        meteorCount: 3,
        meteorSpeed: 0.15,
        bigMeteorChance: 0.1,
        glowIntensity: 0.3,
        fadeOnEdges: true,
        autoOptimize: true,
    },

    // Standard hero background - peaceful starfall
    standard: {
        meteorCount: 5,
        meteorSpeed: 0.25,
        bigMeteorChance: 0.15,
        glowIntensity: 0.4,
        fadeOnEdges: true,
        autoOptimize: true,
    },

    // Intense animation - active starfall
    intense: {
        meteorCount: 8,
        meteorSpeed: 0.35,
        bigMeteorChance: 0.2,
        glowIntensity: 0.5,
        fadeOnEdges: false,
        autoOptimize: false, // Keep full intensity
    },

    // Minimal for accessibility - very few stars
    minimal: {
        meteorCount: 2,
        meteorSpeed: 0.1,
        bigMeteorChance: 0.05,
        glowIntensity: 0.2,
        fadeOnEdges: true,
        autoOptimize: true,
    },
};
