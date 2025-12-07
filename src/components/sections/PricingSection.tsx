import React from 'react';
import { Button } from '../ui/Button';
import { FaCheckCircle } from 'react-icons/fa';

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
  return (
    <div className={`relative flex flex-col p-6 md:p-8 rounded-2xl shadow-2xl border ${isHighlighted ? 'bg-gradient-to-br from-green-900/30 to-slate-900 border-green-500 transform scale-100 md:scale-105 z-10' : 'bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700'} transition-all duration-300 hover:border-green-500/50`}>

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

      {/* Features */}
      <ul className="space-y-3 flex-grow mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start text-slate-200">
            <FaCheckCircle className="text-green-400 mr-3 flex-shrink-0 mt-0.5" />
            <span className="text-sm md:text-base">{feature}</span>
          </li>
        ))}
      </ul>

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 max-w-7xl mx-auto mb-12">

        {/* Starter Plan */}
        <PricingTier
          name="Starter"
          price="549"
          priceUSD="~$149 USD/mes"
          period="/mes"
          transactions="Para tiendas en crecimiento"
          features={[
            "10,000 transacciones/mes",
            "API básica",
            "Dashboard estándar",
            "Email support 24-48h",
            "Documentación completa",
            "SDK Python, PHP, Node"
          ]}
          roiData={{
            savings: "~S/. 4,900/mes",
            multiplier: "~9x",
            note: "Proyección basada en tienda S/. 500K/año"
          }}
          idealFor="Ventas S/. 150K-700K/mes"
        />

        {/* Professional Plan - HIGHLIGHTED */}
        <PricingTier
          name="Professional"
          price="1,649"
          priceUSD="~$449 USD/mes"
          period="/mes"
          transactions="Para e-commerce establecido"
          features={[
            "50,000 transacciones/mes",
            "API avanzada + Webhooks",
            "Dashboard + Analytics",
            "Chat support 1-2h",
            "Reglas personalizadas",
            "Reportes semanales",
            "Integración asistida"
          ]}
          isHighlighted
          badge="Más Popular"
          roiData={{
            savings: "~S/. 19,500/mes",
            multiplier: "~12x",
            note: "Proyección basada en tienda S/. 2M/año"
          }}
          idealFor="Ventas S/. 700K-3M/mes"
        />

        {/* Business Plan */}
        <PricingTier
          name="Business"
          price="3,299"
          priceUSD="~$899 USD/mes"
          period="/mes"
          transactions="Para operaciones grandes"
          features={[
            "200,000 transacciones/mes",
            "Todo Professional +",
            "ML custom tuning",
            "Dedicated support",
            "SLA 99.9%",
            "Account manager",
            "Reportes personalizados"
          ]}
          roiData={{
            savings: "~S/. 78,000/mes",
            multiplier: "~24x",
            note: "Proyección basada en tienda S/. 8M/año"
          }}
          idealFor="Ventas >S/. 3M/mes"
        />

        {/* Enterprise Plan */}
        <PricingTier
          name="Enterprise"
          price="Custom"
          period=""
          transactions="Soluciones a medida"
          features={[
            "Transacciones ilimitadas",
            "Multi-región deployment",
            "White-label option",
            "Custom ML training",
            "Dedicated infrastructure",
            "24/7 phone support",
            "SLA custom",
            "Legal compliance support"
          ]}
          idealFor="Corporaciones, fintechs reguladas"
          isEnterprise
        />

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

      {/* Comparison CTA */}
      <div className="text-center max-w-2xl mx-auto p-6 bg-slate-800/30 rounded-xl">
        <p className="text-slate-300 mb-3">¿Quieres ver cómo nos comparamos con Stripe, Signifyd o Sift?</p>
        <a href="#market-comparison" className="text-green-400 hover:text-green-300 font-semibold transition-colors">
          Ver comparación detallada ↑
        </a>
      </div>
    </section>
  );
};
