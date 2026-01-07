import { useEffect, useState } from 'react';
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
import { FloatingWhatsAppButton } from './components/ui/FloatingWhatsAppButton';
import { WelcomeVideoModal } from './components/modals/WelcomeVideoModal';
import { VisitorTracker } from './utils/VisitorTracker';
import { FEATURE_FLAGS, STORAGE_KEYS } from './utils/constants';

function App() {
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

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

      // 🎯 WELCOME MODAL LOGIC
      if (FEATURE_FLAGS.WELCOME_VIDEO_MODAL_ENABLED) {
        const shouldShow = checkShouldShowWelcomeModal();
        
        if (shouldShow) {
          // Delay de 0.5 segundos para mejor UX
          setTimeout(() => {
            setShowWelcomeModal(true);
          }, FEATURE_FLAGS.WELCOME_MODAL_DELAY_MS || 500);
        }
      }
    };

    initApp();
  }, []);

  // Verificar si mostrar modal de bienvenida
  const checkShouldShowWelcomeModal = (): boolean => {
    try {
      // 🎯 SIEMPRE MOSTRAR - Comentado el control de localStorage/sessionStorage
      // const alreadyShown = localStorage.getItem(STORAGE_KEYS.WELCOME_MODAL_SHOWN);
      // if (alreadyShown) return false;

      // const formSubmitted = localStorage.getItem(STORAGE_KEYS.ROI_FORM_SUBMITTED);
      // if (formSubmitted) return false;

      // const dismissedThisSession = sessionStorage.getItem('welcome_modal_dismissed');
      // if (dismissedThisSession) return false;

      return true; // Siempre mostrar el popup
    } catch (error) {
      console.error('Error checking welcome modal state:', error);
      return false;
    }
  };

  const handleCloseWelcomeModal = () => {
    setShowWelcomeModal(false);
    
    // Marcar como mostrado para no volver a aparecer
    try {
      localStorage.setItem(STORAGE_KEYS.WELCOME_MODAL_SHOWN, 'true');
      sessionStorage.setItem('welcome_modal_dismissed', 'true');
    } catch (error) {
      console.error('Error saving modal state:', error);
    }
  };

  // 🔧 DEV: Función para reabrir modal manualmente
  const reopenWelcomeModal = () => {
    localStorage.removeItem(STORAGE_KEYS.WELCOME_MODAL_SHOWN);
    localStorage.removeItem(STORAGE_KEYS.ROI_FORM_SUBMITTED);
    sessionStorage.removeItem('welcome_modal_dismissed');
    setShowWelcomeModal(true);
  };

  // 🔧 Exponer función globalmente para testing (dev y producción)
  (window as any).reopenModal = reopenWelcomeModal;
  
  // 🔧 Atajo de teclado para reabrir (Ctrl + Shift + M)
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'M') {
        reopenWelcomeModal();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
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
      <FloatingWhatsAppButton />
      
      {/* 🎯 WELCOME VIDEO MODAL - EASY KILL SWITCH */}
      <WelcomeVideoModal 
        isOpen={showWelcomeModal}
        onClose={handleCloseWelcomeModal}
      />

      {/* 🔧 Botón para reabrir modal - SIEMPRE VISIBLE */}
      <button
        onClick={reopenWelcomeModal}
        className="fixed bottom-24 right-6 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg shadow-lg text-sm font-bold z-40 transition-all transform hover:scale-105"
        title="🔄 Reabrir modal de bienvenida (o presiona Ctrl+Shift+M)"
      >
        🔄 Reabrir Modal
      </button>
    </div>
  );
}

export default App;
