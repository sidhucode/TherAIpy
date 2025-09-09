export const Footer = () => {
  return (
    <footer className="bg-background border-t border-border py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              TherAIpy
            </h3>
            <p className="text-muted-foreground text-sm">
              Your AI-powered wellness coach for mental health support and guidance.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#features" className="text-muted-foreground hover:text-foreground transition-therapeutic">Features</a></li>
              <li><a href="#demo" className="text-muted-foreground hover:text-foreground transition-therapeutic">Demo</a></li>
              <li><a href="#pricing" className="text-muted-foreground hover:text-foreground transition-therapeutic">Pricing</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#help" className="text-muted-foreground hover:text-foreground transition-therapeutic">Help Center</a></li>
              <li><a href="#privacy" className="text-muted-foreground hover:text-foreground transition-therapeutic">Privacy Policy</a></li>
              <li><a href="#terms" className="text-muted-foreground hover:text-foreground transition-therapeutic">Terms of Service</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Connect</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#contact" className="text-muted-foreground hover:text-foreground transition-therapeutic">Contact Us</a></li>
              <li><a href="#twitter" className="text-muted-foreground hover:text-foreground transition-therapeutic">Twitter</a></li>
              <li><a href="#github" className="text-muted-foreground hover:text-foreground transition-therapeutic">GitHub</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 TherAIpy. Built with ❤️ for hackathon. Not a substitute for professional therapy.
          </p>
        </div>
      </div>
    </footer>
  );
};