'use client';

import { Building2, Sparkles, ShieldCheck } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';

import { RegistrationForm } from '@/components/hospital/registration-form';

export default function RegisterHospitalPage() {

  return (

    <main className="min-h-screen bg-slate-100">

      <section className="bg-gradient-to-r from-sky-700 via-cyan-600 to-emerald-600 text-white">

        <div className="max-w-7xl mx-auto px-6 py-20">

          <div className="flex items-center gap-5">

            <div className="rounded-full bg-white/20 p-5">

              <Building2 className="h-12 w-12"/>

            </div>

            <div>

              <h1 className="text-5xl font-bold">

                Register Your Hospital

              </h1>

              <p className="mt-3 text-cyan-100 text-lg">

                Join the Tibamkononi Healthcare Network and connect with Mombasa County&apos;s digital health ecosystem.

              </p>

            </div>

          </div>

        </div>

      </section>

      <div className="max-w-7xl mx-auto p-6 space-y-8">

        <div className="grid lg:grid-cols-3 gap-8">

          <Card>

            <CardContent className="p-8 text-center">

              <Sparkles className="h-10 w-10 text-blue-600 mx-auto mb-4"/>

              <h3 className="text-xl font-bold">

                AI Powered

              </h3>

              <p className="mt-3 text-slate-500">

                Gemma AI assists hospitals with triage,
                inventory prediction and emergency support.

              </p>

            </CardContent>

          </Card>

          <Card>

            <CardContent className="p-8 text-center">

              <ShieldCheck className="h-10 w-10 text-green-600 mx-auto mb-4"/>

              <h3 className="text-xl font-bold">

                Secure Platform

              </h3>

              <p className="mt-3 text-slate-500">

                Secure authentication,
                protected patient records
                and county oversight.

              </p>

            </CardContent>

          </Card>

          <Card>

            <CardContent className="p-8 text-center">

              <Building2 className="h-10 w-10 text-purple-600 mx-auto mb-4"/>

              <h3 className="text-xl font-bold">

                Connected Hospitals

              </h3>

              <p className="mt-3 text-slate-500">

                Share resources, receive alerts
                and collaborate with other
                healthcare facilities.

              </p>

            </CardContent>

          </Card>

        </div>

        <Card>

          <CardContent className="p-8">

            <RegistrationForm onSubmit={(data) => { console.log('Registration:', data); }}/>

          </CardContent>

        </Card>

                <div className="grid lg:grid-cols-3 gap-8">

          {/* Registration Progress */}

          <Card>

            <CardContent className="p-8">

              <h2 className="text-xl font-bold mb-6">

                Registration Progress

              </h2>

              <div className="space-y-5">

                <div>

                  <div className="flex justify-between text-sm mb-2">

                    <span>Application</span>

                    <span>100%</span>

                  </div>

                  <div className="h-2 rounded-full bg-slate-200">

                    <div className="h-2 w-full rounded-full bg-green-500"/>

                  </div>

                </div>

                <div>

                  <div className="flex justify-between text-sm mb-2">

                    <span>County Review</span>

                    <span>Pending</span>

                  </div>

                  <div className="h-2 rounded-full bg-slate-200"/>

                </div>

                <div>

                  <div className="flex justify-between text-sm mb-2">

                    <span>Approval</span>

                    <span>Pending</span>

                  </div>

                  <div className="h-2 rounded-full bg-slate-200"/>

                </div>

              </div>

            </CardContent>

          </Card>

          {/* Platform Stats */}

          <Card>

            <CardContent className="p-8">

              <h2 className="text-xl font-bold mb-6">

                Network Statistics

              </h2>

              <div className="space-y-6">

                <div className="flex justify-between">

                  <span>Hospitals Connected</span>

                  <strong>12</strong>

                </div>

                <div className="flex justify-between">

                  <span>Healthcare Workers</span>

                  <strong>1,500+</strong>

                </div>

                <div className="flex justify-between">

                  <span>Patients Served</span>

                  <strong>50,000+</strong>

                </div>

                <div className="flex justify-between">

                  <span>County Coverage</span>

                  <strong>100%</strong>

                </div>

              </div>

            </CardContent>

          </Card>

          {/* AI Assistant */}

          <Card>

            <CardContent className="p-8">

              <h2 className="text-xl font-bold mb-6">

                Gemma AI Assistant

              </h2>

              <div className="rounded-xl bg-blue-50 p-5 leading-7">

                Welcome to Tibamkononi.

                Once your hospital is approved, you&apos;ll gain access to:

                <ul className="list-disc pl-5 mt-4 space-y-2">

                  <li>AI Clinical Insights</li>

                  <li>Emergency Coordination</li>

                  <li>Inventory Forecasting</li>

                  <li>Bed Management</li>

                  <li>County Analytics Dashboard</li>

                </ul>

              </div>

            </CardContent>

          </Card>

        </div>

        {/* Registration Checklist */}

        <Card>

          <CardContent className="p-8">

            <h2 className="text-2xl font-bold mb-6">

              Registration Checklist

            </h2>

            <div className="grid md:grid-cols-2 gap-5">

              <div className="rounded-lg bg-slate-50 p-5">

                ✅ Hospital Information Completed

              </div>

              <div className="rounded-lg bg-slate-50 p-5">

                ✅ Contact Details Added

              </div>

              <div className="rounded-lg bg-slate-50 p-5">

                ✅ Administrator Account Created

              </div>

              <div className="rounded-lg bg-slate-50 p-5">

                ⏳ Awaiting County Approval

              </div>

            </div>

          </CardContent>

        </Card>

        {/* Success Banner */}

        <Card className="border-green-200 bg-green-50">

          <CardContent className="p-10 text-center">

            <div className="text-6xl mb-5">

              🏥

            </div>

            <h2 className="text-3xl font-bold text-green-700">

              Ready to Join the Network

            </h2>

            <p className="mt-5 text-green-600 max-w-2xl mx-auto leading-8">

              After submitting your registration,
              the County Health Administration will review your application.
              Once approved, your hospital will immediately become part of the
              Tibamkononi Healthcare Network.

            </p>

          </CardContent>

        </Card>

      </div>

    </main>

  );

}