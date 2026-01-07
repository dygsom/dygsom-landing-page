/**
 * Google Analytics 4 Initialization
 * 
 * Professional implementation following best practices:
 * - Uses environment variables (import.meta.env)
 * - Lazy loads GA script only when configured
 * - TypeScript type safety
 * - No blocking of page load
 * - GDPR compliant (anonymize_ip)
 */

// Declare gtag function for TypeScript
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

/**
 * Initialize Google Analytics 4
 * Call this once during app initialization
 */
export function initializeGA4(): void {
  const GA_TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID;

  // Skip if no tracking ID configured
  if (!GA_TRACKING_ID || typeof GA_TRACKING_ID !== 'string' || GA_TRACKING_ID.trim() === '') {
    console.warn('⚠️ Google Analytics 4 not initialized: VITE_GA_TRACKING_ID not configured');
    return;
  }

  // Validate format (should be G-XXXXXXXXXX)
  if (!GA_TRACKING_ID.startsWith('G-')) {
    console.error('❌ Invalid GA4 Measurement ID format:', GA_TRACKING_ID);
    return;
  }

  try {
    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    
    // Define gtag function
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    };

    // Set initial timestamp
    window.gtag('js', new Date());

    // Configure GA4 with privacy settings
    window.gtag('config', GA_TRACKING_ID, {
      send_page_view: true,
      cookie_flags: 'SameSite=None;Secure',
      anonymize_ip: true, // GDPR compliance
      allow_google_signals: false, // Disable remarketing/advertising features
      allow_ad_personalization_signals: false,
    });

    // Lazy load GA script (non-blocking)
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    
    // Error handling
    script.onerror = () => {
      console.error('❌ Failed to load Google Analytics script');
    };

    document.head.appendChild(script);

    console.log('✅ Google Analytics 4 initialized:', GA_TRACKING_ID);
  } catch (error) {
    console.error('❌ Error initializing Google Analytics 4:', error);
  }
}

/**
 * Track custom event
 * @param eventName - Event name (e.g., 'button_click')
 * @param eventParams - Event parameters
 */
export function trackEvent(eventName: string, eventParams?: Record<string, unknown>): void {
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, eventParams);
  } else {
    console.warn('⚠️ GA4 not initialized, event not tracked:', eventName);
  }
}

/**
 * Track page view (manual)
 * @param pagePath - Page path (optional, defaults to current location)
 * @param pageTitle - Page title (optional, defaults to document.title)
 */
export function trackPageView(pagePath?: string, pageTitle?: string): void {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', {
      page_path: pagePath || window.location.pathname,
      page_title: pageTitle || document.title,
      page_location: window.location.href,
    });
  }
}

/**
 * Set user properties
 * @param properties - User properties to set
 */
export function setUserProperties(properties: Record<string, unknown>): void {
  if (typeof window.gtag === 'function') {
    window.gtag('set', 'user_properties', properties);
  }
}
