import { CropType, FieldData, ComputedMetrics } from '../types/farm';

export const clamp = (val: number, min = 0, max = 100): number => {
  return Math.min(max, Math.max(min, Math.round(val)));
};

/**
 * Calculates Water Stress (0 - 100)
 * Baseline Field A (rain 12, temp 29, moisture 62) = 34
 * When rain drops from 12 to 5 -> stress climbs to 67
 */
export function calculateWaterStress(
  crop: CropType,
  rainfall: number,
  temperature: number,
  soilMoisture: number
): number {
  const rainDelta = (12 - rainfall);
  const tempDelta = (temperature - 29);
  const moistureDelta = (62 - soilMoisture);

  // If rain drops from 12 to 5 (delta = 7), rainDelta * 4.714 = 33 -> 34 + 33 = 67
  let stress = 34 + (rainDelta * 4.714) + (tempDelta * 1.5) + (moistureDelta * 0.8);

  if (crop === 'Rice') {
    stress += (78 - soilMoisture) * 0.6 - (rainfall - 24) * 0.8;
  } else if (crop === 'Maize') {
    stress += (54 - soilMoisture) * 0.7 - (rainfall - 8) * 1.2;
  }

  return clamp(stress, 0, 100);
}

/**
 * Calculates Crop Health (0 - 100)
 * Baseline Field A = 82
 * When rain drops to 5 -> crop health = 71
 */
export function calculateCropHealth(
  crop: CropType,
  rainfall: number,
  temperature: number,
  soilMoisture: number,
  humidity: number
): number {
  const waterStress = calculateWaterStress(crop, rainfall, temperature, soilMoisture);

  // Health drops as water stress rises: (67 - 34) = 33 -> health drops by 11 (82 -> 71)
  const stressDrop = (waterStress - 34) * (11 / 33);
  
  const heatPenalty = Math.max(0, temperature - 32) * 1.5;
  const humidityPenalty = Math.max(0, humidity - 80) * 0.5;

  let health = 82 - stressDrop - heatPenalty - humidityPenalty;

  if (crop === 'Rice') {
    health = 86 - (waterStress - 28) * 0.35 - heatPenalty;
  } else if (crop === 'Maize') {
    health = 79 - (waterStress - 38) * 0.32 - heatPenalty;
  }

  return clamp(health, 5, 100);
}

/**
 * Calculates Disease Risk (0 - 100)
 * Baseline Field A = 41 (Low)
 */
export function calculateDiseaseRisk(
  crop: CropType,
  rainfall: number,
  temperature: number,
  humidity: number
): number {
  let risk = 41;

  risk += (rainfall - 12) * 0.6;
  risk += (humidity - 68) * 0.7;
  if (temperature > 30) risk += (temperature - 30) * 1.2;

  if (crop === 'Rice') risk += 5;

  return clamp(risk, 5, 95);
}

/**
 * Calculates Weather Risk (0 - 100)
 * Baseline Field A = 38 (Moderate)
 */
export function calculateWeatherRisk(
  rainfall: number,
  temperature: number,
  humidity: number
): number {
  let risk = 38;

  if (rainfall < 10) risk += (10 - rainfall) * 2.2;
  if (temperature > 30) risk += (temperature - 30) * 2.0;
  if (humidity > 75) risk += (humidity - 75) * 0.8;

  return clamp(risk, 5, 95);
}

/**
 * Calculates Farm Risk (0 - 100)
 * Baseline Field A = 36 (Low)
 */
export function calculateFarmRisk(
  cropHealth: number,
  waterStress: number,
  diseaseRisk: number,
  weatherRisk: number
): number {
  const composite = (100 - cropHealth) * 0.45 + waterStress * 0.3 + diseaseRisk * 0.15 + weatherRisk * 0.10;
  const scaled = composite * (36 / 28.25);
  return clamp(scaled, 5, 95);
}

/**
 * Calculates Expected Yield (t/ha)
 * Baseline Field A = 4.2 t/ha
 * When rain drops to 5 -> 3.7 t/ha
 */
export function calculateYield(
  baseYield: number,
  cropHealth: number,
  waterStress: number,
  diseaseRisk: number
): number {
  const healthDelta = (cropHealth - 82);
  const stressDelta = (waterStress - 34);

  let yieldVal = baseYield + (healthDelta * 0.03) - (stressDelta * 0.0051);
  return Math.max(0.5, Math.round(yieldVal * 10) / 10);
}

export function computeFieldMetrics(
  field: FieldData,
  simRain?: number,
  simTemp?: number,
  simMoisture?: number
): ComputedMetrics {
  const rain = simRain !== undefined ? simRain : field.rainfall;
  const temp = simTemp !== undefined ? simTemp : field.temperature;
  const moisture = simMoisture !== undefined ? simMoisture : field.soilMoisture;
  const humidity = field.humidity;

  const waterStress = calculateWaterStress(field.crop, rain, temp, moisture);
  const cropHealth = calculateCropHealth(field.crop, rain, temp, moisture, humidity);
  const diseaseRisk = calculateDiseaseRisk(field.crop, rain, temp, humidity);
  const weatherRisk = calculateWeatherRisk(rain, temp, humidity);
  const farmRisk = calculateFarmRisk(cropHealth, waterStress, diseaseRisk, weatherRisk);
  const expectedYield = calculateYield(field.baseYield, cropHealth, waterStress, diseaseRisk);

  const yieldDeltaPercent = Math.round(((expectedYield - field.baseYield) / field.baseYield) * 100);

  const cropHealthStatus =
    cropHealth >= 80 ? 'Healthy' :
    cropHealth >= 70 ? 'Good' :
    cropHealth >= 55 ? 'Moderate' :
    cropHealth >= 40 ? 'Stressed' : 'Critical';

  const waterStressStatus =
    waterStress <= 25 ? 'Optimal' :
    waterStress <= 40 ? 'Moderate' :
    waterStress <= 60 ? 'High' : 'Severe';

  const diseaseRiskStatus =
    diseaseRisk <= 45 ? 'Low' :
    diseaseRisk <= 70 ? 'Moderate' : 'High';

  const weatherRiskStatus =
    weatherRisk <= 40 ? 'Moderate' :
    weatherRisk <= 65 ? 'Moderate' : 'High';

  const farmRiskStatus =
    farmRisk <= 40 ? 'Low' :
    farmRisk <= 65 ? 'Moderate' : 'High';

  return {
    cropHealth,
    cropHealthStatus,
    waterStress,
    waterStressStatus,
    diseaseRisk,
    diseaseRiskStatus,
    weatherRisk,
    weatherRiskStatus,
    farmRisk,
    farmRiskStatus,
    expectedYield,
    yieldDeltaPercent,
  };
}

export function generateInsight(
  field: FieldData,
  metrics: ComputedMetrics,
  isSimulated = false,
  simRain?: number,
  simTemp?: number,
  simMoisture?: number
): string {
  if (isSimulated && (simRain !== undefined || simTemp !== undefined || simMoisture !== undefined)) {
    const rain = simRain ?? field.rainfall;
    const temp = simTemp ?? field.temperature;
    const moisture = simMoisture ?? field.soilMoisture;

    if (rain < field.rainfall && metrics.waterStress > 50) {
      return `Simulated drought stress: Rainfall reduced to ${rain} mm causes water stress to surge to ${metrics.waterStress}/100, depressing crop vigor and reducing expected yield from ${field.baseYield} to ${metrics.expectedYield} t/ha (${metrics.yieldDeltaPercent}%). Immediate supplemental drip irrigation is recommended.`;
    }
    if (temp >= 35) {
      return `Simulated heatwave: High temperatures of ${temp}°C trigger accelerated evapotranspiration. Crop health drops to ${metrics.cropHealth}/100 with expected yield at ${metrics.expectedYield} t/ha. Apply mulching and evening irrigation to cool root zones.`;
    }
    if (rain >= 40) {
      return `Simulated heavy monsoon: Rainfall of ${rain} mm saturates topsoil, reducing water stress to ${metrics.waterStress}/100 but elevating disease risk to ${metrics.diseaseRisk}/100. Inspect for fungal leaf blight and ensure drainage channels are open.`;
    }
    return `Simulated scenario: With ${rain} mm rainfall, ${temp}°C temperature, and ${moisture}% soil moisture, ${field.name} (${field.crop}) exhibits crop health of ${metrics.cropHealth}/100 and expected yield of ${metrics.expectedYield} t/ha.`;
  }

  if (field.id === 'field-a') {
    return `Field A is currently in relatively healthy condition. Soil moisture is adequate (${field.soilMoisture}%), but rainfall is expected to remain limited over the next few days. Monitor soil moisture and irrigation requirements.`;
  } else if (field.id === 'field-b') {
    return `Field B (Rice) exhibits vigorous canopy development with ${field.soilMoisture}% moisture. High relative humidity (82%) indicates low water stress, but watch for sheath blight symptoms.`;
  } else {
    return `Field C (Maize) maintains steady vegetative progress. Current soil moisture (${field.soilMoisture}%) is sufficient for the next 48 hours; anticipate light irrigation if temperature exceeds 32°C.`;
  }
}