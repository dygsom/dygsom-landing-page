import React from 'react';

export const SocialProofSection: React.FC = () => {
  return (
    <section className="py-12 md:py-20 px-4 md:px-6 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-6xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-50 mb-4">
            Tiendas Peruanas Confían en DYGSOM
          </h2>
        </div>

        {/* Disclaimer Banner */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-yellow-900/30 border-2 border-yellow-400 rounded-xl p-4 md:p-6 text-center">
            <p className="text-sm md:text-base text-slate-200">
              <span className="text-2xl mr-2">⚠️</span>
              <strong className="text-yellow-300">Casos simulados para fines ilustrativos.</strong>
              <span className="text-yellow-200"> Actualmente en fase piloto con clientes en validación. Métricas basadas en promedios industria LATAM y benchmark interno.</span>
            </p>
          </div>
        </div>

        {/* Case Study Card */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700/50 p-6 md:p-10 relative">

            {/* Simulated Case Badge */}
            <div className="absolute -top-3 -right-3 bg-yellow-500 text-slate-900 px-4 py-1 rounded-full text-xs font-bold shadow-lg">
              Caso Simulado
            </div>

            {/* Quote */}
            <div className="mb-6">
              <svg className="w-10 h-10 text-green-400/30 mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
              </svg>
              <p className="text-lg md:text-xl text-slate-200 leading-relaxed italic">
                "Antes perdíamos clientes de los conos porque su dirección era 'confusa' para el sistema. Con DYGSOM, ese contexto es normal y aprobamos ventas que antes rechazábamos por error."
              </p>
            </div>

            {/* Author */}
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-700">
              <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                CM
              </div>
              <div>
                <p className="text-slate-200 font-bold text-base md:text-lg">Carlos M.</p>
                <p className="text-slate-400 text-sm md:text-base">Gerente Ops - [Tienda Gaming Lima]*</p>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-5 text-center">
                <p className="text-3xl md:text-4xl font-extrabold text-green-400 mb-1">+S/. 9,000</p>
                <p className="text-sm md:text-base text-slate-300">Recuperado/mes</p>
              </div>
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-5 text-center">
                <p className="text-3xl md:text-4xl font-extrabold text-green-400 mb-1">-70%</p>
                <p className="text-sm md:text-base text-slate-300">Rechazos falsos</p>
              </div>
            </div>

          </div>
        </div>

        {/* Client Logos Placeholder */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 md:p-8 text-center">
            <p className="text-slate-400 text-sm md:text-base mb-6">Próximamente:</p>

            <div className="grid grid-cols-3 gap-4 md:gap-6 mb-6">
              <div className="bg-slate-700/30 border border-slate-600/50 rounded-lg p-6 md:p-8 flex items-center justify-center">
                <span className="text-slate-500 text-xs md:text-sm font-medium">[Cliente 1]</span>
              </div>
              <div className="bg-slate-700/30 border border-slate-600/50 rounded-lg p-6 md:p-8 flex items-center justify-center">
                <span className="text-slate-500 text-xs md:text-sm font-medium">[Cliente 2]</span>
              </div>
              <div className="bg-slate-700/30 border border-slate-600/50 rounded-lg p-6 md:p-8 flex items-center justify-center">
                <span className="text-slate-500 text-xs md:text-sm font-medium">[Cliente 3]</span>
              </div>
            </div>

            <p className="text-xs text-slate-500 italic">
              *Testimonios en validación. Clientes piloto actuales.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
