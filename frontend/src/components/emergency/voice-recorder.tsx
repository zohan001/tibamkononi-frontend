'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { Mic, Square, Play, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface VoiceRecorderProps {
  onRecordingComplete?: (blob: Blob) => void;
}

export function VoiceRecorder({ onRecordingComplete }: VoiceRecorderProps) {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [state, setState] = useState<'idle' | 'recording' | 'stopped'>('idle');
  const [elapsed, setElapsed] = useState(0);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const startRecording = useCallback(async () => {
    setError(null);
    chunksRef.current = [];
    setElapsed(0);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setRecordedBlob(blob);
        setAudioUrl(URL.createObjectURL(blob));
        onRecordingComplete?.(blob);

        stream.getTracks().forEach((t) => t.stop());
      };

      recorder.start();
      mediaRecorderRef.current = recorder;
      setState('recording');

      timerRef.current = setInterval(() => {
        setElapsed((prev) => prev + 1);
      }, 1000);
    } catch {
      setError('Could not access microphone. Please check permissions.');
    }
  }, [onRecordingComplete]);

  const stopRecording = useCallback(() => {
    mediaRecorderRef.current?.stop();
    mediaRecorderRef.current = null;

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    setState('stopped');
  }, []);

  const reset = useCallback(() => {
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setRecordedBlob(null);
    setAudioUrl(null);
    setElapsed(0);
    setPlaying(false);
    setState('idle');
  }, [audioUrl]);

  const togglePlayback = useCallback(() => {
    if (!audioUrl) return;
    const audio = new Audio(audioUrl);
    audio.onended = () => setPlaying(false);
    audio.play();
    setPlaying(true);
  }, [audioUrl]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

  if (state === 'idle') {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed p-8">
        <Mic className="h-10 w-10 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">Describe what happened</p>
        {error && <p className="text-xs text-red-500">{error}</p>}
        <Button onClick={startRecording}>
          <Mic className="h-4 w-4" />
          Start Recording
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-3 rounded-lg border p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              'flex h-3 w-3 rounded-full',
              state === 'recording' ? 'animate-pulse bg-red-500' : 'bg-muted-foreground'
            )}
          />
          <span className="text-sm font-medium tabular-nums">
            {formatTime(elapsed)}
          </span>
        </div>

        {state === 'recording' && (
          <Button size="sm" variant="destructive" onClick={stopRecording}>
            <Square className="h-4 w-4" />
            Stop
          </Button>
        )}
      </div>

      {state === 'stopped' && recordedBlob && (
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={togglePlayback}>
            <Play className="h-4 w-4" />
            {playing ? 'Playing...' : 'Play'}
          </Button>
          <Button size="sm" variant="ghost" onClick={reset}>
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
          <span className="text-xs text-muted-foreground">
            {(recordedBlob.size / 1024).toFixed(1)} KB recorded
          </span>
        </div>
      )}
    </div>
  );
}
