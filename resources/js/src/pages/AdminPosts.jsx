import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate, Link } from "react-router-dom";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import axios from "axios";

const AdminPosts = () => {
    const { isAuthenticated, isLoading } = useAuth();
    const [posts, setPosts] = useState([]);
    const [isLoadingPosts, setIsLoadingPosts] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [editingPost, setEditingPost] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        excerpt: "",
        content: "",
        image_url: "",
        category: "technology",
        tags: "",
        status: "draft",
        is_featured: false,
        seo_title: "",
        seo_description: "",
        slug: "",
    });

    // Redirect if not authenticated
    if (!isAuthenticated && !isLoading) {
        return <Navigate to="/portal" replace />;
    }

    useEffect(() => {
        loadPosts();
    }, []);

    const loadPosts = async () => {
        try {
            setIsLoadingPosts(true);
            setError(null);

            const token = localStorage.getItem("admin_token");
            const response = await axios.get("/posts", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });

            setPosts(response.data.data || response.data);
        } catch (error) {
            console.error("Failed to load posts:", error);
            setError(error.response?.data?.message || "Failed to load posts");
        } finally {
            setIsLoadingPosts(false);
        }
    };

    const generateSlug = (title) => {
        return title
            .toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-")
            .trim();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("admin_token");
            const postData = {
                ...formData,
                tags: formData.tags
                    .split(",")
                    .map((tag) => tag.trim())
                    .filter((tag) => tag),
                slug: formData.slug || generateSlug(formData.title),
            };

            if (editingPost) {
                await axios.put(`/admin/posts/${editingPost.id}`, postData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
            } else {
                await axios.post("/admin/posts", postData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
            }

            setShowModal(false);
            setEditingPost(null);
            resetForm();
            loadPosts();
        } catch (error) {
            console.error("Failed to save post:", error);
            setError(error.response?.data?.message || "Failed to save post");
        }
    };

    const handleEdit = (post) => {
        setEditingPost(post);
        setFormData({
            title: post.title,
            excerpt: post.excerpt || "",
            content: post.content || "",
            image_url: post.image_url || "",
            category: post.category || "technology",
            tags: Array.isArray(post.tags)
                ? post.tags.join(", ")
                : post.tags || "",
            status: post.status,
            is_featured: post.is_featured || false,
            seo_title: post.seo_title || "",
            seo_description: post.seo_description || "",
            slug: post.slug || "",
        });
        setShowModal(true);
    };

    const handleDelete = async (postId) => {
        if (!confirm("Are you sure you want to delete this post?")) return;

        try {
            const token = localStorage.getItem("admin_token");
            await axios.delete(`/admin/posts/${postId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setPosts(posts.filter((post) => post.id !== postId));
        } catch (error) {
            console.error("Failed to delete post:", error);
            setError(error.response?.data?.message || "Failed to delete post");
        }
    };

    const resetForm = () => {
        setFormData({
            title: "",
            excerpt: "",
            content: "",
            image_url: "",
            category: "technology",
            tags: "",
            status: "draft",
            is_featured: false,
            seo_title: "",
            seo_description: "",
            slug: "",
        });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "published":
                return "bg-green-500/20 text-green-400 border-green-500/30";
            case "draft":
                return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
            case "archived":
                return "bg-gray-500/20 text-gray-400 border-gray-500/30";
            default:
                return "bg-gray-500/20 text-gray-400 border-gray-500/30";
        }
    };

    const getCategoryColor = (category) => {
        switch (category) {
            case "technology":
                return "bg-blue-500/20 text-blue-400";
            case "design":
                return "bg-purple-500/20 text-purple-400";
            case "business":
                return "bg-green-500/20 text-green-400";
            case "tutorial":
                return "bg-orange-500/20 text-orange-400";
            default:
                return "bg-gray-500/20 text-gray-400";
        }
    };

    if (isLoading || isLoadingPosts) {
        return (
            <div className="min-h-screen bg-primary-bg flex items-center justify-center">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-primary-bg">
            {/* Header */}
            <header className="bg-secondary-bg/50 backdrop-blur-lg border-b border-subtle-highlight/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-4">
                            <Link
                                to="/portal/dashboard"
                                className="text-muted-text hover:text-primary-text transition-colors"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 19l-7-7 7-7"
                                    />
                                </svg>
                            </Link>
                            <h1 className="text-xl font-bold text-primary-text">
                                Blog Management
                            </h1>
                        </div>
                        <button
                            onClick={() => {
                                setEditingPost(null);
                                resetForm();
                                setShowModal(true);
                            }}
                            className="bg-primary-blue hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
                        >
                            <svg
                                className="w-4 h-4 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                />
                            </svg>
                            New Post
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                {/* Error Display */}
                {error && (
                    <div className="mb-6 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg">
                        {error}
                    </div>
                )}

                {/* Posts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post) => (
                        <div
                            key={post.id}
                            className="bg-secondary-bg/30 backdrop-blur-lg border border-subtle-highlight/30 rounded-xl p-6 hover:bg-secondary-bg/50 transition-all duration-200"
                        >
                            {/* Post Image */}
                            {post.image_url && (
                                <div className="mb-4 aspect-video bg-primary-bg/50 rounded-lg overflow-hidden">
                                    <img
                                        src={post.image_url}
                                        alt={post.title}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.style.display = "none";
                                        }}
                                    />
                                </div>
                            )}

                            {/* Post Info */}
                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-lg font-semibold text-primary-text line-clamp-2">
                                        {post.title}
                                    </h3>
                                    {post.is_featured && (
                                        <span className="text-yellow-400 flex-shrink-0 ml-2">
                                            <svg
                                                className="w-4 h-4"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                            </svg>
                                        </span>
                                    )}
                                </div>

                                {post.excerpt && (
                                    <p className="text-muted-text text-sm mb-4 line-clamp-3">
                                        {post.excerpt}
                                    </p>
                                )}

                                {/* Category and Tags */}
                                <div className="space-y-2 mb-4">
                                    <span
                                        className={`inline-block px-2 py-1 text-xs rounded ${getCategoryColor(
                                            post.category
                                        )}`}
                                    >
                                        {post.category}
                                    </span>

                                    {post.tags && (
                                        <div className="flex flex-wrap gap-1">
                                            {(Array.isArray(post.tags)
                                                ? post.tags
                                                : post.tags.split(",")
                                            )
                                                .slice(0, 2)
                                                .map((tag, index) => (
                                                    <span
                                                        key={index}
                                                        className="px-2 py-1 text-xs bg-muted-text/10 text-muted-text rounded"
                                                    >
                                                        #{tag.trim()}
                                                    </span>
                                                ))}
                                            {(Array.isArray(post.tags)
                                                ? post.tags
                                                : post.tags.split(",")
                                            ).length > 2 && (
                                                <span className="px-2 py-1 text-xs bg-muted-text/20 text-muted-text rounded">
                                                    +
                                                    {(Array.isArray(post.tags)
                                                        ? post.tags
                                                        : post.tags.split(",")
                                                    ).length - 2}
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Status and Date */}
                                <div className="flex justify-between items-center mb-4">
                                    <span
                                        className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(
                                            post.status
                                        )}`}
                                    >
                                        {post.status}
                                    </span>
                                    <span className="text-xs text-muted-text">
                                        {new Date(
                                            post.created_at
                                        ).toLocaleDateString()}
                                    </span>
                                </div>

                                {/* Actions */}
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center space-x-2">
                                        {post.slug && (
                                            <Link
                                                to={`/blog/${post.slug}`}
                                                className="text-primary-blue hover:text-blue-300 transition-colors"
                                            >
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                    />
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                    />
                                                </svg>
                                            </Link>
                                        )}
                                        <span className="text-xs text-muted-text">
                                            {post.reading_time || "5"} min read
                                        </span>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleEdit(post)}
                                            className="text-primary-blue hover:text-blue-300 transition-colors"
                                        >
                                            <svg
                                                className="w-4 h-4"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(post.id)
                                            }
                                            className="text-red-400 hover:text-red-300 transition-colors"
                                        >
                                            <svg
                                                className="w-4 h-4"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {posts.length === 0 && !isLoadingPosts && (
                    <div className="text-center py-12">
                        <svg
                            className="w-12 h-12 text-muted-text mx-auto mb-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                        </svg>
                        <p className="text-muted-text mb-4">No posts found</p>
                        <button
                            onClick={() => {
                                resetForm();
                                setShowModal(true);
                            }}
                            className="bg-primary-blue hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                            Write Your First Post
                        </button>
                    </div>
                )}
            </main>

            {/* Post Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-secondary-bg border border-subtle-highlight/30 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-6">
                                <h2 className="text-xl font-bold text-primary-text">
                                    {editingPost ? "Edit Post" : "New Post"}
                                </h2>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="text-muted-text hover:text-primary-text transition-colors"
                                >
                                    <svg
                                        className="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Basic Info */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-primary-text mb-2">
                                            Title *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.title}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    title: e.target.value,
                                                })
                                            }
                                            className="w-full px-4 py-2 bg-primary-bg border border-subtle-highlight/50 rounded-lg text-primary-text focus:border-primary-blue focus:outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-primary-text mb-2">
                                            Category
                                        </label>
                                        <select
                                            value={formData.category}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    category: e.target.value,
                                                })
                                            }
                                            className="w-full px-4 py-2 bg-primary-bg border border-subtle-highlight/50 rounded-lg text-primary-text focus:border-primary-blue focus:outline-none"
                                        >
                                            <option value="technology">
                                                Technology
                                            </option>
                                            <option value="design">
                                                Design
                                            </option>
                                            <option value="business">
                                                Business
                                            </option>
                                            <option value="tutorial">
                                                Tutorial
                                            </option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-primary-text mb-2">
                                            Status
                                        </label>
                                        <select
                                            value={formData.status}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    status: e.target.value,
                                                })
                                            }
                                            className="w-full px-4 py-2 bg-primary-bg border border-subtle-highlight/50 rounded-lg text-primary-text focus:border-primary-blue focus:outline-none"
                                        >
                                            <option value="draft">Draft</option>
                                            <option value="published">
                                                Published
                                            </option>
                                            <option value="archived">
                                                Archived
                                            </option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-primary-text mb-2">
                                            Slug
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.slug}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    slug: e.target.value,
                                                })
                                            }
                                            placeholder={generateSlug(
                                                formData.title
                                            )}
                                            className="w-full px-4 py-2 bg-primary-bg border border-subtle-highlight/50 rounded-lg text-primary-text focus:border-primary-blue focus:outline-none"
                                        />
                                        <p className="text-xs text-muted-text mt-1">
                                            Leave blank to auto-generate
                                        </p>
                                    </div>

                                    <div className="flex items-center">
                                        <label className="flex items-center space-x-2 text-primary-text">
                                            <input
                                                type="checkbox"
                                                checked={formData.is_featured}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        is_featured:
                                                            e.target.checked,
                                                    })
                                                }
                                                className="rounded border-subtle-highlight/50 text-primary-blue focus:ring-primary-blue"
                                            />
                                            <span>Featured Post</span>
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-primary-text mb-2">
                                        Excerpt *
                                    </label>
                                    <textarea
                                        required
                                        rows={3}
                                        value={formData.excerpt}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                excerpt: e.target.value,
                                            })
                                        }
                                        className="w-full px-4 py-2 bg-primary-bg border border-subtle-highlight/50 rounded-lg text-primary-text focus:border-primary-blue focus:outline-none"
                                        placeholder="Brief description of the post..."
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-primary-text mb-2">
                                        Content *
                                    </label>
                                    <textarea
                                        required
                                        rows={8}
                                        value={formData.content}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                content: e.target.value,
                                            })
                                        }
                                        className="w-full px-4 py-2 bg-primary-bg border border-subtle-highlight/50 rounded-lg text-primary-text focus:border-primary-blue focus:outline-none"
                                        placeholder="Write your post content here..."
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-primary-text mb-2">
                                            Featured Image URL
                                        </label>
                                        <input
                                            type="url"
                                            value={formData.image_url}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    image_url: e.target.value,
                                                })
                                            }
                                            className="w-full px-4 py-2 bg-primary-bg border border-subtle-highlight/50 rounded-lg text-primary-text focus:border-primary-blue focus:outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-primary-text mb-2">
                                            Tags
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.tags}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    tags: e.target.value,
                                                })
                                            }
                                            placeholder="react, tutorial, javascript"
                                            className="w-full px-4 py-2 bg-primary-bg border border-subtle-highlight/50 rounded-lg text-primary-text focus:border-primary-blue focus:outline-none"
                                        />
                                        <p className="text-xs text-muted-text mt-1">
                                            Separate with commas
                                        </p>
                                    </div>
                                </div>

                                {/* SEO Section */}
                                <div className="border-t border-subtle-highlight/30 pt-6">
                                    <h3 className="text-lg font-semibold text-primary-text mb-4">
                                        SEO Settings
                                    </h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-primary-text mb-2">
                                                SEO Title
                                            </label>
                                            <input
                                                type="text"
                                                value={formData.seo_title}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        seo_title:
                                                            e.target.value,
                                                    })
                                                }
                                                placeholder={formData.title}
                                                className="w-full px-4 py-2 bg-primary-bg border border-subtle-highlight/50 rounded-lg text-primary-text focus:border-primary-blue focus:outline-none"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-primary-text mb-2">
                                                SEO Description
                                            </label>
                                            <textarea
                                                rows={3}
                                                value={formData.seo_description}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        seo_description:
                                                            e.target.value,
                                                    })
                                                }
                                                placeholder={formData.excerpt}
                                                className="w-full px-4 py-2 bg-primary-bg border border-subtle-highlight/50 rounded-lg text-primary-text focus:border-primary-blue focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end space-x-4 pt-6">
                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="px-4 py-2 border border-subtle-highlight/50 rounded-lg text-muted-text hover:text-primary-text hover:border-primary-text transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-primary-blue hover:bg-blue-600 text-white rounded-lg transition-colors"
                                    >
                                        {editingPost
                                            ? "Update Post"
                                            : "Create Post"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPosts;
