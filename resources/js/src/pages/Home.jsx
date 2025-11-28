import React from "react";

/**
 * Home Page Component
 * Will be enhanced with Hero, Services preview, Portfolio preview, Blog strip
 */
function Home() {
    return (
        <div className="container mx-auto px-6 py-16">
            <div className="text-center">
                <h1 className="text-5xl font-bold mb-6 text-primary-text">
                    Shaping Ideas Into Digital Mastery
                </h1>
                <p className="text-xl text-muted-text mb-8 max-w-3xl mx-auto">
                    Kuroragi Digital Studio adalah premium digital agency yang
                    mengkhususkan diri dalam web development, mobile app
                    development, UI/UX design, dan digital branding.
                </p>
                <div className="space-x-4">
                    <button className="px-8 py-3 bg-primary-blue text-white rounded-lg hover:bg-blue-600 transition-colors">
                        Get Started
                    </button>
                    <button className="px-8 py-3 border border-primary-blue text-primary-blue rounded-lg hover:bg-primary-blue hover:text-white transition-colors">
                        View Portfolio
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Home;
