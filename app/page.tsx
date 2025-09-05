'use client';

import { useState } from 'react';
import Avatar from './components/Avatar';
import MicButton from './components/MicButton';
import Captions from './components/Captions';
import PrivacyBanner from './components/PrivacyBanner';

export default function Home() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isLocalProcessing, setIsLocalProcessing] = useState(true);

  const handleMicToggle = async () => {
    setIsRecording(!isRecording);
    // TODO: Implement audio recording logic
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <PrivacyBanner isLocal={isLocalProcessing} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center space-y-8">
          <h1 className="text-4xl font-bold text-center mb-8">TherAIpy</h1>
          
          <div className="w-full max-w-2xl aspect-video bg-gray-700 rounded-lg overflow-hidden">
            <Avatar />
          </div>

          <Captions text={transcript} />

          <div className="mt-8">
            <MicButton 
              isRecording={isRecording} 
              onClick={handleMicToggle}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
