import React from 'react';

export const ProblemSection: React.FC = () => {
  return (
    <section id="problema" className="py-12 md:py-20 px-4 md:px-6 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-50 mb-4">
            El Costo Oculto del E-commerce en LATAM
          </h2>
          <p className="text-base md:text-lg text-slate-400 max-w-3xl mx-auto">
            No solo pierdes por fraude. Pierdes mucho más por rechazos falsos.
          </p>
        </div>

        {/* Problem Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-10 md:mb-16">

          {/* Card 1 - Fraude Real */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl shadow-xl border border-red-500/30 p-6 md:p-8 hover:border-red-500/50 transition-all">
            <div className="text-5xl mb-4 text-center">❌</div>
            <h3 className="text-xl md:text-2xl font-bold text-red-400 mb-3 text-center">Pierdes en Fraude</h3>
            <p className="text-3xl md:text-4xl font-extrabold text-red-400 text-center mb-3">3.7%</p>
            <p className="text-sm md:text-base text-slate-300 text-center mb-4">de tus ventas</p>
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <p className="text-xs md:text-sm text-slate-300 text-center">
                Para tienda de S/. 500K/año =
              </p>
              <p className="text-lg md:text-xl font-bold text-red-400 text-center">
                S/. 18,500 perdidos
              </p>
            </div>
          </div>

          {/* Card 2 - Falsos Positivos (HIGHLIGHTED) */}
          <div className="bg-gradient-to-br from-red-900/40 to-slate-900 backdrop-blur-sm rounded-2xl shadow-2xl border-2 border-red-500 p-6 md:p-8 transform scale-100 md:scale-105 relative">
            {/* Highlight badge */}
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-red-500 text-white text-xs font-bold px-4 py-1 rounded-full">
              EL MÁS IMPORTANTE
            </div>

            <div className="text-5xl mb-4 text-center">💸</div>
            <h3 className="text-xl md:text-2xl font-bold text-red-400 mb-3 text-center">
              Pierdes AÚN MÁS en Rechazos Falsos
            </h3>
            <p className="text-3xl md:text-4xl font-extrabold text-red-400 text-center mb-3">8-12%</p>
            <p className="text-sm md:text-base text-slate-300 text-center mb-4">de transacciones legítimas rechazadas por sistemas no localizados</p>
            <div className="bg-red-500/20 border-2 border-red-500/50 rounded-lg p-4 mb-4">
              <p className="text-xs md:text-sm text-slate-300 text-center">
                Para tienda de S/. 500K/año =
              </p>
              <p className="text-lg md:text-xl font-bold text-red-300 text-center">
                S/. 40,000 en ventas perdidas
              </p>
            </div>
            <p className="text-xs text-slate-400 text-center italic mt-3">
              Fuente: Cybersource LATAM Report 2024
            </p>
          </div>

          {/* Card 3 - Tiempo Perdido */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl shadow-xl border border-orange-500/30 p-6 md:p-8 hover:border-orange-500/50 transition-all">
            <div className="text-5xl mb-4 text-center">⏱️</div>
            <h3 className="text-xl md:text-2xl font-bold text-orange-400 mb-3 text-center">Pierdes Tiempo</h3>
            <p className="text-3xl md:text-4xl font-extrabold text-orange-400 text-center mb-3">20 horas</p>
            <p className="text-sm md:text-base text-slate-300 text-center mb-4">/semana</p>
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
              <p className="text-xs md:text-sm text-slate-300 text-center">
                Revisando manualmente transacciones "sospechosas"
              </p>
            </div>
          </div>

        </div>

        {/* Total Loss Summary */}
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-red-900/30 to-slate-900/50 backdrop-blur-sm rounded-2xl shadow-2xl border-2 border-red-500/50 p-6 md:p-10 text-center">
          <p className="text-sm md:text-base text-slate-400 uppercase tracking-wide mb-2">TOTAL PÉRDIDA ANUAL:</p>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-red-400 mb-4">
            S/. 58,500/año
          </h3>
          <p className="text-base md:text-lg text-slate-300 font-medium mb-6">
            Los sistemas antifraude tradicionales necesitan contexto local
          </p>

          {/* Why This Happens */}
          <div className="bg-slate-800/50 rounded-xl p-6 text-left space-y-4">
            <h4 className="text-lg font-bold text-slate-200 mb-4">¿Por Qué Pasa Esto?</h4>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-yellow-400 text-xl flex-shrink-0">⚠️</span>
                <div>
                  <p className="text-sm font-semibold text-slate-300">Algoritmos Entrenados en USA/Europa</p>
                  <p className="text-xs text-slate-400">No reconocen patrones de compra peruanos como legítimos</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-yellow-400 text-xl flex-shrink-0">⚠️</span>
                <div>
                  <p className="text-sm font-semibold text-slate-300">Direcciones Informales = "Sospechoso"</p>
                  <p className="text-xs text-slate-400">SJL, VMT, direcciones con referencia son marcadas como riesgo</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-yellow-400 text-xl flex-shrink-0">⚠️</span>
                <div>
                  <p className="text-sm font-semibold text-slate-300">Comportamiento Local = "Fraude"</p>
                  <p className="text-xs text-slate-400">Compras nocturnas, VPNs corporativos, emails .pe son señales falsas</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-red-500/30">
            <p className="text-xs md:text-sm text-slate-400 italic">
              * Cálculo basado en tienda con S/. 500K/año en ventas. Usa nuestra calculadora para ver tu caso específico.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
