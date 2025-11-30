import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Intersection Observer Hook for Lazy Loading
 * Provides efficient lazy loading with intersection observer API
 */
export function useLazyLoading(options = {}) {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const [hasLoaded, setHasLoaded] = useState(false);
    const elementRef = useRef(null);
    
    const {
        threshold = 0.1,
        rootMargin = '50px',
        triggerOnce = true,
        fallbackDelay = 100
    } = options;
    
    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;
        
        // Fallback for browsers without IntersectionObserver
        if (!window.IntersectionObserver) {
            const fallbackTimer = setTimeout(() => {
                setIsIntersecting(true);
                if (triggerOnce) setHasLoaded(true);
            }, fallbackDelay);
            
            return () => clearTimeout(fallbackTimer);
        }
        
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsIntersecting(true);
                    if (triggerOnce) {
                        setHasLoaded(true);
                        observer.disconnect();
                    }
                } else if (!triggerOnce) {
                    setIsIntersecting(false);
                }
            },
            { threshold, rootMargin }
        );
        
        observer.observe(element);
        
        return () => observer.disconnect();
    }, [threshold, rootMargin, triggerOnce, fallbackDelay]);
    
    return { elementRef, isIntersecting: isIntersecting || hasLoaded };
}

/**
 * Lazy Image Component with Progressive Loading
 */
export function LazyImage({ 
    src, 
    alt, 
    placeholder, 
    className = '', 
    blurDataURL,
    onLoad,
    onError,
    ...props 
}) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const { elementRef, isIntersecting } = useLazyLoading();
    
    const handleLoad = useCallback(() => {
        setIsLoaded(true);
        onLoad?.();
    }, [onLoad]);
    
    const handleError = useCallback(() => {
        setHasError(true);
        onError?.();
    }, [onError]);
    
    return (
        <div ref={elementRef} className={`relative overflow-hidden ${className}`}>
            {/* Placeholder/Blur */}
            {!isLoaded && (
                <div 
                    className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse"
                    style={{
                        backgroundImage: blurDataURL ? `url(${blurDataURL})` : undefined,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'blur(20px)',
                        transform: 'scale(1.1)'
                    }}
                />
            )}
            
            {/* Actual Image */}
            {isIntersecting && !hasError && (
                <img
                    src={src}
                    alt={alt}
                    className={`transition-opacity duration-500 ${
                        isLoaded ? 'opacity-100' : 'opacity-0'
                    } ${className}`}
                    onLoad={handleLoad}
                    onError={handleError}
                    loading="lazy"
                    {...props}
                />
            )}
            
            {/* Error State */}
            {hasError && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-500">
                    <div className="text-center">
                        <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                        <p className="text-sm">Failed to load image</p>
                    </div>
                </div>
            )}
        </div>
    );
}

/**
 * Lazy Component Wrapper
 * Lazy loads React components with suspense support
 */
export function LazyComponent({ 
    component: Component, 
    fallback = null, 
    errorFallback = null,
    ...props 
}) {
    const [hasError, setHasError] = useState(false);
    const { elementRef, isIntersecting } = useLazyLoading();
    
    if (hasError && errorFallback) {
        return errorFallback;
    }
    
    return (
        <div ref={elementRef}>
            {isIntersecting ? (
                <Component {...props} />
            ) : (
                fallback || <div className="h-32 bg-gray-100 dark:bg-gray-800 animate-pulse rounded" />
            )}
        </div>
    );
}

/**
 * Progressive Loading Hook for Heavy Components
 */
export function useProgressiveLoading(stages = []) {
    const [currentStage, setCurrentStage] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    
    useEffect(() => {
        if (currentStage >= stages.length) {
            setIsComplete(true);
            return;
        }
        
        const timer = setTimeout(() => {
            setCurrentStage(prev => prev + 1);
        }, stages[currentStage]?.delay || 100);
        
        return () => clearTimeout(timer);
    }, [currentStage, stages]);
    
    return {
        currentStage,
        isComplete,
        shouldRender: (stage) => currentStage >= stage
    };
}

/**
 * Lazy Canvas Component for Heavy Animations
 */
export function LazyCanvas({ 
    CanvasComponent, 
    enableWhenVisible = true, 
    placeholder,
    ...props 
}) {
    const { elementRef, isIntersecting } = useLazyLoading({
        threshold: 0.1,
        rootMargin: '100px'
    });
    
    const shouldRender = enableWhenVisible ? isIntersecting : true;
    
    return (
        <div ref={elementRef} className="relative">
            {shouldRender ? (
                <CanvasComponent {...props} />
            ) : (
                placeholder || (
                    <div className="w-full h-full bg-gradient-to-br from-primary-bg to-surface opacity-50" />
                )
            )}
        </div>
    );
}

/**
 * Virtual Scrolling Hook for Large Lists
 */
export function useVirtualScrolling({ 
    items = [], 
    itemHeight = 100, 
    containerHeight = 400,
    overscan = 5 
}) {
    const [scrollTop, setScrollTop] = useState(0);
    
    const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
    const endIndex = Math.min(
        items.length - 1,
        Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
    );
    
    const visibleItems = items.slice(startIndex, endIndex + 1).map((item, index) => ({
        ...item,
        index: startIndex + index
    }));
    
    const totalHeight = items.length * itemHeight;
    const offsetY = startIndex * itemHeight;
    
    return {
        visibleItems,
        totalHeight,
        offsetY,
        onScroll: (e) => setScrollTop(e.target.scrollTop)
    };
}

/**
 * Preloader Hook for Critical Resources
 */
export function usePreloader(resources = []) {
    const [loadedResources, setLoadedResources] = useState(new Set());
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    
    useEffect(() => {
        if (resources.length === 0) {
            setIsLoading(false);
            return;
        }
        
        const loadPromises = resources.map(async (resource) => {
            try {
                if (resource.type === 'image') {
                    return new Promise((resolve, reject) => {
                        const img = new Image();
                        img.onload = () => {
                            setLoadedResources(prev => new Set([...prev, resource.url]));
                            resolve(resource.url);
                        };
                        img.onerror = reject;
                        img.src = resource.url;
                    });
                } else if (resource.type === 'font') {
                    await document.fonts.load(`1em ${resource.name}`);
                    setLoadedResources(prev => new Set([...prev, resource.name]));
                    return resource.name;
                } else if (resource.type === 'module') {
                    const module = await import(resource.url);
                    setLoadedResources(prev => new Set([...prev, resource.url]));
                    return module;
                }
            } catch (error) {
                console.warn(`Failed to load resource: ${resource.url}`, error);
                return null;
            }
        });
        
        Promise.allSettled(loadPromises).then(() => {
            setIsLoading(false);
            setProgress(100);
        });
        
        // Update progress
        const updateProgress = () => {
            const loaded = loadedResources.size;
            const total = resources.length;
            setProgress((loaded / total) * 100);
        };
        
        const interval = setInterval(updateProgress, 100);
        return () => clearInterval(interval);
        
    }, [resources]);
    
    return { isLoading, progress, loadedResources };
}

export default {
    useLazyLoading,
    LazyImage,
    LazyComponent,
    useProgressiveLoading,
    LazyCanvas,
    useVirtualScrolling,
    usePreloader
};