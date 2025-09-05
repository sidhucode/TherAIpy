import { TherapeuticButton } from "@/components/ui/button-variants";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            TherAIpy
          </h1>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-muted-foreground hover:text-foreground transition-therapeutic">
            Features
          </a>
          <a href="#demo" className="text-muted-foreground hover:text-foreground transition-therapeutic">
            Demo
          </a>
          <a href="#privacy" className="text-muted-foreground hover:text-foreground transition-therapeutic">
            Privacy
          </a>
        </div>

        <div className="flex items-center space-x-4">
          <TherapeuticButton variant="ghost" size="sm">
            Sign In
          </TherapeuticButton>
          <TherapeuticButton variant="hero" size="sm">
            Get Started
          </TherapeuticButton>
        </div>
      </div>
    </nav>
  );
};