import React from 'react';

export const BeforeAfterComparisonSection: React.FC = () => {
  return (
    <section id="solucion" className="py-12 md:py-20 px-4 md:px-6 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4">
            La Diferencia del Contexto Local
          </h2>
          <p className="text-lg md:text-xl text-slate-700 font-medium">
            Mismo cliente, misma compra, resultado diferente
          </p>
        </div>

        {/* Comparison Visual */}
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-4 sm:gap-6 lg:gap-8 mb-8 md:mb-12">

          {/* BEFORE - Sistema Tradicional */}
          <div className="bg-white rounded-2xl shadow-xl border-2 border-red-500 p-4 sm:p-6 md:p-8">
            <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-slate-200">
              <h3 className="text-xl md:text-2xl font-bold text-slate-900">❌ Sistema Tradicional</h3>
              <span className="bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-semibold">Rechazado</span>
            </div>

            <div className="bg-slate-50 rounded-xl p-6 space-y-4">
              {/* Customer Info */}
              <div className="flex items-center gap-4 pb-4 border-b border-slate-200">
                <div className="text-4xl">👤</div>
                <div>
                  <strong className="text-lg text-slate-900">Carlos M.</strong>
                  <p className="text-sm text-slate-700">San Juan de Lurigancho, Lima</p>
                </div>
              </div>

              {/* Transaction Details */}
              <div className="space-y-2">
                <div className="flex justify-between py-2 border-b border-dashed border-slate-300">
                  <span className="text-sm text-slate-700 font-medium">Producto:</span>
                  <span className="font-semibold text-slate-900">Laptop Lenovo</span>
                </div>
                <div className="flex justify-between py-2 border-b border-dashed border-slate-300">
                  <span className="text-sm text-slate-700 font-medium">Monto:</span>
                  <span className="font-semibold text-slate-900">S/. 1,500</span>
                </div>
                <div className="flex justify-between py-2 border-b border-dashed border-slate-300">
                  <span className="text-sm text-slate-700 font-medium">Hora:</span>
                  <span className="font-semibold text-slate-900">11:30 PM</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-sm text-slate-700 font-medium">Conexión:</span>
                  <span className="font-semibold text-slate-900">VPN corporativo</span>
                </div>
              </div>

              {/* Analysis */}
              <div className="bg-white border-2 border-red-100 rounded-lg p-4 mt-4">
                <h4 className="font-bold text-slate-900 mb-3">Análisis del Sistema:</h4>
                <ul className="space-y-2 mb-4">
                  <li className="text-sm text-slate-800">🚩 Dirección "confusa" (SJL)</li>
                  <li className="text-sm text-slate-800">🚩 Compra nocturna (riesgo)</li>
                  <li className="text-sm text-slate-800">🚩 VPN detectado (sospechoso)</li>
                  <li className="text-sm text-slate-800">🚩 Monto alto (S/. 1,500)</li>
                </ul>
                <div className="bg-red-100 rounded-lg p-3 flex justify-between items-center">
                  <span className="text-sm font-semibold text-slate-800">Score de Fraude:</span>
                  <span className="text-3xl font-bold text-red-600">92%</span>
                </div>
              </div>

              {/* Result */}
              <div className="bg-red-100 rounded-lg p-4 flex items-center gap-4 mt-4">
                <div className="text-4xl">❌</div>
                <div>
                  <strong className="text-lg text-red-700 block">RECHAZADO</strong>
                  <p className="text-sm text-red-600">Transacción bloqueada por alto riesgo</p>
                </div>
              </div>

              {/* Impact */}
              <div className="bg-red-50 rounded-lg p-4 text-center mt-4">
                <p className="text-sm text-red-900">Venta perdida: <strong className="text-lg">S/. 1,500</strong></p>
                <p className="text-sm text-red-900">Cliente frustrado: <strong>No vuelve</strong></p>
              </div>
            </div>
          </div>

          {/* ARROW DIVIDER */}
          <div className="flex lg:flex-col items-center justify-center gap-3 sm:gap-4">
            <div className="text-5xl text-dygsom-green font-bold lg:rotate-0 rotate-90">→</div>
            <span className="bg-dygsom-green text-white px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap">
              Con DYGSOM
            </span>
          </div>

          {/* AFTER - DYGSOM */}
          <div className="bg-white rounded-2xl shadow-xl border-2 border-dygsom-green p-4 sm:p-6 md:p-8">
            <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-slate-200">
              <h3 className="text-xl md:text-2xl font-bold text-slate-900">✅ DYGSOM (IA Local)</h3>
              <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">Aprobado</span>
            </div>

            <div className="bg-slate-50 rounded-xl p-6 space-y-4">
              {/* Customer Info */}
              <div className="flex items-center gap-4 pb-4 border-b border-slate-200">
                <div className="text-4xl">👤</div>
                <div>
                  <strong className="text-lg text-slate-900">Carlos M.</strong>
                  <p className="text-sm text-slate-700">San Juan de Lurigancho, Lima</p>
                </div>
              </div>

              {/* Transaction Details */}
              <div className="space-y-2">
                <div className="flex justify-between py-2 border-b border-dashed border-slate-300">
                  <span className="text-sm text-slate-700 font-medium">Producto:</span>
                  <span className="font-semibold text-slate-900">Laptop Lenovo</span>
                </div>
                <div className="flex justify-between py-2 border-b border-dashed border-slate-300">
                  <span className="text-sm text-slate-700 font-medium">Monto:</span>
                  <span className="font-semibold text-slate-900">S/. 1,500</span>
                </div>
                <div className="flex justify-between py-2 border-b border-dashed border-slate-300">
                  <span className="text-sm text-slate-700 font-medium">Hora:</span>
                  <span className="font-semibold text-slate-900">11:30 PM</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-sm text-slate-700 font-medium">Conexión:</span>
                  <span className="font-semibold text-slate-900">VPN corporativo</span>
                </div>
              </div>

              {/* Analysis */}
              <div className="bg-white border-2 border-green-100 rounded-lg p-4 mt-4">
                <h4 className="font-bold text-slate-900 mb-3">Análisis DYGSOM:</h4>
                <ul className="space-y-2 mb-4">
                  <li className="text-sm text-slate-800">✓ SJL = Normal en Perú</li>
                  <li className="text-sm text-slate-800">✓ 11PM = Común compra online</li>
                  <li className="text-sm text-slate-800">✓ VPN = Empresa conocida</li>
                  <li className="text-sm text-slate-800">✓ Email verificado (.com.pe)</li>
                </ul>
                <div className="bg-green-100 rounded-lg p-3 flex justify-between items-center">
                  <span className="text-sm font-semibold text-slate-800">Score de Fraude:</span>
                  <span className="text-3xl font-bold text-green-600">12%</span>
                </div>
              </div>

              {/* Result */}
              <div className="bg-green-100 rounded-lg p-4 flex items-center gap-4 mt-4">
                <div className="text-4xl">✅</div>
                <div>
                  <strong className="text-lg text-green-700 block">APROBADO</strong>
                  <p className="text-sm text-green-600">Cliente legítimo - Procesar venta</p>
                </div>
              </div>

              {/* Impact */}
              <div className="bg-green-50 rounded-lg p-4 text-center mt-4">
                <p className="text-sm text-green-900">Venta ganada: <strong className="text-lg">S/. 1,500</strong></p>
                <p className="text-sm text-green-900">Cliente feliz: <strong>Compra más</strong></p>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Result Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-8">
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 text-center">
            <span className="block text-4xl font-extrabold text-slate-900 mb-2">S/. 1,500</span>
            <span className="text-sm text-slate-700 font-medium">Diferencia en esta venta</span>
          </div>
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 text-center">
            <span className="block text-4xl font-extrabold text-slate-900 mb-2">8%</span>
            <span className="text-sm text-slate-700 font-medium">De tus ventas son como esta</span>
          </div>
          <div className="bg-gradient-to-br from-dygsom-green to-green-600 rounded-xl shadow-xl p-6 text-center text-white">
            <span className="block text-4xl font-extrabold mb-2">S/. 40,000/año</span>
            <span className="text-sm font-medium opacity-95">Recuperas en total (tienda S/. 500K)</span>
          </div>
        </div>

        {/* Methodology Note */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-4 text-center">
            <p className="text-xs md:text-sm text-slate-800">
              <span className="text-lg mr-1">📊</span>
              <strong className="text-blue-900">Metodología:</strong> Scores de fraude basados en análisis comparativo de sistemas tradicionales vs DYGSOM con contexto local LATAM.
              <span className="text-blue-800"> Ejemplo ilustrativo con métricas referenciales de industria.</span>
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
