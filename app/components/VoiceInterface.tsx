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
  const processAudioFlow = async (audioBlob: Blob) => {
    try {
      setIsProcessing(true);
      
      // Step 1: Speech to Text
      setCurrentCaption('Transcribing...');
      const formData = new FormData();
      formData.append('audio', audioBlob);
      
      const sttResponse = await fetch('/api/stt', {
        method: 'POST',
        body: formData,
      });
      
      if (!sttResponse.ok) throw new Error('STT failed');
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
      const chatResponse = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          text: userText,
          messages: messages.slice(-10), // Last 10 messages for context
        }),
      });
      
      if (!chatResponse.ok) throw new Error('Chat failed');
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
      const ttsResponse = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: aiText }),
      });
      
      if (!ttsResponse.ok) throw new Error('TTS failed');
      
      // Play audio
      const audioBlob = await ttsResponse.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        await audioRef.current.play();
      }
      
      // Clean up URL after playing
      setTimeout(() => URL.revokeObjectURL(audioUrl), 60000);
      
    } catch (err) {
      console.error('Processing error:', err);
      setCurrentCaption('Error processing audio. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleMicClick = useCallback(async () => {
    if (isRecording) {
      // Stop recording and process
      const audioBlob = await stopRecording();
      if (audioBlob) {
        await processAudioFlow(audioBlob);
      }
    } else {
      // Start recording
      await startRecording();
      setCurrentCaption('Listening...');
    }
  }, [isRecording, startRecording, stopRecording]);

  return (
    <div className="flex flex-col items-center space-y-8 p-8">
      {/* Message History */}
      <div className="w-full max-w-2xl h-96 overflow-y-auto border rounded-lg p-4 bg-gray-50">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-center">
            Press the microphone to start a conversation
          </p>
        ) : (
          <div className="space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-lg ${
                  msg.role === 'user' 
                    ? 'bg-blue-100 ml-auto max-w-[80%]' 
                    : 'bg-green-100 mr-auto max-w-[80%]'
                }`}
              >
                <p className="text-sm font-semibold">
                  {msg.role === 'user' ? 'You' : 'Therapist'}
                </p>
                <p className="mt-1">{msg.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Current Caption */}
      <Captions text={currentCaption} />

      {/* Controls */}
      <div className="flex flex-col items-center space-y-4">
        <MicButton 
          isRecording={isRecording} 
          onClick={handleMicClick}
        />
        
        {isProcessing && (
          <p className="text-sm text-gray-600">Processing...</p>
        )}
        
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
      </div>

      {/* Hidden audio element for playback */}
      <audio ref={audioRef} className="hidden" />
    </div>
  );
}