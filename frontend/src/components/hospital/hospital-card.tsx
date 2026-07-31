'use client'

import Link from 'next/link'
import { Bed, Building2, Eye, MapPin } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface Hospital {
  name: string
  slug: string
  type: string
  status: 'active' | 'inactive' | 'pending'
  bedsAvailable: number
  address?: string
}

const statusColors: Record<Hospital['status'], string> = {
  active: 'bg-emerald-500',
  inactive: 'bg-slate-400',
  pending: 'bg-amber-500',
}

const typeVariant: Record<string, 'default' | 'secondary' | 'outline'> = {
  county: 'default',
  subcounty: 'secondary',
  dispensary: 'outline',
  'health centre': 'outline',
}

export function HospitalCard({ hospital }: { hospital: Hospital }) {
  return (
    <Card className="relative overflow-hidden transition-shadow hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-muted-foreground" />
            <h3 className="text-lg font-semibold leading-tight">{hospital.name}</h3>
          </div>
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className={`h-2 w-2 rounded-full ${statusColors[hospital.status]}`} />
            {hospital.status}
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <Badge variant={typeVariant[hospital.type] ?? 'outline'}>{hospital.type}</Badge>

        {hospital.address && (
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            {hospital.address}
          </div>
        )}

        <div className="flex items-center gap-1.5 text-sm">
          <Bed className="h-4 w-4 text-muted-foreground" />
          <span>
            <span className="font-medium">{hospital.bedsAvailable}</span> beds available
          </span>
        </div>
      </CardContent>

      <CardFooter>
        <Link href={`/hospitals/${hospital.slug}`} className="w-full">
          <Button variant="outline" size="sm" className="w-full">
            <Eye className="mr-1.5 h-4 w-4" />
            View
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
