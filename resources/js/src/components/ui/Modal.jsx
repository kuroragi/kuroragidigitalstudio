import React, { useState, useEffect } from "react";

/**
 * Modal Component
 * Reusable modal dengan backdrop, animations, dan keyboard support
 */
function Modal({
    isOpen = false,
    onClose,
    title,
    children,
    size = "md",
    showCloseButton = true,
    closeOnBackdrop = true,
    className = "",
}) {
    const [isAnimating, setIsAnimating] = useState(false);

    // Handle ESC key press
    useEffect(() => {
        const handleEscKey = (event) => {
            if (event.key === "Escape" && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEscKey);
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.removeEventListener("keydown", handleEscKey);
            document.body.style.overflow = "unset";
        };
    }, [isOpen, onClose]);

    // Animation handling
    useEffect(() => {
        if (isOpen) {
            setIsAnimating(true);
        } else {
            const timer = setTimeout(() => setIsAnimating(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    const sizes = {
        sm: "max-w-md",
        md: "max-w-lg",
        lg: "max-w-2xl",
        xl: "max-w-4xl",
        full: "max-w-[95vw]",
    };

    if (!isOpen && !isAnimating) return null;

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
                isOpen ? "opacity-100" : "opacity-0"
            }`}
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={closeOnBackdrop ? onClose : undefined}
            />

            {/* Modal content */}
            <div
                className={`relative w-full ${
                    sizes[size]
                } bg-gray-900 border border-gray-700 rounded-xl shadow-xl transform transition-all duration-300 ${
                    isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
                } ${className}`}
            >
                {/* Header */}
                {(title || showCloseButton) && (
                    <div className="flex items-center justify-between p-6 border-b border-gray-700">
                        {title && (
                            <h3 className="text-xl font-semibold text-gray-100">
                                {title}
                            </h3>
                        )}

                        {showCloseButton && (
                            <button
                                onClick={onClose}
                                className="p-2 text-gray-400 hover:text-gray-100 hover:bg-gray-800 rounded-lg transition-colors"
                                aria-label="Close modal"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        )}
                    </div>
                )}

                {/* Content */}
                <div className="p-6">{children}</div>
            </div>
        </div>
    );
}

export default Modal;
