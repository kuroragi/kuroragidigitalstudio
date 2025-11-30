import React, { useState } from "react";
import { AboutHero, useResponsiveHero } from "../components/sections";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    ResponsiveCardContainer,
    Button,
} from "../components";
import {
    SparklesIcon,
    LightBulbIcon,
    HeartIcon,
    RocketLaunchIcon,
    ShieldCheckIcon,
    CodeBracketIcon,
    PaintBrushIcon,
    CogIcon,
    EyeIcon,
    EyeSlashIcon,
} from "@heroicons/react/24/outline";

/**
 * About Page Component
 * Company story dengan hidden lore, timeline, team, dan values
 */
function About() {
    const [showHiddenLore, setShowHiddenLore] = useState(false);
    const responsiveConfig = useResponsiveHero();

    // Company timeline data
    const timeline = [
        {
            year: "2019",
            title: "The Genesis",
            description:
                "A vision born from late-night coding sessions and endless coffee cups. The dream of creating digital magic begins.",
        },
        {
            year: "2020",
            title: "Studio Founded",
            description:
                "Kuroragi Digital Studio officially launched during the pandemic, proving that great ideas can emerge from challenging times.",
        },
        {
            year: "2021",
            title: "First Major Success",
            description:
                "Completed our first enterprise-level project, establishing our reputation for quality and innovation in the digital space.",
        },
        {
            year: "2022",
            title: "Team Expansion",
            description:
                "Grew from a solo venture to a dedicated team of creative professionals, each bringing unique skills and perspectives.",
        },
        {
            year: "2023",
            title: "Innovation Breakthrough",
            description:
                "Developed our signature meteor canvas animation system, setting new standards for web animation performance.",
        },
        {
            year: "2024",
            title: "Present Day",
            description:
                "Continuing to push boundaries in web development while maintaining our commitment to beautiful, functional design.",
        },
    ];

    // Team members data
    const team = [
        {
            name: "Alex Kuroragi",
            role: "Founder & Lead Developer",
            bio: "Full-stack wizard with a passion for clean code and pixel-perfect designs. Dreams in JavaScript and thinks in React.",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
            specialties: ["React", "Laravel", "UI/UX", "Performance"],
        },
        {
            name: "Sarah Chen",
            role: "Creative Director",
            bio: "Master of visual storytelling who transforms abstract ideas into stunning digital experiences that users love.",
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
            specialties: [
                "Design Systems",
                "Branding",
                "Animation",
                "Strategy",
            ],
        },
        {
            name: "Mike Johnson",
            role: "Backend Architect",
            bio: "Database whisperer and API craftsman who ensures everything runs smoothly behind the scenes.",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
            specialties: ["Laravel", "MySQL", "DevOps", "Security"],
        },
    ];

    // Company values data
    const values = [
        {
            icon: LightBulbIcon,
            title: "Innovation First",
            description:
                "We embrace cutting-edge technologies and creative solutions to deliver exceptional results.",
        },
        {
            icon: HeartIcon,
            title: "Passion Driven",
            description:
                "Every project is crafted with love, attention to detail, and genuine care for our clients' success.",
        },
        {
            icon: ShieldCheckIcon,
            title: "Quality Assured",
            description:
                "We maintain the highest standards in code quality, design, and user experience.",
        },
        {
            icon: RocketLaunchIcon,
            title: "Growth Mindset",
            description:
                "Continuous learning and improvement drive us to evolve with the ever-changing digital landscape.",
        },
    ];

    return (
        <div className="scroll-smooth">
            {/* Hero Section */}
            <section id="about-hero">
                <AboutHero {...responsiveConfig} />
            </section>

            {/* Company Story Section */}
            <section
                id="story"
                className="py-16 md:py-20 bg-gradient-to-b from-gray-950 to-gray-900"
            >
                <ResponsiveCardContainer>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Our <span className="text-blue-400">Story</span>
                        </h2>
                        <div className="max-w-4xl mx-auto">
                            <p className="text-xl text-gray-300 leading-relaxed mb-8">
                                Born from a passion for digital craftsmanship,
                                Kuroragi Digital Studio emerged during the
                                transformative year of 2020. What started as
                                late-night coding sessions fueled by endless
                                coffee and an unwavering vision has evolved into
                                a studio that creates digital magic.
                            </p>
                            <p className="text-lg text-gray-400 leading-relaxed mb-8">
                                We believe that every pixel, every line of code,
                                and every user interaction should tell a story.
                                Our mission is to transform abstract ideas into
                                tangible digital experiences that not only meet
                                business objectives but also create emotional
                                connections with users.
                            </p>

                            {/* Hidden Lore Easter Egg */}
                            <div className="relative">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                        setShowHiddenLore(!showHiddenLore)
                                    }
                                    className="text-gray-500 hover:text-blue-400 transition-colors"
                                >
                                    {showHiddenLore ? (
                                        <>
                                            <EyeSlashIcon className="w-4 h-4 mr-2" />
                                            Hide the Legend
                                        </>
                                    ) : (
                                        <>
                                            <EyeIcon className="w-4 h-4 mr-2" />
                                            Reveal the Hidden Lore
                                        </>
                                    )}
                                </Button>

                                {showHiddenLore && (
                                    <Card className="mt-6 border-blue-500/30 bg-blue-950/20 backdrop-blur-sm animate-fade-in">
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2 text-blue-400">
                                                <SparklesIcon className="w-5 h-5" />
                                                The Legend of Kuroragi
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="text-gray-300">
                                            <p className="mb-4">
                                                Legend speaks of an ancient
                                                digital realm where code flows
                                                like rivers of light, and
                                                creativity takes physical form
                                                as meteors dancing across the
                                                night sky. In this realm, a
                                                mysterious figure known as
                                                "Kuroragi" - the Dark Master -
                                                discovered the secret to binding
                                                digital magic with human
                                                emotion.
                                            </p>
                                            <p className="mb-4">
                                                The meteors you see in our
                                                designs aren't just animations -
                                                they're fragments of this
                                                digital magic, captured and
                                                woven into our creations to
                                                bring them to life. Each project
                                                we craft carries a piece of this
                                                ancient power, transforming
                                                ordinary websites into portals
                                                of wonder.
                                            </p>
                                            <p className="text-blue-400 italic">
                                                "Those who seek mere websites
                                                shall find ordinary pages. Those
                                                who seek digital magic shall
                                                discover gateways to new
                                                worlds." - Ancient Code Prophecy
                                            </p>
                                        </CardContent>
                                    </Card>
                                )}
                            </div>
                        </div>
                    </div>
                </ResponsiveCardContainer>
            </section>

            {/* Timeline Section */}
            <section
                id="timeline"
                className="py-16 md:py-20 bg-gradient-to-b from-gray-900 to-gray-800"
            >
                <ResponsiveCardContainer>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Our <span className="text-blue-400">Journey</span>
                        </h2>
                        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                            From humble beginnings to digital excellence - the
                            milestones that shaped our story.
                        </p>
                    </div>

                    <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-cyan-400 to-blue-500 transform md:-translate-x-0.5"></div>

                        {timeline.map((event, index) => (
                            <div
                                key={index}
                                className={`relative flex items-center mb-8 md:mb-12 ${
                                    index % 2 === 0
                                        ? "md:flex-row"
                                        : "md:flex-row-reverse"
                                }`}
                            >
                                {/* Timeline node */}
                                <div className="absolute left-2 md:left-1/2 w-4 h-4 bg-blue-500 border-4 border-gray-800 rounded-full transform md:-translate-x-2 z-10"></div>

                                {/* Content */}
                                <div
                                    className={`ml-12 md:ml-0 md:w-1/2 ${
                                        index % 2 === 0 ? "md:pr-8" : "md:pl-8"
                                    }`}
                                >
                                    <Card className="hover:scale-105 transition-transform duration-300">
                                        <CardHeader>
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="text-2xl font-bold text-blue-400">
                                                    {event.year}
                                                </span>
                                            </div>
                                            <CardTitle className="text-white">
                                                {event.title}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-gray-400">
                                                {event.description}
                                            </p>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        ))}
                    </div>
                </ResponsiveCardContainer>
            </section>

            {/* Team Section */}
            <section
                id="team"
                className="py-16 md:py-20 bg-gradient-to-b from-gray-800 to-gray-900"
            >
                <ResponsiveCardContainer>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Meet Our <span className="text-blue-400">Team</span>
                        </h2>
                        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                            The creative minds and technical wizards behind the
                            magic.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {team.map((member, index) => (
                            <Card
                                key={index}
                                className="group hover:scale-105 transition-all duration-300 hover:border-blue-400/50"
                            >
                                <CardContent className="text-center p-6">
                                    <div className="relative mb-6">
                                        <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-blue-500/30 group-hover:border-blue-400 transition-colors">
                                            <img
                                                src={member.avatar}
                                                alt={member.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="absolute inset-0 w-24 h-24 mx-auto rounded-full bg-blue-500/20 group-hover:bg-blue-500/30 transition-colors"></div>
                                    </div>

                                    <h3 className="text-xl font-bold text-white mb-2">
                                        {member.name}
                                    </h3>
                                    <p className="text-blue-400 font-medium mb-3">
                                        {member.role}
                                    </p>
                                    <p className="text-gray-400 text-sm leading-relaxed mb-4">
                                        {member.bio}
                                    </p>

                                    <div className="flex flex-wrap justify-center gap-2">
                                        {member.specialties.map(
                                            (specialty, idx) => (
                                                <span
                                                    key={idx}
                                                    className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded border border-gray-700"
                                                >
                                                    {specialty}
                                                </span>
                                            )
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </ResponsiveCardContainer>
            </section>

            {/* Values Section */}
            <section
                id="values"
                className="py-16 md:py-20 bg-gradient-to-b from-gray-900 to-gray-950"
            >
                <ResponsiveCardContainer>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Our <span className="text-blue-400">Values</span>
                        </h2>
                        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                            The principles that guide every decision, every line
                            of code, and every creative choice we make.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <Card
                                key={index}
                                className="text-center group hover:scale-105 transition-all duration-300 hover:border-blue-400/50"
                            >
                                <CardContent className="p-6">
                                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                                        <value.icon className="w-8 h-8 text-blue-400" />
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-3">
                                        {value.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">
                                        {value.description}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </ResponsiveCardContainer>
            </section>

            {/* Stats Section */}
            <section
                id="stats"
                className="py-16 md:py-20 bg-gradient-to-b from-gray-950 to-gray-900"
            >
                <ResponsiveCardContainer>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">
                                50+
                            </div>
                            <div className="text-gray-400">
                                Projects Completed
                            </div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">
                                30+
                            </div>
                            <div className="text-gray-400">Happy Clients</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">
                                5
                            </div>
                            <div className="text-gray-400">
                                Years Experience
                            </div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-bold text-blue-400 mb-2">
                                ∞
                            </div>
                            <div className="text-gray-400">Cups of Coffee</div>
                        </div>
                    </div>
                </ResponsiveCardContainer>
            </section>
        </div>
    );
}

export default About;
