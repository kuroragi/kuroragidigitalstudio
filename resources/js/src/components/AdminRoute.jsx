import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import LoadingSpinner from "../components/ui/LoadingSpinner";

/**
 * Protected Route Component for Admin Portal
 * Redirects to login if not authenticated or not admin
 */
const AdminRoute = ({ children }) => {
    const { isAuthenticated, user, isLoading } = useAuth();

    // Show loading spinner while checking authentication
    if (isLoading) {
        return (
            <div className="min-h-screen bg-primary-bg flex items-center justify-center">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    // Redirect to login if not authenticated
    if (!isAuthenticated) {
        return <Navigate to="/portal" replace />;
    }

    // Check if user has admin role
    if (user?.role !== "admin") {
        return (
            <div className="min-h-screen bg-primary-bg flex items-center justify-center">
                <div className="text-center">
                    <div className="mb-4">
                        <svg
                            className="w-16 h-16 text-red-500 mx-auto"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z"
                            />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-primary-text mb-2">
                        Access Denied
                    </h2>
                    <p className="text-muted-text mb-6">
                        You don't have permission to access this area.
                    </p>
                    <Navigate to="/" replace />
                </div>
            </div>
        );
    }

    // Render protected content
    return children;
};

export default AdminRoute;
