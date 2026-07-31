'use client';

import { useState } from 'react';
import {
  User,
  Phone,
  MapPin,
  CreditCard,
  HeartPulse,
  Mic,
  Sparkles,
} from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface PatientRegistration {
  fullName: string;
  idNumber: string;
  nhifNumber?: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  phone: string;
  address: string;
  emergencyContact: string;
  symptoms: string;
}

interface PatientFormProps {
  onSubmit: (patient: PatientRegistration) => void;
}

export function PatientForm({
  onSubmit,
}: PatientFormProps) {

  const [form, setForm] = useState<PatientRegistration>({
    fullName: '',
    idNumber: '',
    nhifNumber: '',
    age: 0,
    gender: 'Male',
    phone: '',
    address: '',
    emergencyContact: '',
    symptoms: '',
  });

  const update = (
    key: keyof PatientRegistration,
    value: string | number
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (

    <Card className="shadow-lg">

      <CardContent className="p-8 space-y-8">

        <div>

          <h2 className="text-3xl font-bold">

            Patient Registration

          </h2>

          <p className="text-slate-500 mt-2">

            Register a patient into the Tibamkononi Healthcare System.

          </p>

        </div>

        <div className="grid md:grid-cols-2 gap-6">

          <div>

            <label className="font-medium mb-2 block">

              Full Name

            </label>

            <div className="relative">

              <User className="absolute left-3 top-3 h-5 w-5 text-slate-400"/>

              <Input
                className="pl-10"
                value={form.fullName}
                onChange={(e) => update('fullName', e.target.value)}
              />

            </div>

          </div>

          <div>

            <label className="font-medium mb-2 block">

              National ID

            </label>

            <div className="relative">

              <CreditCard className="absolute left-3 top-3 h-5 w-5 text-slate-400"/>

              <Input
                className="pl-10"
                value={form.idNumber}
                onChange={(e) => update('idNumber', e.target.value)}
              />

            </div>

          </div>

          <div>

            <label className="font-medium mb-2 block">

              NHIF / SHA Number

            </label>

            <Input
              value={form.nhifNumber}
              onChange={(e) => update('nhifNumber', e.target.value)}
            />

          </div>

          <div>

            <label className="font-medium mb-2 block">

              Age

            </label>

            <Input
              type="number"
              value={form.age}
              onChange={(e) => update('age', Number(e.target.value))}
            />

          </div>

          <div>

            <label className="font-medium mb-2 block">

              Gender

            </label>

            <select
              className="w-full rounded-md border px-3 py-2"
              value={form.gender}
              onChange={(e) =>
                update(
                  'gender',
                  e.target.value as PatientRegistration['gender']
                )
              }
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>

          </div>

          <div>

            <label className="font-medium mb-2 block">

              Phone Number

            </label>

            <div className="relative">

              <Phone className="absolute left-3 top-3 h-5 w-5 text-slate-400"/>

              <Input
                className="pl-10"
                value={form.phone}
                onChange={(e) => update('phone', e.target.value)}
              />

            </div>

          </div>

          <div>

            <label className="font-medium mb-2 block">

              Address

            </label>

            <div className="relative">

              <MapPin className="absolute left-3 top-3 h-5 w-5 text-slate-400"/>

              <Input
                className="pl-10"
                value={form.address}
                onChange={(e) => update('address', e.target.value)}
              />

            </div>

          </div>

          <div>

            <label className="font-medium mb-2 block">

              Emergency Contact

            </label>

            <Input
              value={form.emergencyContact}
              onChange={(e) =>
                update('emergencyContact', e.target.value)
              }
            />

          </div>

        </div>

        <div>

          <div className="flex items-center justify-between mb-2">

            <label className="font-medium">

              Symptoms

            </label>

            <Button
              type="button"
              variant="outline"
              size="sm"
            >
              <Mic className="mr-2 h-4 w-4"/>

              Voice Input

            </Button>

          </div>

          <Textarea
            rows={6}
            placeholder="Describe the patient's symptoms..."
            value={form.symptoms}
            onChange={(e) => update('symptoms', e.target.value)}
          />

        </div>

        <div className="rounded-xl bg-blue-50 p-6">

          <div className="flex items-center gap-3 mb-3">

            <Sparkles className="text-blue-600"/>

            <strong>

              Gemma AI

            </strong>

          </div>

          <p className="text-slate-700">

            After registration, Gemma AI will analyze the patient&apos;s
            symptoms and generate possible diagnoses, recommended
            laboratory tests, and suggested treatment options for
            clinician review.

          </p>

        </div>

        <Button
          className="w-full h-12 text-base"
          onClick={() => onSubmit(form)}
        >
          <HeartPulse className="mr-2 h-5 w-5"/>

          Register Patient

        </Button>

      </CardContent>

    </Card>

  );

}