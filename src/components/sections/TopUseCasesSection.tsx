/*
 * Copyright (c) 2025 DYGSOM
 * SPDX-License-Identifier: Proprietary
 */

import React from 'react';
import { FaRobot, FaKey, FaServer, FaBrain } from 'react-icons/fa';

interface UseCase {
  id: number;
  pilar: string;
  pilarColor: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  problema: string;
  solucion: string;
  ejemplo: string;
  impacto: string;
}

const topUseCases: UseCase[] = [
  {
    id: 1,
    pilar: 'Bot Detection',
    pilarColor: 'text-sky-400',
    icon: FaRobot,
    title: 'Web Scraping Agresivo',
    problema: 'Bots raspan precios cada 30 segundos, saturando infraestructura y revelando estrategia comercial a competidores.',
    solucion: 'Sistema detecta patrones no humanos (velocidad, user-agent, headers) y aplica rate limiting inteligente o CAPTCHA solo a tráfico sospechoso.',
    ejemplo: 'E-commerce con 50K visitas/día: 40% eran bots. DYGSOM bloqueó 90% de scrapers en 48h.',
    impacto: 'Reducción 75% en costos AWS/Azure por tráfico inútil'
  },
  {
    id: 2,
    pilar: 'Account Takeover Prevention',
    pilarColor: 'text-red-400',
    icon: FaKey,
    title: 'Credential Stuffing Attack',
    problema: 'Atacantes prueban 14 mil millones de credenciales filtradas contra tu login, comprometiendo cuentas con saldos o datos de pago.',
    solucion: 'Verifica cada login contra base actualizada de credenciales comprometidas. Fuerza MFA solo cuando detecta credencial en riesgo.',
    ejemplo: 'Fintech recibió 8,500 intentos de login en 2 horas. 87% usaban credenciales ya comprometidas.',
    impacto: 'Bloqueo 95% de ataques sin friccionar clientes legítimos'
  },
  {
    id: 3,
    pilar: 'API Security',
    pilarColor: 'text-purple-400',
    icon: FaServer,
    title: 'API Abuse - Requests Excesivos',
    problema: 'Usuarios o bots abusan de APIs públicas (ej: búsqueda, cotizaciones) con 500+ requests/min, elevando costos 40-60%.',
    solucion: 'Rate limiting dinámico por IP/usuario, bloqueo automático de patrones abusivos, alertas cuando se detecta scraping vía API.',
    ejemplo: 'Marketplace tenía 120K llamadas API/día desde 3 IPs. DYGSOM bloqueó 95% sin afectar usuarios normales.',
    impacto: 'Reducción 85-95% en tráfico API abusivo'
  },
  {
    id: 4,
    pilar: 'Fraud Patterns',
    pilarColor: 'text-green-400',
    icon: FaBrain,
    title: 'Patrón de Transacciones Rápidas',
    problema: 'Tarjetas clonadas se prueban con múltiples compras <S/. 50 en <10 min antes de ser bloqueadas por banco.',
    solucion: 'ML detecta secuencias anómalas: múltiples tarjetas desde misma IP, cambios de ubicación imposibles, productos de alta liquidez.',
    ejemplo: 'E-commerce detectó usuario que intentó 7 compras en 5 min desde Lima, Cusco y Arequipa (VPN).',
    impacto: 'Fraude reducido de 2-3% a <0.3% de ventas totales'
  }
];

export const TopUseCasesSection: React.FC = () => {
  return (
    <section
      id="casos-uso-top"
      className="relative py-16 md:py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-50 mb-4">
            4 Casos de Uso{' '}
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Más Frecuentes
            </span>
          </h2>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
            Cada pilar resuelve amenazas reales que enfrentan e-commerce y fintech en LATAM
          </p>
        </div>

        {/* Use Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12">
          {topUseCases.map((useCase) => {
            const Icon = useCase.icon;
            return (
              <div
                key={useCase.id}
                className="group relative bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-slate-700/50 hover:border-slate-600 transition-all duration-300 hover:shadow-xl hover:shadow-slate-900/50 hover:-translate-y-1"
              >
                {/* Pilar Badge */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-3 rounded-lg bg-slate-900/50 ${useCase.pilarColor}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className={`text-sm font-semibold ${useCase.pilarColor}`}>
                    {useCase.pilar}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold text-slate-50 mb-3">
                  {useCase.title}
                </h3>

                {/* Problema */}
                <div className="mb-4">
                  <p className="text-sm font-semibold text-red-400 mb-1">PROBLEMA:</p>
                  <p className="text-sm md:text-base text-slate-300 leading-relaxed">
                    {useCase.problema}
                  </p>
                </div>

                {/* Solución */}
                <div className="mb-4">
                  <p className="text-sm font-semibold text-green-400 mb-1">SOLUCIÓN DYGSOM:</p>
                  <p className="text-sm md:text-base text-slate-300 leading-relaxed">
                    {useCase.solucion}
                  </p>
                </div>

                {/* Ejemplo Real */}
                <div className="mb-4 bg-slate-900/30 rounded-lg p-4 border-l-4 border-blue-500">
                  <p className="text-xs font-semibold text-blue-400 mb-1">EJEMPLO REAL:</p>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {useCase.ejemplo}
                  </p>
                </div>

                {/* Impacto */}
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <p className="text-sm md:text-base font-semibold text-green-400">
                    {useCase.impacto}
                  </p>
                </div>

                {/* Hover Gradient Overlay */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-green-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            );
          })}
        </div>

        {/* CTA para ver todos los casos */}
        <div className="text-center">
          <div className="inline-flex flex-col items-center gap-3 bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-slate-700/50">
            <p className="text-slate-300 text-base md:text-lg">
              Estos son solo 4 de los 12 casos de uso que DYGSOM puede resolver
            </p>
            <p className="text-sm text-slate-400">
              Próximamente: Página dedicada con análisis completo de los 12 escenarios
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
