import { forwardRef, useState } from "react";
import { cn } from "@/utils/cn";

// Base Card component dengan hover effects
const Card = forwardRef(
    (
        {
            className = "",
            children,
            variant = "default",
            size = "medium",
            hover = true,
            interactive = false,
            glowOnHover = false,
            onClick,
            ...props
        },
        ref
    ) => {
        const [isHovered, setIsHovered] = useState(false);

        const variants = {
            default: "bg-gray-900/50 border-gray-700/50",
            elevated: "bg-gray-800/60 border-gray-600/40",
            glass: "bg-gray-900/30 backdrop-blur-sm border-gray-600/30",
            solid: "bg-gray-800 border-gray-700",
        };

        const sizes = {
            small: "p-4",
            medium: "p-6",
            large: "p-8",
        };

        const hoverEffects = hover
            ? [
                  "transition-all duration-300 ease-out",
                  "hover:transform hover:scale-[1.02]",
                  "hover:-translate-y-2",
                  "hover:shadow-2xl hover:shadow-blue-500/20",
                  glowOnHover &&
                      "hover:border-blue-400/60 hover:shadow-blue-400/25",
              ]
                  .filter(Boolean)
                  .join(" ")
            : "";

        const interactiveEffects = interactive
            ? [
                  "cursor-pointer",
                  "active:scale-[0.98]",
                  "active:translate-y-0",
              ].join(" ")
            : "";

        return (
            <div
                ref={ref}
                className={cn(
                    // Base styles
                    "border rounded-xl",
                    "backdrop-blur-sm",

                    // Variant styles
                    variants[variant],

                    // Size styles
                    sizes[size],

                    // Hover effects
                    hoverEffects,

                    // Interactive effects
                    interactiveEffects,

                    // Custom className
                    className
                )}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={onClick}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Card.displayName = "Card";

// Card Header component
const CardHeader = ({ className = "", children, ...props }) => (
    <div className={cn("flex flex-col space-y-2", className)} {...props}>
        {children}
    </div>
);

// Card Title component
const CardTitle = ({
    className = "",
    children,
    as: Component = "h3",
    ...props
}) => (
    <Component
        className={cn(
            "text-lg font-semibold tracking-tight text-gray-100",
            className
        )}
        {...props}
    >
        {children}
    </Component>
);

// Card Description component
const CardDescription = ({ className = "", children, ...props }) => (
    <p
        className={cn("text-sm text-gray-400 leading-relaxed", className)}
        {...props}
    >
        {children}
    </p>
);

// Card Content/Body component
const CardContent = ({ className = "", children, ...props }) => (
    <div className={cn("pt-4", className)} {...props}>
        {children}
    </div>
);

// Card Footer component
const CardFooter = ({ className = "", children, ...props }) => (
    <div
        className={cn(
            "flex items-center justify-between pt-4 mt-auto",
            className
        )}
        {...props}
    >
        {children}
    </div>
);

// Card Image component
const CardImage = ({
    src,
    alt,
    className = "",
    aspectRatio = "aspect-video",
    overlay = false,
    overlayContent,
    ...props
}) => (
    <div
        className={cn(
            "relative overflow-hidden rounded-lg mb-4",
            aspectRatio,
            className
        )}
    >
        <img
            src={src}
            alt={alt}
            className={cn(
                "w-full h-full object-cover",
                "transition-transform duration-300 ease-out",
                "group-hover:scale-105"
            )}
            {...props}
        />
        {overlay && (
            <div
                className={cn(
                    "absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent",
                    "flex items-end justify-start p-4"
                )}
            >
                {overlayContent}
            </div>
        )}
    </div>
);

// Card Icon component
const CardIcon = ({
    icon: Icon,
    className = "",
    variant = "default",
    size = "medium",
    ...props
}) => {
    const variants = {
        default: "text-blue-400",
        primary: "text-blue-400",
        secondary: "text-gray-400",
        success: "text-emerald-400",
        warning: "text-yellow-400",
        danger: "text-red-400",
    };

    const sizes = {
        small: "w-4 h-4",
        medium: "w-6 h-6",
        large: "w-8 h-8",
        xl: "w-12 h-12",
    };

    return (
        <div
            className={cn(
                "flex items-center justify-center rounded-lg mb-4",
                "bg-gray-800/50 border border-gray-700/50",
                "w-fit p-3",
                className
            )}
        >
            <Icon
                className={cn(
                    sizes[size],
                    variants[variant],
                    "transition-colors duration-200"
                )}
                {...props}
            />
        </div>
    );
};

// Export all components
export {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
    CardImage,
    CardIcon,
};

export default Card;
