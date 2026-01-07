import React, { useState } from 'react';
import { FaCheckCircle, FaSpinner } from 'react-icons/fa';
import { Button } from '../ui/Button';
import { submitDemoLead, type DemoFormValues } from '../../services/leadsService';
import { VALIDATION, ERROR_MESSAGES, CONTACT_INFO } from '../../utils/constants';

export const DemoFormSection: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    position: '',
    email: '',
    phone: '',
    monthlyVolume: '',
    message: ''
  });

  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation using constants
    const missingFields = VALIDATION.REQUIRED_FIELDS.some(field => 
      !formData[field as keyof typeof formData]?.trim()
    );
    
    if (missingFields) {
      alert(ERROR_MESSAGES.REQUIRED_FIELDS);
      return;
    }

    // Privacy policy validation
    if (!privacyAccepted) {
      alert('Debes aceptar la Política de Privacidad para continuar.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      await submitDemoLead(formData as DemoFormValues);
      
      // Success
      setSubmitted(true);
      
      // Track successful submission
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'form_submit', {
          event_category: 'lead_generation',
          event_label: 'demo_request_success',
          value: 1
        });
      }
      
    } catch (error) {
      console.error('Error enviando formulario:', error);
      
      // Track failed submission
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'form_error', {
          event_category: 'lead_generation',
          event_label: 'demo_request_failed',
          value: 1
        });
      }
      
      // Show error to user
      const errorMessage = error instanceof Error ? error.message : ERROR_MESSAGES.GENERIC_ERROR;
      alert(`${errorMessage}\n\nSi el problema persiste, contacta directamente a ${CONTACT_INFO.SUPPORT_EMAIL}`);
      
    } finally {
      setIsSubmitting(false);
    }
    
    // Reset form after 6 seconds
    setTimeout(() => {
      setSubmitted(false);
      setPrivacyAccepted(false);
      setFormData({
        fullName: '',
        company: '',
        position: '',
        email: '',
        phone: '',
        monthlyVolume: '',
        message: ''
      });
    }, 6000);
  };

  return (
    <section className="py-12 md:py-20 px-4 md:px-6 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900" id="contacto">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-50 mb-3 md:mb-4">
            Solicita Tu Análisis Gratis
          </h2>
          <p className="text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Cuéntanos sobre tu tienda y te mostraremos exactamente cuánto estás perdiendo en fraude y rechazos falsos.
          </p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700/50 p-4 sm:p-6 md:p-10">
          {submitted ? (
            <div className="text-center py-12">
              <FaCheckCircle className="text-dygsom-green text-6xl mx-auto mb-6 animate-bounce" />
              <h3 className="text-2xl md:text-3xl font-bold text-dygsom-light-text mb-4">
                ¡Gracias por tu interés en DYGSOM!
              </h3>
              <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                Revisaremos tu información y nos pondremos en contacto contigo para agendar la demo en los próximos días.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nombre completo */}
                <div>
                  <label htmlFor="fullName" className="block text-sm font-semibold text-slate-300 mb-2">
                    Tu nombre *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="Tu nombre"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="Email"
                  />
                </div>

                {/* Tienda */}
                <div>
                  <label htmlFor="company" className="block text-sm font-semibold text-slate-300 mb-2">
                    Nombre de tu tienda *
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    required
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="Nombre de tu tienda"
                  />
                </div>

                {/* Cargo/Posición */}
                <div>
                  <label htmlFor="position" className="block text-sm font-semibold text-slate-300 mb-2">
                    Tu cargo *
                  </label>
                  <input
                    type="text"
                    id="position"
                    name="position"
                    required
                    value={formData.position}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="Ej: Gerente, Dueño, CTO"
                  />
                </div>

                {/* Website (opcional) */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-slate-300 mb-2">
                    Website (opcional)
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="https://tutienda.pe"
                  />
                </div>

                {/* Ventas mensuales aproximadas */}
                <div className="md:col-span-2">
                  <label htmlFor="monthlyVolume" className="block text-sm font-semibold text-slate-300 mb-2">
                    Ventas mensuales aprox... *
                  </label>
                  <select
                    id="monthlyVolume"
                    name="monthlyVolume"
                    required
                    value={formData.monthlyVolume}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  >
                    <option value="">Ventas mensuales aprox...</option>
                    <option value="50-150k">S/. 50K - 150K</option>
                    <option value="150-500k">S/. 150K - 500K</option>
                    <option value="500k-1m">S/. 500K - 1M</option>
                    <option value="1m+">Más de S/. 1M</option>
                  </select>
                </div>
              </div>

              {/* Mensaje / Comentario */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-slate-300 mb-2">
                  ¿Qué productos vendes? ¿Cuál es tu principal problema con fraude?
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
                  placeholder="Ej: Vendemos laptops y celulares. Niubiz rechaza muchas ventas legítimas..."
                />
              </div>

              {/* Privacy Policy Consent */}
              <div className="bg-slate-900/30 border border-slate-700/50 rounded-lg p-4 mt-6">
                <label className="flex items-start gap-3 cursor-pointer text-sm">
                  <input
                    type="checkbox"
                    checked={privacyAccepted}
                    onChange={(e) => setPrivacyAccepted(e.target.checked)}
                    className="mt-0.5 h-4 w-4 text-green-500 bg-slate-800 border-slate-600 rounded focus:ring-green-500 focus:ring-2"
                    required
                  />
                  <span className="text-slate-300 leading-relaxed">
                    <span className="text-red-400">*</span> De conformidad con la{' '}
                    <strong>Ley N° 29733, Ley de Protección de Datos Personales</strong>, 
                    Dygsom le informa que los datos personales que nos ha facilitado serán tratados 
                    de acuerdo con la{' '}
                    <a 
                      href="/politica-privacidad-dygsom.html" 
                      target="_blank" 
                      className="text-green-400 hover:text-green-300 underline font-medium transition-colors"
                      rel="noopener noreferrer"
                    >
                      Política de Privacidad de Dygsom
                    </a>.
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-4">
                <Button
                  type="submit"
                  className="px-8 py-4 text-base md:text-lg min-w-[240px] flex items-center justify-center gap-3"
                  disabled={isSubmitting || !privacyAccepted}
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      <span>Enviando...</span>
                    </>
                  ) : (
                    'Enviar Solicitud →'
                  )}
                </Button>
              </div>

              <p className="text-xs text-slate-500 text-center mt-4">
                * Campos obligatorios. Tus datos están protegidos y no serán compartidos con terceros.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
