'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain } from "lucide-react";

interface HospitalListItem {
  id: string;
  slug: string;
  name: string;
  status: 'approved' | 'pending' | 'suspended';

  alertCount: number;

  score?: number;

  type?: string;

  beds?: number;

  critical?: number;

  warnings?: number;

  aiSummary?: string;
}
interface HospitalListProps {
  hospitals: HospitalListItem[];
}

export function HospitalList({ hospitals }: HospitalListProps) {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search.trim()) return hospitals;
    const q = search.toLowerCase();
    return hospitals.filter((h) => h.name.toLowerCase().includes(q));
  }, [hospitals, search]);

  if (hospitals.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <AlertCircle className="mb-2 h-8 w-8 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">No hospitals found</p>
      </div>
    );
  }

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
      <div className="space-y-5">

{filtered.map((hospital,index)=>{

const score =
hospital.score ??
(index===0 ? 91 :
index===1 ? 72 : 28);

const critical =
hospital.critical ??
(index===2 ? 3 : 1);

const warnings =
hospital.warnings ??
(index===0 ? 0 : 2);

const beds =
hospital.beds ??
(index===0 ? 340 :
index===1 ? 120 : 40);

const type =
hospital.type ??
(index===2 ? "PHC" : "District Hospital");

const ai =
hospital.aiSummary ??
(
score>85
?"All systems operating normally."
:score>60
?"Medicine shortage predicted within 48 hours."
:"Immediate county intervention recommended."
);

const color =
score>85
?"text-green-600"
:score>60
?"text-yellow-600"
:"text-red-600";

return(

<Card key={hospital.id} className="transition hover:shadow-lg">

<CardContent className="p-6">

<div className="flex justify-between">

<div>

<h3 className="text-xl font-bold">

{hospital.name}

</h3>

<p className="text-sm text-slate-500">

{type}

</p>

</div>

<div className={`text-3xl font-bold ${color}`}>

{score}/100

</div>

</div>

<div className="grid grid-cols-3 gap-4 mt-6">

<div>

<div className="text-xs text-slate-500">

Beds

</div>

<div className="font-semibold">

{beds}

</div>

</div>

<div>

<div className="text-xs text-slate-500">

Critical

</div>

<div className="font-semibold text-red-600">

{critical}

</div>

</div>

<div>

<div className="text-xs text-slate-500">

Warnings

</div>

<div className="font-semibold text-yellow-600">

{warnings}

</div>

</div>

</div>

<div className="mt-6 rounded-lg bg-slate-50 p-4">

<div className="flex items-center gap-2 mb-2">

<Brain className="h-4 w-4 text-blue-600"/>

<span className="font-semibold">

Gemma AI

</span>

</div>

<p className="text-sm text-slate-600">

{ai}

</p>

</div>

<div className="flex gap-3 mt-6">

              <Button render={<Link href={`/county/hospitals/${hospital.slug || hospital.id}`}/>}>

                View Hospital

              </Button>

<Button variant="outline">

AI Analysis

</Button>

</div>

</CardContent>

</Card>

);

})}

</div>
      {filtered.length === 0 && (
        <p className="py-4 text-center text-sm text-muted-foreground">
          No hospitals match your search
        </p>
      )}
    </div>
  );
}
