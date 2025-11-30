import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Web Vitals Performance Monitor
 * Tracks Core Web Vitals and custom performance metrics
 */
export function useWebVitals() {
    const [vitals, setVitals] = useState({
        FCP: null,    // First Contentful Paint
        LCP: null,    // Largest Contentful Paint
        FID: null,    // First Input Delay
        CLS: null,    // Cumulative Layout Shift
        TTFB: null,   // Time to First Byte
        INP: null     // Interaction to Next Paint
    });
    
    const [customMetrics, setCustomMetrics] = useState({
        canvasFPS: 60,
        memoryUsage: 0,
        renderTime: 0,
        bundleSize: 0,
        loadTime: 0
    });
    
    useEffect(() => {
        // Web Vitals measurement using Performance Observer
        if ('PerformanceObserver' in window) {
            // Largest Contentful Paint
            const lcpObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                setVitals(prev => ({ ...prev, LCP: lastEntry.startTime }));
            });
            
            try {
                lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
            } catch (e) {
                console.warn('LCP observation not supported');
            }
            
            // First Input Delay
            const fidObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach((entry) => {
                    setVitals(prev => ({ 
                        ...prev, 
                        FID: entry.processingStart - entry.startTime 
                    }));
                });
            });
            
            try {
                fidObserver.observe({ entryTypes: ['first-input'] });
            } catch (e) {
                console.warn('FID observation not supported');
            }
            
            // Cumulative Layout Shift
            let clsValue = 0;
            const clsObserver = new PerformanceObserver((list) => {
                list.getEntries().forEach((entry) => {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                        setVitals(prev => ({ ...prev, CLS: clsValue }));
                    }
                });
            });
            
            try {
                clsObserver.observe({ entryTypes: ['layout-shift'] });
            } catch (e) {
                console.warn('CLS observation not supported');
            }
            
            return () => {
                lcpObserver.disconnect();
                fidObserver.disconnect();
                clsObserver.disconnect();
            };
        }
        
        // Fallback measurements
        const measureFCP = () => {
            const paintEntries = performance.getEntriesByType('paint');
            const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
            if (fcpEntry) {
                setVitals(prev => ({ ...prev, FCP: fcpEntry.startTime }));
            }
        };
        
        const measureTTFB = () => {
            const navEntries = performance.getEntriesByType('navigation');
            if (navEntries.length > 0) {
                const ttfb = navEntries[0].responseStart - navEntries[0].requestStart;
                setVitals(prev => ({ ...prev, TTFB: ttfb }));
            }
        };
        
        measureFCP();
        measureTTFB();
    }, []);
    
    // Custom metrics updaters
    const updateCanvasFPS = useCallback((fps) => {
        setCustomMetrics(prev => ({ ...prev, canvasFPS: fps }));
    }, []);
    
    const updateMemoryUsage = useCallback(() => {
        if ('memory' in performance) {
            const memInfo = performance.memory;
            const usage = memInfo.usedJSHeapSize / memInfo.jsHeapSizeLimit;
            setCustomMetrics(prev => ({ ...prev, memoryUsage: usage }));
        }
    }, []);
    
    const updateRenderTime = useCallback((time) => {
        setCustomMetrics(prev => ({ ...prev, renderTime: time }));
    }, []);
    
    return {
        vitals,
        customMetrics,
        updateCanvasFPS,
        updateMemoryUsage,
        updateRenderTime
    };
}

/**
 * Performance Budget Monitor
 * Tracks resource sizes and loading times against budgets
 */
export function usePerformanceBudget(budgets = {}) {
    const [metrics, setMetrics] = useState({
        js: { size: 0, budget: budgets.js || 250000 }, // 250KB
        css: { size: 0, budget: budgets.css || 50000 }, // 50KB
        images: { size: 0, budget: budgets.images || 500000 }, // 500KB
        fonts: { size: 0, budget: budgets.fonts || 100000 }, // 100KB
        total: { size: 0, budget: budgets.total || 1000000 } // 1MB
    });
    
    const [violations, setViolations] = useState([]);
    
    useEffect(() => {
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                let newMetrics = { ...metrics };
                
                entries.forEach((entry) => {
                    const size = entry.transferSize || entry.decodedBodySize || 0;
                    
                    if (entry.name.includes('.js')) {
                        newMetrics.js.size += size;
                    } else if (entry.name.includes('.css')) {
                        newMetrics.css.size += size;
                    } else if (entry.name.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) {
                        newMetrics.images.size += size;
                    } else if (entry.name.match(/\.(woff|woff2|ttf|otf)$/i)) {
                        newMetrics.fonts.size += size;
                    }
                    
                    newMetrics.total.size += size;
                });
                
                // Check for budget violations
                const newViolations = [];
                Object.entries(newMetrics).forEach(([key, metric]) => {
                    if (metric.size > metric.budget) {
                        newViolations.push({
                            type: key,
                            size: metric.size,
                            budget: metric.budget,
                            overage: metric.size - metric.budget
                        });
                    }
                });
                
                setMetrics(newMetrics);
                setViolations(newViolations);
            });
            
            try {
                observer.observe({ entryTypes: ['resource'] });
            } catch (e) {
                console.warn('Resource observation not supported');
            }
            
            return () => observer.disconnect();
        }
    }, []);
    
    return { metrics, violations };
}

/**
 * Frame Rate Monitor for Animations
 */
export function useFrameRateMonitor() {
    const [fps, setFPS] = useState(60);
    const [frameDrops, setFrameDrops] = useState(0);
    const frameCountRef = useRef(0);
    const lastTimeRef = useRef(performance.now());
    const droppedFramesRef = useRef(0);
    
    const measureFrame = useCallback(() => {
        const now = performance.now();
        frameCountRef.current++;
        
        const delta = now - lastTimeRef.current;
        
        // Calculate FPS every second
        if (delta >= 1000) {
            const currentFPS = frameCountRef.current;
            setFPS(currentFPS);
            
            // Count dropped frames (assuming 60fps target)
            const expectedFrames = 60;
            const dropped = Math.max(0, expectedFrames - currentFPS);
            droppedFramesRef.current += dropped;
            setFrameDrops(droppedFramesRef.current);
            
            frameCountRef.current = 0;
            lastTimeRef.current = now;
        }
    }, []);
    
    return { fps, frameDrops, measureFrame };
}

/**
 * Memory Usage Monitor
 */
export function useMemoryMonitor() {
    const [memoryInfo, setMemoryInfo] = useState({
        used: 0,
        total: 0,
        percentage: 0
    });
    
    useEffect(() => {
        const updateMemoryInfo = () => {
            if ('memory' in performance) {
                const mem = performance.memory;
                setMemoryInfo({
                    used: mem.usedJSHeapSize,
                    total: mem.totalJSHeapSize,
                    percentage: (mem.usedJSHeapSize / mem.jsHeapSizeLimit) * 100
                });
            }
        };
        
        updateMemoryInfo();
        const interval = setInterval(updateMemoryInfo, 5000); // Update every 5 seconds
        
        return () => clearInterval(interval);
    }, []);
    
    return memoryInfo;
}

/**
 * Network Performance Monitor
 */
export function useNetworkMonitor() {
    const [networkInfo, setNetworkInfo] = useState({
        effectiveType: 'unknown',
        downlink: 0,
        rtt: 0,
        saveData: false
    });
    
    useEffect(() => {
        const updateNetworkInfo = () => {
            const connection = navigator.connection || 
                              navigator.mozConnection || 
                              navigator.webkitConnection;
            
            if (connection) {
                setNetworkInfo({
                    effectiveType: connection.effectiveType || 'unknown',
                    downlink: connection.downlink || 0,
                    rtt: connection.rtt || 0,
                    saveData: connection.saveData || false
                });
            }
        };
        
        updateNetworkInfo();
        
        if (navigator.connection) {
            navigator.connection.addEventListener('change', updateNetworkInfo);
            
            return () => {
                navigator.connection.removeEventListener('change', updateNetworkInfo);
            };
        }
    }, []);
    
    return networkInfo;
}

/**
 * Performance Dashboard Component
 */
export function PerformanceDashboard({ isVisible = false }) {
    const { vitals, customMetrics } = useWebVitals();
    const { fps, frameDrops } = useFrameRateMonitor();
    const memoryInfo = useMemoryMonitor();
    const networkInfo = useNetworkMonitor();
    
    if (!isVisible || process.env.NODE_ENV !== 'development') {
        return null;
    }
    
    return (
        <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg text-xs font-mono z-50 max-w-sm">
            <h3 className="font-bold mb-2">Performance Monitor</h3>
            
            <div className="space-y-1">
                <div>FPS: {fps} (Drops: {frameDrops})</div>
                <div>Memory: {(memoryInfo.percentage).toFixed(1)}%</div>
                <div>Network: {networkInfo.effectiveType}</div>
                
                {vitals.LCP && (
                    <div className={`${vitals.LCP > 2500 ? 'text-red-400' : vitals.LCP > 1200 ? 'text-yellow-400' : 'text-green-400'}`}>
                        LCP: {Math.round(vitals.LCP)}ms
                    </div>
                )}
                
                {vitals.FID && (
                    <div className={`${vitals.FID > 300 ? 'text-red-400' : vitals.FID > 100 ? 'text-yellow-400' : 'text-green-400'}`}>
                        FID: {Math.round(vitals.FID)}ms
                    </div>
                )}
                
                {vitals.CLS && (
                    <div className={`${vitals.CLS > 0.25 ? 'text-red-400' : vitals.CLS > 0.1 ? 'text-yellow-400' : 'text-green-400'}`}>
                        CLS: {vitals.CLS.toFixed(3)}
                    </div>
                )}
            </div>
        </div>
    );
}

export default {
    useWebVitals,
    usePerformanceBudget,
    useFrameRateMonitor,
    useMemoryMonitor,
    useNetworkMonitor,
    PerformanceDashboard
};