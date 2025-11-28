/**
 * DYGSOM Leads Service
 * 
 * Handles API communication with AWS Lambda backend for lead generation
 */

import { API_CONFIG, ERROR_MESSAGES } from '../utils/constants';

export interface DemoFormValues {
  fullName: string;
  company: string;
  position: string; // Maps to 'role' in backend
  email: string;
  phone?: string;
  monthlyVolume: string; // Maps to 'monthlyTxVolume' in backend
  message?: string;
}

/**
 * Submit demo request form
 */
export async function submitDemoLead(values: DemoFormValues): Promise<void> {
  const payload = {
    formType: "demo_request",
    fullName: values.fullName,
    company: values.company,
    role: values.position, // Map position to role for backend
    email: values.email,
    phone: values.phone || "",
    monthlyTxVolume: values.monthlyVolume, // Map monthlyVolume to monthlyTxVolume
    message: values.message || "",
    page: window.location.pathname,
    source: "demo_section",
  };

  const response = await fetch(API_CONFIG.BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    let errorMessage = ERROR_MESSAGES.GENERIC_ERROR;
    try {
      const data = await response.json();
      if (data?.message) {
        errorMessage = data.message;
      }
    } catch {
      // Ignore JSON parsing errors
    }
    throw new Error(errorMessage);
  }
}

/**
 * Submit interest popup (email capture)
 */
export async function submitInterestPopup(email: string): Promise<void> {
  const payload = {
    formType: "interest_popup",
    email,
    page: window.location.pathname,
    source: "popup_hero",
  };

  const response = await fetch(API_CONFIG.BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    let errorMessage = ERROR_MESSAGES.API_ERROR;
    try {
      const data = await response.json();
      if (data?.message) {
        errorMessage = data.message;
      }
    } catch {
      // Ignore JSON parsing errors  
    }
    throw new Error(errorMessage);
  }
}