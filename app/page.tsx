'use client';

import Avatar from './components/Avatar';
import VoiceInterface from './components/VoiceInterface';
import PrivacyBanner from './components/PrivacyBanner';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <PrivacyBanner isLocal={true} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center space-y-8">
          <h1 className="text-4xl font-bold text-center mb-4">TherAIpy</h1>
          <p className="text-lg text-gray-300 text-center">Your AI-powered therapy companion</p>
          
          <div className="w-full max-w-2xl aspect-video bg-gray-700 rounded-lg overflow-hidden">
            <Avatar />
          </div>

          <VoiceInterface />
        </div>
      </div>
    </main>
  );
}
