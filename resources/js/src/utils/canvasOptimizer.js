/**
 * Canvas Performance Optimizer
 * Provides advanced performance optimizations for canvas animations
 */

export class CanvasPerformanceOptimizer {
    constructor() {
        this.fps = 60;
        this.frameCount = 0;
        this.lastTime = performance.now();
        this.targetFPS = 60;
        this.frameTimeThreshold = 1000 / this.targetFPS;

        // Performance monitoring
        this.performanceMetrics = {
            averageFPS: 60,
            frameDrops: 0,
            renderTime: 0,
            particleCount: 0,
        };

        // Adaptive quality settings
        this.qualityLevels = {
            high: { particles: 1.0, trailLength: 1.0, glow: 1.0 },
            medium: { particles: 0.7, trailLength: 0.7, glow: 0.8 },
            low: { particles: 0.4, trailLength: 0.3, glow: 0.5 },
            minimal: { particles: 0.2, trailLength: 0.1, glow: 0.3 },
        };

        this.currentQuality = "high";
        this.adaptiveQuality = true;
    }

    /**
     * Calculate current FPS and adjust quality if needed
     */
    updatePerformanceMetrics(currentTime) {
        this.frameCount++;

        if (currentTime - this.lastTime >= 1000) {
            this.fps = this.frameCount;
            this.performanceMetrics.averageFPS = this.fps;

            // Adaptive quality adjustment
            if (this.adaptiveQuality) {
                this.adjustQuality();
            }

            this.frameCount = 0;
            this.lastTime = currentTime;
        }
    }

    /**
     * Adjust rendering quality based on performance
     */
    adjustQuality() {
        if (this.fps < 30 && this.currentQuality !== "minimal") {
            this.downgradeQuality();
        } else if (this.fps > 55 && this.currentQuality !== "high") {
            this.upgradeQuality();
        }
    }

    downgradeQuality() {
        const levels = ["high", "medium", "low", "minimal"];
        const currentIndex = levels.indexOf(this.currentQuality);
        if (currentIndex < levels.length - 1) {
            this.currentQuality = levels[currentIndex + 1];
            console.log(`Canvas quality downgraded to: ${this.currentQuality}`);
        }
    }

    upgradeQuality() {
        const levels = ["minimal", "low", "medium", "high"];
        const currentIndex = levels.indexOf(this.currentQuality);
        if (currentIndex < levels.length - 1) {
            this.currentQuality = levels[currentIndex + 1];
            console.log(`Canvas quality upgraded to: ${this.currentQuality}`);
        }
    }

    /**
     * Get optimized settings based on current quality level
     */
    getOptimizedSettings(baseSettings) {
        const quality = this.qualityLevels[this.currentQuality];

        return {
            meteorCount: Math.round(
                baseSettings.meteorCount * quality.particles
            ),
            trailLength: Math.round(
                baseSettings.trailLength * quality.trailLength
            ),
            glowIntensity: baseSettings.glowIntensity * quality.glow,
            enableGlow: this.currentQuality !== "minimal",
        };
    }

    /**
     * Throttle animation frame based on performance
     */
    shouldSkipFrame(currentTime, lastFrameTime) {
        const deltaTime = currentTime - lastFrameTime;
        return deltaTime < this.frameTimeThreshold;
    }

    /**
     * Object pooling for meteors
     */
    createMeteorPool(size, MeteorClass, canvasWidth, canvasHeight) {
        const pool = [];
        for (let i = 0; i < size; i++) {
            pool.push(new MeteorClass(canvasWidth, canvasHeight));
        }
        return pool;
    }

    /**
     * Get meteor from pool or create new one
     */
    getMeteor(pool, MeteorClass, canvasWidth, canvasHeight) {
        const meteor = pool.find((m) => !m.isActive);
        if (meteor) {
            meteor.isActive = true;
            meteor.reset(canvasWidth, canvasHeight);
            return meteor;
        }
        return new MeteorClass(canvasWidth, canvasHeight);
    }

    /**
     * Return meteor to pool
     */
    returnMeteor(meteor, pool) {
        meteor.isActive = false;
        if (!pool.includes(meteor)) {
            pool.push(meteor);
        }
    }

    /**
     * Memory cleanup for canvas
     */
    cleanup() {
        this.frameCount = 0;
        this.performanceMetrics = {
            averageFPS: 60,
            frameDrops: 0,
            renderTime: 0,
            particleCount: 0,
        };
    }
}

/**
 * Canvas resize optimization with debouncing
 */
export class CanvasResizeOptimizer {
    constructor(callback, delay = 250) {
        this.callback = callback;
        this.delay = delay;
        this.timeoutId = null;
        this.isResizing = false;
    }

    handleResize(width, height) {
        this.isResizing = true;

        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }

        this.timeoutId = setTimeout(() => {
            this.callback(width, height);
            this.isResizing = false;
        }, this.delay);
    }

    cleanup() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
    }
}

/**
 * RAF (RequestAnimationFrame) optimization with fallback
 */
export class RAFOptimizer {
    constructor() {
        this.isRunning = false;
        this.callbacks = [];
        this.lastTime = 0;
        this.targetFPS = 60;
        this.frameInterval = 1000 / this.targetFPS;
    }

    addCallback(callback) {
        this.callbacks.push(callback);
    }

    removeCallback(callback) {
        const index = this.callbacks.indexOf(callback);
        if (index > -1) {
            this.callbacks.splice(index, 1);
        }
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.animate();
        }
    }

    stop() {
        this.isRunning = false;
    }

    animate = (currentTime) => {
        if (!this.isRunning) return;

        const deltaTime = currentTime - this.lastTime;

        if (deltaTime >= this.frameInterval) {
            this.callbacks.forEach((callback) => {
                try {
                    callback(currentTime, deltaTime);
                } catch (error) {
                    console.error("Animation callback error:", error);
                }
            });

            this.lastTime = currentTime - (deltaTime % this.frameInterval);
        }

        requestAnimationFrame(this.animate);
    };
}

export default CanvasPerformanceOptimizer;
