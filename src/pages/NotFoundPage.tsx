import { Link } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { FaHome, FaExclamationTriangle } from 'react-icons/fa';

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-20 flex items-center justify-center">
        <div className="max-w-md text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-yellow-500/20 rounded-full mb-6">
            <FaExclamationTriangle className="text-5xl text-yellow-400" />
          </div>
          
          <h1 className="text-6xl font-bold text-white mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-300 mb-4">
            Página no encontrada
          </h2>
          <p className="text-gray-400 mb-8">
            La página que buscas no existe o ha sido movida.
          </p>
          
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors"
          >
            <FaHome />
            Volver al inicio
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
