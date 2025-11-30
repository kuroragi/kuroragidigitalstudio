import React from "react";
import { cn } from "@/utils/cn";

/**
 * Badge Component
 * Small labels untuk status, categories, etc.
 */
function Badge({
    variant = "default",
    size = "md",
    children,
    className = "",
    ...props
}) {
    const baseClasses = "inline-flex items-center font-medium rounded-full";

    const variants = {
        default: "bg-gray-800 text-gray-200",
        primary: "bg-blue-500 text-white",
        secondary: "bg-cyan-500 text-gray-900",
        success: "bg-green-500 text-white",
        warning: "bg-yellow-500 text-gray-900",
        danger: "bg-red-500 text-white",
        outline: "border border-gray-600 text-gray-300",
    };

    const sizes = {
        sm: "px-2 py-0.5 text-xs",
        md: "px-2.5 py-1 text-sm",
        lg: "px-3 py-1.5 text-base",
    };

    return (
        <span
            className={cn(
                baseClasses,
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        >
            {children}
        </span>
    );
}

export default Badge;
