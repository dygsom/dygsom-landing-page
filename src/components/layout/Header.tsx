import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaBars, FaLinkedin, FaTimes, FaYoutube } from 'react-icons/fa';
import { SOCIAL_MEDIA } from '../../utils/constants';
import { navigateToLandingSection } from '../../utils/landingNavigation';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (sectionId: string) => {
    setIsMenuOpen(false);
    navigateToLandingSection(navigate, location.pathname, sectionId);
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-700/70 bg-dygsom-dark/95 px-4 py-3 shadow-lg backdrop-blur-sm md:px-6 lg:px-8">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between">
        <a
          href="/"
          onClick={handleLogoClick}
          className="group flex cursor-pointer items-center gap-3 transition-opacity hover:opacity-90 md:gap-4"
          aria-label="DYGSOM Home"
        >
          <img
            src="/dygsom-logo.svg"
            alt="DYGSOM Logo"
            className="h-14 w-14 shrink-0 md:h-16 md:w-16 lg:h-[72px] lg:w-[72px]"
          />
          <span className="flex flex-col leading-none">
            <span className="text-2xl font-extrabold tracking-tight text-dygsom-blue md:text-[2rem]">
              DYGSOM
            </span>
            <span className="mt-1 hidden text-[11px] font-medium text-slate-400 xl:block">
              Digital Guard System for Online Merchants
            </span>
          </span>
        </a>

        <div className="hidden items-center space-x-4 md:flex lg:space-x-6">
          <ul className="flex items-center gap-4 text-[15px] font-semibold text-dygsom-light-text lg:gap-7 lg:text-base">
            <li>
              <button
                onClick={() => handleNavigation('solucion')}
                className="whitespace-nowrap rounded-md px-3 py-2 transition-colors hover:bg-slate-800/70 hover:text-dygsom-blue"
              >
                Solucion
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigation('pricing')}
                className="whitespace-nowrap rounded-md px-3 py-2 transition-colors hover:bg-slate-800/70 hover:text-dygsom-blue"
              >
                Pricing
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigation('faq')}
                className="whitespace-nowrap rounded-md px-3 py-2 transition-colors hover:bg-slate-800/70 hover:text-dygsom-blue"
              >
                FAQ
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigation('contacto')}
                className="whitespace-nowrap rounded-full bg-gradient-to-r from-dygsom-blue to-cyan-500 px-4 py-2 text-[15px] text-white shadow-md shadow-cyan-900/30 transition-all hover:from-dygsom-blue/90 hover:to-cyan-400 lg:px-5 lg:text-base"
              >
                Demo
              </button>
            </li>
          </ul>

          <div className="ml-4 hidden items-center space-x-3 border-l border-slate-600 pl-4 lg:flex">
            <a
              href={SOCIAL_MEDIA.LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 transition-colors duration-300 hover:text-dygsom-blue"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="text-lg" />
            </a>
            <a
              href={SOCIAL_MEDIA.YOUTUBE}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 transition-colors duration-300 hover:text-red-500"
              aria-label="YouTube"
            >
              <FaYoutube className="text-lg" />
            </a>
          </div>
        </div>

        <button
          className="text-2xl text-dygsom-light-text md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {isMenuOpen && (
        <div className="mt-4 pb-4 md:hidden">
          <ul className="flex flex-col space-y-4 text-dygsom-light-text font-medium">
            <li>
              <button
                onClick={() => handleNavigation('inicio')}
                className="block w-full text-left transition-colors hover:text-dygsom-blue"
              >
                Inicio
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigation('solucion')}
                className="block w-full text-left transition-colors hover:text-dygsom-blue"
              >
                Solucion
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigation('pricing')}
                className="block w-full text-left transition-colors hover:text-dygsom-blue"
              >
                Pricing
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigation('faq')}
                className="block w-full text-left transition-colors hover:text-dygsom-blue"
              >
                FAQ
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigation('contacto')}
                className="block w-full rounded-full bg-gradient-to-r from-dygsom-blue to-cyan-500 px-4 py-2 text-center text-white transition-all hover:from-dygsom-blue/90 hover:to-cyan-400"
              >
                Demo
              </button>
            </li>
          </ul>

          <div className="mt-6 flex justify-center space-x-6 border-t border-slate-700 pt-4">
            <a
              href={SOCIAL_MEDIA.LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 transition-colors duration-300 hover:text-dygsom-blue"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="text-xl" />
            </a>
            <a
              href={SOCIAL_MEDIA.YOUTUBE}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 transition-colors duration-300 hover:text-red-500"
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
