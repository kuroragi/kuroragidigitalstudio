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
        <footer
            className="relative bg-surface border-t border-subtle-highlight mt-auto overflow-hidden"
            role="contentinfo"
            aria-label="Site footer with company information and links"
        >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-primary-orange to-primary-blue rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-24 h-24 bg-gradient-to-br from-primary-blue to-primary-orange rounded-full blur-2xl"></div>
                <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-primary-orange rounded-full blur-xl opacity-60"></div>
            </div>

            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Main footer content */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                    {/* Brand section - Enhanced */}
                    <div className="col-span-1 lg:col-span-6">
                        <div className="mb-8">
                            <div className="flex items-center space-x-4 mb-6">
                                <div className="relative">
                                    <div className="w-14 h-14 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-lg">
                                        <span className="text-white font-bold text-2xl font-heading">
                                            K
                                        </span>
                                    </div>
                                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary-orange rounded-full animate-pulse"></div>
                                </div>
                                <div>
                                    <h2 className="text-2xl lg:text-3xl font-heading font-bold text-gradient mb-1">
                                        Kuroragi Digital Studio
                                    </h2>
                                    <p className="text-primary-orange font-medium text-sm tracking-wide">
                                        Digital Innovation Partner
                                    </p>
                                </div>
                            </div>
                            
                            <div className="bg-subtle-highlight/30 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-subtle-highlight/50">
                                <p className="text-primary-orange font-semibold text-lg mb-3 tracking-wide">
                                    "Shaping Ideas Into Digital Mastery"
                                </p>
                                <p className="text-muted-text leading-relaxed">
                                    Transforming visionary concepts into powerful digital experiences 
                                    through innovative design, cutting-edge technology, and strategic thinking 
                                    that drives measurable results for your business.
                                </p>
                            </div>
                        </div>

                        {/* Enhanced Social links */}
                        <div className="space-y-4">
                            <h3 className="text-primary-text font-semibold text-lg">
                                Connect With Us
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {socialLinks.map((social, index) => (
                                    <a
                                        key={social.name}
                                        href={social.href}
                                        className="group relative p-3 rounded-xl bg-subtle-highlight/30 backdrop-blur-sm border border-subtle-highlight/50 text-muted-text hover:text-white hover:bg-gradient-primary transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                                        aria-label={social.name}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ animationDelay: `${index * 100}ms` }}
                                    >
                                        <div className="relative z-10">
                                            {social.icon}
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-primary rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Navigation & Contact - Enhanced */}
                    <div className="col-span-1 lg:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Quick links */}
                        <div className="bg-subtle-highlight/20 backdrop-blur-sm rounded-2xl p-6 border border-subtle-highlight/30">
                            <h3 className="text-primary-text font-semibold text-lg mb-6 flex items-center">
                                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center mr-3">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </div>
                                Quick Links
                            </h3>
                            <nav
                                className="space-y-3"
                                role="navigation"
                                aria-label="Quick navigation links"
                            >
                                {quickLinks.map((link, index) => (
                                    <Link
                                        key={link.name}
                                        to={link.href}
                                        className="group flex items-center text-muted-text hover:text-primary-blue transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg p-2 hover:bg-subtle-highlight/40"
                                        style={{ animationDelay: `${index * 50}ms` }}
                                    >
                                        <div className="w-2 h-2 bg-primary-orange rounded-full mr-3 opacity-60 group-hover:opacity-100 transition-opacity"></div>
                                        {link.name}
                                    </Link>
                                ))}
                            </nav>
                        </div>

                        {/* Contact info */}
                        <div className="bg-subtle-highlight/20 backdrop-blur-sm rounded-2xl p-6 border border-subtle-highlight/30">
                            <h3 className="text-primary-text font-semibold text-lg mb-6 flex items-center">
                                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center mr-3">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                </div>
                                Get In Touch
                            </h3>
                            <div className="space-y-4">
                                <div className="group flex items-start space-x-4 p-3 rounded-lg hover:bg-subtle-highlight/30 transition-colors">
                                    <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center flex-shrink-0">
                                        <svg
                                            className="w-5 h-5 text-white"
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
                                    </div>
                                    <div>
                                        <p className="text-muted-text text-sm mb-1">Email</p>
                                        <p className="text-primary-text font-medium">hello@kuroragi.studio</p>
                                    </div>
                                </div>
                                
                                <div className="group flex items-start space-x-4 p-3 rounded-lg hover:bg-subtle-highlight/30 transition-colors">
                                    <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center flex-shrink-0">
                                        <svg
                                            className="w-5 h-5 text-white"
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
                                    </div>
                                    <div>
                                        <p className="text-muted-text text-sm mb-1">Location</p>
                                        <p className="text-primary-text font-medium">Jakarta, Indonesia</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Enhanced Bottom section */}
                <div className="relative mt-16">
                    {/* Decorative separator */}
                    <div className="flex items-center justify-center mb-8">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-subtle-highlight to-transparent"></div>
                        <div className="mx-4 flex space-x-2">
                            <div className="w-2 h-2 bg-primary-orange rounded-full animate-pulse"></div>
                            <div className="w-2 h-2 bg-primary-blue rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                            <div className="w-2 h-2 bg-primary-orange rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                        </div>
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-subtle-highlight to-transparent"></div>
                    </div>

                    <div className="bg-subtle-highlight/20 backdrop-blur-sm rounded-2xl p-6 border border-subtle-highlight/30">
                        <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
                            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
                                <p className="text-muted-text text-sm flex items-center">
                                    <span className="inline-block w-1 h-1 bg-primary-orange rounded-full mr-2"></span>
                                    &copy; {currentYear} Kuroragi Digital Studio
                                </p>
                                <p className="text-muted-text text-sm flex items-center">
                                    <span className="inline-block w-1 h-1 bg-primary-blue rounded-full mr-2"></span>
                                    All rights reserved
                                </p>
                            </div>
                            
                            <div className="flex flex-wrap justify-center lg:justify-end gap-4 text-sm">
                                <Link
                                    to="/privacy"
                                    className="flex items-center text-muted-text hover:text-primary-blue transition-all duration-200 px-3 py-1 rounded-lg hover:bg-subtle-highlight/30"
                                >
                                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                    Privacy Policy
                                </Link>
                                <Link
                                    to="/terms"
                                    className="flex items-center text-muted-text hover:text-primary-blue transition-all duration-200 px-3 py-1 rounded-lg hover:bg-subtle-highlight/30"
                                >
                                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                    Terms of Service
                                </Link>
                            </div>
                        </div>

                        {/* Additional tagline */}
                        <div className="text-center mt-6 pt-6 border-t border-subtle-highlight/30">
                            <p className="text-muted-text text-xs tracking-wide">
                                Crafted with ❤️ in Indonesia • 
                                <span className="text-gradient font-medium ml-1">
                                    Powered by Innovation
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
