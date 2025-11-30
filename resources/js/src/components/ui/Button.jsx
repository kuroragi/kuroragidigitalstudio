import React from "react";
import { useAccessibility } from "../../hooks/useAccessibility";

/**
 * Button Component
 * Unified button component with accessibility enhancements and various variants
 */
function Button({
    variant = "primary",
    size = "md",
    isLoading = false,
    isDisabled = false,
    leftIcon = null,
    rightIcon = null,
    children,
    className = "",
    as: Component = "button",
    "aria-label": ariaLabel,
    "aria-describedby": ariaDescribedBy,
    ...props
}) {
    const { prefersReducedMotion } = useAccessibility();

    const baseClasses = `inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${
        prefersReducedMotion ? "" : "hover:scale-105 active:scale-95"
    }`;

    const variants = {
        primary:
            "bg-gradient-to-r from-primary-blue to-accent-cyan text-white hover:shadow-lg hover:shadow-primary-blue/25 focus-visible:ring-primary-blue",
        secondary:
            "border-2 border-primary-blue text-primary-blue bg-transparent hover:bg-primary-blue hover:text-white focus-visible:ring-primary-blue",
        outline:
            "border border-gray-600 text-gray-300 bg-transparent hover:bg-gray-600 hover:text-white focus-visible:ring-gray-500",
        ghost: "text-primary-blue bg-transparent hover:bg-primary-blue/10 hover:text-accent-cyan focus-visible:ring-primary-blue",
        danger: "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500",
        success:
            "bg-green-600 text-white hover:bg-green-700 focus-visible:ring-green-500",
    };

    const sizes = {
        xs: "px-2 py-1 text-xs",
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-sm",
        lg: "px-6 py-3 text-base",
        xl: "px-8 py-4 text-lg",
    };

    const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

    return (
        <Component
            className={classes}
            disabled={isDisabled || isLoading}
            aria-label={ariaLabel}
            aria-describedby={ariaDescribedBy}
            aria-busy={isLoading}
            {...props}
        >
            {isLoading ? (
                <div className="flex items-center">
                    <div
                        className={`w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2 ${
                            prefersReducedMotion ? "" : "animate-spin"
                        }`}
                        aria-hidden="true"
                    />
                    <span className="sr-only">Loading, please wait...</span>
                    Loading...
                </div>
            ) : (
                <>
                    {leftIcon && (
                        <span className="mr-2" aria-hidden="true">
                            {leftIcon}
                        </span>
                    )}
                    {children}
                    {rightIcon && (
                        <span className="ml-2" aria-hidden="true">
                            {rightIcon}
                        </span>
                    )}
                </>
            )}
        </Component>
    );
}

export default Button;
