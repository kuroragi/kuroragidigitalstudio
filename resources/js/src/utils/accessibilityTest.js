/**
 * Accessibility Testing Utilities
 * Helper functions to test and validate accessibility features
 */

/**
 * Test keyboard navigation
 */
export function testKeyboardNavigation() {
    console.group("🔍 Testing Keyboard Navigation");

    // Test tab order
    const focusableElements = document.querySelectorAll(
        'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    console.log(`✓ Found ${focusableElements.length} focusable elements`);

    // Check for proper focus indicators
    const elementsWithFocusIndicators = document.querySelectorAll(
        ".focus-visible\\:ring-2"
    );
    console.log(
        `✓ ${elementsWithFocusIndicators.length} elements have focus indicators`
    );

    // Check skip links
    const skipLinks = document.querySelectorAll('[href^="#"]');
    console.log(`✓ Found ${skipLinks.length} skip links`);

    console.groupEnd();
}

/**
 * Test screen reader accessibility
 */
export function testScreenReaderAccessibility() {
    console.group("📢 Testing Screen Reader Accessibility");

    // Check ARIA labels
    const ariaLabeled = document.querySelectorAll("[aria-label]");
    console.log(`✓ ${ariaLabeled.length} elements have aria-label`);

    // Check landmarks
    const landmarks = document.querySelectorAll(
        'main, nav, header, footer, aside, section[role], [role="banner"], [role="navigation"], [role="contentinfo"]'
    );
    console.log(`✓ Found ${landmarks.length} landmark elements`);

    // Check headings structure
    const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
    console.log(`✓ Found ${headings.length} heading elements`);

    // Check alt texts
    const images = document.querySelectorAll("img");
    const imagesWithAlt = document.querySelectorAll("img[alt]");
    console.log(
        `✓ ${imagesWithAlt.length}/${images.length} images have alt text`
    );

    console.groupEnd();
}

/**
 * Test color contrast (basic check)
 */
export function testColorContrast() {
    console.group("🎨 Testing Color Contrast");

    // This is a basic implementation - for production use tools like axe-core
    const textElements = document.querySelectorAll(
        "p, span, h1, h2, h3, h4, h5, h6, a, button"
    );
    let contrastIssues = 0;

    textElements.forEach((element) => {
        const styles = window.getComputedStyle(element);
        const color = styles.color;
        const backgroundColor = styles.backgroundColor;

        // Basic check for common low contrast patterns
        if (color === "rgb(128, 128, 128)" || color === "#808080") {
            contrastIssues++;
        }
    });

    console.log(`⚠️  Found ${contrastIssues} potential contrast issues`);
    console.groupEnd();
}

/**
 * Test reduced motion preferences
 */
export function testReducedMotionSupport() {
    console.group("🎬 Testing Reduced Motion Support");

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;
    console.log(
        `${
            prefersReducedMotion ? "✓" : "❌"
        } User prefers reduced motion: ${prefersReducedMotion}`
    );

    // Check for animation classes
    const animatedElements = document.querySelectorAll(
        '.animate-spin, .animate-bounce, .animate-pulse, [class*="animate-"]'
    );
    console.log(`Found ${animatedElements.length} elements with animations`);

    console.groupEnd();
}

/**
 * Run comprehensive accessibility audit
 */
export function runAccessibilityAudit() {
    console.group("🛡️  Kuroragi Digital Studio - Accessibility Audit");
    console.log("Running comprehensive accessibility tests...\n");

    testKeyboardNavigation();
    testScreenReaderAccessibility();
    testColorContrast();
    testReducedMotionSupport();

    console.log("\n📋 Accessibility Audit Complete!");
    console.log(
        "💡 For detailed WCAG compliance testing, use tools like axe-core or Lighthouse."
    );
    console.groupEnd();
}

/**
 * Development helper - adds accessibility testing to window
 */
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
    window.accessibilityTest = {
        runAudit: runAccessibilityAudit,
        testKeyboard: testKeyboardNavigation,
        testScreenReader: testScreenReaderAccessibility,
        testContrast: testColorContrast,
        testMotion: testReducedMotionSupport,
    };

    console.log(
        "🛡️  Accessibility testing utilities available at window.accessibilityTest"
    );
    console.log(
        "Run window.accessibilityTest.runAudit() to test accessibility features"
    );
}
