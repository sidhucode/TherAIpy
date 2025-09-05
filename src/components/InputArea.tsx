'use client';

import { useState } from 'react';

interface InputAreaProps {
  onSendMessage: (message: string) => void;
  isProcessing: boolean;
}

export default function InputArea({ onSendMessage, isProcessing }: InputAreaProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isProcessing) return;

    onSendMessage(message);
    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="flex-grow px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={isProcessing}
      />
      <button
        type="submit"
        disabled={isProcessing || !message.trim()}
        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors"
      >
        Send
      </button>
    </form>
  );
}
