import env from '../config/env.js';
import {
  computeScores,
  determineTriageLevel,
  determineEmergency,
  determineSeverity,
  estimateCasualties,
  detectHazards,
  SELF_CARE_ADVICE,
} from './heuristics.js';

let genAI = null;
if (env.geminiApiKey) {
  try {
    const { GoogleGenerativeAI } = await import('@google/generative-ai');
    genAI = new GoogleGenerativeAI(env.geminiApiKey);
  } catch (err) {
    console.warn('[ai] Gemini SDK failed to initialise, using built-in engine:', err.message);
  }
}

const hasGemini = () => !!genAI;

async function askGemini(systemPrompt, userText, fallback) {
  if (!genAI) return fallback;
  try {
    const model = genAI.getGenerativeModel({
      model: env.geminiModel,
      generationConfig: { temperature: 0.3, responseMimeType: 'application/json' },
    });
    const prompt = `${systemPrompt}\n\nReturn ONLY valid JSON, no markdown, no commentary.\n\nInput:\n${userText}`;
    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();
    const json = JSON.parse(text.replace(/^```json\s*/i, '').replace(/```$/i, '').trim());
    return json;
  } catch (err) {
    console.warn('[ai] Gemini call failed, using built-in engine:', err.message);
    return fallback;
  }
}

function distributeScores(scored, cap = 5) {
  const top = scored.slice(0, cap);
  const total = top.reduce((sum, d) => sum + d.score, 0) || 1;
  let remaining = 100;
  return top.map((d, idx) => {
    const isLast = idx === top.length - 1;
    const pct = isLast ? remaining : Math.max(5, Math.round((d.score / total) * 100));
    remaining -= pct;
    return { name: d.name, probability: pct };
  });
}

export async function analyzeTriage({ symptoms, age, gender }) {
  const scored = computeScores(symptoms);
  const level = determineTriageLevel(symptoms);

  const fallback = {
    level,
    diseases: distributeScores(scored).map((d) => ({ name: d.name, probability: d.probability / 100 })),
    hospitalRecommendations: [],
    selfCareAdvice: SELF_CARE_ADVICE.slice(0, 4),
    emergencyWarning:
      level === 'emergency'
        ? 'Seek emergency care immediately. Call 911 or go to the nearest hospital emergency department.'
        : 'Seek immediate emergency care if you develop difficulty breathing, severe bleeding, confusion, or loss of consciousness.',
    gemmaRecommendation: scored[0]
      ? `Based on your symptoms, the most likely condition is ${scored[0].name}. ${level === 'emergency' ? 'This requires urgent medical attention.' : 'Please see a clinician for confirmation and treatment.'}`
      : 'Please consult a healthcare professional for a full assessment.',
  };

  if (!hasGemini()) return fallback;

  const system = `You are Tibamkononi's AI triage assistant. Triage a patient with these details.
Respond with JSON exactly in this shape:
{ "level": "emergency|urgent|semi-urgent|non-urgent|self-care", "diseases": [{"name": string, "probability": number 0-100}], "selfCareAdvice": [string], "emergencyWarning": string, "gemmaRecommendation": string }`;

  const parsed = await askGemini(system, JSON.stringify({ symptoms, age, gender }), null);
  if (!parsed || !parsed.level) return fallback;

  return {
    level: parsed.level,
    diseases:
      Array.isArray(parsed.diseases) && parsed.diseases.length
        ? parsed.diseases.map((d) => ({ name: d.name, probability: d.probability / 100 }))
        : fallback.diseases,
    hospitalRecommendations: [],
    selfCareAdvice: Array.isArray(parsed.selfCareAdvice) ? parsed.selfCareAdvice : fallback.selfCareAdvice,
    emergencyWarning: parsed.emergencyWarning || fallback.emergencyWarning,
    gemmaRecommendation: parsed.gemmaRecommendation || fallback.gemmaRecommendation,
  };
}

export async function analyzeDiagnosis({ symptoms, age, gender }) {
  const scored = computeScores(symptoms);
  const top = scored[0];

  const fallback = {
    diseases: distributeScores(scored),
    recommendedTests: top ? top.tests.slice(0, 3) : ['Clinical examination'],
    recommendedTreatment: top ? top.treatments.slice(0, 3) : [],
    clinicalSummary: top
      ? `Suspected ${top.name}. Clinical assessment and confirmatory testing recommended.`
      : 'Symptoms non-specific; clinical assessment recommended.',
  };

  if (!hasGemini()) return fallback;

  const system = `You are Tibamkononi's clinical decision support system. Analyze these symptoms.
Respond with JSON exactly in this shape:
{ "diseases": [{"name": string, "probability": number 0-100}], "recommendedTests": [string], "recommendedTreatment": [{"medicine": string, "dosage": string, "frequency": string}], "clinicalSummary": string }`;

  const parsed = await askGemini(system, JSON.stringify({ symptoms, age, gender }), null);
  if (!parsed) return fallback;

  return {
    diseases: Array.isArray(parsed.diseases) && parsed.diseases.length ? parsed.diseases : fallback.diseases,
    recommendedTests: Array.isArray(parsed.recommendedTests) ? parsed.recommendedTests : fallback.recommendedTests,
    recommendedTreatment: Array.isArray(parsed.recommendedTreatment)
      ? parsed.recommendedTreatment
      : fallback.recommendedTreatment,
    clinicalSummary: parsed.clinicalSummary || fallback.clinicalSummary,
  };
}

export async function analyzeEmergency({ inputType, text, location }) {
  const typeInfo = determineEmergency(text);
  const severity = determineSeverity(text);
  const casualties = estimateCasualties(text);
  const hazards = detectHazards(text);

  const fallback = {
    type: typeInfo.type,
    severity,
    description: typeInfo.description,
    casualties,
    hazards,
    recommendedResponse:
      severity === 'critical'
        ? 'Dispatch ambulance immediately with critical care team. Notify nearest trauma centre.'
        : severity === 'severe'
          ? 'Dispatch ambulance urgently. Notify nearest hospital emergency department.'
          : 'Advise the reporter to keep the scene safe. Dispatch nearest available ambulance.',
  };

  if (!hasGemini()) return fallback;

  const system = `You are Tibamkononi's emergency response analyzer. Analyze this emergency report.
Respond with JSON exactly in this shape:
{ "type": string, "severity": "minor|moderate|severe|critical", "description": string, "casualties": number, "hazards": [string], "recommendedResponse": string }`;

  const parsed = await askGemini(
    system,
    JSON.stringify({ input_type: inputType, text, location }),
    null
  );
  if (!parsed) return fallback;

  return {
    type: parsed.type || fallback.type,
    severity: parsed.severity || fallback.severity,
    description: parsed.description || fallback.description,
    casualties: typeof parsed.casualties === 'number' ? parsed.casualties : fallback.casualties,
    hazards: Array.isArray(parsed.hazards) ? parsed.hazards : fallback.hazards,
    recommendedResponse: parsed.recommendedResponse || fallback.recommendedResponse,
  };
}

export async function recommendTreatment({ diagnosis, inventory }) {
  const top = diagnosis.diseases?.[0]?.name;
  const stockMap = new Map((inventory || []).map((i) => [i.name.toLowerCase(), i]));

  const fallback = (diagnosis.recommendedTreatment || []).map((t) => {
    const item = stockMap.get(String(t.medicine || '').toLowerCase());
    return {
      medicine: t.medicine,
      dosage: t.dosage || '',
      frequency: t.frequency || '',
      stockAvailable: item ? item.currentStock : 0,
      reason: `Recommended for ${top || 'the suspected condition'}`,
    };
  });

  if (!hasGemini()) return fallback;

  const system = `You are Tibamkononi's medication support assistant. Recommend treatment given a diagnosis and available stock.
Respond with JSON exactly in this shape:
[{ "medicine": string, "dosage": string, "frequency": string, "reason": string }]`;

  const parsed = await askGemini(system, JSON.stringify({ diagnosis, inventory }), null);
  if (Array.isArray(parsed) && parsed.length) {
    return parsed.map((t) => ({
      medicine: t.medicine,
      dosage: t.dosage || '',
      frequency: t.frequency || '',
      stockAvailable: stockMap.get(String(t.medicine || '').toLowerCase())?.currentStock ?? 0,
      reason: t.reason || '',
    }));
  }
  return fallback;
}

export async function clinicalSummary({ patient, diagnosis, recentVisits }) {
  const fallback = {
    summary: diagnosis?.clinicalSummary || 'No clinical summary available yet.',
    followUp: 'Return for review within 48 hours if symptoms persist.',
  };

  if (!hasGemini()) return fallback;

  const system = `You are Tibamkononi's clinical documentation assistant. Produce a concise clinical summary.
Respond with JSON exactly in this shape:
{ "summary": string, "followUp": string }`;

  const parsed = await askGemini(
    system,
    JSON.stringify({ patient, diagnosis, recentVisits }),
    null
  );
  if (!parsed) return fallback;
  return {
    summary: parsed.summary || fallback.summary,
    followUp: parsed.followUp || fallback.followUp,
  };
}

export async function operationalSummary({ hospital, inventory, staff, patients }) {
  const lowStock = (inventory || []).filter((i) => i.computeStatus?.() === 'warning' || i.currentStock <= i.minimumStock);
  const critical = (inventory || []).filter((i) => i.computeStatus?.() === 'critical' || i.currentStock <= 0);
  const bedsTotal = (hospital?.buildings || []).reduce(
    (sum, b) => sum + (b.wards || []).reduce((s, w) => s + (w.bedCount || 0), 0),
    0
  );
  const bedsOccupied = (hospital?.buildings || []).reduce(
    (sum, b) => sum + (b.wards || []).reduce((s, w) => s + (w.bedsOccupied || 0), 0),
    0
  );

  const fallback = {
    summary: `Hospital ${hospital?.name || ''} is operating. ${patients?.length || 0} patients on record, ${bedsTotal - bedsOccupied} beds available out of ${bedsTotal}. ${lowStock.length} stock lines are below minimum and ${critical.length} are critical. ${staff?.length || 0} staff members on record.`,
    criticalAlerts: critical.map((i) => `${i.name} is critical (${i.currentStock} units remaining)`),
  };

  if (!hasGemini()) return fallback;

  const system = `You are Tibamkononi's operations assistant. Produce a daily operational summary for a hospital.
Respond with JSON exactly in this shape:
{ "summary": string, "criticalAlerts": [string] }`;

  const parsed = await askGemini(
    system,
    JSON.stringify({
      hospitalName: hospital?.name,
      patientsCount: patients?.length,
      bedsAvailable: bedsTotal - bedsOccupied,
      bedsTotal,
      lowStockCount: lowStock.length,
      criticalCount: critical.length,
      staffCount: staff?.length,
    }),
    null
  );
  if (!parsed) return fallback;
  return {
    summary: parsed.summary || fallback.summary,
    criticalAlerts: Array.isArray(parsed.criticalAlerts) ? parsed.criticalAlerts : fallback.criticalAlerts,
  };
}

export default {
  hasGemini,
  analyzeTriage,
  analyzeDiagnosis,
  analyzeEmergency,
  recommendTreatment,
  clinicalSummary,
  operationalSummary,
};
