/*
 * Copyright (c) 2025 DYGSOM
 * SPDX-License-Identifier: Proprietary
 */

import React, { useEffect } from 'react';
import { FaTimes, FaCalendarAlt } from 'react-icons/fa';
import { Button } from '../ui/Button';
import { trackExitIntent } from '../../utils/analytics';

interface ExitIntentPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExitIntentPopup: React.FC<ExitIntentPopupProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      trackExitIntent('shown');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConsultaClick = () => {
    trackExitIntent('accepted');
    // Scroll al formulario de demo
    const contactSection = document.getElementById('contacto');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl shadow-2xl border-2 border-green-500/50 max-w-lg w-full mx-4 p-6 md:p-8 animate-slideUp">
        
        {/* Close Button */}
        <button
          onClick={() => {
            trackExitIntent('dismissed');
            onClose();
          }}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 transition-colors"
          aria-label="Cerrar"
        >
          <FaTimes className="text-xl" />
        </button>

        {/* Content */}
        <div className="text-center">
          <div className="mb-4">
            <FaCalendarAlt className="text-green-400 text-5xl mx-auto mb-3" />
          </div>

          <h3 className="text-2xl md:text-3xl font-extrabold text-slate-50 mb-3">
            ¡Espera un momento!
          </h3>

          <p className="text-base md:text-lg text-slate-300 mb-6 leading-relaxed">
            Antes de irte, ¿te gustaría una <span className="text-green-400 font-bold">consulta gratuita de 15 minutos</span> para analizar tu caso específico?
          </p>

          <div className="bg-slate-800/50 rounded-lg p-4 mb-6 border border-slate-700/50">
            <p className="text-sm text-slate-400 mb-2">
              Te ayudaremos a:
            </p>
            <ul className="text-sm text-slate-300 space-y-2 text-left">
              <li className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span>Estimar cuánto pierdes en fraude actualmente</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span>Identificar qué pilar resolvería tu mayor problema</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400">✓</span>
                <span>Calcular ROI específico para tu negocio</span>
              </li>
            </ul>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              size="lg"
              className="flex-1"
              onClick={handleConsultaClick}
            >
              Sí, agendar consulta gratis
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="flex-1"
              onClick={() => {
                trackExitIntent('dismissed');
                onClose();
              }}
            >
              No gracias
            </Button>
          </div>

          <p className="text-xs text-slate-500 mt-4">
            Sin compromiso · 15 minutos · 100% gratis
          </p>
        </div>

      </div>
    </div>
  );
};
