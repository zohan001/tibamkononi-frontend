'use client'

import { Brain, CheckCircle2, AlertTriangle, FlaskConical } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'

interface DiagnosisResult {
  disease: string
  confidence: number
}

interface Test {
  name: string
  recommended: boolean
}

interface Treatment {
  name: string
  dosage: string
  inStock: boolean
  stockCount: number
}

interface Diagnosis {
  diseaseProbabilities: DiagnosisResult[]
  recommendedTests: Test[]
  recommendedTreatment: Treatment[]
}

export function DiagnosisPanel({ diagnosis }: { diagnosis: Diagnosis }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          AI Diagnosis
          <Badge variant="secondary" className="ml-auto gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
            Gemma
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Disease Probabilities</h4>
          {diagnosis.diseaseProbabilities.map((d) => (
            <div key={d.disease} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{d.disease}</span>
                <span className="text-muted-foreground">{d.confidence}%</span>
              </div>
              <Progress value={d.confidence} className="h-2" />
            </div>
          ))}
        </div>

        <Separator />

        <div className="space-y-3">
          <h4 className="flex items-center gap-2 text-sm font-medium">
            <FlaskConical className="h-4 w-4" />
            Recommended Tests
          </h4>
          {diagnosis.recommendedTests.map((test) => (
            <label
              key={test.name}
              className="flex items-center gap-2 text-sm"
            >
              <Checkbox defaultChecked={test.recommended} />
              {test.name}
            </label>
          ))}
        </div>

        <Separator />

        <div className="space-y-3">
          <h4 className="flex items-center gap-2 text-sm font-medium">
            Recommended Treatment
          </h4>
          {diagnosis.recommendedTreatment.map((t) => (
            <div
              key={t.name}
              className="flex items-center justify-between rounded-lg border p-3"
            >
              <div>
                <p className="text-sm font-medium">{t.name}</p>
                <p className="text-xs text-muted-foreground">
                  {t.dosage}
                </p>
              </div>
              {t.inStock ? (
                <Badge className="bg-emerald-500 hover:bg-emerald-600 gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  In Stock ({t.stockCount})
                </Badge>
              ) : (
                <Badge variant="destructive" className="gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  Out of Stock
                </Badge>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
