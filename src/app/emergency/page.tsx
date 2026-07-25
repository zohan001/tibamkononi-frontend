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

export default function EmergencyPage() {

  const [severity] = useState('Critical');

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

            <div className="space-y-6">

              <div className="flex items-center gap-4">

                <div className="h-4 w-4 rounded-full bg-red-600"/>

                <div>

                  <p className="font-semibold">

                    Emergency Report Submitted

                  </p>

                  <p className="text-sm text-slate-500">

                    AI processing started immediately.

                  </p>

                </div>

              </div>

              <div className="flex items-center gap-4">

                <div className="h-4 w-4 rounded-full bg-blue-600"/>

                <div>

                  <p className="font-semibold">

                    AI Severity Analysis Complete

                  </p>

                  <p className="text-sm text-slate-500">

                    Critical trauma detected.

                  </p>

                </div>

              </div>

              <div className="flex items-center gap-4">

                <div className="h-4 w-4 rounded-full bg-green-600"/>

                <div>

                  <p className="font-semibold">

                    Hospital Selected

                  </p>

                  <p className="text-sm text-slate-500">

                    Nearest suitable hospital identified.

                  </p>

                </div>

              </div>

              <div className="flex items-center gap-4">

                <div className="h-4 w-4 rounded-full bg-orange-500"/>

                <div>

                  <p className="font-semibold">

                    Ambulance Dispatched

                  </p>

                  <p className="text-sm text-slate-500">

                    Estimated arrival: 8 minutes.

                  </p>

                </div>

              </div>

            </div>

          </CardContent>

        </Card>

              </div>

    </main>

  );

}