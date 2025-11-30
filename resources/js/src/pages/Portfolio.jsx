import React, { useState } from "react";
import { PortfolioHero, useResponsiveHero } from "../components/sections";
import { Card, CardContent } from "../components/ui/Card";
import Button from "../components/ui/Button";
import { ResponsiveCardContainer } from "../components/ui/CardGrid";
import {
    CodeBracketIcon,
    PaintBrushIcon,
    DevicePhoneMobileIcon,
    GlobeAltIcon,
    EyeIcon,
    ArrowTopRightOnSquareIcon,
    XMarkIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
} from "@heroicons/react/24/outline";

/**
 * Portfolio Page Component
 * Comprehensive portfolio showcase dengan filtering system dan modal preview
 */
function Portfolio() {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedProject, setSelectedProject] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const responsiveConfig = useResponsiveHero();

    // Portfolio categories
    const categories = [
        { id: "all", label: "All Projects", icon: GlobeAltIcon },
        { id: "web", label: "Web Development", icon: CodeBracketIcon },
        { id: "mobile", label: "Mobile Apps", icon: DevicePhoneMobileIcon },
        { id: "design", label: "UI/UX Design", icon: PaintBrushIcon },
    ];

    // Portfolio projects data
    const projects = [
        {
            id: "ecommerce-platform",
            title: "E-Commerce Platform",
            description:
                "Modern e-commerce solution with advanced filtering, payment integration, and admin dashboard.",
            category: "web",
            client: "TechRetail Co.",
            year: "2024",
            duration: "3 months",
            technologies: ["React", "Laravel", "MySQL", "Stripe API", "Redis"],
            features: [
                "Multi-vendor marketplace",
                "Real-time inventory management",
                "Advanced search & filtering",
                "Payment gateway integration",
                "Admin analytics dashboard",
            ],
            images: [
                "/images/portfolio/ecommerce-1.jpg",
                "/images/portfolio/ecommerce-2.jpg",
                "/images/portfolio/ecommerce-3.jpg",
            ],
            liveUrl: "https://demo-ecommerce.kuroragi.com",
            githubUrl: null, // Private project
            featured: true,
            status: "completed",
        },
        {
            id: "healthcare-app",
            title: "HealthCare Mobile App",
            description:
                "Cross-platform mobile application for healthcare management with appointment booking and telemedicine features.",
            category: "mobile",
            client: "MedTech Solutions",
            year: "2024",
            duration: "4 months",
            technologies: [
                "React Native",
                "Node.js",
                "MongoDB",
                "WebRTC",
                "Firebase",
            ],
            features: [
                "Appointment scheduling",
                "Video consultations",
                "Medical records management",
                "Push notifications",
                "Offline data sync",
            ],
            images: [
                "/images/portfolio/healthcare-1.jpg",
                "/images/portfolio/healthcare-2.jpg",
                "/images/portfolio/healthcare-3.jpg",
                "/images/portfolio/healthcare-4.jpg",
            ],
            liveUrl:
                "https://play.google.com/store/apps/details?id=com.medtech.app",
            githubUrl: null,
            featured: true,
            status: "completed",
        },
        {
            id: "fintech-dashboard",
            title: "FinTech Analytics Dashboard",
            description:
                "Comprehensive financial analytics dashboard with real-time data visualization and reporting capabilities.",
            category: "web",
            client: "FinanceFlow Inc.",
            year: "2024",
            duration: "2.5 months",
            technologies: ["Vue.js", "Python", "PostgreSQL", "D3.js", "Docker"],
            features: [
                "Real-time data visualization",
                "Custom report generation",
                "Multi-currency support",
                "Risk assessment tools",
                "API integrations",
            ],
            images: [
                "/images/portfolio/fintech-1.jpg",
                "/images/portfolio/fintech-2.jpg",
                "/images/portfolio/fintech-3.jpg",
            ],
            liveUrl: "https://demo-fintech.kuroragi.com",
            githubUrl: "https://github.com/kuroragi/fintech-dashboard",
            featured: false,
            status: "completed",
        },
        {
            id: "travel-booking-ui",
            title: "Travel Booking Interface",
            description:
                "Modern UI/UX design for travel booking platform with focus on user experience and conversion optimization.",
            category: "design",
            client: "WanderLust Travel",
            year: "2024",
            duration: "6 weeks",
            technologies: ["Figma", "Adobe XD", "Principle", "After Effects"],
            features: [
                "User journey optimization",
                "Interactive prototypes",
                "Design system creation",
                "Accessibility compliance",
                "Mobile-first approach",
            ],
            images: [
                "/images/portfolio/travel-ui-1.jpg",
                "/images/portfolio/travel-ui-2.jpg",
                "/images/portfolio/travel-ui-3.jpg",
                "/images/portfolio/travel-ui-4.jpg",
            ],
            liveUrl: "https://www.figma.com/proto/travel-booking-ui",
            githubUrl: null,
            featured: true,
            status: "completed",
        },
        {
            id: "food-delivery-app",
            title: "Food Delivery App",
            description:
                "Complete food delivery ecosystem with customer app, restaurant dashboard, and delivery tracking system.",
            category: "mobile",
            client: "QuickBite Delivery",
            year: "2023",
            duration: "5 months",
            technologies: [
                "Flutter",
                "Laravel",
                "MySQL",
                "Google Maps API",
                "Pusher",
            ],
            features: [
                "Real-time order tracking",
                "Multi-restaurant platform",
                "Payment processing",
                "Rating & review system",
                "Delivery optimization",
            ],
            images: [
                "/images/portfolio/food-delivery-1.jpg",
                "/images/portfolio/food-delivery-2.jpg",
                "/images/portfolio/food-delivery-3.jpg",
            ],
            liveUrl: "https://quickbite-demo.kuroragi.com",
            githubUrl: null,
            featured: false,
            status: "completed",
        },
        {
            id: "portfolio-website",
            title: "Creative Portfolio Website",
            description:
                "Personal portfolio website for digital artist with interactive galleries and smooth animations.",
            category: "web",
            client: "Alex Rodriguez - Digital Artist",
            year: "2023",
            duration: "1.5 months",
            technologies: ["Next.js", "Three.js", "Sanity CMS", "Vercel"],
            features: [
                "3D interactive elements",
                "Dynamic content management",
                "Performance optimization",
                "SEO optimization",
                "Social media integration",
            ],
            images: [
                "/images/portfolio/portfolio-1.jpg",
                "/images/portfolio/portfolio-2.jpg",
                "/images/portfolio/portfolio-3.jpg",
            ],
            liveUrl: "https://alexrodriguez-art.com",
            githubUrl: "https://github.com/kuroragi/creative-portfolio",
            featured: false,
            status: "completed",
        },
    ];

    // Filter projects by category
    const filteredProjects =
        selectedCategory === "all"
            ? projects
            : projects.filter(
                  (project) => project.category === selectedCategory
              );

    // Modal handlers
    const openModal = (project) => {
        setSelectedProject(project);
        setCurrentImageIndex(0);
        document.body.style.overflow = "hidden";
    };

    const closeModal = () => {
        setSelectedProject(null);
        setCurrentImageIndex(0);
        document.body.style.overflow = "unset";
    };

    const nextImage = () => {
        if (
            selectedProject &&
            currentImageIndex < selectedProject.images.length - 1
        ) {
            setCurrentImageIndex(currentImageIndex + 1);
        }
    };

    const prevImage = () => {
        if (selectedProject && currentImageIndex > 0) {
            setCurrentImageIndex(currentImageIndex - 1);
        }
    };

    return (
        <div className="scroll-smooth">
            {/* Hero Section */}
            <section id="portfolio-hero">
                <PortfolioHero {...responsiveConfig} />
            </section>

            {/* Portfolio Grid */}
            <section
                id="portfolio-grid"
                className="py-16 md:py-20 bg-gradient-to-b from-gray-950 to-gray-900"
            >
                <ResponsiveCardContainer>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            Our <span className="text-blue-400">Work</span>
                        </h2>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
                            Explore our latest projects and see how we've helped
                            clients achieve their digital transformation goals.
                        </p>

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

                    {/* Projects Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.map((project, index) => (
                            <Card
                                key={project.id}
                                className={`group hover:scale-105 transition-all duration-500 hover:border-blue-400/50 cursor-pointer overflow-hidden ${
                                    project.featured
                                        ? "border-blue-400/30 shadow-blue-500/10"
                                        : ""
                                }`}
                                style={{ animationDelay: `${index * 100}ms` }}
                                onClick={() => openModal(project)}
                            >
                                {project.featured && (
                                    <div className="absolute top-4 left-4 z-10">
                                        <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                                            Featured
                                        </span>
                                    </div>
                                )}

                                {/* Project Image */}
                                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600">
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <EyeIcon className="w-12 h-12 text-white" />
                                    </div>
                                    {/* Placeholder for actual project image */}
                                    <div className="w-full h-full flex items-center justify-center text-white/80">
                                        <div className="text-center">
                                            <div className="w-16 h-16 mx-auto mb-2 opacity-60 bg-white/10 rounded-lg flex items-center justify-center">
                                                <CodeBracketIcon className="w-8 h-8" />
                                            </div>
                                            <p className="text-sm">
                                                {project.category.toUpperCase()}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <CardContent className="p-6">
                                    {/* Project Info */}
                                    <div className="mb-4">
                                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                                            {project.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm leading-relaxed mb-3">
                                            {project.description}
                                        </p>
                                        <div className="flex items-center gap-4 text-xs text-gray-500">
                                            <span>{project.client}</span>
                                            <span>•</span>
                                            <span>{project.year}</span>
                                        </div>
                                    </div>

                                    {/* Technologies */}
                                    <div className="mb-4">
                                        <div className="flex flex-wrap gap-1">
                                            {project.technologies
                                                .slice(0, 3)
                                                .map((tech, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded border border-gray-700"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            {project.technologies.length >
                                                3 && (
                                                <span className="px-2 py-1 bg-gray-800 text-gray-400 text-xs rounded border border-gray-700">
                                                    +
                                                    {project.technologies
                                                        .length - 3}{" "}
                                                    more
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Project Links */}
                                    <div className="flex gap-2">
                                        {project.liveUrl && (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    window.open(
                                                        project.liveUrl,
                                                        "_blank"
                                                    );
                                                }}
                                                className="flex-1 text-xs"
                                            >
                                                <ArrowTopRightOnSquareIcon className="w-3 h-3 mr-1" />
                                                View Live
                                            </Button>
                                        )}
                                        {project.githubUrl && (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    window.open(
                                                        project.githubUrl,
                                                        "_blank"
                                                    );
                                                }}
                                                className="flex-1 text-xs"
                                            >
                                                <CodeBracketIcon className="w-3 h-3 mr-1" />
                                                Code
                                            </Button>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </ResponsiveCardContainer>
            </section>

            {/* Portfolio Modal */}
            {selectedProject && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
                    <div className="relative w-full max-w-6xl mx-4 max-h-[90vh] overflow-y-auto bg-gray-900 rounded-xl border border-gray-700">
                        {/* Modal Header */}
                        <div className="sticky top-0 z-10 bg-gray-900/95 backdrop-blur-sm border-b border-gray-700 p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold text-white">
                                        {selectedProject.title}
                                    </h2>
                                    <p className="text-gray-400">
                                        {selectedProject.client} •{" "}
                                        {selectedProject.year}
                                    </p>
                                </div>
                                <button
                                    onClick={closeModal}
                                    className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
                                >
                                    <XMarkIcon className="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6">
                            {/* Image Gallery */}
                            <div className="relative mb-8">
                                <div className="relative h-96 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg overflow-hidden">
                                    <div className="absolute inset-0 flex items-center justify-center text-white">
                                        <div className="text-center">
                                            <EyeIcon className="w-24 h-24 mx-auto mb-4 opacity-60" />
                                            <p>
                                                Project Image{" "}
                                                {currentImageIndex + 1} of{" "}
                                                {selectedProject.images.length}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Navigation Arrows */}
                                {selectedProject.images.length > 1 && (
                                    <>
                                        <button
                                            onClick={prevImage}
                                            disabled={currentImageIndex === 0}
                                            className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <ChevronLeftIcon className="w-6 h-6" />
                                        </button>
                                        <button
                                            onClick={nextImage}
                                            disabled={
                                                currentImageIndex ===
                                                selectedProject.images.length -
                                                    1
                                            }
                                            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <ChevronRightIcon className="w-6 h-6" />
                                        </button>
                                    </>
                                )}

                                {/* Image Indicators */}
                                {selectedProject.images.length > 1 && (
                                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                                        {selectedProject.images.map(
                                            (_, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() =>
                                                        setCurrentImageIndex(
                                                            index
                                                        )
                                                    }
                                                    className={`w-3 h-3 rounded-full transition-colors ${
                                                        index ===
                                                        currentImageIndex
                                                            ? "bg-white"
                                                            : "bg-white/50"
                                                    }`}
                                                />
                                            )
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Project Details Grid */}
                            <div className="grid md:grid-cols-2 gap-8">
                                {/* Left Column */}
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-4">
                                        Project Overview
                                    </h3>
                                    <p className="text-gray-400 leading-relaxed mb-6">
                                        {selectedProject.description}
                                    </p>

                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wider">
                                                Duration
                                            </h4>
                                            <p className="text-gray-400">
                                                {selectedProject.duration}
                                            </p>
                                        </div>

                                        <div>
                                            <h4 className="text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wider">
                                                Technologies
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedProject.technologies.map(
                                                    (tech, index) => (
                                                        <span
                                                            key={index}
                                                            className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded border border-gray-700"
                                                        >
                                                            {tech}
                                                        </span>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column */}
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-4">
                                        Key Features
                                    </h3>
                                    <ul className="space-y-3 mb-6">
                                        {selectedProject.features.map(
                                            (feature, index) => (
                                                <li
                                                    key={index}
                                                    className="flex items-start gap-3 text-gray-400"
                                                >
                                                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                                                    {feature}
                                                </li>
                                            )
                                        )}
                                    </ul>

                                    {/* Action Buttons */}
                                    <div className="flex gap-4">
                                        {selectedProject.liveUrl && (
                                            <Button
                                                variant="primary"
                                                onClick={() =>
                                                    window.open(
                                                        selectedProject.liveUrl,
                                                        "_blank"
                                                    )
                                                }
                                                className="flex items-center gap-2"
                                            >
                                                <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                                                View Live Project
                                            </Button>
                                        )}
                                        {selectedProject.githubUrl && (
                                            <Button
                                                variant="outline"
                                                onClick={() =>
                                                    window.open(
                                                        selectedProject.githubUrl,
                                                        "_blank"
                                                    )
                                                }
                                                className="flex items-center gap-2"
                                            >
                                                <CodeBracketIcon className="w-4 h-4" />
                                                View Code
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Portfolio;
