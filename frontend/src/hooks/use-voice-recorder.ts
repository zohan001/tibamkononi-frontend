'use client';

import { useState, useRef, useCallback } from 'react';

interface VoiceRecorderState {
  isRecording: boolean;
  audioBlob: Blob | null;
  audioUrl: string | null;
  error: string | null;
}

export function useVoiceRecorder() {
  const [state, setState] = useState<VoiceRecorderState>({
    isRecording: false,
    audioBlob: null,
    audioUrl: null,
    error: null,
  });
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        chunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setState({ isRecording: false, audioBlob: blob, audioUrl: url, error: null });
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setState({ isRecording: true, audioBlob: null, audioUrl: null, error: null });
    } catch {
      setState((prev) => ({ ...prev, error: 'Could not access microphone' }));
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && state.isRecording) {
      mediaRecorderRef.current.stop();
    }
  }, [state.isRecording]);

  const reset = useCallback(() => {
    setState({ isRecording: false, audioBlob: null, audioUrl: null, error: null });
  }, []);

  return { ...state, startRecording, stopRecording, reset };
}
