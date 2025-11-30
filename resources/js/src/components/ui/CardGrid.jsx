import { cn } from "@/utils/cn";

// CardGrid component dengan responsive columns dan layout options
export const CardGrid = ({
    children,
    columns = { sm: 1, md: 2, lg: 3 },
    gap = "medium",
    layout = "grid", // 'grid', 'masonry', 'flex'
    className = "",
    ...props
}) => {
    const gaps = {
        small: "gap-4",
        medium: "gap-6",
        large: "gap-8",
        xl: "gap-12",
    };

    const getGridCols = () => {
        if (typeof columns === "number") {
            return {
                [`grid-cols-${columns}`]: true,
            };
        }

        return {
            [`grid-cols-${columns.sm || 1}`]: true,
            [`md:grid-cols-${columns.md || 2}`]: columns.md,
            [`lg:grid-cols-${columns.lg || 3}`]: columns.lg,
            [`xl:grid-cols-${columns.xl || columns.lg || 3}`]:
                columns.xl || columns.lg,
        };
    };

    if (layout === "flex") {
        return (
            <div
                className={cn("flex flex-wrap", gaps[gap], className)}
                {...props}
            >
                {children}
            </div>
        );
    }

    if (layout === "masonry") {
        // Note: For true masonry, you might want to use a library like react-masonry-css
        // This is a CSS-only approximation
        return (
            <div
                className={cn(
                    "columns-1 md:columns-2 lg:columns-3",
                    gaps[gap],
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }

    // Default grid layout
    return (
        <div
            className={cn("grid", getGridCols(), gaps[gap], className)}
            {...props}
        >
            {children}
        </div>
    );
};

// PortfolioGrid - specialized grid for portfolio items
export const PortfolioGrid = ({
    children,
    featured = [], // Array of featured item indices
    className = "",
    ...props
}) => {
    return (
        <CardGrid
            columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
            gap="large"
            className={cn("portfolio-grid", className)}
            {...props}
        >
            {children}
        </CardGrid>
    );
};

// ServicesGrid - specialized grid for service cards
export const ServicesGrid = ({
    children,
    compact = false,
    className = "",
    ...props
}) => {
    return (
        <CardGrid
            columns={
                compact ? { sm: 1, md: 2, lg: 4 } : { sm: 1, md: 2, lg: 3 }
            }
            gap={compact ? "medium" : "large"}
            className={cn("services-grid", className)}
            {...props}
        >
            {children}
        </CardGrid>
    );
};

// TestimonialsGrid - specialized grid for testimonials
export const TestimonialsGrid = ({
    children,
    slider = false,
    className = "",
    ...props
}) => {
    if (slider) {
        return (
            <div
                className={cn(
                    "flex gap-6 overflow-x-auto pb-4",
                    "snap-x snap-mandatory",
                    "scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800",
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }

    return (
        <CardGrid
            columns={{ sm: 1, md: 2, lg: 3 }}
            gap="medium"
            className={cn("testimonials-grid", className)}
            {...props}
        >
            {children}
        </CardGrid>
    );
};

// ResponsiveCardContainer - wrapper with max width and centering
export const ResponsiveCardContainer = ({
    children,
    maxWidth = "7xl",
    padding = true,
    className = "",
    ...props
}) => {
    const maxWidths = {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
        "2xl": "max-w-2xl",
        "3xl": "max-w-3xl",
        "4xl": "max-w-4xl",
        "5xl": "max-w-5xl",
        "6xl": "max-w-6xl",
        "7xl": "max-w-7xl",
        full: "max-w-full",
    };

    return (
        <div
            className={cn(
                "w-full mx-auto",
                maxWidths[maxWidth],
                padding && "px-4 sm:px-6 lg:px-8",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};

// Advanced Grid Layout for mixed content
export const MixedCardLayout = ({
    featured = [],
    regular = [],
    className = "",
    ...props
}) => {
    return (
        <div className={cn("space-y-8", className)} {...props}>
            {/* Featured items - larger cards */}
            {featured.length > 0 && (
                <CardGrid
                    columns={{ sm: 1, lg: 2 }}
                    gap="large"
                    className="featured-grid"
                >
                    {featured}
                </CardGrid>
            )}

            {/* Regular items - standard grid */}
            {regular.length > 0 && (
                <CardGrid
                    columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
                    gap="medium"
                    className="regular-grid"
                >
                    {regular}
                </CardGrid>
            )}
        </div>
    );
};

export default CardGrid;
