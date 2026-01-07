import React, { useState, useEffect } from 'react';
import { FaTimes, FaCheckCircle, FaSpinner } from 'react-icons/fa';
import { submitROIForm, type ROIFormValues } from '../../services/leadsService';
import { FEATURE_FLAGS, WELCOME_MODAL_CONFIG } from '../../utils/constants';
import videoSrc from '../../assets/video1.mp4';

interface WelcomeVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WelcomeVideoModal: React.FC<WelcomeVideoModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<ROIFormValues>({
    businessType: 'marketplace',
    monthlyTransactions: '500-2000',
    mainProblem: 'unknown_loss',
    email: '',
    name: '',
    wantsAnalysis: true,
    wantsDemo: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [videoPlaying, setVideoPlaying] = useState(false);

  // Detectar cuando el video empieza a reproducirse
  useEffect(() => {
    const video = document.getElementById('welcome-video') as HTMLVideoElement;
    if (video) {
      const handlePlay = () => setVideoPlaying(true);
      const handlePause = () => setVideoPlaying(false);
      
      video.addEventListener('play', handlePlay);
      video.addEventListener('pause', handlePause);
      
      return () => {
        video.removeEventListener('play', handlePlay);
        video.removeEventListener('pause', handlePause);
      };
    }
  }, [isOpen]);

  // Keyboard handling (ESC to close)
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !submitted) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, submitted, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validación email
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Por favor ingresa un email válido');
      return;
    }

    setIsSubmitting(true);

    try {
      await submitROIForm(formData);
      setSubmitted(true);
      
      // Marcar como completado en localStorage
      try {
        localStorage.setItem('dygsom_roi_form_submitted', 'true');
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
      
      // Auto-cerrar después de 5 segundos
      setTimeout(() => {
        onClose();
      }, 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al enviar. Intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && !submitted) {
      onClose();
    }
  };

  // Success state
  if (submitted) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm"
        onClick={handleBackdropClick}
      >
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-8 text-center animate-slideIn">
          <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">¡Perfecto! 🎉</h3>
          <p className="text-gray-600 mb-4">
            Recibirás tu análisis personalizado en <strong>{formData.email}</strong> en las próximas 24 horas.
          </p>
          <p className="text-sm text-gray-500">Esta ventana se cerrará automáticamente...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-0 sm:p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="bg-white rounded-none sm:rounded-2xl shadow-2xl max-w-4xl w-full h-full sm:h-auto sm:max-h-[90vh] overflow-y-auto animate-slideIn">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 sm:p-4 md:p-6 rounded-t-none sm:rounded-t-2xl">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 text-white hover:bg-white hover:bg-opacity-20 rounded-full p-1.5 sm:p-2 transition-colors z-10"
            aria-label="Cerrar modal"
          >
            <FaTimes size={16} className="sm:w-[18px] sm:h-[18px] md:w-5 md:h-5" />
          </button>
          
          <h2 id="modal-title" className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2 pr-7 sm:pr-8">
            🎯 ¿Cuánto pierdes en fraude?
          </h2>
          <p className="text-blue-100 text-[10px] sm:text-xs md:text-sm">
            {WELCOME_MODAL_CONFIG.CTA_TEXT.replace('{spots}', String(WELCOME_MODAL_CONFIG.BETA_SPOTS_REMAINING))}
          </p>
        </div>

        <div className={FEATURE_FLAGS.WELCOME_MODAL_VIDEO_ENABLED ? "grid lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6 p-3 sm:p-4 md:p-6" : "p-3 sm:p-4 md:p-6"}>
          {/* Video Section - MÁS GRANDE */}
          {FEATURE_FLAGS.WELCOME_MODAL_VIDEO_ENABLED && (
            <div className="lg:col-span-3">
              <div className="bg-gray-900 rounded-lg sm:rounded-xl overflow-hidden shadow-lg relative">
                <video
                  id="welcome-video"
                  controls
                  playsInline
                  preload="auto"
                  className="w-full aspect-video object-contain"
                  aria-label="Video explicativo DYGSOM"
                  style={{ minHeight: '150px', maxHeight: '40vh' }}
                >
                  <source src={videoSrc} type="video/mp4" />
                  Tu navegador no soporta el video.
                </video>
                {/* Indicador para hacer play - desaparece cuando se reproduce */}
                {!videoPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-black bg-opacity-40">
                    <div className="bg-blue-600 bg-opacity-95 text-white px-3 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold shadow-2xl animate-pulse">
                      ▶️ Haz clic en PLAY
                    </div>
                  </div>
                )}
              </div>
              <p className="text-[10px] sm:text-xs text-gray-500 mt-1 sm:mt-2 text-center leading-tight">
                ⏱️ 30 seg | 🔊 Con audio
              </p>
            </div>
          )}

          {/* Form Section */}
          <div className={FEATURE_FLAGS.WELCOME_MODAL_VIDEO_ENABLED ? "lg:col-span-2" : "w-full"}>
            <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-3 md:space-y-4">
              {/* Pregunta 1: Tipo de negocio */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                  1️⃣ ¿Qué tipo de negocio tienes?
                </label>
                <select
                  value={formData.businessType}
                  onChange={(e) => setFormData({ ...formData, businessType: e.target.value as any })}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="marketplace">🛒 Marketplace (ej: tienda online)</option>
                  <option value="services">💼 Servicios (ej: SaaS, consultoría)</option>
                  <option value="physical">🏪 Comercio físico con pagos digitales</option>
                  <option value="fintech">💳 Fintech / Pagos</option>
                  <option value="other">🔧 Otro</option>
                </select>
              </div>

              {/* Pregunta 2: Volumen de transacciones */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                  2️⃣ ¿Cuántas transacciones procesas al mes?
                </label>
                <select
                  value={formData.monthlyTransactions}
                  onChange={(e) => setFormData({ ...formData, monthlyTransactions: e.target.value as any })}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="<500">📊 Menos de 500</option>
                  <option value="500-2000">📈 500 - 2,000</option>
                  <option value="2000-10000">🚀 2,000 - 10,000</option>
                  <option value=">10000">💎 Más de 10,000</option>
                </select>
              </div>

              {/* Pregunta 3: Problema principal */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                  3️⃣ ¿Cuál es tu mayor dolor de cabeza?
                </label>
                <select
                  value={formData.mainProblem}
                  onChange={(e) => setFormData({ ...formData, mainProblem: e.target.value as any })}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="confirmed_fraud">🚨 Fraudes confirmados (chargebacks)</option>
                  <option value="false_declines">😤 Rechazos de clientes buenos</option>
                  <option value="unknown_loss">❓ No sé cuánto pierdo realmente</option>
                  <option value="all_good">✅ Todo bajo control (solo curiosidad)</option>
                </select>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                  📧 Email para recibir tu análisis
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="tu@empresa.com"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Nombre (opcional) */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1.5 sm:mb-2">
                  👤 Nombre (opcional)
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ej: Juan Pérez"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Checkboxes */}
              <div className="space-y-2 bg-blue-50 p-3 sm:p-4 rounded-lg">
                <label className="flex items-start space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.wantsAnalysis}
                    onChange={(e) => setFormData({ ...formData, wantsAnalysis: e.target.checked })}
                    className="mt-0.5 sm:mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded flex-shrink-0"
                  />
                  <span className="text-xs sm:text-sm text-gray-700">
                    ✅ Quiero mi <strong>análisis de pérdidas GRATIS</strong>
                  </span>
                </label>

                <label className="flex items-start space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.wantsDemo}
                    onChange={(e) => setFormData({ ...formData, wantsDemo: e.target.checked })}
                    className="mt-0.5 sm:mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded flex-shrink-0"
                  />
                  <span className="text-xs sm:text-sm text-gray-700">
                    📞 Agendar <strong>demo personalizada</strong> (20 min)
                  </span>
                </label>
              </div>

              {/* Error message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-xs sm:text-sm">
                  {error}
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg text-sm sm:text-base"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <FaSpinner className="animate-spin mr-2" />
                    Enviando...
                  </span>
                ) : (
                  'Guardar'
                )}
              </button>

              <p className="text-xs text-gray-500 text-center">
                Al enviar, aceptas recibir el análisis por email. Respetamos tu privacidad.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
