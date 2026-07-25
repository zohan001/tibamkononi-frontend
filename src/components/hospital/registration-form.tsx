'use client';

import { useState } from 'react';

import {
  Building2,
  Mail,
  Phone,
  MapPin,
  User,
  Sparkles,
  CheckCircle,
} from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface RegistrationFormData {
  hospitalName: string;
  administrator: string;
  email: string;
  phone: string;
  address: string;
  county: string;
  description: string;
}

interface RegistrationFormProps {
  onSubmit: (data: RegistrationFormData) => void;
}

export function RegistrationForm({
  onSubmit,
}: RegistrationFormProps) {

  const [form, setForm] = useState<RegistrationFormData>({
    hospitalName: '',
    administrator: '',
    email: '',
    phone: '',
    address: '',
    county: '',
    description: '',
  });

  const update = (
    field: keyof RegistrationFormData,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (

    <Card className="shadow-xl">

      <CardContent className="p-8 space-y-8">

        <div>

          <h1 className="text-3xl font-bold">

            Register Hospital

          </h1>

          <p className="text-slate-500 mt-2">

            Join the Tibamkononi Healthcare Network.

          </p>

        </div>

        <div className="grid md:grid-cols-2 gap-6">

          <div>

            <label className="font-medium mb-2 block">

              Hospital Name

            </label>

            <div className="relative">

              <Building2 className="absolute left-3 top-3 h-5 w-5 text-slate-400"/>

              <Input
                className="pl-10"
                value={form.hospitalName}
                onChange={(e) =>
                  update('hospitalName', e.target.value)
                }
              />

            </div>

          </div>

          <div>

            <label className="font-medium mb-2 block">

              Administrator

            </label>

            <div className="relative">

              <User className="absolute left-3 top-3 h-5 w-5 text-slate-400"/>

              <Input
                className="pl-10"
                value={form.administrator}
                onChange={(e) =>
                  update('administrator', e.target.value)
                }
              />

            </div>

          </div>

          <div>

            <label className="font-medium mb-2 block">

              Email Address

            </label>

            <div className="relative">

              <Mail className="absolute left-3 top-3 h-5 w-5 text-slate-400"/>

              <Input
                type="email"
                className="pl-10"
                value={form.email}
                onChange={(e) =>
                  update('email', e.target.value)
                }
              />

            </div>

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
                onChange={(e) =>
                  update('phone', e.target.value)
                }
              />

            </div>

          </div>

          <div>

            <label className="font-medium mb-2 block">

              County

            </label>

            <Input
              value={form.county}
              onChange={(e) =>
                update('county', e.target.value)
              }
            />

          </div>

          <div>

            <label className="font-medium mb-2 block">

              Hospital Address

            </label>

            <div className="relative">

              <MapPin className="absolute left-3 top-3 h-5 w-5 text-slate-400"/>

              <Input
                className="pl-10"
                value={form.address}
                onChange={(e) =>
                  update('address', e.target.value)
                }
              />

            </div>

          </div>

        </div>

        <div>

          <label className="font-medium mb-2 block">

            Hospital Description

          </label>

          <Textarea
            rows={5}
            placeholder="Briefly describe your hospital..."
            value={form.description}
            onChange={(e) =>
              update('description', e.target.value)
            }
          />

        </div>

        <div className="rounded-xl bg-blue-50 p-6">

          <div className="flex items-center gap-3 mb-3">

            <Sparkles className="text-blue-600"/>

            <strong>

              Gemma AI Ready

            </strong>

          </div>

          <p className="text-slate-700">

            Once your hospital is registered, Tibamkononi will
            enable AI-assisted triage, diagnosis support,
            emergency analysis, inventory monitoring, and
            intelligent reporting across your facility.

          </p>

        </div>

        <Button
          className="w-full h-12"
          onClick={() => onSubmit(form)}
        >

          <CheckCircle className="mr-2 h-5 w-5"/>

          Register Hospital

        </Button>

      </CardContent>

    </Card>

  );

}