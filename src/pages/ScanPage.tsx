import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRocket, FaShieldAlt } from 'react-icons/fa';
import { Footer } from '../components/layout/Footer';
import { Header } from '../components/layout/Header';
import { scanService } from '../services/scanService';
import { isValidHttpUrl, normalizeHttpUrl } from '../utils/url';

export function ScanPage() {
  const [url, setUrl] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const normalizedUrl = normalizeHttpUrl(url);
      if (!isValidHttpUrl(normalizedUrl)) {
        throw new Error('Ingresa una URL valida (ej: https://tu-dominio.com).');
      }

      const response = await scanService.startScan({
        url: normalizedUrl,
        email: email.trim(),
        industry: 'e-commerce',
      });

      navigate(`/scan/${response.scan_id}`, {
        state: {
          submittedUrl: normalizedUrl,
          submittedEmail: email.trim(),
        },
      });
    } catch (err) {
      console.error('Error starting scan:', err);
      setError(err instanceof Error ? err.message : 'No se pudo iniciar el escaneo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Header />
      <main className="container mx-auto flex-grow px-4 py-20">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20">
              <FaShieldAlt className="text-4xl text-green-400" />
            </div>
            <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">Diagnostico rapido de seguridad web</h1>
            <p className="mb-2 text-lg text-gray-300 md:text-xl">
              Evalua el nivel de riesgo de tu sitio y recibe un plan inicial de remediacion.
            </p>
            <p className="text-gray-400">Sin agentes ni acceso interno. Analisis de superficie publica.</p>
          </div>

          <div className="rounded-2xl border border-cyan-400/15 bg-slate-900/65 p-8 shadow-2xl shadow-slate-950/60 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="url" className="mb-2 block text-sm font-medium text-gray-300">
                  URL de tu sitio web
                </label>
                <input
                  id="url"
                  name="website_url"
                  type="text"
                  inputMode="url"
                  autoComplete="url"
                  autoCapitalize="none"
                  spellCheck={false}
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://tu-ecommerce.com"
                  className="w-full rounded-lg border border-slate-500/40 bg-slate-900/70 px-4 py-3 text-white placeholder-slate-400 transition-all focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-300">
                  Email para recibir el reporte
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="w-full rounded-lg border border-slate-500/40 bg-slate-900/70 px-4 py-3 text-white placeholder-slate-400 transition-all focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-4 font-semibold text-white shadow-lg shadow-green-500/30 transition-all hover:from-green-600 hover:to-emerald-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Iniciando analisis...
                  </>
                ) : (
                  <>
                    <FaRocket />
                    Iniciar Scan Gratuito
                  </>
                )}
              </button>
            </form>

            {error && (
              <div className="mt-4 rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-300">
                {error}
              </div>
            )}

            <div className="mt-8 grid gap-3 border-t border-white/10 pt-6 text-xs text-slate-400 md:grid-cols-3">
              <p className="rounded-lg border border-slate-700/60 bg-slate-900/60 p-3 text-center">
                100% no intrusivo
              </p>
              <p className="rounded-lg border border-slate-700/60 bg-slate-900/60 p-3 text-center">
                No pedimos credenciales
              </p>
              <p className="rounded-lg border border-slate-700/60 bg-slate-900/60 p-3 text-center">
                Resultado accionable para MYPE
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
