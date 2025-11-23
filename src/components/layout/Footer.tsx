import React from 'react';

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
        <div className="flex justify-center space-x-4 mt-4">
          <a href="#" className="hover:text-dygsom-blue transition-colors">Política de Privacidad</a>
          <a href="#" className="hover:text-dygsom-blue transition-colors">Términos de Servicio</a>
        </div>
      </div>
    </footer>
  );
};
