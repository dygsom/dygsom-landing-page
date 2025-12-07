import React from 'react';
import { Button } from '../ui/Button';

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* Left Column - Hero Content */}
          <div className="text-center lg:text-left">
            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-slate-50 mb-4 md:mb-6" itemProp="name">
              Recupera S/. 50,000/Año en{' '}
              <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-yellow-400 bg-clip-text text-transparent">
                Ventas Rechazadas por Error
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg md:text-xl text-slate-300 mb-6 md:mb-8 leading-relaxed" itemProp="description">
              Los sistemas antifraude tradicionales rechazan 8% de clientes peruanos legítimos por no entender el contexto local. DYGSOM reduce esos rechazos 70%.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-2 sm:gap-3 md:gap-4 mb-8">
              <Button
                size="lg"
                className="text-base md:text-lg px-6 md:px-8 py-3 md:py-4"
                onClick={() => {
                  const calculatorSection = document.getElementById('calculator');
                  if (calculatorSection) {
                    calculatorSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                📊 ¿Cuánto Pierdes al Mes? (Gratis)
              </Button>
            </div>

            {/* CTA Subtitle */}
            <p className="text-sm text-slate-400 mb-8">
              Análisis en 2 minutos • Sin tarjeta
            </p>

            {/* Trust Bar */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 md:gap-6 text-sm md:text-base">
              <div className="flex items-center gap-2 text-slate-300">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span className="font-medium">Compatible con Tu Pasarela Actual</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span className="font-medium">87% Precisión</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span className="font-medium">Entrenado en Perú</span>
              </div>
            </div>
          </div>

          {/* Right Column - Hero Visual */}
          <div className="hidden lg:block">
            <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700/50 p-6 md:p-8">
              {/* Dashboard Mock */}
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-700">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-slate-300 font-semibold">Análisis en Tiempo Real</span>
                  </div>
                  <span className="text-xs text-slate-500">LIVE</span>
                </div>

                {/* Transaction Approved */}
                <div className="bg-green-500/10 border-2 border-green-500/50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-green-400 font-bold text-lg">✓ TRANSACCIÓN APROBADA</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-slate-500 text-xs">Fraud Score</p>
                      <p className="text-slate-200 font-mono font-bold text-xl">0.12</p>
                    </div>
                    <div>
                      <p className="text-slate-500 text-xs">Risk Level</p>
                      <p className="text-green-400 font-bold text-xl">LOW</p>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-green-500/20">
                    <p className="text-xs text-slate-400">Monto: S/. 2,450</p>
                    <p className="text-xs text-slate-400">Tiempo: 87ms</p>
                  </div>
                </div>

                {/* Alert */}
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
                  <p className="text-yellow-400 text-xs font-medium">⚠️ Sistema tradicional hubiera rechazado esto</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
