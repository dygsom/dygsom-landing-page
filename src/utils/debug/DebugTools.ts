/**
 * Debug Tools for DYGSOM Landing Page
 * 
 * IMPORTANT: This file should only be imported in development mode
 * These tools are available through browser console: window.DygsomDebug
 */

import { VisitorTracker } from '../VisitorTracker';

export class DebugTools {
  private static instance: DebugTools;

  static getInstance(): DebugTools {
    if (!DebugTools.instance) {
      DebugTools.instance = new DebugTools();
    }
    return DebugTools.instance;
  }

  /**
   * Reset email modal state for testing
   */
  resetModal(): void {
    localStorage.removeItem('dygsom_email_modal_shown');
    localStorage.removeItem('dygsom_captured_email');
    console.log('🔄 Modal state reset. Refresh page to see modal again.');
  }

  /**
   * Force show email modal regardless of state
   */
  forceShowModal(): void {
    console.log('🔧 Force showing modal...');
    
    const tracker = VisitorTracker.getInstance();
    tracker.forceShowEmailModal();
  }

  /**
   * Check current application state
   */
  checkState(): object {
    return {
      modalShown: localStorage.getItem('dygsom_email_modal_shown'),
      emailCaptured: localStorage.getItem('dygsom_captured_email'),
      trackerInitialized: VisitorTracker.getInstance() ? true : false,
      userAgent: navigator.userAgent,
      screenSize: `${window.screen.width}x${window.screen.height}`,
      viewport: `${window.innerWidth}x${window.innerHeight}`,
      url: window.location.href
    };
  }

  /**
   * Test API connectivity
   */
  async testAPI(): Promise<void> {
    const testEmail = 'test@debug.com';
    console.log('🔧 Testing API with:', testEmail);
    
    try {
      // Import dynamically to avoid issues in production
      const { submitInterestPopup } = await import('../../services/leadsService');
      await submitInterestPopup(testEmail);
      console.log('✅ API test successful');
    } catch (error) {
      console.error('❌ API test failed:', error);
    }
  }

  /**
   * Clear all localStorage data
   */
  clearStorage(): void {
    const keys = Object.keys(localStorage).filter(key => key.startsWith('dygsom_'));
    keys.forEach(key => localStorage.removeItem(key));
    console.log(`🗑️ Cleared ${keys.length} DYGSOM storage items`);
  }

  /**
   * Initialize debug tools globally (development only)
   */
  static initGlobal(): void {
    if (import.meta.env.DEV) {
      const instance = DebugTools.getInstance();
      (window as unknown as { DygsomDebug: object }).DygsomDebug = {
        resetModal: () => instance.resetModal(),
        forceShowModal: () => instance.forceShowModal(),
        checkState: () => instance.checkState(),
        testAPI: () => instance.testAPI(),
        clearStorage: () => instance.clearStorage()
      };
      console.log('🛠️ Debug tools available: DygsomDebug.*');
    }
  }
}