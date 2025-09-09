import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TherapeuticButton } from "@/components/ui/button-variants";

export const ChaosSection = () => {
  const [chaosEnabled, setChaosEnabled] = useState(false);

  return (
    <section className="py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <Card className="bg-gradient-feature border-destructive/20 shadow-soft hover:shadow-therapeutic transition-therapeutic">
          <CardContent className="p-8 space-y-6">
            <div className="space-y-2">
              <div className="text-4xl">🎭</div>
              <h3 className="text-2xl font-bold text-foreground">
                Comic Relief Mode
              </h3>
              <p className="text-muted-foreground">
                Built for fun, not therapy.
              </p>
            </div>

            <div className="max-w-2xl mx-auto space-y-4">
              <p className="text-sm text-muted-foreground">
                TherAIpy's "Gremlin Mode" gives ridiculous responses and silly dares. 
                Perfect for when you need a laugh instead of deep therapy.
              </p>
              
              {chaosEnabled && (
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 text-sm">
                  <p className="font-medium text-destructive">⚠️ Chaos Mode Active</p>
                  <p className="text-muted-foreground mt-1">
                    "Do 3 star jumps and yell 'I am the main character!'"
                  </p>
                </div>
              )}
            </div>

            <TherapeuticButton 
              variant={chaosEnabled ? "chaos" : "ghost"}
              size="lg"
              onClick={() => setChaosEnabled(!chaosEnabled)}
              className="text-sm"
            >
              {chaosEnabled ? "🤖 Return to Therapy" : "🎪 Enable Chaos"}
            </TherapeuticButton>

            <p className="text-xs text-muted-foreground">
              Entertainment mode only — not therapeutic advice
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};