import { useEffect, useRef, useState, useMemo } from "react";
import usePerformanceOptimization from "../../hooks/usePerformanceOptimization";
import CanvasPerformanceOptimizer, {
    CanvasResizeOptimizer,
} from "../../utils/canvasOptimizer";
import { useLazyLoading } from "../../hooks/useLazyLoading.jsx";

const MeteorCanvas = ({
    className = "",
    meteorCount: baseMeteorCount = 25,
    meteorSpeed: baseMeteorSpeed = 0.3,
    bigMeteorChance: baseBigMeteorChance = 0.05,
    glowIntensity: baseGlowIntensity = 0.8,
    enableAnimation = true,
    fadeOnEdges = true,
    autoOptimize = true,
}) => {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);
    const meteorsRef = useRef([]);
    const lastFrameTimeRef = useRef(0);
    const fpsCounterRef = useRef({ frames: 0, lastTime: 0, fps: 60 });
    const meteorPoolRef = useRef([]);
    const performanceOptimizerRef = useRef(new CanvasPerformanceOptimizer());
    const resizeOptimizerRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [isVisible, setIsVisible] = useState(false);

    // Lazy loading for better performance
    const { elementRef, isIntersecting } = useLazyLoading({
        threshold: 0.1,
        rootMargin: "100px",
    });

    // Performance optimization hook
    const {
        optimizedSettings,
        updateFPS,
        respectsReducedMotion,
        performanceLevel,
    } = usePerformanceOptimization();

    // Use optimized settings if auto-optimize is enabled
    const meteorCount = autoOptimize
        ? optimizedSettings.meteorCount || baseMeteorCount
        : baseMeteorCount;
    const meteorSpeed = autoOptimize
        ? optimizedSettings.meteorSpeed || baseMeteorSpeed
        : baseMeteorSpeed;
    const bigMeteorChance = autoOptimize
        ? optimizedSettings.bigMeteorChance || baseBigMeteorChance
        : baseBigMeteorChance;
    const glowIntensity = autoOptimize
        ? optimizedSettings.glowIntensity || baseGlowIntensity
        : baseGlowIntensity;

    // Optimized Meteor class with pooling support
    class Meteor {
        constructor(canvasWidth, canvasHeight) {
            this.reset(canvasWidth, canvasHeight, true);
            this.trail = [];
            this.maxTrailLength = autoOptimize
                ? optimizedSettings.trailLength || 4
                : Math.random() * 3 + 2;
            this.isActive = true;
            this.lastX = 0;
            this.lastY = 0;
        }

        reset(canvasWidth, canvasHeight, isInitial = false) {
            // Spawn meteors only from top, falling down
            // Random spawn across the top edge with some variation
            const spawnMargin = canvasWidth * 0.2; // 20% margin on sides
            this.x =
                spawnMargin + Math.random() * (canvasWidth - spawnMargin * 2);
            this.y = -100; // Start higher above screen

            // Slow gentle falling movement
            this.vx = (Math.random() - 0.5) * meteorSpeed * 0.1; // Very slight horizontal drift
            this.vy = Math.random() * meteorSpeed * 0.3 + meteorSpeed * 0.2; // Slow downward movement

            // Small star-like meteors
            this.isBig = Math.random() < bigMeteorChance;
            this.size = this.isBig
                ? Math.random() * 1.5 + 1 // Big meteors: 1-2.5px
                : Math.random() * 0.8 + 0.3; // Regular meteors: 0.3-1.1px
            this.opacity = Math.random() * 0.6 + 0.4;
            this.hue = Math.random() * 60 + 200; // Blue to cyan range
            this.twinkle = Math.random() * 2 * Math.PI;
            this.twinkleSpeed = Math.random() * 0.02 + 0.01;

            // Clear trail on reset
            if (!isInitial) {
                this.trail = [];
            }
        }

        update(canvasWidth, canvasHeight, deltaTime) {
            // Store previous position for trail
            this.trail.push({ x: this.x, y: this.y, opacity: this.opacity });
            if (this.trail.length > this.maxTrailLength) {
                this.trail.shift();
            }

            // Update position
            this.x += this.vx * deltaTime;
            this.y += this.vy * deltaTime;

            // Update twinkle
            this.twinkle += this.twinkleSpeed * deltaTime;

            // Check if meteor has fallen below screen or drifted too far horizontally
            if (
                this.y > canvasHeight + 100 || // Fallen below screen
                this.x < -100 || // Drifted too far left
                this.x > canvasWidth + 100 // Drifted too far right
            ) {
                this.reset(canvasWidth, canvasHeight);
            }
        }

        draw(ctx, canvasWidth, canvasHeight) {
            // Calculate fade based on position near edges
            let edgeFade = 1;
            if (fadeOnEdges) {
                const fadeDistance = 150;
                const distanceFromEdge = Math.min(
                    this.x,
                    this.y,
                    canvasWidth - this.x,
                    canvasHeight - this.y
                );
                edgeFade = Math.min(
                    1,
                    Math.max(0, distanceFromEdge / fadeDistance)
                );
            }

            const finalOpacity =
                this.opacity * edgeFade * (0.8 + Math.sin(this.twinkle) * 0.2);

            // Draw trail
            this.trail.forEach((point, index) => {
                const trailOpacity =
                    finalOpacity * (index / this.trail.length) * 0.3;
                const trailSize = this.size * (index / this.trail.length) * 0.5;

                if (trailOpacity > 0.01) {
                    ctx.save();
                    ctx.globalAlpha = trailOpacity;

                    // Trail glow
                    const gradient = ctx.createRadialGradient(
                        point.x,
                        point.y,
                        0,
                        point.x,
                        point.y,
                        trailSize * 3
                    );
                    gradient.addColorStop(0, `hsl(${this.hue}, 100%, 70%)`);
                    gradient.addColorStop(0.5, `hsl(${this.hue}, 80%, 50%)`);
                    gradient.addColorStop(1, "transparent");

                    ctx.fillStyle = gradient;
                    ctx.beginPath();
                    ctx.arc(point.x, point.y, trailSize * 3, 0, Math.PI * 2);
                    ctx.fill();

                    ctx.restore();
                }
            });

            // Draw main meteor
            if (finalOpacity > 0.01) {
                ctx.save();
                ctx.globalAlpha = finalOpacity;

                // Subtle star glow - minimal
                if (glowIntensity > 0) {
                    const glowSize = this.size * 2 * glowIntensity; // Much smaller glow
                    const glowGradient = ctx.createRadialGradient(
                        this.x,
                        this.y,
                        0,
                        this.x,
                        this.y,
                        glowSize
                    );
                    glowGradient.addColorStop(0, `hsl(${this.hue}, 80%, 85%)`);
                    glowGradient.addColorStop(
                        0.7,
                        `hsl(${this.hue}, 60%, 60%)`
                    );
                    glowGradient.addColorStop(1, `hsl(${this.hue}, 40%, 30%)`);
                    glowGradient.addColorStop(1, "transparent");

                    ctx.fillStyle = glowGradient;
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, glowSize, 0, Math.PI * 2);
                    ctx.fill();
                }

                // Inner core
                const coreGradient = ctx.createRadialGradient(
                    this.x,
                    this.y,
                    0,
                    this.x,
                    this.y,
                    this.size
                );
                coreGradient.addColorStop(0, `hsl(${this.hue}, 100%, 90%)`);
                coreGradient.addColorStop(0.5, `hsl(${this.hue}, 90%, 70%)`);
                coreGradient.addColorStop(1, `hsl(${this.hue}, 70%, 50%)`);

                ctx.fillStyle = coreGradient;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();

                ctx.restore();
            }
        }
    }

    // Initialize meteors
    const initializeMeteors = (width, height) => {
        meteorsRef.current = Array.from(
            { length: meteorCount },
            () => new Meteor(width, height)
        );
    };

    // Handle canvas resize - always full viewport
    const handleResize = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const width = window.innerWidth;
        const height = window.innerHeight;
        const dpr = window.devicePixelRatio || 1;

        canvas.width = width * dpr;
        canvas.height = height * dpr;

        const ctx = canvas.getContext("2d");
        ctx.scale(dpr, dpr);

        canvas.style.width = width + "px";
        canvas.style.height = height + "px";

        setDimensions({ width, height });

        // Reinitialize meteors with new dimensions
        if (meteorsRef.current.length > 0) {
            initializeMeteors(width, height);
        }
    };

    // Animation loop
    const animate = () => {
        const canvas = canvasRef.current;
        if (!canvas || !isVisible || respectsReducedMotion || !enableAnimation)
            return;

        const ctx = canvas.getContext("2d");
        const { width, height } = dimensions;

        // Update FPS monitoring
        updateFPS();

        // Clear canvas with fade effect
        ctx.fillStyle = "rgba(7, 7, 10, 0.1)";
        ctx.fillRect(0, 0, width, height);

        // Update and draw meteors
        const deltaTime = 16.67; // ~60fps
        meteorsRef.current.forEach((meteor) => {
            meteor.update(width, height, deltaTime);
            meteor.draw(ctx, width, height);
        });

        animationRef.current = requestAnimationFrame(animate);
    };

    // Intersection Observer for performance
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0 }
        );

        observer.observe(canvas);

        return () => {
            observer.unobserve(canvas);
        };
    }, []);

    // Setup canvas and animation
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Initial setup
        handleResize();
        initializeMeteors(window.innerWidth, window.innerHeight);

        // Window resize listener for full screen canvas
        window.addEventListener("resize", handleResize, { passive: true });

        return () => {
            window.removeEventListener("resize", handleResize);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    // Start/stop animation based on visibility and preferences
    useEffect(() => {
        if (
            isVisible &&
            !respectsReducedMotion &&
            enableAnimation &&
            dimensions.width > 0
        ) {
            animate();
        } else if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
        }

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [isVisible, respectsReducedMotion, enableAnimation, dimensions]);

    // Static fallback for reduced motion
    const drawStaticMeteors = () => {
        const canvas = canvasRef.current;
        if (!canvas || !respectsReducedMotion) return;

        const ctx = canvas.getContext("2d");
        const { width, height } = dimensions;

        // Clear canvas
        ctx.fillStyle = "rgba(7, 7, 10, 1)";
        ctx.fillRect(0, 0, width, height);

        // Draw static meteors (no animation)
        meteorsRef.current.forEach((meteor) => {
            meteor.draw(ctx, width, height);
        });
    };

    useEffect(() => {
        if (respectsReducedMotion && dimensions.width > 0) {
            drawStaticMeteors();
        }
    }, [respectsReducedMotion, dimensions]);

    return (
        <canvas
            ref={canvasRef}
            className={`fixed inset-0 pointer-events-none ${className}`}
            style={{
                background: "transparent",
                zIndex: -1,
                width: "100vw",
                height: "100vh",
            }}
            aria-hidden="true"
        />
    );
};

export default MeteorCanvas;
