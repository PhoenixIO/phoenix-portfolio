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

const Preloader: React.FC = () => {
  const [loadingMessage, setLoadingMessage] = useState<string>("");
  
  useEffect(() => {
    const messages = [
      "Preparing cosmic journey...",
      "Calculating the meaning of life...",
      "Brewing cosmic coffee...",
      "Convincing electrons to move faster...",
      "Teaching hamsters to power our servers...",
      "Generating random excuses for the delay...",
      "Searching for the internet's sense of humor...",
      "Untangling quantum knots...",
      "Aligning digital chakras...",
      "Reticulating splines...",
      "Warming up the flux capacitor...",
      "Debugging unicorn code...",
      "Adjusting the space-time continuum...",
      "Feeding the pixel gremlins...",
      "Loading cosmic particles..."
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    setLoadingMessage(randomMessage);
  }, []);
  
  return (
    <div className="preloader">
      <div className="loader"></div>
      <div className="loader-text">{loadingMessage}</div>
    </div>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [contentReady, setContentReady] = useState(false);

  useEffect(() => {
    // Immediately start loading content
    document.body.style.overflow = 'hidden';

    const prepareContent = async () => {
      try {
        // In a real app, we might preload images, fonts, or other assets here
        // For this demo, we'll just wait a bit
        await new Promise(resolve => setTimeout(resolve, 500));
        setContentReady(true);
      } catch (error) {
        console.error("Error preparing content:", error);
        setContentReady(true); // Show content even if there's an error
      }
    };

    prepareContent();
    
    // Minimum display time for preloader (for UX purposes)
    const minimumLoadingTime = setTimeout(() => {
      if (contentReady) hidePreloader();
    }, 1500);
    
    return () => {
      clearTimeout(minimumLoadingTime);
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    if (contentReady) hidePreloader();
  }, [contentReady]);
  
  // Smooth transition from preloader to content
  const hidePreloader = () => {
    const preloader = document.querySelector('.preloader');
    
    if (preloader) {
      // Create a sequence of animations for smooth transition
      gsap.timeline()
        .to('.loader', {
          scale: 1.2,
          duration: 0.3,
          ease: 'power2.in'
        })
        .to('.preloader', {
          opacity: 0,
          duration: 0.8,
          ease: 'power2.inOut',
          onComplete: () => {
            setIsLoading(false);
            document.body.style.overflow = '';
          }
        });
    }
  };

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