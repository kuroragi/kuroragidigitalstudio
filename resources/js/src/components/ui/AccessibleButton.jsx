import React from "react";
import { useAccessibility } from "../../hooks/useAccessibility";

const AccessibleButton = ({
    children,
    variant = "primary",
    size = "md",
    disabled = false,
    loading = false,
    onClick,
    type = "button",
    ariaLabel,
    ariaDescribedBy,
    className = "",
    ...props
}) => {
    const { getAnimationClass } = useAccessibility();

    const baseClasses = `
        inline-flex items-center justify-center font-medium rounded-lg
        border transition-all duration-200 focus:outline-none focus:ring-2
        focus:ring-primary-blue focus:ring-offset-2 focus:ring-offset-primary-bg
        disabled:opacity-50 disabled:cursor-not-allowed
        ${getAnimationClass("transform hover:scale-105")}
    `;

    const variants = {
        primary: `
            bg-primary-blue hover:bg-blue-600 text-white border-primary-blue
            shadow-lg hover:shadow-xl active:scale-95
        `,
        secondary: `
            bg-transparent hover:bg-primary-blue/10 text-primary-blue
            border-primary-blue hover:border-blue-400
        `,
        outline: `
            bg-transparent hover:bg-subtle-highlight text-primary-text
            border-subtle-highlight hover:border-primary-blue
        `,
        ghost: `
            bg-transparent hover:bg-subtle-highlight text-muted-text
            border-transparent hover:text-primary-text
        `,
        danger: `
            bg-red-600 hover:bg-red-700 text-white border-red-600
            shadow-lg hover:shadow-xl active:scale-95
        `,
    };

    const sizes = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-6 py-3 text-lg",
        xl: "px-8 py-4 text-xl",
    };

    const handleClick = (e) => {
        if (disabled || loading) {
            e.preventDefault();
            return;
        }
        onClick?.(e);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick(e);
        }
    };

    return (
        <button
            type={type}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            disabled={disabled || loading}
            aria-label={ariaLabel}
            aria-describedby={ariaDescribedBy}
            aria-busy={loading}
            className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {loading && (
                <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                </svg>
            )}
            {children}
            <span className="sr-only">
                {loading ? "Loading" : ""}
                {disabled ? "Disabled" : ""}
            </span>
        </button>
    );
};

export default AccessibleButton;
