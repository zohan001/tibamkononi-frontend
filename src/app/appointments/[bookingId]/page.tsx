'use client';

import { BookingConfirmation } from '@/components/appointments/booking-confirmation';
import { useAppointments } from '@/hooks/use-appointments';
import { Loader2 } from 'lucide-react';
import { useParams } from 'next/navigation';

export default function BookingDetailPage() {
  const params = useParams();
  const bookingId = params.bookingId as string;
  const { data: appointments, isLoading } = useAppointments();

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center py-16">
          <Loader2 className="h-12 w-12 animate-spin text-slate-400 mx-auto mb-4" />
          <p className="text-lg text-slate-600">Loading booking details...</p>
        </div>
      </div>
    );
  }

  const booking = (appointments || []).find((a) => a.id === bookingId);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <BookingConfirmation
        booking={
          booking
            ? {
                bookingId: booking.id,
                date: new Date(booking.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
                time: booking.time,
                hospitalName: booking.hospitalName,
                doctorName: booking.doctorName,
              }
            : {
                date: 'Loading...',
                time: '',
                hospitalName: '',
                doctorName: '',
              }
        }
      />
    </div>
  );
}
