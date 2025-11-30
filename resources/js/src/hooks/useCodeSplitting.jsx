import { useState, useEffect, useRef, useMemo } from 'react';

/**
 * Dynamic Import Hook for Code Splitting
 * Provides efficient dynamic loading of modules and components
 */
export function useDynamicImport(importFunction, dependencies = []) {
    const [module, setModule] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const mountedRef = useRef(true);
    
    useEffect(() => {
        let isCancelled = false;
        
        const loadModule = async () => {
            if (!mountedRef.current) return;
            
            setLoading(true);
            setError(null);
            
            try {
                const importedModule = await importFunction();
                
                if (!isCancelled && mountedRef.current) {
                    setModule(importedModule);
                }
            } catch (err) {
                if (!isCancelled && mountedRef.current) {
                    setError(err);
                    console.error('Dynamic import failed:', err);
                }
            } finally {
                if (!isCancelled && mountedRef.current) {
                    setLoading(false);
                }
            }
        };
        
        loadModule();
        
        return () => {
            isCancelled = true;
        };
    }, dependencies);
    
    useEffect(() => {
        return () => {
            mountedRef.current = false;
        };
    }, []);
    
    return { module, loading, error };
}

/**
 * Lazy Route Component with Code Splitting
 */
export function createLazyRoute(importFunction, fallback = null) {
    const LazyRoute = (props) => {
        const { module, loading, error } = useDynamicImport(importFunction);
        
        if (loading) {
            return fallback || (
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-blue"></div>
                </div>
            );
        }
        
        if (error) {
            return (
                <div className="flex items-center justify-center min-h-[400px] text-center">
                    <div>
                        <h2 className="text-xl font-semibold text-red-500 mb-2">Failed to Load</h2>
                        <p className="text-gray-600">Unable to load the requested page.</p>
                        <button 
                            onClick={() => window.location.reload()} 
                            className="mt-4 px-4 py-2 bg-primary-blue text-white rounded hover:bg-blue-600"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            );
        }
        
        if (!module) return null;
        
        const Component = module.default || module;
        return <Component {...props} />;
    };
    
    LazyRoute.displayName = 'LazyRoute';
    return LazyRoute;
}

/**
 * Bundle Size Monitor Hook
 * Monitors and reports bundle loading performance
 */
export function useBundleMonitor() {
    const [metrics, setMetrics] = useState({
        loadTime: 0,
        bundleSize: 0,
        chunkCount: 0,
        cacheHits: 0
    });
    
    useEffect(() => {
        // Monitor performance entries for script loading
        const observer = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            
            entries.forEach((entry) => {
                if (entry.entryType === 'navigation') {
                    setMetrics(prev => ({
                        ...prev,
                        loadTime: entry.loadEventEnd - entry.loadEventStart
                    }));
                }
                
                if (entry.entryType === 'resource' && entry.name.includes('.js')) {
                    setMetrics(prev => ({
                        ...prev,
                        bundleSize: prev.bundleSize + (entry.transferSize || 0),
                        chunkCount: prev.chunkCount + 1
                    }));
                }
            });
        });
        
        try {
            observer.observe({ entryTypes: ['navigation', 'resource'] });
        } catch (error) {
            console.warn('Performance Observer not supported:', error);
        }
        
        return () => observer.disconnect();
    }, []);
    
    return metrics;
}

/**
 * Preload Hook for Critical Chunks
 */
export function usePreloadChunks(chunkPaths = []) {
    const preloadedRef = useRef(new Set());
    
    const preloadChunk = useMemo(() => {
        return (chunkPath) => {
            if (preloadedRef.current.has(chunkPath)) return;
            
            const link = document.createElement('link');
            link.rel = 'modulepreload';
            link.href = chunkPath;
            link.crossOrigin = '';
            
            document.head.appendChild(link);
            preloadedRef.current.add(chunkPath);
            
            // Cleanup on error
            link.onerror = () => {
                document.head.removeChild(link);
                preloadedRef.current.delete(chunkPath);
            };
        };
    }, []);
    
    useEffect(() => {
        chunkPaths.forEach(preloadChunk);
    }, [chunkPaths, preloadChunk]);
    
    return preloadChunk;
}

/**
 * Code Splitting Utilities for Different Component Types
 */
export const createLazyComponents = {
    // For heavy animation components
    animation: (importFn) => createLazyRoute(importFn, (
        <div className="w-full h-full bg-gradient-to-br from-primary-bg to-surface opacity-50" />
    )),
    
    // For page components
    page: (importFn) => createLazyRoute(importFn, (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <div className="animate-pulse space-y-4">
                    <div className="h-8 bg-gray-300 rounded w-3/4 mx-auto"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
                    <div className="h-4 bg-gray-300 rounded w-2/3 mx-auto"></div>
                </div>
            </div>
        </div>
    )),
    
    // For modal/dialog components
    modal: (importFn) => createLazyRoute(importFn, (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
                <div className="animate-pulse space-y-4">
                    <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-full"></div>
                    <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                </div>
            </div>
        </div>
    )),
    
    // For form components
    form: (importFn) => createLazyRoute(importFn, (
        <div className="space-y-4">
            <div className="animate-pulse space-y-4">
                <div className="h-10 bg-gray-300 rounded"></div>
                <div className="h-10 bg-gray-300 rounded"></div>
                <div className="h-24 bg-gray-300 rounded"></div>
                <div className="h-10 bg-gray-300 rounded w-32"></div>
            </div>
        </div>
    ))
};

/**
 * Progressive Enhancement Hook
 * Loads enhanced features progressively based on device capabilities
 */
export function useProgressiveEnhancement() {
    const [capabilities, setCapabilities] = useState({
        hasWebGL: false,
        hasIntersectionObserver: false,
        hasRequestIdleCallback: false,
        hasServiceWorker: false,
        connectionSpeed: 'unknown'
    });
    
    useEffect(() => {
        // Detect WebGL support
        const canvas = document.createElement('canvas');
        const hasWebGL = !!(
            canvas.getContext('webgl') || 
            canvas.getContext('experimental-webgl')
        );
        
        // Detect connection speed
        const connection = navigator.connection || 
                          navigator.mozConnection || 
                          navigator.webkitConnection;
        
        const connectionSpeed = connection ? 
            (connection.effectiveType || connection.type || 'unknown') : 'unknown';
        
        setCapabilities({
            hasWebGL,
            hasIntersectionObserver: 'IntersectionObserver' in window,
            hasRequestIdleCallback: 'requestIdleCallback' in window,
            hasServiceWorker: 'serviceWorker' in navigator,
            connectionSpeed
        });
    }, []);
    
    return capabilities;
}

/**
 * Resource Hints Hook for Performance Optimization
 */
export function useResourceHints() {
    const addResourceHint = useMemo(() => {
        return (href, rel = 'prefetch', as = null) => {
            const existing = document.querySelector(`link[href="${href}"]`);
            if (existing) return;
            
            const link = document.createElement('link');
            link.rel = rel;
            link.href = href;
            if (as) link.as = as;
            link.crossOrigin = '';
            
            document.head.appendChild(link);
        };
    }, []);
    
    const prefetchResource = (href, as) => addResourceHint(href, 'prefetch', as);
    const preloadResource = (href, as) => addResourceHint(href, 'preload', as);
    const preconnectResource = (href) => addResourceHint(href, 'preconnect');
    
    return {
        prefetchResource,
        preloadResource,
        preconnectResource
    };
}

export default {
    useDynamicImport,
    createLazyRoute,
    useBundleMonitor,
    usePreloadChunks,
    createLazyComponents,
    useProgressiveEnhancement,
    useResourceHints
};