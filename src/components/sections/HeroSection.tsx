/*
 * Copyright (c) 2025 DYGSOM
 * SPDX-License-Identifier: Proprietary
 */

import React from 'react';
import { Button } from '../ui/Button';
import { ScanWidget } from '../scan/ScanWidget';
import { trackCTAClick } from '../../utils/analytics';

export const HeroSection: React.FC = () => {
  return (
    <section
      id="inicio"
      className="relative min-h-[85vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
      itemScope
      itemType="https://schema.org/SoftwareApplication"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(16,185,129,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-8 sm:py-12 md:py-20">
        <div className="max-w-5xl mx-auto">

          {/* Hero Content - Centered */}
          <div className="text-center">
            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-slate-50 mb-4 md:mb-6" itemProp="name">
              Plataforma Anti-Fraude{' '}
              <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-blue-400 bg-clip-text text-transparent">
                Integral
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl md:text-2xl text-slate-200 mb-3 md:mb-4 font-semibold">
              4 Pilares de Protección para E-commerce y Fintech
            </p>

            <p className="text-base sm:text-lg text-slate-300 mb-6 md:mb-8 leading-relaxed" itemProp="description">
              Bot Detection | Account Protection | API Security | Fraud Patterns
            </p>

            {/* Value Props */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 mb-8 md:mb-10 text-sm md:text-base text-slate-300">
              <div className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span>Setup en 6-8 horas</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span>83% más económico</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span>4 pilares integrados</span>
              </div>
            </div>

            {/* Inline Scan Widget */}
            <div className="mb-8">
              <ScanWidget />
            </div>

            {/* Scan CTA Microcopy */}
            <div className="flex justify-center mb-6">
              <p className="text-xs sm:text-sm text-green-400/80 font-medium">
                ⚡ 60 segundos • Sin registro • Completamente gratis
              </p>
            </div>

            {/* Secondary CTA - Agendar Demo */}
            <div className="flex justify-center gap-4 mb-6">
              <Button
                size="lg"
                variant="outline"
                className="text-sm md:text-base px-6 md:px-8 py-2 md:py-3"
                onClick={() => {
                  trackCTAClick('Agendar Demo', 'Hero Section');
                  const contactSection = document.getElementById('contacto');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                Agendar Demo
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-sm md:text-base px-6 md:px-8 py-2 md:py-3"
                onClick={() => {
                  trackCTAClick('Ver 4 Pilares', 'Hero Section');
                  const pilaresSection = document.getElementById('pilares');
                  if (pilaresSection) {
                    pilaresSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                Ver 4 Pilares
              </Button>
            </div>

            {/* Pricing Highlight */}
            <p className="text-sm text-slate-400">
              Desde S/. 699/mes | 30 días gratis | Sin tarjeta
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};
