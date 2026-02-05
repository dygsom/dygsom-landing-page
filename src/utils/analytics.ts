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

/**
 * Track CTA clicks
 */
export const trackCTAClick = (ctaName: string, location: string) => {
  trackEvent('cta_click', {
    event_category: 'conversion',
    event_label: `${ctaName} - ${location}`,
    cta_name: ctaName,
    cta_location: location
  });
};

/**
 * Track scroll to specific sections
 */
export const trackSectionView = (sectionName: string) => {
  trackEvent('section_view', {
    event_category: 'engagement',
    event_label: sectionName,
    section_name: sectionName
  });
};

/**
 * Track feature expansion (e.g., pricing features "Ver más")
 */
export const trackFeatureExpansion = (featureName: string, expanded: boolean) => {
  trackEvent('feature_expansion', {
    event_category: 'engagement',
    event_label: `${featureName} - ${expanded ? 'expanded' : 'collapsed'}`,
    feature_name: featureName,
    expanded
  });
};

/**
 * Track pilar interaction (hover/click)
 */
export const trackPilarInteraction = (pilarName: string, interactionType: 'hover' | 'click') => {
  trackEvent('pilar_interaction', {
    event_category: 'engagement',
    event_label: `${pilarName} - ${interactionType}`,
    pilar_name: pilarName,
    interaction_type: interactionType
  });
};

/**
 * Track exit intent popup actions
 */
export const trackExitIntent = (action: 'shown' | 'accepted' | 'dismissed') => {
  trackEvent('exit_intent', {
    event_category: 'conversion',
    event_label: action,
    action,
    value: action === 'accepted' ? 1 : 0
  });
};

/**
 * Track testimonial interactions
 */
export const trackTestimonialClick = (testimonialAuthor: string) => {
  trackEvent('testimonial_click', {
    event_category: 'engagement',
    event_label: testimonialAuthor,
    testimonial_author: testimonialAuthor
  });
};

/**
 * Track form field interactions
 */
export const trackFormFieldFocus = (fieldName: string) => {
  trackEvent('form_field_focus', {
    event_category: 'form_interaction',
    event_label: fieldName,
    field_name: fieldName
  });
};

/**
 * Track FAQ expansion
 */
export const trackFAQExpansion = (question: string, expanded: boolean) => {
  trackEvent('faq_expansion', {
    event_category: 'engagement',
    event_label: question.substring(0, 50), // Truncate for label
    expanded
  });
};

/**
 * Track scroll depth milestones
 */
export const trackScrollDepth = (percentage: 25 | 50 | 75 | 100) => {
  trackEvent('scroll_depth', {
    event_category: 'engagement',
    event_label: `${percentage}%`,
    scroll_percentage: percentage
  });
};
