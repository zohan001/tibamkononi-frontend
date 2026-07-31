'use client';

import { Package, AlertTriangle, Clock, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface InventoryAnalyticsProps {
  items?: {
    name: string;
    stock: number;
    minRequired: number;
    expiryDays: number;
    category: string;
  }[];
}

const defaultItems = [
  { name: 'Amoxicillin', stock: 450, minRequired: 200, expiryDays: 180, category: 'Antibiotics' },
  { name: 'Paracetamol', stock: 120, minRequired: 300, expiryDays: 45, category: 'Painkillers' },
  { name: 'Metformin', stock: 80, minRequired: 150, expiryDays: 30, category: 'Chronic' },
  { name: 'Epinephrine', stock: 30, minRequired: 50, expiryDays: 90, category: 'Emergency' },
  { name: 'Ibuprofen', stock: 320, minRequired: 200, expiryDays: 200, category: 'Painkillers' },
  { name: 'Ciprofloxacin', stock: 95, minRequired: 100, expiryDays: 60, category: 'Antibiotics' },
  { name: 'Insulin', stock: 40, minRequired: 80, expiryDays: 25, category: 'Chronic' },
  { name: 'Morphine', stock: 15, minRequired: 20, expiryDays: 120, category: 'Emergency' },
];

function getStockStatus(stock: number, minRequired: number) {
  if (stock < minRequired * 0.5) return { label: 'Critical', variant: 'destructive' as const };
  if (stock < minRequired) return { label: 'Low', variant: 'secondary' as const };
  return { label: 'OK', variant: 'default' as const };
}

function getExpiryStatus(days: number) {
  if (days <= 30) return { label: 'Expiring Soon', color: 'text-red-600' };
  if (days <= 60) return { label: 'Near Expiry', color: 'text-orange-500' };
  return { label: `${days}d`, color: 'text-muted-foreground' };
}

export function InventoryAnalytics({ items = defaultItems }: InventoryAnalyticsProps) {
  const lowStockCount = items.filter((i) => i.stock < i.minRequired).length;
  const expiringCount = items.filter((i) => i.expiryDays <= 60).length;
  const totalItems = items.reduce((sum, i) => sum + i.stock, 0);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <Card size="sm">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="rounded-lg bg-blue-100 p-2 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
              <Package className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Stock</p>
              <p className="text-2xl font-bold">{totalItems.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
        <Card size="sm">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="rounded-lg bg-orange-100 p-2 text-orange-600 dark:bg-orange-950/50 dark:text-orange-400">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Low Stock Alerts</p>
              <p className="text-2xl font-bold">{lowStockCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card size="sm">
          <CardContent className="flex items-center gap-3 p-4">
            <div className="rounded-lg bg-red-100 p-2 text-red-600 dark:bg-red-950/50 dark:text-red-400">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Expiring Soon</p>
              <p className="text-2xl font-bold">{expiringCount}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingDown className="h-5 w-5 text-orange-500" />
            Medicine Inventory Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {items.map((item) => {
              const stockStatus = getStockStatus(item.stock, item.minRequired);
              const expiryStatus = getExpiryStatus(item.expiryDays);
              const stockPercent = Math.min(100, Math.round((item.stock / item.minRequired) * 100));

              return (
                <div key={item.name} className="rounded-lg border p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.category}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={stockStatus.variant}>{stockStatus.label}</Badge>
                      <span className={cn('text-xs', expiryStatus.color)}>
                        {expiryStatus.label}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Stock: {item.stock}</span>
                      <span>Min: {item.minRequired}</span>
                    </div>
                    <div className="mt-1 h-1.5 rounded-full bg-muted">
                      <div
                        className={cn(
                          'h-full rounded-full transition-all',
                          stockPercent >= 100
                            ? 'bg-green-500'
                            : stockPercent >= 50
                              ? 'bg-yellow-500'
                              : 'bg-red-500'
                        )}
                        style={{ width: `${Math.min(100, stockPercent)}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
