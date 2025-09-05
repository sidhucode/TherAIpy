interface MicButtonProps {
  isRecording: boolean;
  onClick: () => void;
}

export default function MicButton({ isRecording, onClick }: MicButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        w-20 h-20 rounded-full flex items-center justify-center 
        transition-all duration-300 transform
        ${isRecording 
          ? 'bg-gradient-hero scale-110 shadow-glow mic-button recording' 
          : 'bg-gradient-hero hover:scale-105 shadow-therapeutic mic-button'
        }
      `}
    >
      <svg
        className={`w-10 h-10 ${isRecording ? 'text-white' : 'text-primary-foreground'}`}
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        {isRecording ? (
          // Recording icon (filled mic with waves)
          <>
            <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
            <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
            {/* Animated waves */}
            <g className="animate-pulse">
              <path d="M3 9v6h2V9H3zm16 0v6h2V9h-2z" opacity="0.5" />
            </g>
          </>
        ) : (
          // Idle mic icon
          <>
            <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
            <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
          </>
        )}
      </svg>
    </button>
  );
}