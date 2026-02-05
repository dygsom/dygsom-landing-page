/*
 * Copyright (c) 2025 DYGSOM
 * SPDX-License-Identifier: Proprietary
 */

import React from 'react';

export const BeforeAfterComparisonSection: React.FC = () => {
  return (
    <section id="comparacion" className="py-12 md:py-20 px-4 md:px-6 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4">
            Mismo Cliente, Resultado Diferente
          </h2>
          <p className="text-lg text-slate-700">
            Compra legítima desde San Juan de Lurigancho, 11:30 PM, VPN corporativo
          </p>
        </div>

        {/* Simple Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          
          {/* Sistema Tradicional */}
          <div className="bg-white rounded-2xl shadow-lg border-2 border-red-400 p-6 md:p-8">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
              <h3 className="text-xl md:text-2xl font-bold text-slate-900">Sistema Global</h3>
              <span className="bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-bold">RECHAZADO</span>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-2 text-slate-700">
                <span className="text-red-500 font-bold">✗</span>
                <span className="text-sm">Dirección SJL marcada como "sospechosa"</span>
              </div>
              <div className="flex items-start gap-2 text-slate-700">
                <span className="text-red-500 font-bold">✗</span>
                <span className="text-sm">Compra nocturna = riesgo alto</span>
              </div>
              <div className="flex items-start gap-2 text-slate-700">
                <span className="text-red-500 font-bold">✗</span>
                <span className="text-sm">VPN corporativo = señal de fraude</span>
              </div>
            </div>

            <div className="bg-red-50 rounded-lg p-4 text-center">
              <p className="text-sm text-red-800 mb-1">Score de fraude:</p>
              <p className="text-4xl font-extrabold text-red-600 mb-2">92%</p>
              <p className="text-xs text-red-700 font-semibold">Venta perdida: S/. 1,500</p>
            </div>
          </div>

          {/* DYGSOM */}
          <div className="bg-white rounded-2xl shadow-lg border-2 border-green-500 p-6 md:p-8">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200">
              <h3 className="text-xl md:text-2xl font-bold text-slate-900">DYGSOM Local</h3>
              <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold">APROBADO</span>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-2 text-slate-700">
                <span className="text-green-500 font-bold">✓</span>
                <span className="text-sm">Dirección SJL = normal en Perú</span>
              </div>
              <div className="flex items-start gap-2 text-slate-700">
                <span className="text-green-500 font-bold">✓</span>
                <span className="text-sm">11:30 PM = común en e-commerce local</span>
              </div>
              <div className="flex items-start gap-2 text-slate-700">
                <span className="text-green-500 font-bold">✓</span>
                <span className="text-sm">VPN = empresa conocida en Lima</span>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-4 text-center">
              <p className="text-sm text-green-800 mb-1">Score de fraude:</p>
              <p className="text-4xl font-extrabold text-green-600 mb-2">12%</p>
              <p className="text-xs text-green-700 font-semibold">Venta ganada: S/. 1,500</p>
            </div>
          </div>
        </div>

        {/* Impact Summary */}
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-xl p-6 md:p-8 text-center text-white max-w-3xl mx-auto">
          <p className="text-base md:text-lg mb-2 opacity-90">Si 8% de tus transacciones son como esta...</p>
          <p className="text-4xl md:text-5xl font-extrabold mb-2">S/. 40,000/año</p>
          <p className="text-base opacity-90">en ventas legítimas recuperadas (tienda S/. 500K)</p>
        </div>

      </div>
    </section>
  );
};
