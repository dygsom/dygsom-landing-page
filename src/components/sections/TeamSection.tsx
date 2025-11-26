import React from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

export const TeamSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 px-4 md:px-6 bg-slate-900" id="equipo">
      <div className="max-w-7xl mx-auto text-center mb-10 md:mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-dygsom-light-text mb-4 md:mb-6">
          ¿Quién está detrás de DYGSOM?
        </h2>
        <p className="text-base md:text-lg text-slate-300 max-w-4xl mx-auto px-4 leading-relaxed">
          DYGSOM nace de la experiencia directa en datos, banca y prevención de fraude en el sector financiero y de retail, combinada con una visión clara: hacer que la analítica avanzada y la IA antifraude sean accesibles para e-commerce y fintech en crecimiento.
        </p>
      </div>

      <div className="max-w-4xl mx-auto mb-12 md:mb-16">
        <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 md:p-12">
          <div className="text-center mb-6">
            <h3 className="text-2xl md:text-3xl font-bold text-dygsom-light-text mb-2">
              Fundadora – Alicia Canta Pandal
            </h3>
            <p className="text-dygsom-blue text-lg font-semibold mb-6">Founder, CEO & CTO</p>
          </div>
          
          <div className="space-y-4 text-slate-300 text-base md:text-lg leading-relaxed">
            <p>
              Ingeniera de datos y especialista en inteligencia artificial aplicada, con experiencia en proyectos de banca, seguros, finanzas y retail. Ha liderado el diseño de arquitecturas de datos, modelos de riesgo y soluciones en la nube para grandes volúmenes de información transaccional.
            </p>
            <p>
              Alicia impulsa DYGSOM con una visión clara: que las empresas de Latinoamérica puedan proteger sus canales digitales con tecnología al nivel de los grandes jugadores, pero adaptada a su realidad y presupuesto.
            </p>
          </div>

          <div className="mt-8 flex justify-center space-x-6">
            <a 
              href="https://www.linkedin.com/in/alising-ai/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-slate-400 hover:text-dygsom-blue transition-colors text-3xl"
              aria-label="LinkedIn Profile"
            >
              <FaLinkedin />
            </a>
            <a 
              href="https://github.com/aliciacanta-pe" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-slate-400 hover:text-dygsom-blue transition-colors text-3xl"
              aria-label="GitHub Profile"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 md:p-8 text-center">
          <h3 className="text-xl md:text-2xl font-bold text-dygsom-light-text mb-4">
            Equipo DYGSOM
          </h3>
          <p className="text-slate-300 text-base md:text-lg leading-relaxed">
            Contamos con perfiles especializados en desarrollo backend, machine learning, cloud computing y ciberseguridad, enfocados en construir una plataforma robusta, segura y fácil de integrar.
          </p>
        </div>
      </div>
    </section>
  );
};
