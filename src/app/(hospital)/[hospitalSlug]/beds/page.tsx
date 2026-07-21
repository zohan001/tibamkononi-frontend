'use client';

import { useParams } from 'next/navigation';
import { HospitalSidebar } from '@/components/layout/hospital-sidebar';
import { BedGrid } from '@/components/hospital/bed-grid';

const mockWards = [
  { id: '1', name: 'General Ward A', bedCount: 30, bedsOccupied: 24, type: 'General' },
  { id: '2', name: 'General Ward B', bedCount: 25, bedsOccupied: 22, type: 'General' },
  { id: '3', name: 'Maternity Ward', bedCount: 20, bedsOccupied: 20, type: 'Maternity' },
  { id: '4', name: 'ICU', bedCount: 8, bedsOccupied: 6, type: 'ICU' },
  { id: '5', name: 'Paediatric Ward', bedCount: 15, bedsOccupied: 10, type: 'Paediatric' },
  { id: '6', name: 'Surgical Ward', bedCount: 12, bedsOccupied: 5, type: 'Surgical' },
];

export default function BedsPage() {
  const params = useParams();
  const slug = params.hospitalSlug as string;

  return (
    <div className="flex min-h-[calc(100vh-200px)]">
      <HospitalSidebar hospitalSlug={slug} hospitalName={slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Bed Management</h1>
        <BedGrid wards={mockWards} />
      </div>
    </div>
  );
}
