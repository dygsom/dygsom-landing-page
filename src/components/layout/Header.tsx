import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

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
        <ul className="hidden md:flex space-x-6 text-dygsom-light-text font-medium">
          <li><a href="#solucion" className="hover:text-dygsom-blue transition-colors">Solución</a></li>
          <li><a href="#ventajas" className="hover:text-dygsom-blue transition-colors">Ventajas</a></li>
          <li><a href="#precios" className="hover:text-dygsom-blue transition-colors">Precios</a></li>
          <li><a href="#equipo" className="hover:text-dygsom-blue transition-colors">Equipo</a></li>
          <li>
            <a href="#contacto" className="bg-gradient-to-r from-dygsom-blue to-cyan-500 px-4 py-2 rounded-full text-white hover:from-dygsom-blue/90 hover:to-cyan-400 transition-all">
              Contáctanos
            </a>
          </li>
        </ul>

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
            <li><a href="#precios" className="block hover:text-dygsom-blue transition-colors" onClick={() => setIsMenuOpen(false)}>Precios</a></li>
            <li><a href="#equipo" className="block hover:text-dygsom-blue transition-colors" onClick={() => setIsMenuOpen(false)}>Equipo</a></li>
            <li>
              <a href="#contacto" className="block text-center bg-gradient-to-r from-dygsom-blue to-cyan-500 px-4 py-2 rounded-full text-white hover:from-dygsom-blue/90 hover:to-cyan-400 transition-all" onClick={() => setIsMenuOpen(false)}>
                Contáctanos
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};
