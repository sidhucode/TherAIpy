interface CaptionsProps {
  text: string;
}

export default function Captions({ text }: CaptionsProps) {
  return (
    <div className="w-full max-w-2xl min-h-[60px] bg-gray-800/50 rounded-lg p-4">
      <p className="text-lg text-center">
        {text || 'Speak to begin...'}
      </p>
    </div>
  );
}
