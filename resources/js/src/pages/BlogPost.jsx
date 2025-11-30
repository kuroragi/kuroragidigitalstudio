import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent } from "../components/ui/Card";
import Button from "../components/ui/Button";
import { ResponsiveCardContainer } from "../components/ui/CardGrid";
import {
    ArrowLeftIcon,
    CalendarDaysIcon,
    ClockIcon,
    UserIcon,
    TagIcon,
    ShareIcon,
    LinkIcon,
    ChevronUpIcon,
} from "@heroicons/react/24/outline";

/**
 * BlogPost Page Component
 * Individual blog article dengan rich content, navigation, dan sharing
 */
function BlogPost() {
    const { slug } = useParams();
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [readingProgress, setReadingProgress] = useState(0);

    // Mock article data (in real app, this would come from API)
    const article = {
        id: "future-web-development-2024",
        title: "The Future of Web Development in 2024: Trends and Technologies",
        excerpt:
            "Explore the cutting-edge technologies and methodologies that are reshaping the web development landscape, from AI integration to progressive web apps.",
        category: "technology",
        author: {
            name: "Alex Chen",
            avatar: "/images/authors/alex-chen.jpg",
            role: "Senior Developer",
            bio: "Full-stack developer with 8+ years of experience in modern web technologies.",
        },
        publishedAt: "2024-11-23",
        readingTime: 8,
        tags: ["Web Development", "AI", "PWA", "React", "Performance"],
        image: "/images/blog/web-development-future.jpg",
        content: `
# Introduction

The web development landscape is constantly evolving, and 2024 promises to be a year of significant transformation. From artificial intelligence integration to revolutionary framework updates, developers need to stay ahead of these trends to remain competitive.

## Key Trends Shaping Web Development

### 1. AI-Powered Development Tools

Artificial Intelligence is revolutionizing how we write code. Tools like GitHub Copilot, Tabnine, and ChatGPT are becoming essential parts of the developer toolkit.

\`\`\`javascript
// AI-assisted code completion example
const fetchUserData = async (userId) => {
  try {
    const response = await fetch(\`/api/users/\${userId}\`);
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};
\`\`\`

### 2. Progressive Web Apps (PWAs) Evolution

PWAs continue to bridge the gap between web and native applications, offering:

- **Offline functionality**
- **Push notifications**
- **App-like user experience**
- **Fast loading times**

### 3. Server-Side Rendering Renaissance

Frameworks like Next.js, Nuxt.js, and SvelteKit are making SSR more accessible than ever:

\`\`\`jsx
// Next.js 14 App Router example
export default async function Page({ params }) {
  const data = await fetchData(params.id);
  
  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.description}</p>
    </div>
  );
}
\`\`\`

## Performance Optimization Strategies

### Core Web Vitals Focus

Google's Core Web Vitals remain crucial for SEO and user experience:

1. **Largest Contentful Paint (LCP)**
2. **First Input Delay (FID)**
3. **Cumulative Layout Shift (CLS)**

### Modern Build Tools

The ecosystem of build tools continues to evolve:

- **Vite**: Lightning-fast development experience
- **esbuild**: Extremely fast JavaScript bundler
- **Turbopack**: Next-generation bundler from Vercel

## Emerging Technologies

### WebAssembly (WASM)

WebAssembly enables near-native performance in browsers:

\`\`\`rust
// Rust code compiled to WebAssembly
#[wasm_bindgen]
pub fn calculate_fibonacci(n: u32) -> u32 {
    if n <= 1 {
        return n;
    }
    calculate_fibonacci(n - 1) + calculate_fibonacci(n - 2)
}
\`\`\`

### Edge Computing

Edge computing brings computation closer to users:

- **Cloudflare Workers**
- **Vercel Edge Functions**
- **Netlify Edge Functions**

## Security Considerations

### Zero Trust Architecture

Modern web applications must implement Zero Trust principles:

- **Multi-factor authentication**
- **End-to-end encryption**
- **Regular security audits**
- **Least privilege access**

## Conclusion

The future of web development is exciting and challenging. Developers who embrace these trends and continuously learn will thrive in this evolving landscape. The key is to balance innovation with stability, ensuring that new technologies truly benefit users.

Stay curious, keep learning, and remember that the best technology is the one that solves real problems for real people.
        `,
    };

    // Related articles
    const relatedArticles = [
        {
            id: "react-performance-optimization",
            title: "Advanced React Performance Optimization",
            excerpt:
                "Deep dive into React performance optimization strategies...",
            readingTime: 12,
            category: "development",
        },
        {
            id: "design-system-best-practices",
            title: "Building Scalable Design Systems",
            excerpt: "Learn how to create and maintain design systems...",
            readingTime: 6,
            category: "design",
        },
    ];

    // Handle scroll events for progress and back-to-top
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight =
                document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollTop / docHeight) * 100;

            setReadingProgress(progress);
            setShowScrollTop(scrollTop > 400);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const shareArticle = () => {
        if (navigator.share) {
            navigator.share({
                title: article.title,
                text: article.excerpt,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            // You could add a toast notification here
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-950 to-gray-900">
            {/* Reading Progress Bar */}
            <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
                <div
                    className="h-full bg-blue-500 transition-all duration-150"
                    style={{ width: `${readingProgress}%` }}
                />
            </div>

            {/* Back to Blog */}
            <div className="pt-8 pb-4">
                <ResponsiveCardContainer>
                    <Link
                        to="/blog"
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors"
                    >
                        <ArrowLeftIcon className="w-4 h-4" />
                        Back to Blog
                    </Link>
                </ResponsiveCardContainer>
            </div>

            {/* Article Header */}
            <article className="pb-16">
                <ResponsiveCardContainer>
                    <header className="text-center mb-12">
                        {/* Category */}
                        <div className="inline-block px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-sm font-medium mb-6">
                            {article.category.charAt(0).toUpperCase() +
                                article.category.slice(1)}
                        </div>

                        {/* Title */}
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                            {article.title}
                        </h1>

                        {/* Excerpt */}
                        <p className="text-xl text-gray-400 leading-relaxed mb-8 max-w-3xl mx-auto">
                            {article.excerpt}
                        </p>

                        {/* Meta Information */}
                        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400 mb-8">
                            <div className="flex items-center gap-2">
                                <CalendarDaysIcon className="w-4 h-4" />
                                {formatDate(article.publishedAt)}
                            </div>
                            <span>•</span>
                            <div className="flex items-center gap-2">
                                <ClockIcon className="w-4 h-4" />
                                {article.readingTime} min read
                            </div>
                            <span>•</span>
                            <button
                                onClick={shareArticle}
                                className="flex items-center gap-2 hover:text-blue-400 transition-colors"
                            >
                                <ShareIcon className="w-4 h-4" />
                                Share
                            </button>
                        </div>

                        {/* Author */}
                        <div className="flex items-center justify-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                                <UserIcon className="w-6 h-6 text-gray-300" />
                            </div>
                            <div className="text-left">
                                <p className="text-white font-medium">
                                    {article.author.name}
                                </p>
                                <p className="text-gray-400 text-sm">
                                    {article.author.role}
                                </p>
                            </div>
                        </div>

                        {/* Featured Image */}
                        <div className="relative h-64 md:h-96 rounded-xl overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 mb-12">
                            <div className="absolute inset-0 flex items-center justify-center text-white/80">
                                <div className="text-center">
                                    <LinkIcon className="w-24 h-24 mx-auto mb-4 opacity-60" />
                                    <p className="text-lg">
                                        Featured Article Image
                                    </p>
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Article Content */}
                    <div className="max-w-3xl mx-auto">
                        <div className="prose prose-invert prose-blue max-w-none">
                            <div className="text-gray-300 leading-relaxed space-y-6">
                                {/* This is a simplified markdown renderer - in real app use react-markdown */}
                                {article.content
                                    .split("\n\n")
                                    .map((paragraph, index) => {
                                        if (paragraph.startsWith("# ")) {
                                            return (
                                                <h1
                                                    key={index}
                                                    className="text-3xl font-bold text-white mt-12 mb-6"
                                                >
                                                    {paragraph.replace(
                                                        "# ",
                                                        ""
                                                    )}
                                                </h1>
                                            );
                                        } else if (
                                            paragraph.startsWith("## ")
                                        ) {
                                            return (
                                                <h2
                                                    key={index}
                                                    className="text-2xl font-bold text-white mt-10 mb-4"
                                                >
                                                    {paragraph.replace(
                                                        "## ",
                                                        ""
                                                    )}
                                                </h2>
                                            );
                                        } else if (
                                            paragraph.startsWith("### ")
                                        ) {
                                            return (
                                                <h3
                                                    key={index}
                                                    className="text-xl font-bold text-white mt-8 mb-3"
                                                >
                                                    {paragraph.replace(
                                                        "### ",
                                                        ""
                                                    )}
                                                </h3>
                                            );
                                        } else if (
                                            paragraph.startsWith("```")
                                        ) {
                                            return (
                                                <div
                                                    key={index}
                                                    className="my-6"
                                                >
                                                    <pre className="bg-gray-800 border border-gray-700 rounded-lg p-4 overflow-x-auto">
                                                        <code className="text-gray-300 text-sm">
                                                            {paragraph
                                                                .replace(
                                                                    /```\w*\n?/g,
                                                                    ""
                                                                )
                                                                .replace(
                                                                    /```/g,
                                                                    ""
                                                                )}
                                                        </code>
                                                    </pre>
                                                </div>
                                            );
                                        } else if (paragraph.startsWith("- ")) {
                                            const items = paragraph
                                                .split("\n")
                                                .filter((item) =>
                                                    item.startsWith("- ")
                                                );
                                            return (
                                                <ul
                                                    key={index}
                                                    className="list-disc list-inside space-y-2 my-4"
                                                >
                                                    {items.map((item, idx) => (
                                                        <li
                                                            key={idx}
                                                            className="text-gray-300"
                                                        >
                                                            {item.replace(
                                                                "- ",
                                                                ""
                                                            )}
                                                        </li>
                                                    ))}
                                                </ul>
                                            );
                                        } else if (
                                            paragraph.trim() &&
                                            !paragraph.startsWith("```")
                                        ) {
                                            return (
                                                <p
                                                    key={index}
                                                    className="text-gray-300 leading-relaxed"
                                                >
                                                    {paragraph}
                                                </p>
                                            );
                                        }
                                        return null;
                                    })}
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="mt-12 pt-8 border-t border-gray-700">
                            <h3 className="text-lg font-semibold text-white mb-4">
                                Tags
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {article.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="inline-flex items-center gap-1 px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full border border-gray-700 hover:border-blue-400 transition-colors cursor-pointer"
                                    >
                                        <TagIcon className="w-3 h-3" />
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Author Bio */}
                        <div className="mt-12 pt-8 border-t border-gray-700">
                            <Card className="bg-gray-800/50 border-gray-700">
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-4">
                                        <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
                                            <UserIcon className="w-8 h-8 text-gray-300" />
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-semibold text-white mb-1">
                                                {article.author.name}
                                            </h4>
                                            <p className="text-blue-400 text-sm mb-2">
                                                {article.author.role}
                                            </p>
                                            <p className="text-gray-400 text-sm">
                                                {article.author.bio}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </ResponsiveCardContainer>

                {/* Related Articles */}
                <section className="mt-20 pt-16 border-t border-gray-800">
                    <ResponsiveCardContainer>
                        <h2 className="text-2xl font-bold text-white text-center mb-12">
                            Related Articles
                        </h2>

                        <div className="grid md:grid-cols-2 gap-8">
                            {relatedArticles.map((relatedArticle) => (
                                <Card
                                    key={relatedArticle.id}
                                    className="group hover:border-blue-400/50 cursor-pointer transition-all duration-300"
                                    onClick={() =>
                                        (window.location.href = `/blog/${relatedArticle.id}`)
                                    }
                                >
                                    <CardContent className="p-6">
                                        <div className="mb-3">
                                            <span className="text-blue-400 text-sm font-medium">
                                                {relatedArticle.category
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                    relatedArticle.category.slice(
                                                        1
                                                    )}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                                            {relatedArticle.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm leading-relaxed mb-4">
                                            {relatedArticle.excerpt}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-1 text-sm text-gray-400">
                                                <ClockIcon className="w-3 h-3" />
                                                {relatedArticle.readingTime} min
                                                read
                                            </div>
                                            <ArrowLeftIcon className="w-4 h-4 text-gray-400 group-hover:text-blue-400 rotate-180 group-hover:translate-x-1 transition-all" />
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        <div className="text-center mt-12">
                            <Button
                                variant="outline"
                                onClick={() => (window.location.href = "/blog")}
                                className="px-8 py-3"
                            >
                                View All Articles
                            </Button>
                        </div>
                    </ResponsiveCardContainer>
                </section>
            </article>

            {/* Scroll to Top Button */}
            {showScrollTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-40"
                >
                    <ChevronUpIcon className="w-6 h-6 mx-auto" />
                </button>
            )}
        </div>
    );
}

export default BlogPost;
