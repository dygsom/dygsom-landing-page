import React from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

interface TeamMemberProps {
  name: string;
  role: string;
  description: string;
  imageSrc: string;
  linkedinUrl?: string;
  githubUrl?: string;
}

const TeamMemberCard: React.FC<TeamMemberProps> = ({ name, role, description, imageSrc, linkedinUrl, githubUrl }) => {
  return (
    <div className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700 text-center animate-fade-in">
      <img
        src={imageSrc || 'https://via.placeholder.com/150/1f2937/d1d5db?text=Avatar'}
        alt={name}
        className="w-28 h-28 rounded-full mx-auto mb-4 object-cover border-4 border-dygsom-blue"
      />
      <h3 className="text-2xl font-bold text-dygsom-light-text mb-1">{name}</h3>
      <p className="text-dygsom-blue font-medium mb-3">{role}</p>
      <p className="text-slate-400 text-sm mb-4">{description}</p>
      <div className="flex justify-center space-x-4">
        {linkedinUrl && (
          <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-dygsom-blue text-2xl">
            <FaLinkedin />
          </a>
        )}
        {githubUrl && (
          <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-dygsom-blue text-2xl">
            <FaGithub />
          </a>
        )}
      </div>
    </div>
  );
};

export const TeamSection: React.FC = () => {
  return (
    <section className="py-12 md:py-20 px-4 md:px-6 bg-slate-900" id="equipo">
      <div className="max-w-7xl mx-auto text-center mb-8 md:mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-dygsom-light-text mb-3 md:mb-4">
          Nuestro Equipo Fundador
        </h2>
        <p className="text-base md:text-lg text-slate-400 max-w-3xl mx-auto px-4">
          Conoce a la visión detrás de DYGSOM, un equipo apasionado por la seguridad digital y la innovación en LATAM.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
        <TeamMemberCard
          name="Alicia Canta"
          role="CEO / CTO"
          description="Full-stack developer con experiencia en arquitectura de sistemas, desarrollo de APIs e integraciones. Lidera el producto, la tecnología y la estrategia."
          imageSrc="/team/alicia-canta.png"
          linkedinUrl="https://www.linkedin.com/in/alising-ai/"
          githubUrl="https://github.com/aliciacanta-pe"
        />
        <TeamMemberCard
          name="Alicia Canta"
          role="CDO / Head of ML"
          description="Más de 10 años de experiencia en Machine Learning y Data Engineering en el sector bancario. Responsable del desarrollo de modelos ML y la arquitectura de datos."
          imageSrc="/team/alicia-canta.png"
          linkedinUrl="https://www.linkedin.com/in/alising-ai/"
        />
      </div>
      <p className="text-center text-slate-500 mt-12 text-sm">
        Contamos con un talentoso equipo de advisors y un plan de contratación ambicioso para escalar nuestro impacto.
      </p>
    </section>
  );
};
