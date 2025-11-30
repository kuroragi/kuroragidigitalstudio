import React from "react";
import { HomeHero, useResponsiveHero } from "../components/sections";
import {
    ServiceCard,
    PortfolioCard,
    TestimonialCard,
    ServicesGrid,
    PortfolioGrid,
    TestimonialsGrid,
    ResponsiveCardContainer,
    Button,
} from "../components";
import {
    CodeBracketIcon,
    PaintBrushIcon,
    CloudIcon,
    DevicePhoneMobileIcon,
    ChartBarIcon,
    ShieldCheckIcon,
} from "@heroicons/react/24/outline";

/**
 * Home Page Component
 * Complete landing page with Hero, Services, Portfolio, Testimonials, and CTA sections
 */
function Home() {
    const responsiveConfig = useResponsiveHero();

    // Sample data for sections
    const featuredServices = [
        {
            title: "Web Development",
            description:
                "Custom web applications built with modern frameworks and best practices.",
            icon: CodeBracketIcon,
            features: [
                "Responsive Design",
                "Performance Optimization",
                "SEO Friendly",
                "Security Implementation",
            ],
            price: "$2,500+",
            popular: true,
            available: true,
        },
        {
            title: "UI/UX Design",
            description:
                "Beautiful and intuitive user interfaces that enhance user experience.",
            icon: PaintBrushIcon,
            features: [
                "User Research",
                "Wireframing",
                "Prototyping",
                "Design Systems",
            ],
            price: "$1,200+",
            available: true,
        },
        {
            title: "Mobile Apps",
            description:
                "Native and cross-platform mobile applications for iOS and Android.",
            icon: DevicePhoneMobileIcon,
            features: [
                "React Native",
                "Flutter Development",
                "App Store Deployment",
                "Push Notifications",
            ],
            price: "$3,500+",
            available: true,
        },
    ];

    const featuredProjects = [
        {
            title: "E-Commerce Platform",
            description:
                "Modern online shopping platform with advanced features and seamless user experience.",
            image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
            technologies: ["React", "Laravel", "MySQL", "Stripe"],
            category: "Web Development",
            year: "2024",
            status: "completed",
            featured: true,
            demoUrl: "https://demo.example.com",
        },
        {
            title: "AI Dashboard",
            description:
                "Advanced analytics dashboard with machine learning insights and real-time data visualization.",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
            technologies: ["Next.js", "Python", "TensorFlow", "PostgreSQL"],
            category: "AI/ML",
            year: "2023",
            status: "completed",
        },
        {
            title: "Mobile Banking App",
            description:
                "Secure and intuitive mobile banking application with biometric authentication.",
            image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop",
            technologies: ["React Native", "Node.js", "MongoDB"],
            category: "Mobile Development",
            year: "2024",
            status: "in_progress",
        },
    ];

    const testimonials = [
        {
            quote: "Outstanding work! The team delivered exactly what we needed and exceeded our expectations. The attention to detail and quality is impressive.",
            author: "Sarah Johnson",
            position: "CTO",
            company: "TechCorp",
            rating: 5,
            date: "2024-01-15",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
        },
        {
            quote: "Professional, reliable, and incredibly talented. The project was delivered on time and within budget. Highly recommend!",
            author: "Mike Chen",
            position: "Product Manager",
            company: "StartupXYZ",
            rating: 5,
            date: "2023-12-20",
        },
        {
            quote: "Great communication throughout the project. The final product exceeded our expectations and our users love it.",
            author: "Emily Davis",
            position: "Founder",
            company: "InnovateLab",
            rating: 4,
            date: "2023-11-08",
        },
    ];

    return (
        <div className="scroll-smooth">
            {/* Hero Section */}
            <section id="hero">
                <HomeHero {...responsiveConfig} />
            </section>

            {/* Services Preview Section */}
            <section
                id="services"
                className="py-16 md:py-20 bg-gradient-to-b from-gray-950 to-gray-900"
            >
                <ResponsiveCardContainer>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Our <span className="text-blue-400">Services</span>
                        </h2>
                        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                            We provide comprehensive digital solutions to help
                            your business thrive in the modern world.
                        </p>
                    </div>

                    <ServicesGrid>
                        {featuredServices.map((service, index) => (
                            <ServiceCard
                                key={index}
                                {...service}
                                onSelect={() =>
                                    (window.location.href = "/services")
                                }
                            />
                        ))}
                    </ServicesGrid>

                    <div className="text-center mt-12">
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={() => (window.location.href = "/services")}
                        >
                            View All Services
                        </Button>
                    </div>
                </ResponsiveCardContainer>
            </section>

            {/* Portfolio Preview Section */}
            <section
                id="portfolio"
                className="py-16 md:py-20 bg-gradient-to-b from-gray-900 to-gray-800"
            >
                <ResponsiveCardContainer>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Featured{" "}
                            <span className="text-blue-400">Projects</span>
                        </h2>
                        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                            Discover some of our latest work and successful
                            projects that showcase our expertise.
                        </p>
                    </div>

                    {/* Horizontal scrolling portfolio */}
                    <div className="overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 snap-x snap-mandatory">
                        <div className="flex gap-6 min-w-max px-4 md:px-0">
                            {featuredProjects.map((project, index) => (
                                <div
                                    key={index}
                                    className="w-80 flex-shrink-0 snap-start"
                                >
                                    <PortfolioCard {...project} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="text-center mt-12">
                        <Button
                            variant="primary"
                            size="lg"
                            onClick={() =>
                                (window.location.href = "/portfolio")
                            }
                        >
                            View Full Portfolio
                        </Button>
                    </div>
                </ResponsiveCardContainer>
            </section>

            {/* Testimonials Section */}
            <section
                id="testimonials"
                className="py-16 md:py-20 bg-gradient-to-b from-gray-800 to-gray-900"
            >
                <ResponsiveCardContainer>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            What Clients{" "}
                            <span className="text-blue-400">Say</span>
                        </h2>
                        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                            Don't just take our word for it. Here's what our
                            satisfied clients have to say about our work.
                        </p>
                    </div>

                    <TestimonialsGrid>
                        {testimonials.map((testimonial, index) => (
                            <TestimonialCard key={index} {...testimonial} />
                        ))}
                    </TestimonialsGrid>
                </ResponsiveCardContainer>
            </section>

            {/* Call to Action Section */}
            <section
                id="contact-cta"
                className="py-16 md:py-20 bg-gradient-to-b from-gray-900 to-gray-950"
            >
                <ResponsiveCardContainer>
                    <div className="text-center">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Ready to Start Your{" "}
                            <span className="text-blue-400">Project</span>?
                        </h2>
                        <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12">
                            Let's discuss your ideas and turn them into reality.
                            Get in touch with us today and let's build something
                            amazing together.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                variant="primary"
                                size="xl"
                                onClick={() =>
                                    (window.location.href = "/contact")
                                }
                                className="min-w-48"
                            >
                                Start a Project
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

                        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                            <div>
                                <div className="text-3xl font-bold text-blue-400 mb-2">
                                    50+
                                </div>
                                <div className="text-gray-400">
                                    Projects Completed
                                </div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-blue-400 mb-2">
                                    30+
                                </div>
                                <div className="text-gray-400">
                                    Happy Clients
                                </div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-blue-400 mb-2">
                                    5
                                </div>
                                <div className="text-gray-400">
                                    Years Experience
                                </div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-blue-400 mb-2">
                                    24/7
                                </div>
                                <div className="text-gray-400">Support</div>
                            </div>
                        </div>
                    </div>
                </ResponsiveCardContainer>
            </section>
        </div>
    );
}

export default Home;
