interface ChatDisplayProps {
  messages: Array<{ role: 'user' | 'assistant'; content: string }>;
  isProcessing: boolean;
}

export default function ChatDisplay({ messages, isProcessing }: ChatDisplayProps) {
  return (
    <div className="flex-grow overflow-y-auto space-y-4 p-4 bg-gray-800/50 rounded-lg">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`p-4 rounded-lg max-w-[80%] ${
            message.role === 'user'
              ? 'bg-blue-500 ml-auto'
              : 'bg-gray-700'
          }`}
        >
          {message.content}
        </div>
      ))}
      {isProcessing && (
        <div className="bg-gray-700 p-4 rounded-lg max-w-[80%] animate-pulse">
          Thinking...
        </div>
      )}
    </div>
  );
}
