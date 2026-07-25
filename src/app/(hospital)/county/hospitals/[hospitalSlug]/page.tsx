'use client';

import { ArrowLeft, Brain, MapPin, Phone, Building2 } from 'lucide-react';
import Link from 'next/link';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function CountyHospitalDetailsPage() {
  return (
    <div className="min-h-screen bg-slate-50">

      <div className="mx-auto max-w-7xl p-8">

        <Link
          href="/county"
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to County Dashboard
        </Link>

        <div className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]">

          {/* LEFT */}

          <Card>

            <CardContent className="p-8">

              <div className="flex items-start justify-between">

                <div>

                  <div className="flex items-center gap-3">

                    <Building2 className="h-10 w-10 text-blue-600" />

                    <div>

                      <h1 className="text-4xl font-bold">

                        Mama Ngina Hospital

                      </h1>

                      <p className="mt-2 text-slate-500">

                        District Hospital

                      </p>

                    </div>

                  </div>

                  <div className="mt-8 flex flex-wrap gap-6 text-sm text-slate-600">

                    <div className="flex items-center gap-2">

                      <MapPin className="h-4 w-4" />

                      Likoni, Mombasa County

                    </div>

                    <div className="flex items-center gap-2">

                      <Phone className="h-4 w-4" />

                      +254 712 345 678

                    </div>

                  </div>

                </div>

                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">

                  ACTIVE

                </Badge>

              </div>

            </CardContent>

          </Card>

          {/* RIGHT */}

          <Card>

            <CardContent className="p-8 text-center">

              <p className="text-sm text-slate-500">

                County Health Score

              </p>

              <div className="mt-3 text-6xl font-bold text-yellow-600">

                72

              </div>

              <p className="mt-2 text-slate-500">

                out of 100

              </p>

              <Button className="mt-8 w-full">

                View Full AI Report

              </Button>

            </CardContent>

          </Card>

        </div>

        {/* AI SUMMARY */}

        <Card className="mt-8">

          <CardContent className="p-8">

            <div className="flex items-center gap-3">

              <Brain className="h-6 w-6 text-blue-600" />

              <h2 className="text-2xl font-bold">

                Today&apos;s AI Summary

              </h2>

            </div>

            <div className="mt-6 rounded-xl bg-blue-50 p-6 leading-8">

              Gemma AI has analyzed the hospital&apos;s inventory, patient flow,
              staffing, and historical trends.

              <br /><br />

              • Amoxicillin is projected to run out within 24 hours.

              <br />

              • Bed occupancy is currently at 91%.

              <br />

              • One distress signal is still unresolved.

              <br />

              • Emergency transfer from Coast General is recommended.

              <br />

              • Overall performance improved by 6% compared to last week.

            </div>

          </CardContent>

        </Card>

        {/* INVENTORY INTELLIGENCE */}

<Card className="mt-8">

  <CardContent className="p-8">

    <div className="flex items-center justify-between">

      <div>

        <h2 className="text-2xl font-bold">

          Inventory Intelligence

        </h2>

        <p className="text-slate-500 mt-2">

          Live medicine availability monitored by Gemma AI.

        </p>

      </div>

      <Badge>

        Live Inventory

      </Badge>

    </div>

    <div className="mt-8 overflow-x-auto">

      <table className="w-full">

        <thead>

          <tr className="border-b">

            <th className="py-3 text-left">Medicine</th>

            <th className="text-left">Stock</th>

            <th className="text-left">Daily Usage</th>

            <th className="text-left">Days Left</th>

            <th className="text-left">Status</th>

          </tr>

        </thead>

        <tbody>

          <tr className="border-b">

            <td className="py-4">

              Paediatric Amoxicillin

            </td>

            <td>12 bottles</td>

            <td>15/day</td>

            <td className="text-red-600 font-semibold">

              &lt; 1 Day

            </td>

            <td>

              <Badge variant="destructive">

                Critical

              </Badge>

            </td>

          </tr>

          <tr className="border-b">

            <td className="py-4">

              ACT Malaria

            </td>

            <td>144 doses</td>

            <td>12/day</td>

            <td>

              12 Days

            </td>

            <td>

              <Badge>

                Healthy

              </Badge>

            </td>

          </tr>

          <tr className="border-b">

            <td className="py-4">

              ORS Sachets

            </td>

            <td>35</td>

            <td>25/day</td>

            <td className="text-orange-600">

              1 Day

            </td>

            <td>

              <Badge className="bg-yellow-100 text-yellow-700">

                Warning

              </Badge>

            </td>

          </tr>

          <tr>

            <td className="py-4">

              Insulin

            </td>

            <td>0</td>

            <td>5/day</td>

            <td className="text-red-600">

              Out

            </td>

            <td>

              <Badge variant="destructive">

                Out of Stock

              </Badge>

            </td>

          </tr>

        </tbody>

      </table>

    </div>

  </CardContent>

</Card>

      </div>

    </div>
  );
}