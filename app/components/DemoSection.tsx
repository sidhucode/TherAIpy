import { Card, CardContent } from "@/components/ui/card";
import { TherapeuticButton } from "@/components/ui/button-variants";
import Link from "next/link";

export const DemoSection = () => {
  return (
    <section className="py-20 px-6 bg-muted/30">
      <div className="max-w-5xl mx-auto text-center space-y-12">
        <div className="space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
            See TherAIpy in Action
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Experience the future of wellness support. Our interactive demo showcases the seamless, voice-first interaction that makes TherAIpy unique.
          </p>
        </div>
        
        <Card className="bg-card/80 backdrop-blur-lg border-border/50 shadow-lg overflow-hidden">
          <CardContent className="p-8 lg:p-12">
            <div className="relative w-full rounded-lg overflow-hidden bg-black/10 border border-border/50" style={{ paddingBottom: '56.25%' }}>
              {/* Placeholder for a video or interactive demo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-muted-foreground text-lg">Interactive Demo Coming Soon</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex justify-center">
          <Link href="/demo">
                                                <TherapeuticButton variant="hero" size="lg">
              Launch Interactive Demo
            </TherapeuticButton>
          </Link>
        </div>
      </div>
    </section>
  );
};