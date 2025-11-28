import React from 'react';
import { FaLinkedin, FaYoutube, FaFacebookF } from 'react-icons/fa';
import { SOCIAL_MEDIA, CONTACT_INFO } from '../../utils/constants';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-dygsom-dark py-8 px-6 border-t border-slate-700 text-center text-sm text-slate-400">
      <div className="max-w-7xl mx-auto">
        <p>&copy; {new Date().getFullYear()} DYGSOM Todos los derechos reservados.</p>
        <p className="mt-2">Hecho con ❤️ para la seguridad financiera en Latinoamérica.</p>
        <p className="mt-3">
          <a href="mailto:alicia.canta@dygsom.pe" className="text-dygsom-blue hover:text-cyan-400 transition-colors font-medium">
            alicia.canta@dygsom.pe
          </a>
        </p>
        
        {/* Social Media Links */}
        <div className="flex justify-center space-x-6 mt-6">
          <a 
            href={SOCIAL_MEDIA.LINKEDIN} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-dygsom-blue transition-colors duration-300 transform hover:scale-110"
            aria-label="LinkedIn de DYGSOM"
          >
            <FaLinkedin className="text-2xl" />
          </a>
          <a 
            href={SOCIAL_MEDIA.YOUTUBE} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-red-500 transition-colors duration-300 transform hover:scale-110"
            aria-label="YouTube de DYGSOM"
          >
            <FaYoutube className="text-2xl" />
          </a>
          <a 
            href={SOCIAL_MEDIA.FACEBOOK} 
            className="text-slate-400 hover:text-blue-600 transition-colors duration-300 transform hover:scale-110 opacity-50 cursor-not-allowed"
            aria-label={`Facebook de ${CONTACT_INFO.COMPANY_NAME} (Próximamente)`}
            title="Próximamente"
          >
            <FaFacebookF className="text-2xl" />
          </a>
        </div>
        
        <div className="flex justify-center space-x-4 mt-6">
          <a href="#" className="hover:text-dygsom-blue transition-colors">Política de Privacidad</a>
          <a href="#" className="hover:text-dygsom-blue transition-colors">Términos de Servicio</a>
        </div>
      </div>
    </footer>
  );
};
