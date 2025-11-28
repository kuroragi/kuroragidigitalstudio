import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../components/Layout";
import ProtectedRoute from "../components/ProtectedRoute";
import AdminLayout from "../components/admin/AdminLayout";

// Public Pages
import Home from "../pages/Home";
import About from "../pages/About";
import Services from "../pages/Services";
import Portfolio from "../pages/Portfolio";
import Blog from "../pages/Blog";
import BlogPost from "../pages/BlogPost";
import Contact from "../pages/Contact";
import MeteorTest from "../pages/MeteorTest";

// Auth Pages
import PortalLogin from "../pages/PortalLogin";

// Admin Pages
import AdminDashboard from "../pages/admin/Dashboard";
import AdminProjects from "../pages/admin/Projects";
import AdminServices from "../pages/admin/Services";
import AdminPosts from "../pages/admin/Posts";
import AdminContacts from "../pages/admin/Contacts";

// Error Pages
import NotFound from "../pages/NotFound";

// Route configuration
const publicRoutes = [
    { path: "/", element: <Home />, exact: true },
    { path: "/about", element: <About /> },
    { path: "/services", element: <Services /> },
    { path: "/portfolio", element: <Portfolio /> },
    { path: "/blog", element: <Blog /> },
    { path: "/blog/:slug", element: <BlogPost /> },
    { path: "/contact", element: <Contact /> },
    { path: "/meteor-test", element: <MeteorTest /> },
];

const adminRoutes = [
    {
        path: "/admin",
        element: <Navigate to="/admin/dashboard" replace />,
        exact: true,
    },
    { path: "/admin/dashboard", element: <AdminDashboard /> },
    { path: "/admin/projects", element: <AdminProjects /> },
    { path: "/admin/services", element: <AdminServices /> },
    { path: "/admin/posts", element: <AdminPosts /> },
    { path: "/admin/contacts", element: <AdminContacts /> },
];

/**
 * Main App Routes
 * Handles public routes, admin routes, dan protected routes dengan nested structure
 */
function AppRoutes() {
    return (
        <Routes>
            {/* Public Routes dengan Layout */}
            <Route path="/" element={<Layout />}>
                {publicRoutes.map((route, index) => (
                    <Route
                        key={index}
                        path={route.path === "/" ? undefined : route.path}
                        index={route.path === "/"}
                        element={route.element}
                    />
                ))}
            </Route>

            {/* Hidden Portal Login (no layout) */}
            <Route path="/portal" element={<PortalLogin />} />

            {/* Protected Admin Routes dengan AdminLayout */}
            {adminRoutes.map((route, index) => (
                <Route
                    key={index}
                    path={route.path}
                    element={
                        <ProtectedRoute>
                            <AdminLayout>{route.element}</AdminLayout>
                        </ProtectedRoute>
                    }
                />
            ))}

            {/* 404 Not Found */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default AppRoutes;
