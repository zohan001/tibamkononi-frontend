'use client';

import { Sparkles, BrainCircuit, TrendingUp, AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface GemmaInsightCardProps {
  title: string;
  insight: string;
  confidence?: number;
  priority?: 'Low' | 'Medium' | 'High';
}

export function GemmaInsightCard({
  title,
  insight,
  confidence = 96,
  priority = 'Low',
}: GemmaInsightCardProps) {
  const priorityColor =
    priority === 'High'
      ? 'text-red-600 bg-red-100'
      : priority === 'Medium'
      ? 'text-yellow-700 bg-yellow-100'
      : 'text-green-700 bg-green-100';

  return (
    <Card className="border-blue-200 shadow-sm hover:shadow-lg transition-all duration-300">

      <CardContent className="p-6">

        <div className="flex items-start justify-between mb-5">

          <div className="flex items-center gap-3">

            <div className="rounded-full bg-blue-100 p-3">

              <BrainCircuit className="h-6 w-6 text-blue-600" />

            </div>

            <div>

              <h3 className="font-bold text-lg">

                {title}

              </h3>

              <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">

                <Sparkles className="h-3 w-3" />

                Powered by Gemma AI

              </div>

            </div>

          </div>

          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${priorityColor}`}>

            {priority} Priority

          </span>

        </div>

        <div className="rounded-xl bg-slate-50 p-5 leading-7 text-slate-700">

          {insight}

        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">

          <div className="rounded-lg bg-blue-50 p-4 text-center">

            <TrendingUp className="mx-auto mb-2 h-5 w-5 text-blue-600" />

            <div className="text-2xl font-bold text-blue-700">

              {confidence}%

            </div>

            <p className="text-xs text-slate-500">

              Confidence

            </p>

          </div>

          <div className="rounded-lg bg-orange-50 p-4 text-center">

            <AlertTriangle className="mx-auto mb-2 h-5 w-5 text-orange-600" />

            <div className="text-lg font-bold">

              {priority}

            </div>

            <p className="text-xs text-slate-500">

              Clinical Priority

            </p>

          </div>

        </div>

      </CardContent>

    </Card>
  );
}