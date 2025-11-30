// Core UI Components Export
export { default as Navbar } from "./ui/Navbar";
export { default as Footer } from "./ui/Footer";
export { default as LoadingSpinner } from "./ui/LoadingSpinner";
export { default as ErrorBoundary } from "./ui/ErrorBoundary";
export { default as Button } from "./ui/Button";
export { default as Modal } from "./ui/Modal";
export { default as Badge } from "./ui/Badge";
export { default as Toast, ToastContainer } from "./ui/Toast";

// Card Components
export {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
    CardImage,
    CardIcon,
} from "./ui/Card";

export { PortfolioCard, ServiceCard, TestimonialCard } from "./ui/CardVariants";

export {
    CardGrid,
    PortfolioGrid,
    ServicesGrid,
    TestimonialsGrid,
    ResponsiveCardContainer,
    MixedCardLayout,
} from "./ui/CardGrid";

// Layout Components
export { default as Layout } from "./Layout";
export { default as AdminLayout } from "./admin/AdminLayout";
export { default as ProtectedRoute } from "./ProtectedRoute";

// Guards
export {
    AuthGuard,
    AdminGuard,
    GuestGuard,
    RoleGuard,
} from "./guards/RouteGuards";

// Sections
export {
    Hero,
    HomeHero,
    AboutHero,
    ServicesHero,
    PortfolioHero,
    BlogHero,
    ContactHero,
    MinimalHero,
    ErrorHero,
    HeroConfigs,
    useResponsiveHero,
} from "./sections";

// Hooks
export { default as usePageMetadata } from "../hooks/usePageMetadata";
