import { Card, CardContent } from "@/components/ui/card";
import { TherapeuticButton } from "@/components/ui/button-variants";

export const DemoSection = () => {
  return (
    <section className="py-20 px-6 bg-muted/30">
      <div className="max-w-5xl mx-auto text-center space-y-12">
        <div className="space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
            See TherAIpy in Action
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Watch how TherAIpy listens, speaks, and guides you in real time through 
            personalized wellness conversations.
          </p>
        </div>

        <Card className="overflow-hidden shadow-therapeutic bg-card/50 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="aspect-video bg-gradient-feature rounded-xl flex items-center justify-center relative overflow-hidden">
              {/* Demo placeholder - replace with actual video */}
              <div className="text-center space-y-4">
                <div className="text-6xl mb-4 animate-pulse">🎥</div>
                <h3 className="text-2xl font-semibold text-foreground">
                  Live Demo Coming Soon
                </h3>
                <p className="text-muted-foreground">
                  Interactive TherAIpy session with real-time avatar response
                </p>
              </div>
              
              {/* Floating demo features */}
              <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm rounded-lg p-2 text-sm font-medium">
                🎙️ Real-time STT
              </div>
              <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm rounded-lg p-2 text-sm font-medium">
                🗣️ Natural TTS
              </div>
              <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm rounded-lg p-2 text-sm font-medium">
                🌍 Multilingual
              </div>
              <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm rounded-lg p-2 text-sm font-medium">
                🎥 Lip-sync Avatar
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <TherapeuticButton variant="hero" size="lg">
            ▶ Try TherAIpy Now
          </TherapeuticButton>
          <TherapeuticButton variant="calm" size="lg">
            Learn More
          </TherapeuticButton>
        </div>
      </div>
    </section>
  );
};