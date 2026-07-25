'use client';

import { useState } from 'react';

import {
  Calendar,
  Clock,
  UserRound,
  Sparkles,
  CheckCircle,
} from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface AppointmentSchedulerProps {
  onBook: (appointment: {
    patientName: string;
    doctor: string;
    date: string;
    time: string;
    reason: string;
  }) => void;
}

export function AppointmentScheduler({
  onBook,
}: AppointmentSchedulerProps) {

  const [patientName, setPatientName] = useState('');
  const [doctor, setDoctor] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [reason, setReason] = useState('');

  return (

    <Card className="shadow-lg">

      <CardContent className="p-8 space-y-8">

        <div>

          <h2 className="text-3xl font-bold">

            Appointment Scheduler

          </h2>

          <p className="text-slate-500 mt-2">

            Schedule a patient follow-up appointment.

          </p>

        </div>

        <div className="grid md:grid-cols-2 gap-6">

          <div>

            <label className="font-medium mb-2 block">

              Patient Name

            </label>

            <div className="relative">

              <UserRound className="absolute left-3 top-3 h-5 w-5 text-slate-400"/>

              <Input
                className="pl-10"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
              />

            </div>

          </div>

          <div>

            <label className="font-medium mb-2 block">

              Doctor

            </label>

            <Input
              placeholder="Dr. John Doe"
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
            />

          </div>

          <div>

            <label className="font-medium mb-2 block">

              Appointment Date

            </label>

            <div className="relative">

              <Calendar className="absolute left-3 top-3 h-5 w-5 text-slate-400"/>

              <Input
                type="date"
                className="pl-10"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />

            </div>

          </div>

          <div>

            <label className="font-medium mb-2 block">

              Appointment Time

            </label>

            <div className="relative">

              <Clock className="absolute left-3 top-3 h-5 w-5 text-slate-400"/>

              <Input
                type="time"
                className="pl-10"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />

            </div>

          </div>

        </div>

        <div>

          <label className="font-medium mb-2 block">

            Visit Reason

          </label>

          <textarea
            className="w-full rounded-md border p-3 min-h-[120px]"
            placeholder="Reason for appointment..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />

        </div>

        <div className="rounded-xl bg-blue-50 p-6">

          <div className="flex items-center gap-3 mb-3">

            <Sparkles className="text-blue-600"/>

            <strong>

              Gemma AI Recommendation

            </strong>

          </div>

          <p className="text-slate-700">

            Based on the patient&apos;s medical history and condition,
            Gemma AI recommends scheduling follow-up appointments
            within the clinically appropriate timeframe and avoiding
            conflicts with existing appointments.

          </p>

        </div>

        <Button
          className="w-full h-12"
          onClick={() =>
            onBook({
              patientName,
              doctor,
              date,
              time,
              reason,
            })
          }
        >

          <CheckCircle className="mr-2 h-5 w-5"/>

          Book Appointment

        </Button>

      </CardContent>

    </Card>

  );

}