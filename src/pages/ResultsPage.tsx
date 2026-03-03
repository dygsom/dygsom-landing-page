import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { type IconType } from 'react-icons';
import {
  FaChartLine,
  FaCheckCircle,
  FaChevronDown,
  FaChevronUp,
  FaDownload,
  FaEnvelope,
  FaExclamationCircle,
  FaExclamationTriangle,
  FaLock,
  FaPhone,
  FaRocket,
  FaServer,
  FaShieldAlt,
  FaSpinner,
} from 'react-icons/fa';
import { Footer } from '../components/layout/Footer';
import { Header } from '../components/layout/Header';
import { trackCTAClick } from '../utils/analytics';
import { ScanApiError, scanService } from '../services/scanService';
import { navigateToLandingSection } from '../utils/landingNavigation';
import type {
  ScanIssue,
  ScanModuleResult,
  ScanResultsResponse,
  ScanSeverity,
} from '../types/scan';

interface UIModuleFinding {
  type: 'success' | 'warning' | 'critical' | 'info';
  text: string;
}

interface UIModule {
  key: string;
  name: string;
  score: number;
  status: 'pass' | 'warning' | 'fail';
  description: string;
  icon: IconType;
  findings: UIModuleFinding[];
  issues: ScanIssue[];
}

interface CriticalFinding {
  moduleName: string;
  severity: ScanSeverity;
  title: string;
  impact: string;
}

interface RemediationTask {
  id: string;
  moduleName: string;
  priority: 'high' | 'medium' | 'low';
  title: string;
  impact: string;
  recommendation: string;
  eta: string;
}

const MODULE_CATALOG: Record<string, { name: string; icon: IconType; description: string }> = {
  ssl: {
    name: 'SSL/TLS Configuration',
    icon: FaLock,
    description: 'Estado de certificados, cifrado y configuracion TLS.',
  },
  headers: {
    name: 'Security Headers',
    icon: FaShieldAlt,
    description: 'Proteccion de cabeceras HTTP y hardening del navegador.',
  },
  email: {
    name: 'Email Security',
    icon: FaEnvelope,
    description: 'Revisiones de SPF, DKIM y DMARC para evitar spoofing.',
  },
  waf: {
    name: 'WAF Detection',
    icon: FaServer,
    description: 'Cobertura de firewall de aplicaciones y reglas de mitigacion.',
  },
};

const MODULE_REMEDIATION_HINT: Record<string, string> = {
  ssl: 'Refuerza TLS con cifrados modernos y revisa fecha de expiracion del certificado.',
  headers:
    'Configura CSP, HSTS y cabeceras de hardening para reducir XSS, clickjacking y downgrade attacks.',
  email:
    'Completa SPF, DKIM y DMARC para reducir spoofing y proteger reputacion de dominio.',
  waf: 'Activa reglas anti-bot y rate limiting para bloquear abuso automatizado temprano.',
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function normalizeSeverity(value: unknown): ScanSeverity {
  const severity = typeof value === 'string' ? value.toLowerCase() : '';
  if (severity === 'critical') return 'critical';
  if (severity === 'high') return 'high';
  if (severity === 'medium') return 'medium';
  if (severity === 'low') return 'low';
  return 'info';
}

function getFindingType(severity: ScanSeverity): UIModuleFinding['type'] {
  if (severity === 'critical') return 'critical';
  if (severity === 'high' || severity === 'medium') return 'warning';
  if (severity === 'low') return 'info';
  return 'info';
}

function friendlyModuleName(key: string): string {
  return key
    .replace(/[_-]/g, ' ')
    .replace(/\w\S*/g, (part) => part[0].toUpperCase() + part.slice(1).toLowerCase());
}

function pickModuleMetadata(key: string): { name: string; icon: IconType; description: string } {
  const normalizedKey = key.toLowerCase();
  if (MODULE_CATALOG[normalizedKey]) return MODULE_CATALOG[normalizedKey];

  if (normalizedKey.includes('ssl')) return MODULE_CATALOG.ssl;
  if (normalizedKey.includes('header')) return MODULE_CATALOG.headers;
  if (
    normalizedKey.includes('email') ||
    normalizedKey.includes('spf') ||
    normalizedKey.includes('dmarc') ||
    normalizedKey.includes('dns')
  ) {
    return MODULE_CATALOG.email;
  }
  if (normalizedKey.includes('waf')) return MODULE_CATALOG.waf;

  return {
    name: friendlyModuleName(key),
    icon: FaShieldAlt,
    description: 'Resumen tecnico del modulo analizado.',
  };
}

function extractIssues(module: ScanModuleResult): ScanIssue[] {
  if (Array.isArray(module.issues)) {
    return module.issues;
  }

  if (Array.isArray(module.findings)) {
    return module.findings
      .filter((finding) => isRecord(finding))
      .map((finding) => ({
        severity: typeof finding.severity === 'string' ? finding.severity : 'info',
        code: typeof finding.category === 'string' ? finding.category : undefined,
        title: typeof finding.title === 'string' ? finding.title : undefined,
        description: typeof finding.description === 'string' ? finding.description : undefined,
        recommendation:
          typeof finding.recommendation === 'string' ? finding.recommendation : undefined,
        impact: typeof finding.impact === 'string' ? finding.impact : undefined,
      }));
  }

  if (isRecord(module.data) && Array.isArray(module.data.issues)) {
    return module.data.issues as ScanIssue[];
  }

  return [];
}

function normalizeModuleStatus(
  module: ScanModuleResult,
  score: number,
  issues: ScanIssue[],
): UIModule['status'] {
  const rawStatus = typeof module.status === 'string' ? module.status.toLowerCase() : '';
  const hasCritical = issues.some((issue) => {
    const severity = normalizeSeverity(issue.severity);
    return severity === 'critical';
  });
  const hasHigh = issues.some((issue) => normalizeSeverity(issue.severity) === 'high');

  if (rawStatus.includes('fail') || rawStatus.includes('error')) return 'fail';
  if (hasCritical) return 'fail';
  if (hasHigh || rawStatus.includes('warn') || score < 80) return 'warning';
  return 'pass';
}

function normalizeModulesPayload(modules: unknown): Array<{ moduleKey: string; moduleValue: ScanModuleResult }> {
  if (Array.isArray(modules)) {
    return modules
      .map((moduleEntry, index) => {
        if (!isRecord(moduleEntry)) return null;

        const moduleKeyCandidate =
          (typeof moduleEntry.module === 'string' && moduleEntry.module) ||
          (typeof moduleEntry.key === 'string' && moduleEntry.key) ||
          (typeof moduleEntry.name === 'string' && moduleEntry.name) ||
          `module-${index + 1}`;

        return {
          moduleKey: moduleKeyCandidate,
          moduleValue: moduleEntry as ScanModuleResult,
        };
      })
      .filter((entry): entry is { moduleKey: string; moduleValue: ScanModuleResult } => entry !== null);
  }

  if (!isRecord(modules)) {
    return [];
  }

  return Object.entries(modules)
    .filter(([, moduleValue]) => isRecord(moduleValue))
    .map(([moduleKey, moduleValue]) => ({
      moduleKey,
      moduleValue: moduleValue as ScanModuleResult,
    }));
}

function normalizeModules(modules: unknown): UIModule[] {
  return normalizeModulesPayload(modules).map(({ moduleKey, moduleValue }) => {
    const metadata = pickModuleMetadata(moduleKey);
    const score = typeof moduleValue.score === 'number' ? moduleValue.score : 0;
    const issues = extractIssues(moduleValue);
    const status = normalizeModuleStatus(moduleValue, score, issues);

    const findings: UIModuleFinding[] =
      issues.length > 0
        ? issues.map((issue) => {
            const severity = normalizeSeverity(issue.severity);
            const text =
              issue.description ||
              issue.title ||
              issue.code ||
              'Se detecto un hallazgo que requiere revision.';
            return { type: getFindingType(severity), text };
          })
        : [{ type: 'success', text: 'No se detectaron hallazgos criticos en este modulo.' }];

    return {
      key: moduleKey,
      name: metadata.name,
      score,
      status,
      description: metadata.description,
      icon: metadata.icon,
      findings,
      issues,
    };
  });
}

function extractCriticalFindings(modules: UIModule[]): CriticalFinding[] {
  const critical: CriticalFinding[] = [];

  modules.forEach((module) => {
    module.issues.forEach((issue) => {
      const severity = normalizeSeverity(issue.severity);
      if (severity !== 'critical' && severity !== 'high') return;

      critical.push({
        moduleName: module.name,
        severity,
        title: issue.title || issue.code || 'Hallazgo critico detectado',
        impact:
          issue.impact || issue.description || 'Se recomienda corregir este hallazgo de inmediato.',
      });
    });
  });

  return critical;
}

function getSeverityRank(value: unknown): number {
  const severity = normalizeSeverity(value);
  if (severity === 'critical') return 4;
  if (severity === 'high') return 3;
  if (severity === 'medium') return 2;
  if (severity === 'low') return 1;
  return 0;
}

function getPriorityFromIssue(module: UIModule, issue?: ScanIssue): RemediationTask['priority'] {
  const severityRank = getSeverityRank(issue?.severity);
  if (severityRank >= 3 || module.status === 'fail') return 'high';
  if (severityRank >= 2 || module.status === 'warning') return 'medium';
  return 'low';
}

function getEtaFromPriority(priority: RemediationTask['priority']): string {
  if (priority === 'high') return '24-48h';
  if (priority === 'medium') return '3-5 dias';
  return '1-2 semanas';
}

function buildRemediationPlan(modules: UIModule[]): RemediationTask[] {
  const sortedModules = [...modules].sort((a, b) => {
    const statusWeight = { fail: 0, warning: 1, pass: 2 } as const;
    if (statusWeight[a.status] !== statusWeight[b.status]) {
      return statusWeight[a.status] - statusWeight[b.status];
    }
    return a.score - b.score;
  });

  const tasks = sortedModules
    .filter((module) => module.status !== 'pass' || module.issues.length > 0)
    .map((module) => {
      const topIssue = [...module.issues].sort((a, b) => getSeverityRank(b.severity) - getSeverityRank(a.severity))[0];
      const priority = getPriorityFromIssue(module, topIssue);

      return {
        id: module.key,
        moduleName: module.name,
        priority,
        title: topIssue?.title || `Optimizar ${module.name}`,
        impact: topIssue?.impact || topIssue?.description || module.description,
        recommendation:
          topIssue?.recommendation ||
          MODULE_REMEDIATION_HINT[module.key] ||
          'Define una accion tecnica concreta para reducir el riesgo de este modulo.',
        eta: getEtaFromPriority(priority),
      } satisfies RemediationTask;
    })
    .slice(0, 3);

  if (tasks.length > 0) {
    return tasks;
  }

  return [
    {
      id: 'monitoring',
      moduleName: 'Monitoreo continuo',
      priority: 'low',
      title: 'Mantener control preventivo',
      impact: 'No se detectaron hallazgos criticos en los modulos analizados.',
      recommendation:
        'Programa escaneos recurrentes y revisiones mensuales para sostener este nivel de seguridad.',
      eta: 'Continuo',
    },
  ];
}

function getPriorityClasses(priority: RemediationTask['priority']): {
  badge: string;
  border: string;
  text: string;
} {
  if (priority === 'high') {
    return {
      badge: 'bg-red-500/20 text-red-200 border border-red-400/30',
      border: 'border-red-400/30',
      text: 'text-red-200',
    };
  }
  if (priority === 'medium') {
    return {
      badge: 'bg-yellow-500/20 text-yellow-200 border border-yellow-400/30',
      border: 'border-yellow-400/30',
      text: 'text-yellow-200',
    };
  }
  return {
    badge: 'bg-green-500/20 text-green-200 border border-green-400/30',
    border: 'border-green-400/30',
    text: 'text-green-200',
  };
}

function formatApiError(error: unknown): string {
  if (error instanceof ScanApiError) return error.message;
  if (error instanceof Error) return error.message;
  return 'No se pudieron obtener los resultados del escaneo.';
}

function getGradeColor(grade: string): string {
  const colors: Record<string, string> = {
    A: 'text-green-400',
    B: 'text-blue-400',
    C: 'text-yellow-400',
    D: 'text-orange-400',
    F: 'text-red-400',
  };
  return colors[grade] || 'text-gray-400';
}

function getPersonalizedMessage(grade: string): {
  title: string;
  description: string;
  urgency: 'low' | 'medium' | 'high';
} {
  const messages: Record<string, { title: string; description: string; urgency: 'low' | 'medium' | 'high' }> = {
    A: {
      title: 'Excelente: tu sitio muestra una base solida de seguridad.',
      description: 'Recomendamos optimizaciones puntuales para mantener el nivel de proteccion.',
      urgency: 'low',
    },
    B: {
      title: 'Buen nivel inicial, pero con oportunidades de mejora.',
      description: 'Hay hallazgos de prioridad media/alta que conviene resolver pronto.',
      urgency: 'medium',
    },
    C: {
      title: 'Riesgo moderado: se recomienda plan de remediacion.',
      description: 'Tu superficie de ataque puede reducirse con ajustes tecnicos concretos.',
      urgency: 'medium',
    },
    D: {
      title: 'Riesgo alto: accion recomendada en el corto plazo.',
      description: 'Existen debilidades que podrian ser explotadas por atacantes.',
      urgency: 'high',
    },
    F: {
      title: 'Riesgo critico: se requiere intervencion inmediata.',
      description: 'La configuracion actual expone el negocio a impacto operativo y financiero.',
      urgency: 'high',
    },
  };

  return messages[grade] || messages.C;
}

function getIndustryBenchmark(score: number): { avgScore: number; difference: number; percentile: number } {
  const avgScore = 68;
  const difference = score - avgScore;
  const percentile = score >= 85 ? 95 : score >= 75 ? 80 : score >= 65 ? 60 : score >= 50 ? 40 : 20;
  return { avgScore, difference, percentile };
}

function formatSignedDifference(value: number): string {
  const rounded = Number(value.toFixed(1));
  return `${rounded > 0 ? '+' : ''}${rounded}`;
}

function cacheScanResults(scanId: string, results: ScanResultsResponse): void {
  try {
    sessionStorage.setItem(`scan_results_${scanId}`, JSON.stringify(results));
  } catch (error) {
    console.warn('No se pudo cachear resultados.', error);
  }
}

function readCachedScanResults(scanId: string): ScanResultsResponse | null {
  try {
    const raw = sessionStorage.getItem(`scan_results_${scanId}`);
    if (!raw) return null;
    return JSON.parse(raw) as ScanResultsResponse;
  } catch {
    return null;
  }
}

export function ResultsPage() {
  const { scanId } = useParams<{ scanId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedModules, setExpandedModules] = useState<string[]>([]);
  const [results, setResults] = useState<ScanResultsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);

  useEffect(() => {
    if (!scanId) {
      navigate('/scan');
      return;
    }

    trackCTAClick('View Results', 'Results Page');

    const cachedResults = readCachedScanResults(scanId);
    if (cachedResults) {
      setResults(cachedResults);
      setIsLoading(false);
    }

    let isCancelled = false;

    const loadResults = async () => {
      if (!cachedResults) {
        setIsLoading(true);
      }

      try {
        const response = await scanService.getScanResults(scanId);
        if (isCancelled) return;

        setResults(response);
        cacheScanResults(scanId, response);
        setError(null);
        setWarning(null);
      } catch (err) {
        if (isCancelled) return;

        if (!cachedResults) {
          setError(formatApiError(err));
        } else {
          setWarning('Mostrando resultados cacheados. No se pudo refrescar desde el servidor.');
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    void loadResults();

    return () => {
      isCancelled = true;
    };
  }, [navigate, scanId]);

  const modules = useMemo(() => (results ? normalizeModules(results.modules) : []), [results]);
  const criticalFindings = useMemo(() => extractCriticalFindings(modules), [modules]);
  const personalizedMsg = useMemo(
    () => getPersonalizedMessage(results?.grade || 'C'),
    [results?.grade],
  );
  const benchmark = useMemo(
    () => getIndustryBenchmark(results?.score || 0),
    [results?.score],
  );
  const remediationPlan = useMemo(() => buildRemediationPlan(modules), [modules]);

  const toggleModule = (moduleKey: string) => {
    setExpandedModules((prev) =>
      prev.includes(moduleKey) ? prev.filter((item) => item !== moduleKey) : [...prev, moduleKey],
    );
  };

  const downloadJSONReport = () => {
    if (!results || !scanId) return;

    const blob = new Blob([JSON.stringify(results, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `dygsom-scan-${scanId}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleLandingSectionCTA = (sectionId: string, eventLabel: string) => {
    trackCTAClick(eventLabel, 'Results Page CTA');
    navigateToLandingSection(navigate, location.pathname, sectionId);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <Header />
        <main className="container mx-auto flex flex-grow items-center justify-center px-4 py-20">
          <div className="text-center text-slate-300">
            <FaSpinner className="mx-auto mb-4 text-4xl animate-spin text-green-400" />
            <p className="text-lg">Cargando resultados del escaneo...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!results || error) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <Header />
        <main className="container mx-auto flex flex-grow items-center justify-center px-4 py-20">
          <div className="w-full max-w-2xl rounded-xl border border-red-500/40 bg-red-500/10 p-8 text-center">
            <FaExclamationCircle className="mx-auto mb-4 text-4xl text-red-400" />
            <h1 className="mb-2 text-2xl font-bold text-white">No se pudieron cargar resultados</h1>
            <p className="mb-6 text-slate-300">{error || 'Resultados no disponibles para este scan.'}</p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="rounded-lg bg-white/10 px-5 py-3 font-semibold text-white transition-colors hover:bg-white/20"
              >
                Reintentar
              </button>
              <Link
                to="/scan"
                className="rounded-lg bg-green-500 px-5 py-3 font-semibold text-white transition-colors hover:bg-green-600"
              >
                Iniciar nuevo scan
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Header />
      <main className="container mx-auto flex-grow px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <div className={`mb-4 text-8xl font-bold ${getGradeColor(results.grade)}`}>{results.grade}</div>
            <h1 className="mb-2 text-4xl font-bold text-white">Security Score: {results.score}/100</h1>
            <p className="mb-6 text-gray-400">{results.url || results.domain}</p>

            <div
              className={`mx-auto max-w-3xl rounded-xl border-2 p-6 ${
                personalizedMsg.urgency === 'high'
                  ? 'border-red-500/30 bg-red-500/10'
                  : personalizedMsg.urgency === 'medium'
                    ? 'border-yellow-500/30 bg-yellow-500/10'
                    : 'border-green-500/30 bg-green-500/10'
              }`}
            >
              <h2
                className={`mb-2 text-xl font-bold ${
                  personalizedMsg.urgency === 'high'
                    ? 'text-red-300'
                    : personalizedMsg.urgency === 'medium'
                      ? 'text-yellow-300'
                      : 'text-green-300'
                }`}
              >
                {personalizedMsg.title}
              </h2>
              <p className="text-sm text-slate-300">{personalizedMsg.description}</p>
            </div>
          </div>

          {warning && (
            <div className="mb-6 rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-4 text-sm text-yellow-300">
              {warning}
            </div>
          )}

          <div className="mb-8 rounded-xl border border-cyan-500/25 bg-gradient-to-br from-cyan-900/20 to-blue-900/20 p-6">
            <div className="mb-4 flex items-center gap-3">
              <FaChartLine className="text-2xl text-cyan-300" />
              <h2 className="text-xl font-bold text-white">Benchmark vs Industria</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="text-center">
                <p className="mb-1 text-sm text-slate-400">Tu Score</p>
                <p className="text-3xl font-bold text-white">{results.score}</p>
              </div>
              <div className="text-center">
                <p className="mb-1 text-sm text-slate-400">Promedio LATAM</p>
                <p className="text-3xl font-bold text-slate-300">{benchmark.avgScore}</p>
              </div>
              <div className="text-center">
                <p className="mb-1 text-sm text-slate-400">Diferencia</p>
                <p
                  className={`text-3xl font-bold ${
                    benchmark.difference > 0 ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {formatSignedDifference(benchmark.difference)}
                </p>
              </div>
            </div>
            <div className="mt-4 border-t border-cyan-500/20 pt-4">
              <p className="text-center text-sm text-slate-300">
                Estas en el <span className="font-bold text-cyan-300">percentil {benchmark.percentile}</span> de
                seguridad.
              </p>
            </div>
          </div>

          {criticalFindings.length > 0 && (
            <div className="mb-8 rounded-xl border-2 border-red-500/30 bg-red-500/10 p-6">
              <div className="mb-4 flex items-center gap-3">
                <FaExclamationCircle className="text-3xl text-red-400" />
                <h2 className="text-2xl font-bold text-white">Hallazgos Criticos</h2>
              </div>
              <p className="mb-4 text-slate-300">
                Se detectaron {criticalFindings.length} hallazgos de alta prioridad.
              </p>
              <div className="space-y-3">
                {criticalFindings.map((finding, index) => (
                  <div key={`${finding.moduleName}-${index}`} className="rounded-lg border border-red-500/20 bg-red-900/20 p-4">
                    <div className="flex items-start gap-3">
                      <span
                        className={`shrink-0 rounded px-2 py-1 text-xs font-bold uppercase ${
                          finding.severity === 'critical' ? 'bg-red-600 text-white' : 'bg-orange-500 text-white'
                        }`}
                      >
                        {finding.severity}
                      </span>
                      <div>
                        <p className="mb-1 font-semibold text-white">
                          [{finding.moduleName}] {finding.title}
                        </p>
                        <p className="text-sm text-slate-400">{finding.impact}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mb-8 space-y-4">
            {modules.map((module) => {
              const Icon = module.icon;
              const isExpanded = expandedModules.includes(module.key);

              return (
                <div
                  key={module.key}
                  className="overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-all hover:bg-white/10"
                >
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${
                          module.status === 'pass'
                            ? 'bg-green-500/20'
                            : module.status === 'warning'
                              ? 'bg-yellow-500/20'
                              : 'bg-red-500/20'
                        }`}
                      >
                        <Icon
                          className={`text-2xl ${
                            module.status === 'pass'
                              ? 'text-green-400'
                              : module.status === 'warning'
                                ? 'text-yellow-400'
                                : 'text-red-400'
                          }`}
                        />
                      </div>

                      <div className="flex-grow">
                        <div className="mb-3 flex items-center justify-between">
                          <h3 className="text-xl font-semibold text-white">{module.name}</h3>
                          {module.status === 'pass' ? (
                            <FaCheckCircle className="text-2xl text-green-400" />
                          ) : (
                            <FaExclamationTriangle className="text-2xl text-yellow-400" />
                          )}
                        </div>

                        <p className="mb-4 text-sm text-slate-400">{module.description}</p>

                        <div className="mb-4 flex items-center gap-3">
                          <div className="h-3 flex-grow rounded-full bg-white/10">
                            <div
                              className={`h-3 rounded-full ${
                                module.status === 'pass'
                                  ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                                  : module.status === 'warning'
                                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
                                    : 'bg-gradient-to-r from-red-500 to-red-700'
                              }`}
                              style={{ width: `${Math.max(0, Math.min(100, module.score))}%` }}
                            />
                          </div>
                          <span
                            className={`min-w-[60px] text-right text-sm font-semibold ${
                              module.status === 'pass'
                                ? 'text-green-400'
                                : module.status === 'warning'
                                  ? 'text-yellow-400'
                                  : 'text-red-400'
                            }`}
                          >
                            {module.score}/100
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            toggleModule(module.key);
                            trackCTAClick(`Toggle Module: ${module.name}`, 'Results Page');
                          }}
                          className="flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
                          aria-expanded={isExpanded}
                          aria-controls={`module-${module.key}-details`}
                        >
                          {isExpanded ? (
                            <>
                              <FaChevronUp /> Ocultar detalles
                            </>
                          ) : (
                            <>
                              <FaChevronDown /> Ver detalles ({module.findings.length} hallazgos)
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {isExpanded && (
                    <div
                      id={`module-${module.key}-details`}
                      className="border-t border-white/10 bg-white/5 p-6"
                      role="region"
                      aria-label={`Detalles de ${module.name}`}
                    >
                      <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white">
                        Hallazgos Detallados
                      </h4>
                      <div className="space-y-2">
                        {module.findings.map((finding, index) => (
                          <div
                            key={`${module.key}-finding-${index}`}
                            className={`flex items-start gap-3 rounded-lg p-3 ${
                              finding.type === 'success'
                                ? 'bg-green-500/10'
                                : finding.type === 'warning'
                                  ? 'bg-yellow-500/10'
                                  : finding.type === 'critical'
                                    ? 'bg-red-500/10'
                                    : 'bg-blue-500/10'
                            }`}
                          >
                            <span
                              className={`shrink-0 text-lg ${
                                finding.type === 'success'
                                  ? 'text-green-400'
                                  : finding.type === 'warning'
                                    ? 'text-yellow-400'
                                    : finding.type === 'critical'
                                      ? 'text-red-400'
                                      : 'text-blue-400'
                              }`}
                            >
                              {finding.type === 'success'
                                ? 'OK'
                                : finding.type === 'warning'
                                  ? 'WARN'
                                  : finding.type === 'critical'
                                    ? 'ALERT'
                                    : 'INFO'}
                            </span>
                            <p className="text-sm text-slate-300">{finding.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mb-8 rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-blue-900/30 to-slate-900/50 p-8">
            <div className="mb-6 text-center">
              <h2 className="mb-2 text-2xl font-bold text-white">Plan de accion sugerido</h2>
              <p className="text-slate-300">
                Ordena la ejecucion por impacto. Empieza por las acciones criticas para reducir riesgo rapido.
              </p>
            </div>

            <div className="mb-6 space-y-4">
              {remediationPlan.map((task, index) => {
                const priorityStyle = getPriorityClasses(task.priority);

                return (
                  <article
                    key={task.id}
                    className={`rounded-xl border bg-slate-950/40 p-5 ${priorityStyle.border}`}
                  >
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-400">
                          Accion {index + 1}
                        </span>
                        <span className={`rounded px-2 py-1 text-xs font-semibold uppercase ${priorityStyle.badge}`}>
                          Prioridad {task.priority}
                        </span>
                      </div>
                      <span className={`text-xs font-medium ${priorityStyle.text}`}>ETA: {task.eta}</span>
                    </div>

                    <p className="mb-1 text-base font-semibold text-white">
                      [{task.moduleName}] {task.title}
                    </p>
                    <p className="mb-3 text-sm text-slate-300">{task.impact}</p>
                    <p className="text-sm text-cyan-100">
                      <span className="font-semibold text-cyan-300">Siguiente paso:</span>{' '}
                      {task.recommendation}
                    </p>
                  </article>
                );
              })}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <button
                type="button"
                onClick={() => handleLandingSectionCTA('contacto', 'Contact Expert')}
                className="flex items-center justify-center gap-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-4 font-bold text-white shadow-lg shadow-green-500/30 transition-all hover:from-green-600 hover:to-emerald-600"
                aria-label="Contactar con un experto en seguridad"
              >
                <FaPhone />
                Hablar con Experto (Gratis)
              </button>

              <button
                type="button"
                onClick={() => handleLandingSectionCTA('pricing', 'View Pricing')}
                className="flex items-center justify-center gap-3 rounded-lg border border-cyan-300/30 bg-cyan-500/10 px-6 py-4 font-semibold text-cyan-100 transition-all hover:bg-cyan-500/20"
                aria-label="Ver planes de pricing"
              >
                <FaChartLine />
                Ver Pricing
              </button>

              <button
                type="button"
                onClick={() => {
                  trackCTAClick('Download JSON', 'Results Page CTA');
                  downloadJSONReport();
                }}
                className="flex items-center justify-center gap-3 rounded-lg border border-blue-500/30 bg-blue-500/20 px-6 py-4 font-semibold text-blue-300 transition-all hover:bg-blue-500/30"
                aria-label="Descargar reporte tecnico en JSON"
              >
                <FaDownload />
                Descargar Reporte JSON
              </button>

              <button
                type="button"
                onClick={() => {
                  trackCTAClick('New Scan', 'Results Page CTA');
                  navigate('/scan');
                }}
                className="flex items-center justify-center gap-3 rounded-lg border border-white/10 bg-white/5 px-6 py-4 font-semibold text-slate-300 transition-all hover:bg-white/10"
                aria-label="Iniciar un nuevo escaneo de seguridad"
              >
                <FaRocket />
                Nuevo Scan
              </button>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-gray-500">Scan ID: {scanId}</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
