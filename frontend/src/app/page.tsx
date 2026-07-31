'use client';

import Link from 'next/link';

import {
  ArrowRight,
  Ambulance,
  Brain,
  Building2,
  Calendar,
  Sparkles,
  Stethoscope,
} from 'lucide-react';

import { Button } from '@/components/ui/button';

import { Card, CardContent } from '@/components/ui/card';

import { Badge } from '@/components/ui/badge';

import { GemmaBadge } from '@/components/shared/gemma-badge';

import { useCountyDashboard } from '@/hooks/use-county';

import { HospitalLoginPicker } from '@/components/hospital/hospital-login-picker';

const features = [
  {
    icon: Building2,
    title: 'Hospital Management',
    description: 'Manage patients, inventory, beds, staff and appointments all in one place',
    href: '/register',
  },
  {
    icon: Ambulance,
    title: 'Emergency Response',
    description: 'AI-powered emergency detection with automatic hospital alerts and routing',
    href: '/emergency',
  },
  {
    icon: Stethoscope,
    title: 'AI Triage',
    description: 'Self-diagnosis powered by Gemma 4 with hospital recommendations',
    href: '/triage',
  },
  {
    icon: Calendar,
    title: 'Appointments',
    description: 'Smart booking with wait time predictions and doctor availability',
    href: '/appointments',
  },
];

export default function LandingPage() {
  const { data: dashboardData } = useCountyDashboard();

  const stats = [
    { value: `${dashboardData?.hospitalsActive ?? 12}`, label: 'Hospitals Active' },
    { value: `${dashboardData?.bedsAvailable?.toLocaleString() ?? '1,240'}`, label: 'Beds Available' },
    { value: `${dashboardData?.criticalAlerts ?? 3}`, label: 'Critical Alerts' },
  ];

  return (

<div className="flex flex-col">

<section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white">

<div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#2563eb22,transparent_45%)]"/>

<div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,#06b6d422,transparent_40%)]"/>

<div className="relative max-w-7xl mx-auto px-6 py-24">

<div className="grid lg:grid-cols-2 gap-16 items-center">

<div>

<Badge className="bg-blue-600 hover:bg-blue-600 text-white mb-6">

Healthcare AI Platform

</Badge>

<h1 className="text-6xl font-black leading-tight">

The Future of

<span className="block text-cyan-400">

Digital Healthcare

</span>

</h1>

<p className="mt-8 text-xl text-slate-300 leading-9">

Tibamkononi connects hospitals, patients, healthcare workers
and county governments into one intelligent healthcare ecosystem
powered by AI.

</p>

<div className="mt-10 flex flex-wrap gap-4">

<Link href="/register">

<Button size="lg">

Register Hospital

<ArrowRight className="ml-2 h-4 w-4"/>

</Button>

</Link>

<Link href="/triage">

<Button
variant="outline"
size="lg"
className="border-white text-black"
>

Try AI Triage

</Button>

</Link>

<HospitalLoginPicker />

</div>

<div className="mt-12 flex gap-10">

<div>

<div className="text-4xl font-bold">

12+

</div>

<div className="text-slate-400">

Hospitals

</div>

</div>

<div>

<div className="text-4xl font-bold">

250K+

</div>

<div className="text-slate-400">

Patients

</div>

</div>

<div>

<div className="text-4xl font-bold">

99.8%

</div>

<div className="text-slate-400">

Uptime

</div>

</div>

</div>

</div>

<div>

<Card className="bg-white/10 backdrop-blur-xl border-white/20">

<CardContent className="p-8">

<div className="flex items-center justify-between">

<div>

<div className="text-lg font-semibold">

County AI Status

</div>

<div className="text-slate-300">

Live Monitoring

</div>

</div>

<Sparkles className="h-10 w-10 text-cyan-400"/>

</div>

<div className="mt-8 space-y-5">

<div className="flex justify-between">

<span>

Hospitals Connected

</span>

<span className="font-bold">

{dashboardData?.hospitalsActive ?? 12}

</span>

</div>

<div className="flex justify-between">

<span>

Beds Available

</span>

<span className="font-bold">

{dashboardData?.bedsAvailable ?? 1240}

</span>

</div>

<div className="flex justify-between">

<span>

Critical Alerts

</span>

<span className="text-red-400 font-bold">

{dashboardData?.criticalAlerts ?? 3}

</span>

</div>

<div className="flex justify-between">

<span>

Distress Signals

</span>

<span className="text-yellow-400 font-bold">

{dashboardData?.distressSignals ?? 5}

</span>

</div>

</div>

<div className="mt-8 rounded-xl bg-cyan-500/10 border border-cyan-400/20 p-5">

<div className="flex items-center gap-3">

<Brain className="h-6 w-6 text-cyan-400"/>

<div>

<div className="font-semibold">

Gemma AI Active

</div>

<div className="text-sm text-slate-300">

Monitoring hospitals 24/7

</div>

</div>

</div>

</div>

</CardContent>

</Card>

</div>

</div>

</div>

</section>

      {/* Stats Bar */}
      <section className="bg-slate-50 border-b">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-3 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-slate-900">{stat.value}</div>
                <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Healthcare Ecosystem */}

<section className="max-w-7xl mx-auto px-6 py-24">

  <div className="text-center mb-16">

    <span className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">

      COMPLETE DIGITAL HEALTHCARE PLATFORM

    </span>

    <h2 className="mt-6 text-5xl font-bold tracking-tight">

      One Platform.

      Every Healthcare Service.

    </h2>

    <p className="mt-5 max-w-3xl mx-auto text-lg text-slate-600">

      Tibamkononi connects hospitals, county government,
      emergency responders and patients into one intelligent
      healthcare ecosystem powered by AI.

    </p>

  </div>

  <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-8">

    {features.map((feature) => (

      <Link
        key={feature.title}
        href={feature.href}
      >

        <Card className="group h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white">

          <CardContent className="p-8">

            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white group-hover:scale-110 transition">

              <feature.icon className="h-8 w-8"/>

            </div>

            <h3 className="text-2xl font-bold mb-4">

              {feature.title}

            </h3>

            <p className="text-slate-600 leading-7">

              {feature.description}

            </p>

            <div className="mt-8 flex items-center text-blue-600 font-semibold">

              Explore

              <ArrowRight className="ml-2 h-5 w-5 transition group-hover:translate-x-2"/>

            </div>

          </CardContent>

        </Card>

      </Link>

    ))}

  </div>

</section>

{/* AI Powered Healthcare */}

<section className="bg-slate-900 text-white py-24 overflow-hidden">

  <div className="max-w-7xl mx-auto px-6">

    <div className="grid lg:grid-cols-2 gap-20 items-center">

      <div>

        <div className="inline-flex rounded-full bg-blue-600/20 border border-blue-500 px-4 py-2 text-sm text-blue-300 mb-6">

          Powered by Gemma AI

        </div>

        <h2 className="text-5xl font-bold leading-tight">

          Artificial Intelligence

          <br/>

          Saving Lives.

        </h2>

        <p className="mt-8 text-lg text-slate-300 leading-8">

          Tibamkononi uses Google&apos;s Gemma AI to assist doctors,

          analyze emergencies, predict medicine shortages,

          prioritize patients and provide county-wide healthcare

          intelligence in real time.

        </p>

        <div className="grid grid-cols-2 gap-5 mt-10">

          <div className="rounded-xl bg-slate-800 p-5">

            <div className="text-3xl font-bold text-cyan-400">

              98%

            </div>

            <div className="text-sm text-slate-400 mt-2">

              AI Triage Accuracy

            </div>

          </div>

          <div className="rounded-xl bg-slate-800 p-5">

            <div className="text-3xl font-bold text-emerald-400">

              24/7

            </div>

            <div className="text-sm text-slate-400 mt-2">

              Emergency Monitoring

            </div>

          </div>

          <div className="rounded-xl bg-slate-800 p-5">

            <div className="text-3xl font-bold text-yellow-400">

              5×

            </div>

            <div className="text-sm text-slate-400 mt-2">

              Faster Decisions

            </div>

          </div>

          <div className="rounded-xl bg-slate-800 p-5">

            <div className="text-3xl font-bold text-pink-400">

              100%

            </div>

            <div className="text-sm text-slate-400 mt-2">

              County Visibility

            </div>

          </div>

        </div>

      </div>

      <div>

        <Card className="border-0 bg-slate-800 text-white shadow-2xl">

          <CardContent className="p-8 space-y-6">

            <h3 className="text-2xl font-bold">

              Gemma AI Live Analysis

            </h3>

            <div className="rounded-xl bg-slate-900 p-5">

              <p className="text-blue-300 font-semibold">

                Emergency Prediction

              </p>

              <p className="mt-2 text-slate-300">

                Coast General is likely to exceed emergency

                capacity within the next 2 hours.

              </p>

            </div>

            <div className="rounded-xl bg-slate-900 p-5">

              <p className="text-emerald-300 font-semibold">

                Medicine Forecast

              </p>

              <p className="mt-2 text-slate-300">

                Insulin supply at Likoni PHC may run out today.

                Recommend redistribution from Mama Ngina.

              </p>

            </div>

            <div className="rounded-xl bg-slate-900 p-5">

              <p className="text-yellow-300 font-semibold">

                County Recommendation

              </p>

              <p className="mt-2 text-slate-300">

                Current healthcare network performance improved

                by 4.1% this week.

              </p>

            </div>

          </CardContent>

        </Card>

      </div>

    </div>

  </div>

</section>

{/* Emergency Response Workflow */}

<section className="py-24 bg-gradient-to-b from-white to-slate-100">

  <div className="max-w-7xl mx-auto px-6">

    <div className="text-center mb-16">

      <span className="inline-flex rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-600">

        EMERGENCY RESPONSE

      </span>

      <h2 className="mt-6 text-5xl font-bold">

        From Emergency...

        <br/>

        To Treatment.

      </h2>

      <p className="mt-5 text-lg text-slate-600 max-w-3xl mx-auto">

        Every emergency follows one intelligent workflow powered by AI,
        GPS and hospital coordination.

      </p>

    </div>

    <div className="grid md:grid-cols-4 gap-8">

      <Card className="shadow-lg border-0">

        <CardContent className="p-8 text-center">

          <div className="mx-auto h-16 w-16 rounded-full bg-red-100 flex items-center justify-center text-3xl">

            🚨

          </div>

          <h3 className="mt-6 text-xl font-bold">

            Report Emergency

          </h3>

          <p className="mt-4 text-slate-600">

            Patient submits text, voice or camera report.

          </p>

        </CardContent>

      </Card>

      <Card className="shadow-lg border-0">

        <CardContent className="p-8 text-center">

          <div className="mx-auto h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center text-3xl">

            🤖

          </div>

          <h3 className="mt-6 text-xl font-bold">

            AI Analysis

          </h3>

          <p className="mt-4 text-slate-600">

            Gemma evaluates severity and predicts treatment priority.

          </p>

        </CardContent>

      </Card>

      <Card className="shadow-lg border-0">

        <CardContent className="p-8 text-center">

          <div className="mx-auto h-16 w-16 rounded-full bg-green-100 flex items-center justify-center text-3xl">

            🏥

          </div>

          <h3 className="mt-6 text-xl font-bold">

            Hospital Assigned

          </h3>

          <p className="mt-4 text-slate-600">

            Nearest suitable hospital is selected automatically.

          </p>

        </CardContent>

      </Card>

      <Card className="shadow-lg border-0">

        <CardContent className="p-8 text-center">

          <div className="mx-auto h-16 w-16 rounded-full bg-purple-100 flex items-center justify-center text-3xl">

            ❤️

          </div>

          <h3 className="mt-6 text-xl font-bold">

            Treatment Begins

          </h3>

          <p className="mt-4 text-slate-600">

            Doctors receive patient information before arrival.

          </p>

        </CardContent>

      </Card>

    </div>

  </div>

</section>

{/* County Operations */}

<section className="py-24">

  <div className="max-w-7xl mx-auto px-6">

    <div className="grid lg:grid-cols-2 gap-16 items-center">

      <div>

        <h2 className="text-5xl font-bold">

          County Operations

          <br/>

          In Real Time

        </h2>

        <p className="mt-8 text-lg text-slate-600 leading-8">

          County administrators monitor hospitals, medicine
          availability, emergency alerts and healthcare performance
          from one intelligent dashboard.

        </p>

        <div className="space-y-5 mt-10">

          <div className="flex items-center gap-4">

            ✅ Live hospital monitoring

          </div>

          <div className="flex items-center gap-4">

            ✅ Medicine redistribution

          </div>

          <div className="flex items-center gap-4">

            ✅ Bed availability tracking

          </div>

          <div className="flex items-center gap-4">

            ✅ Weekly AI reports

          </div>

          <div className="flex items-center gap-4">

            ✅ Emergency coordination

          </div>

        </div>

      </div>

      <Card className="shadow-2xl border-0">

        <CardContent className="p-8">

          <h3 className="text-2xl font-bold mb-8">

            Live County Status

          </h3>

          <div className="space-y-6">

            <div className="flex justify-between">

              <span>Hospitals Online</span>

              <strong>12 / 12</strong>

            </div>

            <div className="flex justify-between">

              <span>Available Beds</span>

              <strong>1,240</strong>

            </div>

            <div className="flex justify-between">

              <span>Emergency Cases</span>

              <strong>8 Active</strong>

            </div>

            <div className="flex justify-between">

              <span>Critical Medicine Alerts</span>

              <strong className="text-red-600">

                3

              </strong>

            </div>

            <div className="flex justify-between">

              <span>County AI Health Score</span>

              <strong className="text-green-600">

                91%

              </strong>

            </div>

          </div>

        </CardContent>

      </Card>

    </div>

  </div>

</section>

{/* Why Hospitals Choose Tibamkononi */}

<section className="bg-slate-50 py-24">

  <div className="max-w-7xl mx-auto px-6">

    <div className="text-center mb-16">

      <span className="inline-flex rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">

        TRUSTED DIGITAL HEALTHCARE

      </span>

      <h2 className="mt-6 text-5xl font-bold">

        Why Healthcare Providers

        Choose Tibamkononi

      </h2>

      <p className="mt-6 text-lg text-slate-600 max-w-3xl mx-auto">

        Built specifically for hospitals, county governments and
        healthcare professionals in Kenya.

      </p>

    </div>

    <div className="grid md:grid-cols-3 gap-8">

      <Card className="border-0 shadow-lg">

        <CardContent className="p-8">

          <div className="text-5xl mb-5">

            ⚡

          </div>

          <h3 className="text-2xl font-bold mb-4">

            Faster Decisions

          </h3>

          <p className="leading-8 text-slate-600">

            AI assists clinicians with emergency prioritization,
            triage and medicine forecasting to reduce delays.

          </p>

        </CardContent>

      </Card>

      <Card className="border-0 shadow-lg">

        <CardContent className="p-8">

          <div className="text-5xl mb-5">

            📊

          </div>

          <h3 className="text-2xl font-bold mb-4">

            County Visibility

          </h3>

          <p className="leading-8 text-slate-600">

            Decision makers can monitor hospitals,
            beds, medicine availability and emergency
            trends from one dashboard.

          </p>

        </CardContent>

      </Card>

      <Card className="border-0 shadow-lg">

        <CardContent className="p-8">

          <div className="text-5xl mb-5">

            ❤️

          </div>

          <h3 className="text-2xl font-bold mb-4">

            Better Patient Care

          </h3>

          <p className="leading-8 text-slate-600">

            Patients receive faster treatment through
            intelligent hospital recommendations and
            streamlined workflows.

          </p>

        </CardContent>

      </Card>

    </div>

  </div>

</section>

{/* Call To Action */}

<section className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-cyan-600 to-emerald-600 py-28 text-white">

  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_40%)]"/>

  <div className="relative max-w-5xl mx-auto px-6 text-center">

    <h2 className="text-5xl font-bold">

      Ready to Transform

      Healthcare?

    </h2>

    <p className="mt-8 text-xl text-blue-100 leading-8">

      Join hospitals across Mombasa in building
      a smarter, AI-powered healthcare ecosystem.

    </p>

    <div className="mt-12 flex flex-wrap justify-center gap-5">

      <Link href="/register">

        <Button
          size="lg"
          className="bg-white text-slate-900 hover:bg-slate-100 px-10"
        >

          Register Hospital

        </Button>

      </Link>

      <Link href="/appointments">

        <Button
          size="lg"
          variant="outline"
          className="border-white text-white hover:bg-white/10 px-10"
        >

          Book Appointment

        </Button>

      </Link>

    </div>

  </div>

</section>

{/* Footer */}

<footer className="bg-slate-950 text-slate-300">

  <div className="max-w-7xl mx-auto px-6 py-16">

    <div className="grid md:grid-cols-4 gap-10">

      <div>

        <h3 className="text-2xl font-bold text-white">

          Tibamkononi

        </h3>

        <p className="mt-5 leading-7">

          AI-powered healthcare platform connecting
          hospitals, patients and county governments
          across Kenya.

        </p>

      </div>

      <div>

        <h4 className="font-semibold text-white mb-4">

          Platform

        </h4>

        <ul className="space-y-3">

          <li>Hospital Management</li>

          <li>Emergency Response</li>

          <li>AI Triage</li>

          <li>Appointments</li>

        </ul>

      </div>

      <div>

        <h4 className="font-semibold text-white mb-4">

          Solutions

        </h4>

        <ul className="space-y-3">

          <li>County Dashboard</li>

          <li>Inventory</li>

          <li>Bed Management</li>

          <li>Analytics</li>

        </ul>

      </div>

      <div>

        <h4 className="font-semibold text-white mb-4">

          Built With

        </h4>

        <ul className="space-y-3">

          <li>Next.js 14</li>

          <li>Gemma AI</li>

          <li>TypeScript</li>

          <li>Tailwind CSS</li>

        </ul>

      </div>

    </div>

    <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-500">

      © 2026 Tibamkononi Healthcare Platform.

      Built for Mombasa County, Kenya.

    </div>

  </div>

</footer>

      {/* Gemma Badge */}
      <section className="bg-slate-50 py-8">
        <div className="flex justify-center">
          <GemmaBadge />
        </div>
      </section>
    </div>
  );
}
