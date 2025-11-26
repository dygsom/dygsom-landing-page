import React from 'react';
import { FaChartLine, FaCheckCircle, FaRocket, FaTachometerAlt, FaCloud, FaGlobeAmericas } from 'react-icons/fa';
import { FeatureCard } from '../ui/FeatureCard';

export const AdvantagesSection: React.FC = () => {
  return (
    <section className="py-12 md:py-20 px-4 md:px-6 bg-slate-950" id="ventajas">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-dygsom-light-text mb-4">
            Beneficios para tu negocio
          </h2>
          <p className="text-base md:text-lg text-slate-300 max-w-3xl mx-auto">
            Con DYGSOM no solo detectas fraude: mejoras la rentabilidad y la experiencia de tus clientes buenos.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <FeatureCard
            icon={<FaChartLine />}
            title="Menos pérdidas por fraude"
            description="Reduce el impacto de transacciones fraudulentas y chargebacks en tu rentabilidad."
          />
          <FeatureCard
            icon={<FaCheckCircle />}
            title="Menos falsos positivos"
            description="Evita rechazar transacciones legítimas que afectan tus ventas y la experiencia del cliente."
          />
          <FeatureCard
            icon={<FaRocket />}
            title="Integración rápida"
            description="API simple, documentación clara y soporte cercano durante el onboarding."
          />
          <FeatureCard
            icon={<FaTachometerAlt />}
            title="Visibilidad total"
            description="Panel de control con métricas de fraude, volúmenes, decisiones y tendencias."
          />
          <FeatureCard
            icon={<FaCloud />}
            title="Escalabilidad"
            description="Arquitectura en la nube preparada para crecer con tu volumen de transacciones."
          />
          <FeatureCard
            icon={<FaGlobeAmericas />}
            title="Enfoque regional"
            description="Modelos y reglas pensadas para las particularidades de Latinoamérica."
          />
        </div>
      </div>
    </section>
  );
};
