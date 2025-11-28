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

// Modal Configuration
export const MODAL_CONFIG = {
  SHOW_DELAY: 15000, // 15 seconds
  AUTO_HIDE_DELAY: 5000, // 5 seconds for error messages
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
} as const;

// Form Validation
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  REQUIRED_FIELDS: ['fullName', 'company', 'position', 'email', 'monthlyVolume'],
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  REQUIRED_FIELDS: 'Por favor completa los campos obligatorios.',
  INVALID_EMAIL: 'Por favor ingresa un email válido',
  API_ERROR: 'No se pudo enviar el email. Por favor intenta de nuevo.',
  GENERIC_ERROR: 'Error enviando la solicitud',
} as const;