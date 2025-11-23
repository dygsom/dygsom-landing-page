import React from 'react';
import { Button } from '../ui/Button';
import { FaCheckCircle } from 'react-icons/fa';

interface PricingTierProps {
  name: string;
  price: string;
  transactions: string;
  additionalCost: string;
  features: string[];
  isHighlighted?: boolean;
}

const PricingTier: React.FC<PricingTierProps> = ({ name, price, transactions, additionalCost, features, isHighlighted }) => {
  return (
    <div className={`flex flex-col p-8 rounded-xl shadow-xl border ${isHighlighted ? 'bg-gradient-to-br from-blue-900 to-slate-900 border-dygsom-blue scale-105' : 'bg-slate-800 border-slate-700'} transition-all duration-300 hover:scale-[1.02] animate-fade-in`}>
      <h3 className={`text-3xl font-bold ${isHighlighted ? 'text-dygsom-blue' : 'text-dygsom-light-text'} mb-3`}>{name}</h3>
      <p className="text-slate-400 mb-6">{transactions} transacciones / mes</p>
      <div className="flex items-baseline mb-6">
        <span className="text-5xl font-extrabold text-dygsom-light-text">{price}</span>
        <span className="text-xl font-medium text-slate-400">/mes</span>
      </div>
      <p className="text-sm text-slate-500 mb-6">Costo adicional: {additionalCost}/transacción</p>
      
      <ul className="space-y-3 flex-grow mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-dygsom-light-text">
            <FaCheckCircle className="text-dygsom-green mr-3 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Button className="w-full" variant={isHighlighted ? 'primary' : 'secondary'}>
        Comenzar con {name}
      </Button>
    </div>
  );
};

export const PricingSection: React.FC = () => {
  return (
    <section className="py-12 md:py-20 px-4 md:px-6 bg-slate-950" id="precios">
      <div className="max-w-7xl mx-auto text-center mb-8 md:mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-dygsom-light-text mb-3 md:mb-4">
          Planes de Precio Flexibles
        </h2>
        <p className="text-base md:text-lg text-slate-400 max-w-3xl mx-auto px-4">
          Soluciones adaptadas a la medida de tu negocio, desde PyMEs hasta grandes empresas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
        <PricingTier
          name="Starter"
          price="$99"
          transactions="10K"
          additionalCost="$0.008"
          features={["Fraud Scoring API", "Dashboard Básico", "Soporte Email (24h)"]}
        />
        <PricingTier
          name="Growth"
          price="$499"
          transactions="100K"
          additionalCost="$0.005"
          features={["Todo Starter", "Rules Engine Avanzado", "Webhooks & Alertas", "Soporte Slack (4h)"]}
          isHighlighted
        />
        <PricingTier
          name="Enterprise"
          price="Custom"
          transactions="Ilimitado (negociado)"
          additionalCost="Negociado"
          features={["Todo Growth", "Full Platform", "SLA Personalizado", "CSM Dedicado", "Integraciones Custom"]}
        />
      </div>
      <p className="text-center text-slate-500 mt-12 text-sm">
        ¿Necesitas un plan personalizado? <a href="#contacto" className="text-dygsom-blue hover:underline">Contáctanos</a>.
      </p>
    </section>
  );
};
