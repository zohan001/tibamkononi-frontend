'use client';

import { useState } from 'react';

import {
  Pill,
  Plus,
  Trash2,
  Sparkles,
  ClipboardCheck,
} from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface Medicine {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
}

interface PrescriptionFormProps {
  onSubmit: (data: {
    medicines: Medicine[];
    notes: string;
  }) => void;
}

export function PrescriptionForm({
  onSubmit,
}: PrescriptionFormProps) {

  const [notes, setNotes] = useState('');

  const [medicines, setMedicines] = useState<Medicine[]>([
    {
      name: '',
      dosage: '',
      frequency: '',
      duration: '',
    },
  ]);

  const updateMedicine = (
    index: number,
    field: keyof Medicine,
    value: string
  ) => {

    const copy = [...medicines];

    copy[index][field] = value;

    setMedicines(copy);

  };

  const addMedicine = () => {

    setMedicines([
      ...medicines,
      {
        name: '',
        dosage: '',
        frequency: '',
        duration: '',
      },
    ]);

  };

  const removeMedicine = (index: number) => {

    if (medicines.length === 1) return;

    setMedicines(
      medicines.filter((_, i) => i !== index)
    );

  };

  return (

    <Card className="shadow-lg">

      <CardContent className="p-8 space-y-8">

        <div>

          <h2 className="text-3xl font-bold">

            Prescription

          </h2>

          <p className="text-slate-500 mt-2">

            Prescribe medicines for the patient.

          </p>

        </div>

        {medicines.map((medicine, index) => (

          <Card
            key={index}
            className="border"
          >

            <CardContent className="p-6 space-y-5">

              <div className="flex justify-between items-center">

                <div className="flex items-center gap-2">

                  <Pill className="text-blue-600"/>

                  <h3 className="font-semibold">

                    Medicine {index + 1}

                  </h3>

                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeMedicine(index)}
                >

                  <Trash2 className="h-4 w-4 text-red-500"/>

                </Button>

              </div>

              <Input
                placeholder="Medicine Name"
                value={medicine.name}
                onChange={(e) =>
                  updateMedicine(index, 'name', e.target.value)
                }
              />

              <div className="grid md:grid-cols-3 gap-4">

                <Input
                  placeholder="Dosage"
                  value={medicine.dosage}
                  onChange={(e) =>
                    updateMedicine(index, 'dosage', e.target.value)
                  }
                />

                <Input
                  placeholder="Frequency"
                  value={medicine.frequency}
                  onChange={(e) =>
                    updateMedicine(index, 'frequency', e.target.value)
                  }
                />

                <Input
                  placeholder="Duration"
                  value={medicine.duration}
                  onChange={(e) =>
                    updateMedicine(index, 'duration', e.target.value)
                  }
                />

              </div>

            </CardContent>

          </Card>

        ))}

        <Button
          variant="outline"
          onClick={addMedicine}
        >

          <Plus className="mr-2 h-4 w-4"/>

          Add Medicine

        </Button>

        <div>

          <label className="font-medium mb-2 block">

            Clinical Notes

          </label>

          <Textarea
            rows={5}
            placeholder="Additional instructions..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

        </div>

        <div className="rounded-xl bg-blue-50 p-6">

          <div className="flex items-center gap-3 mb-3">

            <Sparkles className="text-blue-600"/>

            <strong>

              Gemma AI Medication Check

            </strong>

          </div>

          <p className="text-slate-700">

            Before finalizing this prescription, Gemma AI can
            verify dosage recommendations, identify possible
            drug interactions, and highlight allergy risks to
            support safe prescribing.

          </p>

        </div>

        <Button
          className="w-full h-12"
          onClick={() =>
            onSubmit({
              medicines,
              notes,
            })
          }
        >

          <ClipboardCheck className="mr-2 h-5 w-5"/>

          Save Prescription

        </Button>

      </CardContent>

    </Card>

  );

}