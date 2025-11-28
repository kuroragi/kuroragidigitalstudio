import React from "react";
import { useAuth } from "../../contexts/AuthContext";

/**
 * Admin Dashboard Component
 * Overview dengan statistics dan navigation
 */
function AdminDashboard() {
    const { user, logout } = useAuth();

    return (
        <div className="min-h-screen bg-primary-bg text-primary-text">
            {/* Admin Header */}
            <header className="bg-surface border-b border-subtle-highlight">
                <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-primary-blue">
                        Admin Dashboard
                    </h1>
                    <div className="flex items-center space-x-4">
                        <span className="text-muted-text">
                            Welcome, {user?.name}
                        </span>
                        <button
                            onClick={logout}
                            className="px-4 py-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            {/* Dashboard Content */}
            <div className="container mx-auto px-6 py-8">
                {/* Stats Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-surface p-6 rounded-xl border border-subtle-highlight">
                        <h3 className="text-sm font-medium text-muted-text mb-2">
                            Total Projects
                        </h3>
                        <div className="text-3xl font-bold text-primary-blue">
                            5
                        </div>
                    </div>

                    <div className="bg-surface p-6 rounded-xl border border-subtle-highlight">
                        <h3 className="text-sm font-medium text-muted-text mb-2">
                            Total Services
                        </h3>
                        <div className="text-3xl font-bold text-accent-cyan">
                            4
                        </div>
                    </div>

                    <div className="bg-surface p-6 rounded-xl border border-subtle-highlight">
                        <h3 className="text-sm font-medium text-muted-text mb-2">
                            Blog Posts
                        </h3>
                        <div className="text-3xl font-bold text-primary-text">
                            5
                        </div>
                    </div>

                    <div className="bg-surface p-6 rounded-xl border border-subtle-highlight">
                        <h3 className="text-sm font-medium text-muted-text mb-2">
                            Contacts
                        </h3>
                        <div className="text-3xl font-bold text-yellow-400">
                            0
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <button className="p-6 bg-surface border border-subtle-highlight rounded-xl hover:border-primary-blue transition-colors text-left">
                        <h3 className="text-lg font-bold mb-2">
                            Manage Projects
                        </h3>
                        <p className="text-muted-text text-sm">
                            Add, edit, or remove portfolio projects
                        </p>
                    </button>

                    <button className="p-6 bg-surface border border-subtle-highlight rounded-xl hover:border-primary-blue transition-colors text-left">
                        <h3 className="text-lg font-bold mb-2">
                            Manage Services
                        </h3>
                        <p className="text-muted-text text-sm">
                            Update service offerings and pricing
                        </p>
                    </button>

                    <button className="p-6 bg-surface border border-subtle-highlight rounded-xl hover:border-primary-blue transition-colors text-left">
                        <h3 className="text-lg font-bold mb-2">
                            Write Blog Post
                        </h3>
                        <p className="text-muted-text text-sm">
                            Create and publish new articles
                        </p>
                    </button>

                    <button className="p-6 bg-surface border border-subtle-highlight rounded-xl hover:border-primary-blue transition-colors text-left">
                        <h3 className="text-lg font-bold mb-2">
                            View Contacts
                        </h3>
                        <p className="text-muted-text text-sm">
                            Review and respond to inquiries
                        </p>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
