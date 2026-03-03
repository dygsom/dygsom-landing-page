import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRocket } from 'react-icons/fa';
import { scanService } from '../../services/scanService';
import { trackCTAClick } from '../../utils/analytics';
import { isValidHttpUrl, normalizeHttpUrl } from '../../utils/url';

export function ScanWidget() {
  const [url, setUrl] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    trackCTAClick('Start Scan', 'Hero Scan Widget');

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
    <div className="mx-auto w-full max-w-4xl">
      <div className="rounded-2xl border border-cyan-400/15 bg-slate-900/65 p-6 shadow-2xl shadow-slate-950/60 backdrop-blur-md md:p-8">
        <div className="mb-5 text-left md:text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-300/80">
            Diagnostico Express
          </p>
          <h3 className="mt-1 text-lg font-semibold text-white md:text-xl">
            Evalua el riesgo de tu web en menos de 60 segundos
          </h3>
          <p className="mt-1 text-sm text-slate-300">
            Sin acceso a sistemas internos. Solo analisis de superficie publica.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="scan-url" className="mb-2 block text-sm font-medium text-gray-300">
                URL de tu sitio web
              </label>
              <input
                id="scan-url"
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
                aria-label="Ingresa la URL de tu sitio web para escanear"
              />
            </div>

            <div>
              <label htmlFor="scan-email" className="mb-2 block text-sm font-medium text-gray-300">
                Email para recibir el reporte
              </label>
              <input
                id="scan-email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="w-full rounded-lg border border-slate-500/40 bg-slate-900/70 px-4 py-3 text-white placeholder-slate-400 transition-all focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
                required
                disabled={isSubmitting}
                aria-label="Ingresa tu email para recibir el reporte"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-4 font-bold text-white shadow-lg shadow-green-500/30 transition-all hover:from-green-600 hover:to-emerald-600 disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Iniciar escaneo de seguridad gratuito"
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

          {error && (
            <div className="rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-300">
              {error}
            </div>
          )}

          <p className="mt-2 text-center text-xs text-slate-400">
            100% seguro y no intrusivo. No solicitamos credenciales.
          </p>
        </form>
      </div>
    </div>
  );
}
