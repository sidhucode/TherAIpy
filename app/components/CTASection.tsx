import { TherapeuticButton } from "@/components/ui/button-variants";

export const CTASection = () => {
  return (
    <section className="py-20 px-6 bg-gradient-hero">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <h2 className="text-4xl lg:text-5xl font-bold text-primary-foreground">
            Ready to meet your AI wellness coach?
          </h2>
          <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            TherAIpy is here when you need it — anytime, anywhere, in any language.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <TherapeuticButton 
            variant="calm" 
            size="xl" 
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
          >
            🎙️ Start a Session
          </TherapeuticButton>
          <TherapeuticButton 
            variant="ghost" 
            size="xl"
            className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
          >
            Watch Demo
          </TherapeuticButton>
        </div>

        <div className="pt-8 border-t border-primary-foreground/20">
          <p className="text-sm text-primary-foreground/60">
            TherAIpy is a wellness coach, not a substitute for licensed therapy.
          </p>
        </div>
      </div>
    </section>
  );
};