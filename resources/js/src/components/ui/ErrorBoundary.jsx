import React from "react";

/**
 * Enhanced Error Boundary Component
 * Catches JavaScript errors di component tree dan displays fallback UI
 */
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
            eventId: null,
        };
    }

    static getDerivedStateFromError(error) {
        // Update state untuk show fallback UI
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // Log error details
        console.error("Error Boundary caught an error:", error, errorInfo);

        // Generate unique error ID untuk tracking
        const eventId =
            Date.now().toString(36) + Math.random().toString(36).substr(2);

        this.setState({
            error: error,
            errorInfo: errorInfo,
            eventId: eventId,
        });

        // Report to error tracking service (Sentry, etc.)
        // this.reportError(error, errorInfo, eventId);
    }

    // Method untuk report error ke service
    reportError(error, errorInfo, eventId) {
        // Implementation untuk error reporting
        // Bisa integrate dengan Sentry, LogRocket, etc.
        try {
            fetch("/api/errors", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    error: error.toString(),
                    errorInfo: errorInfo,
                    eventId: eventId,
                    userAgent: navigator.userAgent,
                    url: window.location.href,
                    timestamp: new Date().toISOString(),
                }),
            });
        } catch (reportingError) {
            console.error("Failed to report error:", reportingError);
        }
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-primary-bg text-primary-text flex items-center justify-center">
                    <div className="text-center p-8 max-w-lg">
                        <div className="w-16 h-16 mx-auto mb-6 bg-gradient-primary rounded-full flex items-center justify-center">
                            <svg
                                className="w-8 h-8 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                                />
                            </svg>
                        </div>

                        <h1 className="text-4xl font-heading font-bold mb-4 text-gradient">
                            Oops! Something went wrong
                        </h1>
                        <p className="text-muted-text mb-6 leading-relaxed">
                            We're sorry, but something unexpected happened.
                            <br />
                            Please refresh the page or try again later.
                        </p>

                        {this.state.eventId && (
                            <p className="text-xs text-muted-text mb-6 font-mono bg-surface px-3 py-2 rounded">
                                Error ID: {this.state.eventId}
                            </p>
                        )}

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => window.location.reload()}
                                className="btn-primary"
                            >
                                <svg
                                    className="w-4 h-4 mr-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                    />
                                </svg>
                                Refresh Page
                            </button>

                            <button
                                onClick={() => window.history.back()}
                                className="btn-secondary"
                            >
                                <svg
                                    className="w-4 h-4 mr-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                    />
                                </svg>
                                Go Back
                            </button>
                        </div>

                        {/* Show error details in development */}
                        {process.env.NODE_ENV === "development" &&
                            this.state.error && (
                                <details className="mt-6 text-left">
                                    <summary className="cursor-pointer text-accent-cyan hover:underline">
                                        Error Details (Development)
                                    </summary>
                                    <pre className="mt-2 p-4 bg-surface rounded text-xs overflow-auto text-red-400">
                                        {this.state.error.toString()}
                                        {this.state.errorInfo.componentStack}
                                    </pre>
                                </details>
                            )}
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
