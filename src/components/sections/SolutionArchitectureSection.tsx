/*
 * Copyright (c) 2025 DYGSOM
 * SPDX-License-Identifier: Proprietary
 */

import React from 'react';
import { FaRobot, FaShieldAlt, FaServer, FaBrain } from 'react-icons/fa';

export const SolutionArchitectureSection: React.FC = () => {
  return (
    <section className="py-12 md:py-20 px-4 md:px-6 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" id="solucion">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-50 mb-4">
            Protección Integral con{' '}
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              4 Pilares
            </span>
          </h2>
          <p className="text-base md:text-lg text-slate-400 max-w-3xl mx-auto">
            Primera plataforma LATAM que unifica bot detection, account protection, API security y fraud patterns
          </p>
        </div>

        {/* 4 Pilares Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 md:mb-16">
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl shadow-xl border border-sky-500/30 p-6 hover:border-sky-500 transition-all text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-sky-500/10 rounded-full">
              <FaRobot className="w-8 h-8 text-sky-400" />
            </div>
            <h3 className="text-lg font-bold text-sky-400 mb-2">Bot Detection</h3>
            <p className="text-sm text-slate-300">Bloquea scrapers y tráfico automatizado</p>
          </div>

          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl shadow-xl border border-red-500/30 p-6 hover:border-red-500 transition-all text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-red-500/10 rounded-full">
              <FaShieldAlt className="w-8 h-8 text-red-400" />
            </div>
            <h3 className="text-lg font-bold text-red-400 mb-2">Account Protection</h3>
            <p className="text-sm text-slate-300">Previene credential stuffing y takeover</p>
          </div>

          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl shadow-xl border border-purple-500/30 p-6 hover:border-purple-500 transition-all text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-purple-500/10 rounded-full">
              <FaServer className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-lg font-bold text-purple-400 mb-2">API Security</h3>
            <p className="text-sm text-slate-300">Rate limiting y detección de abuso</p>
          </div>

          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl shadow-xl border border-green-500/30 p-6 hover:border-green-500 transition-all text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-green-500/10 rounded-full">
              <FaBrain className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-lg font-bold text-green-400 mb-2">Fraud Patterns</h3>
            <p className="text-sm text-slate-300">ML para detectar patrones anómalos</p>
          </div>
        </div>

        {/* Comparison: Traditional vs DYGSOM */}
        <div className="max-w-5xl mx-auto mb-12 md:mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-slate-200 text-center mb-8">
            Contexto Local vs Sistemas Globales
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Traditional System */}
            <div className="bg-gradient-to-br from-red-900/20 to-slate-900/50 backdrop-blur-sm rounded-2xl shadow-xl border border-red-500/30 p-6">
              <h4 className="text-lg font-bold text-red-400 mb-4 text-center">Soluciones Tradicionales</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-slate-300">
                  <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span>4 herramientas separadas (Cloudflare Bot + Have I Been Pwned + Kong + Sift)</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-300">
                  <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span>Costo combinado: US$ 500-800/mes</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-300">
                  <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span>Integraciones complejas, sin visibilidad unificada</span>
                </li>
              </ul>
            </div>

            {/* DYGSOM */}
            <div className="bg-gradient-to-br from-green-900/30 to-slate-900 backdrop-blur-sm rounded-2xl shadow-2xl border-2 border-green-500 p-6">
              <h4 className="text-lg font-bold text-green-400 mb-4 text-center">DYGSOM (Todo en Uno)</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-slate-300">
                  <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span>1 plataforma con 4 pilares integrados</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-300">
                  <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span>Desde S/. 699/mes (83% más económico)</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-slate-300">
                  <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span>Setup en 6-8 horas, dashboard único, contexto LATAM</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Simple Value Prop */}
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-br from-green-900/20 to-slate-900/50 backdrop-blur-sm rounded-xl shadow-xl border border-green-500/30 p-6">
            <p className="text-base text-slate-300 mb-2">
              <span className="font-bold text-green-400">No reemplazamos</span> tu pasarela actual.
            </p>
            <p className="text-base text-slate-300">
              Agregamos una capa de inteligencia con <span className="font-bold text-green-400">contexto LATAM</span> que trabaja en conjunto con tus sistemas.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
