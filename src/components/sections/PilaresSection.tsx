/*
 * Copyright (c) 2025 DYGSOM
 * SPDX-License-Identifier: Proprietary
 */

import React, { useState } from 'react';
import { FaRobot, FaShieldAlt, FaServer, FaBrain } from 'react-icons/fa';
import { trackPilarInteraction } from '../../utils/analytics';

interface Pilar {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  bgGradient: string;
  borderColor: string;
  problem: string;
  solution: string;
  stat: string;
  impactNumber: string;
}

const pilares: Pilar[] = [
  {
    id: 'bot-detection',
    name: 'Bot Detection',
    icon: <FaRobot className="text-5xl" />,
    color: '#0EA5E9',
    bgGradient: 'from-blue-900/30 to-slate-900/50',
    borderColor: 'border-blue-500/50 hover:border-blue-400',
    problem: '40% del tráfico web es bot malicioso**',
    solution: 'Bloqueamos 90%+ bots sin afectar usuarios reales',
    stat: 'Ahorro $600/mes en costos infraestructura',
    impactNumber: '90%'
  },
  {
    id: 'account-takeover',
    name: 'Account Takeover Prevention',
    icon: <FaShieldAlt className="text-5xl" />,
    color: '#EF4444',
    bgGradient: 'from-red-900/30 to-slate-900/50',
    borderColor: 'border-red-500/50 hover:border-red-400',
    problem: '14B credenciales comprometidas circulan*',
    solution: 'Verificamos contra base de datos global en tiempo real',
    stat: '95% ataques credential stuffing bloqueados',
    impactNumber: '14B'
  },
  {
    id: 'api-security',
    name: 'API Security',
    icon: <FaServer className="text-5xl" />,
    color: '#8B5CF6',
    bgGradient: 'from-purple-900/30 to-slate-900/50',
    borderColor: 'border-purple-500/50 hover:border-purple-400',
    problem: 'API abuse eleva costos cloud 40-60%',
    solution: 'Rate limiting inteligente protege infraestructura',
    stat: 'Reducción 85-95% requests abusivos',
    impactNumber: '85%'
  },
  {
    id: 'fraud-patterns',
    name: 'Fraud Patterns',
    icon: <FaBrain className="text-5xl" />,
    color: '#22C55E',
    bgGradient: 'from-green-900/30 to-slate-900/50',
    borderColor: 'border-green-500/50 hover:border-green-400',
    problem: 'Fraude transaccional 2-3% de ventas',
    solution: 'ML detecta anomalías y patrones fraudulentos',
    stat: 'Fraude reducido a <0.3% de ventas',
    impactNumber: '<0.3%'
  }
];

export const PilaresSection: React.FC = () => {
  const [hoveredPilar, setHoveredPilar] = useState<string | null>(null);

  return (
    <section className="py-12 md:py-20 px-4 md:px-6 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" id="pilares">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-50 mb-3 md:mb-4">
            4 Pilares de Protección Integral
          </h2>
          <p className="text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Primera plataforma LATAM que integra cyberseguridad preventiva y detección de fraude en una solución unificada.
          </p>
        </div>

        {/* Grid de Pilares - Vista Simplificada */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12">
          {pilares.map((pilar) => (
            <div
              key={pilar.id}
              className={`relative group p-8 md:p-10 rounded-2xl border-2 bg-gradient-to-br ${pilar.bgGradient} ${pilar.borderColor} transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer min-h-[280px] flex flex-col items-center justify-center`}
              onMouseEnter={() => {
                setHoveredPilar(pilar.id);
                trackPilarInteraction(pilar.name, 'hover');
              }}
              onMouseLeave={() => setHoveredPilar(null)}
            >
              {/* Vista por defecto: Icono + Nombre + Impact Number */}
              <div className={`transition-opacity duration-300 text-center ${hoveredPilar === pilar.id ? 'opacity-0 absolute' : 'opacity-100'}`}>
                {/* Icono */}
                <div className="flex items-center justify-center mb-6" style={{ color: pilar.color }}>
                  {pilar.icon}
                </div>

                {/* Título */}
                <h3 className="text-2xl md:text-3xl font-bold text-slate-50 mb-6">
                  {pilar.name}
                </h3>

                {/* Impact Number destacado */}
                <div className="mb-2">
                  <span className="text-5xl md:text-6xl font-extrabold bg-gradient-to-br from-slate-50 to-slate-300 bg-clip-text text-transparent">
                    {pilar.impactNumber}
                  </span>
                </div>
                
                {/* Etiqueta de impacto */}
                <p className="text-sm text-slate-400 font-medium">
                  Tasa de efectividad
                </p>
              </div>

              {/* Vista en hover: Detalles completos */}
              <div className={`transition-opacity duration-300 ${hoveredPilar === pilar.id ? 'opacity-100' : 'opacity-0 absolute pointer-events-none'}`}>
                {/* Problema */}
                <div className="mb-4">
                  <p className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">Problema</p>
                  <p className="text-sm md:text-base text-slate-200 leading-relaxed">{pilar.problem}</p>
                </div>

                {/* Solución */}
                <div className="mb-4">
                  <p className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">Solución</p>
                  <p className="text-sm md:text-base text-slate-200 leading-relaxed">{pilar.solution}</p>
                </div>

                {/* Estadística destacada */}
                <div className="p-4 rounded-lg bg-slate-800/70 border border-slate-700">
                  <p className="text-sm text-slate-300 text-center leading-relaxed">
                    {pilar.stat}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Section */}
        <div className="text-center">
          <p className="text-slate-400 text-sm md:text-base mb-4">
            Cada pilar refuerza al siguiente. Si un atacante pasa una capa, es detenido por la siguiente.
          </p>
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600/20 to-green-600/20 rounded-lg border border-slate-700">
            <p className="text-slate-200 font-semibold">
              Defensa en profundidad: 4 capas de protección continua 24/7
            </p>
          </div>

          {/* Footnotes - Referencias de datos */}
          <div className="mt-8 pt-6 border-t border-slate-700/50 text-left max-w-3xl mx-auto">
            <p className="text-xs text-slate-500 mb-2">
              <span className="font-semibold">Fuentes de datos:</span>
            </p>
            <ul className="space-y-1 text-xs text-slate-500">
              <li>* 14B credenciales: Have I Been Pwned (12B) + DeepStrike 2025 (2B)</li>
              <li>** 40% tráfico bot: Imperva Bad Bot Report 2024</li>
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
};
