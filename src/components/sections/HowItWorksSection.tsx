import React from 'react';
import { FaPlug, FaBrain, FaCheckCircle, FaChartBar } from 'react-icons/fa';

export const HowItWorksSection: React.FC = () => {
  return (
    <section className="py-12 md:py-20 px-4 md:px-6 bg-slate-900" id="como-funciona">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold text-dygsom-light-text mb-4">
            ¿Cómo funciona DYGSOM?
          </h2>
        </div>

        <div className="space-y-8 md:space-y-12">
          {/* Paso 1 */}
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-dygsom-blue to-blue-600 flex items-center justify-center shadow-lg">
                <FaPlug className="text-2xl md:text-3xl text-white" />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-dygsom-blue font-bold text-lg md:text-xl">Paso 1</span>
                <h3 className="text-xl md:text-2xl font-bold text-dygsom-light-text">Conecta tu sistema</h3>
              </div>
              <p className="text-slate-300 text-base md:text-lg leading-relaxed">
                Integra tu e-commerce, pasarela de pagos o core transaccional a través de nuestra API REST. Te entregamos ejemplos de integración y soporte técnico para que el onboarding sea rápido.
              </p>
            </div>
          </div>

          {/* Línea conectora */}
          <div className="hidden md:block ml-10 h-8 w-0.5 bg-gradient-to-b from-dygsom-blue to-dygsom-green"></div>

          {/* Paso 2 */}
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-dygsom-green to-green-600 flex items-center justify-center shadow-lg">
                <FaBrain className="text-2xl md:text-3xl text-white" />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-dygsom-green font-bold text-lg md:text-xl">Paso 2</span>
                <h3 className="text-xl md:text-2xl font-bold text-dygsom-light-text">Evaluamos cada transacción en tiempo real</h3>
              </div>
              <p className="text-slate-300 text-base md:text-lg leading-relaxed">
                Cada operación se envía a DYGSOM, donde se combina un motor de reglas con modelos de IA para calcular un score de riesgo y detectar patrones anómalos en milisegundos.
              </p>
            </div>
          </div>

          {/* Línea conectora */}
          <div className="hidden md:block ml-10 h-8 w-0.5 bg-gradient-to-b from-dygsom-green to-dygsom-accent"></div>

          {/* Paso 3 */}
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-dygsom-accent to-purple-600 flex items-center justify-center shadow-lg">
                <FaCheckCircle className="text-2xl md:text-3xl text-white" />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-dygsom-accent font-bold text-lg md:text-xl">Paso 3</span>
                <h3 className="text-xl md:text-2xl font-bold text-dygsom-light-text">Recibes una decisión clara y accionable</h3>
              </div>
              <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-4">
                Te devolvemos una decisión: <span className="font-bold text-dygsom-green">APPROVE</span>, <span className="font-bold text-yellow-400">REVIEW</span> o <span className="font-bold text-red-400">REJECT</span>, junto con los motivos principales. Puedes automatizar acciones en tu sistema o derivar casos en revisión a tu equipo de riesgo.
              </p>
              
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-4 md:p-6 mt-6">
                <div className="flex items-start gap-3">
                  <FaChartBar className="text-dygsom-blue text-2xl mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-lg font-semibold text-dygsom-light-text mb-2">Dashboard de monitoreo</h4>
                    <p className="text-slate-400 text-sm md:text-base">
                      Además, tendrás un dashboard donde podrás visualizar indicadores clave, tendencias de fraude y el impacto de DYGSOM en tus resultados.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
