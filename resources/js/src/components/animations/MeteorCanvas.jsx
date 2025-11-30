import { useEffect, useRef, useState } from "react";

/* PHASE 6 PERFORMANCE OPTIMIZATIONS - COMMENTED OUT
import usePerformanceOptimization from "../../hooks/usePerformanceOptimization";
import CanvasPerformanceOptimizer, {
    CanvasResizeOptimizer,
} from "../../utils/canvasOptimizer";
import { useLazyLoading } from "../../hooks/useLazyLoading.jsx";
*/

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
    
    /* PHASE 6 PERFORMANCE OPTIMIZATIONS - COMMENTED OUT
    const performanceOptimizerRef = useRef(new CanvasPerformanceOptimizer());
    const resizeOptimizerRef = useRef(null);
    */
    
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [isVisible, setIsVisible] = useState(false);

    /* PHASE 6 PERFORMANCE OPTIMIZATIONS - COMMENTED OUT
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
    */

    // Use base settings without optimization
    const meteorCount = baseMeteorCount;
    const meteorSpeed = baseMeteorSpeed;
    const bigMeteorChance = baseBigMeteorChance;
    const glowIntensity = baseGlowIntensity;

    // Basic Meteor class
    class Meteor {
        constructor(canvasWidth, canvasHeight) {
            this.reset(canvasWidth, canvasHeight, true);
            this.trail = [];
            this.maxTrailLength = Math.random() * 3 + 2;
        }

        reset(canvasWidth, canvasHeight, isInitial = false) {
            this.x = Math.random() * canvasWidth * 1.5 - canvasWidth * 0.5;
            this.y = isInitial 
                ? Math.random() * canvasHeight 
                : -Math.random() * 200 - 50;
            this.vx = (Math.random() - 0.5) * 2;
            this.vy = Math.random() * 3 + 2;
            this.size = Math.random() > bigMeteorChance ? Math.random() * 1 + 0.5 : Math.random() * 2 + 2;
            this.opacity = Math.random() * 0.8 + 0.2;
            this.hue = Math.random() * 60 + 10; // Orange-ish colors
            this.angle = Math.atan2(this.vy, this.vx);
            this.length = Math.random() * 20 + 10;
        }

        update(deltaTime, canvasWidth, canvasHeight) {
            const speed = meteorSpeed * deltaTime * 60;
            
            this.x += this.vx * speed;
            this.y += this.vy * speed;
            
            // Add to trail
            this.trail.push({ x: this.x, y: this.y });
            if (this.trail.length > this.maxTrailLength) {
                this.trail.shift();
            }
            
            // Reset if out of bounds
            if (this.y > canvasHeight + 100 || this.x > canvasWidth + 100 || this.x < -100) {
                this.reset(canvasWidth, canvasHeight);
            }
        }

        draw(ctx) {
            if (this.trail.length < 2) return;

            ctx.save();
            
            // Draw trail
            const gradient = ctx.createLinearGradient(
                this.trail[0].x, this.trail[0].y,
                this.x, this.y
            );
            gradient.addColorStop(0, `hsla(${this.hue}, 70%, 50%, 0)`);
            gradient.addColorStop(1, `hsla(${this.hue}, 90%, 70%, ${this.opacity * glowIntensity})`);
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = this.size;
            ctx.lineCap = "round";
            
            ctx.beginPath();
            ctx.moveTo(this.trail[0].x, this.trail[0].y);
            for (let i = 1; i < this.trail.length; i++) {
                ctx.lineTo(this.trail[i].x, this.trail[i].y);
            }
            ctx.stroke();
            
            // Draw main meteor body with glow
            const headGradient = ctx.createRadialGradient(
                this.x, this.y, 0,
                this.x, this.y, this.size * 3
            );
            headGradient.addColorStop(0, `hsla(${this.hue}, 100%, 80%, ${this.opacity})`);
            headGradient.addColorStop(0.4, `hsla(${this.hue}, 90%, 60%, ${this.opacity * 0.8})`);
            headGradient.addColorStop(1, `hsla(${this.hue}, 70%, 40%, 0)`);
            
            ctx.fillStyle = headGradient;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.restore();
        }
    }

    // Initialize canvas and meteors
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const updateDimensions = () => {
            const rect = canvas.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;
            
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            
            const ctx = canvas.getContext('2d');
            ctx.scale(dpr, dpr);
            
            setDimensions({ width: rect.width, height: rect.height });
            
            // Reinitialize meteors when size changes
            meteorsRef.current = Array.from({ length: meteorCount }, () => 
                new Meteor(rect.width, rect.height)
            );
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        
        return () => window.removeEventListener('resize', updateDimensions);
    }, [meteorCount]);

    // Visibility detection (basic)
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.1 }
        );
        
        if (canvasRef.current) {
            observer.observe(canvasRef.current);
        }
        
        return () => observer.disconnect();
    }, []);

    // Animation loop
    useEffect(() => {
        if (!enableAnimation || !isVisible) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        
        const animate = (currentTime) => {
            const deltaTime = (currentTime - lastFrameTimeRef.current) / 1000;
            lastFrameTimeRef.current = currentTime;

            // Clear canvas
            ctx.clearRect(0, 0, dimensions.width, dimensions.height);

            // Update and draw meteors
            meteorsRef.current.forEach(meteor => {
                meteor.update(deltaTime, dimensions.width, dimensions.height);
                meteor.draw(ctx);
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [enableAnimation, isVisible, dimensions, meteorSpeed, glowIntensity]);

    return (
        <canvas
            ref={canvasRef}
            className={`absolute inset-0 pointer-events-none ${className}`}
            style={{
                width: '100%',
                height: '100%',
                opacity: fadeOnEdges ? 0.8 : 1,
            }}
        />
    );
};

export default MeteorCanvas;
