import React from 'react';
import { DygsomArchitectureAnimation } from './DygsomArchitectureAnimation';

export const SolutionArchitectureSection: React.FC = () => {
  return (
    <section className="py-12 md:py-20 px-4 md:px-6 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" id="solucion">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-50 mb-4">
            DYGSOM: Inteligencia Local para Decisiones Globales
          </h2>
          <p className="text-base md:text-lg text-slate-400 max-w-3xl mx-auto">
            No reemplazamos tu pasarela. Añadimos una capa de inteligencia que trabaja en conjunto con tus sistemas actuales.
          </p>
        </div>

        {/* Flow Diagram Visual */}
        <div className="max-w-4xl mx-auto mb-12 md:mb-16">
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700/50 p-6 md:p-10">
            <div className="flex flex-col items-center space-y-4 text-center">

              <div className="w-full max-w-xs bg-blue-500/10 border-2 border-blue-500/50 rounded-xl p-4">
                <p className="text-blue-400 font-bold text-sm md:text-base">Cliente Compra</p>
              </div>

              <div className="text-2xl text-slate-500">↓</div>

              <div className="w-full max-w-xs bg-orange-500/10 border-2 border-orange-500/50 rounded-xl p-4">
                <p className="text-orange-400 font-bold text-sm md:text-base">Tu Pasarela Actual</p>
              </div>

              <div className="text-2xl text-slate-500">↓</div>

              <div className="w-full max-w-md bg-green-500/20 border-2 border-green-500 rounded-xl p-6 relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  DYGSOM
                </div>
                <p className="text-green-400 font-bold text-base md:text-lg mb-2">🛡️ Analiza en tiempo real</p>
                <p className="text-xs md:text-sm text-slate-300">70+ señales • &lt;100ms</p>
              </div>

              <div className="text-2xl text-slate-500">↓</div>

              <div className="w-full max-w-xs bg-slate-700/30 border border-slate-600/50 rounded-xl p-4">
                <p className="text-slate-300 font-bold text-sm md:text-base">Decisión Inteligente</p>
              </div>

              <div className="text-2xl text-slate-500">↓</div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
                <div className="bg-green-500/10 border border-green-500/50 rounded-lg p-3">
                  <p className="text-green-400 font-bold text-xs md:text-sm">✅ APROBAR</p>
                  <p className="text-xs text-slate-400">(más ventas)</p>
                </div>
                <div className="bg-yellow-500/10 border border-yellow-500/50 rounded-lg p-3">
                  <p className="text-yellow-400 font-bold text-xs md:text-sm">⚠️ REVISAR</p>
                  <p className="text-xs text-slate-400">(manual)</p>
                </div>
                <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3">
                  <p className="text-red-400 font-bold text-xs md:text-sm">❌ RECHAZAR</p>
                  <p className="text-xs text-slate-400">(fraude real)</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Comparison: Traditional vs DYGSOM */}
        <div className="max-w-5xl mx-auto mb-12 md:mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-slate-200 text-center mb-8">
            La Diferencia del Contexto Local
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Traditional System */}
            <div className="bg-gradient-to-br from-red-900/20 to-slate-900/50 backdrop-blur-sm rounded-2xl shadow-xl border border-red-500/30 p-6">
              <h4 className="text-lg font-bold text-red-400 mb-4 text-center">Sistema Tradicional</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-slate-300">
                  <span className="text-red-400">❌</span>
                  <span>Entrenado con data USA/Europa</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-300">
                  <span className="text-red-400">❌</span>
                  <span>Dirección SJL = Sospechoso</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-300">
                  <span className="text-red-400">❌</span>
                  <span>VPN corporativo = Fraude</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-300">
                  <span className="text-red-400">❌</span>
                  <span>Compra 11pm = Riesgo alto</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-300">
                  <span className="text-red-400">❌</span>
                  <span>Email .com.pe = Raro</span>
                </li>
              </ul>
              <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-xs font-semibold text-red-400 text-center">Cliente legítimo RECHAZADO</p>
              </div>
            </div>

            {/* DYGSOM */}
            <div className="bg-gradient-to-br from-green-900/30 to-slate-900 backdrop-blur-sm rounded-2xl shadow-2xl border-2 border-green-500 p-6">
              <h4 className="text-lg font-bold text-green-400 mb-4 text-center">DYGSOM (IA Local)</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-slate-300">
                  <span className="text-green-400">✅</span>
                  <span>Entrenado con data Perú</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-300">
                  <span className="text-green-400">✅</span>
                  <span>Dirección SJL = Normal</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-300">
                  <span className="text-green-400">✅</span>
                  <span>VPN corporativo conocido = OK</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-300">
                  <span className="text-green-400">✅</span>
                  <span>Compra 11pm = Común Perú</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-300">
                  <span className="text-green-400">✅</span>
                  <span>Email .com.pe = Legítimo</span>
                </li>
              </ul>
              <div className="mt-4 p-3 bg-green-500/20 border-2 border-green-500/50 rounded-lg">
                <p className="text-xs font-semibold text-green-400 text-center">Cliente legítimo APROBADO</p>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12">

          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl shadow-xl border border-slate-700/50 p-6 hover:border-green-500/50 transition-all">
            <div className="text-3xl mb-3">📈</div>
            <h3 className="text-lg md:text-xl font-bold text-slate-200 mb-2">+6% Más Ventas</h3>
            <p className="text-sm md:text-base text-slate-400">Reduce false positives de 8% a 2%</p>
          </div>

          <div className="bg-gradient-to-br from-green-900/30 to-slate-900 backdrop-blur-sm rounded-xl shadow-xl border-2 border-green-500 p-6 transform scale-100 md:scale-105">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="text-lg md:text-xl font-bold text-green-400 mb-2">87% Precisión</h3>
            <p className="text-sm md:text-base text-slate-300">Atrapa fraude real sin sacrificar ventas</p>
          </div>

          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl shadow-xl border border-slate-700/50 p-6 hover:border-green-500/50 transition-all">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="text-lg md:text-xl font-bold text-slate-200 mb-2">&lt;100ms Respuesta</h3>
            <p className="text-sm md:text-base text-slate-400">Tiempo real, sin fricción</p>
          </div>

          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl shadow-xl border border-slate-700/50 p-6 hover:border-green-500/50 transition-all">
            <div className="text-3xl mb-3">🔧</div>
            <h3 className="text-lg md:text-xl font-bold text-slate-200 mb-2">30 Min Integración</h3>
            <p className="text-sm md:text-base text-slate-400">Funciona con tu stack actual</p>
          </div>

        </div>

        {/* Architecture Animation */}
        <div className="mt-12">
          <DygsomArchitectureAnimation />
        </div>

      </div>
    </section>
  );
};
