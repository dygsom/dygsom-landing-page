/*
 * Copyright (c) 2025 DYGSOM
 * SPDX-License-Identifier: Proprietary
 */

import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { trackFAQExpansion } from '../../utils/analytics';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl shadow-lg border border-slate-700/50 overflow-hidden transition-all hover:border-green-500/30">
      <button
        onClick={() => {
          const newState = !isOpen;
          setIsOpen(newState);
          trackFAQExpansion(question, newState);
        }}
        className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-green-500/50 rounded-xl transition-all"
      >
        <h3 className="text-base md:text-lg font-bold text-slate-200 pr-4">{question}</h3>
        <span className="flex-shrink-0 text-green-400">
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </button>
      {isOpen && (
        <div className="px-6 pb-5 pt-2">
          <p className="text-sm md:text-base text-slate-300 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
};

export const FAQSection: React.FC = () => {
  const faqs = [
    {
      question: "¿Qué protegen los 4 pilares de DYGSOM?",
      answer: "Bot Detection bloquea scrapers y tráfico automatizado. Account Protection previene credential stuffing con 14B credenciales verificadas. API Security aplica rate limiting contra abuso. Fraud Patterns detecta transacciones anómalas con ML. Todo integrado en una plataforma."
    },
    {
      question: "¿Afecta la latencia de mi checkout?",
      answer: "Promedio +45ms por transacción (imperceptible para usuarios). Nuestros servidores en AWS us-east-1 procesan validaciones en paralelo sin bloquear tu flujo. Si necesitas <30ms, ofrecemos validación asíncrona post-checkout."
    },
    {
      question: "¿Qué pasa si la API de DYGSOM cae?",
      answer: "Tienes 3 opciones configurables: 1) Aprobar transacción (recomendado para alta conversión), 2) Rechazar (máxima seguridad), 3) Usar caché local de últimos 1000 usuarios verificados. SLA 99.9% uptime en planes Crecimiento y Enterprise."
    },
    {
      question: "¿Con qué pasarelas es compatible?",
      answer: "Todas las principales de LATAM: Niubiz, Izipay, Mercado Pago, Culqi, PayU, Stripe, Kushki. También plataformas: Shopify, WooCommerce, PrestaShop, Magento. Si usas otra, integramos vía API REST en ~4 horas."
    },
    {
      question: "¿Reemplaza mi pasarela de pagos?",
      answer: "No. DYGSOM se integra con tu pasarela actual añadiendo inteligencia con contexto LATAM sin cambiar tu procesador. Trabajamos en conjunto para mejores resultados: reduces fraude Y aumentas aprobaciones."
    },
    {
      question: "¿Por qué es 83% más económico que otras soluciones?",
      answer: "Porque unificamos 4 herramientas separadas (Cloudflare Bot ~$200, Have I Been Pwned ~$100, Kong API ~$150, Sift Fraud ~$250) en una plataforma. Desde S/. 699/mes vs US$ 500-800/mes de soluciones separadas."
    },
    {
      question: "¿Cuánto tarda la integración?",
      answer: "6-8 horas para un desarrollador con experiencia en APIs. Proporcionamos documentación clara, ejemplos de código y soporte en vivo durante la integración. Compatible con Shopify, WooCommerce y custom."
    },
    {
      question: "¿Necesito un desarrollador full-time para mantenerlo?",
      answer: "No. Después del setup inicial (6-8h), el mantenimiento promedio es 2h/mes para ajustar reglas según tu negocio. Dashboard no-code te permite cambiar thresholds sin programar. Soporte técnico incluido en todos los planes."
    },
    {
      question: "¿Qué datos necesitan y cómo los protegen?",
      answer: "Solo email, IP, monto y timestamp. NO necesitamos datos de tarjeta (somos PCI compliant). Tu información está encriptada end-to-end. Cumplimos GDPR y Ley de Protección de Datos Personales de Perú."
    },
    {
      question: "¿Puedo cancelar cuando quiera?",
      answer: "Sí. Sin contratos anuales ni penalizaciones. Cancela cualquier mes si el servicio no cumple tus expectativas. Primeros 30 días gratis para probar sin riesgo."
    }
  ];

  return (
    <section id="faq" className="py-12 md:py-20 px-4 md:px-6 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900">
      <div className="max-w-4xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-50 mb-4">
            Preguntas Frecuentes
          </h2>
          <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto">
            Respuestas rápidas a las dudas más comunes
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-10 text-center p-6 bg-slate-800/30 rounded-xl border border-slate-700/50">
          <p className="text-slate-300 mb-3">¿Tienes otra pregunta?</p>
          <a
            href="#contacto"
            className="text-green-400 hover:text-green-300 font-semibold transition-colors"
            onClick={(e) => {
              e.preventDefault();
              const contactSection = document.getElementById('contacto');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
          >
            Contáctanos directamente →
          </a>
        </div>

      </div>
    </section>
  );
};
