'use client';

import { useState, useCallback, useRef } from 'react';
import MicButton from './MicButton';
import Captions from './Captions';
import { useAudioRecorder } from '../hooks/useAudioRecorder';

interface Message {
  role: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

export default function VoiceInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentCaption, setCurrentCaption] = useState('');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const { isRecording, startRecording, stopRecording, error } = useAudioRecorder();

  // Handle STT → Chat → TTS flow
  const processAudioFlow = useCallback(async (audioBlob: Blob) => {
    try {
      setIsProcessing(true);
      
      // Log audio blob info for debugging
      console.log('Audio blob:', {
        size: audioBlob.size,
        type: audioBlob.type
      });
      
      // Step 1: Speech to Text
      setCurrentCaption('Transcribing...');
      const formData = new FormData();
      formData.append('file', audioBlob, 'recording.webm');
      
      const sttResponse = await fetch('/api/stt', {
        method: 'POST',
        body: formData,
      });
      
      if (!sttResponse.ok) {
        const errorData = await sttResponse.json();
        console.error('STT Error:', errorData);
        throw new Error(errorData.error || 'STT failed');
      }
      const { text: userText } = await sttResponse.json();
      
      // Add user message
      const userMessage: Message = {
        role: 'user',
        text: userText,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, userMessage]);
      setCurrentCaption(userText);
      
      // Step 2: Chat/AI Response
      setCurrentCaption('Thinking...');
      const chatResponse = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          text: userText,
          messages: messages.slice(-10), // Last 10 messages for context
        }),
      });
      
      if (!chatResponse.ok) {
        const errorData = await chatResponse.json();
        console.error('Chat Error:', errorData);
        throw new Error(errorData.error || 'Chat failed');
      }
      const { response: aiText } = await chatResponse.json();
      
      // Add AI message
      const aiMessage: Message = {
        role: 'assistant',
        text: aiText,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
      setCurrentCaption(aiText);
      
      // Step 3: Text to Speech
      setCurrentCaption('Generating speech...');
      const ttsResponse = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: aiText }),
      });
      
      if (!ttsResponse.ok) {
        const errorText = await ttsResponse.text();
        console.error('TTS Error:', errorText);
        throw new Error('TTS failed');
      }
      
      // Play audio
      const ttsAudioBlob = await ttsResponse.blob();
      const audioUrl = URL.createObjectURL(ttsAudioBlob);
      
      console.log('Audio ready to play:', {
        blobSize: ttsAudioBlob.size,
        blobType: ttsAudioBlob.type,
        url: audioUrl
      });
      
      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        audioRef.current.play().catch(playError => {
          console.error('Audio playback error:', playError);
        });
      } else {
        console.error('Audio element not found');
      }
      
      // Clean up URL after playing
      setTimeout(() => URL.revokeObjectURL(audioUrl), 60000);
      
      // Clear caption after response
      setTimeout(() => setCurrentCaption(''), 3000);
      
    } catch (err: any) {
      console.error('Processing error:', err);
      setCurrentCaption(`Error: ${err.message || 'Processing failed'}`);
      setTimeout(() => setCurrentCaption(''), 5000);
    } finally {
      setIsProcessing(false);
    }
  }, [messages]);

  const handleMicClick = useCallback(async () => {
    if (isRecording) {
      // Stop recording and process
      const recordedBlob = await stopRecording();
      if (recordedBlob) {
        await processAudioFlow(recordedBlob);
      }
    } else {
      // Start recording
      await startRecording();
      setCurrentCaption('Listening...');
    }
  }, [isRecording, startRecording, stopRecording, processAudioFlow]);

  return (
    <div className="flex flex-col space-y-6">
      {/* Message History */}
      <div className="h-[400px] overflow-y-auto rounded-2xl bg-muted/20 backdrop-blur-sm p-6">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center space-y-4 fade-in">
              <div className="text-6xl mb-4">💭</div>
              <p className="text-xl text-muted-foreground">
                Press the microphone to start your session
              </p>
              <p className="text-sm text-muted-foreground/70">
                Speak naturally, we're here to listen
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`fade-in ${
                  msg.role === 'user' ? 'flex justify-end' : 'flex justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-2xl ${
                    msg.role === 'user' 
                      ? 'message-user ml-auto' 
                      : 'message-assistant mr-auto'
                  }`}
                >
                  <p className="text-sm font-medium mb-1 opacity-70">
                    {msg.role === 'user' ? 'You' : 'TherAIpy'}
                  </p>
                  <p className="text-base">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Current Caption */}
      {currentCaption && (
        <div className="flex justify-center">
          <div className="voice-bubble fade-in">
            <Captions text={currentCaption} />
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <MicButton 
            isRecording={isRecording} 
            onClick={handleMicClick}
          />
          {isProcessing && (
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
              <p className="text-sm text-muted-foreground whitespace-nowrap">Processing...</p>
            </div>
          )}
        </div>
        
        {error && (
          <div className="px-4 py-2 rounded-lg bg-destructive/10 text-destructive text-sm">
            {error}
          </div>
        )}
        
        <div className="text-center text-sm text-muted-foreground">
          {isRecording ? (
            <p className="text-primary font-medium">Listening... Click again to stop</p>
          ) : (
            <p>Click the microphone to speak</p>
          )}
        </div>
      </div>

      {/* Hidden audio element for playback */}
      <audio ref={audioRef} className="hidden" />
    </div>
  );
}