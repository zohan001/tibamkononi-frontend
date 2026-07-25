'use client';

import { useState } from 'react';
import { Camera, Mic, Send, Loader2, Crosshair } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface EmergencyRequestFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit?: (data: any) => void;
}

const emergencyTypes = [
  'Accident',
  'Heart Attack',
  'Stroke',
  'Burn',
  'Fracture',
  'Allergic Reaction',
  'Breathing Difficulty',
  'Other',
];

export function EmergencyRequestForm({ onSubmit }: EmergencyRequestFormProps) {
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [severity, setSeverity] = useState('');
  const [hasPhoto, setHasPhoto] = useState(false);
  const [hasVoice, setHasVoice] = useState(false);
  const [loading, setLoading] = useState(false);
  const [geoLoading, setGeoLoading] = useState(false);

  const useMyLocation = () => {
    setGeoLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation(`${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`);
          setGeoLoading(false);
        },
        () => {
          setLocation('Location unavailable');
          setGeoLoading(false);
        }
      );
    } else {
      setLocation('Geolocation not supported');
      setGeoLoading(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    onSubmit?.({ location, type, severity, hasPhoto, hasVoice });
    setLoading(false);
  };

  return (
    <Card className="shadow-lg">
      <CardContent className="p-6 space-y-5">
        <div className="space-y-2">
          <label className="text-sm font-medium">Location</label>
          <div className="flex gap-2">
            <Input
              placeholder="Enter location or coordinates"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="flex-1"
            />
            <Button variant="outline" onClick={useMyLocation} disabled={geoLoading}>
              {geoLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Crosshair className="h-4 w-4" />
              )}
              Use My Location
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Emergency Type</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {emergencyTypes.map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={cn(
                  'rounded-lg border px-3 py-2 text-sm transition-colors',
                  type === t
                    ? 'border-red-500 bg-red-50 text-red-700 font-medium'
                    : 'hover:bg-muted/50'
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Describe Severity</label>
          <Textarea
            placeholder="Describe the patient's condition, any visible injuries, level of consciousness..."
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
            rows={3}
          />
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => setHasPhoto(!hasPhoto)}
            type="button"
          >
            <Camera className="h-4 w-4" />
            {hasPhoto ? 'Photo Attached' : 'Capture Photo'}
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => setHasVoice(!hasVoice)}
            type="button"
          >
            <Mic className="h-4 w-4" />
            {hasVoice ? 'Voice Attached' : 'Voice Description'}
          </Button>
        </div>

        <Button
          className="w-full bg-red-600 hover:bg-red-700"
          onClick={handleSubmit}
          disabled={loading || !type}
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
          {loading ? 'Sending...' : 'Request Emergency'}
        </Button>
      </CardContent>
    </Card>
  );
}
