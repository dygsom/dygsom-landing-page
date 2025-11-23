import React from 'react';
import { FaGlobeAmericas, FaChartLine, FaExclamationTriangle } from 'react-icons/fa';

export const ProblemOpportunitySection: React.FC = () => {
  return (
    <section className="py-12 md:py-20 px-4 md:px-6 bg-slate-900" id="problema">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-dygsom-light-text mb-8 md:mb-12">
          El Problema y Nuestra Oportunidad en LATAM
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
          <div className="bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-700 animate-fade-in">
            <FaExclamationTriangle className="text-dygsom-orange text-6xl mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-dygsom-light-text mb-4">Fraude Desenfrenado</h3>
            <p className="text-slate-400">
              Latinoamérica pierde el <strong>20% de sus ingresos</strong> por fraude en e-commerce, el segundo más alto globalmente. El fraude con tarjetas es <strong>97% mayor</strong> que en Norte América.
            </p>
          </div>
          <div className="bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-700 animate-fade-in delay-100">
            <FaChartLine className="text-dygsom-green text-6xl mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-dygsom-light-text mb-4">Crecimiento y Riesgo</h3>
            <p className="text-slate-400">
              El malware bancario creció <strong>+113%</strong> en H1 2024. Este crecimiento digital exponencial trae consigo un aumento significativo en los riesgos de fraude.
            </p>
          </div>
          <div className="bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-700 animate-fade-in delay-200">
            <FaGlobeAmericas className="text-dygsom-blue text-6xl mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-dygsom-light-text mb-4">Mercado en Expansión</h3>
            <p className="text-slate-400">
              El mercado de detección de fraude en LATAM proyecta un crecimiento del <strong>15.6% CAGR</strong>, alcanzando los $5.08B para 2034. ¡Una oportunidad sin precedentes!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
