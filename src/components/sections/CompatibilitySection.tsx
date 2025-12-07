import React from 'react';

export const CompatibilitySection: React.FC = () => {
  return (
    <section className="py-12 md:py-16 px-4 md:px-6 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900">
      <div className="max-w-6xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-50 mb-4">
            Funciona Con Tu Stack Actual
          </h2>
          <p className="text-base md:text-lg text-slate-400 max-w-3xl mx-auto">
            DYGSOM no reemplaza tu pasarela de pagos. Añadimos una capa de inteligencia que trabaja <strong>en conjunto</strong> con tus sistemas actuales.
          </p>
        </div>

        {/* Compatible With Logos */}
        <div className="max-w-4xl mx-auto mb-10">
          <h3 className="text-xl md:text-2xl font-bold text-slate-300 text-center mb-6">
            Compatible Con:
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 flex flex-col items-center justify-center hover:border-green-500/50 transition-all">
              <div className="text-green-400 text-4xl mb-2">✓</div>
              <p className="text-slate-300 text-sm md:text-base font-semibold text-center">Niubiz</p>
            </div>

            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 flex flex-col items-center justify-center hover:border-green-500/50 transition-all">
              <div className="text-green-400 text-4xl mb-2">✓</div>
              <p className="text-slate-300 text-sm md:text-base font-semibold text-center">Izipay</p>
            </div>

            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 flex flex-col items-center justify-center hover:border-green-500/50 transition-all">
              <div className="text-green-400 text-4xl mb-2">✓</div>
              <p className="text-slate-300 text-sm md:text-base font-semibold text-center">Mercado Pago</p>
            </div>

            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 flex flex-col items-center justify-center hover:border-green-500/50 transition-all">
              <div className="text-green-400 text-4xl mb-2">✓</div>
              <p className="text-slate-300 text-sm md:text-base font-semibold text-center">Culqi</p>
            </div>
          </div>

          <p className="text-center text-slate-500 mt-6 text-sm">
            + Cualquier otra pasarela con API
          </p>
        </div>

        {/* How They Work Together */}
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700/50 p-6 md:p-10">
          <h3 className="text-xl md:text-2xl font-bold text-slate-200 text-center mb-8">
            Cómo Trabajan Juntos
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
            <div className="bg-blue-500/10 border-2 border-blue-500/50 rounded-xl p-4 text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">
                1
              </div>
              <p className="text-sm md:text-base text-slate-300 font-semibold">Cliente intenta comprar</p>
            </div>

            <div className="bg-orange-500/10 border-2 border-orange-500/50 rounded-xl p-4 text-center">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">
                2
              </div>
              <p className="text-sm md:text-base text-slate-300 font-semibold">Tu pasarela procesa pago</p>
            </div>

            <div className="bg-green-500/20 border-2 border-green-500 rounded-xl p-4 text-center">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">
                3
              </div>
              <p className="text-sm md:text-base text-green-400 font-bold">DYGSOM analiza contexto</p>
            </div>

            <div className="bg-slate-700/30 border border-slate-600/50 rounded-xl p-4 text-center">
              <div className="w-12 h-12 bg-slate-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-3">
                4
              </div>
              <p className="text-sm md:text-base text-slate-300 font-semibold">Tú decides: Aprobar/Revisar/Rechazar</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
