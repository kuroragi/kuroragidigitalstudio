import React, { Suspense, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./ui/Navbar";
import Footer from "./ui/Footer";
import LoadingSpinner from "./ui/LoadingSpinner";
import SkipLinks from "./ui/SkipLinks";
import ScreenReaderAnnouncement, {
    setGlobalAnnounce,
} from "./ui/ScreenReaderAnnouncement";
import { useScreenReaderAnnouncement } from "../hooks/useAccessibility";
import usePageMetadata from "../hooks/usePageMetadata";

/**
 * Main Layout Component with Accessibility Features
 * Provides consistent layout structure with accessibility enhancements
 */
function Layout() {
    const { announce } = useScreenReaderAnnouncement();

    // Set up global announcement function
    useEffect(() => {
        setGlobalAnnounce(announce);
    }, [announce]);

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
            {/* Skip Links for keyboard navigation */}
            <SkipLinks />

            {/* Screen Reader Announcements */}
            <ScreenReaderAnnouncement />

            {/* Navigation */}
            <header id="navigation" role="banner">
                <Navbar />
            </header>

            {/* Main Content */}
            <main
                id="main-content"
                role="main"
                className="flex-1"
                tabIndex="-1"
            >
                <Suspense
                    fallback={
                        <div
                            className="min-h-screen flex items-center justify-center"
                            role="status"
                            aria-live="polite"
                        >
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
            <footer id="footer" role="contentinfo">
                <Footer />
            </footer>
        </div>
    );
}

export default Layout;
