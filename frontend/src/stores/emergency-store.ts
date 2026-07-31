import { create } from 'zustand';
import type { EmergencyAnalysis } from '@/types/emergency';

type EmergencyStep = 'input' | 'analyzing' | 'result' | 'sent';
type InputType = 'camera' | 'voice' | 'text';

interface EmergencyState {
  step: EmergencyStep;
  inputType: InputType | null;
  analysisResult: EmergencyAnalysis | null;
  latitude: number | null;
  longitude: number | null;
  setStep: (step: EmergencyStep) => void;
  setInputType: (type: InputType) => void;
  setAnalysisResult: (result: EmergencyAnalysis) => void;
  setLocation: (lat: number, lng: number) => void;
  reset: () => void;
}

const initialState = {
  step: 'input' as EmergencyStep,
  inputType: null,
  analysisResult: null,
  latitude: null,
  longitude: null,
};

export const useEmergencyStore = create<EmergencyState>((set) => ({
  ...initialState,
  setStep: (step) => set({ step }),
  setInputType: (inputType) => set({ inputType }),
  setAnalysisResult: (analysisResult) => set({ analysisResult, step: 'result' }),
  setLocation: (latitude, longitude) => set({ latitude, longitude }),
  reset: () => set(initialState),
}));
