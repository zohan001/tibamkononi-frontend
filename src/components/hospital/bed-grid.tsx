'use client'

import { Bed } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

interface Ward {
  name: string
  bedCount: number
  bedsOccupied: number
}

export function BedGrid({ wards }: { wards: Ward[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bed className="h-5 w-5" />
          Bed Occupancy
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {wards.map((ward) => {
          const available = ward.bedCount - ward.bedsOccupied
          const occupancy = Math.round((ward.bedsOccupied / ward.bedCount) * 100)

          return (
            <div key={ward.name} className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">{ward.name}</h4>
                <span className="text-xs text-muted-foreground">
                  {available} of {ward.bedCount} available &middot; {occupancy}% occupied
                </span>
              </div>

              <Progress value={occupancy} className="h-2" />

              <div className="flex flex-wrap gap-1">
                {Array.from({ length: ward.bedCount }).map((_, i) => (
                  <div
                    key={i}
                    title={i < ward.bedsOccupied ? 'Occupied' : 'Available'}
                    className={`h-5 w-5 rounded-sm ${
                      i < ward.bedsOccupied ? 'bg-red-500' : 'bg-emerald-500'
                    }`}
                  />
                ))}
              </div>
            </div>
          )
        })}

        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <span className="h-3 w-3 rounded-sm bg-emerald-500" />
            Available
          </span>
          <span className="flex items-center gap-1">
            <span className="h-3 w-3 rounded-sm bg-red-500" />
            Occupied
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
