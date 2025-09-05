interface PrivacyBannerProps {
  isLocal: boolean;
}

export default function PrivacyBanner({ isLocal }: PrivacyBannerProps) {
  return (
    <div className="bg-gray-800 py-2">
      <div className="container mx-auto px-4">
        <p className="text-sm text-center flex items-center justify-center gap-2">
          <span className={`w-2 h-2 rounded-full ${isLocal ? 'bg-green-500' : 'bg-blue-500'}`} />
          {isLocal ? 'Processing audio locally' : 'Using secure cloud processing'}
        </p>
      </div>
    </div>
  );
}
