import React, { useState } from 'react';
import { Sprout, MapPin, SlidersHorizontal, Info, RefreshCw, Calendar, Sparkles } from 'lucide-react';
import { FieldData, FieldId, SimulationParams } from '../types/farm';
import { FARM_INFO, SEVEN_DAY_FORECAST } from '../data/mockData';
import { computeFieldMetrics, generateInsight } from '../utils/intelligenceEngine';
import { KpiCards } from './KpiCards';
import { IntelligencePanel } from './IntelligencePanel';
import { WeatherRiskSection } from './WeatherRiskSection';
import { FarmMap } from './FarmMap';
import { WhatIfSimulator } from './WhatIfSimulator';

interface DashboardProps {
  fields: Record<string, FieldData>;
  selectedFieldId: FieldId;
  onSelectField: (fieldId: FieldId) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  fields,
  selectedFieldId,
  onSelectField,
}) => {
  const currentField = fields[selectedFieldId];

  // Simulator params state (starts initialized with selected field's actual values)
  const [simParams, setSimParams] = useState<SimulationParams>({
    rainfall: currentField.rainfall,
    temperature: currentField.temperature,
    soilMoisture: currentField.soilMoisture,
  });

  // Calculate actual baseline metrics
  const actualMetrics = computeFieldMetrics(currentField);

  // Calculate simulated metrics
  const simulatedMetrics = computeFieldMetrics(
    currentField,
    simParams.rainfall,
    simParams.temperature,
    simParams.soilMoisture
  );

  const isSimulated =
    simParams.rainfall !== currentField.rainfall ||
    simParams.temperature !== currentField.temperature ||
    simParams.soilMoisture !== currentField.soilMoisture;

  // Real-time dynamic explanation
  const explanation = generateInsight(
    currentField,
    simulatedMetrics,
    isSimulated,
    simParams.rainfall,
    simParams.temperature,
    simParams.soilMoisture
  );

  // Field change handler: updates field and re-syncs simulation params
  const handleFieldChange = (newFieldId: FieldId) => {
    onSelectField(newFieldId);
    const target = fields[newFieldId];
    setSimParams({
      rainfall: target.rainfall,
      temperature: target.temperature,
      soilMoisture: target.soilMoisture,
    });
  };

  const handleUpdateParams = (newParams: Partial<SimulationParams>) => {
    setSimParams(prev => ({
      ...prev,
      ...newParams,
    }));
  };

  const handleResetParams = () => {
    setSimParams({
      rainfall: currentField.rainfall,
      temperature: currentField.temperature,
      soilMoisture: currentField.soilMoisture,
    });
  };

  const scrollToSimulator = () => {
    const el = document.getElementById('simulator-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
      
      {/* Dashboard Top Header */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          
          {/* Farm Information */}
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-forest-700 uppercase tracking-wider mb-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>Farm: <strong className="text-slate-900">{FARM_INFO.name}</strong></span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-500">{FARM_INFO.location}</span>
            </div>

            <div className="flex items-center space-x-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Operational Field Intelligence
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2 text-xs text-slate-500 font-medium">
              <span>Total Area: <strong className="text-slate-700">{FARM_INFO.totalArea} ha</strong></span>
              <span>•</span>
              <span>Season: <strong className="text-slate-700">{FARM_INFO.season}</strong></span>
              <span>•</span>
              <span>Soil: <strong className="text-slate-700">{currentField.soilType}</strong></span>
              <span>•</span>
              <span>Stage: <strong className="text-slate-700">{currentField.stage}</strong></span>
            </div>
          </div>

          {/* Field Selector Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="bg-slate-100 p-1.5 rounded-xl flex items-center border border-slate-200">
              <button
                onClick={() => handleFieldChange('field-a')}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                  selectedFieldId === 'field-a'
                    ? 'bg-white text-forest-800 shadow-xs ring-1 ring-forest-500/20'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Field A — Wheat
              </button>

              <button
                onClick={() => handleFieldChange('field-b')}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                  selectedFieldId === 'field-b'
                    ? 'bg-white text-teal-800 shadow-xs ring-1 ring-teal-500/20'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Field B — Rice
              </button>

              <button
                onClick={() => handleFieldChange('field-c')}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                  selectedFieldId === 'field-c'
                    ? 'bg-white text-amber-800 shadow-xs ring-1 ring-amber-500/20'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Field C — Maize
              </button>
            </div>

            <button
              onClick={scrollToSimulator}
              className="inline-flex items-center justify-center space-x-1.5 px-4 py-2 rounded-xl bg-forest-50 hover:bg-forest-100 text-forest-800 border border-forest-200 text-xs font-bold transition-colors cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-forest-600" />
              <span>Jump to What-If</span>
            </button>
          </div>

        </div>

        {/* Status banner when simulation is active */}
        {isSimulated && (
          <div className="mt-4 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              <span>
                <strong>Simulation Active on {currentField.name}:</strong> Displaying projected values for {simParams.rainfall}mm rain, {simParams.temperature}°C temp, and {simParams.soilMoisture}% moisture.
              </span>
            </div>
            <button
              onClick={handleResetParams}
              className="px-2.5 py-1 rounded bg-white hover:bg-amber-100 border border-amber-300 font-bold text-amber-800 transition-colors"
            >
              Reset Actuals
            </button>
          </div>
        )}
      </div>

      {/* 1. KPI CARDS SECTION */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Real-Time Field Health & Risk Metrics ({currentField.name} — {currentField.crop})
          </h2>
          <span className="text-xs text-slate-400">
            {isSimulated ? 'Projected Mode' : 'Live Sensor Synchronized'}
          </span>
        </div>
        <KpiCards
          metrics={isSimulated ? simulatedMetrics : actualMetrics}
          isSimulated={isSimulated}
        />
      </section>

      {/* 2. INTELLIGENCE PANEL & FARM MAP (2-column layout) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: AI Farm Intelligence Panel */}
        <div className="lg:col-span-7">
          <IntelligencePanel
            field={currentField}
            metrics={isSimulated ? simulatedMetrics : actualMetrics}
            insightText={explanation}
            isSimulated={isSimulated}
          />
        </div>

        {/* Right Column: Interactive Farm Map */}
        <div className="lg:col-span-5">
          <FarmMap
            fields={fields}
            selectedFieldId={selectedFieldId}
            onSelectField={handleFieldChange}
          />
        </div>

      </section>

      {/* 3. WEATHER + RISK SECTION */}
      <section>
        <WeatherRiskSection
          forecast={SEVEN_DAY_FORECAST}
          currentRainfall={currentField.rainfall}
          currentMoisture={currentField.soilMoisture}
          currentTemp={currentField.temperature}
          currentHumidity={currentField.humidity}
        />
      </section>

      {/* 4. ⭐ WHAT-IF SIMULATOR (THE WOW FEATURE) */}
      <section>
        <WhatIfSimulator
          field={currentField}
          actualMetrics={actualMetrics}
          simulatedMetrics={simulatedMetrics}
          simParams={simParams}
          onUpdateParams={handleUpdateParams}
          onReset={handleResetParams}
          explanationText={explanation}
        />
      </section>

    </div>
  );
};