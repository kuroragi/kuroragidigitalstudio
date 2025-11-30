import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import LoadingSpinner from "../components/ui/LoadingSpinner";

/**
 * Portal Login Page Component
 * Hidden admin login accessible via direct URL only
 */
function PortalLogin() {
    const { login, isAuthenticated, isLoading, error } = useAuth();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Redirect if already authenticated
    if (isAuthenticated) {
        return <Navigate to="/portal/dashboard" replace />;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const result = await login(formData.email, formData.password);

        setIsSubmitting(false);

        if (result.success) {
            // Redirect will happen automatically via Navigate above
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-primary-bg flex items-center justify-center">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-primary-bg flex items-center justify-center px-6">
            <div className="max-w-md w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-primary-text mb-2">
                        Portal Access
                    </h1>
                    <p className="text-muted-text">Authorized personnel only</p>
                </div>

                {/* Login Form */}
                <div className="bg-surface p-8 rounded-xl border border-subtle-highlight">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                                {error}
                            </div>
                        )}

                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium mb-2"
                            >
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-primary-bg border border-subtle-highlight rounded-lg focus:border-primary-blue focus:outline-none"
                                placeholder="admin@kuroragidigital.studio"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium mb-2"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-primary-bg border border-subtle-highlight rounded-lg focus:border-primary-blue focus:outline-none"
                                placeholder="Enter your password"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full px-6 py-3 bg-primary-blue text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            {isSubmitting ? (
                                <>
                                    <LoadingSpinner
                                        size="sm"
                                        className="mr-2"
                                    />
                                    Signing In...
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </button>
                    </form>
                </div>

                {/* Development hint */}
                {process.env.NODE_ENV === "development" && (
                    <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-400 text-sm">
                        <strong>Development:</strong> Use
                        admin@kuroragidigital.studio / admin123
                    </div>
                )}
            </div>
        </div>
    );
}

export default PortalLogin;
