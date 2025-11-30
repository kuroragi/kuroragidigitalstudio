import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import LoadingSpinner from "../ui/LoadingSpinner";

/**
 * Route Guard untuk protect authenticated routes
 */
export function AuthGuard({ children, redirectTo = "/portal" }) {
    const { isAuthenticated, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-950 flex items-center justify-center">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to={redirectTo} state={{ from: location }} replace />;
    }

    return children;
}

/**
 * Route Guard untuk admin-only routes
 */
export function AdminGuard({ children, redirectTo = "/" }) {
    const { user, isAuthenticated, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-950 flex items-center justify-center">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    if (!isAuthenticated || user?.role !== "admin") {
        return <Navigate to={redirectTo} state={{ from: location }} replace />;
    }

    return children;
}

/**
 * Route Guard untuk guest-only routes (seperti login page)
 */
export function GuestGuard({ children, redirectTo = "/" }) {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-950 flex items-center justify-center">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    if (isAuthenticated) {
        return <Navigate to={redirectTo} replace />;
    }

    return children;
}

/**
 * Route Guard dengan role-based access
 */
export function RoleGuard({ children, allowedRoles = [], redirectTo = "/" }) {
    const { user, isAuthenticated, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-950 flex items-center justify-center">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/portal" state={{ from: location }} replace />;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
        return <Navigate to={redirectTo} replace />;
    }

    return children;
}
