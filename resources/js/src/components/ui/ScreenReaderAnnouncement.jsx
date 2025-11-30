import React from "react";
import { useScreenReaderAnnouncement } from "../../hooks/useAccessibility";

const ScreenReaderAnnouncement = () => {
    const { announcement } = useScreenReaderAnnouncement();

    return (
        <div aria-live="polite" aria-atomic="true" className="sr-only">
            {announcement}
        </div>
    );
};

// Global instance for making announcements
let globalAnnounce = null;

export const setGlobalAnnounce = (announceFunction) => {
    globalAnnounce = announceFunction;
};

export const announce = (message, priority = "polite") => {
    if (globalAnnounce) {
        globalAnnounce(message, priority);
    }
};

export default ScreenReaderAnnouncement;
