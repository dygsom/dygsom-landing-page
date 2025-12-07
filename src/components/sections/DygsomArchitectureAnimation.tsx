import React, { useState } from 'react';

// Tipos
type NodeKey = 'ecommerce' | 'gateway' | 'fastapi' | 'rules' | 'ml' | 'database';

interface Coordinates {
  x: number;
  y: number;
}

interface NodeProps {
  pos: Coordinates;
  active: boolean;
  icon: string;
  label: string;
  sub: string;
  color: string;
}

interface LineProps {
  start: Coordinates;
  end: Coordinates;
  active: boolean;
  color?: string;
}

export const DygsomArchitectureAnimation: React.FC = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [statusMessage, setStatusMessage] = useState('Sistema listo. Haz clic en "Iniciar".');
  
  // Posición del paquete con transición suave
  const [packetPos, setPacketPos] = useState<Coordinates>({ x: 120, y: 300 });
  const [useTransition, setUseTransition] = useState(false);
  
  const [activeNode, setActiveNode] = useState<NodeKey | null>(null);
  const [activeLine, setActiveLine] = useState<string | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [processingTime, setProcessingTime] = useState(0);

  // --- LAYOUT (Optimizado para que no se crucen, pero respetando tamaños grandes) ---
  // Canvas: 950 x 600
  const coords: Record<NodeKey, Coordinates> = {
    ecommerce: { x: 120, y: 300 }, // Inicio Izquierda
    gateway:   { x: 380, y: 300 }, // Más al centro
    fastapi:   { x: 600, y: 120 }, // Arriba Derecha
    rules:     { x: 600, y: 480 }, // Abajo Derecha
    ml:        { x: 820, y: 480 }, // Extremo Derecha Abajo
    database:  { x: 820, y: 120 }  // Extremo Derecha Arriba
  };

  const steps = [
    { to: 'gateway',   duration: 400, actualTime: 8, msg: '🛒 E-commerce -> Gateway', line: 'ecom-gw' },
    { to: 'fastapi',   duration: 350, actualTime: 12, msg: '☁️ Gateway -> Validación', line: 'gw-fast' },
    { to: 'rules',     duration: 300, actualTime: 15, msg: '⚡ Validación OK -> Reglas', line: 'fast-rules' },
    { to: 'ml',        duration: 400, actualTime: 35, msg: '🔧 Reglas -> Modelo ML', line: 'rules-ml' },
    { to: 'database',  duration: 350, actualTime: 18, msg: '🤖 Score -> Feature Store', line: 'ml-db' },
    { to: 'gateway',   duration: 300, actualTime: 7, msg: '💾 Guardado -> Retorno', line: 'db-gw' },
    { to: 'ecommerce', duration: 350, actualTime: 5, msg: '📡 Respuesta (200 OK)', line: 'gw-ecom' }
  ];

  const runSimulation = async () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setScore(null);
    setProcessingTime(0);
    setUseTransition(false);
    setPacketPos(coords.ecommerce);
    
    // Pequeña pausa para resetear sin animación
    await new Promise(r => setTimeout(r, 50));
    setUseTransition(true);

    let timeAccumulated = 0;

    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      setActiveLine(step.line);
      setStatusMessage(step.msg);
      
      // Movimiento suave gracias al CSS transition
      setPacketPos(coords[step.to as NodeKey]);

      await new Promise(resolve => setTimeout(resolve, step.duration));
      
      setActiveNode(step.to as NodeKey);
      timeAccumulated += step.actualTime;
      setProcessingTime(timeAccumulated);

      // Pausa en el nodo para visualización
      await new Promise(resolve => setTimeout(resolve, 300));
      setActiveNode(null);
    }

    const finalScore = Math.random() * (99.5 - 95.0) + 95.0;
    setScore(finalScore);
    setStatusMessage(`🎉 Transacción completada. Score: ${finalScore.toFixed(1)}%`);
    setActiveLine(null);
    
    setTimeout(() => {
      setIsAnimating(false);
      setUseTransition(false);
    }, 2000);
  };

  return (
    <div className="relative bg-[#0B0F19] rounded-2xl shadow-2xl border border-slate-800 overflow-hidden w-full mx-auto" style={{ maxWidth: '1300px', height: '650px' }}>
      
      <style>{`
        /* Movimiento fluido del punto */
        .packet-motion {
          transition-property: transform;
          transition-timing-function: linear;
        }
        
        /* Estilos de los nodos - efecto glow y hover */
        .node-container {
          cursor: pointer;
          transition: all 0.3s ease;
          filter: drop-shadow(0 4px 8px rgba(0,0,0,0.6));
        }
        .node-container:hover rect.main-box {
          stroke-width: 3;
          filter: drop-shadow(0 0 12px currentColor);
        }
        .node-active rect.main-box {
          stroke-width: 3.5;
          filter: drop-shadow(0 0 20px currentColor);
          animation: pulse-glow 1.5s ease-in-out infinite;
        }
        @keyframes pulse-glow {
          0%, 100% { filter: drop-shadow(0 0 20px currentColor); }
          50% { filter: drop-shadow(0 0 30px currentColor); }
        }
        .node-active circle.icon-bg {
          animation: pulse-ring 2s infinite;
        }
        
        @keyframes pulse-ring {
          0% { r: 22; opacity: 1; }
          100% { r: 30; opacity: 0; }
          100% { stroke-width: 10; stroke-opacity: 0; }
        }

        /* Línea de flujo animada */
        .flow-line {
          stroke-dasharray: 10;
          animation: flow 1s linear infinite;
        }
        @keyframes flow {
          to { stroke-dashoffset: -20; }
        }

        /* Fondo Animado sutil */
        .bg-particle {
          animation: float 10s infinite ease-in-out;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); opacity: 0.2; }
          50% { transform: translateY(-20px); opacity: 0.5; }
        }
      `}</style>

      {/* --- PANEL DE CONTROL - Header Monitoreo en Tiempo Real --- */}
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-br from-slate-900/98 via-slate-900/95 to-slate-800/95 backdrop-blur-xl border-b-2 border-cyan-500/40 shadow-2xl z-20">
        <div className="max-w-[1300px] mx-auto px-6 py-4">
          <div className="flex flex-col gap-3">
            {/* Título del panel - Más grande y prominente */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-400/50"></div>
                <div className="absolute inset-0 w-3 h-3 bg-cyan-400 rounded-full animate-ping opacity-75"></div>
              </div>
              <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent tracking-wide">
                Plataforma antifraude para e-commerce y fintech
              </h3>
              <div className="flex-1 hidden md:block">
                <div className="h-px bg-gradient-to-r from-cyan-500/50 via-blue-500/30 to-transparent"></div>
              </div>
            </div>
            
            {/* Controles en fila */}
            <div className="flex flex-wrap items-center gap-4 md:gap-5">
              {/* Estado actual */}
              <div className="flex-1 min-w-[220px] bg-slate-800/40 backdrop-blur-sm rounded-lg px-4 py-2 border border-slate-700/50">
                <p className="text-sm text-slate-200 leading-tight font-medium">{statusMessage}</p>
              </div>

              {/* Métricas con tooltips */}
              <div className="flex gap-3 flex-shrink-0">
                <div 
                  className="group relative bg-gradient-to-br from-slate-800 to-slate-900 px-4 py-2 rounded-lg border border-slate-700/50 shadow-lg hover:border-green-500/50 hover:shadow-green-500/20 transition-all cursor-help"
                  title="Tiempo de procesamiento total"
                >
                  <div className="text-xs text-slate-400 uppercase tracking-wide mb-0.5">Latencia</div>
                  <div className="font-mono text-xl font-bold text-green-400">
                    {processingTime}<span className="text-sm ml-1">ms</span>
                  </div>
                </div>
                <div 
                  className="group relative bg-gradient-to-br from-slate-800 to-slate-900 px-4 py-2 rounded-lg border border-slate-700/50 shadow-lg hover:border-cyan-500/50 hover:shadow-cyan-500/20 transition-all cursor-help"
                  title="Precisión del modelo ML"
                >
                  <div className="text-xs text-slate-400 uppercase tracking-wide mb-0.5">Precisión</div>
                  <div className={`font-mono text-xl font-bold ${score ? 'text-cyan-400' : 'text-slate-600'}`}>
                    {score ? `${score.toFixed(1)}%` : '--'}
                  </div>
                </div>
              </div>

              {/* Botón de simulación mejorado */}
              <button 
                onClick={runSimulation}
                disabled={isAnimating}
                className="py-2.5 px-5 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 hover:from-cyan-500 hover:via-blue-500 hover:to-purple-500 text-white text-sm font-bold rounded-lg transition-all shadow-xl hover:shadow-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 flex-shrink-0 border border-cyan-400/20"
                title={isAnimating ? "Simulación en progreso" : "Ejecutar simulación de transacción ML"}
              >
                {isAnimating ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span className="hidden lg:inline">Ejecutando...</span>
                  </>
                ) : (
                  <>
                    <span>▶</span>
                    <span className="hidden sm:inline">Ejecutar</span>
                    <span className="hidden lg:inline"> Simulación</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- CANVAS SVG --- */}
      <div className="w-full h-full pt-16 relative">
        {/* Fondo Decorativo "Cyber Horizon" */}
        <div className="absolute inset-0 z-0 pointer-events-none">
            <svg width="100%" height="100%">
                <defs>
                    <radialGradient id="bg-glow" cx="50%" cy="100%" r="80%">
                        <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="#020617" stopOpacity="0" />
                    </radialGradient>
                </defs>
                <rect width="100%" height="100%" fill="url(#bg-glow)" />
                {/* Partículas decorativas */}
                <circle cx="10%" cy="80%" r="2" fill="#38bdf8" className="bg-particle" style={{animationDelay: '0s'}} />
                <circle cx="20%" cy="40%" r="1" fill="#38bdf8" className="bg-particle" style={{animationDelay: '2s'}} />
                <circle cx="80%" cy="60%" r="2" fill="#38bdf8" className="bg-particle" style={{animationDelay: '4s'}} />
                <circle cx="90%" cy="20%" r="1" fill="#38bdf8" className="bg-particle" style={{animationDelay: '1s'}} />
            </svg>
        </div>

        <svg viewBox="0 0 950 600" className="w-full h-full relative z-10">
          <defs>
            {/* Gradiente original de las cajas */}
            <linearGradient id="grad-node" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1e293b" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#0f172a" stopOpacity="0.98" />
            </linearGradient>

            <marker id="arrow" markerWidth="12" markerHeight="12" refX="22" refY="6" orient="auto">
               <path d="M2,2 L10,6 L2,10 L2,2" fill="#475569" opacity="0.5" />
            </marker>
            <marker id="arrow-active" markerWidth="12" markerHeight="12" refX="22" refY="6" orient="auto">
               <path d="M2,2 L10,6 L2,10 L2,2" fill="#22d3ee" />
            </marker>
          </defs>

          {/* 1. Líneas de Conexión */}
          <g fill="none" strokeWidth="2">
            <ConnectionLine start={coords.ecommerce} end={coords.gateway} active={activeLine === 'ecom-gw'} />
            <ConnectionLine start={coords.gateway} end={coords.fastapi} active={activeLine === 'gw-fast'} />
            <ConnectionLine start={coords.fastapi} end={coords.rules} active={activeLine === 'fast-rules'} />
            <ConnectionLine start={coords.rules} end={coords.ml} active={activeLine === 'rules-ml'} />
            <ConnectionLine start={coords.ml} end={coords.database} active={activeLine === 'ml-db'} />
            <ConnectionLine start={coords.database} end={coords.gateway} active={activeLine === 'db-gw'} />
            <ConnectionLine start={coords.gateway} end={coords.ecommerce} active={activeLine === 'gw-ecom'} color="#10b981" />
          </g>

          {/* 2. Nodos (ESTILO ORIGINAL: Cajas grandes, Iconos grandes, Colores neón) */}
          <OriginalNode 
            pos={coords.ecommerce} active={activeNode === 'ecommerce'} 
            icon="💳" label="E-Commerce" sub="Tx Origin" color="#3b82f6" 
          />
          <OriginalNode 
            pos={coords.gateway} active={activeNode === 'gateway'} 
            icon="☁️" label="API Gateway" sub="Traffic Hub" color="#f59e0b" 
          />
          <OriginalNode 
            pos={coords.fastapi} active={activeNode === 'fastapi'} 
            icon="⚡" label="FastAPI" sub="Validation <50ms" color="#22d3ee" 
          />
          <OriginalNode 
            pos={coords.rules} active={activeNode === 'rules'} 
            icon="🔧" label="Rules Engine" sub="Business Logic" color="#f97316" 
          />
          <OriginalNode 
            pos={coords.ml} active={activeNode === 'ml'} 
            icon="🧠" label="ML Model" sub="Fraud Detection" color="#8b5cf6" 
          />
          <OriginalNode 
            pos={coords.database} active={activeNode === 'database'} 
            icon="💾" label="Feature Store" sub="Historical Data" color="#10b981" 
          />

          {/* 3. Paquete (Punto) - Tamaño ajustado para ser visible pero no gigante */}
          <g 
            className="packet-motion"
            style={{ 
              transform: `translate(${packetPos.x}px, ${packetPos.y}px)`,
              transitionDuration: useTransition ? '600ms' : '0ms'
            }}
          >
            {/* Halo exterior (Glow) */}
            <circle r="10" fill="#facc15" opacity="0.4" className="animate-pulse" />
            {/* Núcleo sólido */}
            <circle r="5" fill="#facc15" stroke="#ffffff" strokeWidth="2" />
          </g>

        </svg>
      </div>
    </div>
  );
};

// --- Componentes Visuales (Estilo Original Restaurado) ---

const OriginalNode = ({ pos, active, icon, label, sub, color }: NodeProps) => {
  // Dimensiones originales grandes - estilo horizontal
  const width = 160;
  const height = 70;
  const r = 22; // Radio del círculo del icono

  return (
    <g 
      transform={`translate(${pos.x - width/2}, ${pos.y - height/2})`} 
      className={`node-container ${active ? 'node-active' : ''}`}
      style={{ color }}
    >
      <title>{label}: {sub}</title>
      
      {/* Caja Principal con gradiente oscuro y borde brillante */}
      <rect 
        className="main-box"
        width={width} height={height} rx="12" 
        fill="url(#grad-node)" 
        stroke={color} 
        strokeWidth="2.5" 
      />
      
      {/* Círculo del Icono (Izquierda) - con fondo oscuro */}
      <circle 
        className="icon-bg"
        cx="40" cy={height/2} r={r} 
        fill={active ? color + '30' : '#1e293b'}
      />
      
      {/* Icono Emoji Grande y Centrado */}
      <text x="40" y={height/2 + 9} fontSize="28" textAnchor="middle">{icon}</text>

      {/* Textos (Derecha del círculo) */}
      <text x={width/2 + 15} y={height/2 - 3} fill="#e2e8f0" fontSize="15" fontWeight="bold" textAnchor="middle">
        {label}
      </text>
      <text x={width/2 + 15} y={height/2 + 13} fill="#64748b" fontSize="10" textAnchor="middle">
        {sub}
      </text>
    </g>
  );
};

const ConnectionLine = ({ start, end, active, color = "#22d3ee" }: LineProps) => (
  <>
    {/* Línea base gris */}
    <line 
      x1={start.x} y1={start.y} x2={end.x} y2={end.y} 
      stroke="#334155" strokeWidth="1" opacity="0.5" markerEnd="url(#arrow)" 
    />
    {/* Línea activa brillante superpuesta */}
    <line 
      x1={start.x} y1={start.y} x2={end.x} y2={end.y} 
      stroke={color} 
      strokeWidth={active ? 3 : 0}
      opacity={active ? 1 : 0}
      className={active ? "flow-line" : ""}
      markerEnd={active ? "url(#arrow-active)" : ""}
    />
  </>
);

export default DygsomArchitectureAnimation;