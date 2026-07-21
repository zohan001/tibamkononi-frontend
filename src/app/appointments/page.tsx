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
import { CheckCircle, Building2, Calendar, User } from 'lucide-react';

const mockHospitals = [
  { name: 'Mama Ngina Hospital', slug: 'mama-ngina', distance: 2.3, rating: 4.2, waitTime: '25 min', bedsAvailable: 12 },
  { name: 'Coast General Hospital', slug: 'coast-general', distance: 5.8, rating: 4.5, waitTime: '15 min', bedsAvailable: 23 },
  { name: 'Likoni PHC', slug: 'likoni-phc', distance: 1.1, rating: 3.8, waitTime: '40 min', bedsAvailable: 8 },
];

const mockSlots = [
  { time: '8:00 AM', doctor: 'Dr. Wanjiku', available: true, gemmaTip: 'Shortest wait time' },
  { time: '8:30 AM', doctor: 'Dr. Wanjiku', available: true },
  { time: '9:00 AM', doctor: 'Dr. Otieno', available: false, reason: 'Absent tomorrow' },
  { time: '9:30 AM', doctor: 'Dr. Wanjiku', available: true },
  { time: '10:00 AM', doctor: 'Dr. Otieno', available: true },
  { time: '10:30 AM', doctor: 'Dr. Wanjiku', available: true },
];

export default function AppointmentsPage() {
  const [step, setStep] = useState(1);
  const [selectedHospital, setSelectedHospital] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [formData, setFormData] = useState({ patientName: '', patientPhone: '', nhifNumber: '', reason: '' });

  const steps = [
    { label: 'Hospital', icon: Building2 },
    { label: 'Date & Time', icon: Calendar },
    { label: 'Details', icon: User },
    { label: 'Confirm', icon: CheckCircle },
  ];

  const handleHospitalSelect = (slug: string) => {
    setSelectedHospital(slug);
    setStep(2);
  };

  const handleSlotSelect = (slot: { time: string }) => {
    setSelectedSlot(slot.time);
    setStep(3);
  };

  const handleConfirm = () => {
    setStep(4);
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

      {step === 1 && (
        <HospitalPicker hospitals={mockHospitals} onSelect={handleHospitalSelect} />
      )}

      {step === 2 && (
        <SlotPicker
          slots={mockSlots}
          selectedDate={new Date()}
          onDateChange={() => {}}
          onSlotSelect={handleSlotSelect}
        />
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
            <Button onClick={handleConfirm} className="w-full" size="lg">Confirm Booking</Button>
          </CardContent>
        </Card>
      )}

      {step === 4 && (
        <BookingConfirmation
          booking={{
            date: 'Tomorrow',
            time: selectedSlot,
            hospitalName: mockHospitals.find(h => h.slug === selectedHospital)?.name || '',
            doctorName: 'Dr. Wanjiku',
          }}
        />
      )}
    </div>
  );
}
