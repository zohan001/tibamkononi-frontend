'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';

import {
  Brain,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';

export function AIExecutiveBriefing() {
  return (
    <Card className="mt-8 border-violet-200 bg-gradient-to-r from-violet-50 to-blue-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-6 w-6 text-violet-600" />
          AI Executive Briefing
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div>
          <h3 className="text-xl font-bold">
            Good morning, County Health Director.
          </h3>

          <p className="mt-3 text-slate-700 leading-7">
            Gemma has analyzed patient flow, medicine inventory,
            staff attendance, emergency reports, and hospital
            performance across all connected facilities.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="rounded-xl bg-white p-5 shadow-sm border">
            <div className="text-sm text-slate-500">
              Facilities Analyzed
            </div>

            <div className="text-3xl font-bold mt-2">
              12
            </div>
          </div>

          <div className="rounded-xl bg-white p-5 shadow-sm border">
            <div className="text-sm text-slate-500">
              Critical Alerts
            </div>

            <div className="text-3xl font-bold mt-2 text-red-600">
              3
            </div>
          </div>

          <div className="rounded-xl bg-white p-5 shadow-sm border">
            <div className="text-sm text-slate-500">
              Predicted Risks
            </div>

            <div className="text-3xl font-bold mt-2 text-orange-500">
              2
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 border shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <h4 className="font-semibold text-lg">
              Priority Actions Today
            </h4>
          </div>

          <div className="space-y-4">
            <div className="flex gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-1" />
              <div>
                <div className="font-medium">
                  Transfer insulin from Coast General to Likoni PHC.
                </div>

                <div className="text-sm text-slate-600">
                  Prevents stock-out within the next 6 hours.
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-1" />
              <div>
                <div className="font-medium">
                  Deploy temporary pharmacist to Likoni PHC.
                </div>

                <div className="text-sm text-slate-600">
                  Restores safe pharmaceutical operations.
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-1" />
              <div>
                <div className="font-medium">
                  Prepare Coast General for increased emergency admissions tonight.
                </div>

                <div className="text-sm text-slate-600">
                  AI confidence: 94%.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-violet-600 text-white p-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="text-violet-100 text-sm">
                Estimated Impact
              </div>

              <div className="text-2xl font-bold mt-1">
                1,840 patients protected
              </div>

              <div className="text-violet-100 mt-2">
                If recommendations are approved today.
              </div>
            </div>

            <div className="text-right">
              <div className="text-violet-100 text-sm">
                AI Confidence
              </div>

              <div className="text-4xl font-bold">
                96%
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-2 text-violet-100">
            <ArrowRight className="h-5 w-5" />
            Recommended next action: approve redistribution plan.
          </div>
        </div>
      </CardContent>
    </Card>
  );
}