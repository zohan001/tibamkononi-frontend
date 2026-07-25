'use client';

import { useMemo, useState } from 'react';

import {
  Search,
  Package,
  AlertTriangle,
  CheckCircle2,
  Clock3,
} from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  currentStock: number;
  unit: string;
  dailyUsage: number;
  daysRemaining: number;
  status: 'critical' | 'warning' | 'ok';
  supplier: string;
}

interface InventoryTableProps {
  inventory: InventoryItem[];
}

export function InventoryTable({
  inventory,
}: InventoryTableProps) {

  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {

    if (!search.trim()) return inventory;

    const q = search.toLowerCase();

    return inventory.filter((item) =>
      item.name.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );

  }, [inventory, search]);

  const statusBadge = (status: InventoryItem['status']) => {

    switch (status) {

      case 'critical':
        return (
          <Badge className="bg-red-100 text-red-700">
            Critical
          </Badge>
        );

      case 'warning':
        return (
          <Badge className="bg-yellow-100 text-yellow-700">
            Warning
          </Badge>
        );

      default:
        return (
          <Badge className="bg-green-100 text-green-700">
            Healthy
          </Badge>
        );
    }

  };

  return (

    <Card className="overflow-hidden">

      <div className="p-6 border-b">

        <div className="relative max-w-sm">

          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400"/>

          <Input
            className="pl-10"
            placeholder="Search inventory..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="px-6 py-4 text-left">Medicine</th>
              <th className="px-6 py-4 text-left">Category</th>
              <th className="px-6 py-4 text-left">Stock</th>
              <th className="px-6 py-4 text-left">Usage / Day</th>
              <th className="px-6 py-4 text-left">Days Left</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-right">Action</th>

            </tr>

          </thead>

          <tbody>

            {filtered.map((item) => (

              <tr
                key={item.id}
                className="border-t hover:bg-slate-50"
              >

                <td className="px-6 py-5">

                  <div className="flex items-center gap-3">

                    <div className="rounded-full bg-blue-100 p-2">

                      <Package className="h-5 w-5 text-blue-600"/>

                    </div>

                    <div>

                      <div className="font-semibold">

                        {item.name}

                      </div>

                      <div className="text-xs text-slate-500">

                        {item.supplier}

                      </div>

                    </div>

                  </div>

                </td>

                <td className="px-6 py-5">

                  {item.category}

                </td>

                <td className="px-6 py-5">

                  {item.currentStock} {item.unit}

                </td>

                <td className="px-6 py-5">

                  {item.dailyUsage}

                </td>

                <td className="px-6 py-5">

                  <div className="flex items-center gap-2">

                    <Clock3 className="h-4 w-4 text-slate-500"/>

                    {item.daysRemaining}

                  </div>

                </td>

                <td className="px-6 py-5">

                  {statusBadge(item.status)}

                </td>

                <td className="px-6 py-5 text-right">

                  <Button
                    variant="outline"
                    size="sm"
                  >

                    Restock

                  </Button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {filtered.length === 0 && (

        <div className="p-12 text-center text-slate-500">

          <Package className="mx-auto mb-3 h-10 w-10 opacity-40"/>

          No inventory items found.

        </div>

      )}

      <div className="border-t bg-slate-50 p-5">

        <div className="flex flex-wrap gap-6 text-sm">

          <div className="flex items-center gap-2">

            <CheckCircle2 className="h-4 w-4 text-green-600"/>

            Healthy inventory

          </div>

          <div className="flex items-center gap-2">

            <AlertTriangle className="h-4 w-4 text-yellow-600"/>

            Warning stock

          </div>

          <div className="flex items-center gap-2">

            <AlertTriangle className="h-4 w-4 text-red-600"/>

            Critical stock

          </div>

        </div>

      </div>

    </Card>

  );

}