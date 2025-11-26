import React from 'react';
import { FaCode, FaRocket, FaCloud, FaShieldAlt, FaChartLine } from 'react-icons/fa';

export const TechnicalSection: React.FC = () => {
  return (
    <section className="py-12 md:py-20 px-4 md:px-6 bg-slate-800" id="tecnico">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-dygsom-light-text mb-4 md:mb-6">
            Pensado también para tu equipo técnico
          </h2>
          <p className="text-base md:text-lg text-slate-300 max-w-4xl mx-auto leading-relaxed">
            Sabemos que para implementar una solución antifraude no basta con una buena idea: tu equipo técnico necesita garantías sobre integración, seguridad y performance.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <div className="bg-slate-900/70 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-slate-600/50 hover:border-dygsom-blue/50 transition-all group">
            <FaCode className="text-dygsom-blue text-4xl mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-dygsom-light-text mb-3">API REST documentada</h3>
            <p className="text-slate-400 leading-relaxed">
              Ejemplos de integración en lenguajes como Python, Node.js o PHP con documentación clara y casos de uso.
            </p>
          </div>
          
          <div className="bg-slate-900/70 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-slate-600/50 hover:border-dygsom-green/50 transition-all group">
            <FaRocket className="text-dygsom-green text-4xl mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-dygsom-light-text mb-3">Latencia baja</h3>
            <p className="text-slate-400 leading-relaxed">
              Tiempos de respuesta en milisegundos para no afectar tu checkout ni la experiencia del usuario.
            </p>
          </div>
          
          <div className="bg-slate-900/70 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-slate-600/50 hover:border-cyan-500/50 transition-all group">
            <FaCloud className="text-cyan-400 text-4xl mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-dygsom-light-text mb-3">Arquitectura cloud</h3>
            <p className="text-slate-400 leading-relaxed">
              Desplegado sobre infraestructura en la nube, preparada para escalar junto con tu volumen de transacciones.
            </p>
          </div>
          
          <div className="bg-slate-900/70 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-slate-600/50 hover:border-yellow-500/50 transition-all group">
            <FaShieldAlt className="text-yellow-400 text-4xl mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-dygsom-light-text mb-3">Seguridad</h3>
            <p className="text-slate-400 leading-relaxed">
              Comunicación cifrada (HTTPS), manejo cuidadoso de datos sensibles y buenas prácticas de autenticación.
            </p>
          </div>
          
          <div className="bg-slate-900/70 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-slate-600/50 hover:border-purple-500/50 transition-all group md:col-span-2 lg:col-span-1">
            <FaChartLine className="text-purple-400 text-4xl mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-dygsom-light-text mb-3">Observabilidad</h3>
            <p className="text-slate-400 leading-relaxed">
              Métricas e indicadores de consumo y estado del servicio para monitorear el comportamiento en producción.
            </p>
          </div>
        </div>

        <div className="mt-8 md:mt-10 text-center">
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-600/50 rounded-xl p-6 md:p-8 max-w-4xl mx-auto">
            <p className="text-slate-300 text-base md:text-lg leading-relaxed">
              <span className="font-semibold text-dygsom-blue">¿Necesitas más detalles técnicos?</span> Podemos programar una sesión técnica con tu equipo para revisar arquitectura, endpoints, payloads y casos de integración específicos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};