/**
 * DYGSOM Landing Page Configuration Constants
 * 
 * Centralized configuration to avoid magic strings and improve maintainability
 */

// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_DYGSOM_API_URL || 'https://trveshdr84.execute-api.us-east-1.amazonaws.com/lead',
  TIMEOUT: 10000, // 10 seconds
} as const;

// Contact Information
export const CONTACT_INFO = {
  SUPPORT_EMAIL: import.meta.env.VITE_SUPPORT_EMAIL || 'support@dygsom.pe',
  COMPANY_NAME: 'DYGSOM',
} as const;

// Social Media Links
export const SOCIAL_MEDIA = {
  LINKEDIN: 'https://www.linkedin.com/company/dygsom/',
  YOUTUBE: 'https://www.youtube.com/@dygsom',
  FACEBOOK: '#', // Placeholder for future Facebook page
} as const;

// Modal Configuration
export const MODAL_CONFIG = {
  SHOW_DELAY: 15000, // 15 seconds
  AUTO_HIDE_DELAY: 5000, // 5 seconds for error messages
} as const;

// Feature Flags - EASY KILL SWITCH 🔴
export const FEATURE_FLAGS = {
  WELCOME_VIDEO_MODAL_ENABLED: true, // ⚠️ Set to false to disable popup
  WELCOME_MODAL_DELAY_MS: 500, // 0.5 seconds delay (antes 2s)
  WELCOME_MODAL_VIDEO_ENABLED: true, // Disable video but keep form
} as const;

// Welcome Modal Configuration
export const WELCOME_MODAL_CONFIG = {
  BETA_SPOTS_REMAINING: 14, // Update manually or via API
  CTA_TEXT: '¡Solo quedan {spots} cupos para análisis GRATIS!',
} as const;

// Analytics Configuration
export const ANALYTICS_CONFIG = {
  GA_TRACKING_ID: import.meta.env.VITE_GA_TRACKING_ID,
  ENABLE_DEBUG: import.meta.env.DEV && import.meta.env.VITE_DEBUG_ENABLED === 'true',
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  EMAIL_MODAL_SHOWN: 'dygsom_email_modal_shown',
  CAPTURED_EMAIL: 'dygsom_captured_email',
  VISITOR_DATA: 'dygsom_visitor_data',
  WELCOME_MODAL_SHOWN: 'dygsom_welcome_modal_shown',
  ROI_FORM_SUBMITTED: 'dygsom_roi_form_submitted',
} as const;

// Form Validation
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  REQUIRED_FIELDS: ['fullName', 'company', 'position', 'email', 'monthlyVolume'],
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  REQUIRED_FIELDS: 'Por favor completa los campos obligatorios.',
  INVALID_EMAIL: 'Ingresa un email válido (ej: nombre@empresa.com)',
  API_ERROR: 'No se pudo enviar el email. Por favor intenta de nuevo.',
  GENERIC_ERROR: 'Error enviando la solicitud',
} as const;