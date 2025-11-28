import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

/**
 * Admin Layout Component
 * Layout khusus untuk admin area dengan sidebar navigation
 */
function AdminLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/portal');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const navigationItems = [
        {
            name: 'Dashboard',
            href: '/admin/dashboard',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                </svg>
            )
        },
        {
            name: 'Projects',
            href: '/admin/projects',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
            )
        },
        {
            name: 'Services',
            href: '/admin/services',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 00-2 2H6a2 2 0 00-2-2V4a2 2 0 012-2h8a2 2 0 012 2z" />
                </svg>
            )
        },
        {
            name: 'Blog Posts',
            href: '/admin/posts',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            )
        },
        {
            name: 'Contacts',
            href: '/admin/contacts',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            )
        }
    ];

    return (
        <div className="min-h-screen bg-primary-bg flex">
            {/* Sidebar */}
            <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 bg-surface shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
                <div className="flex items-center justify-between h-16 px-6 border-b border-subtle-highlight">
                    <h2 className="text-lg font-heading font-semibold text-gradient">
                        Admin Portal
                    </h2>
                    <button
                        className="lg:hidden text-muted-text hover:text-primary-text"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                
                <nav className="mt-6 px-3">
                    <div className="space-y-1">
                        {navigationItems.map((item) => (
                            <NavLink
                                key={item.name}
                                to={item.href}
                                className={({ isActive }) =>
                                    `group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                                        isActive
                                            ? 'bg-primary-blue text-white shadow-glow-sm'
                                            : 'text-muted-text hover:bg-subtle-highlight hover:text-primary-text'
                                    }`
                                }
                            >
                                <span className="mr-3">{item.icon}</span>
                                {item.name}
                            </NavLink>
                        ))}
                    </div>
                </nav>

                {/* User info and logout */}
                <div className="absolute bottom-0 w-full p-3 border-t border-subtle-highlight">
                    <div className="flex items-center justify-between p-3 bg-subtle-highlight/30 rounded-lg">
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-primary-blue rounded-full flex items-center justify-center mr-3">
                                <span className="text-sm font-medium text-white">
                                    {user?.name?.charAt(0) || 'A'}
                                </span>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-primary-text">
                                    {user?.name || 'Admin'}
                                </p>
                                <p className="text-xs text-muted-text">Administrator</p>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="text-muted-text hover:text-red-400 transition-colors"
                            title="Logout"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
                {/* Mobile header */}
                <div className="lg:hidden bg-surface border-b border-subtle-highlight px-4 py-3 flex items-center justify-between">
                    <button
                        className="text-muted-text hover:text-primary-text"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                    <h1 className="text-lg font-semibold text-primary-text">Admin Panel</h1>
                    <div className="w-6"></div>
                </div>

                {/* Page Content */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-primary-bg">
                    <div className="container mx-auto px-6 py-8">
                        {children}
                    </div>
                </main>
            </div>

            {/* Sidebar overlay for mobile */}
            {sidebarOpen && (
                <div
                    className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}
        </div>
    );
}

export default AdminLayout;