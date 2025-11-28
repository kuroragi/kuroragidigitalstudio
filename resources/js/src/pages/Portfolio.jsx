import React from "react";

/**
 * Portfolio Page Component
 * Will include category filters, grid layout, parallax effects
 */
function Portfolio() {
    return (
        <div className="container mx-auto px-6 py-16">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold mb-6">Our Portfolio</h1>
                <p className="text-xl text-muted-text max-w-3xl mx-auto">
                    Explore our latest projects and see how we've helped clients
                    achieve their digital goals.
                </p>
            </div>

            {/* Filter chips akan ditambahkan */}
            <div className="flex flex-wrap gap-4 justify-center mb-12">
                <button className="px-4 py-2 bg-primary-blue text-white rounded-full">
                    All Projects
                </button>
                <button className="px-4 py-2 bg-surface text-muted-text rounded-full hover:bg-subtle-highlight">
                    Web Development
                </button>
                <button className="px-4 py-2 bg-surface text-muted-text rounded-full hover:bg-subtle-highlight">
                    Mobile Apps
                </button>
                <button className="px-4 py-2 bg-surface text-muted-text rounded-full hover:bg-subtle-highlight">
                    UI/UX Design
                </button>
            </div>

            {/* Portfolio grid akan ditambahkan */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-surface rounded-xl overflow-hidden border border-subtle-highlight">
                    <div className="h-48 bg-gradient-to-br from-primary-blue to-accent-cyan"></div>
                    <div className="p-6">
                        <h3 className="text-xl font-bold mb-2">Project Name</h3>
                        <p className="text-muted-text">
                            Project description...
                        </p>
                    </div>
                </div>

                {/* More project cards... */}
            </div>
        </div>
    );
}

export default Portfolio;
