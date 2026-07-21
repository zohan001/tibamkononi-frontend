'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Building2, Ambulance, Stethoscope, Calendar, ArrowRight, Heart } from 'lucide-react';
import { GemmaBadge } from '@/components/shared/gemma-badge';

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

const stats = [
  { value: '12+', label: 'Hospitals Registered' },
  { value: '1,240', label: 'Beds Tracked' },
  { value: '45,000+', label: 'Medicines Monitored' },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="absolute inset-0 bg-[url('/images/emergency-bg.jpg')] bg-cover bg-center opacity-10" />
        <div className="relative max-w-6xl mx-auto px-4 py-20 sm:py-32 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <Heart className="h-4 w-4 text-red-400" />
            <span className="text-sm text-slate-300">Mombasa County Health Initiative</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold mb-4 tracking-tight">
            Tibamkononi
          </h1>
          <p className="text-xl sm:text-2xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Connecting Mombasa&apos;s Healthcare Ecosystem
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 px-8">
                Register Your Hospital
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/triage">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8">
                Patient Portal
              </Button>
            </Link>
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

      {/* Features Grid */}
      <section className="max-w-6xl mx-auto px-4 py-16 sm:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Everything You Need</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            A complete healthcare platform built for Mombasa County — from hospital management to emergency response
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <Link key={feature.title} href={feature.href}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-500">{feature.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Gemma Badge */}
      <section className="bg-slate-50 py-8">
        <div className="flex justify-center">
          <GemmaBadge />
        </div>
      </section>
    </div>
  );
}
