'use client';

import { useState, useRef, useCallback } from 'react';

interface CameraState {
  photoBlob: Blob | null;
  photoUrl: string | null;
  error: string | null;
}

export function useCamera() {
  const [state, setState] = useState<CameraState>({
    photoBlob: null,
    photoUrl: null,
    error: null,
  });
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = useCallback(async (videoElement: HTMLVideoElement) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });
      streamRef.current = stream;
      videoRef.current = videoElement;
      videoElement.srcObject = stream;
      await videoElement.play();
      setState({ photoBlob: null, photoUrl: null, error: null });
    } catch {
      setState((prev) => ({ ...prev, error: 'Could not access camera' }));
    }
  }, []);

  const capturePhoto = useCallback(() => {
    if (!videoRef.current) return;

    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(videoRef.current, 0, 0);
    canvas.toBlob(
      (blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          setState({ photoBlob: blob, photoUrl: url, error: null });
        }
      },
      'image/jpeg',
      0.8
    );
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  }, []);

  const reset = useCallback(() => {
    stopCamera();
    setState({ photoBlob: null, photoUrl: null, error: null });
  }, [stopCamera]);

  return { ...state, startCamera, capturePhoto, stopCamera, reset };
}
