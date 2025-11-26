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
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <FeatureCard
            icon={<FaChartLine />}
            title="Menos pérdidas"
            description="Reduce el impacto del fraude y las devoluciones de cargo en tu margen operativo."
          />
          <FeatureCard
            icon={<FaCheckCircle />}
            title="Más ventas legítimas"
            description="Evita rechazar clientes buenos por miedo al fraude y protege tu crecimiento de ingresos."
          />
          <FeatureCard
            icon={<FaRocket />}
            title="Menos carga operativa"
            description="Tu equipo de riesgo se enfoca en casos críticos, no en revisar todo manualmente."
          />
          <FeatureCard
            icon={<FaTachometerAlt />}
            title="Control y visibilidad"
            description="Indicadores claros para reportar a gerencia y directorio el estado del riesgo."
          />
          <FeatureCard
            icon={<FaCloud />}
            title="Escalable"
            description="Preparado para crecer con el volumen de transacciones de tu negocio sin límites técnicos."
          />
          <FeatureCard
            icon={<FaGlobeAmericas />}
            title="Contexto regional"
            description="Diseñado para los patrones de comportamiento y riesgo específicos de Latinoamérica."
          />
        </div>
      </div>
    </section>
  );
};
