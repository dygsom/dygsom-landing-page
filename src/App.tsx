import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { ProblemOpportunitySection } from './components/sections/ProblemOpportunitySection';
import { SolutionArchitectureSection } from './components/sections/SolutionArchitectureSection';
import { HowItWorksSection } from './components/sections/HowItWorksSection';
import { AdvantagesSection } from './components/sections/AdvantagesSection';
import { TechnicalSection } from './components/sections/TechnicalSection';
import { TeamSection } from './components/sections/TeamSection';
import { DemoFormSection } from './components/sections/DemoFormSection';
import { PricingSection } from './components/sections/PricingSection';
import { CallToActionSection } from './components/sections/CallToActionSection';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <ProblemOpportunitySection />
        <SolutionArchitectureSection />
        <HowItWorksSection />
        <AdvantagesSection />
        <TechnicalSection />
        <TeamSection />
        <DemoFormSection />
        <PricingSection />
        <CallToActionSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
