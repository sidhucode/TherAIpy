'use client';

import VoiceInterface from './components/VoiceInterface';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-calm">
      {/* Hero Section with integrated Voice Interface */}
      <section className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-feature opacity-30"></div>
        
        {/* Floating orbs for ambiance */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl breathe"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl breathe" style={{ animationDelay: '2s' }}></div>
        
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="text-center mb-12 fade-in">
            {/* Logo and Title */}
            <div className="space-y-4 mb-8">
              <h1 className="text-6xl lg:text-7xl font-bold bg-gradient-hero bg-clip-text text-transparent leading-tight">
                TherAIpy
              </h1>
              <h2 className="text-2xl lg:text-3xl text-foreground/80 font-medium">
                Your AI-powered wellness companion
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Talk naturally. Hear empathy. Experience support.
              </p>
            </div>

            {/* Feature badges */}
            <div className="flex flex-wrap gap-3 justify-center mb-8">
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
          </div>

          {/* Main Voice Interface Card */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-card/90 backdrop-blur-xl rounded-3xl shadow-therapeutic border border-border/50 overflow-hidden">
              <div className="p-8 lg:p-12">
                <VoiceInterface />
              </div>
            </div>
          </div>

          {/* Bottom info */}
          <div className="text-center mt-8 text-sm text-muted-foreground">
            <p>Powered by advanced AI • Available 24/7 • No registration required</p>
          </div>
        </div>
      </section>
    </main>
  );
}