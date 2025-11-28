import React from "react";
import { useParams } from "react-router-dom";

/**
 * BlogPost Page Component
 * Will display individual blog post dengan rich content
 */
function BlogPost() {
    const { slug } = useParams();

    return (
        <div className="container mx-auto px-6 py-16">
            <article className="max-w-4xl mx-auto">
                <header className="text-center mb-12">
                    <div className="text-sm text-accent-cyan mb-4">
                        Technology
                    </div>
                    <h1 className="text-4xl font-bold mb-4">
                        The Future of Web Development: Trends to Watch in 2024
                    </h1>
                    <div className="flex items-center justify-center space-x-6 text-muted-text">
                        <span>November 23, 2024</span>
                        <span>•</span>
                        <span>8 min read</span>
                        <span>•</span>
                        <span>1,250 views</span>
                    </div>
                </header>

                <div className="h-64 bg-gradient-to-br from-primary-blue to-accent-cyan rounded-xl mb-12"></div>

                <div className="prose prose-lg text-muted-text max-w-none">
                    <p className="text-xl leading-relaxed mb-8">
                        Web development terus berkembang dengan pesat. Dari
                        AI-powered development tools hingga serverless
                        architecture, mari kita explore trend-trend yang akan
                        mendominasi industri ini.
                    </p>

                    <h2 className="text-2xl font-bold text-primary-text mb-4">
                        1. AI-Assisted Development
                    </h2>

                    <p className="leading-relaxed mb-6">
                        Artificial Intelligence semakin terintegrasi dalam
                        development workflow. Tools seperti GitHub Copilot dan
                        ChatGPT mengubah cara developer menulis code...
                    </p>

                    <h2 className="text-2xl font-bold text-primary-text mb-4">
                        2. Jamstack Evolution
                    </h2>

                    <p className="leading-relaxed mb-6">
                        Jamstack bukan lagi sekadar trend, tetapi sudah menjadi
                        standard untuk modern web applications...
                    </p>

                    {/* More content... */}
                </div>
            </article>
        </div>
    );
}

export default BlogPost;
