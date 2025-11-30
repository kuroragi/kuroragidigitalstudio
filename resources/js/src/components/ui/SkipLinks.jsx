import React from "react";

const SkipLinks = () => {
    const skipLinks = [
        { href: "#main-content", label: "Skip to main content" },
        { href: "#navigation", label: "Skip to navigation" },
        { href: "#footer", label: "Skip to footer" },
    ];

    return (
        <nav
            className="sr-only focus-within:not-sr-only"
            aria-label="Skip links"
        >
            <ul className="fixed top-0 left-0 z-50 bg-primary-blue text-white p-2 space-y-1">
                {skipLinks.map((link) => (
                    <li key={link.href}>
                        <a
                            href={link.href}
                            className="
                                block px-4 py-2 rounded text-sm font-medium
                                bg-primary-blue hover:bg-blue-600 focus:bg-blue-600
                                focus:outline-none focus:ring-2 focus:ring-white
                                transition-colors duration-200
                            "
                            onFocus={(e) => {
                                e.currentTarget.scrollIntoView({
                                    block: "nearest",
                                });
                            }}
                        >
                            {link.label}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default SkipLinks;
