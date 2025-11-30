import React, { useState } from "react";
import { ServicesHero, useResponsiveHero } from "../components/sections";
import { Card, CardContent } from "../components/ui/Card";
import Button from "../components/ui/Button";
import { ResponsiveCardContainer } from "../components/ui/CardGrid";
import {
    CodeBracketIcon,
    PaintBrushIcon,
    DevicePhoneMobileIcon,
    CloudIcon,
    ChartBarIcon,
    RocketLaunchIcon,
    CheckIcon,
    ArrowRightIcon,
} from "@heroicons/react/24/outline";

/**
 * Services Page Component
 * Comprehensive services showcase dengan categories, detailed info, dan CTAs
 */
function Services() {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const responsiveConfig = useResponsiveHero();

    // Service categories
    const categories = [
        { id: "all", label: "All Services" },
        { id: "development", label: "Development" },
        { id: "design", label: "Design" },
        { id: "mobile", label: "Mobile" },
        { id: "cloud", label: "Cloud & DevOps" },
    ];

    // Detailed services data
    const services = [
        {
            id: "web-development",
            title: "Web Development",
            description:
                "Custom web applications built with modern frameworks and best practices for scalable, performance-optimized solutions.",
            icon: CodeBracketIcon,
            category: "development",
            price: "Starting from $2,500",
            timeline: "4-8 weeks",
            features: [
                "Responsive Design",
                "Performance Optimization",
                "SEO Implementation",
                "Security Best Practices",
            ],
            technologies: ["React", "Laravel", "Node.js", "MySQL"],
            popular: true,
            available: true,
        },
        {
            id: "ui-ux-design",
            title: "UI/UX Design",
            description:
                "User-centered design solutions that combine beautiful aesthetics with intuitive functionality for exceptional user experiences.",
            icon: PaintBrushIcon,
            category: "design",
            price: "Starting from $1,200",
            timeline: "2-4 weeks",
            features: [
                "User Research & Analysis",
                "Wireframing & Prototyping",
                "Visual Design Systems",
                "Interaction Design",
            ],
            technologies: ["Figma", "Adobe Creative Suite", "Principle"],
            available: true,
        },
        {
            id: "mobile-development",
            title: "Mobile App Development",
            description:
                "Native and cross-platform mobile applications for iOS and Android with seamless performance and user experience.",
            icon: DevicePhoneMobileIcon,
            category: "mobile",
            price: "Starting from $3,500",
            timeline: "6-12 weeks",
            features: [
                "Cross-platform Development",
                "Native Performance",
                "Push Notifications",
                "App Store Deployment",
            ],
            technologies: ["React Native", "Flutter", "iOS", "Android"],
            available: true,
        },
        {
            id: "cloud-devops",
            title: "Cloud & DevOps",
            description:
                "Scalable cloud infrastructure and automated deployment pipelines for reliable, secure, and cost-effective operations.",
            icon: CloudIcon,
            category: "cloud",
            price: "Starting from $800/month",
            timeline: "2-6 weeks",
            features: [
                "Cloud Architecture",
                "CI/CD Pipelines",
                "Container Orchestration",
                "Monitoring & Logging",
            ],
            technologies: ["AWS", "Docker", "Kubernetes", "Jenkins"],
            available: true,
        },
    ];

    // Filter services by category
    const filteredServices =
        selectedCategory === "all"
            ? services
            : services.filter(
                  (service) => service.category === selectedCategory
              );

    return (
        <div className="scroll-smooth">
            {/* Hero Section */}
            <section id="services-hero">
                <ServicesHero {...responsiveConfig} />
            </section>

            {/* Category Filter */}
            <section
                id="service-categories"
                className="py-16 md:py-20 bg-gradient-to-b from-gray-950 to-gray-900"
            >
                <ResponsiveCardContainer>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            Choose Your{" "}
                            <span className="text-blue-400">Service</span>
                        </h2>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
                            From concept to deployment, we provide end-to-end
                            digital solutions tailored to your business needs.
                        </p>

                        {/* Category Filter Buttons */}
                        <div className="flex flex-wrap justify-center gap-3 mb-8">
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() =>
                                        setSelectedCategory(category.id)
                                    }
                                    className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                                        selectedCategory === category.id
                                            ? "bg-blue-500 text-white shadow-blue-500/25 shadow-lg"
                                            : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
                                    }`}
                                >
                                    {category.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Services Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredServices.map((service, index) => (
                            <Card
                                key={service.id}
                                className={`group hover:scale-105 transition-all duration-500 hover:border-blue-400/50 ${
                                    service.popular
                                        ? "border-blue-400/30 shadow-blue-500/10"
                                        : ""
                                }`}
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {service.popular && (
                                    <div className="absolute -top-3 left-6 z-10">
                                        <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                                            Most Popular
                                        </span>
                                    </div>
                                )}

                                <CardContent className="p-6">
                                    {/* Service Icon & Title */}
                                    <div className="flex items-start gap-4 mb-4">
                                        <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/30 rounded-lg flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                                            <service.icon className="w-6 h-6 text-blue-400" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                                                {service.title}
                                            </h3>
                                            <div className="flex items-center gap-4 text-sm text-gray-400">
                                                <span>{service.price}</span>
                                                <span>•</span>
                                                <span>{service.timeline}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                        {service.description}
                                    </p>

                                    {/* Key Features */}
                                    <div className="mb-6">
                                        <h4 className="text-sm font-semibold text-gray-300 mb-3 uppercase tracking-wider">
                                            Key Features
                                        </h4>
                                        <ul className="space-y-2">
                                            {service.features.map(
                                                (feature, idx) => (
                                                    <li
                                                        key={idx}
                                                        className="flex items-center gap-2 text-sm text-gray-400"
                                                    >
                                                        <CheckIcon className="w-4 h-4 text-blue-400 flex-shrink-0" />
                                                        {feature}
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>

                                    {/* Technologies */}
                                    <div className="mb-6">
                                        <div className="flex flex-wrap gap-1">
                                            {service.technologies
                                                .slice(0, 3)
                                                .map((tech, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded border border-gray-700"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            {service.technologies.length >
                                                3 && (
                                                <span className="px-2 py-1 bg-gray-800 text-gray-400 text-xs rounded border border-gray-700">
                                                    +
                                                    {service.technologies
                                                        .length - 3}{" "}
                                                    more
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* CTA Button */}
                                    <Button
                                        variant={
                                            service.available
                                                ? "primary"
                                                : "outline"
                                        }
                                        size="sm"
                                        disabled={!service.available}
                                        onClick={() =>
                                            (window.location.href = `/contact?service=${service.id}`)
                                        }
                                        className={`w-full group/btn ${
                                            service.available
                                                ? "hover:shadow-blue-500/25 hover:shadow-lg"
                                                : ""
                                        }`}
                                    >
                                        <span className="flex items-center justify-center gap-2">
                                            {service.available
                                                ? "Get Started"
                                                : "Coming Soon"}
                                            {service.available && (
                                                <ArrowRightIcon className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                                            )}
                                        </span>
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </ResponsiveCardContainer>
            </section>

            {/* Call to Action */}
            <section
                id="services-cta"
                className="py-16 md:py-20 bg-gradient-to-b from-gray-800 to-gray-950"
            >
                <ResponsiveCardContainer>
                    <div className="text-center">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Ready to Start Your{" "}
                            <span className="text-blue-400">Project</span>?
                        </h2>
                        <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12">
                            Let's discuss your ideas and requirements. Get a
                            free consultation and project estimate tailored to
                            your needs.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <Button
                                variant="primary"
                                size="xl"
                                onClick={() =>
                                    (window.location.href = "/contact")
                                }
                                className="min-w-48 group"
                            >
                                <span className="flex items-center gap-2">
                                    Get Free Consultation
                                    <ArrowRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                </span>
                            </Button>
                            <Button
                                variant="outline"
                                size="xl"
                                onClick={() =>
                                    (window.location.href = "/portfolio")
                                }
                                className="min-w-48"
                            >
                                View Our Work
                            </Button>
                        </div>

                        <div className="mt-12 text-gray-400 text-sm">
                            <p>
                                Free consultation • No obligation • Response
                                within 24 hours
                            </p>
                        </div>
                    </div>
                </ResponsiveCardContainer>
            </section>
        </div>
    );
}

export default Services;
