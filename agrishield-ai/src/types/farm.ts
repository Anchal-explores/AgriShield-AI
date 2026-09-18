export type FieldId = 'field-a' | 'field-b' | 'field-c';

export type CropType = 'Wheat' | 'Rice' | 'Maize';

export interface FieldData {
  id: FieldId;
  name: string;
  crop: CropType;
  area: number; // ha
  soilMoisture: number; // %
  temperature: number; // °C
  humidity: number; // %
  rainfall: number; // mm
  baseYield: number; // t/ha
  soilType: string;
  stage: string;
  color: string;
}

export interface WeatherDay {
  day: string;
  temp: number;
  rainfall: number;
  humidity: number;
  summary: string;
}

export interface RiskDriver {
  title: string;
  impact: string;
  level: 'Low' | 'Moderate' | 'High';
  detail: string;
}

export interface ComputedMetrics {
  cropHealth: number;
  cropHealthStatus: 'Healthy' | 'Good' | 'Moderate' | 'Stressed' | 'Critical';
  waterStress: number;
  waterStressStatus: 'Optimal' | 'Low' | 'Moderate' | 'High' | 'Severe';
  diseaseRisk: number;
  diseaseRiskStatus: 'Low' | 'Moderate' | 'High';
  weatherRisk: number;
  weatherRiskStatus: 'Low' | 'Moderate' | 'High';
  farmRisk: number;
  farmRiskStatus: 'Low' | 'Moderate' | 'High';
  expectedYield: number;
  yieldDeltaPercent: number;
}

export interface SimulationParams {
  rainfall: number;
  temperature: number;
  soilMoisture: number;
}
