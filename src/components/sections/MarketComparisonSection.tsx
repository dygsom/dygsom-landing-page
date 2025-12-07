import React from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

export const MarketComparisonSection: React.FC = () => {
  return (
    <section id="market-comparison" className="py-12 md:py-20 px-4 md:px-6 bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-3 md:mb-4">
            ¿Por Qué DYGSOM?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-slate-700">
            Comparación con soluciones internacionales
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto mb-8 md:mb-12 -mx-4 md:mx-0">
          <table className="w-full bg-white md:rounded-xl shadow-2xl overflow-hidden">
            <thead className="bg-slate-900 text-white">
              <tr>
                <th className="py-4 px-3 sm:py-6 sm:px-6 text-left font-semibold text-xs sm:text-sm md:text-base min-w-[150px] sm:min-w-[250px]">Característica</th>
                <th className="py-4 px-3 sm:py-6 sm:px-6 text-center font-semibold text-xs sm:text-sm md:text-base bg-dygsom-green min-w-[120px] sm:min-w-[180px]">
                  <div className="flex flex-col items-center gap-2">
                    <span>DYGSOM</span>
                  </div>
                </th>
                <th className="py-6 px-6 text-center font-semibold min-w-[150px]">Stripe Radar</th>
                <th className="py-6 px-6 text-center font-semibold min-w-[150px]">Signifyd</th>
                <th className="py-6 px-6 text-center font-semibold min-w-[150px]">Sift</th>
              </tr>
            </thead>
            <tbody>
              {/* Pricing Row */}
              <tr className="bg-slate-50">
                <td className="py-5 px-6 border-b border-slate-200">
                  <strong className="block text-slate-900">Precio/mes</strong>
                  <small className="text-slate-700">(10,000 transacciones)</small>
                </td>
                <td className="py-5 px-6 border-b border-slate-200 bg-green-50 text-center">
                  <strong className="block text-2xl text-slate-900">S/. 549</strong>
                  <span className="text-sm text-slate-700">~$149 USD</span>
                </td>
                <td className="py-5 px-6 border-b border-slate-200 text-center">
                  <span className="block text-slate-800">~$500</span>
                  <small className="text-slate-700">$0.05/tx</small>
                </td>
                <td className="py-5 px-6 border-b border-slate-200 text-center">
                  <span className="block text-slate-800">$1,500+</span>
                  <small className="text-slate-700">+ setup $5K-20K</small>
                </td>
                <td className="py-5 px-6 border-b border-slate-200 text-center">
                  <span className="block text-slate-800">$1,250</span>
                  <small className="text-slate-700">+ custom fees</small>
                </td>
              </tr>

              {/* Setup Cost */}
              <tr>
                <td className="py-5 px-6 border-b border-slate-200 font-medium text-slate-900">Costo de Setup</td>
                <td className="py-5 px-6 border-b border-slate-200 bg-green-50 text-center">
                  <strong className="text-dygsom-green text-lg">S/. 0</strong>
                </td>
                <td className="py-5 px-6 border-b border-slate-200 text-center text-slate-700">$0</td>
                <td className="py-5 px-6 border-b border-slate-200 text-center text-red-600">$5K-20K</td>
                <td className="py-5 px-6 border-b border-slate-200 text-center text-slate-700">Custom</td>
              </tr>

              {/* Contract */}
              <tr>
                <td className="py-5 px-6 border-b border-slate-200 font-medium text-slate-900">Contrato Mínimo</td>
                <td className="py-5 px-6 border-b border-slate-200 bg-green-50 text-center">
                  <strong className="text-dygsom-green block">Sin contrato</strong>
                  <small className="text-slate-700">Cancela cuando quieras</small>
                </td>
                <td className="py-5 px-6 border-b border-slate-200 text-center text-slate-700">Mensual</td>
                <td className="py-5 px-6 border-b border-slate-200 text-center text-red-600">12 meses</td>
                <td className="py-5 px-6 border-b border-slate-200 text-center text-red-600">Anual</td>
              </tr>

              {/* Integration Time */}
              <tr>
                <td className="py-5 px-6 border-b border-slate-200 font-medium text-slate-900">Tiempo Integración</td>
                <td className="py-5 px-6 border-b border-slate-200 bg-green-50 text-center">
                  <strong className="text-dygsom-green text-lg">30 minutos</strong>
                </td>
                <td className="py-5 px-6 border-b border-slate-200 text-center text-slate-800">72 horas</td>
                <td className="py-5 px-6 border-b border-slate-200 text-center text-slate-800">3-5 días</td>
                <td className="py-5 px-6 border-b border-slate-200 text-center text-slate-800">2-3 días</td>
              </tr>

              {/* LATAM Optimization */}
              <tr className="bg-slate-50">
                <td className="py-5 px-6 border-b border-slate-200">
                  <strong className="block text-slate-900">Optimizado para LATAM/Perú</strong>
                </td>
                <td className="py-5 px-6 border-b border-slate-200 bg-green-50 text-center">
                  <FaCheckCircle className="inline-block text-4xl text-dygsom-green mb-2" />
                  <p className="text-xs text-slate-700">Entrenado con data local</p>
                </td>
                <td className="py-5 px-6 border-b border-slate-200 text-center">
                  <FaTimesCircle className="inline-block text-2xl text-red-500" />
                </td>
                <td className="py-5 px-6 border-b border-slate-200 text-center">
                  <FaTimesCircle className="inline-block text-2xl text-red-500" />
                </td>
                <td className="py-5 px-6 border-b border-slate-200 text-center">
                  <FaTimesCircle className="inline-block text-2xl text-red-500" />
                </td>
              </tr>

              {/* Local Context */}
              <tr>
                <td className="py-5 px-6 border-b border-slate-200 font-medium text-slate-900">
                  Entiende direcciones SJL, VMT, etc
                </td>
                <td className="py-5 px-6 border-b border-slate-200 bg-green-50 text-center">
                  <FaCheckCircle className="inline-block text-2xl text-dygsom-green" />
                </td>
                <td className="py-5 px-6 border-b border-slate-200 text-center">
                  <FaTimesCircle className="inline-block text-2xl text-red-500" />
                </td>
                <td className="py-5 px-6 border-b border-slate-200 text-center">
                  <FaTimesCircle className="inline-block text-2xl text-red-500" />
                </td>
                <td className="py-5 px-6 border-b border-slate-200 text-center">
                  <FaTimesCircle className="inline-block text-2xl text-red-500" />
                </td>
              </tr>

              {/* Support */}
              <tr>
                <td className="py-5 px-6 border-b border-slate-200 font-medium text-slate-900">Soporte en Español</td>
                <td className="py-5 px-6 border-b border-slate-200 bg-green-50 text-center">
                  <strong className="text-dygsom-green block">✅ 100%</strong>
                  <small className="text-slate-700">Chat en vivo</small>
                </td>
                <td className="py-5 px-6 border-b border-slate-200 text-center text-slate-700">Limitado</td>
                <td className="py-5 px-6 border-b border-slate-200 text-center text-slate-700">Email only</td>
                <td className="py-5 px-6 border-b border-slate-200 text-center text-slate-700">Limitado</td>
              </tr>

              {/* Gateway Lock-in */}
              <tr>
                <td className="py-5 px-6 border-b border-slate-200 font-medium text-slate-900">
                  Requiere cambiar de pasarela
                </td>
                <td className="py-5 px-6 border-b border-slate-200 bg-green-50 text-center">
                  <strong className="text-dygsom-green block">No</strong>
                  <small className="text-slate-700">Compatible con todas</small>
                </td>
                <td className="py-5 px-6 border-b border-slate-200 text-center">
                  <span className="text-red-600 block font-semibold">Sí</span>
                  <small className="text-slate-700">Solo con Stripe</small>
                </td>
                <td className="py-5 px-6 border-b border-slate-200 text-center text-dygsom-green">No</td>
                <td className="py-5 px-6 border-b border-slate-200 text-center text-dygsom-green">No</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="flex items-center gap-4 bg-white rounded-xl p-6 shadow-lg border border-slate-200">
            <div className="text-5xl">💰</div>
            <div>
              <strong className="block text-lg text-slate-900 mb-1">50-80% más económico</strong>
              <small className="text-slate-700">vs soluciones internacionales</small>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white rounded-xl p-6 shadow-lg border border-slate-200">
            <div className="text-5xl">🇵🇪</div>
            <div>
              <strong className="block text-lg text-slate-900 mb-1">Único optimizado para Perú</strong>
              <small className="text-slate-700">Entiende el contexto local que otros no ven</small>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white rounded-xl p-6 shadow-lg border border-slate-200">
            <div className="text-5xl">⚡</div>
            <div>
              <strong className="block text-lg text-slate-900 mb-1">10x más rápido integrar</strong>
              <small className="text-slate-700">30 min vs 2-5 días</small>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
