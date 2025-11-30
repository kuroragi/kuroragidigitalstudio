import { useEffect, useRef, useState } from "react";

/**
 * Advanced scroll-triggered animations hook
 * Provides smooth entrance animations based on scroll position
 */
const useScrollAnimation = (options = {}) => {
    const {
        threshold = 0.1,
        rootMargin = "0px 0px -10% 0px",
        triggerOnce = true,
        delay = 0,
        duration = 600,
    } = options;

    const [isVisible, setIsVisible] = useState(false);
    const [hasTriggered, setHasTriggered] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    if (!hasTriggered || !triggerOnce) {
                        setTimeout(() => {
                            setIsVisible(true);
                            setHasTriggered(true);
                        }, delay);
                    }
                } else if (!triggerOnce) {
                    setIsVisible(false);
                }
            },
            {
                threshold,
                rootMargin,
            }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [threshold, rootMargin, triggerOnce, delay, hasTriggered]);

    return {
        ref: elementRef,
        isVisible,
        hasTriggered,
        style: {
            transition: `all ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
            transform: isVisible
                ? "translateY(0) scale(1)"
                : "translateY(30px) scale(0.95)",
            opacity: isVisible ? 1 : 0,
        },
    };
};

/**
 * Smooth scroll utility with easing functions
 */
class SmoothScroll {
    static easeInOutQuart(t) {
        return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
    }

    static scrollTo(target, options = {}) {
        const {
            duration = 800,
            offset = 0,
            easing = this.easeInOutQuart,
        } = options;

        const targetElement =
            typeof target === "string"
                ? document.querySelector(target)
                : target;

        if (!targetElement) return;

        const startPosition = window.pageYOffset;
        const targetPosition = targetElement.offsetTop - offset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);

            const easedProgress = easing(progress);
            window.scrollTo(0, startPosition + distance * easedProgress);

            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        }

        requestAnimationFrame(animation);
    }
}

/**
 * Parallax performance monitor
 * Tracks and optimizes parallax performance
 */
const useParallaxPerformance = () => {
    const [performance, setPerformance] = useState({
        fps: 60,
        isOptimal: true,
        activeElements: 0,
    });

    const frameCount = useRef(0);
    const lastTime = useRef(Date.now());
    const fpsHistory = useRef([]);
    const activeElementsRef = useRef(0);

    const updateFPS = () => {
        const now = Date.now();
        const delta = now - lastTime.current;

        if (delta > 0) {
            const currentFPS = 1000 / delta;
            fpsHistory.current.push(currentFPS);

            if (fpsHistory.current.length > 30) {
                fpsHistory.current.shift();
            }

            const avgFPS =
                fpsHistory.current.reduce((a, b) => a + b, 0) /
                fpsHistory.current.length;

            setPerformance((prev) => ({
                ...prev,
                fps: avgFPS,
                isOptimal: avgFPS > 45,
                activeElements: activeElementsRef.current,
            }));
        }

        lastTime.current = now;
        frameCount.current++;
    };

    const registerElement = () => {
        activeElementsRef.current++;
    };

    const unregisterElement = () => {
        activeElementsRef.current = Math.max(0, activeElementsRef.current - 1);
    };

    return {
        performance,
        updateFPS,
        registerElement,
        unregisterElement,
    };
};

/**
 * Parallax scroll effects presets
 */
export const ParallaxPresets = {
    // Subtle background movement
    subtleBackground: {
        speed: 0.2,
        direction: "vertical",
    },

    // Standard content parallax
    standardContent: {
        speed: 0.5,
        direction: "vertical",
    },

    // Fast foreground elements
    fastForeground: {
        speed: 0.8,
        direction: "vertical",
    },

    // Horizontal slide effect
    horizontalSlide: {
        speed: 0.3,
        direction: "horizontal",
    },

    // Diagonal movement
    diagonalFlow: {
        speed: 0.4,
        direction: "both",
    },

    // Reverse parallax (moves opposite to scroll)
    reverse: {
        speed: -0.3,
        direction: "vertical",
    },
};

/**
 * Stagger animation utilities
 */
export const StaggerUtils = {
    // Generate staggered delays
    generateDelays: (count, baseDelay = 100, increment = 50) => {
        return Array.from(
            { length: count },
            (_, i) => baseDelay + i * increment
        );
    },

    // Stagger animation CSS
    getStaggerStyle: (index, baseDelay = 100, increment = 50) => ({
        animationDelay: `${baseDelay + index * increment}ms`,
    }),
};

export { useScrollAnimation, SmoothScroll, useParallaxPerformance };
