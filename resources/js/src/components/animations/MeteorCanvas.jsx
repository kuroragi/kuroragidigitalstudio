import { useEffect, useRef, useState, useMemo } from "react";
import usePerformanceOptimization from "../../hooks/usePerformanceOptimization";

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
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [isVisible, setIsVisible] = useState(false);

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

    // Meteor class for better performance
    class Meteor {
        constructor(canvasWidth, canvasHeight) {
            this.reset(canvasWidth, canvasHeight, true);
            this.trail = [];
            this.maxTrailLength = autoOptimize
                ? optimizedSettings.trailLength || 8
                : Math.random() * 8 + 4;
        }

        reset(canvasWidth, canvasHeight, isInitial = false) {
            // Spawn from random edge with proper velocity
            const edge = Math.floor(Math.random() * 4);

            switch (edge) {
                case 0: // Top
                    this.x = Math.random() * canvasWidth;
                    this.y = -50;
                    this.vx = (Math.random() - 0.5) * meteorSpeed;
                    this.vy = Math.random() * meteorSpeed + 0.1;
                    break;
                case 1: // Right
                    this.x = canvasWidth + 50;
                    this.y = Math.random() * canvasHeight;
                    this.vx = -(Math.random() * meteorSpeed + 0.1);
                    this.vy = (Math.random() - 0.5) * meteorSpeed;
                    break;
                case 2: // Bottom
                    this.x = Math.random() * canvasWidth;
                    this.y = canvasHeight + 50;
                    this.vx = (Math.random() - 0.5) * meteorSpeed;
                    this.vy = -(Math.random() * meteorSpeed + 0.1);
                    break;
                case 3: // Left
                    this.x = -50;
                    this.y = Math.random() * canvasHeight;
                    this.vx = Math.random() * meteorSpeed + 0.1;
                    this.vy = (Math.random() - 0.5) * meteorSpeed;
                    break;
            }

            // Random properties
            this.isBig = Math.random() < bigMeteorChance;
            this.size = this.isBig
                ? Math.random() * 3 + 2
                : Math.random() * 1.5 + 0.5;
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

            // Check if meteor is out of bounds (with buffer)
            if (
                this.x < -100 ||
                this.x > canvasWidth + 100 ||
                this.y < -100 ||
                this.y > canvasHeight + 100
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

                // Outer glow
                if (glowIntensity > 0) {
                    const glowSize =
                        this.size * (this.isBig ? 8 : 5) * glowIntensity;
                    const glowGradient = ctx.createRadialGradient(
                        this.x,
                        this.y,
                        0,
                        this.x,
                        this.y,
                        glowSize
                    );
                    glowGradient.addColorStop(0, `hsl(${this.hue}, 100%, 80%)`);
                    glowGradient.addColorStop(
                        0.3,
                        `hsl(${this.hue}, 80%, 60%)`
                    );
                    glowGradient.addColorStop(
                        0.7,
                        `hsl(${this.hue}, 60%, 40%)`
                    );
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

    // Handle canvas resize
    const handleResize = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;

        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;

        const ctx = canvas.getContext("2d");
        ctx.scale(dpr, dpr);

        canvas.style.width = rect.width + "px";
        canvas.style.height = rect.height + "px";

        setDimensions({ width: rect.width, height: rect.height });

        // Reinitialize meteors with new dimensions
        if (meteorsRef.current.length > 0) {
            initializeMeteors(rect.width, rect.height);
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
        initializeMeteors(dimensions.width, dimensions.height);

        // Resize listener
        const resizeObserver = new ResizeObserver(handleResize);
        resizeObserver.observe(canvas);

        return () => {
            resizeObserver.disconnect();
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
            className={`absolute inset-0 pointer-events-none ${className}`}
            style={{
                background: "transparent",
                zIndex: -1,
            }}
            aria-hidden="true"
        />
    );
};

export default MeteorCanvas;
