'use client'

import { Calendar, Clock, User } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface TimeSlot {
  time: string
  doctorName: string
  available: boolean
}

interface DaySchedule {
  day: string
  slots: TimeSlot[]
}

export function AppointmentScheduler({
  schedules,
}: {
  schedules: DaySchedule[]
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Doctor Schedule
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={schedules[0]?.day}>
          <TabsList className="flex w-full flex-wrap">
            {schedules.map((s) => (
              <TabsTrigger key={s.day} value={s.day} className="capitalize">
                {s.day}
              </TabsTrigger>
            ))}
          </TabsList>

          {schedules.map((schedule) => (
            <TabsContent key={schedule.day} value={schedule.day}>
              <div className="space-y-2">
                {schedule.slots.length === 0 ? (
                  <p className="py-8 text-center text-sm text-muted-foreground">
                    No scheduled slots.
                  </p>
                ) : (
                  schedule.slots.map((slot) => (
                    <div
                      key={`${slot.time}-${slot.doctorName}`}
                      className={`flex items-center justify-between rounded-lg border p-3 ${
                        slot.available
                          ? ''
                          : 'bg-muted/50 opacity-60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{slot.time}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1 text-sm">
                          <User className="h-3.5 w-3.5 text-muted-foreground" />
                          {slot.doctorName}
                        </span>
                        <Badge variant={slot.available ? 'default' : 'secondary'}>
                          {slot.available ? 'Available' : 'Booked'}
                        </Badge>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
