import React from 'react';
import { DygsomArchitectureAnimation } from './DygsomArchitectureAnimation';
import { FaCheckCircle } from 'react-icons/fa';

export const SolutionArchitectureSection: React.FC = () => {
  return (
    <section className="py-12 md:py-20 px-4 md:px-6 bg-slate-950" id="solucion">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-dygsom-light-text mb-4 md:mb-6">
            DYGSOM: tu cerebro antifraude en la nube
          </h2>
        </div>
        
        <div className="max-w-4xl mx-auto mb-10 md:mb-12 space-y-6 text-slate-300">
          <p className="text-base md:text-lg leading-relaxed">
            DYGSOM es una plataforma antifraude especializada en e-commerce y fintech, que analiza cada transacción en tiempo real combinando reglas inteligentes y modelos de machine learning entrenados con datos del contexto latinoamericano.
          </p>
          
          <p className="text-base md:text-lg leading-relaxed">
            Nuestro motor de riesgo evalúa el comportamiento, el dispositivo, la ubicación, el historial y otros patrones clave para asignar un score de riesgo y una decisión automática: aprobar, revisar o rechazar.
          </p>
          
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 md:p-8 mt-8">
            <h3 className="text-xl md:text-2xl font-bold text-dygsom-light-text mb-6">Con DYGSOM puedes:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <FaCheckCircle className="text-dygsom-green text-xl mt-1 flex-shrink-0" />
                <p className="text-slate-300">Reducir pérdidas por fraude y devoluciones de cargo</p>
              </div>
              <div className="flex items-start gap-3">
                <FaCheckCircle className="text-dygsom-green text-xl mt-1 flex-shrink-0" />
                <p className="text-slate-300">Disminuir falsos positivos y no rechazar clientes buenos</p>
              </div>
              <div className="flex items-start gap-3">
                <FaCheckCircle className="text-dygsom-green text-xl mt-1 flex-shrink-0" />
                <p className="text-slate-300">Ganar visibilidad sobre patrones de fraude en tus canales digitales</p>
              </div>
              <div className="flex items-start gap-3">
                <FaCheckCircle className="text-dygsom-green text-xl mt-1 flex-shrink-0" />
                <p className="text-slate-300">Escalar tu operación sin aumentar el tamaño de tu equipo de riesgo</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-12">
        <DygsomArchitectureAnimation />
      </div>
    </section>
  );
};
