import React, { Suspense, lazy, memo } from "react";
import { LazyCanvas } from "../hooks/useLazyLoading.jsx";
import { useAccessibility } from "../hooks/useAccessibility";

// Lazy load MeteorCanvas only when needed
const MeteorCanvas = lazy(() => import("./animations/MeteorCanvas"));

/**
 * Optimized Canvas Loader with Performance Enhancements
 */
const OptimizedMeteorCanvas = memo(
    ({ enableWhenVisible = true, reduceMotionFallback = true, ...props }) => {
        const { prefersReducedMotion } = useAccessibility();

        // Fallback for reduced motion preference
        if (prefersReducedMotion && reduceMotionFallback) {
            return (
                <div
                    className="absolute inset-0 bg-gradient-to-br from-primary-bg via-surface to-primary-bg"
                    aria-hidden="true"
                />
            );
        }

        // Placeholder component for loading state
        const CanvasPlaceholder = () => (
            <div className="absolute inset-0 bg-gradient-to-br from-primary-bg via-surface to-surface opacity-50">
                <div className="absolute inset-0 animate-pulse">
                    <div className="w-full h-full bg-gradient-to-r from-transparent via-primary-blue/10 to-transparent"></div>
                </div>
            </div>
        );

        return (
            <LazyCanvas
                CanvasComponent={({ className, ...canvasProps }) => (
                    <Suspense fallback={<CanvasPlaceholder />}>
                        <MeteorCanvas
                            className={className}
                            autoOptimize={true}
                            enableAnimation={true}
                            {...canvasProps}
                        />
                    </Suspense>
                )}
                enableWhenVisible={enableWhenVisible}
                placeholder={<CanvasPlaceholder />}
                {...props}
            />
        );
    }
);

OptimizedMeteorCanvas.displayName = "OptimizedMeteorCanvas";

/**
 * Performance-Optimized Canvas Factory
 * Creates optimized canvas components based on device capabilities
 */
export function createOptimizedCanvas(CanvasComponent, options = {}) {
    const {
        enableLazyLoading = true,
        enableReducedMotion = true,
        enablePerformanceMonitoring = true,
        fallbackComponent = null,
    } = options;

    return memo((props) => {
        const { prefersReducedMotion } = useAccessibility();

        // Use fallback for reduced motion if specified
        if (prefersReducedMotion && enableReducedMotion && fallbackComponent) {
            return fallbackComponent;
        }

        // Wrap with lazy loading if enabled
        if (enableLazyLoading) {
            return (
                <LazyCanvas
                    CanvasComponent={CanvasComponent}
                    enableWhenVisible={true}
                    {...props}
                />
            );
        }

        // Direct render for immediate loading
        return <CanvasComponent {...props} />;
    });
}

/**
 * Canvas Performance Wrapper
 * Adds performance monitoring and optimization to canvas components
 */
export function withCanvasOptimization(CanvasComponent) {
    return memo((props) => {
        const { prefersReducedMotion } = useAccessibility();

        // Enhanced props with performance optimizations
        const optimizedProps = {
            ...props,
            autoOptimize: true,
            enableAnimation: !prefersReducedMotion,
            meteorCount: prefersReducedMotion ? 5 : props.meteorCount || 25,
            meteorSpeed: prefersReducedMotion ? 0.1 : props.meteorSpeed || 0.3,
        };

        return <CanvasComponent {...optimizedProps} />;
    });
}

/**
 * Adaptive Canvas Component
 * Automatically adjusts quality based on device performance
 */
export function AdaptiveCanvas({
    HighQualityCanvas,
    MediumQualityCanvas,
    LowQualityCanvas,
    autoDetect = true,
    ...props
}) {
    const [performanceLevel, setPerformanceLevel] = React.useState("high");

    React.useEffect(() => {
        if (!autoDetect) return;

        // Simple performance detection
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Basic performance test
        const startTime = performance.now();
        for (let i = 0; i < 1000; i++) {
            ctx.fillRect(Math.random() * 100, Math.random() * 100, 10, 10);
        }
        const renderTime = performance.now() - startTime;

        // Determine performance level based on render time
        if (renderTime > 50) {
            setPerformanceLevel("low");
        } else if (renderTime > 20) {
            setPerformanceLevel("medium");
        } else {
            setPerformanceLevel("high");
        }
    }, [autoDetect]);

    // Select appropriate canvas based on performance
    let SelectedCanvas;
    switch (performanceLevel) {
        case "low":
            SelectedCanvas =
                LowQualityCanvas || MediumQualityCanvas || HighQualityCanvas;
            break;
        case "medium":
            SelectedCanvas = MediumQualityCanvas || HighQualityCanvas;
            break;
        default:
            SelectedCanvas = HighQualityCanvas;
    }

    return <SelectedCanvas {...props} performanceLevel={performanceLevel} />;
}

export default OptimizedMeteorCanvas;
