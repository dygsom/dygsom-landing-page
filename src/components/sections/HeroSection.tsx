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

      <div className="relative z-10 max-w-5xl px-4 md:px-6 animate-fade-in">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-dygsom-light-text mb-4 md:mb-6">
          Plataforma antifraude para <span className="text-dygsom-blue">e-commerce y fintech</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-slate-300 mb-6 md:mb-8 px-2 max-w-3xl mx-auto">
          Detecta y bloquea intentos de fraude en pagos online con modelos de IA entrenados para el contexto de Latinoamérica, sin fricción para tus clientes legítimos.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8 text-sm md:text-base text-slate-300 max-w-3xl mx-auto">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-dygsom-green" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
            <span>Decisiones en milisegundos: aprobar, revisar o rechazar</span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8 text-sm md:text-base text-slate-300 max-w-3xl mx-auto">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-dygsom-green" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
            <span>Integración vía API en días, no en meses</span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8 text-sm md:text-base text-slate-300 max-w-3xl mx-auto">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-dygsom-green" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
            <span>Diseñado para comercios y fintech en crecimiento</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4">
          <Button>Solicitar demo</Button>
          <Button variant="outline">Hablar con el equipo</Button>
        </div>
      </div>
    </section>
  );
};
