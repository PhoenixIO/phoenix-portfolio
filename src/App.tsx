import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RoadmapPage from './pages/RoadmapPage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';
import Layout from './components/layout/Layout';
import { ThemeProvider } from './context/ThemeContext';
import { gsap } from 'gsap';
import './styles/preloader.scss';

// Компонент прелоадера для початкового завантаження
const Preloader: React.FC = () => {
  return (
    <div className="preloader">
      <div className="loader"></div>
      <div className="loader-text">Готуємо космічну подорож...</div>
    </div>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  
  // Імітація завантаження ресурсів
  useEffect(() => {
    // Імітуємо завантаження важких ресурсів (3D моделі, текстури, тощо)
    const timer = setTimeout(() => {
      const preloader = document.querySelector('.preloader');
      
      if (preloader) {
        // Анімуємо зникнення прелоадера
        gsap.to(preloader, {
          opacity: 0,
          duration: 0.5,
          onComplete: () => {
            setIsLoading(false);
          }
        });
      }
    }, 2000); // 2 секунди для демонстрації
    
    return () => clearTimeout(timer);
  }, []);

  // Компонент з анімацією переходу між сторінками
  const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    useEffect(() => {
      // Анімація при завантаженні сторінки
      gsap.fromTo(
        '.page-content',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      );
    }, []);
    
    return <div className="page-content">{children}</div>;
  };

  return (
    <ThemeProvider>
      {isLoading ? (
        <Preloader />
      ) : (
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={
                <PageTransition>
                  <HomePage />
                </PageTransition>
              } />
              <Route path="/roadmap" element={
                <PageTransition>
                  <RoadmapPage />
                </PageTransition>
              } />
              <Route path="/projects" element={
                <PageTransition>
                  <ProjectsPage />
                </PageTransition>
              } />
              <Route path="/contact" element={
                <PageTransition>
                  <ContactPage />
                </PageTransition>
              } />
            </Routes>
          </Layout>
        </Router>
      )}
    </ThemeProvider>
  );
}

export default App;