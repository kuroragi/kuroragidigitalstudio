import React, { useEffect, useState } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import AppRoutes from "./routes/AppRoutes";
import ErrorBoundary from "./components/ui/ErrorBoundary";

// Import performance monitoring in development
import {
    PerformanceDashboard,
    useWebVitals,
} from "./hooks/usePerformanceMonitor.jsx";

// Import accessibility testing in development
if (process.env.NODE_ENV === "development") {
    import("./utils/accessibilityTest.js");
}

/**
 * Scroll Restoration Component
 * Automatically scrolls to top on route changes
 */
function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        // Scroll to top on route change, but preserve scroll for portal routes
        if (!pathname.startsWith("/portal")) {
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }
    }, [pathname]);

    return null;
}

/**
 * Root App component
 * Provides routing, authentication context, error handling, dan scroll management
 */
function App() {
    const [showPerformanceDashboard, setShowPerformanceDashboard] =
        useState(false);

    // Performance monitoring
    const { vitals, customMetrics } = useWebVitals();

    // Setup aplikasi dan font preloading
    useEffect(() => {
        // Set initial theme class
        document.documentElement.classList.add("dark");

        // Disable default browser scroll restoration
        if ("scrollRestoration" in history) {
            history.scrollRestoration = "manual";
        }
    }, []);

    return (
        <ErrorBoundary>
            <BrowserRouter>
                <AuthProvider>
                    <div className="min-h-screen bg-primary-bg text-primary-text antialiased">
                        <ScrollToTop />
                        <AppRoutes />
                    </div>
                </AuthProvider>

                {/* Performance Dashboard - Development Only */}
                <PerformanceDashboard isVisible={showPerformanceDashboard} />

                {/* Performance Dashboard Toggle - Development Only */}
                {process.env.NODE_ENV === "development" && (
                    <button
                        onClick={() =>
                            setShowPerformanceDashboard(
                                !showPerformanceDashboard
                            )
                        }
                        className="fixed bottom-4 left-4 bg-blue-600 text-white p-2 rounded text-xs z-50"
                        title="Toggle Performance Dashboard"
                    >
                        📊
                    </button>
                )}
            </BrowserRouter>
        </ErrorBoundary>
    );
}

export default App;
