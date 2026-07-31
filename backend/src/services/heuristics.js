export const DISEASE_KB = [
  {
    name: 'Malaria',
    keywords: ['fever', 'chills', 'sweating', 'headache', 'vomiting', 'nausea', 'fatigue', 'body aches', 'malaria'],
    tests: ['MRDT (Malaria Rapid Test)', 'Blood smear microscopy', 'Full blood count'],
    treatments: [
      { medicine: 'Artemether/Lumefantrine (ACT)', dosage: '4 tablets', frequency: '2x daily for 3 days' },
      { medicine: 'Paracetamol', dosage: '500-1000mg', frequency: '2x daily as needed for fever' },
    ],
  },
  {
    name: 'Typhoid',
    keywords: ['typhoid', 'abdominal pain', 'stomach ache', 'high fever', 'diarrhea', 'constipation', 'weakness', 'rose spots'],
    tests: ['Widal test', 'Blood culture', 'Stool culture'],
    treatments: [
      { medicine: 'Ciprofloxacin', dosage: '500mg', frequency: '2x daily for 7 days' },
      { medicine: 'ORS (Oral Rehydration Salts)', dosage: '1 sachet per litre', frequency: 'As needed for hydration' },
    ],
  },
  {
    name: 'Pneumonia',
    keywords: ['pneumonia', 'cough', 'chest pain', 'shortness of breath', 'difficulty breathing', 'sputum', 'fever', 'rapid breathing'],
    tests: ['Chest X-Ray', 'Sputum culture', 'Pulse oximetry'],
    treatments: [
      { medicine: 'Amoxicillin', dosage: '500mg', frequency: '3x daily for 7 days' },
      { medicine: 'Paracetamol', dosage: '500-1000mg', frequency: '2x daily for fever' },
    ],
  },
  {
    name: 'Cholera',
    keywords: ['cholera', 'watery diarrhea', 'rice-water stools', 'dehydration', 'vomiting', 'leg cramps'],
    tests: ['Stool culture', 'Rapid cholera dipstick test'],
    treatments: [
      { medicine: 'ORS (Oral Rehydration Salts)', dosage: '1 sachet per litre', frequency: 'Continuously as needed' },
      { medicine: 'Zinc sulphate', dosage: '20mg', frequency: '1x daily for 10 days' },
    ],
  },
  {
    name: 'Dengue Fever',
    keywords: ['dengue', 'high fever', 'rash', 'pain behind eyes', 'joint pain', 'muscle pain', 'bleeding gums', 'nosebleed'],
    tests: ['NS1 antigen test', 'Dengue IgM/IgG', 'Full blood count'],
    treatments: [
      { medicine: 'Paracetamol', dosage: '500-1000mg', frequency: '2x daily for fever (avoid ibuprofen)' },
      { medicine: 'ORS (Oral Rehydration Salts)', dosage: '1 sachet per litre', frequency: 'As needed for hydration' },
    ],
  },
  {
    name: 'Influenza (Flu)',
    keywords: ['flu', 'influenza', 'runny nose', 'sore throat', 'cough', 'body aches', 'sneezing', 'cold'],
    tests: ['Rapid influenza test', 'RT-PCR (if severe)'],
    treatments: [
      { medicine: 'Paracetamol', dosage: '500-1000mg', frequency: '2x daily for fever' },
      { medicine: 'Zinc lozenges', dosage: '10mg', frequency: '2x daily' },
    ],
  },
  {
    name: 'Gastroenteritis',
    keywords: ['diarrhea', 'stomach cramps', 'nausea', 'vomiting', 'food poisoning', 'watery stool'],
    tests: ['Stool analysis', 'FBC (dehydration markers)'],
    treatments: [
      { medicine: 'ORS (Oral Rehydration Salts)', dosage: '1 sachet per litre', frequency: 'As needed' },
      { medicine: 'Zinc sulphate', dosage: '20mg', frequency: '1x daily for 10 days' },
    ],
  },
  {
    name: 'Urinary Tract Infection',
    keywords: ['urinary', 'uti', 'burning urination', 'frequent urination', 'painful urination', 'lower abdominal pain', 'blood in urine'],
    tests: ['Urinalysis', 'Urine culture'],
    treatments: [
      { medicine: 'Nitrofurantoin', dosage: '100mg', frequency: '2x daily for 5 days' },
      { medicine: 'Paracetamol', dosage: '500mg', frequency: '2x daily for pain' },
    ],
  },
  {
    name: 'Measles',
    keywords: ['measles', 'rash', 'fever', 'cough', 'runny nose', 'red eyes', 'koplik spots'],
    tests: ['Measles IgM serology'],
    treatments: [
      { medicine: 'Paracetamol', dosage: '500-1000mg', frequency: '2x daily for fever' },
      { medicine: 'Vitamin A', dosage: '200,000 IU', frequency: 'Single dose' },
    ],
  },
  {
    name: 'Meningitis',
    keywords: ['meningitis', 'stiff neck', 'severe headache', 'light sensitivity', 'confusion', 'high fever', 'convulsions'],
    tests: ['Lumbar puncture (CSF analysis)', 'Blood culture'],
    treatments: [
      { medicine: 'Ceftriaxone', dosage: '2g IV', frequency: '2x daily (in-hospital)' },
      { medicine: 'Paracetamol', dosage: '1g', frequency: '2x daily for fever' },
    ],
  },
  {
    name: 'Malaria (Severe)',
    keywords: ['convulsions', 'unconscious', 'dark urine', 'severe anemia', 'difficulty breathing', 'confusion'],
    tests: ['MRDT', 'Blood smear', 'FBC', 'Blood glucose'],
    treatments: [
      { medicine: 'IV Artesunate', dosage: '2.4mg/kg', frequency: 'At 0, 12 and 24 hours (in-hospital)' },
      { medicine: 'IV Quinine', dosage: '20mg/kg loading', frequency: 'Per hospital protocol' },
    ],
  },
];

export const SELF_CARE_ADVICE = [
  'Take paracetamol for fever or pain as directed.',
  'Drink plenty of clean water or ORS to stay hydrated.',
  'Rest and avoid strenuous activity.',
  'Eat light, nutritious meals.',
  'If symptoms worsen or persist beyond 48 hours, seek medical attention.',
];

export function keywordMatch(text, keywords) {
  const lower = String(text || '').toLowerCase();
  return keywords.filter((k) => lower.includes(k)).length;
}

export function computeScores(text) {
  const scored = DISEASE_KB.map((d) => ({ ...d, score: keywordMatch(text, d.keywords) }))
    .filter((d) => d.score > 0)
    .sort((a, b) => b.score - a.score);

  if (scored.length === 0) {
    return [
      {
        name: 'Common Cold / Viral Infection',
        keywords: ['cold', 'cough', 'runny nose', 'fever'],
        tests: ['Clinical examination'],
        treatments: [
          { medicine: 'Paracetamol', dosage: '500-1000mg', frequency: '2x daily as needed' },
          { medicine: 'Vitamin C', dosage: '500mg', frequency: '1x daily' },
        ],
      },
    ];
  }

  return scored;
}

const URGENT_KEYWORDS = [
  'unconscious', 'difficulty breathing', 'shortness of breath', 'severe bleeding',
  'chest pain', 'convulsions', 'seizure', 'blood in stool', 'bloody vomit',
  'not responding', 'choking', 'suicidal', 'stroke', 'paralysis',
];

const SEMI_URGENT_KEYWORDS = [
  'high fever', 'vomiting', 'dehydration', 'rash', 'severe headache', 'severe pain',
  'stiff neck', 'light sensitivity', 'dark urine', 'blood in urine',
];

export function determineTriageLevel(symptoms) {
  const lower = String(symptoms || '').toLowerCase();
  if (URGENT_KEYWORDS.some((k) => lower.includes(k))) return 'emergency';
  if (SEMI_URGENT_KEYWORDS.some((k) => lower.includes(k))) return 'urgent';
  const score = keywordMatch(lower, ['fever', 'cough', 'headache', 'diarrhea', 'cold', 'sore throat', 'rash']);
  if (score >= 3) return 'semi-urgent';
  return 'non-urgent';
}

export function determineEmergency(text) {
  const lower = String(text || '').toLowerCase();

  if (/accident|crash|collision|hit by|knockdown|vehicle/.test(lower)) {
    return {
      type: 'Road Traffic Accident',
      description: 'Road traffic accident reported. Expect trauma casualties and possible obstruction of the roadway.',
      keywords: ['accident', 'crash', 'collision', 'vehicle'],
    };
  }
  if (/fire|burn|flames|smoke|explosion/.test(lower)) {
    return {
      type: 'Fire',
      description: 'Fire incident reported. Risk of burn injuries and smoke inhalation.',
      keywords: ['fire', 'burn', 'flames', 'smoke', 'explosion'],
    };
  }
  if (/drown|water|swim|flood/.test(lower)) {
    return {
      type: 'Drowning',
      description: 'Drowning incident reported. Victim may require resuscitation and oxygen support.',
      keywords: ['drown', 'water', 'swim', 'flood'],
    };
  }
  if (/collapse|building|fallen structure|debris/.test(lower)) {
    return {
      type: 'Building Collapse',
      description: 'Building collapse reported. Expect crush injuries and possibly multiple casualties.',
      keywords: ['collapse', 'building', 'debris'],
    };
  }
  if (/assault|stab|shooting|fight|attack/.test(lower)) {
    return {
      type: 'Assault',
      description: 'Assault reported. Expect traumatic injuries requiring urgent care.',
      keywords: ['assault', 'stab', 'shooting', 'fight', 'attack'],
    };
  }
  if (/poison|toxic|chemical|overdose/.test(lower)) {
    return {
      type: 'Poisoning',
      description: 'Poisoning reported. Decontamination and antidote therapy may be required.',
      keywords: ['poison', 'toxic', 'chemical', 'overdose'],
    };
  }
  if (/fall|fell|tripped|slipped/.test(lower)) {
    return {
      type: 'Fall',
      description: 'Fall reported. Risk of fractures, head injury and soft tissue damage.',
      keywords: ['fall', 'fell', 'tripped', 'slipped'],
    };
  }
  return {
    type: 'Other',
    description: 'Emergency situation reported. On-site assessment required to determine response.',
    keywords: [],
  };
}

export function determineSeverity(text) {
  const lower = String(text || '').toLowerCase();
  if (/critical|unconscious|not breathing|severe bleeding|cardiac|arrest|dead/.test(lower)) return 'critical';
  if (/severe|bleeding heavily|multiple|cannot move|fracture|broken|hypothermic/.test(lower)) return 'severe';
  if (/moderate|pain|bleeding|conscious|injury/.test(lower)) return 'moderate';
  return 'minor';
}

export function estimateCasualties(text) {
  const match = String(text || '').match(/(\d+)\s*(people|persons|casualties|victims|injured|adults|children)?/i);
  if (match) {
    const n = parseInt(match[1], 10);
    if (n > 0 && n <= 50) return n;
  }
  return 1;
}

export function detectHazards(text) {
  const lower = String(text || '').toLowerCase();
  const hazards = [];
  if (/fire|flames|smoke/.test(lower)) hazards.push('Fire / smoke hazard');
  if (/fuel|petrol|gas|leak|spill/.test(lower)) hazards.push('Fuel or chemical leak suspected');
  if (/electric|power|wire/.test(lower)) hazards.push('Electrical hazard');
  if (/building|collapse|debris|unstable/.test(lower)) hazards.push('Structural instability');
  if (/flood|water|deep/.test(lower)) hazards.push('Flooding / drowning risk');
  if (hazards.length === 0) hazards.push('No immediate hazards reported');
  return hazards;
}
