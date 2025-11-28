import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./ui/Navbar";
import Footer from "./ui/Footer";
import LoadingSpinner from "./ui/LoadingSpinner";
import usePageMetadata from "../hooks/usePageMetadata";

/**
 * Main Layout Component
 * Provides consistent layout structure untuk public pages
 */
function Layout() {
    // Set default page metadata
    usePageMetadata({
        title: "Kuroragi Digital Studio",
        description:
            "Shaping Ideas Into Digital Mastery - Transform your visionary concepts into powerful digital experiences through innovative design and cutting-edge technology.",
        keywords:
            "web development, digital agency, UI/UX design, React development, Laravel development",
        ogTitle: "Kuroragi Digital Studio - Digital Mastery",
        ogDescription:
            "Professional web development and digital solutions agency specializing in modern web applications.",
    });

    return (
        <div className="min-h-screen bg-primary-bg text-primary-text flex flex-col">
            {/* Navigation */}
            <Navbar />

            {/* Main Content */}
            <main className="flex-1">
                <Suspense
                    fallback={
                        <div className="min-h-screen flex items-center justify-center">
                            <LoadingSpinner
                                variant="page"
                                size="lg"
                                text="Loading page..."
                            />
                        </div>
                    }
                >
                    <Outlet />
                </Suspense>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}

export default Layout;
