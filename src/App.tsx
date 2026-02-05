import { useEffect, useState } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { ProblemSection } from './components/sections/ProblemSection';
import { PilaresSection } from './components/sections/PilaresSection';
import { TopUseCasesSection } from './components/sections/TopUseCasesSection';
import { TrustSection } from './components/sections/TrustSection';
import { SolutionArchitectureSection } from './components/sections/SolutionArchitectureSection';
import { AdvantagesSection } from './components/sections/AdvantagesSection';
import { ROICalculatorSection } from './components/sections/ROICalculatorSection';
import { TestimonialsSection } from './components/sections/TestimonialsSection';
import { PricingSection } from './components/sections/PricingSection';
import { FAQSection } from './components/sections/FAQSection';
import { DemoFormSection } from './components/sections/DemoFormSection';
import { FloatingWhatsAppButton } from './components/ui/FloatingWhatsAppButton';
import { WelcomeVideoModal } from './components/modals/WelcomeVideoModal';
import { ExitIntentPopup } from './components/modals/ExitIntentPopup';
import { VisitorTracker } from './utils/VisitorTracker';
import { FEATURE_FLAGS, STORAGE_KEYS } from './utils/constants';
import { trackScrollDepth } from './utils/analytics';

function App() {
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [showExitIntent, setShowExitIntent] = useState(false);

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

    // Exit Intent Detection
    let exitIntentShown = false;
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !exitIntentShown && !showWelcomeModal) {
        exitIntentShown = true;
        setShowExitIntent(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    
    // Scroll Depth Tracking
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

        {/* 4 Pilares de Protección - CORE MESSAGE */}
        <PilaresSection />

        {/* Top 4 Casos de Uso - PROOF */}
        <TopUseCasesSection />

        {/* Trust & Compatibility - CREDIBILITY */}
        <TrustSection />

        {/* Solution Architecture - Context */}
        <SolutionArchitectureSection />

        {/* Advantages - Why DYGSOM */}
        <AdvantagesSection />

        {/* ROI Calculator - Conversion tool */}
        <ROICalculatorSection />

        {/* Testimonials - Social Proof */}
        <TestimonialsSection />

        {/* Pricing */}
        <PricingSection />

        {/* FAQ */}
        <FAQSection />

        {/* Contact Form */}
        <DemoFormSection />
      </main>
      <Footer />
      <FloatingWhatsAppButton />
      
      {/* WELCOME VIDEO MODAL - EASY KILL SWITCH */}
      <WelcomeVideoModal 
        isOpen={showWelcomeModal}
        onClose={handleCloseWelcomeModal}
      />

      {/* EXIT INTENT POPUP */}
      <ExitIntentPopup
        isOpen={showExitIntent}
        onClose={() => setShowExitIntent(false)}
      />

      {/* Botón para reabrir modal - SIEMPRE VISIBLE */}
      <button
        onClick={reopenWelcomeModal}
        className="fixed bottom-24 right-6 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg shadow-lg text-sm font-bold z-40 transition-all transform hover:scale-105"
        title="Reabrir modal de bienvenida (o presiona Ctrl+Shift+M)"
      >
        Reabrir Modal
      </button>
    </div>
  );
}

export default App;
