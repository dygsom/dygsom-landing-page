import React from 'react';
import { FaShoppingCart, FaCreditCard, FaGift, FaBuilding, FaCheckCircle } from 'react-icons/fa';

export const TargetAudienceSection: React.FC = () => {
  return (
    <section id="casos-uso" className="py-12 md:py-20 px-4 md:px-6 bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="max-w-6xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4">
            Casos de Uso
          </h2>
          <p className="text-lg md:text-xl text-slate-700 font-medium max-w-3xl mx-auto">
            DYGSOM funciona para <strong className="text-slate-900">cualquier e-commerce o fintech</strong> que procese pagos online en LATAM.
          </p>
        </div>

        {/* Use Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">

          {/* E-commerce Card */}
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4 sm:p-6 hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4 text-center">
              <FaShoppingCart className="inline-block text-dygsom-blue" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2 text-center">E-commerce</h3>
            <p className="text-slate-700 text-center mb-4 text-sm font-medium">Retail, moda, electrónica, marketplaces</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-sm text-slate-800">
                <FaCheckCircle className="text-dygsom-green mt-0.5 flex-shrink-0" />
                <span>Reduce rechazos falsos</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-slate-800">
                <FaCheckCircle className="text-dygsom-green mt-0.5 flex-shrink-0" />
                <span>Detecta fraude real</span>
              </li>
            </ul>
          </div>

          {/* Fintech Card */}
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4 sm:p-6 hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4 text-center">
              <FaCreditCard className="inline-block text-dygsom-blue" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2 text-center">Fintech</h3>
            <p className="text-slate-700 text-center mb-4 text-sm font-medium">Lending, pagos, remesas, wallets digitales</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-sm text-slate-800">
                <FaCheckCircle className="text-dygsom-green mt-0.5 flex-shrink-0" />
                <span>Valida identidad</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-slate-800">
                <FaCheckCircle className="text-dygsom-green mt-0.5 flex-shrink-0" />
                <span>Previene robo de cuentas</span>
              </li>
            </ul>
          </div>

          {/* Digital Products Card */}
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4 sm:p-6 hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4 text-center">
              <FaGift className="inline-block text-dygsom-blue" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2 text-center">Productos Digitales</h3>
            <p className="text-slate-700 text-center mb-4 text-sm font-medium">Gift cards, códigos, suscripciones, gaming</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-sm text-slate-800">
                <FaCheckCircle className="text-dygsom-green mt-0.5 flex-shrink-0" />
                <span>Detección instantánea</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-slate-800">
                <FaCheckCircle className="text-dygsom-green mt-0.5 flex-shrink-0" />
                <span>Cero fricción</span>
              </li>
            </ul>
          </div>

          {/* B2B/Enterprise Card */}
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4 sm:p-6 hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4 text-center">
              <FaBuilding className="inline-block text-dygsom-blue" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2 text-center">B2B / Enterprise</h3>
            <p className="text-slate-700 text-center mb-4 text-sm font-medium">Plataformas corporativas, SaaS, high-ticket</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-sm text-slate-800">
                <FaCheckCircle className="text-dygsom-green mt-0.5 flex-shrink-0" />
                <span>ML custom tuning</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-slate-800">
                <FaCheckCircle className="text-dygsom-green mt-0.5 flex-shrink-0" />
                <span>SLAs dedicados</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Ideal Profile */}
        <div className="bg-white rounded-xl shadow-lg border-2 border-dygsom-green p-6 md:p-8 mb-8">
          <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">Ideal Si:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            <div className="flex items-center gap-3">
              <FaCheckCircle className="text-dygsom-green text-2xl flex-shrink-0" />
              <span className="text-slate-800 font-medium">Procesas +1,000 transacciones/mes</span>
            </div>
            <div className="flex items-center gap-3">
              <FaCheckCircle className="text-dygsom-green text-2xl flex-shrink-0" />
              <span className="text-slate-800 font-medium">Tasa de rechazo &gt;5%</span>
            </div>
            <div className="flex items-center gap-3">
              <FaCheckCircle className="text-dygsom-green text-2xl flex-shrink-0" />
              <span className="text-slate-800 font-medium">Clientes en LATAM (Perú, Chile, Colombia, etc)</span>
            </div>
            <div className="flex items-center gap-3">
              <FaCheckCircle className="text-dygsom-green text-2xl flex-shrink-0" />
              <span className="text-slate-800 font-medium">Necesitas reducir fraude SIN perder ventas</span>
            </div>
          </div>
        </div>

        {/* Enterprise Callout */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl shadow-2xl p-6 md:p-8 mb-8 text-center">
          <h4 className="text-2xl font-bold text-white mb-3">💼 ¿Empresa grande o necesidades custom?</h4>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Ofrecemos planes Enterprise con ML tuning dedicado, integración personalizada y soporte 24/7.
          </p>
          <a
            href="#contacto"
            className="inline-block bg-white text-slate-900 px-6 py-3 rounded-lg font-semibold hover:bg-slate-100 transition-colors"
          >
            Hablemos de tu caso →
          </a>
        </div>

        {/* General CTA */}
        <div className="text-center">
          <p className="text-slate-700 font-medium mb-2">¿No ves tu caso específico?</p>
          <a
            href="#contacto"
            className="text-dygsom-green font-semibold text-lg hover:underline"
          >
            Cuéntanos tu necesidad y te decimos si aplica →
          </a>
        </div>

      </div>
    </section>
  );
};
