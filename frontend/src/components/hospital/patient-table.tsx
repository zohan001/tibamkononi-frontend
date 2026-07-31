'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Search, User, Eye } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Patient {
  id: string;
  fullName: string;
  age: number;
  gender: string;
  phone: string;
  registeredAt: string;
}

interface PatientTableProps {
  hospitalSlug: string;
  patients: Patient[];
}

export function PatientTable({
  hospitalSlug,
  patients,
}: PatientTableProps) {

  const [search, setSearch] = useState('');

  const filteredPatients = useMemo(() => {

    if (!search.trim()) return patients;

    const query = search.toLowerCase();

    return patients.filter((patient) =>
      patient.fullName.toLowerCase().includes(query) ||
      patient.phone.toLowerCase().includes(query)
    );

  }, [patients, search]);

  return (

    <div className="space-y-6">

      <div className="relative max-w-md">

        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400"/>

        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search patient..."
          className="pl-10"
        />

      </div>

      <div className="overflow-hidden rounded-xl border bg-white">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="text-left px-6 py-4">

                Patient

              </th>

              <th className="text-left px-6 py-4">

                Age

              </th>

              <th className="text-left px-6 py-4">

                Gender

              </th>

              <th className="text-left px-6 py-4">

                Phone

              </th>

              <th className="text-left px-6 py-4">

                Registered

              </th>

              <th className="text-left px-6 py-4">

                Status

              </th>

              <th className="text-right px-6 py-4">

                Action

              </th>

            </tr>

          </thead>

          <tbody>

            {filteredPatients.map((patient) => (

              <tr
                key={patient.id}
                className="border-t hover:bg-slate-50 transition-colors"
              >

                <td className="px-6 py-5">

                  <div className="flex items-center gap-4">

                    <div className="h-11 w-11 rounded-full bg-blue-100 flex items-center justify-center">

                      <User className="h-5 w-5 text-blue-600"/>

                    </div>

                    <div>

                      <div className="font-semibold">

                        {patient.fullName}

                      </div>

                      <div className="text-xs text-slate-500">

                        #{patient.id}

                      </div>

                    </div>

                  </div>

                </td>

                <td className="px-6 py-5">

                  {patient.age}

                </td>

                <td className="px-6 py-5">

                  {patient.gender}

                </td>

                <td className="px-6 py-5">

                  {patient.phone}

                </td>

                <td className="px-6 py-5">

                  {new Date(patient.registeredAt).toLocaleDateString()}

                </td>

                <td className="px-6 py-5">

                  <Badge className="bg-green-100 text-green-700">

                    Active

                  </Badge>

                </td>

                <td className="px-6 py-5 text-right">

                  <Link
                    href={`/${hospitalSlug}/patients/${patient.id}`}
                  >

                    <Button
                      size="sm"
                      variant="outline"
                    >

                      <Eye className="mr-2 h-4 w-4"/>

                      View

                    </Button>

                  </Link>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {filteredPatients.length === 0 && (

        <div className="text-center py-16 text-slate-500">

          No patients found.

        </div>

      )}

    </div>

  );

}