import React, { useState } from 'react';
import { FaBars, FaTimes, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { SOCIAL_MEDIA } from '../../utils/constants';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-dygsom-dark py-4 px-6 sticky top-0 z-50 shadow-lg border-b border-slate-700">
      <nav className="max-w-7xl mx-auto flex justify-between items-center">
        <a href="#" className="flex items-center space-x-2 md:space-x-3 cursor-pointer hover:opacity-80 transition-opacity">
          <img src="/dygsom-logo.svg" alt="Dygsom Logo" className="h-12 w-12 md:h-20 md:w-20" />
          <span className="text-xl md:text-2xl font-bold text-dygsom-blue">DYGSOM</span>
        </a>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <ul className="flex space-x-6 text-dygsom-light-text font-medium">
            <li><a href="#solucion" className="hover:text-dygsom-blue transition-colors">Solución</a></li>
            <li><a href="#ventajas" className="hover:text-dygsom-blue transition-colors">Ventajas</a></li>
            <li><a href="#tecnico" className="hover:text-dygsom-blue transition-colors">Técnico</a></li>
            <li><a href="#precios" className="hover:text-dygsom-blue transition-colors">Precios</a></li>
            <li><a href="#equipo" className="hover:text-dygsom-blue transition-colors">Equipo</a></li>
            <li>
              <a href="#contacto" className="bg-gradient-to-r from-dygsom-blue to-cyan-500 px-4 py-2 rounded-full text-white hover:from-dygsom-blue/90 hover:to-cyan-400 transition-all">
                Contáctanos
              </a>
            </li>
          </ul>
          
          {/* Social Media Icons */}
          <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-slate-600">
            <a 
              href={SOCIAL_MEDIA.LINKEDIN} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-dygsom-blue transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="text-lg" />
            </a>
            <a 
              href={SOCIAL_MEDIA.YOUTUBE} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-red-500 transition-colors duration-300"
              aria-label="YouTube"
            >
              <FaYoutube className="text-lg" />
            </a>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-dygsom-light-text text-2xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 pb-4">
          <ul className="flex flex-col space-y-4 text-dygsom-light-text font-medium">
            <li><a href="#solucion" className="block hover:text-dygsom-blue transition-colors" onClick={() => setIsMenuOpen(false)}>Solución</a></li>
            <li><a href="#ventajas" className="block hover:text-dygsom-blue transition-colors" onClick={() => setIsMenuOpen(false)}>Ventajas</a></li>
            <li><a href="#tecnico" className="block hover:text-dygsom-blue transition-colors" onClick={() => setIsMenuOpen(false)}>Técnico</a></li>
            <li><a href="#precios" className="block hover:text-dygsom-blue transition-colors" onClick={() => setIsMenuOpen(false)}>Precios</a></li>
            <li><a href="#equipo" className="block hover:text-dygsom-blue transition-colors" onClick={() => setIsMenuOpen(false)}>Equipo</a></li>
            <li>
              <a href="#contacto" className="block text-center bg-gradient-to-r from-dygsom-blue to-cyan-500 px-4 py-2 rounded-full text-white hover:from-dygsom-blue/90 hover:to-cyan-400 transition-all" onClick={() => setIsMenuOpen(false)}>
                Contáctanos
              </a>
            </li>
          </ul>
          
          {/* Mobile Social Media */}
          <div className="flex justify-center space-x-6 mt-6 pt-4 border-t border-slate-700">
            <a 
              href={SOCIAL_MEDIA.LINKEDIN} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-dygsom-blue transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="text-xl" />
            </a>
            <a 
              href={SOCIAL_MEDIA.YOUTUBE} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-red-500 transition-colors duration-300"
              aria-label="YouTube"
            >
              <FaYoutube className="text-xl" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
