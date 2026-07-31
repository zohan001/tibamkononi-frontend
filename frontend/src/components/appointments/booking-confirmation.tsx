'use client';

import {
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  Mail,
  Bell,
  ListChecks,
  Plus,
  Navigation,
  Copy,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface BookingDetails {
  date: string;
  time: string;
  hospitalName: string;
  hospitalAddress?: string;
  doctorName?: string;
  department?: string;
  bookingId?: string;
}

interface BookingConfirmationProps {
  booking: BookingDetails;
}

const bringList = [
  'NHIF card or number',
  'Previous medical records',
  'List of current medications',
  'Identification card',
  'Referral letter (if applicable)',
];

export function BookingConfirmation({ booking }: BookingConfirmationProps) {
  return (
    <Card className="border-green-200 dark:border-green-800">
      <CardContent className="flex flex-col items-center p-6 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-950">
          <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
        </div>

        <h2 className="mb-1 text-xl font-semibold">Booking Confirmed!</h2>
        {booking.bookingId && (
          <p className="mb-4 text-sm text-muted-foreground">
          ID: {booking.bookingId}
          </p>
        )}

        <div className="mb-4 w-full space-y-3 rounded-lg bg-muted/50 p-4">
          <div className="flex items-center gap-3 text-sm">
            <Calendar className="h-4 w-4 shrink-0 text-muted-foreground" />
            <span>{booking.date}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Clock className="h-4 w-4 shrink-0 text-muted-foreground" />
            <span>{booking.time}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <MapPin className="h-4 w-4 shrink-0 text-muted-foreground" />
            <span>{booking.hospitalName}</span>
          </div>
          {booking.doctorName && (
            <div className="flex items-center gap-3 text-sm">
              <Copy className="h-4 w-4 shrink-0 text-muted-foreground" />
              <span>Dr. {booking.doctorName}</span>
            </div>
          )}
        </div>

        <div className="mb-4 w-full space-y-2 rounded-lg bg-blue-50 p-4 dark:bg-blue-950/30">
          <div className="flex items-start gap-3">
            <Mail className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
            <p className="text-xs text-blue-700 dark:text-blue-300">
              Confirmation details have been sent to your phone via SMS. Please carry your NHIF card.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <Bell className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
            <p className="text-xs text-blue-700 dark:text-blue-300">
              You will receive a reminder 24 hours before your appointment.
            </p>
          </div>
        </div>

        <div className="mb-6 w-full space-y-1">
          <h4 className="flex items-center gap-1.5 text-sm font-medium">
            <ListChecks className="h-4 w-4" />
            What to bring
          </h4>
          <ul className="space-y-1">
            {bringList.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-xs text-muted-foreground"
              >
                <Plus className="mt-0.5 h-3 w-3 shrink-0 text-green-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <Separator className="mb-4" />

        <div className="flex w-full gap-2">
          <Button className="flex-1">
            <Calendar className="h-4 w-4" />
            Add to Calendar
          </Button>
          <Button variant="outline" className="flex-1">
            <Navigation className="h-4 w-4" />
            Get Directions
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
