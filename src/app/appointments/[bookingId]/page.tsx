'use client';

import { BookingConfirmation } from '@/components/appointments/booking-confirmation';

export default function BookingDetailPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <BookingConfirmation
        booking={{
          date: 'July 25, 2026',
          time: '8:30 AM',
          hospitalName: 'Mama Ngina Hospital',
          doctorName: 'Dr. Wanjiku',
        }}
      />
    </div>
  );
}
