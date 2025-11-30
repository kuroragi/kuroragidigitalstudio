import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
    useFocusTrap,
    useKeyboardNavigation,
    useAccessibility,
} from "../../hooks/useAccessibility";

const AccessibleModal = ({
    isOpen,
    onClose,
    title,
    children,
    size = "md",
    closeOnBackdrop = true,
    closeOnEscape = true,
    className = "",
    ...props
}) => {
    const modalRef = useRef(null);
    const { getAnimationClass } = useAccessibility();

    // Focus management
    useFocusTrap(isOpen);

    // Keyboard navigation
    useKeyboardNavigation(
        closeOnEscape ? onClose : undefined, // Escape
        undefined, // Enter
        undefined, // Arrow up
        undefined // Arrow down
    );

    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            const originalStyle = window.getComputedStyle(
                document.body
            ).overflow;
            document.body.style.overflow = "hidden";

            return () => {
                document.body.style.overflow = originalStyle;
            };
        }
    }, [isOpen]);

    // Announce modal open/close to screen readers
    useEffect(() => {
        if (isOpen) {
            const announcement = document.createElement("div");
            announcement.setAttribute("aria-live", "polite");
            announcement.setAttribute("aria-atomic", "true");
            announcement.className = "sr-only";
            announcement.textContent = `Modal opened: ${title}`;
            document.body.appendChild(announcement);

            return () => {
                document.body.removeChild(announcement);
            };
        }
    }, [isOpen, title]);

    const sizes = {
        sm: "max-w-md",
        md: "max-w-lg",
        lg: "max-w-2xl",
        xl: "max-w-4xl",
        full: "max-w-full mx-4",
    };

    const handleBackdropClick = (e) => {
        if (closeOnBackdrop && e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;

    const modalContent = (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${getAnimationClass(
                "animate-fade-in"
            )}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? "modal-title" : undefined}
            onClick={handleBackdropClick}
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                aria-hidden="true"
            />

            {/* Modal */}
            <div
                ref={modalRef}
                className={`
                    relative w-full ${
                        sizes[size]
                    } bg-secondary-bg border border-subtle-highlight/30
                    rounded-xl shadow-2xl ${getAnimationClass(
                        "transform transition-all duration-200 animate-scale-in"
                    )}
                    max-h-[90vh] overflow-hidden flex flex-col ${className}
                `}
                {...props}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-subtle-highlight/30">
                    {title && (
                        <h2
                            id="modal-title"
                            className="text-xl font-semibold text-primary-text"
                        >
                            {title}
                        </h2>
                    )}

                    <button
                        type="button"
                        onClick={onClose}
                        className="
                            p-2 text-muted-text hover:text-primary-text rounded-lg
                            hover:bg-subtle-highlight/50 transition-colors duration-200
                            focus:outline-none focus:ring-2 focus:ring-primary-blue
                        "
                        aria-label="Close modal"
                    >
                        <svg
                            className="w-5 h-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto scrollbar-thin p-6">
                    {children}
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
};

export default AccessibleModal;
