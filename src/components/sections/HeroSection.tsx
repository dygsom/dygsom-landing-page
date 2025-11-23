import React from 'react';
import { Button } from '../ui/Button';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[70vh] md:h-[80vh] flex items-center justify-center text-center overflow-hidden bg-gradient-to-br from-dygsom-dark to-slate-950">
      <div className="absolute inset-0 z-0 opacity-20">
        <svg width="100%" height="100%" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          <path d="M0 0C240 200 480 300 720 300C960 300 1200 200 1440 0V800H0V0Z" fill="url(#hero-gradient)"/>
          <path d="M0 800C240 600 480 500 720 500C960 500 1200 600 1440 800V800H0V800Z" fill="url(#hero-gradient)" opacity="0.3"/>
          <defs>
            <linearGradient id="hero-gradient" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#0EA5E9"/>
              <stop offset="1" stopColor="#3B82F6"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative z-10 max-w-4xl px-4 md:px-6 animate-fade-in">
        <span className="text-dygsom-blue uppercase text-xs md:text-sm font-semibold tracking-widest mb-3 block">Seguridad Inteligente • Decisiones en Milisegundos</span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-dygsom-light-text mb-4 md:mb-6">
          Detección de Fraude en <span className="text-dygsom-blue">Tiempo Real</span>
          <br className="hidden sm:block" /> para E-commerce y Fintech en LATAM
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-slate-300 mb-6 md:mb-8 px-2">
          Nuestra solución API-first, basada en Machine Learning, protege tus transacciones con
          <span className="font-bold text-dygsom-green"> &gt;95% de precisión</span> y <span className="font-bold text-dygsom-accent"> &lt;100ms de respuesta</span>.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4">
          <Button>Agenda una Demo</Button>
          <Button variant="outline">Ver Cómo Funciona</Button>
        </div>
      </div>
    </section>
  );
};
