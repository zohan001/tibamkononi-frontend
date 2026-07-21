'use client';

import { useParams } from 'next/navigation';
import { HospitalSidebar } from '@/components/layout/hospital-sidebar';
import { InventoryTable } from '@/components/hospital/inventory-table';
import { Button } from '@/components/ui/button';
import { Plus, ShoppingCart } from 'lucide-react';

const mockInventory = [
  { id: '1', name: 'Amoxicillin Paediatric', category: 'Medicines' as const, currentStock: 12, unit: 'bottles', dailyUsage: 15, daysRemaining: 0.8, status: 'critical' as const, supplier: 'KEMSA', lastRestock: '2026-07-10T00:00:00Z', minimumStock: 50 },
  { id: '2', name: 'ACT Malaria', category: 'Medicines' as const, currentStock: 144, unit: 'doses', dailyUsage: 8, daysRemaining: 18, status: 'warning' as const, supplier: 'KEMSA', lastRestock: '2026-07-05T00:00:00Z', minimumStock: 100 },
  { id: '3', name: 'Paracetamol 500mg', category: 'Medicines' as const, currentStock: 2500, unit: 'tablets', dailyUsage: 50, daysRemaining: 50, status: 'ok' as const, supplier: 'Phillips Pharmaceuticals', lastRestock: '2026-07-15T00:00:00Z', minimumStock: 500 },
  { id: '4', name: 'OR Saline', category: 'Medicines' as const, currentStock: 80, unit: 'packets', dailyUsage: 5, daysRemaining: 16, status: 'ok' as const, supplier: 'KEMSA', lastRestock: '2026-07-12T00:00:00Z', minimumStock: 30 },
  { id: '5', name: 'Examination Gloves', category: 'General' as const, currentStock: 200, unit: 'boxes', dailyUsage: 10, daysRemaining: 20, status: 'ok' as const, supplier: 'Medisel Kenya', lastRestock: '2026-07-18T00:00:00Z', minimumStock: 50 },
];

export default function InventoryPage() {
  const params = useParams();
  const slug = params.hospitalSlug as string;

  return (
    <div className="flex min-h-[calc(100vh-200px)]">
      <HospitalSidebar hospitalSlug={slug} hospitalName={slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} />
      <div className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Inventory Management</h1>
          <div className="flex gap-2">
            <Button variant="outline"><ShoppingCart className="mr-2 h-4 w-4" /> Order from Supplier</Button>
            <Button><Plus className="mr-2 h-4 w-4" /> Add Stock</Button>
          </div>
        </div>
        <InventoryTable items={mockInventory} />
      </div>
    </div>
  );
}
