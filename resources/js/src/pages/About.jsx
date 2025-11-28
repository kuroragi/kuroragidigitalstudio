import React from "react";

/**
 * About Page Component
 * Will include company story, lore tersembunyi, dan company facts
 */
function About() {
    return (
        <div className="container mx-auto px-6 py-16">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-center">
                    About Kuroragi Digital Studio
                </h1>

                <div className="prose prose-lg text-muted-text mx-auto">
                    <p className="text-xl leading-relaxed mb-6">
                        Founded in 2020, Kuroragi Digital Studio has been at the
                        forefront of digital innovation, crafting exceptional
                        digital experiences for clients across Indonesia.
                    </p>

                    <p className="leading-relaxed">
                        Our team of passionate developers, designers, and
                        strategists work together to transform ideas into
                        powerful digital solutions that drive business growth
                        and user engagement.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mt-16">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-primary-blue mb-2">
                            150+
                        </div>
                        <div className="text-muted-text">
                            Projects Completed
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-primary-blue mb-2">
                            85+
                        </div>
                        <div className="text-muted-text">Clients Served</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-primary-blue mb-2">
                            4+
                        </div>
                        <div className="text-muted-text">Years Experience</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;
