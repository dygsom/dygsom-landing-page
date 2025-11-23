import React from 'react';
import { Button } from '../ui/Button';

export const CallToActionSection: React.FC = () => {
  return (
    <section className="py-12 md:py-20 px-4 md:px-6 bg-gradient-to-br from-dygsom-blue to-cyan-600 text-white text-center" id="contacto">
      <div className="max-w-4xl mx-auto animate-fade-in">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-4 md:mb-6 px-4">
          ¿Listo para Proteger tu Negocio?
        </h2>
        <p className="text-lg md:text-xl mb-8 md:mb-10 px-4">
          Descubre cómo DYGSOM puede reducir tu fraude en un 60% y mejorar la confianza de tus clientes.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4">
          <Button variant="secondary" className="!bg-white !text-dygsom-blue hover:!bg-slate-100 hover:shadow-lg hover:shadow-white/20">
            <a href="mailto:alicia.canta@dygsom.pe?subject=Solicitud%20de%20Demo%20-%20DYGSOM" className="block w-full h-full">
              Agenda una Demo Gratuita
            </a>
          </Button>
          <Button variant="outline" className="border-white text-white hover:bg-white hover:text-dygsom-blue hover:shadow-lg hover:shadow-white/20">
            <a href="mailto:alicia.canta@dygsom.pe?subject=Contacto%20-%20DYGSOM" className="block w-full h-full">
              Contáctanos
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};
