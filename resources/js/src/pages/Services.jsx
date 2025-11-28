import React from "react";

/**
 * Services Page Component
 * Will display service cards dengan micro-animations dan CTAs
 */
function Services() {
    return (
        <div className="container mx-auto px-6 py-16">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold mb-6">Our Services</h1>
                <p className="text-xl text-muted-text max-w-3xl mx-auto">
                    We offer comprehensive digital solutions to help your
                    business thrive in the digital landscape.
                </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Service cards akan ditambahkan */}
                <div className="bg-surface p-6 rounded-xl border border-subtle-highlight">
                    <h3 className="text-xl font-bold mb-3">Web Development</h3>
                    <p className="text-muted-text mb-4">
                        Modern, responsive websites built with cutting-edge
                        technologies.
                    </p>
                    <button className="text-primary-blue hover:underline">
                        Request Quote →
                    </button>
                </div>

                <div className="bg-surface p-6 rounded-xl border border-subtle-highlight">
                    <h3 className="text-xl font-bold mb-3">UI/UX Design</h3>
                    <p className="text-muted-text mb-4">
                        Intuitive interfaces that deliver exceptional user
                        experiences.
                    </p>
                    <button className="text-primary-blue hover:underline">
                        Request Quote →
                    </button>
                </div>

                <div className="bg-surface p-6 rounded-xl border border-subtle-highlight">
                    <h3 className="text-xl font-bold mb-3">Mobile Apps</h3>
                    <p className="text-muted-text mb-4">
                        Native and cross-platform mobile applications for iOS
                        and Android.
                    </p>
                    <button className="text-primary-blue hover:underline">
                        Request Quote →
                    </button>
                </div>

                <div className="bg-surface p-6 rounded-xl border border-subtle-highlight">
                    <h3 className="text-xl font-bold mb-3">Digital Branding</h3>
                    <p className="text-muted-text mb-4">
                        Comprehensive branding strategies for the digital age.
                    </p>
                    <button className="text-primary-blue hover:underline">
                        Request Quote →
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Services;
