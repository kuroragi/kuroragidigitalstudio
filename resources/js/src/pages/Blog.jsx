import React from "react";

/**
 * Blog Page Component
 * Will include article listing, categories, search
 */
function Blog() {
    return (
        <div className="container mx-auto px-6 py-16">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold mb-6">Our Blog</h1>
                <p className="text-xl text-muted-text max-w-3xl mx-auto">
                    Insights, tutorials, and thoughts on digital technology and
                    design trends.
                </p>
            </div>

            {/* Search dan categories akan ditambahkan */}
            <div className="max-w-md mx-auto mb-12">
                <input
                    type="text"
                    placeholder="Search articles..."
                    className="w-full px-4 py-3 bg-surface border border-subtle-highlight rounded-lg focus:border-primary-blue focus:outline-none"
                />
            </div>

            {/* Blog articles grid */}
            <div className="max-w-4xl mx-auto space-y-8">
                <article className="bg-surface rounded-xl overflow-hidden border border-subtle-highlight">
                    <div className="md:flex">
                        <div className="md:w-1/3 h-48 bg-gradient-to-br from-primary-blue to-accent-cyan"></div>
                        <div className="md:w-2/3 p-6">
                            <div className="text-sm text-accent-cyan mb-2">
                                Technology
                            </div>
                            <h2 className="text-2xl font-bold mb-3">
                                The Future of Web Development
                            </h2>
                            <p className="text-muted-text mb-4">
                                Explore the cutting-edge technologies and
                                methodologies that are reshaping the web
                                development landscape this year...
                            </p>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-text">
                                    November 23, 2024
                                </span>
                                <span className="text-sm text-muted-text">
                                    8 min read
                                </span>
                            </div>
                        </div>
                    </div>
                </article>

                {/* More articles... */}
            </div>
        </div>
    );
}

export default Blog;
