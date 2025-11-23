import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { ProblemOpportunitySection } from './components/sections/ProblemOpportunitySection';
import { SolutionArchitectureSection } from './components/sections/SolutionArchitectureSection';
import { AdvantagesSection } from './components/sections/AdvantagesSection';
import { PricingSection } from './components/sections/PricingSection';
import { CallToActionSection } from './components/sections/CallToActionSection';
import { TeamSection } from './components/sections/TeamSection';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <ProblemOpportunitySection />
        <SolutionArchitectureSection />
        <AdvantagesSection />
        <PricingSection />
        <TeamSection />
        <CallToActionSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
