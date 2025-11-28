import React, { useEffect } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import AppRoutes from "./routes/AppRoutes";
import ErrorBoundary from "./components/ui/ErrorBoundary";

/**
 * Scroll Restoration Component
 * Automatically scrolls to top on route changes
 */
function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        // Scroll to top on route change, but preserve scroll for admin routes
        if (!pathname.startsWith("/admin")) {
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
            </BrowserRouter>
        </ErrorBoundary>
    );
}

export default App;
