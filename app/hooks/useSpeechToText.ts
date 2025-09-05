import { useState, useCallback, useRef, useEffect } from 'react';

interface STTResult {
  text: string;
  language?: string;
  error?: string;
}

const MAX_RECORDING_DURATION = 30000; // 30 seconds

export function useSpeechToText() {
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup function
  const cleanup = useCallback(() => {
    if (recorderRef.current) {
      if (recorderRef.current.state !== 'inactive') {
        recorderRef.current.stop();
      }
      recorderRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsRecording(false);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  const startRecording = useCallback(async (): Promise<STTResult> => {
    try {
      cleanup(); // Ensure any previous recording is cleaned up
      setIsRecording(true);
      setError(null);

      streamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(streamRef.current, { mimeType: 'audio/webm' });
      recorderRef.current = recorder;
      const chunks: Blob[] = [];

      recorder.ondataavailable = (e) => chunks.push(e.data);

      const audioBlob = await new Promise<Blob>((resolve, reject) => {
        recorder.onerror = (e) => reject(e.error);
        recorder.onstop = () => {
          const blob = new Blob(chunks, { type: 'audio/webm' });
          resolve(blob);
        };

        recorder.start();
        timeoutRef.current = setTimeout(() => recorder.stop(), MAX_RECORDING_DURATION);
      });

      cleanup(); // Clean up after recording

      // Send to server
      const formData = new FormData();
      formData.append('file', audioBlob, 'speech.webm');

      const response = await fetch('/api/stt', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      
      if (!response.ok || result.error) {
        throw new Error(result.error || 'Failed to transcribe audio');
      }

      return result;

    } catch (err: any) {
      setError(err.message || 'Failed to record audio');
      setIsRecording(false);
      throw err;
    }
  }, []);

  const stopRecording = useCallback(() => {
    setIsRecording(false);
  }, []);

  return {
    startRecording,
    stopRecording,
    isRecording,
    error
  };
}
