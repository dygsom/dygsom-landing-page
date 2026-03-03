import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { HeroSection } from '../components/sections/HeroSection';
import { MypeQuickPathSection } from '../components/sections/MypeQuickPathSection';
import { ProblemSection } from '../components/sections/ProblemSection';
import { PilaresSection } from '../components/sections/PilaresSection';
import { TopUseCasesSection } from '../components/sections/TopUseCasesSection';
import { TrustSection } from '../components/sections/TrustSection';
import { SolutionArchitectureSection } from '../components/sections/SolutionArchitectureSection';
import { AdvantagesSection } from '../components/sections/AdvantagesSection';
import { ROICalculatorSection } from '../components/sections/ROICalculatorSection';
import { TestimonialsSection } from '../components/sections/TestimonialsSection';
import { PricingSection } from '../components/sections/PricingSection';
import { FAQSection } from '../components/sections/FAQSection';
import { DemoFormSection } from '../components/sections/DemoFormSection';
import { FloatingWhatsAppButton } from '../components/ui/FloatingWhatsAppButton';
import { WelcomeVideoModal } from '../components/modals/WelcomeVideoModal';
import { ExitIntentPopup } from '../components/modals/ExitIntentPopup';
import { VisitorTracker } from '../utils/VisitorTracker';
import { FEATURE_FLAGS, STORAGE_KEYS } from '../utils/constants';
import { trackScrollDepth } from '../utils/analytics';
import { getRequestedLandingSection, scrollToLandingSection } from '../utils/landingNavigation';

export function LandingPage() {
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [showExitIntent, setShowExitIntent] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const initApp = async () => {
      const tracker = VisitorTracker.getInstance();
      await tracker.init();

      if (import.meta.env.DEV) {
        const { DebugTools } = await import('../utils/debug/DebugTools');
        DebugTools.initGlobal();
      }

      if (FEATURE_FLAGS.WELCOME_VIDEO_MODAL_ENABLED) {
        const shouldShow = checkShouldShowWelcomeModal();
        
        if (shouldShow) {
          setTimeout(() => {
            setShowWelcomeModal(true);
          }, FEATURE_FLAGS.WELCOME_MODAL_DELAY_MS || 500);
        }
      }
    };

    initApp();

    let exitIntentShown = false;
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !exitIntentShown && !showWelcomeModal) {
        exitIntentShown = true;
        setShowExitIntent(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    
    const scrollDepthTracked = { 25: false, 50: false, 75: false, 100: false };
    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );

      if (scrollPercent >= 25 && !scrollDepthTracked[25]) {
        scrollDepthTracked[25] = true;
        trackScrollDepth(25);
      }
      if (scrollPercent >= 50 && !scrollDepthTracked[50]) {
        scrollDepthTracked[50] = true;
        trackScrollDepth(50);
      }
      if (scrollPercent >= 75 && !scrollDepthTracked[75]) {
        scrollDepthTracked[75] = true;
        trackScrollDepth(75);
      }
      if (scrollPercent >= 100 && !scrollDepthTracked[100]) {
        scrollDepthTracked[100] = true;
        trackScrollDepth(100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const checkShouldShowWelcomeModal = (): boolean => {
    try {
      return true;
    } catch (error) {
      console.error('Error checking welcome modal state:', error);
      return false;
    }
  };

  const handleCloseWelcomeModal = () => {
    setShowWelcomeModal(false);
    
    try {
      localStorage.setItem(STORAGE_KEYS.WELCOME_MODAL_SHOWN, 'true');
      sessionStorage.setItem('welcome_modal_dismissed', 'true');
    } catch (error) {
      console.error('Error saving modal state:', error);
    }
  };

  const reopenWelcomeModal = () => {
    localStorage.removeItem(STORAGE_KEYS.WELCOME_MODAL_SHOWN);
    localStorage.removeItem(STORAGE_KEYS.ROI_FORM_SUBMITTED);
    sessionStorage.removeItem('welcome_modal_dismissed');
    setShowWelcomeModal(true);
  };

  if (import.meta.env.DEV) {
    (window as any).reopenModal = reopenWelcomeModal;
  }
  
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'M') {
        reopenWelcomeModal();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  useEffect(() => {
    const requestedSection = getRequestedLandingSection(location);
    if (!requestedSection) return;

    const timer = window.setTimeout(() => {
      scrollToLandingSection(requestedSection);
    }, 120);

    return () => window.clearTimeout(timer);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <MypeQuickPathSection />
        <ProblemSection />
        <PilaresSection />
        <TopUseCasesSection />
        <TrustSection />
        <SolutionArchitectureSection />
        <AdvantagesSection />
        <ROICalculatorSection />
        <TestimonialsSection />
        <PricingSection />
        <FAQSection />
        <DemoFormSection />
      </main>
      <Footer />
      <FloatingWhatsAppButton />
      
      <WelcomeVideoModal 
        isOpen={showWelcomeModal}
        onClose={handleCloseWelcomeModal}
      />

      <ExitIntentPopup
        isOpen={showExitIntent}
        onClose={() => setShowExitIntent(false)}
      />

      {import.meta.env.DEV && (
        <button
          onClick={reopenWelcomeModal}
          className="fixed bottom-24 right-6 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg shadow-lg text-sm font-bold z-40 transition-all transform hover:scale-105"
          title="Reabrir modal de bienvenida (o presiona Ctrl+Shift+M)"
        >
          Reabrir Modal
        </button>
      )}
    </div>
  );
}
