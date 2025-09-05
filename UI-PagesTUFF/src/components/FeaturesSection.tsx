import { FeatureCard } from "@/components/FeatureCard";

const features = [
  {
    icon: "🎙️",
    title: "Talk Naturally",
    description: "Speak like you would to a friend — TherAIpy listens with real-time speech-to-text."
  },
  {
    icon: "🗣️",
    title: "Hear Empathy",
    description: "Get smooth, natural voice responses that actually sound human and caring."
  },
  {
    icon: "🎥",
    title: "See Support",
    description: "Our AI avatar lip-syncs your conversation for a more personal, engaging experience."
  },
  {
    icon: "🌍",
    title: "Go Global",
    description: "20+ languages supported instantly — ask TherAIpy anything, anywhere, anytime."
  },
  {
    icon: "🔒",
    title: "Stay Private",
    description: "No transcripts stored unless you choose to — your wellness, your data, your control."
  }
];

export const FeaturesSection = () => {
  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
            Why choose TherAIpy?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Advanced AI therapy techniques combined with cutting-edge technology 
            to provide personalized, accessible wellness support.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};