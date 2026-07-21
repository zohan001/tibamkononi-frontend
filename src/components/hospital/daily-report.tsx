'use client'

import { FileText, TrendingUp, TrendingDown, Minus, Activity } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

interface Stats {
  patientsToday: number
  patientsTrend: 'up' | 'down' | 'stable'
  bedsOccupancy: number
  bedsTrend: 'up' | 'down' | 'stable'
  criticalStock: number
  criticalTrend: 'up' | 'down' | 'stable'
}

const trendIcon = {
  up: <TrendingUp className="h-3.5 w-3.5 text-red-500" />,
  down: <TrendingDown className="h-3.5 w-3.5 text-emerald-500" />,
  stable: <Minus className="h-3.5 w-3.5 text-muted-foreground" />,
}

export function DailyReport({
  summary,
  stats,
}: {
  summary: string
  stats: Stats
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Daily Report
          <Badge variant="secondary" className="ml-auto gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
            Gemma AI
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border p-3">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Patients Today</span>
              {trendIcon[stats.patientsTrend]}
            </div>
            <p className="mt-1 text-2xl font-bold">{stats.patientsToday}</p>
          </div>

          <div className="rounded-lg border p-3">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Bed Occupancy</span>
              {trendIcon[stats.bedsTrend]}
            </div>
            <p className="mt-1 text-2xl font-bold">{stats.bedsOccupancy}%</p>
          </div>

          <div className="rounded-lg border p-3">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Critical Stock</span>
              {trendIcon[stats.criticalTrend]}
            </div>
            <p className="mt-1 text-2xl font-bold">{stats.criticalStock}</p>
          </div>
        </div>

        <Separator />

        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-medium">
            <Activity className="h-4 w-4" />
            Summary
          </div>
          <p className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
            {summary}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
