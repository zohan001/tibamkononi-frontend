'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { Camera, RotateCw, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CameraCaptureProps {
  onCapture?: (blob: Blob) => void;
}

export function CameraCapture({ onCapture }: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [streaming, setStreaming] = useState(false);
  const [capturedUrl, setCapturedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startCamera = useCallback(async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setStreaming(true);
    } catch {
      setError('Could not access camera. Please check permissions.');
    }
  }, []);

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setStreaming(false);
  }, []);

  const capture = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(video, 0, 0);
    canvas.toBlob((blob) => {
      if (blob) {
        onCapture?.(blob);
        setCapturedUrl(URL.createObjectURL(blob));
      }
    }, 'image/jpeg', 0.9);
  }, [onCapture]);

  const retake = useCallback(() => {
    if (capturedUrl) {
      URL.revokeObjectURL(capturedUrl);
      setCapturedUrl(null);
    }
  }, [capturedUrl]);

  useEffect(() => {
    return () => {
      stopCamera();
      if (capturedUrl) URL.revokeObjectURL(capturedUrl);
    };
  }, [stopCamera, capturedUrl]);

  if (!streaming && !capturedUrl) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed p-8">
        <Camera className="h-10 w-10 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">Capture accident scene photo</p>
        {error && <p className="text-xs text-red-500">{error}</p>}
        <Button onClick={startCamera}>
          <Camera className="h-4 w-4" />
          Open Camera
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="relative overflow-hidden rounded-lg bg-black">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="h-64 w-full object-cover"
        />
        <canvas ref={canvasRef} className="hidden" />
      </div>

      <div className="flex items-center justify-center gap-2">
        {capturedUrl ? (
          <>
            <Button variant="outline" onClick={retake}>
              <RotateCw className="h-4 w-4" />
              Retake
            </Button>
            <Button variant="default" className="bg-green-600 hover:bg-green-700">
              <Image className="h-4 w-4" aria-hidden="true" />
              Use Photo
            </Button>
          </>
        ) : (
          <Button onClick={capture}>
            <Camera className="h-4 w-4" />
            Capture
          </Button>
        )}
      </div>

      {capturedUrl && (
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={capturedUrl}
            alt="Captured"
            className="h-48 w-full object-cover"
          />
        </div>
      )}
    </div>
  );
}
