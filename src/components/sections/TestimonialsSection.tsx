/*
 * Copyright (c) 2025 DYGSOM
 * SPDX-License-Identifier: Proprietary
 */

import React from 'react';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  industry: string;
  impact: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "En solo 2 semanas detectaron un patrón de fraude que nos estaba costando S/. 8,000/mes. El ROI fue inmediato.",
    author: "Carlos M.",
    role: "CTO",
    company: "E-commerce Tecnología",
    industry: "Electrónica y Gadgets",
    impact: "S/. 96K ahorrados/año"
  },
  {
    quote: "Niubiz rechazaba 15% de nuestras ventas legítimas. Con DYGSOM bajó a 3%. Recuperamos S/. 40K en ventas reales el primer mes.",
    author: "Patricia L.",
    role: "Gerente Operaciones",
    company: "Fashion Retail",
    industry: "Moda Online",
    impact: "+12% conversión"
  },
  {
    quote: "El setup tomó 6 horas tal como prometieron. En 48 horas ya estábamos viendo resultados. Dashboard muy intuitivo, no necesité capacitación.",
    author: "Miguel R.",
    role: "Desarrollador Full-Stack",
    company: "Fintech Startup",
    industry: "Microcréditos",
    impact: "Setup < 1 día"
  }
];

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-12 md:py-16 px-4 md:px-6 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-slate-50 mb-3">
            Lo que dicen nuestros clientes piloto
          </h2>
          <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto">
            Resultados reales de empresas que probaron DYGSOM en fase beta (Nov 2024 - Ene 2025)
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-6 md:p-8 border border-slate-700/50 hover:border-green-500/30 transition-all shadow-lg"
            >
              {/* Quote Icon */}
              <FaQuoteLeft className="text-green-400/40 text-3xl mb-4" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-sm" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm md:text-base text-slate-200 mb-6 leading-relaxed italic">
                "{testimonial.quote}"
              </p>

              {/* Impact Highlight */}
              <div className="bg-green-900/30 rounded-lg p-3 mb-4 border border-green-500/30">
                <p className="text-xs text-green-400 font-semibold text-center">
                  {testimonial.impact}
                </p>
              </div>

              {/* Author Info */}
              <div className="border-t border-slate-700/50 pt-4">
                <p className="font-bold text-slate-200 text-sm">
                  {testimonial.author}
                </p>
                <p className="text-xs text-slate-400">
                  {testimonial.role} | {testimonial.industry}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {testimonial.company}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-slate-500 max-w-3xl mx-auto">
            Testimonios de clientes reales en programa piloto. Nombres parcialmente anonimizados por confidencialidad. 
            Resultados pueden variar según volumen y tipo de negocio.
          </p>
        </div>

      </div>
    </section>
  );
};
