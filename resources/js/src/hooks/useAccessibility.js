import { useEffect, useState } from "react";

/**
 * Hook to detect user's accessibility preferences
 */
export const useAccessibility = () => {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
    const [prefersHighContrast, setPrefersHighContrast] = useState(false);
    const [focusVisible, setFocusVisible] = useState(false);

    useEffect(() => {
        // Check for reduced motion preference
        const reducedMotionQuery = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );
        setPrefersReducedMotion(reducedMotionQuery.matches);

        const handleReducedMotionChange = (e) =>
            setPrefersReducedMotion(e.matches);
        reducedMotionQuery.addEventListener(
            "change",
            handleReducedMotionChange
        );

        // Check for high contrast preference
        const highContrastQuery = window.matchMedia("(prefers-contrast: high)");
        setPrefersHighContrast(highContrastQuery.matches);

        const handleHighContrastChange = (e) =>
            setPrefersHighContrast(e.matches);
        highContrastQuery.addEventListener("change", handleHighContrastChange);

        // Apply reduced motion class to body if needed
        if (reducedMotionQuery.matches) {
            document.body.classList.add("reduced-motion");
        }

        // Keyboard focus detection for focus-visible polyfill
        const handleKeyDown = (e) => {
            if (e.key === "Tab") {
                setFocusVisible(true);
            }
        };

        const handleMouseDown = () => {
            setFocusVisible(false);
        };

        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("mousedown", handleMouseDown);

        return () => {
            reducedMotionQuery.removeEventListener(
                "change",
                handleReducedMotionChange
            );
            highContrastQuery.removeEventListener(
                "change",
                handleHighContrastChange
            );
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("mousedown", handleMouseDown);
        };
    }, []);

    return {
        prefersReducedMotion,
        prefersHighContrast,
        focusVisible,
        // Utility functions
        getAnimationClass: (normalClass) =>
            prefersReducedMotion ? "reduced-motion" : normalClass,
        getContrastClass: (normalClass, highContrastClass) =>
            prefersHighContrast ? highContrastClass : normalClass,
    };
};

/**
 * Hook for managing focus trap in modals/dropdowns
 */
export const useFocusTrap = (isActive = false) => {
    useEffect(() => {
        if (!isActive) return;

        const focusableElements =
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
        const modal =
            document.querySelector('[role="dialog"]') ||
            document.querySelector(".modal-content");

        if (!modal) return;

        const firstFocusableElement = modal.querySelector(focusableElements);
        const focusableContent = modal.querySelectorAll(focusableElements);
        const lastFocusableElement =
            focusableContent[focusableContent.length - 1];

        const handleTabKey = (e) => {
            if (e.key !== "Tab") return;

            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement?.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement?.focus();
                    e.preventDefault();
                }
            }
        };

        document.addEventListener("keydown", handleTabKey);

        // Focus first element when trap activates
        firstFocusableElement?.focus();

        return () => {
            document.removeEventListener("keydown", handleTabKey);
        };
    }, [isActive]);
};

/**
 * Hook for keyboard navigation support
 */
export const useKeyboardNavigation = (
    onEscape,
    onEnter,
    onArrowUp,
    onArrowDown
) => {
    useEffect(() => {
        const handleKeyDown = (e) => {
            switch (e.key) {
                case "Escape":
                    onEscape?.();
                    break;
                case "Enter":
                case " ": // Spacebar
                    onEnter?.(e);
                    break;
                case "ArrowUp":
                    onArrowUp?.(e);
                    e.preventDefault();
                    break;
                case "ArrowDown":
                    onArrowDown?.(e);
                    e.preventDefault();
                    break;
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [onEscape, onEnter, onArrowUp, onArrowDown]);
};

/**
 * Hook to announce content changes to screen readers
 */
export const useScreenReaderAnnouncement = () => {
    const [announcement, setAnnouncement] = useState("");

    const announce = (message, priority = "polite") => {
        setAnnouncement(""); // Clear first to ensure re-announcement
        setTimeout(() => setAnnouncement(message), 100);

        // Auto-clear after announcement
        setTimeout(() => setAnnouncement(""), 3000);
    };

    return { announcement, announce };
};

/**
 * Generate accessible IDs for form elements
 */
export const useAccessibleId = (prefix = "accessible") => {
    const [id] = useState(
        () => `${prefix}-${Math.random().toString(36).substr(2, 9)}`
    );
    return id;
};
