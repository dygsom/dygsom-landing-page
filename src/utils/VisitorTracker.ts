// Simple Visitor Tracker - Clean TypeScript Implementation
import { submitInterestPopup } from '../services/leadsService';
import { MODAL_CONFIG, STORAGE_KEYS, VALIDATION, ERROR_MESSAGES } from './constants';

export interface EventData {
  [key: string]: unknown;
}

export type EventType = 
  | 'page_view' 
  | 'button_click' 
  | 'scroll_depth' 
  | 'time_on_page' 
  | 'page_exit'
  | 'email_capture'
  | 'section_view';

interface SimpleVisitorData {
  ip?: string;
  country?: string;
  city?: string;
  userAgent: string;
  timestamp: string;
  sessionId: string;
  pageUrl: string;
}

export class VisitorTracker {
  private static instance: VisitorTracker;
  private visitorData: SimpleVisitorData;
  private sessionId: string;
  private isInitialized: boolean = false;

  private constructor() {
    this.sessionId = this.generateSessionId();
    this.visitorData = {
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      pageUrl: window.location.href
    };
  }

  static getInstance(): VisitorTracker {
    if (!VisitorTracker.instance) {
      VisitorTracker.instance = new VisitorTracker();
    }
    return VisitorTracker.instance;
  }

  async init(): Promise<void> {
    if (this.isInitialized) return;

    try {
      // Get IP and location data
      await this.getVisitorLocation();
      
      // Track initial page view
      this.trackPageView();
      
      // Setup event listeners
      this.setupEventTracking();
      
      // Modal will only show when user clicks "Quiero información" button
      // Removed automatic modal display
      
      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize visitor tracking:', error);
    }
  }

  private async getVisitorLocation(): Promise<void> {
    try {
      // Try multiple IP services for reliability
      const ipServices = [
        'https://api.ipify.org?format=json',
        'https://httpbin.org/ip',
        'https://ipapi.co/json'
      ];

      for (const service of ipServices) {
        try {
          const response = await fetch(service);
          const data = await response.json();
          
          if (data.ip) {
            this.visitorData.ip = data.ip;
            this.visitorData.country = data.country || data.country_name;
            this.visitorData.city = data.city;
            break;
          }
        } catch (error) {
          console.warn('IP service failed:', service, error);
        }
      }

      console.log('📍 Visitor location detected:', {
        ip: this.visitorData.ip,
        country: this.visitorData.country,
        city: this.visitorData.city
      });

    } catch (error) {
      console.warn('⚠️ Could not get visitor location:', error);
    }
  }

  private trackPageView(): void {
    this.trackEvent('page_view', {
      title: document.title,
      url: window.location.href,
      timestamp: new Date().toISOString()
    });

    // Google Analytics 4
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        content_group1: 'DYGSOM Landing'
      });
    }
  }

  private setupEventTracking(): void {
    this.trackScrollDepth();
    this.trackButtonClicks();
    this.trackTimeOnPage();
    this.trackPageExit();
  }

  private trackScrollDepth(): void {
    let maxScroll = 0;
    const trackingPoints = [25, 50, 75, 90, 100];

    const handleScroll = (): void => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      );

      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;

        trackingPoints.forEach(point => {
          if (scrollPercent >= point && maxScroll < point + 5) {
            this.trackEvent('scroll_depth', {
              depth: point,
              maxDepth: scrollPercent
            });

            if (typeof window.gtag === 'function') {
              window.gtag('event', 'scroll', {
                event_category: 'engagement',
                event_label: `${point}%`,
                value: point
              });
            }
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  private trackButtonClicks(): void {
    const handleClick = (event: Event): void => {
      const target = event.target as HTMLElement;

      if (target.matches('button, .btn, [href="#contacto"], [href*="mailto:"]')) {
        const buttonText = target.textContent?.trim() || 'Unknown button';
        
        this.trackEvent('button_click', {
          buttonText,
          buttonId: target.id || undefined,
          timestamp: new Date().toISOString()
        });

        if (typeof window.gtag === 'function') {
          window.gtag('event', 'click', {
            event_category: 'engagement',
            event_label: buttonText,
            value: 1
          });
        }
      }
    };

    document.addEventListener('click', handleClick);
  }

  private trackTimeOnPage(): void {
    const milestones = [30, 60, 120, 300]; // seconds

    milestones.forEach(seconds => {
      setTimeout(() => {
        this.trackEvent('time_on_page', {
          milestone: seconds,
          timestamp: new Date().toISOString()
        });

        if (typeof window.gtag === 'function') {
          window.gtag('event', 'timing_complete', {
            name: 'time_on_page',
            value: seconds * 1000
          });
        }
      }, seconds * 1000);
    });
  }

  private trackPageExit(): void {
    const handleBeforeUnload = (): void => {
      this.trackEvent('page_exit', {
        timestamp: new Date().toISOString(),
        finalUrl: window.location.href
      });

      // Save data to localStorage for persistence
      this.saveVisitorData();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('pagehide', handleBeforeUnload);
  }

  trackEvent(eventType: EventType, eventData: EventData): void {
    const event = {
      eventType,
      eventData,
      visitorData: this.visitorData,
      timestamp: new Date().toISOString()
    };

    console.log('📊 Event tracked:', eventType, eventData);

    // Save to localStorage for analytics
    const events = JSON.parse(localStorage.getItem('dygsom_events') || '[]');
    events.push(event);
    localStorage.setItem('dygsom_events', JSON.stringify(events));

    // Send to backend if available
    this.sendEventToBackend(event).catch(error => {
      console.warn('Failed to send event to backend:', error);
    });
  }

  private async sendEventToBackend(event: unknown): Promise<void> {
    // Temporarily disable backend calls for analytics until endpoint is confirmed
    console.log('📊 Analytics event (local only):', event);
    return;
    
    /* 
    // TODO: Enable when analytics endpoint is available
    try {
      const response = await fetch('/api/analytics/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.warn('Failed to send event to backend, logging locally:', error);
      console.log('Event data:', event);
    }
    */
  }

  async captureEmail(email: string, source: 'modal' | 'form' | 'newsletter' = 'modal'): Promise<void> {
    this.trackEvent('email_capture', {
      email,
      source,
      timestamp: new Date().toISOString()
    });

    if (typeof window.gtag === 'function') {
      window.gtag('event', 'email_capture', {
        event_category: 'lead',
        event_label: source,
        value: 1
      });
    }

    // Send email to backend API
    try {
      await submitInterestPopup(email);
      
      // Save email to localStorage only on success
      localStorage.setItem(STORAGE_KEYS.CAPTURED_EMAIL, email);
    } catch (error) {
      // Propagate error to caller
      throw new Error(ERROR_MESSAGES.API_ERROR);
    }
  }

  showEmailCaptureModal(): void {
    // Check if modal was already shown
    const wasShown = localStorage.getItem(STORAGE_KEYS.EMAIL_MODAL_SHOWN);
    if (wasShown) {
      return;
    }

    // Check if email was already captured
    const emailCaptured = localStorage.getItem(STORAGE_KEYS.CAPTURED_EMAIL);
    if (emailCaptured) {
      return;
    }

    this.forceShowEmailModal();
  }

  /**
   * Force show email modal regardless of previous state (for button clicks)
   */
  forceShowEmailModal(): void {
    try {
      // Remove any existing modal first
      const existingModal = document.querySelector('.dygsom-email-modal');
      if (existingModal) {
        existingModal.remove();
      }

      const modal = this.createEmailModal();
      document.body.appendChild(modal);

      this.trackEvent('email_capture', {
        email: 'modal_shown',
        source: 'button'
      });
    } catch (error) {
      console.error('Error showing email modal:', error);
    }
  }



  private createEmailModal(): HTMLElement {
    const modal = document.createElement('div');
    modal.className = 'dygsom-email-modal';
    modal.innerHTML = `
      <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 10000; display: flex; align-items: center; justify-content: center; font-family: system-ui, -apple-system, sans-serif;">
        <div style="background: white; padding: 30px; border-radius: 12px; max-width: 420px; width: 90%; box-shadow: 0 25px 50px rgba(0,0,0,0.25); animation: slideIn 0.3s ease-out;">
          <h3 style="margin: 0 0 15px 0; color: #1f2937; font-size: 1.5rem; font-weight: 700;">🚀 ¿Te interesa DYGSOM?</h3>
          <p style="margin: 0 0 20px 0; color: #6b7280; line-height: 1.6;">Déjanos tu email para enviarte información exclusiva sobre nuestra plataforma antifraude para LATAM.</p>
          <input type="email" id="visitor-email" placeholder="tu@email.com" required style="width: 100%; padding: 14px 16px; margin: 0 0 16px 0; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 16px; transition: border-color 0.2s; box-sizing: border-box;">
          <div style="display: flex; gap: 12px;">
            <button id="submit-email" style="flex: 1; background: linear-gradient(135deg, #0ea5e9, #06b6d4); color: white; border: none; padding: 14px 20px; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 15px; transition: transform 0.2s, box-shadow 0.2s;">Enviar</button>
            <button id="close-modal" style="background: #f3f4f6; color: #4b5563; border: none; padding: 14px 20px; border-radius: 8px; cursor: pointer; font-weight: 500;">Cerrar</button>
          </div>
        </div>
      </div>
      <style>
        @keyframes slideIn {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        #submit-email:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(14, 165, 233, 0.4); }
        #visitor-email:focus { border-color: #0ea5e9; outline: none; }
      </style>
    `;

    // Event listeners
    const submitBtn = modal.querySelector('#submit-email') as HTMLButtonElement;
    const closeBtn = modal.querySelector('#close-modal') as HTMLButtonElement;
    const emailInput = modal.querySelector('#visitor-email') as HTMLInputElement;

    submitBtn?.addEventListener('click', async () => {
      const email = emailInput?.value.trim();
      if (email && this.isValidEmail(email)) {
        // Disable button while processing
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';
        
        try {
          await this.captureEmail(email, 'modal');
          modal.remove();
          this.showThankYouMessage();
        } catch (error) {
          // Re-enable button
          submitBtn.disabled = false;
          submitBtn.textContent = 'Enviar';
          
          // Show error message
          this.showApiError(modal, error instanceof Error ? error.message : 'Error desconocido');
        }
      } else {
        this.showEmailError(emailInput);
      }
    });

    closeBtn?.addEventListener('click', () => {
      modal.remove();
    });

    // Submit on Enter
    emailInput?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        submitBtn?.click();
      }
    });

    // Real-time validation feedback
    emailInput?.addEventListener('input', () => {
      const email = emailInput.value.trim();
      const existingError = emailInput.parentElement?.querySelector('.email-error-message');
      
      if (email && this.isValidEmail(email) && existingError) {
        // Valid email - remove error if exists
        emailInput.style.borderColor = '#10b981';
        emailInput.style.boxShadow = '0 0 0 3px rgba(16, 185, 129, 0.1)';
        existingError.remove();
      } else if (email && !this.isValidEmail(email)) {
        // Invalid email - show border as red but don't show full error until submit
        emailInput.style.borderColor = '#ef4444';
        emailInput.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
      } else {
        // Reset to normal
        emailInput.style.borderColor = '#e5e7eb';
        emailInput.style.boxShadow = 'none';
        if (existingError) existingError.remove();
      }
    });

    return modal;
  }

  private isValidEmail(email: string): boolean {
    return VALIDATION.EMAIL_REGEX.test(email);
  }

  private showEmailError(input: HTMLInputElement): void {
    // Remove any existing error message
    const existingError = input.parentElement?.querySelector('.email-error-message');
    if (existingError) {
      existingError.remove();
    }

    // Style input as error
    input.style.borderColor = '#ef4444';
    input.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
    
    // Create visible error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'email-error-message';
    errorDiv.innerHTML = `
      <div style="color: #dc2626; font-size: 14px; margin-top: 8px; display: flex; align-items: center; gap: 6px;">
        <span style="font-size: 16px;">⚠️</span>
        <span>${ERROR_MESSAGES.INVALID_EMAIL}</span>
      </div>
    `;

    // Insert error message after input
    input.parentNode?.insertBefore(errorDiv, input.nextSibling);
    
    // Auto-remove after delay and restore input style
    setTimeout(() => {
      input.style.borderColor = '#e5e7eb';
      input.style.boxShadow = 'none';
      errorDiv.remove();
    }, 4000);

    // Focus back to input for better UX
    input.focus();
  }

  private showApiError(modal: HTMLElement, message: string): void {
    // Remove any existing error message
    const existingError = modal.querySelector('.api-error-message');
    if (existingError) {
      existingError.remove();
    }

    // Create error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'api-error-message';
    errorDiv.innerHTML = `
      <div style="background: #fef2f2; border: 1px solid #fecaca; color: #dc2626; padding: 12px; border-radius: 6px; margin-top: 12px; font-size: 14px;">
        ⚠️ ${message}
      </div>
    `;

    // Insert error message before the button container
    const buttonContainer = modal.querySelector('div[style*="display: flex"]');
    if (buttonContainer) {
      buttonContainer.parentNode?.insertBefore(errorDiv, buttonContainer);
    }

    // Auto-remove after configured delay
    setTimeout(() => {
      errorDiv.remove();
    }, MODAL_CONFIG.AUTO_HIDE_DELAY);
  }

  private showThankYouMessage(): void {
    const toast = document.createElement('div');
    toast.innerHTML = '✅ ¡Gracias! Te contactaremos pronto con información exclusiva.';
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, #10b981, #059669);
      color: white;
      padding: 16px 24px;
      border-radius: 8px;
      font-weight: 600;
      z-index: 10001;
      box-shadow: 0 10px 25px rgba(16, 185, 129, 0.25);
      max-width: 300px;
      animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.animation = 'slideOutRight 0.3s ease-in forwards';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  private saveVisitorData(): void {
    try {
      localStorage.setItem(STORAGE_KEYS.VISITOR_DATA, JSON.stringify(this.visitorData));
    } catch (error) {
      console.warn('Failed to save visitor data:', error);
    }
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Static methods for external access
  static trackEvent(eventType: EventType, eventData: EventData): void {
    const instance = VisitorTracker.getInstance();
    instance.trackEvent(eventType, eventData);
  }

  static showEmailModal(): void {
    const instance = VisitorTracker.getInstance();
    instance.showEmailCaptureModal();
  }

  static async initTracker(): Promise<void> {
    const instance = VisitorTracker.getInstance();
    await instance.init();
  }
}

export default VisitorTracker;