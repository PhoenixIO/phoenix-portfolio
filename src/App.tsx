import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RoadmapPage from './pages/RoadmapPage';
import ProjectsPage from './pages/ProjectsPage';
import ContactPage from './pages/ContactPage';
import Layout from './components/layout/Layout';
import Preloader from './components/common/Preloader';
import { ThemeProvider } from './context/ThemeContext';
import { gsap } from 'gsap';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [contentReady, setContentReady] = useState(false);
  const animationCompleted = useRef(false);

  useEffect(() => {
    console.log("Initial setup - setting overflow to hidden");
    document.body.style.overflow = 'hidden';

    const prepareContent = async () => {
      try {
        // In a real app, we might preload images, fonts, or other assets here
        await new Promise(resolve => setTimeout(resolve, 500));
        console.log("Content preparation complete");
        setContentReady(true);
      } catch (error) {
        console.error("Error preparing content:", error);
        setContentReady(true); // Show content even if there's an error
      }
    };

    prepareContent();
    
    // Minimum display time for preloader
    const minimumLoadingTime = setTimeout(() => {
      console.log("Minimum loading time reached");
      if (contentReady && !animationCompleted.current) {
        hidePreloader();
      }
    }, 1500);
    
    return () => {
      clearTimeout(minimumLoadingTime);
    };
  }, []);

  useEffect(() => {
    if (contentReady && !animationCompleted.current) {
      console.log("Content ready, triggering preloader hide");
      hidePreloader();
    }
  }, [contentReady]);
  
  // Smooth transition from preloader to content
  const hidePreloader = () => {
    if (animationCompleted.current) {
      console.log("Animation already completed, skipping");
      return;
    }

    const preloader = document.querySelector('.preloader');
    
    if (preloader) {
      console.log("Starting preloader hide animation");

      // Create a timeline and store its reference
      const tl = gsap.timeline();

      // Add animations to the timeline
      tl.to('.loader', {
        scale: 1.2,
        duration: 0.3,
        ease: 'power2.in'
      })
      .to('.preloader', {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut',
        onStart: () => {
          console.log("Preloader fade-out animation started");
        },
        onComplete: () => {
          console.log("Preloader animation complete");
          animationCompleted.current = true;
          setIsLoading(false);
          // Use the correct value for overflow ('' or 'auto', not 'none')
          document.body.style.overflow = '';
          console.log("Set isLoading to false, overflow reset");
        }
      });
    } else {
      console.warn("Preloader element not found in DOM");
      // Fallback in case preloader element isn't found
      animationCompleted.current = true;
      setIsLoading(false);
      document.body.style.overflow = '';
    }
  };

  // Page transition animation component
  const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    useEffect(() => {
      // Animation when loading the page
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