import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate, Link } from "react-router-dom";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import axios from "axios";

const AdminDashboard = () => {
    const { isAuthenticated, user, isLoading, logout } = useAuth();
    const [dashboardData, setDashboardData] = useState(null);
    const [isLoadingData, setIsLoadingData] = useState(true);
    const [error, setError] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [selectedPeriod, setSelectedPeriod] = useState(30);

    // Redirect if not authenticated
    if (!isAuthenticated && !isLoading) {
        return <Navigate to="/portal" replace />;
    }

    useEffect(() => {
        if (isAuthenticated) {
            loadDashboardData();
        }
    }, [isAuthenticated]);

    const loadDashboardData = async (period = selectedPeriod) => {
        try {
            setIsLoadingData(true);
            setError(null);

            const token = localStorage.getItem("admin_token");
            if (!token) {
                throw new Error("No authentication token found");
            }

            const response = await axios.get("/admin/dashboard", {
                params: { days: period },
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            });

            if (response.data.success) {
                setDashboardData(response.data.data);
            } else {
                throw new Error(
                    response.data.message || "Failed to load dashboard data"
                );
            }
        } catch (error) {
            console.error("Failed to load dashboard data:", error);
            setError(
                error.response?.data?.message ||
                    error.message ||
                    "Failed to load dashboard data"
            );

            // If unauthorized, logout
            if (error.response?.status === 401) {
                logout();
            }
        } finally {
            setIsLoadingData(false);
            setRefreshing(false);
        }
    };

    const handleRefresh = async () => {
        setRefreshing(true);
        await loadDashboardData();
    };

    const handlePeriodChange = (period) => {
        setSelectedPeriod(period);
        loadDashboardData(period);
    };

    const handleLogout = async () => {
        await logout();
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-primary-bg flex items-center justify-center">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    if (!dashboardData) return null; // Don't render cards if no data

    const statCards = [
        {
            title: "Contacts",
            total: dashboardData.overview.contacts.total,
            subtitle: `${dashboardData.overview.contacts.unread} new • ${dashboardData.overview.contacts.today} today`,
            change:
                dashboardData.overview.contacts.recent > 0
                    ? `+${dashboardData.overview.contacts.recent} this period`
                    : "No new contacts",
            changeType:
                dashboardData.overview.contacts.recent > 0
                    ? "positive"
                    : "neutral",
            icon: (
                <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                </svg>
            ),
            color: "blue",
            link: "/portal/contacts",
        },
        {
            title: "Projects",
            total: dashboardData.overview.projects.total,
            subtitle: `${dashboardData.overview.projects.published} published • ${dashboardData.overview.projects.draft} draft`,
            change:
                dashboardData.overview.projects.recent > 0
                    ? `+${dashboardData.overview.projects.recent} this period`
                    : "No new projects",
            changeType:
                dashboardData.overview.projects.recent > 0
                    ? "positive"
                    : "neutral",
            icon: (
                <svg
                    className="w-8 h-8"
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
            ),
            color: "green",
            link: "/portal/projects",
        },
        {
            title: "Blog Posts",
            total: dashboardData.overview.posts.total,
            subtitle: `${dashboardData.overview.posts.published} published • ${dashboardData.overview.posts.draft} draft`,
            change:
                dashboardData.overview.posts.recent > 0
                    ? `+${dashboardData.overview.posts.recent} this period`
                    : "No new posts",
            changeType:
                dashboardData.overview.posts.recent > 0
                    ? "positive"
                    : "neutral",
            icon: (
                <svg
                    className="w-8 h-8"
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
            ),
            color: "purple",
            link: "/portal/posts",
        },
        {
            title: "Services",
            total: dashboardData.overview.services.total,
            subtitle: `${dashboardData.overview.services.active} active • ${dashboardData.overview.services.featured} featured`,
            change:
                dashboardData.overview.services.inactive > 0
                    ? `${dashboardData.overview.services.inactive} inactive`
                    : "All services active",
            changeType:
                dashboardData.overview.services.inactive === 0
                    ? "positive"
                    : "neutral",
            icon: (
                <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                </svg>
            ),
            color: "orange",
            link: "/portal/services",
        },
    ];

    const quickActions = [
        {
            title: "New Project",
            description: "Add a new portfolio project",
            icon: (
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
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                </svg>
            ),
            action: () => console.log("New Project"),
            color: "blue",
        },
        {
            title: "New Blog Post",
            description: "Write a new article",
            icon: (
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
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                </svg>
            ),
            action: () => console.log("New Post"),
            color: "green",
        },
        {
            title: "View Contacts",
            description: "Check new inquiries",
            icon: (
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
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                </svg>
            ),
            action: () => console.log("View Contacts"),
            color: "purple",
        },
    ];

    return (
        <div className="min-h-screen bg-primary-bg">
            {/* Header */}
            <header className="bg-secondary-bg/50 backdrop-blur-lg border-b border-subtle-highlight/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <h1 className="text-xl font-bold text-primary-text">
                                    Admin Portal
                                </h1>
                            </div>
                        </div>

                        {/* User Menu */}
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={handleRefresh}
                                disabled={refreshing}
                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-muted-text hover:text-primary-text bg-transparent hover:bg-subtle-highlight/20 transition-colors disabled:opacity-50"
                            >
                                <svg
                                    className={`w-4 h-4 mr-2 ${
                                        refreshing ? "animate-spin" : ""
                                    }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                    />
                                </svg>
                                {refreshing ? "Refreshing..." : "Refresh"}
                            </button>
                            <div className="text-sm text-muted-text">
                                Welcome,{" "}
                                <span className="text-primary-text font-medium">
                                    {user?.name}
                                </span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-muted-text hover:text-primary-text bg-transparent hover:bg-subtle-highlight/20 transition-colors"
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
                                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                    />
                                </svg>
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                {/* Welcome Section */}
                <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-3xl font-bold text-primary-text mb-2">
                            Dashboard
                        </h2>
                        <p className="text-muted-text">
                            Manage your website content and monitor site
                            activity.
                        </p>
                        {dashboardData && (
                            <p className="text-xs text-muted-text mt-1">
                                Last updated:{" "}
                                {new Date(
                                    dashboardData.generated_at
                                ).toLocaleString()}
                            </p>
                        )}
                    </div>

                    {/* Period Selector */}
                    <div className="mt-4 sm:mt-0">
                        <div className="flex items-center space-x-2">
                            <span className="text-sm text-muted-text">
                                Period:
                            </span>
                            <select
                                value={selectedPeriod}
                                onChange={(e) =>
                                    handlePeriodChange(Number(e.target.value))
                                }
                                className="bg-secondary-bg/50 border border-subtle-highlight/50 rounded-md px-3 py-1 text-sm text-primary-text focus:border-primary-blue focus:outline-none"
                            >
                                <option value={7}>Last 7 days</option>
                                <option value={30}>Last 30 days</option>
                                <option value={90}>Last 3 months</option>
                                <option value={365}>Last year</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Error Display */}
                {error && (
                    <div className="mb-6 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg">
                        <div className="flex items-center">
                            <svg
                                className="w-5 h-5 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            {error}
                        </div>
                    </div>
                )}

                {isLoadingData ? (
                    <div className="flex justify-center py-12">
                        <LoadingSpinner size="lg" />
                    </div>
                ) : (
                    <>
                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            {statCards.map((card, index) => (
                                <Link
                                    key={index}
                                    to={card.link}
                                    className="bg-secondary-bg/30 backdrop-blur-lg border border-subtle-highlight/30 rounded-xl p-6 hover:bg-secondary-bg/50 transition-all duration-200 block group"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex-1">
                                            <p className="text-muted-text text-sm font-medium">
                                                {card.title}
                                            </p>
                                            <p className="text-3xl font-bold text-primary-text group-hover:text-primary-blue transition-colors">
                                                {card.total.toLocaleString()}
                                            </p>
                                        </div>
                                        <div
                                            className={`text-${card.color}-500 bg-${card.color}-500/10 p-3 rounded-lg group-hover:bg-${card.color}-500/20 transition-colors`}
                                        >
                                            {card.icon}
                                        </div>
                                    </div>
                                    <p className="text-xs text-muted-text mb-2">
                                        {card.subtitle}
                                    </p>
                                    <div className="flex items-center text-xs">
                                        <span
                                            className={`${
                                                card.changeType === "positive"
                                                    ? "text-green-400"
                                                    : "text-muted-text"
                                            }`}
                                        >
                                            {card.changeType === "positive" &&
                                                "↗ "}
                                            {card.change}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* Quick Actions */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-2">
                                <h3 className="text-xl font-semibold text-primary-text mb-4">
                                    Quick Actions
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {quickActions.map((action, index) => (
                                        <button
                                            key={index}
                                            onClick={action.action}
                                            className="bg-secondary-bg/30 backdrop-blur-lg border border-subtle-highlight/30 rounded-xl p-4 text-left hover:bg-secondary-bg/50 transition-all duration-200"
                                        >
                                            <div
                                                className={`inline-flex items-center justify-center p-2 bg-${action.color}-500/10 text-${action.color}-500 rounded-lg mb-3`}
                                            >
                                                {action.icon}
                                            </div>
                                            <h4 className="text-primary-text font-medium mb-1">
                                                {action.title}
                                            </h4>
                                            <p className="text-muted-text text-sm">
                                                {action.description}
                                            </p>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Recent Activity */}
                            <div>
                                <h3 className="text-xl font-semibold text-primary-text mb-4">
                                    Recent Activity
                                </h3>
                                <div className="bg-secondary-bg/30 backdrop-blur-lg border border-subtle-highlight/30 rounded-xl p-6">
                                    <div className="space-y-6">
                                        {/* Recent Contacts */}
                                        {dashboardData.recent_activity.contacts
                                            .length > 0 && (
                                            <div>
                                                <h4 className="text-sm font-medium text-primary-text mb-3 flex items-center">
                                                    <svg
                                                        className="w-4 h-4 mr-2 text-blue-500"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                        />
                                                    </svg>
                                                    Latest Contacts
                                                </h4>
                                                {dashboardData.recent_activity.contacts.map(
                                                    (contact) => (
                                                        <div
                                                            key={contact.id}
                                                            className="flex items-start space-x-3 mb-3 last:mb-0"
                                                        >
                                                            <div
                                                                className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                                                                    contact.status ===
                                                                    "new"
                                                                        ? "bg-red-500"
                                                                        : contact.status ===
                                                                          "read"
                                                                        ? "bg-yellow-500"
                                                                        : contact.status ===
                                                                          "replied"
                                                                        ? "bg-blue-500"
                                                                        : "bg-green-500"
                                                                }`}
                                                            ></div>
                                                            <div className="flex-1">
                                                                <p className="text-primary-text text-sm font-medium">
                                                                    {
                                                                        contact.name
                                                                    }{" "}
                                                                    -{" "}
                                                                    {
                                                                        contact.subject
                                                                    }
                                                                </p>
                                                                <p className="text-muted-text text-xs">
                                                                    {
                                                                        contact.email
                                                                    }{" "}
                                                                    •{" "}
                                                                    {new Date(
                                                                        contact.created_at
                                                                    ).toLocaleDateString()}
                                                                </p>
                                                            </div>
                                                            <span
                                                                className={`px-2 py-1 text-xs rounded-full ${
                                                                    contact.status ===
                                                                    "new"
                                                                        ? "bg-red-500/20 text-red-400"
                                                                        : contact.status ===
                                                                          "read"
                                                                        ? "bg-yellow-500/20 text-yellow-400"
                                                                        : contact.status ===
                                                                          "replied"
                                                                        ? "bg-blue-500/20 text-blue-400"
                                                                        : "bg-green-500/20 text-green-400"
                                                                }`}
                                                            >
                                                                {contact.status}
                                                            </span>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        )}

                                        {/* Recent Projects */}
                                        {dashboardData.recent_activity.projects
                                            .length > 0 && (
                                            <div>
                                                <h4 className="text-sm font-medium text-primary-text mb-3 flex items-center">
                                                    <svg
                                                        className="w-4 h-4 mr-2 text-green-500"
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
                                                    Latest Projects
                                                </h4>
                                                {dashboardData.recent_activity.projects.map(
                                                    (project) => (
                                                        <div
                                                            key={project.id}
                                                            className="flex items-start space-x-3 mb-3 last:mb-0"
                                                        >
                                                            <div
                                                                className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                                                                    project.status ===
                                                                    "published"
                                                                        ? "bg-green-500"
                                                                        : "bg-yellow-500"
                                                                }`}
                                                            ></div>
                                                            <div className="flex-1">
                                                                <p className="text-primary-text text-sm font-medium">
                                                                    {
                                                                        project.title
                                                                    }
                                                                </p>
                                                                <p className="text-muted-text text-xs">
                                                                    Updated:{" "}
                                                                    {new Date(
                                                                        project.updated_at
                                                                    ).toLocaleDateString()}
                                                                </p>
                                                            </div>
                                                            <span
                                                                className={`px-2 py-1 text-xs rounded-full ${
                                                                    project.status ===
                                                                    "published"
                                                                        ? "bg-green-500/20 text-green-400"
                                                                        : "bg-yellow-500/20 text-yellow-400"
                                                                }`}
                                                            >
                                                                {project.status}
                                                            </span>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        )}

                                        {/* Recent Posts */}
                                        {dashboardData.recent_activity.posts
                                            .length > 0 && (
                                            <div>
                                                <h4 className="text-sm font-medium text-primary-text mb-3 flex items-center">
                                                    <svg
                                                        className="w-4 h-4 mr-2 text-purple-500"
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
                                                    Latest Posts
                                                </h4>
                                                {dashboardData.recent_activity.posts.map(
                                                    (post) => (
                                                        <div
                                                            key={post.id}
                                                            className="flex items-start space-x-3 mb-3 last:mb-0"
                                                        >
                                                            <div
                                                                className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                                                                    post.status ===
                                                                    "published"
                                                                        ? "bg-green-500"
                                                                        : "bg-yellow-500"
                                                                }`}
                                                            ></div>
                                                            <div className="flex-1">
                                                                <p className="text-primary-text text-sm font-medium">
                                                                    {post.title}
                                                                </p>
                                                                <p className="text-muted-text text-xs">
                                                                    Updated:{" "}
                                                                    {new Date(
                                                                        post.updated_at
                                                                    ).toLocaleDateString()}
                                                                </p>
                                                            </div>
                                                            <span
                                                                className={`px-2 py-1 text-xs rounded-full ${
                                                                    post.status ===
                                                                    "published"
                                                                        ? "bg-green-500/20 text-green-400"
                                                                        : "bg-yellow-500/20 text-yellow-400"
                                                                }`}
                                                            >
                                                                {post.status}
                                                            </span>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        )}

                                        {/* No Activity */}
                                        {!dashboardData.recent_activity.contacts
                                            .length &&
                                            !dashboardData.recent_activity
                                                .projects.length &&
                                            !dashboardData.recent_activity.posts
                                                .length && (
                                                <div className="text-center py-8">
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
                                                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2m16-7H4m16 0l-2-2m2 2l-2 2M4 13l2-2m-2 2l2 2"
                                                        />
                                                    </svg>
                                                    <p className="text-muted-text">
                                                        No recent activity
                                                    </p>
                                                </div>
                                            )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
};

export default AdminDashboard;
