import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ExperienceProvider } from './context/ExperienceContext';
import { TextureOverlay } from './components/ui/TextureOverlay';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';

export default function App() {
  return (
    <ExperienceProvider>
      <TextureOverlay />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/acerca" element={<AboutPage />} />
        </Routes>
      </BrowserRouter>
    </ExperienceProvider>
  );
}