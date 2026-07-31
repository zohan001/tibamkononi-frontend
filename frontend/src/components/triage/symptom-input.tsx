'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { MapPin, FlaskConical } from 'lucide-react';
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
import { VoiceRecorder } from '@/components/emergency/voice-recorder';

interface SymptomInputValues {
  symptoms: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  location: { latitude: number; longitude: number };
}

interface SymptomInputProps {
  onAnalyze?: (data: SymptomInputValues & { voiceRecording?: Blob }) => void;
}

export function SymptomInput({ onAnalyze }: SymptomInputProps) {
  const { register, handleSubmit, setValue } = useForm<SymptomInputValues>(
    {
      defaultValues: {
        symptoms: '',
        age: 0,
        gender: 'Male',
        location: { latitude: 0, longitude: 0 },
      },
    }
  );

  const [voiceBlob, setVoiceBlob] = useState<Blob | undefined>();
  const [locationDetected, setLocationDetected] = useState(false);

  const detectLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setValue('location', {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
        setLocationDetected(true);
      },
      () => {
        setLocationDetected(false);
      }
    );
  };

  const handleAnalyze = (data: SymptomInputValues) => {
    onAnalyze?.({ ...data, voiceRecording: voiceBlob });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Describe Your Symptoms</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleAnalyze)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="symptoms">Symptoms</Label>
            <Textarea
              id="symptoms"
              placeholder="Describe your symptoms in detail..."
              className="min-h-24"
              {...register('symptoms', { required: true })}
            />
          </div>

          <div className="space-y-2">
            <Label>Voice Recording (optional)</Label>
            <VoiceRecorder
              onRecordingComplete={(blob) => setVoiceBlob(blob)}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                min={0}
                max={150}
                {...register('age', { required: true, valueAsNumber: true })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select
                defaultValue="Male"
                onValueChange={(val) =>
                  setValue('gender', val as 'Male' | 'Female' | 'Other')
                }
              >
                <SelectTrigger id="gender" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Location</Label>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={detectLocation}
              >
                <MapPin className="h-4 w-4" />
                {locationDetected ? 'Location Detected' : 'Detect My Location'}
              </Button>
              {locationDetected && (
                <span className="text-xs text-green-600">
                  Location captured
                </span>
              )}
            </div>
          </div>

          <Button type="submit" className="w-full">
            <FlaskConical className="h-4 w-4" />
            Analyze Symptoms
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
