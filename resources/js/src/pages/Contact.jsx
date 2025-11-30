import React, { useState } from "react";
import { ContactHero, useResponsiveHero } from "../components/sections";
import { Card, CardContent } from "../components/ui/Card";
import Button from "../components/ui/Button";
import { ResponsiveCardContainer } from "../components/ui/CardGrid";
import {
    EnvelopeIcon,
    PhoneIcon,
    MapPinIcon,
    ClockIcon,
    PaperAirplaneIcon,
    CheckCircleIcon,
    ExclamationTriangleIcon,
    GlobeAltIcon,
} from "@heroicons/react/24/outline";

/**
 * Contact Page Component
 * Comprehensive contact form dengan validation, backend integration, dan company info
 */
function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        organization: "",
        phone: "",
        service: "",
        subject: "",
        message: "",
        budget: "",
        timeline: "",
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null

    const responsiveConfig = useResponsiveHero();

    // Service options
    const serviceOptions = [
        { value: "web-development", label: "Web Development" },
        { value: "ui-ux-design", label: "UI/UX Design" },
        { value: "mobile-development", label: "Mobile App Development" },
        { value: "cloud-devops", label: "Cloud & DevOps" },
        { value: "digital-branding", label: "Digital Branding" },
        { value: "consulting", label: "Technical Consulting" },
        { value: "other", label: "Other Services" },
    ];

    // Budget ranges
    const budgetOptions = [
        { value: "under-5k", label: "Under $5,000" },
        { value: "5k-15k", label: "$5,000 - $15,000" },
        { value: "15k-30k", label: "$15,000 - $30,000" },
        { value: "30k-50k", label: "$30,000 - $50,000" },
        { value: "over-50k", label: "Over $50,000" },
        { value: "discuss", label: "Let's Discuss" },
    ];

    // Timeline options
    const timelineOptions = [
        { value: "asap", label: "ASAP" },
        { value: "1-month", label: "Within 1 month" },
        { value: "1-3-months", label: "1-3 months" },
        { value: "3-6-months", label: "3-6 months" },
        { value: "6-months-plus", label: "6+ months" },
        { value: "flexible", label: "Flexible timeline" },
    ];

    // Company contact info
    const contactInfo = [
        {
            icon: EnvelopeIcon,
            title: "Email",
            details: [
                "hello@kuroragidigital.studio",
                "support@kuroragidigital.studio",
            ],
            link: "mailto:hello@kuroragidigital.studio",
        },
        {
            icon: PhoneIcon,
            title: "Phone",
            details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
            link: "tel:+15551234567",
        },
        {
            icon: MapPinIcon,
            title: "Office",
            details: ["123 Innovation Street", "Tech District, CA 94102"],
            link: "https://maps.google.com/?q=123+Innovation+Street",
        },
        {
            icon: ClockIcon,
            title: "Business Hours",
            details: [
                "Mon - Fri: 9:00 AM - 6:00 PM",
                "Weekend: By appointment",
            ],
            link: null,
        },
    ];

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: null,
            }));
        }
    };

    // Validate form
    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (!formData.subject.trim()) {
            newErrors.subject = "Subject is required";
        }

        if (!formData.message.trim()) {
            newErrors.message = "Message is required";
        } else if (formData.message.length < 10) {
            newErrors.message = "Message must be at least 10 characters long";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const response = await fetch("/contacts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSubmitStatus("success");
                setFormData({
                    name: "",
                    email: "",
                    organization: "",
                    phone: "",
                    service: "",
                    subject: "",
                    message: "",
                    budget: "",
                    timeline: "",
                });
            } else {
                const errorData = await response.json();
                setSubmitStatus("error");

                // Handle validation errors from backend
                if (errorData.errors) {
                    setErrors(errorData.errors);
                }
            }
        } catch (error) {
            console.error("Contact form submission error:", error);
            setSubmitStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="scroll-smooth">
            {/* Hero Section */}
            <section id="contact-hero">
                <ContactHero {...responsiveConfig} />
            </section>

            {/* Contact Form & Info */}
            <section
                id="contact-form"
                className="py-16 md:py-20 bg-gradient-to-b from-gray-950 to-gray-900"
            >
                <ResponsiveCardContainer>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            Let's Start Your{" "}
                            <span className="text-blue-400">Project</span>
                        </h2>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                            Ready to transform your ideas into reality? Get in
                            touch and let's discuss how we can help you achieve
                            your digital goals.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <Card className="bg-gray-800/50 border-gray-700">
                                <CardContent className="p-8">
                                    <h3 className="text-2xl font-bold text-white mb-6">
                                        Send us a message
                                    </h3>

                                    {/* Success Message */}
                                    {submitStatus === "success" && (
                                        <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center gap-3">
                                            <CheckCircleIcon className="w-5 h-5 text-green-400" />
                                            <p className="text-green-400">
                                                Thank you! Your message has been
                                                sent successfully. We'll get
                                                back to you within 24 hours.
                                            </p>
                                        </div>
                                    )}

                                    {/* Error Message */}
                                    {submitStatus === "error" && (
                                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-3">
                                            <ExclamationTriangleIcon className="w-5 h-5 text-red-400" />
                                            <p className="text-red-400">
                                                Sorry, there was an error
                                                sending your message. Please try
                                                again or contact us directly.
                                            </p>
                                        </div>
                                    )}

                                    <form
                                        onSubmit={handleSubmit}
                                        className="space-y-6"
                                    >
                                        {/* Personal Information */}
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                                    Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    className={`w-full px-4 py-3 bg-gray-700 border rounded-lg focus:outline-none focus:ring-2 transition-colors text-white ${
                                                        errors.name
                                                            ? "border-red-500 focus:ring-red-500/20"
                                                            : "border-gray-600 focus:border-blue-400 focus:ring-blue-500/20"
                                                    }`}
                                                    placeholder="Your full name"
                                                />
                                                {errors.name && (
                                                    <p className="mt-1 text-sm text-red-400">
                                                        {errors.name}
                                                    </p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                                    Email *
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    className={`w-full px-4 py-3 bg-gray-700 border rounded-lg focus:outline-none focus:ring-2 transition-colors text-white ${
                                                        errors.email
                                                            ? "border-red-500 focus:ring-red-500/20"
                                                            : "border-gray-600 focus:border-blue-400 focus:ring-blue-500/20"
                                                    }`}
                                                    placeholder="your@email.com"
                                                />
                                                {errors.email && (
                                                    <p className="mt-1 text-sm text-red-400">
                                                        {errors.email}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                                    Organization
                                                </label>
                                                <input
                                                    type="text"
                                                    name="organization"
                                                    value={
                                                        formData.organization
                                                    }
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-colors text-white"
                                                    placeholder="Company or organization"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                                    Phone
                                                </label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-colors text-white"
                                                    placeholder="Your phone number"
                                                />
                                            </div>
                                        </div>

                                        {/* Project Information */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                Service Interested In
                                            </label>
                                            <select
                                                name="service"
                                                value={formData.service}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-colors text-white"
                                            >
                                                <option value="">
                                                    Select a service...
                                                </option>
                                                {serviceOptions.map(
                                                    (option) => (
                                                        <option
                                                            key={option.value}
                                                            value={option.value}
                                                        >
                                                            {option.label}
                                                        </option>
                                                    )
                                                )}
                                            </select>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                                    Budget Range
                                                </label>
                                                <select
                                                    name="budget"
                                                    value={formData.budget}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-colors text-white"
                                                >
                                                    <option value="">
                                                        Select budget range...
                                                    </option>
                                                    {budgetOptions.map(
                                                        (option) => (
                                                            <option
                                                                key={
                                                                    option.value
                                                                }
                                                                value={
                                                                    option.value
                                                                }
                                                            >
                                                                {option.label}
                                                            </option>
                                                        )
                                                    )}
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                                    Timeline
                                                </label>
                                                <select
                                                    name="timeline"
                                                    value={formData.timeline}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-colors text-white"
                                                >
                                                    <option value="">
                                                        Select timeline...
                                                    </option>
                                                    {timelineOptions.map(
                                                        (option) => (
                                                            <option
                                                                key={
                                                                    option.value
                                                                }
                                                                value={
                                                                    option.value
                                                                }
                                                            >
                                                                {option.label}
                                                            </option>
                                                        )
                                                    )}
                                                </select>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                Subject *
                                            </label>
                                            <input
                                                type="text"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleInputChange}
                                                className={`w-full px-4 py-3 bg-gray-700 border rounded-lg focus:outline-none focus:ring-2 transition-colors text-white ${
                                                    errors.subject
                                                        ? "border-red-500 focus:ring-red-500/20"
                                                        : "border-gray-600 focus:border-blue-400 focus:ring-blue-500/20"
                                                }`}
                                                placeholder="Brief description of your project"
                                            />
                                            {errors.subject && (
                                                <p className="mt-1 text-sm text-red-400">
                                                    {errors.subject}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                Message *
                                            </label>
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleInputChange}
                                                rows={6}
                                                className={`w-full px-4 py-3 bg-gray-700 border rounded-lg focus:outline-none focus:ring-2 transition-colors text-white resize-none ${
                                                    errors.message
                                                        ? "border-red-500 focus:ring-red-500/20"
                                                        : "border-gray-600 focus:border-blue-400 focus:ring-blue-500/20"
                                                }`}
                                                placeholder="Tell us more about your project goals, requirements, and any specific details you'd like us to know..."
                                            />
                                            {errors.message && (
                                                <p className="mt-1 text-sm text-red-400">
                                                    {errors.message}
                                                </p>
                                            )}
                                        </div>

                                        <Button
                                            type="submit"
                                            variant="primary"
                                            disabled={isSubmitting}
                                            className="w-full py-4 text-lg font-semibold"
                                        >
                                            <span className="flex items-center justify-center gap-2">
                                                {isSubmitting ? (
                                                    <>
                                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                                        Sending...
                                                    </>
                                                ) : (
                                                    <>
                                                        Send Message
                                                        <PaperAirplaneIcon className="w-5 h-5" />
                                                    </>
                                                )}
                                            </span>
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Contact Information */}
                        <div className="space-y-8">
                            <Card className="bg-gray-800/50 border-gray-700">
                                <CardContent className="p-6">
                                    <h3 className="text-xl font-bold text-white mb-6">
                                        Contact Information
                                    </h3>

                                    <div className="space-y-6">
                                        {contactInfo.map((info, index) => (
                                            <div
                                                key={index}
                                                className="flex items-start gap-4"
                                            >
                                                <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/30 rounded-lg flex items-center justify-center">
                                                    <info.icon className="w-5 h-5 text-blue-400" />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-semibold text-white mb-1">
                                                        {info.title}
                                                    </h4>
                                                    {info.details.map(
                                                        (detail, idx) => (
                                                            <p
                                                                key={idx}
                                                                className="text-gray-400 text-sm"
                                                            >
                                                                {info.link ? (
                                                                    <a
                                                                        href={
                                                                            info.link
                                                                        }
                                                                        target={
                                                                            info.link.startsWith(
                                                                                "http"
                                                                            )
                                                                                ? "_blank"
                                                                                : undefined
                                                                        }
                                                                        rel={
                                                                            info.link.startsWith(
                                                                                "http"
                                                                            )
                                                                                ? "noopener noreferrer"
                                                                                : undefined
                                                                        }
                                                                        className="hover:text-blue-400 transition-colors"
                                                                    >
                                                                        {detail}
                                                                    </a>
                                                                ) : (
                                                                    detail
                                                                )}
                                                            </p>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Quick Response Promise */}
                            <Card className="bg-blue-500/10 border-blue-500/30">
                                <CardContent className="p-6 text-center">
                                    <ClockIcon className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                                    <h4 className="font-bold text-white mb-2">
                                        Quick Response Guarantee
                                    </h4>
                                    <p className="text-blue-200 text-sm">
                                        We respond to all inquiries within 24
                                        hours during business days.
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Social Links */}
                            <Card className="bg-gray-800/50 border-gray-700">
                                <CardContent className="p-6">
                                    <h4 className="font-bold text-white mb-4">
                                        Follow Us
                                    </h4>
                                    <div className="flex gap-4">
                                        {[
                                            {
                                                name: "Website",
                                                icon: GlobeAltIcon,
                                                url: "https://kuroragidigital.studio",
                                            },
                                            {
                                                name: "Email",
                                                icon: EnvelopeIcon,
                                                url: "mailto:hello@kuroragidigital.studio",
                                            },
                                        ].map((social, index) => (
                                            <a
                                                key={index}
                                                href={social.url}
                                                target={
                                                    social.url.startsWith(
                                                        "http"
                                                    )
                                                        ? "_blank"
                                                        : undefined
                                                }
                                                rel={
                                                    social.url.startsWith(
                                                        "http"
                                                    )
                                                        ? "noopener noreferrer"
                                                        : undefined
                                                }
                                                className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-blue-500 transition-colors group"
                                            >
                                                <social.icon className="w-5 h-5 text-gray-400 group-hover:text-white" />
                                            </a>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </ResponsiveCardContainer>
            </section>
        </div>
    );
}

export default Contact;
