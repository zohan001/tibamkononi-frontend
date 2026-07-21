'use client';

import { useState } from 'react';
import { Camera, Mic, PenLine, Send, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { CameraCapture } from '@/components/emergency/camera-capture';
import { VoiceRecorder } from '@/components/emergency/voice-recorder';
import { EmergencyAnalysis } from '@/components/emergency/emergency-analysis';
import { HospitalSelector } from '@/components/emergency/hospital-selector';
import { GemmaBadge } from '@/components/shared/gemma-badge';
import { useGeolocation } from '@/hooks/use-geolocation';
import { AlertTriangle, Loader2 } from 'lucide-react';

const mockHospitals = [
  { hospitalSlug: 'coast-general', name: 'Coast General Hospital', distance: 3.2, eta: '7 min', bedsAvailable: 4, hasICU: true, hasAmbulance: true },
  { hospitalSlug: 'aga-khan', name: 'Aga Khan Hospital', distance: 4.8, eta: '12 min', bedsAvailable: 3, hasICU: true, hasAmbulance: true },
  { hospitalSlug: 'mama-ngina', name: 'Mama Ngina Hospital', distance: 2.1, eta: '5 min', bedsAvailable: 6, hasICU: false, hasAmbulance: true },
];

const mockAnalysis = {
  type: 'Road Traffic Accident',
  severity: 'severe' as const,
  description: 'Multiple vehicle collision with visible injuries',
  casualties: '2-3 visible casualties',
  hazards: 'Fuel leakage suspected',
  recommendedResponse: 'Activate trauma team, prepare blood bank',
};

export default function EmergencyPage() {
  const [inputType, setInputType] = useState<'camera' | 'voice' | 'text' | null>(null);
  const [textDescription, setTextDescription] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { latitude, longitude } = useGeolocation();

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResult(true);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Hero */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 rounded-full px-4 py-2 mb-4">
          <AlertTriangle className="h-4 w-4 text-red-500" />
          <span className="text-sm text-red-700">Emergency Mode</span>
        </div>
        <h1 className="text-3xl font-bold text-slate-900">Emergency — Get Help Now</h1>
        <p className="text-slate-600 mt-2">Gemma 4 will analyze and alert the nearest hospital</p>
        <div className="mt-2"><GemmaBadge /></div>
      </div>

      {!showResult ? (
        <>
          {/* Input Options */}
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            <Card
              className={`cursor-pointer hover:shadow-md transition-all ${inputType === 'camera' ? 'ring-2 ring-red-500' : ''}`}
              onClick={() => setInputType('camera')}
            >
              <CardContent className="p-6 text-center">
                <Camera className="h-10 w-10 mx-auto mb-3 text-slate-600" />
                <h3 className="font-semibold">Take Photo</h3>
                <p className="text-sm text-slate-500 mt-1">Capture the emergency scene</p>
              </CardContent>
            </Card>
            <Card
              className={`cursor-pointer hover:shadow-md transition-all ${inputType === 'voice' ? 'ring-2 ring-red-500' : ''}`}
              onClick={() => setInputType('voice')}
            >
              <CardContent className="p-6 text-center">
                <Mic className="h-10 w-10 mx-auto mb-3 text-slate-600" />
                <h3 className="font-semibold">Speak</h3>
                <p className="text-sm text-slate-500 mt-1">Record a voice description</p>
              </CardContent>
            </Card>
            <Card
              className={`cursor-pointer hover:shadow-md transition-all ${inputType === 'text' ? 'ring-2 ring-red-500' : ''}`}
              onClick={() => setInputType('text')}
            >
              <CardContent className="p-6 text-center">
                <PenLine className="h-10 w-10 mx-auto mb-3 text-slate-600" />
                <h3 className="font-semibold">Type</h3>
                <p className="text-sm text-slate-500 mt-1">Describe what happened</p>
              </CardContent>
            </Card>
          </div>

          {/* Input Area */}
          {inputType === 'camera' && (
            <Card className="mb-6">
              <CardContent className="p-6">
                <CameraCapture onCapture={(blob) => console.log('Photo captured', blob)} />
              </CardContent>
            </Card>
          )}
          {inputType === 'voice' && (
            <Card className="mb-6">
              <CardContent className="p-6">
                <VoiceRecorder onRecordingComplete={(blob) => console.log('Voice captured', blob)} />
              </CardContent>
            </Card>
          )}
          {inputType === 'text' && (
            <Card className="mb-6">
              <CardContent className="p-6">
                <Textarea
                  placeholder="Describe the emergency situation... (e.g. Road accident at Nyali Bridge, multiple vehicles involved, people trapped)"
                  value={textDescription}
                  onChange={(e) => setTextDescription(e.target.value)}
                  rows={4}
                />
              </CardContent>
            </Card>
          )}

          {/* Location */}
          {latitude && longitude && (
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
              <MapPin className="h-4 w-4" />
              <span>Location: {latitude.toFixed(4)}, {longitude.toFixed(4)}</span>
            </div>
          )}

          {/* Analyze Button */}
          {inputType && (
            <Button
              size="lg"
              className="w-full bg-red-600 hover:bg-red-700 text-white"
              onClick={handleAnalyze}
              disabled={isAnalyzing}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Analyzing Emergency...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-5 w-4" />
                  Analyze & Alert Hospitals
                </>
              )}
            </Button>
          )}
        </>
      ) : (
        <>
          {/* Results */}
          <EmergencyAnalysis analysis={mockAnalysis} />
          <div className="mt-6">
            <HospitalSelector hospitals={mockHospitals} onSelectionChange={(selected) => console.log('Selected:', selected)} />
          </div>
          <Button className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white" size="lg">
            <Send className="mr-2 h-4 w-4" />
            Send Emergency Alert
          </Button>
        </>
      )}
    </div>
  );
}
