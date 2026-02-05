import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { FaCheckCircle, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { trackFeatureExpansion } from '../../utils/analytics';

interface PricingTierProps {
  name: string;
  price: string;
  priceUSD?: string;
  period: string;
  transactions: string;
  features: string[];
  isHighlighted?: boolean;
  badge?: string;
  roiData?: {
    savings: string;
    multiplier: string;
    note: string;
  };
  idealFor?: string;
  isEnterprise?: boolean;
}

const PricingTier: React.FC<PricingTierProps> = ({
  name,
  price,
  priceUSD,
  period,
  transactions,
  features,
  isHighlighted,
  badge,
  roiData,
  idealFor,
  isEnterprise
}) => {
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const visibleFeatures = showAllFeatures ? features : features.slice(0, 4);
  const hasMoreFeatures = features.length > 4;

  return (
    <div className={`relative flex flex-col p-4 sm:p-6 md:p-8 rounded-2xl shadow-2xl border ${isHighlighted ? 'bg-gradient-to-br from-green-900/30 to-slate-900 border-green-500 transform scale-100 md:scale-105 z-10' : 'bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700'} transition-all duration-300 hover:border-green-500/50`}>

      {/* Badge for highlighted plan */}
      {badge && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg">
          {badge}
        </div>
      )}

      {/* Plan Header */}
      <div className="text-center mb-6">
        <h3 className={`text-2xl md:text-3xl font-bold ${isHighlighted ? 'text-green-400' : 'text-slate-200'} mb-2`}>{name}</h3>
        <p className="text-slate-400 text-sm">{transactions}</p>
      </div>

      {/* Plan Price */}
      {!isEnterprise ? (
        <div className="text-center mb-6">
          <div className="flex items-baseline justify-center mb-2 flex-wrap gap-1">
            <span className="text-lg md:text-xl text-slate-400">S/.</span>
            <span className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-50">{price}</span>
            <span className="text-base md:text-lg font-medium text-slate-400">{period}</span>
          </div>
          {priceUSD && <p className="text-slate-400 text-xs md:text-sm">{priceUSD}</p>}
        </div>
      ) : (
        <div className="text-center mb-6">
          <span className="text-3xl md:text-4xl font-extrabold text-slate-50">Custom</span>
          <p className="text-slate-400 text-sm mt-2">Según necesidades</p>
        </div>
      )}

      {/* ROI Box */}
      {roiData && (
        <div className={`rounded-xl p-4 md:p-5 mb-6 text-center ${
          isHighlighted
            ? 'bg-gradient-to-br from-dygsom-green to-green-600 text-white'
            : 'bg-gradient-to-br from-green-50 to-green-100 border-2 border-dygsom-green'
        }`}>
          <p className={`text-xs mb-2 ${isHighlighted ? 'opacity-90' : 'text-slate-600'}`}>Cliente típico ahorra:</p>
          <p className={`text-2xl md:text-3xl font-extrabold mb-1 ${isHighlighted ? 'text-white' : 'text-slate-900'}`}>{roiData.savings}</p>
          <p className={`text-base md:text-lg font-semibold mb-2 ${isHighlighted ? 'text-white' : 'text-dygsom-green'}`}>ROI: {roiData.multiplier}</p>
          <p className={`text-xs ${isHighlighted ? 'opacity-80' : 'text-slate-500'}`}>{roiData.note}</p>
        </div>
      )}

      {/* Features - Primeras 4 visibles */}
      <ul className="space-y-3 flex-grow mb-4">
        {visibleFeatures.map((feature, index) => (
          <li key={index} className="flex items-start text-slate-200">
            <FaCheckCircle className="text-green-400 mr-3 flex-shrink-0 mt-0.5" />
            <span className="text-sm md:text-base">{feature}</span>
          </li>
        ))}
      </ul>

      {/* Botón Ver más/menos */}
      {hasMoreFeatures && (
        <button
          onClick={() => {
            const newState = !showAllFeatures;
            setShowAllFeatures(newState);
            trackFeatureExpansion(name, newState);
          }}
          className="text-green-400 hover:text-green-300 text-sm font-semibold mb-6 flex items-center gap-2 mx-auto transition-colors"
        >
          {showAllFeatures ? (
            <>
              Ver menos <FaChevronUp className="text-xs" />
            </>
          ) : (
            <>
              Ver más ({features.length - 4} adicionales) <FaChevronDown className="text-xs" />
            </>
          )}
        </button>
      )}

      {/* Ideal For */}
      {idealFor && (
        <div className="bg-slate-800/50 rounded-lg p-4 mb-6 text-center">
          <strong className="block text-slate-200 text-sm mb-1">Ideal para:</strong>
          <p className="text-slate-400 text-sm">{idealFor}</p>
        </div>
      )}

      {/* CTA Button */}
      <Button
        className="w-full"
        variant={isHighlighted ? 'primary' : 'secondary'}
        onClick={() => {
          const contactSection = document.getElementById('contacto');
          if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }}
      >
        {isEnterprise ? 'Hablemos' : 'Empezar Ahora'}
      </Button>

      {/* Guarantee */}
      {!isEnterprise && (
        <p className="text-center text-slate-400 text-xs mt-4">
          ✓ 30 días gratis · Sin tarjeta
        </p>
      )}
    </div>
  );
};

export const PricingSection: React.FC = () => {
  return (
    <section className="py-12 md:py-20 px-4 md:px-6 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" id="pricing">
      <div className="max-w-7xl mx-auto text-center mb-8 md:mb-12">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-50 mb-3 md:mb-4">
          Pricing Transparente
        </h2>
        <p className="text-base md:text-lg text-slate-400 max-w-3xl mx-auto px-4 mb-6">
          Sin sorpresas. Sin contratos anuales. Cancela cuando quieras.
        </p>

        {/* Preliminary Pricing Disclaimer */}
        <div className="max-w-4xl mx-auto bg-blue-900/30 border-2 border-blue-400 rounded-xl p-4 md:p-6 mb-8">
          <p className="text-sm md:text-base text-slate-200">
            <span className="text-2xl mr-2">ℹ️</span>
            <strong className="text-blue-300">Pricing preliminar</strong> sujeto a ajustes según resultados de pilotos y validación de mercado (Q1 2026).
            <span className="text-blue-200"> Clientes piloto: condiciones especiales disponibles.</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6 max-w-6xl mx-auto mb-12">

        {/* Plan Inicial */}
        <PricingTier
          name="Plan Inicial"
          price="699"
          priceUSD="S/. 8,388/año"
          period="/mes"
          transactions="Hasta 10,000 usuarios activos/mes"
          features={[
            "Protección completa 4 pilares",
            "Bot Detection",
            "Account Takeover Prevention",
            "API Security",
            "Fraud Patterns",
            "Dashboard básico + Email support"
          ]}
          idealFor="Startups < $500K ARR"
        />

        {/* Plan Crecimiento - HIGHLIGHTED */}
        <PricingTier
          name="Plan Crecimiento"
          price="2,499"
          priceUSD="S/. 29,988/año"
          period="/mes"
          transactions="Hasta 50,000 usuarios activos/mes"
          features={[
            "Todo Plan Inicial +",
            "Analytics avanzado + API access",
            "Soporte prioritario",
            "Tiempo respuesta < 4h",
            "Reglas personalizadas",
            "Reportes detallados"
          ]}
          isHighlighted
          badge="Recomendado"
          roiData={{
            savings: "~S/. 19,500/mes",
            multiplier: "~8x",
            note: "vs competencia enterprise"
          }}
          idealFor="E-commerce/Fintech $1M-10M ARR"
        />

        {/* Plan Enterprise */}
        <PricingTier
          name="Plan Enterprise"
          price="6,999"
          priceUSD="S/. 83,988/año"
          period="/mes"
          transactions="Hasta 200,000 usuarios activos/mes"
          features={[
            "Todo Plan Crecimiento +",
            "Custom rules + Webhooks",
            "Dedicated CSM",
            "SLA 99.9%",
            "ML custom tuning",
            "Multi-región deployment"
          ]}
          idealFor="Enterprise $10M+ ARR"
        />

      </div>

      {/* Overages Clarification */}
      <div className="text-center max-w-4xl mx-auto mb-12 px-4">
        <div className="bg-slate-800/40 rounded-xl p-6 border border-slate-700/50">
          <h3 className="text-lg font-bold text-slate-200 mb-3">¿Qué pasa si supero mi límite?</h3>
          <p className="text-sm text-slate-300 mb-2">
            Transacciones adicionales: <span className="text-green-400 font-bold">S/. 0.01 por usuario adicional</span>
          </p>
          <p className="text-xs text-slate-500">
            Recibirás alertas al 80% y 95% de tu límite mensual. Sin bloqueos sorpresa, sin cargos ocultos.
          </p>
        </div>
      </div>

      {/* Pricing Notes */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12 mb-12 max-w-4xl mx-auto">
        <div className="flex items-center gap-3">
          <span className="text-3xl">💳</span>
          <div>
            <strong className="block text-slate-200 text-sm">Sin setup fees</strong>
            <p className="text-slate-400 text-xs">Empieza gratis hoy</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-3xl">📊</span>
          <div>
            <strong className="block text-slate-200 text-sm">Transparente</strong>
            <p className="text-slate-400 text-xs">Lo que ves es lo que pagas</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-3xl">🔄</span>
          <div>
            <strong className="block text-slate-200 text-sm">Flexible</strong>
            <p className="text-slate-400 text-xs">Cambia o cancela cuando quieras</p>
          </div>
        </div>
      </div>
    </section>
  );
};
