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
    <div className="bg-slate-800 p-8 rounded-xl shadow-xl border border-slate-700 text-center max-w-2xl mx-auto">
      <img
        src={imageSrc || 'https://via.placeholder.com/150/1f2937/d1d5db?text=Avatar'}
        alt={name}
        className="w-40 h-40 rounded-full mx-auto mb-6 object-cover border-4 border-dygsom-blue shadow-lg"
      />
      <h3 className="text-3xl font-bold text-dygsom-light-text mb-2">{name}</h3>
      <p className="text-dygsom-blue font-semibold text-lg mb-4">{role}</p>
      <p className="text-slate-300 text-base leading-relaxed mb-6 max-w-xl mx-auto">{description}</p>
      <div className="flex justify-center space-x-6">
        {linkedinUrl && (
          <a 
            href={linkedinUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-slate-400 hover:text-dygsom-blue transition-colors text-3xl"
            aria-label="LinkedIn Profile"
          >
            <FaLinkedin />
          </a>
        )}
        {githubUrl && (
          <a 
            href={githubUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-slate-400 hover:text-dygsom-blue transition-colors text-3xl"
            aria-label="GitHub Profile"
          >
            <FaGithub />
          </a>
        )}
      </div>
    </div>
  );
};

export const TeamSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 px-4 md:px-6 bg-slate-900" id="equipo">
      <div className="max-w-7xl mx-auto text-center mb-12 md:mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold text-dygsom-light-text mb-4 md:mb-6">
          Fundador & Líder Técnico
        </h2>
        <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto px-4 leading-relaxed">
          DYGSOM está liderado por un experto en tecnología con más de una década de experiencia 
          en desarrollo de sistemas críticos, inteligencia artificial y arquitectura de datos en el sector financiero.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <TeamMemberCard
          name="Alicia Canta"
          role="Founder, CEO & CTO"
          description="Ingeniera de software full-stack con más de 10 años de experiencia en Machine Learning, Data Engineering y desarrollo de sistemas de alto rendimiento para el sector bancario. Especializada en arquitectura de microservicios, APIs escalables y modelos de ML para detección de fraudes. Lidera la visión estratégica, el desarrollo del producto y la arquitectura tecnológica de DYGSOM."
          imageSrc="/team/alicia-canta.png"
          linkedinUrl="https://www.linkedin.com/in/alising-ai/"
          githubUrl="https://github.com/aliciacanta-pe"
        />
      </div>

      <div className="mt-12 md:mt-16 max-w-3xl mx-auto">
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 md:p-8">
          <h3 className="text-xl md:text-2xl font-bold text-dygsom-light-text mb-4 text-center">
            Experiencia y Trayectoria
          </h3>
          <div className="grid md:grid-cols-2 gap-6 text-slate-300">
            <div>
              <h4 className="font-semibold text-dygsom-blue mb-2">Expertise Técnico</h4>
              <ul className="text-sm space-y-1 text-slate-400">
                <li>• Machine Learning & Deep Learning</li>
                <li>• Arquitectura de Microservicios</li>
                <li>• Python, TypeScript, React</li>
                <li>• AWS, Docker, Kubernetes</li>
                <li>• FastAPI, Node.js</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-dygsom-blue mb-2">Experiencia en Industria</h4>
              <ul className="text-sm space-y-1 text-slate-400">
                <li>• +10 años en sector bancario</li>
                <li>• Detección de fraudes y AML</li>
                <li>• Sistemas de scoring crediticio</li>
                <li>• Data pipelines a gran escala</li>
                <li>• Compliance y regulación financiera</li>
              </ul>
            </div>
          </div>
        </div>

        <p className="text-center text-slate-400 mt-8 text-sm md:text-base leading-relaxed">
          DYGSOM está en proceso de expansión activa. Contamos con una red de advisors especializados 
          y un plan estratégico de contratación para escalar el equipo técnico y comercial en LATAM.
        </p>
      </div>
    </section>
  );
};
