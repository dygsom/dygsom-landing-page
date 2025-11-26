import React from 'react';
import { FaExclamationCircle, FaDollarSign, FaUsers, FaTools } from 'react-icons/fa';

export const ProblemOpportunitySection: React.FC = () => {
  return (
    <section className="py-12 md:py-20 px-4 md:px-6 bg-slate-900" id="problema">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-dygsom-light-text mb-4 md:mb-6">
            El fraude digital está comiéndose tu margen
          </h2>
          <p className="text-base md:text-lg text-slate-300 max-w-4xl mx-auto leading-relaxed">
            Cada vez que una transacción fraudulenta pasa tu sistema, no solo pierdes dinero: asumes el costo del producto/servicio, la devolución de cargo y el desgaste con bancos y clientes. Si bloqueas demasiado, también pierdes ventas legítimas y deterioras la experiencia del usuario.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="bg-slate-800/50 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-slate-700/50 hover:border-dygsom-orange/50 transition-all">
            <FaDollarSign className="text-dygsom-orange text-5xl mb-4" />
            <h3 className="text-xl font-bold text-dygsom-light-text mb-3">Pérdidas directas</h3>
            <p className="text-slate-400">
              Pérdidas directas por compras fraudulentas y chargebacks que impactan tu rentabilidad.
            </p>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-slate-700/50 hover:border-red-500/50 transition-all">
            <FaExclamationCircle className="text-red-500 text-5xl mb-4" />
            <h3 className="text-xl font-bold text-dygsom-light-text mb-3">Clientes frustrados</h3>
            <p className="text-slate-400">
              Clientes molestos por transacciones legítimas rechazadas que deterioran su experiencia.
            </p>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-slate-700/50 hover:border-yellow-500/50 transition-all">
            <FaUsers className="text-yellow-500 text-5xl mb-4" />
            <h3 className="text-xl font-bold text-dygsom-light-text mb-3">Equipos sin foco estratégico</h3>
            <p className="text-slate-400">
              Equipos revisando casos manualmente sin tiempo para lo estratégico ni la mejora continua.
            </p>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-slate-700/50 hover:border-slate-500/50 transition-all">
            <FaTools className="text-slate-400 text-5xl mb-4" />
            <h3 className="text-xl font-bold text-dygsom-light-text mb-3">Herramientas desactualizadas</h3>
            <p className="text-slate-400">
              Herramientas antifraude costosas o poco adaptadas al contexto de la región.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
