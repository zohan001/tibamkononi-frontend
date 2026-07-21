'use client';

import { useState, useMemo } from 'react';
import { Search, MapPin, Clock, Star, BedDouble } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { formatDistance } from '@/lib/formatters';
import { cn } from '@/lib/utils';

interface HospitalPickerItem {
  slug: string;
  name: string;
  distance: number;
  rating: number;
  waitTime: string;
  bedsAvailable: number;
}

interface HospitalPickerProps {
  hospitals: HospitalPickerItem[];
  onSelect?: (slug: string) => void;
}

export function HospitalPicker({ hospitals, onSelect }: HospitalPickerProps) {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!search.trim()) return hospitals;
    const q = search.toLowerCase();
    return hospitals.filter((h) => h.name.toLowerCase().includes(q));
  }, [hospitals, search]);

  const handleSelect = (slug: string) => {
    setSelected(slug);
    onSelect?.(slug);
  };

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search hospitals..."
          className="pl-8"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        {filtered.map((h) => {
          const isSelected = selected === h.slug;
          return (
            <Card
              key={h.slug}
              size="sm"
              className={cn(
                'cursor-pointer transition-colors hover:border-primary/50',
                isSelected && 'border-primary ring-1 ring-primary'
              )}
              onClick={() => handleSelect(h.slug)}
            >
              <CardContent className="p-3">
                <p className="mb-2 text-sm font-medium">{h.name}</p>
                <div className="grid grid-cols-2 gap-1 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {formatDistance(h.distance)}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-500" />
                    {h.rating.toFixed(1)}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {h.waitTime}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <BedDouble className="h-3 w-3" />
                    {h.bedsAvailable} beds
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="py-4 text-center text-sm text-muted-foreground">
          No hospitals found
        </p>
      )}
    </div>
  );
}
