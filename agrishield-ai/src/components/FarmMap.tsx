import React from 'react';
import { Waves, Sparkles, Check, CheckCircle2, Droplets, Sprout } from 'lucide-react';
import { FieldData, FieldId } from '../types/farm';

interface FarmMapProps {
  fields: Record<string, FieldData>;
  selectedFieldId: FieldId;
  onSelectField: (fieldId: FieldId) => void;
}

export const FarmMap: React.FC<FarmMapProps> = ({
  fields,
  selectedFieldId,
  onSelectField,
}) => {
  const fieldA = fields['field-a'];
  const fieldB = fields['field-b'];
  const fieldC = fields['field-c'];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-6">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Sprout className="w-5 h-5 text-forest-600" />
            <span>Interactive Farm Map</span>
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Green Valley Farm layout (6.3 ha). Click any plot to switch active intelligence.
          </p>
        </div>

        <span className="text-[11px] font-semibold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-md hidden sm:inline-block">
          Interactive SVG Map
        </span>
      </div>

      {/* 2x2 Farm Map Grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 p-2 sm:p-3 bg-slate-100/70 rounded-2xl border border-slate-200/80">
        
        {/* Plot 1: Field A - Wheat */}
        <div
          onClick={() => onSelectField('field-a')}
          className={`group relative rounded-xl p-4 sm:p-5 transition-all cursor-pointer select-none overflow-hidden ${
            selectedFieldId === 'field-a'
              ? 'bg-gradient-to-br from-emerald-500 to-forest-700 text-white shadow-md ring-3 ring-emerald-400/60 scale-[1.01]'
              : 'bg-white hover:bg-emerald-50/50 border border-slate-200 text-slate-800 hover:border-emerald-300 shadow-2xs'
          }`}
        >
          {/* Subtle SVG Grid Pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <pattern id="crop-wheat" width="16" height="16" patternUnits="userSpaceOnUse">
              <path d="M 0,8 L 16,8 M 8,0 L 8,16" stroke="currentColor" strokeWidth="0.75" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#crop-wheat)" />
          </svg>

          <div className="relative z-10 flex flex-col justify-between h-28 sm:h-32">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1.5">
                <span className="text-xs font-black tracking-wider uppercase opacity-85">Plot 1</span>
                {selectedFieldId === 'field-a' && (
                  <span className="px-1.5 py-0.5 rounded bg-white/20 text-[10px] font-bold">Active</span>
                )}
              </div>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                selectedFieldId === 'field-a' ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'
              }`}>
                {fieldA.area} ha
              </span>
            </div>

            <div>
              <div className="text-xl sm:text-2xl font-black tracking-tight">{fieldA.name}</div>
              <div className={`text-sm font-semibold ${selectedFieldId === 'field-a' ? 'text-emerald-100' : 'text-forest-700'}`}>
                {fieldA.crop}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-medium pt-2 border-t border-current/15">
              <span>Moisture: {fieldA.soilMoisture}%</span>
              <span>{fieldA.stage}</span>
            </div>
          </div>
        </div>

        {/* Plot 2: Field B - Rice */}
        <div
          onClick={() => onSelectField('field-b')}
          className={`group relative rounded-xl p-4 sm:p-5 transition-all cursor-pointer select-none overflow-hidden ${
            selectedFieldId === 'field-b'
              ? 'bg-gradient-to-br from-teal-600 to-forest-800 text-white shadow-md ring-3 ring-teal-400/60 scale-[1.01]'
              : 'bg-white hover:bg-teal-50/50 border border-slate-200 text-slate-800 hover:border-teal-300 shadow-2xs'
          }`}
        >
          <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <pattern id="crop-rice" width="16" height="16" patternUnits="userSpaceOnUse">
              <circle cx="8" cy="8" r="2.5" fill="currentColor" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#crop-rice)" />
          </svg>

          <div className="relative z-10 flex flex-col justify-between h-28 sm:h-32">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1.5">
                <span className="text-xs font-black tracking-wider uppercase opacity-85">Plot 2</span>
                {selectedFieldId === 'field-b' && (
                  <span className="px-1.5 py-0.5 rounded bg-white/20 text-[10px] font-bold">Active</span>
                )}
              </div>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                selectedFieldId === 'field-b' ? 'bg-white/20 text-white' : 'bg-teal-100 text-teal-800'
              }`}>
                {fieldB.area} ha
              </span>
            </div>

            <div>
              <div className="text-xl sm:text-2xl font-black tracking-tight">{fieldB.name}</div>
              <div className={`text-sm font-semibold ${selectedFieldId === 'field-b' ? 'text-teal-100' : 'text-teal-700'}`}>
                {fieldB.crop}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-medium pt-2 border-t border-current/15">
              <span>Moisture: {fieldB.soilMoisture}%</span>
              <span>{fieldB.stage}</span>
            </div>
          </div>
        </div>

        {/* Plot 3: Field C - Maize */}
        <div
          onClick={() => onSelectField('field-c')}
          className={`group relative rounded-xl p-4 sm:p-5 transition-all cursor-pointer select-none overflow-hidden ${
            selectedFieldId === 'field-c'
              ? 'bg-gradient-to-br from-amber-500 to-amber-700 text-white shadow-md ring-3 ring-amber-400/60 scale-[1.01]'
              : 'bg-white hover:bg-amber-50/50 border border-slate-200 text-slate-800 hover:border-amber-300 shadow-2xs'
          }`}
        >
          <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <pattern id="crop-maize" width="16" height="16" patternUnits="userSpaceOnUse">
              <path d="M 0,0 L 16,16 M 16,0 L 0,16" stroke="currentColor" strokeWidth="0.75" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#crop-maize)" />
          </svg>

          <div className="relative z-10 flex flex-col justify-between h-28 sm:h-32">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1.5">
                <span className="text-xs font-black tracking-wider uppercase opacity-85">Plot 3</span>
                {selectedFieldId === 'field-c' && (
                  <span className="px-1.5 py-0.5 rounded bg-white/20 text-[10px] font-bold">Active</span>
                )}
              </div>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                selectedFieldId === 'field-c' ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-800'
              }`}>
                {fieldC.area} ha
              </span>
            </div>

            <div>
              <div className="text-xl sm:text-2xl font-black tracking-tight">{fieldC.name}</div>
              <div className={`text-sm font-semibold ${selectedFieldId === 'field-c' ? 'text-amber-100' : 'text-amber-700'}`}>
                {fieldC.crop}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-medium pt-2 border-t border-current/15">
              <span>Moisture: {fieldC.soilMoisture}%</span>
              <span>{fieldC.stage}</span>
            </div>
          </div>
        </div>

        {/* Plot 4: Water Source */}
        <div className="relative rounded-xl p-4 sm:p-5 bg-gradient-to-br from-sky-500 to-blue-700 text-white shadow-xs select-none overflow-hidden">
          {/* Animated Water Ripple Effect */}
          <div className="absolute -inset-1 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px] animate-pulse"></div>

          <div className="relative z-10 flex flex-col justify-between h-28 sm:h-32">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black tracking-wider uppercase opacity-85">Infrastructure</span>
              <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                Pump Online
              </span>
            </div>

            <div>
              <div className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-1.5">
                <Waves className="w-5 h-5 text-sky-200" />
                <span>WATER SOURCE</span>
              </div>
              <div className="text-sm font-semibold text-sky-100">
                Canal Reservoir (Tube-well #2)
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-medium pt-2 border-t border-white/20 text-sky-100">
              <span>Capacity: 88%</span>
              <span>Flow: 140 L/min</span>
            </div>
          </div>
        </div>

      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-forest-600"></span>
          Selected: <strong className="text-slate-800">{fields[selectedFieldId].name} ({fields[selectedFieldId].crop})</strong>
        </span>
        <span className="text-[11px] text-slate-400">Tap plot to inspect</span>
      </div>

    </div>
  );
};