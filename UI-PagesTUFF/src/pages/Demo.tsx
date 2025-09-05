import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import VoiceInterface from "@/components/VoiceInterface";
import { TherapeuticButton } from "@/components/ui/button-variants";

const Demo = () => {
  return (
    <div className="min-h-screen bg-gradient-calm">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Home</span>
          </Link>
          <h1 className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            TherAIpy Demo
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <section className="text-center mb-12 space-y-4">
            <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              Experience TherAIpy
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Talk naturally with our AI wellness companion. Click the microphone to start.
            </p>
            
            {/* Feature badges */}
            <div className="flex flex-wrap gap-3 justify-center">
              <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                🔒 100% Private
              </span>
              <span className="px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium">
                🎙️ Voice-First
              </span>
              <span className="px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium">
                🧠 AI-Powered
              </span>
            </div>
          </section>

          {/* Voice Interface Card */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-card/90 backdrop-blur-xl rounded-3xl shadow-therapeutic border border-border/50 overflow-hidden">
              <div className="p-8 lg:p-12">
                <VoiceInterface />
              </div>
            </div>
          </div>

          {/* Info Section */}
          <div className="text-center mt-8 space-y-4">
            <p className="text-sm text-muted-foreground">
              Powered by advanced AI • Available 24/7 • No registration required
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <TherapeuticButton variant="calm" size="lg">
                  Learn More About TherAIpy
                </TherapeuticButton>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Demo;