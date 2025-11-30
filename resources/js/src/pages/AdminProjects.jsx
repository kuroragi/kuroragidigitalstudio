import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate, Link } from "react-router-dom";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import axios from "axios";

const AdminProjects = () => {
    const { isAuthenticated, isLoading } = useAuth();
    const [projects, setProjects] = useState([]);
    const [isLoadingProjects, setIsLoadingProjects] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        content: "",
        image_url: "",
        project_url: "",
        github_url: "",
        technologies: "",
        category: "web",
        status: "draft",
        is_featured: false,
    });

    // Redirect if not authenticated
    if (!isAuthenticated && !isLoading) {
        return <Navigate to="/portal" replace />;
    }

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {
        try {
            setIsLoadingProjects(true);
            setError(null);

            const token = localStorage.getItem("admin_token");
            const response = await axios.get("/projects", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });

            setProjects(response.data.data || response.data);
        } catch (error) {
            console.error("Failed to load projects:", error);
            setError(
                error.response?.data?.message || "Failed to load projects"
            );
        } finally {
            setIsLoadingProjects(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("admin_token");
            const projectData = {
                ...formData,
                technologies: formData.technologies
                    .split(",")
                    .map((tech) => tech.trim())
                    .filter((tech) => tech),
            };

            if (editingProject) {
                await axios.put(
                    `/admin/projects/${editingProject.id}`,
                    projectData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );
            } else {
                await axios.post("/admin/projects", projectData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
            }

            setShowModal(false);
            setEditingProject(null);
            resetForm();
            loadProjects();
        } catch (error) {
            console.error("Failed to save project:", error);
            setError(error.response?.data?.message || "Failed to save project");
        }
    };

    const handleEdit = (project) => {
        setEditingProject(project);
        setFormData({
            title: project.title,
            description: project.description,
            content: project.content || "",
            image_url: project.image_url || "",
            project_url: project.project_url || "",
            github_url: project.github_url || "",
            technologies: Array.isArray(project.technologies)
                ? project.technologies.join(", ")
                : project.technologies || "",
            category: project.category || "web",
            status: project.status,
            is_featured: project.is_featured || false,
        });
        setShowModal(true);
    };

    const handleDelete = async (projectId) => {
        if (!confirm("Are you sure you want to delete this project?")) return;

        try {
            const token = localStorage.getItem("admin_token");
            await axios.delete(`/admin/projects/${projectId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setProjects(projects.filter((project) => project.id !== projectId));
        } catch (error) {
            console.error("Failed to delete project:", error);
            setError(
                error.response?.data?.message || "Failed to delete project"
            );
        }
    };

    const resetForm = () => {
        setFormData({
            title: "",
            description: "",
            content: "",
            image_url: "",
            project_url: "",
            github_url: "",
            technologies: "",
            category: "web",
            status: "draft",
            is_featured: false,
        });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "published":
                return "bg-green-500/20 text-green-400 border-green-500/30";
            case "draft":
                return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
            default:
                return "bg-gray-500/20 text-gray-400 border-gray-500/30";
        }
    };

    if (isLoading || isLoadingProjects) {
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
                                Project Management
                            </h1>
                        </div>
                        <button
                            onClick={() => {
                                setEditingProject(null);
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
                            New Project
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

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="bg-secondary-bg/30 backdrop-blur-lg border border-subtle-highlight/30 rounded-xl p-6 hover:bg-secondary-bg/50 transition-all duration-200"
                        >
                            {/* Project Image */}
                            {project.image_url && (
                                <div className="mb-4 aspect-video bg-primary-bg/50 rounded-lg overflow-hidden">
                                    <img
                                        src={project.image_url}
                                        alt={project.title}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.style.display = "none";
                                        }}
                                    />
                                </div>
                            )}

                            {/* Project Info */}
                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-lg font-semibold text-primary-text">
                                        {project.title}
                                    </h3>
                                    {project.is_featured && (
                                        <span className="text-yellow-400">
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

                                <p className="text-muted-text text-sm mb-4 line-clamp-2">
                                    {project.description}
                                </p>

                                {/* Technologies */}
                                {project.technologies && (
                                    <div className="flex flex-wrap gap-1 mb-4">
                                        {(Array.isArray(project.technologies)
                                            ? project.technologies
                                            : project.technologies.split(",")
                                        )
                                            .slice(0, 3)
                                            .map((tech, index) => (
                                                <span
                                                    key={index}
                                                    className="px-2 py-1 text-xs bg-primary-blue/20 text-primary-blue rounded"
                                                >
                                                    {tech.trim()}
                                                </span>
                                            ))}
                                        {(Array.isArray(project.technologies)
                                            ? project.technologies
                                            : project.technologies.split(",")
                                        ).length > 3 && (
                                            <span className="px-2 py-1 text-xs bg-muted-text/20 text-muted-text rounded">
                                                +
                                                {(Array.isArray(
                                                    project.technologies
                                                )
                                                    ? project.technologies
                                                    : project.technologies.split(
                                                          ","
                                                      )
                                                ).length - 3}{" "}
                                                more
                                            </span>
                                        )}
                                    </div>
                                )}

                                {/* Status and Category */}
                                <div className="flex justify-between items-center mb-4">
                                    <span
                                        className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(
                                            project.status
                                        )}`}
                                    >
                                        {project.status}
                                    </span>
                                    <span className="text-xs text-muted-text capitalize">
                                        {project.category}
                                    </span>
                                </div>

                                {/* Actions */}
                                <div className="flex justify-between items-center">
                                    <div className="flex space-x-2">
                                        {project.project_url && (
                                            <a
                                                href={project.project_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
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
                                                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                                    />
                                                </svg>
                                            </a>
                                        )}
                                        {project.github_url && (
                                            <a
                                                href={project.github_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-muted-text hover:text-primary-text transition-colors"
                                            >
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                                                </svg>
                                            </a>
                                        )}
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleEdit(project)}
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
                                                handleDelete(project.id)
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
                {projects.length === 0 && !isLoadingProjects && (
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
                                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                            />
                        </svg>
                        <p className="text-muted-text mb-4">
                            No projects found
                        </p>
                        <button
                            onClick={() => {
                                resetForm();
                                setShowModal(true);
                            }}
                            className="bg-primary-blue hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                            Create Your First Project
                        </button>
                    </div>
                )}
            </main>

            {/* Project Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-secondary-bg border border-subtle-highlight/30 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-6">
                                <h2 className="text-xl font-bold text-primary-text">
                                    {editingProject
                                        ? "Edit Project"
                                        : "New Project"}
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

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
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
                                            <option value="web">
                                                Web Development
                                            </option>
                                            <option value="mobile">
                                                Mobile App
                                            </option>
                                            <option value="design">
                                                UI/UX Design
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
                                        </select>
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
                                            <span>Featured Project</span>
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-primary-text mb-2">
                                        Description *
                                    </label>
                                    <textarea
                                        required
                                        rows={3}
                                        value={formData.description}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                description: e.target.value,
                                            })
                                        }
                                        className="w-full px-4 py-2 bg-primary-bg border border-subtle-highlight/50 rounded-lg text-primary-text focus:border-primary-blue focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-primary-text mb-2">
                                        Content
                                    </label>
                                    <textarea
                                        rows={6}
                                        value={formData.content}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                content: e.target.value,
                                            })
                                        }
                                        className="w-full px-4 py-2 bg-primary-bg border border-subtle-highlight/50 rounded-lg text-primary-text focus:border-primary-blue focus:outline-none"
                                        placeholder="Detailed project description..."
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-primary-text mb-2">
                                            Image URL
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
                                            Project URL
                                        </label>
                                        <input
                                            type="url"
                                            value={formData.project_url}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    project_url: e.target.value,
                                                })
                                            }
                                            className="w-full px-4 py-2 bg-primary-bg border border-subtle-highlight/50 rounded-lg text-primary-text focus:border-primary-blue focus:outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-primary-text mb-2">
                                            GitHub URL
                                        </label>
                                        <input
                                            type="url"
                                            value={formData.github_url}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    github_url: e.target.value,
                                                })
                                            }
                                            className="w-full px-4 py-2 bg-primary-bg border border-subtle-highlight/50 rounded-lg text-primary-text focus:border-primary-blue focus:outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-primary-text mb-2">
                                            Technologies
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.technologies}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    technologies:
                                                        e.target.value,
                                                })
                                            }
                                            placeholder="React, Node.js, MongoDB"
                                            className="w-full px-4 py-2 bg-primary-bg border border-subtle-highlight/50 rounded-lg text-primary-text focus:border-primary-blue focus:outline-none"
                                        />
                                        <p className="text-xs text-muted-text mt-1">
                                            Separate with commas
                                        </p>
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
                                        {editingProject
                                            ? "Update Project"
                                            : "Create Project"}
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

export default AdminProjects;
