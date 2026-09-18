import { FieldData, WeatherDay } from '../types/farm';

export const FARM_INFO = {
  name: 'Green Valley Farm',
  location: 'Northern Plains Agro-Climatic Zone',
  totalArea: 6.3, // ha
  owner: 'Ramkrishna Sharma',
  season: 'Rabi-Zaid Transition 2026',
};

export const INITIAL_FIELDS: Record<string, FieldData> = {
  'field-a': {
    id: 'field-a',
    name: 'Field A',
    crop: 'Wheat',
    area: 2.4,
    soilMoisture: 62,
    temperature: 29,
    humidity: 68,
    rainfall: 12,
    baseYield: 4.2,
    soilType: 'Alluvial Loam',
    stage: 'Grain Filling',
    color: '#10b981',
  },
  'field-b': {
    id: 'field-b',
    name: 'Field B',
    crop: 'Rice',
    area: 1.8,
    soilMoisture: 78,
    temperature: 31,
    humidity: 82,
    rainfall: 24,
    baseYield: 5.1,
    soilType: 'Clayey Loam',
    stage: 'Tillering Stage',
    color: '#0d9488',
  },
  'field-c': {
    id: 'field-c',
    name: 'Field C',
    crop: 'Maize',
    area: 2.1,
    soilMoisture: 54,
    temperature: 30,
    humidity: 60,
    rainfall: 8,
    baseYield: 4.8,
    soilType: 'Sandy Loam',
    stage: 'Vegetative Growth',
    color: '#eab308',
  },
};

export const SEVEN_DAY_FORECAST: WeatherDay[] = [
  { day: 'Day 1 (Today)', temp: 29, rainfall: 12, humidity: 68, summary: 'Partly Cloudy' },
  { day: 'Day 2', temp: 31, rainfall: 8, humidity: 64, summary: 'Warm & Dry' },
  { day: 'Day 3', temp: 33, rainfall: 3, humidity: 58, summary: 'Sunny & Hot' },
  { day: 'Day 4', temp: 34, rainfall: 0, humidity: 55, summary: 'Dry Heatwave' },
  { day: 'Day 5', temp: 32, rainfall: 2, humidity: 60, summary: 'Scattered Breeze' },
  { day: 'Day 6', temp: 30, rainfall: 14, humidity: 72, summary: 'Light Showers' },
  { day: 'Day 7', temp: 28, rainfall: 18, humidity: 76, summary: 'Moderate Rain' },
];
