import React, { useState } from 'react';

export const DygsomArchitectureAnimation: React.FC = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [statusMessage, setStatusMessage] = useState('Sistema listo. Haz clic en "Iniciar" para simular una transacción.');
  const [currentStep, setCurrentStep] = useState(0);
  const [packetPosition, setPacketPosition] = useState({ x: 150, y: 450 });
  const [packetOpacity, setPacketOpacity] = useState(0);
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [processingTime, setProcessingTime] = useState(0);

  const coords = {
    ecommerce: { x: 150, y: 400 },
    gateway: { x: 380, y: 150 },
    fastapi: { x: 250, y: 280 },
    rules: { x: 510, y: 280 },
    ml: { x: 550, y: 400 },
    database: { x: 720, y: 280 }
  };

  const animateStep = async (target: keyof typeof coords, duration: number, message: string) => {
    setActiveNode(target);
    setStatusMessage(message);
    setPacketPosition(coords[target]);
    await new Promise(resolve => setTimeout(resolve, duration));
    setActiveNode(null);
  };

  const runSimulation = async () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentStep(0);
    setScore(null);
    setProcessingTime(0);
    setPacketOpacity(1);
    
    const steps = [
      { target: 'ecommerce' as const, duration: 800, message: '🛒 Transacción iniciada desde E-commerce' },
      { target: 'gateway' as const, duration: 600, message: '☁️ API Gateway recibe la solicitud' },
      { target: 'fastapi' as const, duration: 500, message: '⚡ FastAPI valida datos' },
      { target: 'rules' as const, duration: 600, message: '🔧 Rules Engine evalúa reglas' },
      { target: 'ml' as const, duration: 700, message: '🤖 ML Model calcula score' },
      { target: 'database' as const, duration: 500, message: '💾 Guardando resultado' },
      { target: 'gateway' as const, duration: 400, message: '📡 Enviando respuesta' },
      { target: 'ecommerce' as const, duration: 600, message: '✅ Transacción completada' }
    ];

    let timeAccumulated = 0;
    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i + 1);
      await animateStep(steps[i].target, steps[i].duration, steps[i].message);
      timeAccumulated += steps[i].duration;
      setProcessingTime(Math.round(timeAccumulated / 10));
    }

    const finalScore = Math.random() * (99.5 - 95.0) + 95.0;
    setScore(finalScore);
    setStatusMessage(`🎉 Decisión completada con ${finalScore.toFixed(1)}% de precisión`);

    setTimeout(() => {
      setPacketOpacity(0);
      setIsAnimating(false);
      setCurrentStep(0);
      setStatusMessage('Sistema listo. Haz clic en "Iniciar" para simular una transacción.');
    }, 2000);
  };

  return (
    <div className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 rounded-2xl shadow-2xl border border-slate-700/50 overflow-hidden w-full" style={{ maxWidth: '1300px', height: '630px', margin: '0 auto' }}>
      <style>{`
        .node-active {
          filter: drop-shadow(0 0 24px currentColor);
          animation: pulse-node 1.2s ease-in-out infinite;
        }
        @keyframes pulse-node {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
        .connection-line {
          stroke-dasharray: 8, 8;
          animation: dash 30s linear infinite;
        }
        @keyframes dash {
          to { stroke-dashoffset: -1000; }
        }
        .world-map-bg {
          opacity: 0.08;
          fill: none;
          stroke: #1e40af;
          stroke-width: 1;
        }
      `}</style>

      {/* Panel de Control */}
      <div className="absolute top-4 left-4 bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl p-4 rounded-xl border border-cyan-500/30 w-80 z-20 shadow-2xl">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-400/50"></div>
          <h3 className="text-base font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Monitoreo en Tiempo Real
          </h3>
        </div>
        
        <div className="min-h-[60px] text-xs text-slate-200 mb-3 p-3 bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-lg border-l-4 border-cyan-500 shadow-inner">
          <p className="leading-relaxed">{statusMessage}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-3 rounded-lg border border-slate-700/50 shadow-lg">
            <div className="text-xs text-slate-400 mb-1 uppercase tracking-wide">Latencia</div>
            <div className="font-mono text-2xl font-bold text-green-400">
              {processingTime}<span className="text-sm ml-1">ms</span>
            </div>
          </div>
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-3 rounded-lg border border-slate-700/50 shadow-lg">
            <div className="text-xs text-slate-400 mb-1 uppercase tracking-wide">Precisión</div>
            <div className={`font-mono text-2xl font-bold ${score ? 'text-cyan-400' : 'text-slate-600'}`}>
              {score ? `${score.toFixed(1)}%` : '--'}
            </div>
          </div>
        </div>

        <div className="mb-3 p-2 bg-slate-800/50 rounded-lg">
          <div className="flex justify-between items-center text-xs text-slate-400 mb-1">
            <span>Progreso</span>
            <span>{currentStep}/8 pasos</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-1.5 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full transition-all duration-500 ease-out"
              style={{ width: `${(currentStep / 8) * 100}%` }}
            ></div>
          </div>
        </div>

        <button 
          onClick={runSimulation}
          disabled={isAnimating}
          className="w-full py-3 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 hover:from-cyan-500 hover:via-blue-500 hover:to-purple-500 text-white text-sm font-bold rounded-lg transition-all shadow-xl hover:shadow-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]">
          {isAnimating ? '⚡ Procesando Transacción...' : '▶ Iniciar Simulación'}
        </button>
      </div>

      <svg viewBox="0 0 950 630" className="w-full h-full">
        <defs>
          {/* Gradientes */}
          <linearGradient id="grad-node" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#1e293b', stopOpacity: 0.95 }} />
            <stop offset="100%" style={{ stopColor: '#0f172a', stopOpacity: 0.95 }} />
          </linearGradient>
          <radialGradient id="grad-glow">
            <stop offset="0%" style={{ stopColor: '#06b6d4', stopOpacity: 0.6 }} />
            <stop offset="100%" style={{ stopColor: '#06b6d4', stopOpacity: 0 }} />
          </radialGradient>
          <radialGradient id="grad-packet">
            <stop offset="0%" style={{ stopColor: '#fbbf24', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#f59e0b', stopOpacity: 0.9 }} />
          </radialGradient>
          
          {/* Filtros */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Mapa del mundo muy sutil */}
        <g className="world-map-bg">
          <ellipse cx="200" cy="350" rx="80" ry="120" />
          <ellipse cx="450" cy="280" rx="120" ry="100" />
          <ellipse cx="700" cy="320" rx="90" ry="110" />
          <path d="M 100,250 Q 200,200 300,250 T 500,250 T 700,280" />
          <path d="M 150,400 Q 250,380 350,400 T 550,400 T 750,380" />
        </g>

        {/* Líneas de conexión */}
        <g className="connection-line" stroke="#3b82f6" strokeWidth="2" opacity="0.25">
          <line x1="150" y1="400" x2="380" y2="150" />
          <line x1="380" y1="150" x2="250" y2="280" />
          <line x1="380" y1="150" x2="510" y2="280" />
          <line x1="250" y1="280" x2="550" y2="400" />
          <line x1="510" y1="280" x2="550" y2="400" />
          <line x1="510" y1="280" x2="720" y2="280" />
        </g>

        {/* Nodo: E-commerce - Estilo horizontal como la referencia */}
        <g className={activeNode === 'ecommerce' ? 'node-active' : ''} style={{ color: '#3b82f6' }}>
          <rect x="70" y="365" width="160" height="70" rx="12" fill="url(#grad-node)" stroke="#3b82f6" strokeWidth="2.5" />
          <circle cx="110" cy="400" r="22" fill="#1e3a8a" />
          <text x="110" y="410" fontSize="28" textAnchor="middle">💳</text>
          <text x="165" y="397" fill="#e2e8f0" fontSize="15" fontWeight="bold" textAnchor="middle">E-commerce</text>
          <text x="165" y="413" fill="#64748b" fontSize="10" textAnchor="middle">Transaction Origin</text>
        </g>

        {/* Nodo: API Gateway */}
        <g className={activeNode === 'gateway' ? 'node-active' : ''} style={{ color: '#f59e0b' }}>
          <rect x="300" y="115" width="160" height="70" rx="12" fill="url(#grad-node)" stroke="#f59e0b" strokeWidth="2.5" />
          <circle cx="340" cy="150" r="22" fill="#92400e" />
          <text x="340" y="160" fontSize="28" textAnchor="middle">☁️</text>
          <text x="395" y="147" fill="#e2e8f0" fontSize="15" fontWeight="bold" textAnchor="middle">API Gateway</text>
          <text x="395" y="163" fill="#64748b" fontSize="10" textAnchor="middle">AWS</text>
        </g>

        {/* Nodo: FastAPI */}
        <g className={activeNode === 'fastapi' ? 'node-active' : ''} style={{ color: '#10b981' }}>
          <rect x="170" y="245" width="160" height="70" rx="12" fill="url(#grad-node)" stroke="#10b981" strokeWidth="2.5" />
          <circle cx="210" cy="280" r="22" fill="#064e3b" />
          <text x="210" y="290" fontSize="28" textAnchor="middle">⚡</text>
          <text x="265" y="277" fill="#e2e8f0" fontSize="15" fontWeight="bold" textAnchor="middle">FastAPI</text>
          <text x="265" y="293" fill="#64748b" fontSize="10" textAnchor="middle">Validation &lt; 50ms</text>
        </g>

        {/* Nodo: Rules Engine */}
        <g className={activeNode === 'rules' ? 'node-active' : ''} style={{ color: '#f97316' }}>
          <rect x="430" y="245" width="160" height="70" rx="12" fill="url(#grad-node)" stroke="#f97316" strokeWidth="2.5" />
          <circle cx="470" cy="280" r="22" fill="#7c2d12" />
          <text x="470" y="290" fontSize="28" textAnchor="middle">🔧</text>
          <text x="525" y="277" fill="#e2e8f0" fontSize="15" fontWeight="bold" textAnchor="middle">Rules Engine</text>
          <text x="525" y="293" fill="#64748b" fontSize="10" textAnchor="middle">Redis-based</text>
        </g>

        {/* Nodo: ML Model */}
        <g className={activeNode === 'ml' ? 'node-active' : ''} style={{ color: '#8b5cf6' }}>
          <rect x="470" y="365" width="160" height="70" rx="12" fill="url(#grad-node)" stroke="#8b5cf6" strokeWidth="2.5" />
          <circle cx="510" cy="400" r="22" fill="#4c1d95" />
          <text x="510" y="410" fontSize="28" textAnchor="middle">🤖</text>
          <text x="565" y="397" fill="#e2e8f0" fontSize="15" fontWeight="bold" textAnchor="middle">ML Model</text>
          <text x="565" y="413" fill="#64748b" fontSize="10" textAnchor="middle">SageMaker</text>
        </g>

        {/* Nodo: Database/Feature Store */}
        <g className={activeNode === 'database' ? 'node-active' : ''} style={{ color: '#06b6d4' }}>
          <rect x="640" y="245" width="160" height="70" rx="12" fill="url(#grad-node)" stroke="#06b6d4" strokeWidth="2.5" />
          <circle cx="680" cy="280" r="22" fill="#164e63" />
          <text x="680" y="290" fontSize="28" textAnchor="middle">💾</text>
          <text x="735" y="277" fill="#e2e8f0" fontSize="15" fontWeight="bold" textAnchor="middle">Feature Store</text>
          <text x="735" y="293" fill="#64748b" fontSize="10" textAnchor="middle">Historical Data</text>
        </g>

        {/* Paquete de datos animado */}
        {packetOpacity > 0 && (
          <g opacity={packetOpacity} style={{ transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)' }}>
            <circle cx={packetPosition.x} cy={packetPosition.y} r="25" fill="url(#grad-glow)" filter="url(#glow)" />
            <circle cx={packetPosition.x} cy={packetPosition.y} r="15" fill="url(#grad-packet)" stroke="#fbbf24" strokeWidth="2" />
            <circle cx={packetPosition.x} cy={packetPosition.y} r="8" fill="#fef3c7" />
            <path 
              d={`M${packetPosition.x - 4},${packetPosition.y} L${packetPosition.x + 4},${packetPosition.y} M${packetPosition.x},${packetPosition.y - 4} L${packetPosition.x},${packetPosition.y + 4}`} 
              stroke="#78350f" 
              strokeWidth="2" 
              strokeLinecap="round"
            />
          </g>
        )}
      </svg>
    </div>
  );
};
