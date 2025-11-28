import React from "react";

/**
 * Enhanced Loading Spinner Component
 * Multiple variants dan animations untuk berbagai use cases
 */
function LoadingSpinner({
    size = "md",
    variant = "spinner",
    className = "",
    text = "Loading...",
}) {
    const sizeClasses = {
        xs: "w-3 h-3",
        sm: "w-4 h-4",
        md: "w-8 h-8",
        lg: "w-12 h-12",
        xl: "w-16 h-16",
        xxl: "w-24 h-24",
    };

    const textSizeClasses = {
        xs: "text-xs",
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
        xl: "text-xl",
        xxl: "text-2xl",
    };

    // Spinner variant (default)
    if (variant === "spinner") {
        return (
            <div className={`inline-flex items-center ${className}`}>
                <div
                    className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-primary-blue border-t-transparent`}
                >
                    <span className="sr-only">{text}</span>
                </div>
            </div>
        );
    }

    // Dots variant
    if (variant === "dots") {
        const dotSize = {
            xs: "w-1 h-1",
            sm: "w-1.5 h-1.5",
            md: "w-2 h-2",
            lg: "w-3 h-3",
            xl: "w-4 h-4",
            xxl: "w-5 h-5",
        };

        return (
            <div className={`flex items-center space-x-1 ${className}`}>
                <div
                    className={`${dotSize[size]} bg-primary-blue rounded-full animate-bounce`}
                    style={{ animationDelay: "0ms" }}
                />
                <div
                    className={`${dotSize[size]} bg-primary-blue rounded-full animate-bounce`}
                    style={{ animationDelay: "150ms" }}
                />
                <div
                    className={`${dotSize[size]} bg-primary-blue rounded-full animate-bounce`}
                    style={{ animationDelay: "300ms" }}
                />
                <span className="sr-only">{text}</span>
            </div>
        );
    }

    // Pulse variant
    if (variant === "pulse") {
        return (
            <div className={`inline-flex items-center ${className}`}>
                <div
                    className={`${sizeClasses[size]} bg-gradient-primary rounded-full animate-pulse`}
                >
                    <span className="sr-only">{text}</span>
                </div>
            </div>
        );
    }

    // Full page variant dengan text
    if (variant === "page") {
        return (
            <div
                className={`flex flex-col items-center justify-center space-y-4 ${className}`}
            >
                <div
                    className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-primary-blue border-t-transparent`}
                />
                <p
                    className={`${textSizeClasses[size]} text-muted-text font-medium`}
                >
                    {text}
                </p>
            </div>
        );
    }

    // Text with spinner variant
    if (variant === "text") {
        return (
            <div className={`inline-flex items-center space-x-3 ${className}`}>
                <div
                    className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-primary-blue border-t-transparent`}
                />
                <span
                    className={`${textSizeClasses[size]} text-muted-text font-medium`}
                >
                    {text}
                </span>
            </div>
        );
    }

    // Meteor-themed variant
    if (variant === "meteor") {
        return (
            <div className={`inline-flex items-center ${className}`}>
                <div className={`relative ${sizeClasses[size]}`}>
                    <div className="absolute inset-0 rounded-full bg-gradient-primary animate-ping opacity-20" />
                    <div
                        className="relative rounded-full bg-gradient-primary animate-pulse"
                        style={{ width: "100%", height: "100%" }}
                    >
                        <div
                            className="absolute inset-0 rounded-full bg-accent-cyan animate-pulse"
                            style={{
                                width: "60%",
                                height: "60%",
                                top: "20%",
                                left: "20%",
                            }}
                        />
                    </div>
                    <span className="sr-only">{text}</span>
                </div>
            </div>
        );
    }

    // Default to spinner
    return (
        <div className={`inline-flex items-center ${className}`}>
            <div
                className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-primary-blue border-t-transparent`}
            >
                <span className="sr-only">{text}</span>
            </div>
        </div>
    );
}

export default LoadingSpinner;
