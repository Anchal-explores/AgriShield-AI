import React from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from 'recharts';
import { CloudRain, Thermometer, Droplet, AlertCircle, TrendingDown, SunMedium } from 'lucide-react';
import { WeatherDay, RiskDriver } from '../types/farm';

interface WeatherRiskSectionProps {
  forecast: WeatherDay[];
  currentRainfall: number;
  currentMoisture: number;
  currentTemp: number;
  currentHumidity: number;
}

export const WeatherRiskSection: React.FC<WeatherRiskSectionProps> = ({
  forecast,
  currentRainfall,
  currentMoisture,
  currentTemp,
  currentHumidity,
}) => {
  const riskDrivers: RiskDriver[] = [
    {
      title: 'Low rainfall',
      impact: `${currentRainfall} mm recorded`,
      level: currentRainfall < 10 ? 'High' : 'Moderate',
      detail: 'Cumulative precipitation deficit projected over the next 4–5 days; dry spell watch active.',
    },
    {
      title: 'Moderate soil moisture',
      impact: `${currentMoisture}% in root zone`,
      level: currentMoisture < 50 ? 'High' : 'Moderate',
      detail: 'Adequate for current tillering, but daily depletion is 3–4% without recharge.',
    },
    {
      title: 'Elevated humidity',
      impact: `${currentHumidity}% relative humidity`,
      level: currentHumidity > 75 ? 'High' : 'Moderate',
      detail: 'Foliar moisture duration exceeds 6 hours daily; favorable for fungal spore germination.',
    },
    {
      title: 'Increasing temperature',
      impact: `${currentTemp}°C afternoon peak`,
      level: currentTemp > 32 ? 'High' : 'Moderate',
      detail: 'Thermal ceiling approaches upper comfort threshold, accelerating evapotranspiration.',
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-6">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <SunMedium className="w-5 h-5 text-amber-500" />
            <span>Weather & Risk Driver Forecast</span>
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            7-day microclimate trend and key operational stress drivers
          </p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <div className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            <span className="text-slate-600 font-medium">Temp (°C)</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded bg-sky-500"></span>
            <span className="text-slate-600 font-medium">Rain (mm)</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span className="text-slate-600 font-medium">Humidity (%)</span>
          </div>
        </div>
      </div>

      {/* 7-Day Chart */}
      <div className="h-64 sm:h-72 w-full mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={forecast} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis 
              dataKey="day" 
              tick={{ fontSize: 11, fill: '#64748b' }} 
              axisLine={{ stroke: '#e2e8f0' }}
              tickLine={false}
            />
            <YAxis 
              yAxisId="left" 
              tick={{ fontSize: 11, fill: '#64748b' }} 
              axisLine={{ stroke: '#e2e8f0' }}
              tickLine={false}
            />
            <YAxis 
              yAxisId="right" 
              orientation="right" 
              domain={[0, 100]} 
              tick={{ fontSize: 11, fill: '#64748b' }} 
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                borderColor: '#e2e8f0',
                borderRadius: '0.75rem',
                fontSize: '12px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
              formatter={(value: any, name: any) => {
                if (name === 'temp') return [`${value} °C`, 'Temperature'];
                if (name === 'rainfall') return [`${value} mm`, 'Rainfall'];
                if (name === 'humidity') return [`${value} %`, 'Humidity'];
                return [value, name];
              }}
            />
            <Bar yAxisId="left" dataKey="rainfall" fill="#38bdf8" radius={[4, 4, 0, 0]} maxBarSize={28} />
            <Line yAxisId="left" type="monotone" dataKey="temp" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 3, fill: '#f59e0b' }} />
            <Line yAxisId="right" type="monotone" dataKey="humidity" stroke="#10b981" strokeWidth={2} strokeDasharray="4 4" dot={{ r: 2, fill: '#10b981' }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Risk Drivers Section */}
      <div>
        <div className="flex items-center space-x-2 mb-3">
          <AlertCircle className="w-4 h-4 text-slate-500" />
          <h3 className="text-xs font-bold text-slate-600 uppercase tracking-wider">
            Identified Risk Drivers
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {riskDrivers.map((item, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-colors">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-bold text-slate-900">{item.title}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  item.level === 'High' 
                    ? 'bg-rose-100 text-rose-800' 
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {item.level}
                </span>
              </div>
              <div className="text-xs font-semibold text-slate-700 mb-1">
                {item.impact}
              </div>
              <p className="text-[11px] text-slate-500 leading-snug">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};