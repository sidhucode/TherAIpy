'use client';

import { useState } from 'react';
import ChatDisplay from '@/components/ChatDisplay';
import InputArea from '@/components/InputArea';

export default function Home() {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: message }]);
    setIsProcessing(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });

      const data = await response.json();
      
      // Add assistant response
      setMessages(prev => [...prev, { role: 'assistant', content: data.text }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'I apologize, but I encountered an error processing your message.' 
      }]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-4 py-8 flex flex-col h-screen">
        <h1 className="text-4xl font-bold text-white text-center mb-8">TherAIpy</h1>
        
        <div className="flex-grow flex flex-col space-y-4 overflow-hidden">
          <ChatDisplay messages={messages} isProcessing={isProcessing} />
          <InputArea onSendMessage={handleSendMessage} isProcessing={isProcessing} />
        </div>
      </div>
    </main>
  );
}
