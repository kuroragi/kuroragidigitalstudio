import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useKeyboardNavigation } from "../../hooks/useAccessibility";

/**
 * Advanced Navbar Component
 * Features: sticky behavior, transparent→solid transition, responsive design
 */
function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { isAuthenticated, user } = useAuth();
    const location = useLocation();
    const { handleKeyDown } = useKeyboardNavigation();

    // Scroll effect untuk transparent → solid transition
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsScrolled(scrollPosition > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    const navigationItems = [
        { name: "Home", href: "/", exact: true },
        { name: "About", href: "/about" },
        { name: "Services", href: "/services" },
        { name: "Portfolio", href: "/portfolio" },
        { name: "Blog", href: "/blog" },
        { name: "Contact", href: "/contact" },
    ];

    const isActivePath = (href, exact = false) => {
        if (exact) {
            return location.pathname === href;
        }
        return location.pathname.startsWith(href);
    };

    return (
        <>
            <nav
                role="navigation"
                aria-label="Main navigation"
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    isScrolled
                        ? "bg-surface/95 backdrop-blur-md border-b border-subtle-highlight shadow-lg"
                        : "bg-transparent"
                }`}
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 lg:h-20">
                        {/* Logo */}
                        <div className="flex items-center">
                            <Link
                                to="/"
                                className="flex items-center space-x-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg"
                                aria-label="Kuroragi Digital Studio - Go to homepage"
                            >
                                <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
                                    <span className="text-white font-bold text-xl font-heading">
                                        K
                                    </span>
                                </div>
                                <div className="hidden sm:block">
                                    <span className="text-xl font-heading font-bold text-gradient">
                                        Kuroragi
                                    </span>
                                    <div className="text-sm text-muted-text font-medium">
                                        Digital Studio
                                    </div>
                                </div>
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:block">
                            <div className="flex items-center space-x-8">
                                {navigationItems.map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                                            isActivePath(item.href, item.exact)
                                                ? "text-primary-blue"
                                                : "text-muted-text hover:text-primary-text"
                                        }`}
                                    >
                                        {item.name}
                                        {isActivePath(
                                            item.href,
                                            item.exact
                                        ) && (
                                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-primary rounded-full" />
                                        )}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Right side - Admin/Auth */}
                        <div className="flex items-center space-x-4">
                            {/* Admin link (hidden, only show if authenticated) */}
                            {isAuthenticated && user?.role === "admin" && (
                                <Link
                                    to="/admin/dashboard"
                                    className="hidden lg:flex items-center space-x-2 px-4 py-2 bg-subtle-highlight rounded-lg hover:bg-primary-blue/20 transition-colors text-sm font-medium text-muted-text hover:text-primary-blue"
                                >
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                    <span>Admin</span>
                                </Link>
                            )}

                            {/* Mobile menu button */}
                            <button
                                className="lg:hidden p-2 rounded-lg text-muted-text hover:text-primary-text hover:bg-subtle-highlight transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                                onClick={() =>
                                    setIsMobileMenuOpen(!isMobileMenuOpen)
                                }
                                onKeyDown={(e) =>
                                    handleKeyDown(e, () =>
                                        setIsMobileMenuOpen(!isMobileMenuOpen)
                                    )
                                }
                                aria-label="Toggle mobile menu"
                                aria-expanded={isMobileMenuOpen}
                                aria-controls="mobile-menu"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    {isMobileMenuOpen ? (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    ) : (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile menu */}
            <div
                id="mobile-menu"
                role="dialog"
                aria-modal="true"
                aria-label="Mobile navigation menu"
                className={`lg:hidden fixed inset-0 z-40 transition-opacity duration-300 ${
                    isMobileMenuOpen
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                }`}
            >
                {/* Backdrop */}
                <div
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                />

                {/* Menu panel */}
                <div
                    className={`absolute top-16 left-4 right-4 bg-surface border border-subtle-highlight rounded-xl shadow-xl transform transition-all duration-300 ${
                        isMobileMenuOpen
                            ? "translate-y-0 opacity-100 scale-100"
                            : "-translate-y-4 opacity-0 scale-95"
                    }`}
                >
                    <div className="p-6">
                        <nav
                            className="space-y-4"
                            role="navigation"
                            aria-label="Mobile navigation links"
                        >
                            {navigationItems.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                                        isActivePath(item.href, item.exact)
                                            ? "bg-primary-blue text-white"
                                            : "text-muted-text hover:text-primary-text hover:bg-subtle-highlight"
                                    }`}
                                >
                                    {item.name}
                                </Link>
                            ))}

                            {/* Admin link for mobile */}
                            {isAuthenticated && user?.role === "admin" && (
                                <Link
                                    to="/admin/dashboard"
                                    className="block px-4 py-3 rounded-lg text-base font-medium text-muted-text hover:text-primary-text hover:bg-subtle-highlight border-t border-subtle-highlight mt-4 pt-4"
                                >
                                    <div className="flex items-center space-x-2">
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                        </svg>
                                        <span>Admin Panel</span>
                                    </div>
                                </Link>
                            )}
                        </nav>
                    </div>
                </div>
            </div>

            {/* Spacer for fixed navbar */}
            <div className="h-16 lg:h-20" />
        </>
    );
}

export default Navbar;
