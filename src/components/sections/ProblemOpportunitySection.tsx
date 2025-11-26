import React from 'react';
import { FaExclamationCircle, FaDollarSign, FaUsers, FaTools } from 'react-icons/fa';

export const ProblemOpportunitySection: React.FC = () => {
  return (
    <section className="py-12 md:py-20 px-4 md:px-6 bg-slate-900" id="problema">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-dygsom-light-text mb-4 md:mb-6">
            El fraude en pagos online está erosionando tus márgenes
          </h2>
          <p className="text-base md:text-lg text-slate-300 max-w-4xl mx-auto leading-relaxed">
            Cada vez más compradores se mueven al canal digital, pero también lo hacen los defraudadores. Los comercios y fintech se enfrentan a pérdidas crecientes por transacciones fraudulentas, devoluciones de cargo y bloqueos injustos a buenos clientes.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="bg-slate-800/50 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-slate-700/50 hover:border-dygsom-orange/50 transition-all">
            <FaDollarSign className="text-dygsom-orange text-5xl mb-4" />
            <h3 className="text-xl font-bold text-dygsom-light-text mb-3">Pérdidas económicas</h3>
            <p className="text-slate-400">
              Compras fraudulentas y chargebacks que impactan directamente en tu rentabilidad.
            </p>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-slate-700/50 hover:border-red-500/50 transition-all">
            <FaExclamationCircle className="text-red-500 text-5xl mb-4" />
            <h3 className="text-xl font-bold text-dygsom-light-text mb-3">Riesgo de sanciones</h3>
            <p className="text-slate-400">
              Restricciones con bancos y procesadores de pago que pueden afectar tu operación.
            </p>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-slate-700/50 hover:border-yellow-500/50 transition-all">
            <FaUsers className="text-yellow-500 text-5xl mb-4" />
            <h3 className="text-xl font-bold text-dygsom-light-text mb-3">Equipos saturados</h3>
            <p className="text-slate-400">
              Tu equipo de riesgo pierde tiempo revisando casos manualmente en lugar de enfocarse en estrategia.
            </p>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-slate-700/50 hover:border-slate-500/50 transition-all">
            <FaTools className="text-slate-400 text-5xl mb-4" />
            <h3 className="text-xl font-bold text-dygsom-light-text mb-3">Herramientas inadecuadas</h3>
            <p className="text-slate-400">
              Soluciones antifraude costosas o poco adaptadas a la realidad de la región.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
