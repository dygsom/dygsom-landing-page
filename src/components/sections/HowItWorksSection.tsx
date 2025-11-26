import React from 'react';
import { FaPlug, FaBrain, FaCheckCircle, FaChartBar } from 'react-icons/fa';

export const HowItWorksSection: React.FC = () => {
  return (
    <section className="py-12 md:py-20 px-4 md:px-6 bg-slate-900" id="como-funciona">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold text-dygsom-light-text mb-4">
            ¿Cómo funciona en tu operación?
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
                <h3 className="text-xl md:text-2xl font-bold text-dygsom-light-text">Conexión</h3>
              </div>
              <p className="text-slate-300 text-base md:text-lg leading-relaxed">
                Conectamos tu e-commerce, pasarela de pagos o plataforma fintech mediante una API REST sencilla, con ejemplos listos para tu equipo técnico.
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
                <h3 className="text-xl md:text-2xl font-bold text-dygsom-light-text">Evaluación en tiempo real</h3>
              </div>
              <p className="text-slate-300 text-base md:text-lg leading-relaxed">
                Cada transacción se envía a DYGSOM, donde se procesan señales de comportamiento, dispositivo, ubicación y reglas de negocio para calcular un score de riesgo.
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
                <h3 className="text-xl md:text-2xl font-bold text-dygsom-light-text">Decisión y acción</h3>
              </div>
              <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-4">
                Devolvemos una decisión clara (APPROVE, REVIEW o REJECT) junto con las principales razones. Puedes automatizar acciones en tus sistemas o derivar los casos en revisión a tu equipo de riesgo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
