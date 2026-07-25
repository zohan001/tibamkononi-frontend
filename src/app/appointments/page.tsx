'use client';

import { useState } from 'react';
import { Calendar, Clock, UserRound, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HospitalPicker } from '@/components/appointments/hospital-picker';
import { SlotPicker } from '@/components/appointments/slot-picker';

export default function AppointmentPage() {
  const [bookingStarted, setBookingStarted] = useState(false);

  return (
    <main className="min-h-screen bg-slate-100">
      <section className="bg-gradient-to-r from-indigo-700 via-blue-600 to-cyan-500 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-white/20 p-4">
              <Calendar className="h-10 w-10" />
            </div>
            <div>
              <h1 className="text-5xl font-bold">Smart Appointment Booking</h1>
              <p className="mt-3 text-blue-100 text-lg">
                Book appointments with hospitals across Mombasa using AI-assisted scheduling.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        <Card>
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold">Book Your Appointment</h2>
                <p className="text-slate-500 mt-2">
                  Choose your preferred hospital and available appointment slot.
                </p>
              </div>
              <Button onClick={() => setBookingStarted(true)}>Start Booking</Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card>
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <UserRound className="text-blue-600" />
                <h2 className="text-2xl font-bold">Select Hospital</h2>
              </div>
              <HospitalPicker />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="text-green-600" />
                <h2 className="text-2xl font-bold">Available Time Slots</h2>
              </div>
              <SlotPicker />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="text-purple-600" />
              <h2 className="text-2xl font-bold">Gemma AI Recommendation</h2>
            </div>
            <div className="rounded-xl bg-purple-50 p-6 leading-8">
              Based on your selected hospital and specialty, Gemma recommends booking between
              <strong> 10:00 AM and 11:00 AM </strong> for the shortest waiting time and maximum
              doctor availability.
            </div>
          </CardContent>
        </Card>

        {bookingStarted && (
          <>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-5xl font-bold text-blue-600">12m</div>
                  <p className="mt-3 text-slate-500">Expected Waiting Time</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-5xl font-bold text-green-600">8</div>
                  <p className="mt-3 text-slate-500">Doctors Available</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-5xl font-bold text-orange-600">96%</div>
                  <p className="mt-3 text-slate-500">Booking Success Rate</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">Booking Summary</h2>
                <div className="space-y-5">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Hospital</span>
                    <strong>Coast General Hospital</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Department</span>
                    <strong>General Outpatient</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Appointment Date</span>
                    <strong>Tomorrow</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Time</span>
                    <strong>10:30 AM</strong>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-8 text-center">
                <div className="text-6xl mb-5">✅</div>
                <h2 className="text-3xl font-bold text-green-700">Appointment Ready</h2>
                <p className="mt-4 text-green-600">
                  Your booking details are ready for confirmation. Once confirmed, you will receive
                  your appointment reference and hospital instructions.
                </p>
                <Button className="mt-8 bg-green-600 hover:bg-green-700">
                  Confirm Appointment
                </Button>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </main>
  );
}
