interface MicButtonProps {
  isRecording: boolean;
  onClick: () => void;
}

export default function MicButton({ isRecording, onClick }: MicButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`w-16 h-16 rounded-full flex items-center justify-center transition-all
        ${isRecording 
          ? 'bg-red-500 hover:bg-red-600' 
          : 'bg-blue-500 hover:bg-blue-600'
        }`}
    >
      <svg
        className="w-8 h-8 text-white"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        {isRecording ? (
          <path d="M12 16c2.206 0 4-1.794 4-4V6c0-2.217-1.785-4.021-3.979-4.021a.933.933 0 0 0-.209.025A4.006 4.006 0 0 0 8 6v6c0 2.206 1.794 4 4 4z" />
        ) : (
          <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
        )}
        <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
      </svg>
    </button>
  );
}
