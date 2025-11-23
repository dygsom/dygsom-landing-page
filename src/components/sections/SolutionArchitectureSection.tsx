import React from 'react';
import { DygsomArchitectureAnimation } from './DygsomArchitectureAnimation';

export const SolutionArchitectureSection: React.FC = () => {
  return (
    <section className="py-12 md:py-20 px-4 md:px-6 bg-slate-950" id="solucion">
      <div className="max-w-7xl mx-auto text-center mb-8 md:mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-dygsom-light-text mb-3 md:mb-4">
          Nuestra Solución: Arquitectura Robusta y de Alto Rendimiento
        </h2>
        <p className="text-base md:text-lg text-slate-400 max-w-3xl mx-auto px-4">
          Descubre cómo DYGSOM procesa tus transacciones en menos de 100ms utilizando una arquitectura API-first basada en AWS y Machine Learning.
        </p>
      </div>
      
      <div className="max-w-7xl mx-auto">
        <DygsomArchitectureAnimation />
      </div>
    </section>
  );
};
