import React from "react";
import { Link } from "react-router-dom";

/**
 * Footer Component
 * Minimal dan elegant design tanpa portal link untuk keamanan
 */
function Footer() {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { name: "About", href: "/about" },
        { name: "Services", href: "/services" },
        { name: "Portfolio", href: "/portfolio" },
        { name: "Contact", href: "/contact" },
    ];

    const socialLinks = [
        {
            name: "GitHub",
            href: "#",
            icon: (
                <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
            ),
        },
        {
            name: "LinkedIn",
            href: "#",
            icon: (
                <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
            ),
        },
        {
            name: "Twitter",
            href: "#",
            icon: (
                <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
            ),
        },
    ];

    return (
        <footer className="bg-surface border-t border-subtle-highlight mt-auto">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Main footer content */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
                    {/* Brand section */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xl font-heading">
                                    K
                                </span>
                            </div>
                            <div>
                                <span className="text-xl font-heading font-bold text-gradient">
                                    Kuroragi Digital Studio
                                </span>
                            </div>
                        </div>
                        <p className="text-muted-text mb-6 max-w-md leading-relaxed">
                            <span className="text-gradient font-medium">
                                "Shaping Ideas Into Digital Mastery"
                            </span>
                            <br />
                            <br />
                            Transforming visionary concepts into powerful
                            digital experiences through innovative design and
                            cutting-edge technology.
                        </p>

                        {/* Social links */}
                        <div className="flex space-x-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    className="p-2 rounded-lg text-muted-text hover:text-primary-blue hover:bg-subtle-highlight transition-all duration-200"
                                    aria-label={social.name}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick links */}
                    <div>
                        <h3 className="text-primary-text font-semibold mb-4">
                            Quick Links
                        </h3>
                        <nav className="space-y-3">
                            {quickLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    className="block text-muted-text hover:text-primary-blue transition-colors duration-200"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Contact info */}
                    <div>
                        <h3 className="text-primary-text font-semibold mb-4">
                            Get In Touch
                        </h3>
                        <div className="space-y-3 text-muted-text">
                            <div className="flex items-center space-x-3">
                                <svg
                                    className="w-4 h-4 text-primary-blue flex-shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                </svg>
                                <span>hello@kuroragi.studio</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <svg
                                    className="w-4 h-4 text-primary-blue flex-shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                                <span>Jakarta, Indonesia</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom section */}
                <div className="border-t border-subtle-highlight pt-8 mt-12">
                    <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                        <p className="text-muted-text text-sm">
                            &copy; {currentYear} Kuroragi Digital Studio. All
                            rights reserved.
                        </p>
                        <div className="flex space-x-6 text-sm">
                            <Link
                                to="/privacy"
                                className="text-muted-text hover:text-primary-blue transition-colors"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                to="/terms"
                                className="text-muted-text hover:text-primary-blue transition-colors"
                            >
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
