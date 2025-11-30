import React, { useState, useEffect } from "react";
import { cn } from "@/utils/cn";

/**
 * Toast Notification Component
 * For showing temporary messages
 */
function Toast({
    message,
    type = "info",
    duration = 4000,
    onClose,
    className = "",
}) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(() => onClose?.(), 300);
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const types = {
        success: "bg-green-500 text-white",
        error: "bg-red-500 text-white",
        warning: "bg-yellow-500 text-gray-900",
        info: "bg-blue-500 text-white",
    };

    return (
        <div
            className={cn(
                "fixed bottom-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg transition-all duration-300",
                types[type],
                isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-2",
                className
            )}
        >
            <div className="flex items-center gap-2">
                <span>{message}</span>
                <button
                    onClick={() => {
                        setIsVisible(false);
                        setTimeout(() => onClose?.(), 300);
                    }}
                    className="ml-2 text-current opacity-70 hover:opacity-100"
                >
                    ×
                </button>
            </div>
        </div>
    );
}

/**
 * Toast Container for managing multiple toasts
 */
export function ToastContainer({ toasts = [], onRemove }) {
    return (
        <div className="fixed bottom-4 right-4 z-50 space-y-2">
            {toasts.map((toast) => (
                <Toast
                    key={toast.id}
                    {...toast}
                    onClose={() => onRemove(toast.id)}
                />
            ))}
        </div>
    );
}

export default Toast;
