import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { type IconType } from 'react-icons';
import { FaCheckCircle, FaEnvelope, FaLock, FaServer, FaShieldAlt, FaSpinner } from 'react-icons/fa';
import { Footer } from '../components/layout/Footer';
import { Header } from '../components/layout/Header';
import { ScanApiError, scanService } from '../services/scanService';
import type { ScanResultsResponse, ScanStatusResponse, ScanStreamMessage } from '../types/scan';

interface UIModule {
  key: string;
  name: string;
  icon: IconType;
  status: 'pending' | 'running' | 'completed' | 'failed';
}

type ModuleStatus = UIModule['status'];

const BASE_MODULES: UIModule[] = [
  { key: 'ssl', name: 'SSL/TLS Configuration', icon: FaLock, status: 'pending' },
  { key: 'headers', name: 'Security Headers', icon: FaShieldAlt, status: 'pending' },
  { key: 'email', name: 'Email Security', icon: FaEnvelope, status: 'pending' },
  { key: 'waf', name: 'WAF Detection', icon: FaServer, status: 'pending' },
];

const MODULE_THRESHOLDS: Record<string, number> = {
  ssl: 25,
  headers: 50,
  email: 75,
  waf: 100,
};

const funFacts = [
  'El 68% de e-commerce en LATAM tiene headers de seguridad mal configurados.',
  'El 43% de fraudes digitales ocurren por credenciales robadas.',
  'Un WAF bien configurado puede bloquear hasta el 99.7% de ataques automatizados.',
  'El tiempo promedio para detectar un breach es de 207 dias.',
];

const MAX_ESTIMATED_SCAN_SECONDS = 90;

function clampProgress(value: number): number {
  if (Number.isNaN(value)) return 0;
  return Math.min(100, Math.max(0, Math.round(value)));
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function resolveModuleKey(raw: string): string | null {
  const value = raw.toLowerCase();
  if (value.includes('ssl')) return 'ssl';
  if (value.includes('header')) return 'headers';
  if (value.includes('dns')) return 'email';
  if (value.includes('email') || value.includes('spf') || value.includes('dmarc')) return 'email';
  if (value.includes('waf')) return 'waf';
  return null;
}

function deriveModuleStatusesByProgress(progress: number): Record<string, UIModule['status']> {
  const result: Record<string, UIModule['status']> = {};

  Object.entries(MODULE_THRESHOLDS).forEach(([key, threshold]) => {
    if (progress >= threshold) {
      result[key] = 'completed';
      return;
    }

    if (progress >= threshold - 24) {
      result[key] = 'running';
      return;
    }

    result[key] = 'pending';
  });

  return result;
}

function getEstimatedSecondsRemaining(progress: number): number {
  if (progress >= 100) return 0;
  const ratioRemaining = Math.max(0, 100 - progress) / 100;
  const seconds = Math.ceil(ratioRemaining * MAX_ESTIMATED_SCAN_SECONDS);
  return Math.max(5, seconds);
}

function parseModuleStatus(rawStatus: unknown): ModuleStatus | null {
  if (typeof rawStatus !== 'string') return null;
  const statusValue = rawStatus.toLowerCase();

  if (statusValue.includes('complete') || statusValue === 'done' || statusValue.includes('success')) {
    return 'completed';
  }

  if (statusValue.includes('error') || statusValue.includes('fail')) {
    return 'failed';
  }

  if (
    statusValue.includes('run') ||
    statusValue.includes('progress') ||
    statusValue.includes('process')
  ) {
    return 'running';
  }

  if (statusValue.includes('pending') || statusValue.includes('queue') || statusValue.includes('wait')) {
    return 'pending';
  }

  return null;
}

function collectModuleStatusUpdates(modulesPayload: unknown): Record<string, ModuleStatus> {
  const updates: Record<string, ModuleStatus> = {};

  if (Array.isArray(modulesPayload)) {
    modulesPayload.forEach((item) => {
      if (!isRecord(item)) return;
      const keyCandidate =
        (typeof item.module === 'string' && item.module) ||
        (typeof item.key === 'string' && item.key) ||
        (typeof item.name === 'string' && item.name) ||
        '';
      const resolvedKey = resolveModuleKey(keyCandidate);
      if (!resolvedKey) return;

      const parsedStatus = parseModuleStatus(item.status);
      if (!parsedStatus) return;
      updates[resolvedKey] = parsedStatus;
    });

    return updates;
  }

  if (!isRecord(modulesPayload)) {
    return updates;
  }

  Object.entries(modulesPayload).forEach(([rawKey, rawValue]) => {
    const resolvedKey = resolveModuleKey(rawKey);
    if (!resolvedKey) return;

    let statusCandidate: unknown = rawValue;
    if (isRecord(rawValue) && 'status' in rawValue) {
      statusCandidate = rawValue.status;
    }

    const parsedStatus = parseModuleStatus(statusCandidate);
    if (!parsedStatus) return;

    updates[resolvedKey] = parsedStatus;
  });

  return updates;
}

function estimateProgressFromModuleStatuses(updates: Record<string, ModuleStatus>): number | null {
  const moduleKeys = Object.keys(MODULE_THRESHOLDS);
  const hasKnownStatus = moduleKeys.some((key) => updates[key]);
  if (!hasKnownStatus) return null;

  let progressPoints = 0;

  moduleKeys.forEach((key) => {
    const status = updates[key];
    if (status === 'completed' || status === 'failed') {
      progressPoints += 25;
      return;
    }

    if (status === 'running') {
      progressPoints += 12.5;
    }
  });

  return clampProgress(progressPoints);
}

function mergeModuleStatuses(
  prevModules: UIModule[],
  fallbackStatuses: Record<string, ModuleStatus>,
  updates: Record<string, ModuleStatus>,
): UIModule[] {
  const nextByKey: Record<string, ModuleStatus> = {};

  prevModules.forEach((module) => {
    const fallbackStatus = fallbackStatuses[module.key] ?? 'pending';
    const incomingStatus = updates[module.key];
    let nextStatus: ModuleStatus = fallbackStatus;

    // Keep terminal states sticky unless backend reports another terminal value.
    if (module.status === 'completed' || module.status === 'failed') {
      nextStatus = module.status;
    }

    if (incomingStatus) {
      if (incomingStatus === 'completed' || incomingStatus === 'failed') {
        nextStatus = incomingStatus;
      } else if (nextStatus !== 'completed' && nextStatus !== 'failed') {
        nextStatus = incomingStatus;
      }
    }

    nextByKey[module.key] = nextStatus;
  });

  const activeKeyFromFallback = prevModules.find(
    (module) => fallbackStatuses[module.key] === 'running',
  )?.key;
  const activeKeyFromUpdates = prevModules.find((module) => updates[module.key] === 'running')?.key;
  const activeKeyFromCurrent = prevModules.find((module) => nextByKey[module.key] === 'running')?.key;
  const firstPendingKey = prevModules.find((module) => nextByKey[module.key] === 'pending')?.key;

  // Prefer explicit module statuses from backend over progress-derived fallbacks.
  const activeKey =
    activeKeyFromUpdates || activeKeyFromFallback || activeKeyFromCurrent || firstPendingKey || null;

  if (activeKey) {
    prevModules.forEach((module) => {
      const currentStatus = nextByKey[module.key];
      if (currentStatus === 'completed' || currentStatus === 'failed') return;
      nextByKey[module.key] = module.key === activeKey ? 'running' : 'pending';
    });
  }

  return prevModules.map((module) => ({
    ...module,
    status: nextByKey[module.key] ?? module.status,
  }));
}

function persistResults(scanId: string, results: ScanResultsResponse): void {
  try {
    sessionStorage.setItem(`scan_results_${scanId}`, JSON.stringify(results));
  } catch (error) {
    console.warn('No se pudo guardar resultados en sessionStorage.', error);
  }
}

function getFriendlyConnectionError(error: unknown): string {
  if (error instanceof ScanApiError) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'No pudimos continuar con el stream del escaneo.';
}

export function ScanProgressPage() {
  const { scanId } = useParams<{ scanId: string }>();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [modules, setModules] = useState<UIModule[]>(BASE_MODULES);
  const [connectionWarning, setConnectionWarning] = useState<string | null>(null);
  const [blockingError, setBlockingError] = useState<string | null>(null);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [streamAttempt, setStreamAttempt] = useState(0);
  const progressRef = useRef(0);
  const lastProgressAdvanceRef = useRef<number>(0);
  const lastStreamActivityRef = useRef<number>(0);
  const pollIntervalRef = useRef<number | null>(null);
  const isPollingRef = useRef(false);
  const hasLiveStreamRef = useRef(false);

  const stopPolling = useCallback(() => {
    if (pollIntervalRef.current !== null) {
      window.clearInterval(pollIntervalRef.current);
      pollIntervalRef.current = null;
    }
    isPollingRef.current = false;
  }, []);

  const finalizeScan = useCallback(
    (results: ScanResultsResponse) => {
      if (!scanId) return;

      stopPolling();
      setProgress(100);
      progressRef.current = 100;
      lastProgressAdvanceRef.current = Date.now();
      persistResults(scanId, results);
      navigate(`/results/${scanId}`);
    },
    [navigate, scanId, stopPolling],
  );

  const applyStatusProgress = useCallback((statusPayload: ScanStatusResponse) => {
    lastStreamActivityRef.current = Date.now();
    setBlockingError(null);

    const moduleStatusUpdates = collectModuleStatusUpdates(statusPayload.modules);
    const estimatedProgress = estimateProgressFromModuleStatuses(moduleStatusUpdates);

    let nextProgress = progressRef.current;
    if (typeof statusPayload.progress === 'number') {
      nextProgress = Math.max(nextProgress, clampProgress(statusPayload.progress));
    }
    if (typeof estimatedProgress === 'number') {
      nextProgress = Math.max(nextProgress, estimatedProgress);
    }

    setProgress((prev) => {
      const computed = Math.max(prev, nextProgress);
      if (computed > prev) {
        lastProgressAdvanceRef.current = Date.now();
      }
      progressRef.current = computed;
      return computed;
    });

    const fallbackStatuses = deriveModuleStatusesByProgress(nextProgress);
    setModules((prev) => mergeModuleStatuses(prev, fallbackStatuses, moduleStatusUpdates));

    if (!hasLiveStreamRef.current) {
      setConnectionWarning('Conexion en modo respaldo. Continuamos actualizando el analisis.');
    }
  }, []);

  const startResultsPolling = useCallback(() => {
    if (!scanId || isPollingRef.current) return;

    isPollingRef.current = true;
    let attempts = 0;
    // Allow longer backend processing windows before declaring failure.
    const maxAttempts = 120;
    const pollOnce = async () => {
      attempts += 1;

      try {
        const scanStatus = await scanService.getScanStatus(scanId);
        applyStatusProgress(scanStatus);

        const normalizedStatus = scanStatus.status.toLowerCase();
        if (normalizedStatus.includes('fail') || normalizedStatus.includes('error')) {
          stopPolling();
          setBlockingError('El servicio reporto un error durante la ejecucion del escaneo.');
          return;
        }

        const results = await scanService.getScanResults(scanId);
        finalizeScan(results);
        return;
      } catch (error) {
        const isRetryable =
          error instanceof ScanApiError &&
          (error.status === 202 ||
            error.status === 404 ||
            error.status === 429 ||
            error.status === 500 ||
            error.status === 502 ||
            error.status === 503 ||
            error.status === 504);

        if (!isRetryable && attempts >= 2) {
          stopPolling();
          setBlockingError(getFriendlyConnectionError(error));
          return;
        }
      }

      if (attempts >= maxAttempts) {
        stopPolling();
        setBlockingError(
          'El analisis esta tardando mas de lo esperado. Puedes reintentar conexion o esperar unos minutos.',
        );
      }
    };

    // First status sync immediately so UI does not stay static at module 1.
    void pollOnce();
    pollIntervalRef.current = window.setInterval(() => {
      void pollOnce();
    }, 5000);
  }, [applyStatusProgress, finalizeScan, scanId, stopPolling]);

  const applyStreamProgress = useCallback((message: ScanStreamMessage) => {
    hasLiveStreamRef.current = true;
    lastStreamActivityRef.current = Date.now();
    setConnectionWarning(null);
    setBlockingError(null);

    const moduleStatusUpdates = collectModuleStatusUpdates(message.modules);
    const estimatedProgress = estimateProgressFromModuleStatuses(moduleStatusUpdates);
    let nextProgress = progressRef.current;
    if (typeof message.progress === 'number') {
      nextProgress = Math.max(nextProgress, clampProgress(message.progress));
    }
    if (typeof estimatedProgress === 'number') {
      nextProgress = Math.max(nextProgress, estimatedProgress);
    }

    setProgress((prev) => {
      const computed = Math.max(prev, nextProgress);
      if (computed > prev) {
        lastProgressAdvanceRef.current = Date.now();
      }
      progressRef.current = computed;
      return computed;
    });

    const fallbackStatuses = deriveModuleStatusesByProgress(nextProgress);
    setModules((prev) => mergeModuleStatuses(prev, fallbackStatuses, moduleStatusUpdates));
  }, []);

  useEffect(() => {
    if (!scanId) {
      navigate('/scan');
      return;
    }
    hasLiveStreamRef.current = false;
    lastProgressAdvanceRef.current = Date.now();
    lastStreamActivityRef.current = Date.now();
    startResultsPolling();

    const disconnect = scanService.connectScanStream(scanId, {
      onMessage: applyStreamProgress,
      onComplete: finalizeScan,
      onError: () => {
        hasLiveStreamRef.current = false;
        setConnectionWarning('Stream interrumpido. Seguimos actualizando el estado del analisis.');
        startResultsPolling();
      },
      onReconnect: () => {
        hasLiveStreamRef.current = false;
        setConnectionWarning('Reconectando stream. Seguimos verificando progreso en segundo plano.');
        startResultsPolling();
      },
      onConnectionError: () => {
        hasLiveStreamRef.current = false;
        setConnectionWarning('Conexion inestable. Intentando recuperar resultados...');
        startResultsPolling();
      },
    });

    const inactivityWatchdog = window.setInterval(() => {
      const inactivityMs = Date.now() - lastStreamActivityRef.current;
      if (inactivityMs > 15000) {
        hasLiveStreamRef.current = false;
        setConnectionWarning('Sin actividad del stream. Verificando resultados en segundo plano...');
        startResultsPolling();
      }
    }, 5000);

    return () => {
      window.clearInterval(inactivityWatchdog);
      disconnect();
      stopPolling();
    };
  }, [applyStreamProgress, finalizeScan, navigate, scanId, startResultsPolling, stopPolling, streamAttempt]);

  useEffect(() => {
    const factInterval = window.setInterval(() => {
      setCurrentFactIndex((prev) => (prev + 1) % funFacts.length);
    }, 3000);

    return () => window.clearInterval(factInterval);
  }, []);

  useEffect(() => {
    if (!scanId) return;

    const fallbackInterval = window.setInterval(() => {
      const current = progressRef.current;
      if (current >= 95) return;

      const stalledMs = Date.now() - lastProgressAdvanceRef.current;
      if (stalledMs < 8000) return;

      const next = Math.min(95, current + 8);
      if (next <= current) return;

      progressRef.current = next;
      lastProgressAdvanceRef.current = Date.now();
      setProgress(next);

      const fallbackStatuses = deriveModuleStatusesByProgress(next);
      setModules((prev) => mergeModuleStatuses(prev, fallbackStatuses, {}));
    }, 4000);

    return () => window.clearInterval(fallbackInterval);
  }, [scanId]);

  const currentModule = useMemo(
    () =>
      modules.find((module) => module.status === 'running') ||
      modules.find((module) => module.status === 'pending') ||
      modules[modules.length - 1],
    [modules],
  );
  const currentModuleIndex = useMemo(
    () => Math.max(0, modules.findIndex((module) => module.key === currentModule.key)),
    [currentModule.key, modules],
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Header />
      <main className="container mx-auto flex flex-grow items-center justify-center px-4 py-20">
        <div className="w-full max-w-5xl">
          <div className="mb-12 text-center">
            <div className="mb-6 inline-flex h-24 w-24 items-center justify-center rounded-full bg-green-500/20">
              {progress < 100 ? (
                <FaSpinner className="text-5xl text-green-400 animate-spin" />
              ) : (
                <FaCheckCircle className="text-5xl text-green-400" />
              )}
            </div>

            <h1 className="mb-4 text-4xl font-bold text-white">
              {progress < 100 ? 'Analizando tu sitio...' : 'Analisis completo'}
            </h1>

            <div className="mb-4 h-4 w-full rounded-full bg-white/10">
              <div
                className="h-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="mb-2 text-2xl font-semibold text-green-400">{progress}%</p>
            <p className="mb-1 text-sm font-medium text-cyan-200">
              Paso {currentModuleIndex + 1} de {modules.length}: {currentModule.name}
            </p>
            <p className="text-sm text-slate-400">
              Tiempo estimado restante: ~{getEstimatedSecondsRemaining(progress)} segundos
            </p>

            {(blockingError || connectionWarning) && (
              <div
                className={`mx-auto mt-4 max-w-2xl rounded-lg p-3 text-sm ${
                  blockingError
                    ? 'border border-red-500/40 bg-red-500/10 text-red-300'
                    : 'border border-yellow-500/40 bg-yellow-500/10 text-yellow-300'
                }`}
              >
                {blockingError || connectionWarning}
              </div>
            )}
          </div>

          <div className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
            <h2 className="mb-6 text-xl font-semibold text-white">Modulos de Analisis</h2>
            <div className="space-y-4">
              {modules.map((module) => {
                const Icon = module.icon;
                const isRunning = module.status === 'running';
                const isActive = currentModule.key === module.key && progress < 100;
                const showRunning = isRunning && isActive;
                const isCompleted = module.status === 'completed';
                const isFailed = module.status === 'failed';

                return (
                  <div
                    key={module.key}
                    className={`flex items-center gap-4 rounded-lg p-4 transition-all ${
                      isActive ? 'border border-green-500/30 bg-green-500/10' : 'bg-white/5'
                    }`}
                  >
                    <div
                        className={`flex h-12 w-12 items-center justify-center rounded-full ${
                        isCompleted
                          ? 'bg-green-500/20'
                          : showRunning
                            ? 'bg-green-500/10'
                            : isFailed
                              ? 'bg-red-500/10'
                              : 'bg-white/5'
                      }`}
                    >
                      {isCompleted ? (
                        <FaCheckCircle className="text-2xl text-green-400" />
                      ) : showRunning ? (
                        <FaSpinner className="text-2xl text-green-400 animate-spin" />
                      ) : (
                        <Icon
                          className={`text-2xl ${isFailed ? 'text-red-400' : 'text-slate-500'}`}
                        />
                      )}
                    </div>
                    <div className="flex-grow">
                      <p
                        className={`font-medium ${
                          isCompleted
                            ? 'text-green-400'
                            : showRunning
                              ? 'text-white'
                              : isFailed
                                ? 'text-red-300'
                                : 'text-slate-400'
                        }`}
                      >
                        {module.name}
                      </p>
                      {showRunning && <p className="text-xs text-green-400/80">Analizando...</p>}
                      {isFailed && (
                        <p className="text-xs text-red-300/80">Se reporto un problema en este modulo.</p>
                      )}
                    </div>
                    {isCompleted && (
                      <span className="text-xs font-medium text-green-400">Completado</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mb-6 rounded-xl border border-blue-500/20 bg-blue-500/10 p-6">
            <p className="text-center italic text-slate-300 transition-all duration-500">
              {funFacts[currentFactIndex]}
            </p>
          </div>

          <div className="text-center">
            <p className="text-sm text-slate-500">Scan ID: {scanId}</p>
            {(blockingError || connectionWarning) && (
              <button
                type="button"
                onClick={() => {
                  hasLiveStreamRef.current = false;
                  setBlockingError(null);
                  setConnectionWarning('Reintentando conexion en vivo...');
                  setStreamAttempt((prev) => prev + 1);
                  startResultsPolling();
                }}
                className="mt-4 rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm text-white transition-colors hover:bg-white/20"
              >
                Reintentar conexion
              </button>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
