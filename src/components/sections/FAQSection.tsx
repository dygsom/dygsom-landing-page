import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-xl shadow-lg border border-slate-700/50 overflow-hidden transition-all hover:border-green-500/30">
      <button
        onClick={() => setIsOpen(!isOpen)}
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
      question: "¿Reemplaza mi pasarela de pagos actual?",
      answer: "No. DYGSOM se integra CON tu pasarela actual (Niubiz, Izipay, Mercado Pago, Culqi, etc). Añadimos inteligencia adicional sin cambiar tu procesador de pagos."
    },
    {
      question: "¿Por qué necesito esto si mi pasarela ya tiene antifraude?",
      answer: "Las pasarelas usan sistemas globales optimizados para mercados desarrollados. DYGSOM añade contexto local peruano que reduce false positives (clientes legítimos rechazados). Trabajamos en conjunto para mejores resultados."
    },
    {
      question: "¿Funciona con mi plataforma (Shopify, WooCommerce, etc)?",
      answer: "Sí. Nuestra API se integra con cualquier plataforma e-commerce. Tenemos plugins oficiales para Shopify y WooCommerce, y documentación completa para integraciones custom."
    },
    {
      question: "¿Cuánto tarda la integración?",
      answer: "30 minutos para un desarrollador con experiencia básica en APIs. Proporcionamos documentación clara, ejemplos de código y soporte en vivo durante la integración."
    },
    {
      question: "¿Afecta la relación con mi pasarela actual?",
      answer: "No. Trabajamos en conjunto. Tu pasarela sigue procesando pagos normalmente. DYGSOM solo añade una recomendación que tú puedes usar o ignorar."
    },
    {
      question: "¿Qué datos necesitan?",
      answer: "Solo necesitamos: email del cliente, IP, monto de la transacción y timestamp. NO necesitamos datos de tarjeta (somos PCI compliant). Tu información está encriptada y protegida."
    },
    {
      question: "¿Puedo cancelar cuando quiera?",
      answer: "Sí. Sin contratos anuales ni penalizaciones. Cancela cualquier mes si el servicio no cumple tus expectativas."
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
