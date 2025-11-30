import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../components/Layout";
import AdminRoute from "../components/AdminRoute";
import { createLazyComponents } from "../hooks/useCodeSplitting.jsx";
import { LazyImage } from "../hooks/useLazyLoading.jsx";

// Page Loading Components
const PageLoader = () => (
    <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue mx-auto"></div>
            <p className="text-muted-text">Loading...</p>
        </div>
    </div>
);

const AdminLoader = () => (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center space-y-4">
            <div className="animate-pulse space-y-3">
                <div className="h-8 bg-gray-300 rounded w-48 mx-auto"></div>
                <div className="h-4 bg-gray-300 rounded w-32 mx-auto"></div>
            </div>
        </div>
    </div>
);

// Lazy-loaded Public Pages
const Home = createLazyComponents.page(() => import("../pages/Home"));
const About = createLazyComponents.page(() => import("../pages/About"));
const Services = createLazyComponents.page(() => import("../pages/Services"));
const Portfolio = createLazyComponents.page(() => import("../pages/Portfolio"));
const Blog = createLazyComponents.page(() => import("../pages/Blog"));
const BlogPost = createLazyComponents.page(() => import("../pages/BlogPost"));
const Contact = createLazyComponents.page(() => import("../pages/Contact"));

// Lazy-loaded Test Pages (development only)
const MeteorTest = createLazyComponents.animation(() =>
    import("../pages/MeteorTest")
);
const ParallaxTest = createLazyComponents.animation(() =>
    import("../pages/ParallaxTest")
);
const HeroTest = createLazyComponents.animation(() =>
    import("../pages/HeroTest")
);

// Lazy-loaded Showcase Pages
const CardShowcase = createLazyComponents.page(() =>
    import("../pages/showcase/CardShowcase")
);

// Lazy-loaded Auth Pages
const PortalLogin = createLazyComponents.form(() =>
    import("../pages/PortalLogin")
);

// Lazy-loaded Admin Pages (loaded only when needed)
const AdminDashboard = React.lazy(() => import("../pages/AdminDashboard"));
const AdminContacts = React.lazy(() => import("../pages/AdminContacts"));
const AdminProjects = React.lazy(() => import("../pages/AdminProjects"));
const AdminPosts = React.lazy(() => import("../pages/AdminPosts"));

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
    { path: "/parallax-test", element: <ParallaxTest /> },
    { path: "/hero-test", element: <HeroTest /> },
    { path: "/card-showcase", element: <CardShowcase /> },
];

const adminRoutes = [
    {
        path: "/portal/dashboard",
        element: (
            <Suspense fallback={<AdminLoader />}>
                <AdminDashboard />
            </Suspense>
        ),
    },
    {
        path: "/portal/contacts",
        element: (
            <Suspense fallback={<AdminLoader />}>
                <AdminContacts />
            </Suspense>
        ),
    },
    {
        path: "/portal/projects",
        element: (
            <Suspense fallback={<AdminLoader />}>
                <AdminProjects />
            </Suspense>
        ),
    },
    {
        path: "/portal/posts",
        element: (
            <Suspense fallback={<AdminLoader />}>
                <AdminPosts />
            </Suspense>
        ),
    },
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

            {/* Protected Admin Routes */}
            {adminRoutes.map((route, index) => (
                <Route
                    key={index}
                    path={route.path}
                    element={<AdminRoute>{route.element}</AdminRoute>}
                />
            ))}

            {/* 404 Not Found */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default AppRoutes;
