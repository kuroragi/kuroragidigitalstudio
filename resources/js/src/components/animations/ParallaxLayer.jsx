import { useEffect, useRef, useState, useCallback } from "react";

/**
 * Custom hook for smooth parallax scrolling with performance optimization
 */
const useParallaxScroll = () => {
    const [scrollY, setScrollY] = useState(0);
    const [windowHeight, setWindowHeight] = useState(0);
    const rafRef = useRef();
    const lastScrollY = useRef(0);

    // Throttled scroll handler for better performance
    const handleScroll = useCallback(() => {
        if (rafRef.current) return;

        rafRef.current = requestAnimationFrame(() => {
            const currentScrollY = window.scrollY;
            const currentWindowHeight = window.innerHeight;

            setScrollY(currentScrollY);
            setWindowHeight(currentWindowHeight);
            lastScrollY.current = currentScrollY;

            rafRef.current = null;
        });
    }, []);

    useEffect(() => {
        // Set initial values
        setScrollY(window.scrollY);
        setWindowHeight(window.innerHeight);

        // Add scroll listener
        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, [handleScroll]);

    return { scrollY, windowHeight };
};

/**
 * ParallaxLayer Component
 * GPU-accelerated parallax with customizable speed and direction
 */
const ParallaxLayer = ({
    children,
    speed = 0.5,
    direction = "vertical", // 'vertical', 'horizontal', 'both'
    className = "",
    offset = 0,
    disabled = false,
    style = {},
    ...props
}) => {
    const elementRef = useRef(null);
    const { scrollY, windowHeight } = useParallaxScroll();
    const [isInView, setIsInView] = useState(false);
    const observerRef = useRef(null);

    // Check if user prefers reduced motion
    const respectsReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    // Intersection Observer for performance
    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        observerRef.current = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
            },
            {
                threshold: 0,
                rootMargin: "50px 0px",
            }
        );

        observerRef.current.observe(element);

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, []);

    // Calculate transform values
    const getTransform = () => {
        if (disabled || respectsReducedMotion || !isInView)
            return "translate3d(0, 0, 0)";

        const element = elementRef.current;
        if (!element) return "translate3d(0, 0, 0)";

        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + scrollY;
        const elementHeight = rect.height;

        // Calculate how much the element is in view
        const elementBottom = elementTop + elementHeight;
        const viewportTop = scrollY;
        const viewportBottom = scrollY + windowHeight;

        // Only apply parallax when element is in viewport
        if (elementBottom < viewportTop || elementTop > viewportBottom) {
            return "translate3d(0, 0, 0)";
        }

        // Calculate parallax offset
        const parallaxValue = (scrollY + offset) * speed;

        switch (direction) {
            case "horizontal":
                return `translate3d(${parallaxValue}px, 0, 0)`;
            case "both":
                return `translate3d(${parallaxValue}px, ${parallaxValue}px, 0)`;
            case "vertical":
            default:
                return `translate3d(0, ${parallaxValue}px, 0)`;
        }
    };

    const transformStyle = {
        transform: getTransform(),
        willChange:
            !disabled && !respectsReducedMotion && isInView
                ? "transform"
                : "auto",
        ...style,
    };

    return (
        <div
            ref={elementRef}
            className={className}
            style={transformStyle}
            {...props}
        >
            {children}
        </div>
    );
};

/**
 * ParallaxContainer Component
 * Container with overflow handling for parallax layers
 */
const ParallaxContainer = ({
    children,
    className = "",
    height = "auto",
    overflow = "hidden",
    ...props
}) => {
    return (
        <div
            className={`relative ${className}`}
            style={{
                height,
                overflow,
                // Enable hardware acceleration
                transform: "translateZ(0)",
                backfaceVisibility: "hidden",
                perspective: "1000px",
            }}
            {...props}
        >
            {children}
        </div>
    );
};

/**
 * ParallaxSection Component
 * Pre-configured section with common parallax patterns
 */
const ParallaxSection = ({
    children,
    background,
    foreground,
    backgroundSpeed = 0.3,
    foregroundSpeed = 0.7,
    className = "",
    minHeight = "100vh",
    ...props
}) => {
    return (
        <ParallaxContainer
            className={`${className}`}
            style={{ minHeight }}
            {...props}
        >
            {/* Background Layer */}
            {background && (
                <ParallaxLayer
                    speed={backgroundSpeed}
                    className="absolute inset-0 z-0"
                >
                    {background}
                </ParallaxLayer>
            )}

            {/* Content Layer */}
            <div className="relative z-10">{children}</div>

            {/* Foreground Layer */}
            {foreground && (
                <ParallaxLayer
                    speed={foregroundSpeed}
                    className="absolute inset-0 z-20 pointer-events-none"
                >
                    {foreground}
                </ParallaxLayer>
            )}
        </ParallaxContainer>
    );
};

/**
 * ParallaxText Component
 * Specialized text component with smooth parallax motion
 */
const ParallaxText = ({
    children,
    speed = 0.5,
    className = "",
    as: Component = "div",
    ...props
}) => {
    return (
        <ParallaxLayer speed={speed} className={className} {...props}>
            <Component>{children}</Component>
        </ParallaxLayer>
    );
};

export default ParallaxLayer;
export { ParallaxContainer, ParallaxSection, ParallaxText, useParallaxScroll };
