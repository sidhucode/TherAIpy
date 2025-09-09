import Image from "next/image";
import { TherapeuticButton } from "@/components/ui/button-variants";
import heroIllustration from "@/assets/hero-illustration.jpg";

export const HeroSection = () => {
  return (
    <section className="min-h-screen bg-gradient-calm flex items-center justify-center px-6 py-20">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: Content */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-hero bg-clip-text text-transparent leading-tight">
              TherAIpy
            </h1>
            <h2 className="text-2xl lg:text-3xl text-foreground font-medium">
              Your AI-powered wellness coach
            </h2>
          </div>

          <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
            Talk naturally. Hear empathy. See support.<br />
            24/7 AI conversations to help you reflect, recharge, and breathe.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <TherapeuticButton variant="hero" size="xl" className="flex items-center gap-2">
              🎙️ Start a Session
            </TherapeuticButton>
            <TherapeuticButton variant="ghost" size="xl">
              Watch Demo
            </TherapeuticButton>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              🔒 Private
            </span>
            <span className="flex items-center gap-2">
              🌍 Multilingual
            </span>
            <span className="flex items-center gap-2">
              ✨ Free to Try
            </span>
          </div>
        </div>

        {/* Right: Hero Illustration */}
        <div className="relative">
          <div className="relative z-10 breathe">
            <Image 
              src={heroIllustration} 
              alt="TherAIpy AI wellness coach illustration" 
              width={600}
              height={600}
              className="w-full h-auto rounded-2xl shadow-therapeutic object-cover"
              priority
            />
          </div>
          {/* Background glow effect */}
          <div className="absolute inset-0 bg-gradient-hero opacity-20 blur-3xl rounded-3xl"></div>
        </div>
      </div>
    </section>
  );
};