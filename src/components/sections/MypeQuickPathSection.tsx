import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowRight, FaChartLine, FaClipboardCheck, FaShieldAlt } from 'react-icons/fa';
import { trackCTAClick } from '../../utils/analytics';
import { navigateToLandingSection } from '../../utils/landingNavigation';

function QuickPathCard({
  step,
  title,
  description,
  detail,
  actionLabel,
  onAction,
}: {
  step: string;
  title: string;
  description: string;
  detail: string;
  actionLabel: string;
  onAction: () => void;
}) {
  return (
    <article className="rounded-2xl border border-slate-700/70 bg-slate-900/45 p-6 shadow-xl shadow-slate-950/40 transition-all hover:-translate-y-1 hover:border-cyan-400/45">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-cyan-300/90">
        {step}
      </p>
      <h3 className="mb-2 text-xl font-bold text-white">{title}</h3>
      <p className="mb-4 text-sm leading-relaxed text-slate-300">{description}</p>
      <p className="mb-5 text-sm font-medium text-emerald-300">{detail}</p>
      <button
        type="button"
        onClick={onAction}
        className="inline-flex items-center gap-2 rounded-lg border border-cyan-300/35 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-100 transition-colors hover:bg-cyan-500/20"
      >
        {actionLabel}
        <FaArrowRight className="text-xs" />
      </button>
    </article>
  );
}

export const MypeQuickPathSection: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goToScan = () => {
    trackCTAClick('Quick Path - Start Scan', 'MYPE Quick Path');
    navigate('/scan');
  };

  const goToSolution = () => {
    trackCTAClick('Quick Path - View Solution', 'MYPE Quick Path');
    navigateToLandingSection(navigate, location.pathname, 'solucion');
  };

  const goToContact = () => {
    trackCTAClick('Quick Path - Contact', 'MYPE Quick Path');
    navigateToLandingSection(navigate, location.pathname, 'contacto');
  };

  return (
    <section
      id="ruta-mype"
      className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-4 py-12 md:px-6 md:py-16"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-400/35 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-cyan-200">
            <FaShieldAlt />
            Ruta recomendada para MYPE
          </div>
          <h2 className="mb-3 text-3xl font-bold text-white md:text-4xl">
            Que hacer primero para bajar riesgo sin frenar ventas
          </h2>
          <p className="mx-auto max-w-3xl text-slate-300">
            Esta guia resume el flujo minimo para equipos pequenos: diagnosticar, priorizar y ejecutar.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <QuickPathCard
            step="Paso 1"
            title="Ejecuta el scan inicial"
            description="Diagnostica tu postura actual de seguridad sin tocar sistemas internos."
            detail="Tiempo estimado: 60 a 90 segundos"
            actionLabel="Iniciar scan"
            onAction={goToScan}
          />

          <QuickPathCard
            step="Paso 2"
            title="Prioriza por impacto"
            description="Identifica los hallazgos que mas afectan fraude, conversion y reputacion."
            detail="Foco recomendado: SSL, Headers y Email Security"
            actionLabel="Ver 4 pilares"
            onAction={goToSolution}
          />

          <QuickPathCard
            step="Paso 3"
            title="Define plan de remediacion"
            description="Convierte resultados en tareas concretas con responsables y plazos."
            detail="Meta sugerida: acciones criticas en las primeras 48h"
            actionLabel="Hablar con experto"
            onAction={goToContact}
          />
        </div>

        <div className="mt-8 grid gap-4 rounded-2xl border border-slate-700/70 bg-slate-900/40 p-5 text-sm text-slate-300 md:grid-cols-3">
          <p className="flex items-center gap-2">
            <FaClipboardCheck className="text-cyan-300" />
            Sin integracion tecnica inicial.
          </p>
          <p className="flex items-center gap-2">
            <FaChartLine className="text-cyan-300" />
            Resultado accionable en menos de 2 minutos.
          </p>
          <p className="flex items-center gap-2">
            <FaShieldAlt className="text-cyan-300" />
            Enfoque en riesgo real para negocio digital.
          </p>
        </div>
      </div>
    </section>
  );
};
