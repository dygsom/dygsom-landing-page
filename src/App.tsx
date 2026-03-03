import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { ScanPage } from './pages/ScanPage';
import { ScanProgressPage } from './pages/ScanProgressPage';
import { ResultsPage } from './pages/ResultsPage';
import { NotFoundPage } from './pages/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/scan" element={<ScanPage />} />
        <Route path="/scan/:scanId" element={<ScanProgressPage />} />
        <Route path="/results/:scanId" element={<ResultsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
