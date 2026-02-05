/*
 * Copyright (c) 2025 DYGSOM
 * SPDX-License-Identifier: Proprietary
 */

import React from 'react';
import { FaChartLine, FaCheckCircle, FaClock, FaDollarSign } from 'react-icons/fa';
import { FeatureCard } from '../ui/FeatureCard';

export const AdvantagesSection: React.FC = () => {
  return (
    <section className="py-12 md:py-20 px-4 md:px-6 bg-slate-950" id="ventajas">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-50 mb-4">
            Por Qué Elegir DYGSOM
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            4 beneficios clave para e-commerce y fintech en LATAM
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <FeatureCard
            icon={<FaCheckCircle />}
            title="Más Ventas Aprobadas"
            description="Reduce falsos positivos 70%, recuperando hasta S/. 40K/año en ventas legítimas rechazadas."
          />
          <FeatureCard
            icon={<FaChartLine />}
            title="Menos Fraude Real"
            description="Bloquea 95% de ataques (bots, credential stuffing, API abuse) sin friccionar clientes."
          />
          <FeatureCard
            icon={<FaDollarSign />}
            title="83% Más Económico"
            description="Una plataforma integral desde S/. 699/mes vs 4 herramientas separadas a US$ 500-800/mes."
          />
          <FeatureCard
            icon={<FaClock />}
            title="Setup en 6-8 Horas"
            description="Integración vía API, compatible con tu pasarela actual, sin reemplazar sistemas."
          />
        </div>
      </div>
    </section>
  );
};
