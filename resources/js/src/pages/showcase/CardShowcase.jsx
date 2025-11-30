import React from "react";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
    CardImage,
    CardIcon,
    PortfolioCard,
    ServiceCard,
    TestimonialCard,
    CardGrid,
    PortfolioGrid,
    ServicesGrid,
    TestimonialsGrid,
    ResponsiveCardContainer,
    MixedCardLayout,
} from "@/components";

import {
    CodeBracketIcon,
    PaintBrushIcon,
    CloudIcon,
    DevicePhoneMobileIcon,
    ChartBarIcon,
    ShieldCheckIcon,
    CogIcon,
    RocketLaunchIcon,
} from "@heroicons/react/24/outline";

const CardShowcase = () => {
    // Sample data
    const portfolioItems = [
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
            codeUrl: "https://github.com/example",
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
    ];

    const services = [
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
            title: "Cloud Solutions",
            description:
                "Scalable cloud infrastructure and deployment solutions.",
            icon: CloudIcon,
            features: [
                "AWS/Azure/GCP",
                "Docker & Kubernetes",
                "CI/CD Pipelines",
                "Monitoring & Analytics",
            ],
            price: "$800+",
            available: false,
        },
    ];

    const testimonials = [
        {
            quote: "Outstanding work! The team delivered exactly what we needed and exceeded our expectations.",
            author: "John Doe",
            position: "CTO",
            company: "Tech Corp",
            rating: 5,
            date: "2024-01-15",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        },
        {
            quote: "Professional, reliable, and incredibly talented. Highly recommend for any development project.",
            author: "Sarah Johnson",
            position: "Product Manager",
            company: "StartupXYZ",
            rating: 5,
            date: "2023-12-20",
        },
        {
            quote: "The attention to detail and quality of work is impressive. Great communication throughout the project.",
            author: "Mike Chen",
            position: "Founder",
            company: "InnovateLab",
            rating: 4,
            date: "2023-11-08",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-950 text-white py-12">
            <ResponsiveCardContainer>
                <div className="space-y-16">
                    {/* Header */}
                    <div className="text-center space-y-4">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            Card Components Showcase
                        </h1>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Comprehensive collection of card components with
                            hover effects, responsive design, and beautiful
                            animations.
                        </p>
                    </div>

                    {/* Basic Cards */}
                    <section className="space-y-6">
                        <h2 className="text-2xl font-bold text-gray-100">
                            Basic Card Components
                        </h2>
                        <CardGrid
                            columns={{ sm: 1, md: 2, lg: 4 }}
                            gap="medium"
                        >
                            {/* Default Card */}
                            <Card variant="default" hover={true}>
                                <CardHeader>
                                    <CardTitle>Default Card</CardTitle>
                                    <CardDescription>
                                        Basic card with hover effects and clean
                                        styling.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-gray-300">
                                        This is a default card variant with
                                        subtle background and border styling.
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Glass Card */}
                            <Card
                                variant="glass"
                                hover={true}
                                glowOnHover={true}
                            >
                                <CardIcon
                                    icon={ShieldCheckIcon}
                                    variant="primary"
                                />
                                <CardHeader>
                                    <CardTitle>Glass Card</CardTitle>
                                    <CardDescription>
                                        Glass-morphism effect with blur and
                                        glow.
                                    </CardDescription>
                                </CardHeader>
                            </Card>

                            {/* Elevated Card */}
                            <Card variant="elevated" hover={true}>
                                <CardIcon
                                    icon={RocketLaunchIcon}
                                    variant="success"
                                />
                                <CardHeader>
                                    <CardTitle>Elevated Card</CardTitle>
                                    <CardDescription>
                                        Enhanced background for important
                                        content.
                                    </CardDescription>
                                </CardHeader>
                                <CardFooter>
                                    <button className="text-blue-400 text-sm hover:underline">
                                        Learn More
                                    </button>
                                </CardFooter>
                            </Card>

                            {/* Interactive Card */}
                            <Card
                                variant="solid"
                                hover={true}
                                interactive={true}
                                glowOnHover={true}
                            >
                                <CardIcon icon={CogIcon} variant="warning" />
                                <CardHeader>
                                    <CardTitle>Interactive Card</CardTitle>
                                    <CardDescription>
                                        Clickable card with active states.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-xs text-gray-400">
                                        Click me to see active state
                                    </div>
                                </CardContent>
                            </Card>
                        </CardGrid>
                    </section>

                    {/* Portfolio Cards */}
                    <section className="space-y-6">
                        <h2 className="text-2xl font-bold text-gray-100">
                            Portfolio Showcase
                        </h2>
                        <PortfolioGrid>
                            {portfolioItems.map((item, index) => (
                                <PortfolioCard key={index} {...item} />
                            ))}
                        </PortfolioGrid>
                    </section>

                    {/* Service Cards */}
                    <section className="space-y-6">
                        <h2 className="text-2xl font-bold text-gray-100">
                            Service Packages
                        </h2>
                        <ServicesGrid>
                            {services.map((service, index) => (
                                <ServiceCard
                                    key={index}
                                    {...service}
                                    onSelect={() =>
                                        alert(`Selected: ${service.title}`)
                                    }
                                />
                            ))}
                        </ServicesGrid>
                    </section>

                    {/* Testimonial Cards */}
                    <section className="space-y-6">
                        <h2 className="text-2xl font-bold text-gray-100">
                            Client Testimonials
                        </h2>
                        <TestimonialsGrid>
                            {testimonials.map((testimonial, index) => (
                                <TestimonialCard key={index} {...testimonial} />
                            ))}
                        </TestimonialsGrid>
                    </section>

                    {/* Mixed Layout Example */}
                    <section className="space-y-6">
                        <h2 className="text-2xl font-bold text-gray-100">
                            Mixed Card Layout
                        </h2>
                        <MixedCardLayout
                            featured={[
                                <PortfolioCard
                                    key="featured-1"
                                    {...portfolioItems[0]}
                                />,
                                <ServiceCard
                                    key="featured-2"
                                    {...services[0]}
                                />,
                            ]}
                            regular={[
                                <TestimonialCard
                                    key="regular-1"
                                    {...testimonials[0]}
                                />,
                                <TestimonialCard
                                    key="regular-2"
                                    {...testimonials[1]}
                                />,
                                <Card
                                    key="regular-3"
                                    variant="glass"
                                    hover={true}
                                >
                                    <CardIcon
                                        icon={ChartBarIcon}
                                        variant="primary"
                                    />
                                    <CardHeader>
                                        <CardTitle>Analytics</CardTitle>
                                        <CardDescription>
                                            Track your progress
                                        </CardDescription>
                                    </CardHeader>
                                </Card>,
                                <Card
                                    key="regular-4"
                                    variant="default"
                                    hover={true}
                                >
                                    <CardIcon
                                        icon={DevicePhoneMobileIcon}
                                        variant="secondary"
                                    />
                                    <CardHeader>
                                        <CardTitle>Mobile App</CardTitle>
                                        <CardDescription>
                                            Native performance
                                        </CardDescription>
                                    </CardHeader>
                                </Card>,
                            ]}
                        />
                    </section>
                </div>
            </ResponsiveCardContainer>
        </div>
    );
};

export default CardShowcase;
