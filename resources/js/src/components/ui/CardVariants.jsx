import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
    CardImage,
    CardIcon,
} from "./Card";
import { cn } from "@/utils/cn";
import {
    ArrowTopRightOnSquareIcon,
    CodeBracketIcon,
    EyeIcon,
    StarIcon,
    CalendarIcon,
    UserIcon,
} from "@heroicons/react/24/outline";

// Portfolio Card - untuk showcase projects
export const PortfolioCard = ({
    title,
    description,
    image,
    technologies = [],
    category,
    year,
    demoUrl,
    codeUrl,
    status = "completed",
    featured = false,
    className = "",
    ...props
}) => {
    const statusColors = {
        completed: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
        in_progress: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
        concept: "text-blue-400 bg-blue-400/10 border-blue-400/20",
    };

    return (
        <Card
            variant="glass"
            hover={true}
            glowOnHover={featured}
            className={cn(
                "group overflow-hidden",
                featured && "border-blue-400/30",
                className
            )}
            {...props}
        >
            {/* Featured Badge */}
            {featured && (
                <div className="absolute top-4 right-4 z-10">
                    <div className="flex items-center gap-1 px-2 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full text-xs text-blue-400">
                        <StarIcon className="w-3 h-3" />
                        Featured
                    </div>
                </div>
            )}

            {/* Project Image */}
            {image && (
                <CardImage
                    src={image}
                    alt={title}
                    aspectRatio="aspect-video"
                    overlay={true}
                    overlayContent={
                        <div className="flex gap-2">
                            {demoUrl && (
                                <a
                                    href={demoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1 px-2 py-1 bg-blue-500/80 hover:bg-blue-500 text-white text-xs rounded-md transition-colors"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <EyeIcon className="w-3 h-3" />
                                    Demo
                                </a>
                            )}
                            {codeUrl && (
                                <a
                                    href={codeUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1 px-2 py-1 bg-gray-700/80 hover:bg-gray-700 text-white text-xs rounded-md transition-colors"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <CodeBracketIcon className="w-3 h-3" />
                                    Code
                                </a>
                            )}
                        </div>
                    }
                />
            )}

            <CardHeader>
                {/* Project Category & Status */}
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-blue-400 font-medium uppercase tracking-wider">
                        {category}
                    </span>
                    <div
                        className={cn(
                            "px-2 py-1 text-xs rounded-full border",
                            statusColors[status]
                        )}
                    >
                        {status.replace("_", " ")}
                    </div>
                </div>

                <CardTitle className="group-hover:text-white transition-colors">
                    {title}
                </CardTitle>

                <CardDescription>{description}</CardDescription>
            </CardHeader>

            <CardContent>
                {/* Technologies Used */}
                {technologies.length > 0 && (
                    <div className="space-y-2">
                        <h4 className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
                            Technologies
                        </h4>
                        <div className="flex flex-wrap gap-1">
                            {technologies.map((tech, index) => (
                                <span
                                    key={index}
                                    className="px-2 py-1 bg-gray-800/50 text-gray-300 text-xs rounded border border-gray-700/50"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </CardContent>

            <CardFooter>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                    <CalendarIcon className="w-4 h-4" />
                    {year}
                </div>

                <div className="flex items-center gap-2">
                    {demoUrl && (
                        <a
                            href={demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-gray-400 hover:text-blue-400 transition-colors"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                        </a>
                    )}
                    {codeUrl && (
                        <a
                            href={codeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-gray-400 hover:text-blue-400 transition-colors"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <CodeBracketIcon className="w-4 h-4" />
                        </a>
                    )}
                </div>
            </CardFooter>
        </Card>
    );
};

// Service Card - untuk showcase services
export const ServiceCard = ({
    title,
    description,
    icon: Icon,
    features = [],
    price,
    priceUnit = "project",
    popular = false,
    available = true,
    className = "",
    onSelect,
    ...props
}) => {
    return (
        <Card
            variant={popular ? "elevated" : "default"}
            hover={true}
            glowOnHover={popular}
            interactive={available}
            onClick={available ? onSelect : undefined}
            className={cn(
                "group relative",
                popular && "border-blue-400/50 shadow-blue-500/20",
                !available && "opacity-60",
                className
            )}
            {...props}
        >
            {/* Popular Badge */}
            {popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full">
                        Most Popular
                    </div>
                </div>
            )}

            <CardHeader>
                {/* Service Icon */}
                {Icon && (
                    <CardIcon icon={Icon} variant="primary" size="large" />
                )}

                <CardTitle
                    className={cn(
                        "group-hover:text-white transition-colors",
                        popular && "text-blue-400"
                    )}
                >
                    {title}
                </CardTitle>

                <CardDescription>{description}</CardDescription>

                {/* Price */}
                {price && (
                    <div className="pt-2">
                        <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-bold text-gray-100">
                                {price}
                            </span>
                            <span className="text-sm text-gray-400">
                                /{priceUnit}
                            </span>
                        </div>
                    </div>
                )}
            </CardHeader>

            <CardContent>
                {/* Service Features */}
                {features.length > 0 && (
                    <ul className="space-y-2">
                        {features.map((feature, index) => (
                            <li
                                key={index}
                                className="flex items-start gap-2 text-sm text-gray-300"
                            >
                                <div className="w-1 h-1 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                                {feature}
                            </li>
                        ))}
                    </ul>
                )}
            </CardContent>

            <CardFooter>
                <div className="w-full">
                    {available ? (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onSelect?.();
                            }}
                            className={cn(
                                "w-full py-2 px-4 rounded-lg font-medium transition-all duration-200",
                                popular
                                    ? "bg-blue-500 hover:bg-blue-600 text-white"
                                    : "bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-gray-500 text-gray-100"
                            )}
                        >
                            Get Started
                        </button>
                    ) : (
                        <div className="w-full py-2 px-4 rounded-lg bg-gray-800/50 border border-gray-700/50 text-gray-500 text-center">
                            Coming Soon
                        </div>
                    )}
                </div>
            </CardFooter>
        </Card>
    );
};

// Testimonial Card - untuk client testimonials
export const TestimonialCard = ({
    quote,
    author,
    position,
    company,
    avatar,
    rating = 5,
    date,
    className = "",
    ...props
}) => {
    return (
        <Card
            variant="glass"
            hover={true}
            className={cn("group", className)}
            {...props}
        >
            <CardContent>
                {/* Quote */}
                <blockquote className="text-gray-200 italic leading-relaxed mb-4">
                    "{quote}"
                </blockquote>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, index) => (
                        <StarIcon
                            key={index}
                            className={cn(
                                "w-4 h-4",
                                index < rating
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-600"
                            )}
                        />
                    ))}
                </div>
            </CardContent>

            <CardFooter>
                <div className="flex items-center gap-3 w-full">
                    {/* Avatar */}
                    {avatar ? (
                        <img
                            src={avatar}
                            alt={author}
                            className="w-10 h-10 rounded-full object-cover border-2 border-gray-700"
                        />
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center border-2 border-gray-600">
                            <UserIcon className="w-5 h-5 text-gray-400" />
                        </div>
                    )}

                    {/* Author Info */}
                    <div className="flex-1">
                        <div className="font-semibold text-gray-100">
                            {author}
                        </div>
                        <div className="text-sm text-gray-400">
                            {position} {company && `at ${company}`}
                        </div>
                    </div>

                    {/* Date */}
                    {date && (
                        <div className="text-xs text-gray-500">{date}</div>
                    )}
                </div>
            </CardFooter>
        </Card>
    );
};

export default { PortfolioCard, ServiceCard, TestimonialCard };
