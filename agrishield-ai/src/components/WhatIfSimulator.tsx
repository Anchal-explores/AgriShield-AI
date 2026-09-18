import React from 'react';
import { SlidersHorizontal, ArrowRight, RotateCcw, AlertTriangle, Sparkles, TrendingDown, TrendingUp, Droplets, Thermometer, CloudRain } from 'lucide-react';
import { FieldData, ComputedMetrics, SimulationParams } from '../types/farm';

interface WhatIfSimulatorProps {
  field: FieldData;
  actualMetrics: ComputedMetrics;
  simulatedMetrics: ComputedMetrics;
  simParams: SimulationParams;
  onUpdateParams: (newParams: Partial<SimulationParams>) => void;
  onReset: () => void;
  explanationText: string;
}

export const WhatIfSimulator: React.FC<WhatIfSimulatorProps> = ({
  field,
  actualMetrics,
  simulatedMetrics,
  simParams,
  onUpdateParams,
  onReset,
  explanationText,
}) => {
  const isChanged =
    simParams.rainfall !== field.rainfall ||
    simParams.temperature !== field.temperature ||
    simParams.soilMoisture !== field.soilMoisture;

  // Preset scenarios
  const applyPreset = (preset: 'drought' | 'heatwave' | 'monsoon' | 'optimal') => {
    switch (preset) {
      case 'drought':
        // The exact hackathon scenario: 5mm rain!
        onUpdateParams({ rainfall: 5, temperature: 31, soilMoisture: 48 });
        break;
      case 'heatwave':
        onUpdateParams({ rainfall: 2, temperature: 38, soilMoisture: 42 });
        break;
      case 'monsoon':
        onUpdateParams({ rainfall: 65, temperature: 27, soilMoisture: 88 });
        break;
      case 'optimal':
        onUpdateParams({ rainfall: 25, temperature: 26, soilMoisture: 70 });
        break;
    }
  };

  return (
    <div id="simulator-section" className="bg-gradient-to-br from-slate-900 via-slate-900 to-forest-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-forest-500/30 relative overflow-hidden">
      
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none"></div>

      <div className="relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>THE "WHAT-IF" EXPERIMENTATION ENGINE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
              <span>Climate What-If Simulator</span>
              <span className="text-amber-400 text-xl font-bold">★</span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1">
              Simulating impact on <strong className="text-emerald-400 font-bold">{field.name} ({field.crop})</strong> in real time. Adjust sliders to observe physiological stress and yield response.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => applyPreset('drought')}
              className="px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-200 text-xs font-semibold transition-all cursor-pointer"
            >
              Drought Shock (5mm)
            </button>
            <button
              onClick={() => applyPreset('heatwave')}
              className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-200 text-xs font-semibold transition-all cursor-pointer"
            >
              Heatwave (38°C)
            </button>
            <button
              onClick={() => applyPreset('monsoon')}
              className="px-3 py-1.5 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 border border-sky-500/40 text-sky-200 text-xs font-semibold transition-all cursor-pointer"
            >
              Monsoon (65mm)
            </button>
            {isChanged && (
              <button
                onClick={onReset}
                className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-slate-200 text-xs font-semibold transition-all cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Actuals</span>
              </button>
            )}
          </div>
        </div>

        {/* 3 Sliders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 border-b border-white/10">
          
          {/* Slider 1: Rainfall */}
          <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <CloudRain className="w-4 h-4 text-sky-400" />
                <span>Rainfall</span>
              </span>
              <span className="text-lg font-black text-sky-400">
                {simParams.rainfall} <span className="text-xs font-medium text-slate-400">mm</span>
              </span>
            </div>
            
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={simParams.rainfall}
              onChange={(e) => onUpdateParams({ rainfall: Number(e.target.value) })}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-400"
            />

            <div className="flex justify-between text-[10px] text-slate-400 mt-2 font-mono">
              <span>0 mm (Severe drought)</span>
              <span>Actual: {field.rainfall} mm</span>
              <span>100 mm (Flood)</span>
            </div>
          </div>

          {/* Slider 2: Temperature */}
          <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Thermometer className="w-4 h-4 text-amber-400" />
                <span>Temperature</span>
              </span>
              <span className="text-lg font-black text-amber-400">
                {simParams.temperature} <span className="text-xs font-medium text-slate-400">°C</span>
              </span>
            </div>
            
            <input
              type="range"
              min="15"
              max="45"
              step="1"
              value={simParams.temperature}
              onChange={(e) => onUpdateParams({ temperature: Number(e.target.value) })}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />

            <div className="flex justify-between text-[10px] text-slate-400 mt-2 font-mono">
              <span>15°C (Cool)</span>
              <span>Actual: {field.temperature}°C</span>
              <span>45°C (Extreme)</span>
            </div>
          </div>

          {/* Slider 3: Soil Moisture */}
          <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Droplets className="w-4 h-4 text-emerald-400" />
                <span>Soil Moisture</span>
              </span>
              <span className="text-lg font-black text-emerald-400">
                {simParams.soilMoisture} <span className="text-xs font-medium text-slate-400">%</span>
              </span>
            </div>
            
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={simParams.soilMoisture}
              onChange={(e) => onUpdateParams({ soilMoisture: Number(e.target.value) })}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-400"
            />

            <div className="flex justify-between text-[10px] text-slate-400 mt-2 font-mono">
              <span>0% (Bone dry)</span>
              <span>Actual: {field.soilMoisture}%</span>
              <span>100% (Saturated)</span>
            </div>
          </div>

        </div>

        {/* Comparison: Current vs Simulated */}
        <div className="py-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Real-Time Impact Matrix: Actual vs. Scenario
            </h3>
            {isChanged ? (
              <span className="text-xs font-semibold text-amber-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                Scenario Active
              </span>
            ) : (
              <span className="text-xs text-slate-400">Synchronized with Actuals</span>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            
            {/* Metric 1: Rain */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="text-xs text-slate-400 font-bold uppercase mb-1">Precipitation</div>
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-slate-400 block font-mono">Actual</span>
                  <span className="text-lg font-bold text-slate-300">{field.rainfall} mm</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 mx-1" />
                <div className="text-right">
                  <span className="text-xs text-sky-400 block font-mono">Scenario</span>
                  <span className="text-xl font-extrabold text-white">{simParams.rainfall} mm</span>
                </div>
              </div>
            </div>

            {/* Metric 2: Water Stress */}
            <div className={`p-4 rounded-xl border transition-all ${
              simulatedMetrics.waterStress > actualMetrics.waterStress
                ? 'bg-rose-500/10 border-rose-500/30'
                : 'bg-white/5 border-white/10'
            }`}>
              <div className="text-xs text-slate-400 font-bold uppercase mb-1 flex items-center justify-between">
                <span>Water Stress</span>
                {simulatedMetrics.waterStress !== actualMetrics.waterStress && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                    simulatedMetrics.waterStress > actualMetrics.waterStress ? 'bg-rose-500/30 text-rose-300' : 'bg-emerald-500/30 text-emerald-300'
                  }`}>
                    {simulatedMetrics.waterStress > actualMetrics.waterStress ? `+${simulatedMetrics.waterStress - actualMetrics.waterStress}` : `${simulatedMetrics.waterStress - actualMetrics.waterStress}`}
                  </span>
                )}
              </div>
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-slate-400 block font-mono">Actual</span>
                  <span className="text-lg font-bold text-slate-300">{actualMetrics.waterStress}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 mx-1" />
                <div className="text-right">
                  <span className="text-xs text-amber-300 block font-mono">Scenario</span>
                  <span className={`text-xl font-extrabold ${simulatedMetrics.waterStress > 60 ? 'text-rose-400' : 'text-white'}`}>
                    {simulatedMetrics.waterStress}
                  </span>
                </div>
              </div>
            </div>

            {/* Metric 3: Crop Health */}
            <div className={`p-4 rounded-xl border transition-all ${
              simulatedMetrics.cropHealth < actualMetrics.cropHealth
                ? 'bg-amber-500/10 border-amber-500/30'
                : 'bg-white/5 border-white/10'
            }`}>
              <div className="text-xs text-slate-400 font-bold uppercase mb-1 flex items-center justify-between">
                <span>Crop Health</span>
                {simulatedMetrics.cropHealth !== actualMetrics.cropHealth && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                    simulatedMetrics.cropHealth < actualMetrics.cropHealth ? 'bg-rose-500/30 text-rose-300' : 'bg-emerald-500/30 text-emerald-300'
                  }`}>
                    {simulatedMetrics.cropHealth - actualMetrics.cropHealth}
                  </span>
                )}
              </div>
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-slate-400 block font-mono">Actual</span>
                  <span className="text-lg font-bold text-slate-300">{actualMetrics.cropHealth}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 mx-1" />
                <div className="text-right">
                  <span className="text-xs text-emerald-300 block font-mono">Scenario</span>
                  <span className={`text-xl font-extrabold ${simulatedMetrics.cropHealth >= 70 ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {simulatedMetrics.cropHealth}
                  </span>
                </div>
              </div>
            </div>

            {/* Metric 4: Expected Yield */}
            <div className={`p-4 rounded-xl border transition-all ${
              simulatedMetrics.expectedYield < actualMetrics.expectedYield
                ? 'bg-rose-500/10 border-rose-500/30'
                : 'bg-white/5 border-white/10'
            }`}>
              <div className="text-xs text-slate-400 font-bold uppercase mb-1 flex items-center justify-between">
                <span>Expected Yield</span>
                {simulatedMetrics.expectedYield !== actualMetrics.expectedYield && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                    simulatedMetrics.expectedYield < actualMetrics.expectedYield ? 'bg-rose-500/30 text-rose-300' : 'bg-emerald-500/30 text-emerald-300'
                  }`}>
                    {simulatedMetrics.yieldDeltaPercent}%
                  </span>
                )}
              </div>
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-slate-400 block font-mono">Actual</span>
                  <span className="text-lg font-bold text-slate-300">{actualMetrics.expectedYield} t/ha</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 mx-1" />
                <div className="text-right">
                  <span className="text-xs text-emerald-300 block font-mono">Scenario</span>
                  <span className="text-xl font-extrabold text-white">
                    {simulatedMetrics.expectedYield} <span className="text-xs text-slate-400">t/ha</span>
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Dynamic AI Explanation Sentence */}
        <div className="p-4 sm:p-5 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 flex items-start space-x-3">
          <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 flex-shrink-0 mt-0.5">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
              Physiological Rationale & Mitigation
            </div>
            <p className="text-sm text-emerald-100 font-medium leading-relaxed">
              {explanationText}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};