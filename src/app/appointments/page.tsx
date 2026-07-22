'use client';

import { useState } from 'react';
import { HospitalPicker } from '@/components/appointments/hospital-picker';
import { SlotPicker } from '@/components/appointments/slot-picker';
import { BookingConfirmation } from '@/components/appointments/booking-confirmation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, Building2, Calendar, User, Loader2 } from 'lucide-react';
import { useHospitalsList } from '@/hooks/use-hospitals';
import { useAvailableSlots, useBookAppointment } from '@/hooks/use-appointments';
import { format } from 'date-fns';
import { toast } from 'sonner';

export default function AppointmentsPage() {
  const [step, setStep] = useState(1);
  const [selectedHospital, setSelectedHospital] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedSlot, setSelectedSlot] = useState('');
  const [formData, setFormData] = useState({ patientName: '', patientPhone: '', nhifNumber: '', reason: '' });

  const { data: hospitals, isLoading: hospitalsLoading } = useHospitalsList();
  const { data: slots, isLoading: slotsLoading } = useAvailableSlots(selectedHospital, format(selectedDate, 'yyyy-MM-dd'));
  const bookAppointment = useBookAppointment();

  const steps = [
    { label: 'Hospital', icon: Building2 },
    { label: 'Date & Time', icon: Calendar },
    { label: 'Details', icon: User },
    { label: 'Confirm', icon: CheckCircle },
  ];

  const hospitalList = (hospitals || []).map((h) => ({
    slug: h.slug,
    name: h.name,
    distance: 0,
    rating: 4.0,
    waitTime: '25 min',
    bedsAvailable: (h.buildings || []).flatMap((b) => b.wards).reduce((sum, w) => sum + (w.bedCount - w.bedsOccupied), 0),
  }));

  const timeSlots = (slots || []).map((s) => ({
    time: s.time,
    doctor: s.doctorName,
    available: true,
  }));

  const handleHospitalSelect = (slug: string) => {
    setSelectedHospital(slug);
    setStep(2);
  };

  const handleSlotSelect = (slot: { time: string }) => {
    setSelectedSlot(slot.time);
    setStep(3);
  };

  const handleConfirm = () => {
    if (!selectedHospital || !selectedSlot || !formData.patientName || !formData.patientPhone) {
      toast.error('Please fill in all required fields');
      return;
    }

    bookAppointment.mutate(
      {
        hospitalSlug: selectedHospital,
        department: 'General Outpatient',
        doctorName: '',
        date: format(selectedDate, 'yyyy-MM-dd'),
        time: selectedSlot,
        patientName: formData.patientName,
        patientPhone: formData.patientPhone,
        nhifNumber: formData.nhifNumber || undefined,
        reason: formData.reason,
      },
      {
        onSuccess: () => {
          setStep(4);
          toast.success('Appointment booked successfully!');
        },
        onError: (error) => {
          toast.error(`Booking failed: ${error.message}`);
        },
      }
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Book an Appointment</h1>
        <p className="text-slate-600 mt-2">Find available doctors and book your visit</p>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-center gap-2">
          {steps.map((s, i) => (
            <div key={s.label} className="flex items-center">
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${step === i + 1 ? 'bg-slate-900 text-white' : step > i + 1 ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                {step > i + 1 ? <CheckCircle className="h-4 w-4" /> : <s.icon className="h-4 w-4" />}
                <span className="hidden sm:inline">{s.label}</span>
              </div>
              {i < steps.length - 1 && <div className="w-8 h-px bg-slate-200 mx-1" />}
            </div>
          ))}
        </div>
      </div>

      {hospitalsLoading ? (
        <div className="text-center py-16">
          <Loader2 className="h-12 w-12 animate-spin text-slate-400 mx-auto mb-4" />
          <p className="text-lg text-slate-600">Loading hospitals...</p>
        </div>
      ) : step === 1 && (
        <HospitalPicker hospitals={hospitalList} onSelect={handleHospitalSelect} />
      )}

      {step === 2 && (
        slotsLoading ? (
          <div className="text-center py-16">
            <Loader2 className="h-12 w-12 animate-spin text-slate-400 mx-auto mb-4" />
            <p className="text-lg text-slate-600">Loading available slots...</p>
          </div>
        ) : (
          <SlotPicker
            slots={timeSlots}
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            onSlotSelect={handleSlotSelect}
          />
        )
      )}

      {step === 3 && (
        <Card>
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-semibold">Your Details</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input placeholder="e.g. Fatuma Juma" value={formData.patientName} onChange={(e) => setFormData({ ...formData, patientName: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input placeholder="e.g. 0712345678" value={formData.patientPhone} onChange={(e) => setFormData({ ...formData, patientPhone: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>NHIF Number (optional)</Label>
                <Input placeholder="NHIF number" value={formData.nhifNumber} onChange={(e) => setFormData({ ...formData, nhifNumber: e.target.value })} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Reason for Visit</Label>
              <Textarea placeholder="Describe your symptoms or reason for visit..." value={formData.reason} onChange={(e) => setFormData({ ...formData, reason: e.target.value })} />
            </div>
            <Button onClick={handleConfirm} className="w-full" size="lg" disabled={bookAppointment.isPending}>
              {bookAppointment.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Booking...
                </>
              ) : (
                'Confirm Booking'
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      {step === 4 && (
        <BookingConfirmation
          booking={{
            date: format(selectedDate, 'MMMM d, yyyy'),
            time: selectedSlot,
            hospitalName: hospitalList.find((h) => h.slug === selectedHospital)?.name || '',
            doctorName: '',
          }}
        />
      )}
    </div>
  );
}
