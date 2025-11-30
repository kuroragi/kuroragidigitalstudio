import React, { useState } from "react";
import { BlogHero, useResponsiveHero } from "../components/sections";
import { Card, CardContent } from "../components/ui/Card";
import Button from "../components/ui/Button";
import { ResponsiveCardContainer } from "../components/ui/CardGrid";
import {
    MagnifyingGlassIcon,
    CalendarDaysIcon,
    ClockIcon,
    UserIcon,
    TagIcon,
    ArrowRightIcon,
    CodeBracketIcon,
    PaintBrushIcon,
    RocketLaunchIcon,
    NewspaperIcon,
} from "@heroicons/react/24/outline";

/**
 * Blog Page Component
 * Comprehensive blog system dengan search, filtering, dan rich content
 */
function Blog() {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const responsiveConfig = useResponsiveHero();

    // Blog categories
    const categories = [
        { id: "all", label: "All Articles", icon: NewspaperIcon },
        { id: "technology", label: "Technology", icon: CodeBracketIcon },
        { id: "design", label: "Design", icon: PaintBrushIcon },
        { id: "development", label: "Development", icon: RocketLaunchIcon },
    ];

    // Blog articles data
    const articles = [
        {
            id: "future-web-development-2024",
            title: "The Future of Web Development in 2024",
            excerpt:
                "Explore the cutting-edge technologies and methodologies that are reshaping the web development landscape, from AI integration to progressive web apps.",
            content: "Full article content here...",
            category: "technology",
            author: {
                name: "Alex Chen",
                avatar: "/images/authors/alex-chen.jpg",
                role: "Senior Developer",
            },
            publishedAt: "2024-11-23",
            readingTime: 8,
            tags: ["Web Development", "AI", "PWA", "React", "Performance"],
            featured: true,
            image: "/images/blog/web-development-future.jpg",
        },
        {
            id: "design-system-best-practices",
            title: "Building Scalable Design Systems",
            excerpt:
                "Learn how to create and maintain design systems that scale with your organization while ensuring consistency across all digital products.",
            content: "Full article content here...",
            category: "design",
            author: {
                name: "Sarah Johnson",
                avatar: "/images/authors/sarah-johnson.jpg",
                role: "Lead Designer",
            },
            publishedAt: "2024-11-20",
            readingTime: 6,
            tags: ["Design Systems", "UI/UX", "Figma", "Components"],
            featured: true,
            image: "/images/blog/design-systems.jpg",
        },
        {
            id: "react-performance-optimization",
            title: "Advanced React Performance Optimization Techniques",
            excerpt:
                "Deep dive into React performance optimization strategies including memoization, code splitting, and virtual DOM optimization techniques.",
            content: "Full article content here...",
            category: "development",
            author: {
                name: "Mike Rodriguez",
                avatar: "/images/authors/mike-rodriguez.jpg",
                role: "React Specialist",
            },
            publishedAt: "2024-11-18",
            readingTime: 12,
            tags: ["React", "Performance", "Optimization", "JavaScript"],
            featured: false,
            image: "/images/blog/react-optimization.jpg",
        },
        {
            id: "mobile-first-design-2024",
            title: "Mobile-First Design Strategies for Modern Apps",
            excerpt:
                "Comprehensive guide to designing mobile-first experiences that delight users and drive engagement in the mobile-centric world.",
            content: "Full article content here...",
            category: "design",
            author: {
                name: "Emma Thompson",
                avatar: "/images/authors/emma-thompson.jpg",
                role: "UX Designer",
            },
            publishedAt: "2024-11-15",
            readingTime: 7,
            tags: ["Mobile Design", "UX", "Responsive", "User Experience"],
            featured: false,
            image: "/images/blog/mobile-first.jpg",
        },
        {
            id: "ai-development-tools-2024",
            title: "AI-Powered Development Tools Revolutionizing Coding",
            excerpt:
                "Discover how artificial intelligence is transforming software development with intelligent code completion, automated testing, and smart debugging.",
            content: "Full article content here...",
            category: "technology",
            author: {
                name: "David Kim",
                avatar: "/images/authors/david-kim.jpg",
                role: "AI/ML Engineer",
            },
            publishedAt: "2024-11-12",
            readingTime: 10,
            tags: [
                "Artificial Intelligence",
                "Development Tools",
                "Automation",
                "Machine Learning",
            ],
            featured: false,
            image: "/images/blog/ai-tools.jpg",
        },
        {
            id: "serverless-architecture-guide",
            title: "Complete Guide to Serverless Architecture",
            excerpt:
                "Learn how to build and deploy scalable serverless applications using modern cloud platforms and best practices for cost optimization.",
            content: "Full article content here...",
            category: "development",
            author: {
                name: "Lisa Wang",
                avatar: "/images/authors/lisa-wang.jpg",
                role: "Cloud Architect",
            },
            publishedAt: "2024-11-08",
            readingTime: 15,
            tags: ["Serverless", "Cloud Computing", "AWS", "Architecture"],
            featured: false,
            image: "/images/blog/serverless.jpg",
        },
    ];

    // Filter articles by category and search
    const filteredArticles = articles.filter((article) => {
        const matchesCategory =
            selectedCategory === "all" || article.category === selectedCategory;
        const matchesSearch =
            searchQuery === "" ||
            article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article.tags.some((tag) =>
                tag.toLowerCase().includes(searchQuery.toLowerCase())
            );

        return matchesCategory && matchesSearch;
    });

    // Featured articles
    const featuredArticles = articles.filter((article) => article.featured);

    // Format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <div className="scroll-smooth">
            {/* Hero Section */}
            <section id="blog-hero">
                <BlogHero {...responsiveConfig} />
            </section>

            {/* Featured Articles */}
            <section
                id="featured-articles"
                className="py-16 md:py-20 bg-gradient-to-b from-gray-950 to-gray-900"
            >
                <ResponsiveCardContainer>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            Featured{" "}
                            <span className="text-blue-400">Articles</span>
                        </h2>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Our latest insights and deep dives into technology,
                            design, and development trends.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        {featuredArticles.map((article, index) => (
                            <Card
                                key={article.id}
                                className="group hover:scale-105 transition-all duration-500 hover:border-blue-400/50 cursor-pointer overflow-hidden"
                                style={{ animationDelay: `${index * 200}ms` }}
                                onClick={() =>
                                    (window.location.href = `/blog/${article.id}`)
                                }
                            >
                                {/* Article Image */}
                                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600">
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                                            Featured
                                        </span>
                                    </div>
                                    {/* Placeholder for article image */}
                                    <div className="w-full h-full flex items-center justify-center text-white/80">
                                        <div className="text-center">
                                            <NewspaperIcon className="w-16 h-16 mx-auto mb-2 opacity-60" />
                                            <p className="text-sm">
                                                {article.category.toUpperCase()}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <CardContent className="p-6">
                                    {/* Category & Meta */}
                                    <div className="flex items-center gap-4 mb-3 text-sm text-gray-400">
                                        <span className="text-blue-400 font-medium">
                                            {
                                                categories.find(
                                                    (c) =>
                                                        c.id ===
                                                        article.category
                                                )?.label
                                            }
                                        </span>
                                        <span>•</span>
                                        <div className="flex items-center gap-1">
                                            <ClockIcon className="w-3 h-3" />
                                            {article.readingTime} min read
                                        </div>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                                        {article.title}
                                    </h3>

                                    {/* Excerpt */}
                                    <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                                        {article.excerpt}
                                    </p>

                                    {/* Author & Date */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                                                <UserIcon className="w-4 h-4 text-gray-300" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-white">
                                                    {article.author.name}
                                                </p>
                                                <p className="text-xs text-gray-400">
                                                    {formatDate(
                                                        article.publishedAt
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                        <ArrowRightIcon className="w-5 h-5 text-gray-400 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </ResponsiveCardContainer>
            </section>

            {/* All Articles */}
            <section
                id="all-articles"
                className="py-16 md:py-20 bg-gradient-to-b from-gray-900 to-gray-800"
            >
                <ResponsiveCardContainer>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            All <span className="text-blue-400">Articles</span>
                        </h2>

                        {/* Search Bar */}
                        <div className="max-w-md mx-auto mb-8">
                            <div className="relative">
                                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search articles, tags, topics..."
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-blue-400 focus:outline-none text-white placeholder-gray-400"
                                />
                            </div>
                        </div>

                        {/* Category Filter */}
                        <div className="flex flex-wrap justify-center gap-3 mb-8">
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() =>
                                        setSelectedCategory(category.id)
                                    }
                                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                                        selectedCategory === category.id
                                            ? "bg-blue-500 text-white shadow-blue-500/25 shadow-lg"
                                            : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
                                    }`}
                                >
                                    <category.icon className="w-4 h-4" />
                                    {category.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Articles List */}
                    <div className="max-w-4xl mx-auto space-y-6">
                        {filteredArticles.length > 0 ? (
                            filteredArticles.map((article, index) => (
                                <Card
                                    key={article.id}
                                    className="group hover:border-blue-400/50 cursor-pointer transition-all duration-300"
                                    onClick={() =>
                                        (window.location.href = `/blog/${article.id}`)
                                    }
                                >
                                    <CardContent className="p-0">
                                        <div className="md:flex">
                                            {/* Article Image */}
                                            <div className="md:w-1/3 h-48 md:h-auto relative overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600">
                                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
                                                {article.featured && (
                                                    <div className="absolute top-4 left-4">
                                                        <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                                                            Featured
                                                        </span>
                                                    </div>
                                                )}
                                                {/* Placeholder */}
                                                <div className="w-full h-full flex items-center justify-center text-white/80">
                                                    <NewspaperIcon className="w-12 h-12 opacity-60" />
                                                </div>
                                            </div>

                                            {/* Article Content */}
                                            <div className="md:w-2/3 p-6">
                                                {/* Category & Meta */}
                                                <div className="flex items-center gap-4 mb-3 text-sm text-gray-400">
                                                    <span className="text-blue-400 font-medium">
                                                        {
                                                            categories.find(
                                                                (c) =>
                                                                    c.id ===
                                                                    article.category
                                                            )?.label
                                                        }
                                                    </span>
                                                    <span>•</span>
                                                    <div className="flex items-center gap-1">
                                                        <CalendarDaysIcon className="w-3 h-3" />
                                                        {formatDate(
                                                            article.publishedAt
                                                        )}
                                                    </div>
                                                    <span>•</span>
                                                    <div className="flex items-center gap-1">
                                                        <ClockIcon className="w-3 h-3" />
                                                        {article.readingTime}{" "}
                                                        min read
                                                    </div>
                                                </div>

                                                {/* Title */}
                                                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                                                    {article.title}
                                                </h3>

                                                {/* Excerpt */}
                                                <p className="text-gray-400 leading-relaxed mb-4 line-clamp-2">
                                                    {article.excerpt}
                                                </p>

                                                {/* Tags */}
                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    {article.tags
                                                        .slice(0, 3)
                                                        .map((tag, idx) => (
                                                            <span
                                                                key={idx}
                                                                className="inline-flex items-center gap-1 px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded border border-gray-700"
                                                            >
                                                                <TagIcon className="w-3 h-3" />
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    {article.tags.length >
                                                        3 && (
                                                        <span className="px-2 py-1 bg-gray-800 text-gray-400 text-xs rounded border border-gray-700">
                                                            +
                                                            {article.tags
                                                                .length -
                                                                3}{" "}
                                                            more
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Author */}
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                                                        <UserIcon className="w-4 h-4 text-gray-300" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="text-sm font-medium text-white">
                                                            {
                                                                article.author
                                                                    .name
                                                            }
                                                        </p>
                                                        <p className="text-xs text-gray-400">
                                                            {
                                                                article.author
                                                                    .role
                                                            }
                                                        </p>
                                                    </div>
                                                    <ArrowRightIcon className="w-5 h-5 text-gray-400 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <div className="text-center py-16">
                                <NewspaperIcon className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-gray-300 mb-2">
                                    No articles found
                                </h3>
                                <p className="text-gray-400">
                                    Try adjusting your search or filter
                                    criteria.
                                </p>
                            </div>
                        )}
                    </div>
                </ResponsiveCardContainer>
            </section>
        </div>
    );
}

export default Blog;
