'use client';

import { useParams } from 'next/navigation';
import { HospitalSidebar } from '@/components/layout/hospital-sidebar';
import { InventoryTable } from '@/components/hospital/inventory-table';
import { Button } from '@/components/ui/button';
import { Plus, ShoppingCart, Loader2 } from 'lucide-react';
import { useInventory } from '@/hooks/use-inventory';

export default function InventoryPage() {
  const params = useParams();
  const slug = params.hospitalSlug as string;
  const { data: inventory, isLoading } = useInventory(slug);

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

  return (
    <div className="flex min-h-[calc(100vh-200px)]">
      <HospitalSidebar hospitalSlug={slug} hospitalName={slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())} />
      <div className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Inventory Management</h1>
          <div className="flex gap-2">
            <Button variant="outline"><ShoppingCart className="mr-2 h-4 w-4" /> Order from Supplier</Button>
            <Button><Plus className="mr-2 h-4 w-4" /> Add Stock</Button>
          </div>
        </div>
        <InventoryTable items={inventory || []} />
      </div>
    </div>
  );
}
