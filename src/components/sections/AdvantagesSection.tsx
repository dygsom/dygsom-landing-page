import React from 'react';
import { FaBrain, FaDollarSign, FaRocket, FaHeadset } from 'react-icons/fa';
import { FeatureCard } from '../ui/FeatureCard';

export const AdvantagesSection: React.FC = () => {
  return (
    <section className="py-12 md:py-20 px-4 md:px-6 bg-slate-900" id="ventajas">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-dygsom-light-text mb-8 md:mb-12">
          Nuestra Ventaja Competitiva
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <FeatureCard
            icon={<FaBrain />}
            title="ML Localizado"
            description="Modelos entrenados con patrones de fraude peruanos y latinos para una precisión insuperable."
          />
          <FeatureCard
            icon={<FaDollarSign />}
            title="Pricing Accesible"
            description="Hasta 70% más económico que la competencia internacional, sin comprometer la calidad."
          />
          <FeatureCard
            icon={<FaRocket />}
            title="Latencia Ultra-Baja"
            description="Servidores en São Paulo garantizan decisiones en tiempo real (<100ms) para tus transacciones."
          />
          <FeatureCard
            icon={<FaHeadset />}
            title="Soporte Local"
            description="Asistencia en español, con conocimiento profundo del mercado y horario local."
          />
        </div>
      </div>
    </section>
  );
};
