import React from "react";

// Performance monitoring component
const MeteorPerformanceMonitor = ({
    show = false,
    performanceLevel,
    averageFPS,
}) => {
    if (!show) return null;

    return (
        <div className="fixed top-4 right-4 bg-black/80 text-white p-2 rounded text-xs font-mono z-50">
            <div>Performance: {performanceLevel}</div>
            <div>FPS: {averageFPS?.toFixed(1) || 0}</div>
        </div>
    );
};

export default MeteorPerformanceMonitor;
