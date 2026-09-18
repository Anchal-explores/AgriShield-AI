import React, { useState } from 'react';
import { Sparkles, CheckSquare, Square, AlertTriangle, HelpCircle, CheckCircle2, ChevronRight } from 'lucide-react';
import { FieldData, ComputedMetrics } from '../types/farm';

interface IntelligencePanelProps {
  field: FieldData;
  metrics: ComputedMetrics;
  insightText: string;
  isSimulated?: boolean;
}

export const IntelligencePanel: React.FC<IntelligencePanelProps> = ({
  field,
  metrics,
  insightText,
  isSimulated = false,
}) => {
  // State for interactive recommended action checkboxes
  const [completedActions, setCompletedActions] = useState<Record<string, boolean>>({});

  const toggleAction = (actionKey: string) => {
    setCompletedActions(prev => ({
      ...prev,
      [actionKey]: !prev[actionKey]
    }));
  };

  const actionItems = [
    {
      id: 'moisture',
      title: 'Monitor soil moisture',
      detail: `Current level: ${field.soilMoisture}%. Check root zone depth in ${field.name} (${field.crop}).`,
      priority: field.soilMoisture < 60 ? 'High' : 'Normal',
    },
    {
      id: 'irrigation',
      title: 'Review irrigation requirement',
      detail: metrics.waterStress > 50 
        ? 'Schedule 25-30mm supplemental irrigation within 24 hours to prevent permanent wilting.'
        : 'Irrigation demand is currently manageable; withhold until top 5cm shows drying.',
      priority: metrics.waterStress > 50 ? 'Urgent' : 'Routine',
    },
    {
      id: 'disease',
      title: 'Inspect crops for disease symptoms',
      detail: `Pathogen risk index is ${metrics.diseaseRisk}/100. Inspect leaf undersides for foliar spots or blight spores.`,
      priority: metrics.diseaseRisk > 60 ? 'High' : 'Routine',
    },
    {
      id: 'weather',
      title: 'Monitor upcoming weather',
      detail: 'Anticipate low rainfall over the coming 96h window with rising daytime heat index.',
      priority: 'Normal',
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between">
      
      {/* Panel Header */}
      <div className="p-5 sm:p-6 border-b border-slate-100 bg-gradient-to-r from-forest-50/70 via-white to-emerald-50/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-forest-600 text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <span>AI Farm Intelligence</span>
                {isSimulated && (
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-semibold border border-amber-300">
                    What-If Mode
                  </span>
                )}
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Autonomous diagnostic synthesis for {field.name} ({field.crop})
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700 shadow-2xs">
              Status: <span className="text-forest-700 font-bold">{metrics.cropHealthStatus}</span>
            </span>
          </div>
        </div>

        {/* Dynamic Insight Callout */}
        <div className="mt-4 p-4 rounded-xl bg-white border border-forest-100 shadow-2xs">
          <p className="text-sm font-medium text-slate-800 leading-relaxed">
            {insightText}
          </p>
        </div>
      </div>

      {/* Recommended Actions */}
      <div className="p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Recommended Operational Actions
          </h3>
          <span className="text-xs text-slate-400 font-medium">
            {Object.values(completedActions).filter(Boolean).length} of {actionItems.length} addressed
          </span>
        </div>

        <div className="space-y-2.5">
          {actionItems.map((item) => {
            const isDone = !!completedActions[item.id];
            return (
              <div
                key={item.id}
                onClick={() => toggleAction(item.id)}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start space-x-3 select-none ${
                  isDone
                    ? 'bg-slate-50/80 border-slate-200 opacity-60'
                    : 'bg-white hover:bg-slate-50/50 border-slate-200 shadow-2xs'
                }`}
              >
                <div className="pt-0.5 text-forest-600 flex-shrink-0">
                  {isDone ? (
                    <CheckSquare className="w-5 h-5 text-forest-600" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-400" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-sm font-semibold ${isDone ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                      {item.title}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      item.priority === 'Urgent'
                        ? 'bg-rose-100 text-rose-700'
                        : item.priority === 'High'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {item.priority}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                    {item.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Prototype / Demo Disclaimer */}
      <div className="px-5 py-3 sm:px-6 bg-slate-50/90 border-t border-slate-100 flex items-center space-x-2 text-xs text-slate-500">
        <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0" />
        <span className="leading-tight">
          <strong className="text-slate-700 font-semibold">Prototype / Demo Intelligence:</strong> For decision support testing only. Not intended as certified agronomic or financial advice.
        </span>
      </div>

    </div>
  );
};