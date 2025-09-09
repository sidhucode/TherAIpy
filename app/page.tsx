'use client';

import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeaturesSection } from './components/FeaturesSection';
import { DemoSection } from './components/DemoSection';
import { ChaosSection } from './components/ChaosSection';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <DemoSection />
        <ChaosSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}