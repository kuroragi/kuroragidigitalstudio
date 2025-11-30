import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function untuk merge class names dengan Tailwind CSS
 * Menggunakan clsx untuk conditional classes dan twMerge untuk merge conflicts
 */
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export default cn;
