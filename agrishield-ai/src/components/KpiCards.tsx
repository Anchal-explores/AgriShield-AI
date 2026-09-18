import React from 'react';
import { HeartPulse, Droplets, Bug, CloudSun, ShieldAlert, TrendingUp } from 'lucide-react';
import { ComputedMetrics } from '../types/farm';

interface KpiCardsProps {
  metrics: ComputedMetrics;
  isSimulated?: boolean;
}

export const KpiCards: React.FC<KpiCardsProps> = ({ metrics, isSimulated = false }) => {
  // Color helper based on score & type
  const getBadgeStyle = (type: 'health' | 'stress' | 'risk', status: string) => {
    if (type === 'health') {
      if (status === 'Healthy' || status === 'Good') return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      if (status === 'Moderate') return 'bg-amber-100 text-amber-800 border-amber-300';
      return 'bg-rose-100 text-rose-800 border-rose-300';
    }
    // For stress & risk, lower is better
    if (status === 'Low' || status === 'Optimal') return 'bg-emerald-100 text-emerald-800 border-emerald-300';
    if (status === 'Moderate') return 'bg-amber-100 text-amber-800 border-amber-300';
    return 'bg-rose-100 text-rose-800 border-rose-300';
  };

  const getProgressColor = (type: 'health' | 'stress' | 'risk', val: number) => {
    if (type === 'health') {
      return val >= 75 ? 'bg-emerald-500' : val >= 55 ? 'bg-amber-500' : 'bg-rose-500';
    }
    // For stress & risk:
    return val <= 40 ? 'bg-emerald-500' : val <= 65 ? 'bg-amber-500' : 'bg-rose-500';
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
      
      {/* 1. Crop Health */}
      <div className={`bg-white rounded-xl p-4 border transition-all shadow-xs ${
        isSimulated ? 'border-emerald-300 bg-emerald-50/10' : 'border-slate-200'
      }`}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Crop Health
          </span>
          <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
            <HeartPulse className="w-4 h-4" />
          </div>
        </div>
        
        <div className="flex items-baseline space-x-1 mb-2">
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {metrics.cropHealth}
          </span>
          <span className="text-xs text-slate-400 font-medium">/ 100</span>
        </div>

        <div className="w-full bg-slate-100 rounded-full h-1.5 mb-2 overflow-hidden">
          <div 
            className={`h-1.5 rounded-full transition-all duration-500 ${getProgressColor('health', metrics.cropHealth)}`}
            style={{ width: `${metrics.cropHealth}%` }}
          ></div>
        </div>

        <div className="flex items-center justify-between">
          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border ${getBadgeStyle('health', metrics.cropHealthStatus)}`}>
            {metrics.cropHealthStatus}
          </span>
          <span className="text-[10px] text-slate-400 font-medium">Vigor</span>
        </div>
      </div>

      {/* 2. Water Stress */}
      <div className={`bg-white rounded-xl p-4 border transition-all shadow-xs ${
        isSimulated && metrics.waterStress > 50 ? 'border-amber-300 bg-amber-50/20' : 'border-slate-200'
      }`}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Water Stress
          </span>
          <div className="p-1.5 rounded-lg bg-sky-50 text-sky-600">
            <Droplets className="w-4 h-4" />
          </div>
        </div>
        
        <div className="flex items-baseline space-x-1 mb-2">
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {metrics.waterStress}
          </span>
          <span className="text-xs text-slate-400 font-medium">/ 100</span>
        </div>

        <div className="w-full bg-slate-100 rounded-full h-1.5 mb-2 overflow-hidden">
          <div 
            className={`h-1.5 rounded-full transition-all duration-500 ${getProgressColor('stress', metrics.waterStress)}`}
            style={{ width: `${metrics.waterStress}%` }}
          ></div>
        </div>

        <div className="flex items-center justify-between">
          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border ${getBadgeStyle('stress', metrics.waterStressStatus)}`}>
            {metrics.waterStressStatus}
          </span>
          <span className="text-[10px] text-slate-400 font-medium">Deficit</span>
        </div>
      </div>

      {/* 3. Disease Risk */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Disease Risk
          </span>
          <div className="p-1.5 rounded-lg bg-rose-50 text-rose-600">
            <Bug className="w-4 h-4" />
          </div>
        </div>
        
        <div className="flex items-baseline space-x-1 mb-2">
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {metrics.diseaseRisk}
          </span>
          <span className="text-xs text-slate-400 font-medium">/ 100</span>
        </div>

        <div className="w-full bg-slate-100 rounded-full h-1.5 mb-2 overflow-hidden">
          <div 
            className={`h-1.5 rounded-full transition-all duration-500 ${getProgressColor('risk', metrics.diseaseRisk)}`}
            style={{ width: `${metrics.diseaseRisk}%` }}
          ></div>
        </div>

        <div className="flex items-center justify-between">
          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border ${getBadgeStyle('risk', metrics.diseaseRiskStatus)}`}>
            {metrics.diseaseRiskStatus}
          </span>
          <span className="text-[10px] text-slate-400 font-medium">Pathogen</span>
        </div>
      </div>

      {/* 4. Weather Risk */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Weather Risk
          </span>
          <div className="p-1.5 rounded-lg bg-amber-50 text-amber-600">
            <CloudSun className="w-4 h-4" />
          </div>
        </div>
        
        <div className="flex items-baseline space-x-1 mb-2">
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {metrics.weatherRisk}
          </span>
          <span className="text-xs text-slate-400 font-medium">/ 100</span>
        </div>

        <div className="w-full bg-slate-100 rounded-full h-1.5 mb-2 overflow-hidden">
          <div 
            className={`h-1.5 rounded-full transition-all duration-500 ${getProgressColor('risk', metrics.weatherRisk)}`}
            style={{ width: `${metrics.weatherRisk}%` }}
          ></div>
        </div>

        <div className="flex items-center justify-between">
          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border ${getBadgeStyle('risk', metrics.weatherRiskStatus)}`}>
            {metrics.weatherRiskStatus}
          </span>
          <span className="text-[10px] text-slate-400 font-medium">Forecast</span>
        </div>
      </div>

      {/* 5. Farm Risk */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Farm Risk
          </span>
          <div className="p-1.5 rounded-lg bg-purple-50 text-purple-600">
            <ShieldAlert className="w-4 h-4" />
          </div>
        </div>
        
        <div className="flex items-baseline space-x-1 mb-2">
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {metrics.farmRisk}
          </span>
          <span className="text-xs text-slate-400 font-medium">/ 100</span>
        </div>

        <div className="w-full bg-slate-100 rounded-full h-1.5 mb-2 overflow-hidden">
          <div 
            className={`h-1.5 rounded-full transition-all duration-500 ${getProgressColor('risk', metrics.farmRisk)}`}
            style={{ width: `${metrics.farmRisk}%` }}
          ></div>
        </div>

        <div className="flex items-center justify-between">
          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border ${getBadgeStyle('risk', metrics.farmRiskStatus)}`}>
            {metrics.farmRiskStatus}
          </span>
          <span className="text-[10px] text-slate-400 font-medium">Composite</span>
        </div>
      </div>

      {/* 6. Expected Yield */}
      <div className={`bg-white rounded-xl p-4 border transition-all shadow-xs ${
        isSimulated ? 'border-emerald-300' : 'border-slate-200'
      }`}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Expected Yield
          </span>
          <div className="p-1.5 rounded-lg bg-emerald-50 text-forest-600">
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>
        
        <div className="flex items-baseline space-x-1 mb-2">
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {metrics.expectedYield}
          </span>
          <span className="text-xs text-slate-500 font-bold">t/ha</span>
        </div>

        <div className="w-full bg-slate-100 rounded-full h-1.5 mb-2 overflow-hidden">
          <div 
            className="h-1.5 rounded-full bg-forest-500 transition-all duration-500"
            style={{ width: `${Math.min(100, (metrics.expectedYield / 6.0) * 100)}%` }}
          ></div>
        </div>

        <div className="flex items-center justify-between">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
            {metrics.yieldDeltaPercent >= 0 ? `+${metrics.yieldDeltaPercent}%` : `${metrics.yieldDeltaPercent}%`} est.
          </span>
          <span className="text-[10px] text-slate-400 font-medium">Target 4.5</span>
        </div>
      </div>

    </div>
  );
};