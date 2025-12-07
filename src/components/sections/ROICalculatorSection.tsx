import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';

export const ROICalculatorSection: React.FC = () => {
  const [monthlyRevenue, setMonthlyRevenue] = useState(50000);
  const [rejectionRate, setRejectionRate] = useState(8);
  const [fraudRate, setFraudRate] = useState(3.7);

  // Calculated values
  const [lostSales, setLostSales] = useState(0);
  const [fraudLoss, setFraudLoss] = useState(0);
  const [totalLoss, setTotalLoss] = useState(0);
  const [recoveredSales, setRecoveredSales] = useState(0);
  const [fraudPrevented, setFraudPrevented] = useState(0);
  const [netSavings, setNetSavings] = useState(0);
  const [roi, setROI] = useState(0);

  const DYGSOM_COST = 550; // Plan Professional cost per month

  useEffect(() => {
    calculate();
  }, [monthlyRevenue, rejectionRate, fraudRate]);

  const calculate = () => {
    // Current losses
    const lostSalesCalc = monthlyRevenue * (rejectionRate / 100);
    const fraudLossCalc = monthlyRevenue * (fraudRate / 100);
    const totalLossCalc = lostSalesCalc + fraudLossCalc;

    // With DYGSOM (reduces false positives from 8% to 2%, detects 87% of fraud)
    const recoveredSalesCalc = monthlyRevenue * ((rejectionRate / 100) - 0.02);
    const fraudPreventedCalc = (monthlyRevenue * (fraudRate / 100)) * 0.87;
    const netSavingsCalc = recoveredSalesCalc + fraudPreventedCalc - DYGSOM_COST;
    const roiCalc = netSavingsCalc / DYGSOM_COST;

    setLostSales(lostSalesCalc);
    setFraudLoss(fraudLossCalc);
    setTotalLoss(totalLossCalc);
    setRecoveredSales(recoveredSalesCalc);
    setFraudPrevented(fraudPreventedCalc);
    setNetSavings(netSavingsCalc);
    setROI(roiCalc);
  };

  const formatCurrency = (value: number) => {
    return `S/. ${Math.round(value).toLocaleString('es-PE')}`;
  };

  return (
    <section id="calculator" className="py-12 md:py-20 px-4 md:px-6 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900">
      <div className="max-w-6xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-50 mb-3 md:mb-4">
            📊 Calcula Cuánto Estás Perdiendo
          </h2>
          <p className="text-base md:text-lg text-slate-400 max-w-3xl mx-auto">
            Descubre cuánto dinero pierdes mensualmente por rechazos falsos y fraude real
          </p>
        </div>

        {/* Calculator Container */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700/50 p-6 md:p-10">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

            {/* Left Column - Inputs */}
            <div className="space-y-6">
              <h3 className="text-xl md:text-2xl font-bold text-slate-200 mb-6">Datos de tu Negocio</h3>

              {/* Monthly Revenue Input */}
              <div>
                <label htmlFor="monthly-revenue" className="block text-sm font-semibold text-slate-300 mb-2">
                  Ventas mensuales (S/.)
                </label>
                <input
                  type="number"
                  id="monthly-revenue"
                  value={monthlyRevenue}
                  onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-slate-900/70 border border-slate-600 rounded-lg text-slate-200 text-lg font-mono placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="50000"
                  min="0"
                  step="1000"
                />
              </div>

              {/* Rejection Rate Input */}
              <div>
                <label htmlFor="rejection-rate" className="block text-sm font-semibold text-slate-300 mb-2">
                  Tasa de rechazo actual (%)
                </label>
                <input
                  type="number"
                  id="rejection-rate"
                  value={rejectionRate}
                  onChange={(e) => setRejectionRate(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-slate-900/70 border border-slate-600 rounded-lg text-slate-200 text-lg font-mono placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="8"
                  min="0"
                  max="100"
                  step="0.1"
                />
                <p className="text-xs text-slate-500 mt-1">Promedio Perú: 8%</p>
              </div>

              {/* Fraud Rate Input */}
              <div>
                <label htmlFor="fraud-rate" className="block text-sm font-semibold text-slate-300 mb-2">
                  Tasa de fraude real (%)
                </label>
                <input
                  type="number"
                  id="fraud-rate"
                  value={fraudRate}
                  onChange={(e) => setFraudRate(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-slate-900/70 border border-slate-600 rounded-lg text-slate-200 text-lg font-mono placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="3.7"
                  min="0"
                  max="100"
                  step="0.1"
                />
                <p className="text-xs text-slate-500 mt-1">Promedio LATAM: 3.7%</p>
              </div>
            </div>

            {/* Right Column - Results */}
            <div className="space-y-6">

              {/* Current Losses */}
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-red-400 mb-4">Estás Perdiendo:</h3>

                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <span className="text-sm text-slate-300">Ventas rechazadas (falsos positivos):</span>
                    <span className="text-lg font-bold text-red-400 font-mono">{formatCurrency(lostSales)}/mes</span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <span className="text-sm text-slate-300">Pérdidas por fraude:</span>
                    <span className="text-lg font-bold text-red-400 font-mono">{formatCurrency(fraudLoss)}/mes</span>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-red-600/20 border-2 border-red-500/50 rounded-lg">
                    <span className="text-base font-semibold text-slate-200">TOTAL PERDIDO:</span>
                    <span className="text-2xl font-extrabold text-red-400 font-mono">{formatCurrency(totalLoss)}/mes</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-700 pt-6"></div>

              {/* With DYGSOM */}
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-green-400 mb-4">Con DYGSOM:</h3>

                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <span className="text-sm text-slate-300">Ventas recuperadas:</span>
                    <span className="text-lg font-bold text-green-400 font-mono">{formatCurrency(recoveredSales)}/mes</span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <span className="text-sm text-slate-300">Fraude evitado:</span>
                    <span className="text-lg font-bold text-green-400 font-mono">{formatCurrency(fraudPrevented)}/mes</span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-slate-700/30 border border-slate-600/50 rounded-lg">
                    <span className="text-sm text-slate-300">Costo DYGSOM:</span>
                    <span className="text-lg font-bold text-slate-400 font-mono">{formatCurrency(DYGSOM_COST)}/mes</span>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-600/30 to-emerald-600/30 border-2 border-green-500/50 rounded-lg">
                    <span className="text-base font-semibold text-slate-200">AHORRO NETO:</span>
                    <span className="text-2xl font-extrabold text-green-400 font-mono">{formatCurrency(netSavings)}/mes</span>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-yellow-600/30 to-orange-600/30 border-2 border-yellow-500/50 rounded-lg">
                    <span className="text-base font-semibold text-slate-200">ROI:</span>
                    <span className="text-2xl font-extrabold text-yellow-400 font-mono">{roi.toFixed(1)}x</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Projection Disclaimer */}
          <div className="mt-8 bg-blue-900/20 border border-blue-400/30 rounded-xl p-4 text-center">
            <p className="text-xs md:text-sm text-slate-300">
              <span className="text-lg mr-1">ℹ️</span>
              <strong className="text-blue-300">Proyección estimada</strong> basada en promedios de la industria LATAM (8% rechazos, 3.7% fraude, 87% detección DYGSOM).
              <span className="text-blue-200"> Resultados reales pueden variar según tu negocio específico.</span>
            </p>
          </div>

          {/* CTA Button */}
          <div className="mt-10 text-center">
            <Button
              size="lg"
              className="text-base md:text-lg px-8 py-4"
              onClick={() => {
                const contactSection = document.getElementById('contacto');
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
            >
              Quiero Analizar Mis Datos Reales (Gratis)
            </Button>
            <p className="text-xs text-slate-500 mt-3">Sin compromiso • Análisis en 24 horas</p>
          </div>

        </div>

      </div>
    </section>
  );
};
