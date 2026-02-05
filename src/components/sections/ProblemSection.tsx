/*
 * Copyright (c) 2025 DYGSOM
 * SPDX-License-Identifier: Proprietary
 */

import React from 'react';

export const ProblemSection: React.FC = () => {
  return (
    <section id="problema" className="py-12 md:py-20 px-4 md:px-6 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-50 mb-4">
            3 Amenazas que Afectan tu E-commerce
          </h2>
          <p className="text-base md:text-lg text-slate-400 max-w-3xl mx-auto">
            Fraude, bots y falsos positivos impactan directamente tus ingresos
          </p>
        </div>

        {/* Problem Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-10 md:mb-16">

          {/* Card 1 - Fraude Real */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl shadow-xl border border-red-500/30 p-6 md:p-8 hover:border-red-500/50 transition-all">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-red-500/10 rounded-full">
              <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-red-400 mb-3 text-center">Fraude Real</h3>
            <p className="text-3xl md:text-4xl font-extrabold text-red-400 text-center mb-3">2-3%</p>
            <p className="text-sm md:text-base text-slate-300 text-center mb-4">de ventas perdidas por transacciones fraudulentas</p>
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <p className="text-xs md:text-sm text-slate-300 text-center">
                Chargebacks, cuenta clonadas, patrones anómalos
              </p>
            </div>
          </div>

          {/* Card 2 - Bots */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl shadow-xl border border-sky-500/30 p-6 md:p-8 hover:border-sky-500/50 transition-all">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-sky-500/10 rounded-full">
              <svg className="w-8 h-8 text-sky-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 7H7v6h6V7z" />
                <path fillRule="evenodd" d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-sky-400 mb-3 text-center">Tráfico Bot</h3>
            <p className="text-3xl md:text-4xl font-extrabold text-sky-400 text-center mb-3">40%</p>
            <p className="text-sm md:text-base text-slate-300 text-center mb-4">del tráfico web es bot malicioso (scraping, ataques)</p>
            <div className="bg-sky-500/10 border border-sky-500/30 rounded-lg p-4">
              <p className="text-xs md:text-sm text-slate-300 text-center">
                Eleva costos de infraestructura 40-60% sin generar ventas
              </p>
            </div>
          </div>

          {/* Card 3 - Falsos Positivos (HIGHLIGHTED) */}
          <div className="bg-gradient-to-br from-red-900/40 to-slate-900 backdrop-blur-sm rounded-2xl shadow-2xl border-2 border-red-500 p-6 md:p-8 transform scale-100 md:scale-105 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-red-500 text-white text-xs font-bold px-4 py-1 rounded-full">
              MAYOR IMPACTO
            </div>
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-red-500/20 rounded-full">
              <svg className="w-8 h-8 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-red-400 mb-3 text-center">
              Clientes Legítimos Rechazados
            </h3>
            <p className="text-3xl md:text-4xl font-extrabold text-red-400 text-center mb-3">8-12%</p>
            <p className="text-sm md:text-base text-slate-300 text-center mb-4">de transacciones válidas bloqueadas por error</p>
            <div className="bg-red-500/20 border-2 border-red-500/50 rounded-lg p-4">
              <p className="text-xs md:text-sm text-slate-300 text-center">
                Sistemas sin contexto local marcan patrones normales como fraude
              </p>
            </div>
          </div>

        </div>

        {/* Total Loss Summary */}
        <div className="max-w-2xl mx-auto bg-gradient-to-br from-red-900/30 to-slate-900/50 backdrop-blur-sm rounded-2xl shadow-2xl border-2 border-red-500/50 p-6 md:p-8 text-center">
          <p className="text-sm md:text-base text-slate-400 uppercase tracking-wide mb-2">IMPACTO COMBINADO:</p>
          <h3 className="text-3xl md:text-4xl font-extrabold text-red-400 mb-3">
            Hasta 15% de Ingresos en Riesgo
          </h3>
          <p className="text-base text-slate-300 mb-4">
            DYGSOM protege tus 4 pilares críticos en una sola plataforma
          </p>
          <div className="flex justify-center gap-2 text-xs text-slate-400">
            <span>Bot Detection</span>
            <span>•</span>
            <span>Account Protection</span>
            <span>•</span>
            <span>API Security</span>
            <span>•</span>
            <span>Fraud Patterns</span>
          </div>
        </div>

      </div>
    </section>
  );
};
