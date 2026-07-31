'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { LogIn, Building2, Loader2, ArrowRight, Info } from 'lucide-react';

import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface HospitalOption {
  id: string;
  slug: string;
  name: string;
  status: string;
}

export function HospitalLoginPicker() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState('');

  const { data: hospitals, isLoading } = useQuery<HospitalOption[]>({
    queryKey: ['hospitals', 'approved'],
    queryFn: () => api.get('/hospitals?status=approved'),
    staleTime: 30000,
  });

  const selected = hospitals?.find((h) => h.slug === selectedSlug);

  const handleContinue = () => {
    if (!selected) return;
    router.push(
      `/auth/login?hospital=${encodeURIComponent(selected.slug)}&name=${encodeURIComponent(selected.name)}`
    );
  };

  return (
    <>
      <Button
        variant="outline"
        size="lg"
        className="border-white text-black"
        onClick={() => setOpen((v) => !v)}
      >
        <LogIn className="mr-2 h-4 w-4" />
        Login to hospital
      </Button>

      {open && (
        <div className="basis-full">
          <div className="mt-2 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 p-5 text-left">
            <div className="flex items-center gap-2 font-semibold text-white mb-1">
              <Building2 className="h-4 w-4" />
              Already registered? Sign in to your hospital
            </div>
            <p className="mb-4 text-sm text-slate-300">
              Choose your hospital from the network, then sign in with your hospital account.
            </p>

            {isLoading ? (
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading hospitals from the network...
              </div>
            ) : (
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Select
                  value={selectedSlug}
                  onValueChange={(value) => setSelectedSlug(value ?? '')}
                >
                  <SelectTrigger className="w-full sm:w-80 bg-white/95 text-slate-900">
                    <SelectValue placeholder="Select your hospital" />
                  </SelectTrigger>
                  <SelectContent>
                    {hospitals?.map((h) => (
                      <SelectItem key={h.id} value={h.slug}>
                        {h.name}
                      </SelectItem>
                    ))}
                    {(!hospitals || hospitals.length === 0) && (
                      <div className="px-3 py-2 text-sm text-muted-foreground">
                        No approved hospitals yet.
                      </div>
                    )}
                  </SelectContent>
                </Select>

                <Button onClick={handleContinue} disabled={!selected}>
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}

            <p className="mt-4 flex items-start gap-2 text-xs text-slate-300">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              New to the network? Register your hospital first, then log in here once approved.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
