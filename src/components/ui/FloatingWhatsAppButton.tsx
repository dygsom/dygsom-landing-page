import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

export const FloatingWhatsAppButton: React.FC = () => {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/51980918191', '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 opacity-80 hover:opacity-100"
      aria-label="Contactar por WhatsApp"
      title="Contactar por WhatsApp"
    >
      <FaWhatsapp className="text-2xl" />
    </button>
  );
};