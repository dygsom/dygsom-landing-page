/*
 * Copyright (c) 2025 DYGSOM
 * SPDX-License-Identifier: Proprietary
 */

import React from 'react';
import { FaShopify, FaWordpress, FaStripe, FaCheckCircle } from 'react-icons/fa';
import { SiWoo, SiMercadopago } from 'react-icons/si';

export const TrustSection: React.FC = () => {
  return (
    <section className="py-12 md:py-16 px-4 md:px-6 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border-t border-b border-slate-800/50">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-50 mb-2">
            Confianza y Compatibilidad
          </h2>
          <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto">
            Validado en producción con más de 500K transacciones procesadas
          </p>
        </div>

        {/* Métricas de Beta */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 md:mb-12">
          <div className="bg-slate-800/40 rounded-xl p-6 text-center border border-slate-700/50">
            <div className="text-3xl md:text-4xl font-extrabold text-green-400 mb-2">
              500K+
            </div>
            <p className="text-sm text-slate-300">
              Transacciones procesadas en beta
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Nov 2024 - Ene 2025
            </p>
          </div>

          <div className="bg-slate-800/40 rounded-xl p-6 text-center border border-slate-700/50">
            <div className="text-3xl md:text-4xl font-extrabold text-blue-400 mb-2">
              95%
            </div>
            <p className="text-sm text-slate-300">
              Precisión en detección de fraude
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Validado con clientes piloto
            </p>
          </div>

          <div className="bg-slate-800/40 rounded-xl p-6 text-center border border-slate-700/50">
            <div className="text-3xl md:text-4xl font-extrabold text-purple-400 mb-2">
              99.9%
            </div>
            <p className="text-sm text-slate-300">
              Uptime en período beta
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Infraestructura AWS
            </p>
          </div>
        </div>

        {/* Compatibilidad con Plataformas */}
        <div className="bg-slate-800/30 rounded-2xl p-6 md:p-8 border border-slate-700/50">
          <h3 className="text-lg md:text-xl font-bold text-slate-200 text-center mb-6">
            Compatible con las principales plataformas
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
            {/* Shopify */}
            <div className="flex flex-col items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors">
              <FaShopify className="text-4xl md:text-5xl" />
              <span className="text-xs font-medium">Shopify</span>
            </div>

            {/* WooCommerce */}
            <div className="flex flex-col items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors">
              <SiWoo className="text-4xl md:text-5xl" />
              <span className="text-xs font-medium">WooCommerce</span>
            </div>

            {/* WordPress */}
            <div className="flex flex-col items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors">
              <FaWordpress className="text-4xl md:text-5xl" />
              <span className="text-xs font-medium">WordPress</span>
            </div>

            {/* Stripe */}
            <div className="flex flex-col items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors">
              <FaStripe className="text-4xl md:text-5xl" />
              <span className="text-xs font-medium">Stripe</span>
            </div>

            {/* Mercado Pago */}
            <div className="flex flex-col items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors">
              <SiMercadopago className="text-4xl md:text-5xl" />
              <span className="text-xs font-medium">Mercado Pago</span>
            </div>

            {/* Custom API */}
            <div className="flex flex-col items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors">
              <div className="text-4xl md:text-5xl font-bold">{ }</div>
              <span className="text-xs font-medium">API REST Custom</span>
            </div>
          </div>

          <p className="text-xs text-slate-500 text-center mt-6">
            + Niubiz, Izipay, Culqi, PayU, Kushki y cualquier plataforma con API REST
          </p>
        </div>

        {/* Cumplimiento y Seguridad */}
        <div className="mt-8 md:mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3 bg-slate-800/20 rounded-lg p-4 border border-slate-700/30">
            <FaCheckCircle className="text-green-400 text-xl flex-shrink-0 mt-1" />
            <div>
              <h4 className="text-sm font-bold text-slate-200 mb-1">PCI DSS Compliant</h4>
              <p className="text-xs text-slate-400">
                No procesamos ni almacenamos datos de tarjetas. Solo metadata de transacciones.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-slate-800/20 rounded-lg p-4 border border-slate-700/30">
            <FaCheckCircle className="text-green-400 text-xl flex-shrink-0 mt-1" />
            <div>
              <h4 className="text-sm font-bold text-slate-200 mb-1">Certificación ISO 27001</h4>
              <p className="text-xs text-slate-400">
                En proceso de certificación (Q1 2026). Infraestructura cumple estándares enterprise.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
