import React from 'react';
import { FaShieldAlt, FaLock, FaCheckCircle, FaClock } from 'react-icons/fa';

export const SecurityComplianceSection: React.FC = () => {
  return (
    <section className="py-12 md:py-20 px-4 md:px-6 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900">
      <div className="max-w-6xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-50 mb-4">
            🔒 Seguridad & Compliance
          </h2>
          <p className="text-base md:text-lg text-slate-400 max-w-3xl mx-auto">
            Tu data está protegida. Cumplimos con los más altos estándares de la industria.
          </p>
        </div>

        {/* Current Compliance Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 md:mb-10">

          {/* AWS Infrastructure */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl shadow-xl border border-slate-700/50 p-4 sm:p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
              <FaShieldAlt className="text-3xl text-white" />
            </div>
            <h3 className="text-lg font-bold text-slate-200 mb-2">AWS Infrastructure</h3>
            <p className="text-sm text-slate-400 mb-3">
              Hospedado en AWS con certificaciones ISO 27001, SOC 2, PCI DSS
            </p>
            <span className="inline-block bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
              ✓ Activo
            </span>
          </div>

          {/* Encryption */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl shadow-xl border border-slate-700/50 p-4 sm:p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <FaLock className="text-3xl text-white" />
            </div>
            <h3 className="text-lg font-bold text-slate-200 mb-2">Encriptación</h3>
            <p className="text-sm text-slate-400 mb-3">
              TLS 1.3 en tránsito. AES-256 en reposo. Zero-knowledge de data sensible.
            </p>
            <span className="inline-block bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
              ✓ Activo
            </span>
          </div>

          {/* GDPR Ready */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl shadow-xl border border-slate-700/50 p-4 sm:p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
              <FaCheckCircle className="text-3xl text-white" />
            </div>
            <h3 className="text-lg font-bold text-slate-200 mb-2">GDPR Ready</h3>
            <p className="text-sm text-slate-400 mb-3">
              Arquitectura preparada para GDPR. Derecho al olvido, portabilidad de data.
            </p>
            <span className="inline-block bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
              ✓ Activo
            </span>
          </div>

          {/* ISO 27001 (Planned) */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl shadow-xl border border-yellow-600/50 p-4 sm:p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center">
              <FaClock className="text-3xl text-white" />
            </div>
            <h3 className="text-lg font-bold text-slate-200 mb-2">ISO 27001</h3>
            <p className="text-sm text-slate-400 mb-3">
              Certificación propia en proceso para Q4 2026
            </p>
            <span className="inline-block bg-yellow-500 text-slate-900 px-3 py-1 rounded-full text-xs font-bold">
              Roadmap 2026
            </span>
          </div>

        </div>

        {/* Data Processing Transparency */}
        <div className="bg-white rounded-xl shadow-xl border border-slate-200 p-6 md:p-8 mb-10 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">Transparencia en Procesamiento de Data</h3>

          <div className="space-y-4">
            <div className="flex items-start gap-4 pb-4 border-b border-slate-200">
              <FaCheckCircle className="text-2xl text-dygsom-green flex-shrink-0 mt-1" />
              <div>
                <strong className="block text-slate-900 text-base mb-1">Data mínima necesaria</strong>
                <p className="text-sm text-slate-700">
                  Solo procesamos la información necesaria para el análisis de fraude (email, IP, monto, ubicación). NO almacenamos números de tarjeta ni datos bancarios completos.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 pb-4 border-b border-slate-200">
              <FaCheckCircle className="text-2xl text-dygsom-green flex-shrink-0 mt-1" />
              <div>
                <strong className="block text-slate-900 text-base mb-1">Retención limitada</strong>
                <p className="text-sm text-slate-700">
                  Data de transacciones retenida solo por 90 días (configurable). Reportes agregados sin PII (Personally Identifiable Information).
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 pb-4 border-b border-slate-200">
              <FaCheckCircle className="text-2xl text-dygsom-green flex-shrink-0 mt-1" />
              <div>
                <strong className="block text-slate-900 text-base mb-1">Control total del cliente</strong>
                <p className="text-sm text-slate-700">
                  Tú eres dueño de tu data. Puedes exportarla, eliminarla o migrarla en cualquier momento sin penalidades.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <FaCheckCircle className="text-2xl text-dygsom-green flex-shrink-0 mt-1" />
              <div>
                <strong className="block text-slate-900 text-base mb-1">No vendemos data</strong>
                <p className="text-sm text-slate-700">
                  NUNCA vendemos, compartimos ni monetizamos tu data con terceros. Nuestro modelo de negocio es transparente: tú pagas por el servicio, punto.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Compliance Roadmap */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl shadow-xl border border-slate-700/50 p-6 md:p-8 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-slate-200 mb-6 text-center">Roadmap de Compliance 2026</h3>

          <div className="space-y-4">
            <div className="flex items-center gap-4 pb-3 border-b border-slate-700">
              <span className="text-2xl">✅</span>
              <div className="flex-grow">
                <strong className="block text-slate-200">Q1 2026: Términos de Servicio & Privacy Policy</strong>
                <p className="text-xs text-slate-400">Redactado por abogado especializado en tech/fintech</p>
              </div>
              <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full font-semibold">Completado</span>
            </div>

            <div className="flex items-center gap-4 pb-3 border-b border-slate-700">
              <span className="text-2xl">⏳</span>
              <div className="flex-grow">
                <strong className="block text-slate-200">Q2 2026: SOC 2 Type I</strong>
                <p className="text-xs text-slate-400">Auditoría inicial de controles de seguridad</p>
              </div>
              <span className="text-xs bg-yellow-500 text-slate-900 px-2 py-1 rounded-full font-semibold">En Proceso</span>
            </div>

            <div className="flex items-center gap-4 pb-3 border-b border-slate-700">
              <span className="text-2xl">📅</span>
              <div className="flex-grow">
                <strong className="block text-slate-200">Q3 2026: PCI DSS Nivel 1</strong>
                <p className="text-xs text-slate-400">Si procesamos tarjetas directamente (depende de roadmap)</p>
              </div>
              <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full font-semibold">Planificado</span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-2xl">🎯</span>
              <div className="flex-grow">
                <strong className="block text-slate-200">Q4 2026: ISO 27001 Certificación</strong>
                <p className="text-xs text-slate-400">Certificación internacional de seguridad de la información</p>
              </div>
              <span className="text-xs bg-purple-500 text-white px-2 py-1 rounded-full font-semibold">Objetivo 2026</span>
            </div>
          </div>
        </div>

        {/* Trust CTA */}
        <div className="mt-10 text-center max-w-3xl mx-auto">
          <p className="text-slate-400 mb-4">
            ¿Tienes preguntas específicas sobre seguridad, compliance o privacidad?
          </p>
          <a
            href="#contacto"
            className="inline-block bg-white text-slate-900 px-6 py-3 rounded-lg font-semibold hover:bg-slate-100 transition-colors"
          >
            Hablemos de Seguridad →
          </a>
        </div>

      </div>
    </section>
  );
};
