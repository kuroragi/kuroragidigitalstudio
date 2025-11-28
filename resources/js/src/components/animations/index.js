// Animation components export
export { default as MeteorCanvas } from "./MeteorCanvas";
export { default as MeteorPerformanceMonitor } from "./MeteorPerformanceMonitor";

// Animation utilities
export const MeteorPresets = {
    // Subtle background animation
    subtle: {
        meteorCount: 8,
        meteorSpeed: 0.15,
        bigMeteorChance: 0.02,
        glowIntensity: 0.4,
        fadeOnEdges: true,
        autoOptimize: true,
    },

    // Standard hero background
    standard: {
        meteorCount: 25,
        meteorSpeed: 0.3,
        bigMeteorChance: 0.05,
        glowIntensity: 0.8,
        fadeOnEdges: true,
        autoOptimize: true,
    },

    // Intense animation for special sections
    intense: {
        meteorCount: 40,
        meteorSpeed: 0.5,
        bigMeteorChance: 0.08,
        glowIntensity: 1.0,
        fadeOnEdges: false,
        autoOptimize: false, // Keep full intensity
    },

    // Minimal for accessibility
    minimal: {
        meteorCount: 3,
        meteorSpeed: 0.1,
        bigMeteorChance: 0.01,
        glowIntensity: 0.2,
        fadeOnEdges: true,
        autoOptimize: true,
    },
};
