interface CaptionsProps {
  text: string;
}

export default function Captions({ text }: CaptionsProps) {
  if (!text) return null;
  
  return (
    <div className="text-center">
      <p className="text-lg text-foreground/90 leading-relaxed">
        {text}
      </p>
    </div>
  );
}