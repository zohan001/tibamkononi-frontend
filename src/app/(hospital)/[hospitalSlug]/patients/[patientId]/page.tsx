'use client';

import { useParams } from 'next/navigation';
import { HospitalSidebar } from '@/components/layout/hospital-sidebar';
import { usePatient, useDiagnosis } from '@/hooks/use-patients';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, User, Phone, MapPin, Shield } from 'lucide-react';

export default function PatientDetailPage() {
  const params = useParams();
  const slug = params.hospitalSlug as string;
  const patientId = params.patientId as string;
  const { data: patient, isLoading: patientLoading } = usePatient(slug, patientId);
  const { data: diagnosis, isLoading: diagnosisLoading } = useDiagnosis(slug, patientId);

  const isLoading = patientLoading || diagnosisLoading;

  if (isLoading) {
    return (
      <div className="flex min-h-[calc(100vh-200px)]">
        <HospitalSidebar hospitalSlug={slug} hospitalName={slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())} />
        <div className="flex-1 p-6 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
        </div>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="flex min-h-[calc(100vh-200px)]">
        <HospitalSidebar hospitalSlug={slug} hospitalName={slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())} />
        <div className="flex-1 p-6 flex items-center justify-center">
          <p className="text-slate-500">Patient not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-200px)]">
      <HospitalSidebar hospitalSlug={slug} hospitalName={slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())} />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Patient Details</h1>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-slate-500">Full Name</p>
                <p className="font-medium">{patient.fullName}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-sm text-slate-500">Age</p>
                  <p className="font-medium">{patient.age}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Gender</p>
                  <Badge variant="secondary">{patient.gender}</Badge>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-slate-400" />
                <span className="text-sm">{patient.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-slate-400" />
                <span className="text-sm">{patient.address}</span>
              </div>
              {patient.nhifNumber && (
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-slate-400" />
                  <span className="text-sm">NHIF: {patient.nhifNumber}</span>
                </div>
              )}
              <div>
                <p className="text-sm text-slate-500">Emergency Contact</p>
                <p className="font-medium">{patient.emergencyContact}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Registered</p>
                <p className="text-sm">{new Date(patient.registeredAt).toLocaleDateString()}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Diagnosis</CardTitle>
            </CardHeader>
            <CardContent>
              {diagnosis ? (
                <div className="space-y-4">
                  {diagnosis.diseases.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-slate-700 mb-2">Possible Conditions</p>
                      <div className="space-y-2">
                        {diagnosis.diseases.map((d) => (
                          <div key={d.name} className="flex items-center justify-between">
                            <span className="text-sm">{d.name}</span>
                            <Badge variant={d.probability > 50 ? 'default' : 'secondary'}>{d.probability}%</Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {diagnosis.recommendedTests.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-slate-700 mb-2">Recommended Tests</p>
                      <div className="flex flex-wrap gap-1">
                        {diagnosis.recommendedTests.map((t) => (
                          <Badge key={t} variant="outline">{t}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {diagnosis.recommendedTreatment.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-slate-700 mb-2">Treatment</p>
                      <div className="space-y-1">
                        {diagnosis.recommendedTreatment.map((t) => (
                          <p key={t.medicine} className="text-sm text-slate-600">
                            {t.medicine} — {t.dosage}, {t.frequency}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-sm text-slate-500">No diagnosis available yet</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
