import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import LoadingSpinner from "./ui/LoadingSpinner";

/**
 * Protected Route Component
 * Protects admin routes dan redirects unauthenticated users
 */
function ProtectedRoute({ children }) {
    const { isAuthenticated, isLoading, user } = useAuth();
    const location = useLocation();

    // Show loading spinner while checking authentication
    if (isLoading) {
        return (
            <div className="min-h-screen bg-primary-bg flex items-center justify-center">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    // Redirect to portal login if not authenticated
    if (!isAuthenticated) {
        return <Navigate to="/portal" state={{ from: location }} replace />;
    }

    // Check if user has admin role
    if (user?.role !== "admin") {
        return (
            <div className="min-h-screen bg-primary-bg text-primary-text flex items-center justify-center">
                <div className="text-center p-8">
                    <h1 className="text-4xl font-bold mb-4 text-red-400">
                        Access Denied
                    </h1>
                    <p className="text-muted-text mb-6">
                        You don't have permission to access this area.
                    </p>
                    <button
                        onClick={() => window.history.back()}
                        className="px-6 py-3 bg-primary-blue text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    return children;
}

export default ProtectedRoute;
