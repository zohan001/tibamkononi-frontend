'use client';

import { useForm } from 'react-hook-form';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TargetedHospital {
  name: string;
  slug: string;
}

interface AnnouncementFormValues {
  title: string;
  body: string;
  type: 'medicine' | 'funding' | 'inspection' | 'alert' | 'general';
  severity: 'info' | 'warning' | 'critical';
  targetedHospitals: string[];
  pinned: boolean;
}

interface AnnouncementFormProps {
  hospitals?: TargetedHospital[];
  onSubmit?: (data: AnnouncementFormValues) => void;
}

const announcementTypes = [
  { value: 'medicine', label: 'Medicine' },
  { value: 'funding', label: 'Funding' },
  { value: 'inspection', label: 'Inspection' },
  { value: 'alert', label: 'Alert' },
  { value: 'general', label: 'General' },
];

const severityOptions = [
  { value: 'info', label: 'Info' },
  { value: 'warning', label: 'Warning' },
  { value: 'critical', label: 'Critical' },
];

export function AnnouncementForm({
  hospitals = [],
  onSubmit,
}: AnnouncementFormProps) {
  const { register, handleSubmit, setValue, watch } =
    useForm<AnnouncementFormValues>({
      defaultValues: {
        title: '',
        body: '',
        type: 'general',
        severity: 'info',
        targetedHospitals: [],
        pinned: false,
      },
    });

  const selectedHospitals = watch('targetedHospitals');
  const pinned = watch('pinned');

  const handleFormSubmit = (data: AnnouncementFormValues) => {
    onSubmit?.(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>New Announcement</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Announcement title"
              {...register('title', { required: true })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="body">Body</Label>
            <Textarea
              id="body"
              placeholder="Announcement details..."
              className="min-h-24"
              {...register('body', { required: true })}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select
                defaultValue="general"
                onValueChange={(val) =>
                  setValue('type', val as AnnouncementFormValues['type'])
                }
              >
                <SelectTrigger id="type" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {announcementTypes.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="severity">Severity</Label>
              <Select
                defaultValue="info"
                onValueChange={(val) =>
                  setValue('severity', val as AnnouncementFormValues['severity'])
                }
              >
                <SelectTrigger id="severity" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {severityOptions.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {hospitals.length > 0 && (
            <div className="space-y-2">
              <Label>Targeted Hospitals</Label>
              <div className="grid max-h-40 gap-1.5 overflow-y-auto rounded-lg border p-2">
                {hospitals.map((h) => {
                  const checked = selectedHospitals.includes(h.slug);
                  return (
                    <label
                      key={h.slug}
                      className="flex cursor-pointer items-center gap-2 rounded px-2 py-1 text-sm transition-colors hover:bg-muted"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setValue('targetedHospitals', [
                              ...selectedHospitals,
                              h.slug,
                            ]);
                          } else {
                            setValue(
                              'targetedHospitals',
                              selectedHospitals.filter((s) => s !== h.slug)
                            );
                          }
                        }}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      {h.name}
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          <label className="flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={pinned}
              onChange={(e) => setValue('pinned', e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            Pin this announcement
          </label>

          <Button type="submit" className="w-full">
            <Send className="h-4 w-4" />
            Send Announcement
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
