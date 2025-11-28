import { useEffect } from "react";

/**
 * Hook untuk manage page metadata (title, description, etc.)
 * Digunakan untuk SEO dan browser tab title
 */
function usePageMetadata({
    title,
    description,
    keywords,
    ogTitle,
    ogDescription,
}) {
    useEffect(() => {
        // Set page title
        if (title) {
            document.title = `${title} | Kuroragi Digital Studio`;
        } else {
            document.title =
                "Kuroragi Digital Studio | Shaping Ideas Into Digital Mastery";
        }

        // Set meta description
        if (description) {
            const metaDescription = document.querySelector(
                'meta[name="description"]'
            );
            if (metaDescription) {
                metaDescription.setAttribute("content", description);
            } else {
                const meta = document.createElement("meta");
                meta.name = "description";
                meta.content = description;
                document.head.appendChild(meta);
            }
        }

        // Set meta keywords
        if (keywords) {
            const metaKeywords = document.querySelector(
                'meta[name="keywords"]'
            );
            if (metaKeywords) {
                metaKeywords.setAttribute("content", keywords);
            } else {
                const meta = document.createElement("meta");
                meta.name = "keywords";
                meta.content = keywords;
                document.head.appendChild(meta);
            }
        }

        // Set Open Graph meta tags
        if (ogTitle) {
            const ogTitleMeta = document.querySelector(
                'meta[property="og:title"]'
            );
            if (ogTitleMeta) {
                ogTitleMeta.setAttribute("content", ogTitle);
            } else {
                const meta = document.createElement("meta");
                meta.setAttribute("property", "og:title");
                meta.content = ogTitle;
                document.head.appendChild(meta);
            }
        }

        if (ogDescription) {
            const ogDescMeta = document.querySelector(
                'meta[property="og:description"]'
            );
            if (ogDescMeta) {
                ogDescMeta.setAttribute("content", ogDescription);
            } else {
                const meta = document.createElement("meta");
                meta.setAttribute("property", "og:description");
                meta.content = ogDescription;
                document.head.appendChild(meta);
            }
        }

        // Cleanup function to reset title when component unmounts
        return () => {
            document.title =
                "Kuroragi Digital Studio | Shaping Ideas Into Digital Mastery";
        };
    }, [title, description, keywords, ogTitle, ogDescription]);
}

export default usePageMetadata;
