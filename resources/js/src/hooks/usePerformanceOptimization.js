import { useState, useEffect, useRef } from "react";

/**
 * Hook for optimizing meteor canvas performance based on device capabilities
 * Automatically adjusts meteor count, quality, and effects based on:
 * - Device memory
 * - Hardware concurrency
 * - Battery status
 * - Connection speed
 * - Reduced motion preferences
 */
const usePerformanceOptimization = () => {
    const [performanceLevel, setPerformanceLevel] = useState("high");
    const [optimizedSettings, setOptimizedSettings] = useState({});
    const lastFrameTime = useRef(Date.now());
    const frameCount = useRef(0);
    const fpsHistory = useRef([]);

    // Detect device capabilities
    const getDeviceCapabilities = () => {
        const capabilities = {
            memory: navigator.deviceMemory || 4, // GB, default to 4GB
            cores: navigator.hardwareConcurrency || 4,
            connection: navigator.connection?.effectiveType || "4g",
            battery: null,
            gpu: null,
        };

        // Try to detect GPU capabilities (experimental)
        try {
            const canvas = document.createElement("canvas");
            const gl =
                canvas.getContext("webgl") ||
                canvas.getContext("experimental-webgl");
            if (gl) {
                const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
                if (debugInfo) {
                    capabilities.gpu = gl.getParameter(
                        debugInfo.UNMASKED_RENDERER_WEBGL
                    );
                }
            }
        } catch (e) {
            // Ignore GPU detection errors
        }

        return capabilities;
    };

    // Calculate performance level based on device capabilities
    const calculatePerformanceLevel = (capabilities) => {
        let score = 100;

        // Memory score (40% weight)
        if (capabilities.memory < 2) score -= 40;
        else if (capabilities.memory < 4) score -= 20;
        else if (capabilities.memory < 8) score -= 10;

        // CPU cores score (30% weight)
        if (capabilities.cores < 2) score -= 30;
        else if (capabilities.cores < 4) score -= 15;
        else if (capabilities.cores < 8) score -= 5;

        // Connection score (20% weight)
        if (
            capabilities.connection === "slow-2g" ||
            capabilities.connection === "2g"
        )
            score -= 20;
        else if (capabilities.connection === "3g") score -= 10;
        else if (capabilities.connection === "4g") score -= 5;

        // GPU score (10% weight)
        if (
            capabilities.gpu &&
            capabilities.gpu.toLowerCase().includes("intel")
        ) {
            score -= 10; // Integrated graphics penalty
        }

        // Determine level
        if (score >= 80) return "ultra";
        if (score >= 60) return "high";
        if (score >= 40) return "medium";
        if (score >= 20) return "low";
        return "minimal";
    };

    // Performance presets
    const getOptimizedSettings = (level, avgFps = 60) => {
        const presets = {
            ultra: {
                meteorCount: 25,
                meteorSpeed: 0.8,
                bigMeteorChance: 0.4,
                glowIntensity: 1.2,
                trailLength: 15,
                fadeOnEdges: true,
                enableParticles: true,
                highQualityGlow: true,
                targetFps: 60,
            },
            high: {
                meteorCount: 15,
                meteorSpeed: 0.6,
                bigMeteorChance: 0.25,
                glowIntensity: 0.9,
                trailLength: 12,
                fadeOnEdges: true,
                enableParticles: true,
                highQualityGlow: false,
                targetFps: 60,
            },
            medium: {
                meteorCount: 8,
                meteorSpeed: 0.5,
                bigMeteorChance: 0.15,
                glowIntensity: 0.6,
                trailLength: 8,
                fadeOnEdges: true,
                enableParticles: false,
                highQualityGlow: false,
                targetFps: 45,
            },
            low: {
                meteorCount: 5,
                meteorSpeed: 0.4,
                bigMeteorChance: 0.1,
                glowIntensity: 0.4,
                trailLength: 6,
                fadeOnEdges: false,
                enableParticles: false,
                highQualityGlow: false,
                targetFps: 30,
            },
            minimal: {
                meteorCount: 3,
                meteorSpeed: 0.3,
                bigMeteorChance: 0.05,
                glowIntensity: 0.2,
                trailLength: 4,
                fadeOnEdges: false,
                enableParticles: false,
                highQualityGlow: false,
                targetFps: 24,
            },
        };

        const preset = presets[level];

        // Dynamic adjustment based on actual FPS
        if (avgFps < preset.targetFps * 0.8) {
            // Performance is poor, downgrade settings
            const downgradeFactor = avgFps / preset.targetFps;
            return {
                ...preset,
                meteorCount: Math.max(
                    3,
                    Math.floor(preset.meteorCount * downgradeFactor)
                ),
                glowIntensity: Math.max(
                    0.1,
                    preset.glowIntensity * downgradeFactor
                ),
                trailLength: Math.max(
                    2,
                    Math.floor(preset.trailLength * downgradeFactor)
                ),
            };
        }

        return preset;
    };

    // FPS monitoring
    const updateFPS = () => {
        const now = Date.now();
        const delta = now - lastFrameTime.current;

        if (delta > 0) {
            const fps = 1000 / delta;
            fpsHistory.current.push(fps);

            // Keep only last 60 frames for average
            if (fpsHistory.current.length > 60) {
                fpsHistory.current.shift();
            }
        }

        lastFrameTime.current = now;
        frameCount.current++;
    };

    // Calculate average FPS
    const getAverageFPS = () => {
        if (fpsHistory.current.length === 0) return 60;

        const sum = fpsHistory.current.reduce((acc, fps) => acc + fps, 0);
        return sum / fpsHistory.current.length;
    };

    // Auto-adjust performance every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            const avgFps = getAverageFPS();
            const newSettings = getOptimizedSettings(performanceLevel, avgFps);

            setOptimizedSettings(newSettings);

            // Auto-downgrade if performance is consistently poor
            if (avgFps < 24 && performanceLevel !== "minimal") {
                const levels = ["ultra", "high", "medium", "low", "minimal"];
                const currentIndex = levels.indexOf(performanceLevel);
                if (currentIndex < levels.length - 1) {
                    setPerformanceLevel(levels[currentIndex + 1]);
                }
            }

            // Auto-upgrade if performance is consistently good
            else if (avgFps > 55 && performanceLevel !== "ultra") {
                const levels = ["minimal", "low", "medium", "high", "ultra"];
                const currentIndex = levels.indexOf(performanceLevel);
                if (
                    currentIndex < levels.length - 1 &&
                    frameCount.current > 300
                ) {
                    // Only after 5 seconds
                    setPerformanceLevel(levels[currentIndex + 1]);
                }
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [performanceLevel]);

    // Initial setup
    useEffect(() => {
        const capabilities = getDeviceCapabilities();
        const level = calculatePerformanceLevel(capabilities);

        setPerformanceLevel(level);
        setOptimizedSettings(getOptimizedSettings(level));

        // Battery API (experimental)
        if ("getBattery" in navigator) {
            navigator
                .getBattery()
                .then((battery) => {
                    // Reduce performance on low battery
                    if (battery.level < 0.2) {
                        const levels = [
                            "ultra",
                            "high",
                            "medium",
                            "low",
                            "minimal",
                        ];
                        const currentIndex = levels.indexOf(level);
                        if (currentIndex < levels.length - 1) {
                            setPerformanceLevel(levels[currentIndex + 1]);
                        }
                    }
                })
                .catch(() => {
                    // Ignore battery API errors
                });
        }
    }, []);

    // Check for reduced motion preference
    const respectsReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    return {
        performanceLevel,
        optimizedSettings: {
            ...optimizedSettings,
            enableAnimation: !respectsReducedMotion,
        },
        updateFPS,
        averageFPS: getAverageFPS(),
        setPerformanceLevel,
        respectsReducedMotion,
    };
};

export default usePerformanceOptimization;
