'use client';

import { useState } from 'react';

import {
  AlertTriangle,
  MapPin,
  Camera,
  Mic,
  Send,
  Activity,
  ShieldAlert,
} from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { CameraCapture } from '@/components/emergency/camera-capture';
import { VoiceRecorder } from '@/components/emergency/voice-recorder';
import { EmergencyAnalysis } from '@/components/emergency/emergency-analysis';
import { HospitalSelector } from '@/components/emergency/hospital-selector';
import { RouteMap } from '@/components/emergency/route-map';
import { EmergencyRequestForm } from '@/components/emergency/emergency-request-form';
import { AmbulanceTracking } from '@/components/emergency/ambulance-tracking';
import { EmergencyTimeline } from '@/components/emergency/emergency-timeline';
import { useAnalyzeEmergency } from '@/hooks/use-emergency';
import type { EmergencyAnalysis as EmergencyAnalysisResult } from '@/types/emergency';

export default function EmergencyPage() {

  const [severity, setSeverity] = useState('Critical');
  const [analysisResult, setAnalysisResult] = useState<EmergencyAnalysisResult | null>(null);

  const analyzeMutation = useAnalyzeEmergency();

  const handleFormSubmit = (data: { location: string; type: string; severity: string; hasPhoto: boolean; hasVoice: boolean }) => {
    const [lat, lng] = data.location.split(',').map((s) => parseFloat(s.trim()));
    analyzeMutation.mutate(
      {
        input_type: data.hasPhoto ? 'camera' : data.hasVoice ? 'voice' : 'text',
        latitude: isNaN(lat) ? 0 : lat,
        longitude: isNaN(lng) ? 0 : lng,
        text: `${data.type}: ${data.severity}`,
      },
      {
        onSuccess: (result) => {
          setAnalysisResult(result);
          setSeverity(result.severity.charAt(0).toUpperCase() + result.severity.slice(1));
        },
      }
    );
  };

  const timelineEvents = analysisResult
    ? [
        {
          time: new Date().toLocaleTimeString(),
          type: 'report' as const,
          title: 'Emergency Report Submitted',
          description: `${analysisResult.type} reported. AI processing started immediately.`,
        },
        {
          time: new Date().toLocaleTimeString(),
          type: 'analysis' as const,
          title: 'AI Severity Analysis Complete',
          description: `${analysisResult.severity.charAt(0).toUpperCase() + analysisResult.severity.slice(1)} severity detected. ${analysisResult.description}`,
        },
        {
          time: new Date().toLocaleTimeString(),
          type: 'dispatch' as const,
          title: 'Recommended Response',
          description: analysisResult.recommendedResponse,
        },
      ]
    : [];

  return (

    <main className="min-h-screen bg-slate-100">

      {/* Hero */}

      <section className="bg-gradient-to-r from-red-700 via-red-600 to-orange-500 text-white">

        <div className="max-w-7xl mx-auto px-6 py-16">

          <div className="flex items-center gap-4">

            <div className="rounded-full bg-white/20 p-4">

              <ShieldAlert className="h-10 w-10"/>

            </div>

            <div>

              <h1 className="text-5xl font-bold">

                Emergency Response Center

              </h1>

              <p className="mt-3 text-red-100 text-lg">

                AI-powered emergency reporting, analysis and hospital dispatch.

              </p>

            </div>

          </div>

        </div>

      </section>

      <div className="max-w-7xl mx-auto p-6 space-y-8">

        {/* Emergency Request Form */}

        <EmergencyRequestForm onSubmit={handleFormSubmit} />

        {/* Emergency Status */}

        <Card>

          <CardContent className="p-8 flex flex-wrap items-center justify-between gap-6">

            <div>

              <p className="text-slate-500">

                Current Emergency Level

              </p>

              <h2 className="text-4xl font-bold text-red-600">

                {severity}

              </h2>

            </div>

            <div className="flex gap-4">

              <Button className="bg-red-600 hover:bg-red-700">

                <Send className="mr-2 h-4 w-4"/>

                Dispatch

              </Button>

            </div>

          </CardContent>

        </Card>

        {/* Upload Section */}

        <div className="grid lg:grid-cols-2 gap-8">

          <Card>

            <CardContent className="p-8">

              <div className="flex items-center gap-3 mb-6">

                <Camera className="text-blue-600"/>

                <h2 className="text-2xl font-bold">

                  Capture Emergency

                </h2>

              </div>

              <CameraCapture/>

            </CardContent>

          </Card>

          <Card>

            <CardContent className="p-8">

              <div className="flex items-center gap-3 mb-6">

                <Mic className="text-green-600"/>

                <h2 className="text-2xl font-bold">

                  Voice Description

                </h2>

              </div>

              <VoiceRecorder/>

            </CardContent>

          </Card>

        </div>

                {/* AI Analysis + Hospital Recommendation */}

        <div className="grid lg:grid-cols-2 gap-8">

          <Card>

            <CardContent className="p-8">

              <div className="flex items-center gap-3 mb-6">

                <Activity className="text-blue-600"/>

                <h2 className="text-2xl font-bold">

                  Gemma AI Analysis

                </h2>

              </div>

              <EmergencyAnalysis/>

            </CardContent>

          </Card>

          <Card>

            <CardContent className="p-8">

              <div className="flex items-center gap-3 mb-6">

                <AlertTriangle className="text-orange-600"/>

                <h2 className="text-2xl font-bold">

                  Recommended Hospital

                </h2>

              </div>

              <HospitalSelector/>

            </CardContent>

          </Card>

        </div>

        {/* Ambulance Tracking */}

        <Card>

          <CardContent className="p-8">

            <div className="flex items-center gap-3 mb-6">

              <MapPin className="text-red-600"/>

              <h2 className="text-2xl font-bold">

                Ambulance Tracking

              </h2>

            </div>

            <AmbulanceTracking ambulances={[]} />

          </CardContent>

        </Card>

        {/* Live Route Map */}

        <Card>

          <CardContent className="p-8">

            <div className="flex items-center gap-3 mb-6">

              <MapPin className="text-red-600"/>

              <h2 className="text-2xl font-bold">

                Live Ambulance Route

              </h2>

            </div>

            <RouteMap/>

          </CardContent>

        </Card>

        {/* Emergency Timeline */}

        <Card>

          <CardContent className="p-8">

            <h2 className="text-2xl font-bold mb-6">

              Emergency Timeline

            </h2>

            <EmergencyTimeline events={timelineEvents} />

          </CardContent>

        </Card>

              </div>

    </main>

  );

}
