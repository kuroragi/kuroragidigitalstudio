import React from "react";
import { Link } from "react-router-dom";

/**
 * 404 Not Found Page Component
 */
function NotFound() {
    return (
        <div className="min-h-screen bg-primary-bg text-primary-text flex items-center justify-center px-6">
            <div className="text-center max-w-lg">
                <h1 className="text-8xl font-bold text-primary-blue mb-4">
                    404
                </h1>
                <h2 className="text-3xl font-bold mb-6">Page Not Found</h2>
                <p className="text-muted-text mb-8">
                    The page you're looking for doesn't exist or has been moved
                    to another location.
                </p>

                <div className="space-x-4">
                    <Link
                        to="/"
                        className="inline-block px-6 py-3 bg-primary-blue text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Go Home
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="inline-block px-6 py-3 border border-primary-blue text-primary-blue rounded-lg hover:bg-primary-blue hover:text-white transition-colors"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NotFound;
