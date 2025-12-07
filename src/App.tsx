import { useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { ProblemSection } from './components/sections/ProblemSection';
import { BeforeAfterComparisonSection } from './components/sections/BeforeAfterComparisonSection';
import { ROICalculatorSection } from './components/sections/ROICalculatorSection';
import { HowItWorksSection } from './components/sections/HowItWorksSection';
import { CompatibilitySection } from './components/sections/CompatibilitySection';
import { TargetAudienceSection } from './components/sections/TargetAudienceSection';
import { SocialProofSection } from './components/sections/SocialProofSection';
import { SecurityComplianceSection } from './components/sections/SecurityComplianceSection';
import { MarketComparisonSection } from './components/sections/MarketComparisonSection';
import { PricingSection } from './components/sections/PricingSection';
import { FAQSection } from './components/sections/FAQSection';
import { ProjectStageSection } from './components/sections/ProjectStageSection';
import { DemoFormSection } from './components/sections/DemoFormSection';
import { CallToActionSection } from './components/sections/CallToActionSection';
import { VisitorTracker } from './utils/VisitorTracker';

function App() {
  useEffect(() => {
    // Inicializar tracking cuando la app se monta
    const initApp = async () => {
      const tracker = VisitorTracker.getInstance();
      await tracker.init();

      // Initialize debug tools in development
      if (import.meta.env.DEV) {
        const { DebugTools } = await import('./utils/debug/DebugTools');
        DebugTools.initGlobal();
      }
    };

    initApp();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero - Above the fold */}
        <HeroSection />

        {/* Problem - Pain Amplification */}
        <ProblemSection />

        {/* Before/After Comparison - Visual proof */}
        <BeforeAfterComparisonSection />

        {/* How It Works */}
        <HowItWorksSection />

        {/* ROI Calculator - Critical conversion tool */}
        <ROICalculatorSection />

        {/* Compatibility - Partner positioning */}
        <CompatibilitySection />

        {/* Target Audience */}
        <TargetAudienceSection />

        {/* Social Proof */}
        <SocialProofSection />

        {/* Security & Compliance */}
        <SecurityComplianceSection />

        {/* Market Comparison - Before Pricing */}
        <MarketComparisonSection />

        {/* Pricing */}
        <PricingSection />

        {/* FAQ */}
        <FAQSection />

        {/* Project Stage & Roadmap */}
        <ProjectStageSection />

        {/* Contact Form */}
        <DemoFormSection />

        {/* Final CTA */}
        <CallToActionSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
