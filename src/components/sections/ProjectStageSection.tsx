import React from 'react';
import { FaCheckCircle, FaClock, FaRocket } from 'react-icons/fa';

export const ProjectStageSection: React.FC = () => {
  return (
    <section className="py-12 md:py-20 px-4 md:px-6 bg-gradient-to-br from-slate-100 via-white to-slate-100">
      <div className="max-w-6xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4">
            Estado del Proyecto
          </h2>
          <p className="text-lg md:text-xl text-slate-700 font-medium">
            Transparencia total sobre nuestro desarrollo y roadmap
          </p>
        </div>

        {/* Current Stage Banner */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-2xl p-6 md:p-8 text-center text-white">
            <div className="text-5xl mb-4">🚀</div>
            <h3 className="text-2xl md:text-3xl font-bold mb-3">Fase: MVP en Piloto</h3>
            <p className="text-base md:text-lg opacity-95 max-w-2xl mx-auto">
              Producto funcional validándose con primeros clientes reales. Financiamiento en proceso con ProInnóvate (Produce/Perú).
            </p>
          </div>
        </div>

        {/* Roadmap Timeline */}
        <div className="mb-10">
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 text-center">Roadmap 2026</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">

            {/* Q1 2026 */}
            <div className="bg-white rounded-xl shadow-lg border-2 border-green-500 p-6">
              <div className="flex items-center gap-3 mb-4">
                <FaCheckCircle className="text-3xl text-green-500" />
                <div>
                  <h4 className="text-xl font-bold text-slate-900">Q1 2026</h4>
                  <span className="text-sm text-green-600 font-semibold">En Curso</span>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-slate-800">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span>MVP funcional con API</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-0.5">✓</span>
                  <span>Dashboard básico</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 mt-0.5">⏳</span>
                  <span>5-10 clientes piloto</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 mt-0.5">⏳</span>
                  <span>Validación métricas reales</span>
                </li>
              </ul>
            </div>

            {/* Q2 2026 */}
            <div className="bg-white rounded-xl shadow-lg border border-slate-300 p-6">
              <div className="flex items-center gap-3 mb-4">
                <FaClock className="text-3xl text-blue-500" />
                <div>
                  <h4 className="text-xl font-bold text-slate-900">Q2 2026</h4>
                  <span className="text-sm text-blue-600 font-semibold">Planificado</span>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-slate-800">
                <li className="flex items-start gap-2">
                  <span className="text-slate-400 mt-0.5">○</span>
                  <span>Lanzamiento público beta</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-400 mt-0.5">○</span>
                  <span>Integración Stripe, Culqi</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-400 mt-0.5">○</span>
                  <span>Webhooks en tiempo real</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-400 mt-0.5">○</span>
                  <span>Soporte chat 24/7</span>
                </li>
              </ul>
            </div>

            {/* Q3-Q4 2026 */}
            <div className="bg-white rounded-xl shadow-lg border border-slate-300 p-6">
              <div className="flex items-center gap-3 mb-4">
                <FaRocket className="text-3xl text-purple-500" />
                <div>
                  <h4 className="text-xl font-bold text-slate-900">Q3-Q4 2026</h4>
                  <span className="text-sm text-purple-600 font-semibold">Visión</span>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-slate-800">
                <li className="flex items-start gap-2">
                  <span className="text-slate-400 mt-0.5">○</span>
                  <span>Expansión Chile, Colombia</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-400 mt-0.5">○</span>
                  <span>ML custom tuning</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-400 mt-0.5">○</span>
                  <span>Plan Enterprise</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-400 mt-0.5">○</span>
                  <span>Certificación ISO 27001</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Funding Breakdown */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-300 p-6 md:p-8 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">Financiamiento & Inversión</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 rounded-lg p-5 text-center">
              <p className="text-sm text-slate-700 mb-2">ProInnóvate (Produce/Perú)</p>
              <p className="text-3xl font-extrabold text-slate-900">$50K USD</p>
              <p className="text-xs text-slate-600 mt-1">Cofinanciamiento no reembolsable</p>
              <span className="inline-block mt-2 bg-yellow-500 text-slate-900 px-3 py-1 rounded-full text-xs font-bold">
                En Evaluación
              </span>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-lg p-5 text-center">
              <p className="text-sm text-slate-700 mb-2">Inversión Fundadores</p>
              <p className="text-3xl font-extrabold text-slate-900">$15K USD</p>
              <p className="text-xs text-slate-600 mt-1">Capital propio + tiempo</p>
              <span className="inline-block mt-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                Confirmado
              </span>
            </div>
          </div>

          <div className="bg-slate-50 rounded-lg p-4 text-center">
            <p className="text-sm text-slate-800">
              <strong className="text-slate-900">Total Proyectado 2026:</strong> ~$65K USD para desarrollo, infraestructura AWS, validación de mercado y expansión inicial.
            </p>
          </div>
        </div>

        {/* Early Adopter CTA */}
        <div className="mt-10 max-w-4xl mx-auto bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl shadow-2xl p-6 md:p-8 text-center text-white">
          <h4 className="text-2xl font-bold mb-3">💎 Únete como Early Adopter</h4>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Clientes piloto obtienen condiciones especiales, acceso anticipado a features nuevos y soporte dedicado del equipo fundador.
          </p>
          <a
            href="#contacto"
            className="inline-block bg-dygsom-green text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
          >
            Quiero ser Early Adopter →
          </a>
        </div>

      </div>
    </section>
  );
};
