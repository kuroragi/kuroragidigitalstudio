import React from "react";

/**
 * Contact Page Component
 * Will include contact form dengan validation + email notification
 */
function Contact() {
    return (
        <div className="container mx-auto px-6 py-16">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold mb-6">Get In Touch</h1>
                <p className="text-xl text-muted-text max-w-3xl mx-auto">
                    Ready to start your next project? We'd love to hear from
                    you. Let's discuss how we can help bring your ideas to life.
                </p>
            </div>

            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
                {/* Contact Form */}
                <div className="bg-surface p-8 rounded-xl border border-subtle-highlight">
                    <h2 className="text-2xl font-bold mb-6">
                        Send us a message
                    </h2>

                    <form className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Name
                            </label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 bg-primary-bg border border-subtle-highlight rounded-lg focus:border-primary-blue focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                className="w-full px-4 py-3 bg-primary-bg border border-subtle-highlight rounded-lg focus:border-primary-blue focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Organization
                            </label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 bg-primary-bg border border-subtle-highlight rounded-lg focus:border-primary-blue focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Message
                            </label>
                            <textarea
                                rows="4"
                                className="w-full px-4 py-3 bg-primary-bg border border-subtle-highlight rounded-lg focus:border-primary-blue focus:outline-none"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full px-6 py-3 bg-primary-blue text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Send Message
                        </button>
                    </form>
                </div>

                {/* Contact Info */}
                <div className="space-y-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">
                            Contact Information
                        </h3>
                        <div className="space-y-4 text-muted-text">
                            <div>
                                <strong className="text-primary-text">
                                    Email:
                                </strong>
                                <br />
                                hello@kuroragidigital.studio
                            </div>
                            <div>
                                <strong className="text-primary-text">
                                    Phone:
                                </strong>
                                <br />
                                +62 812-3456-7890
                            </div>
                            <div>
                                <strong className="text-primary-text">
                                    Address:
                                </strong>
                                <br />
                                Jl. Digital Innovation No. 123
                                <br />
                                Bandung, West Java 40132
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold mb-4">Office Hours</h3>
                        <div className="text-muted-text">
                            <div>Monday - Friday: 9:00 AM - 6:00 PM</div>
                            <div>Saturday: 9:00 AM - 1:00 PM</div>
                            <div>Sunday: Closed</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
