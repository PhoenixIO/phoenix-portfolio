import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SpaceBackground from '../components/home/SpaceBackground';
import '../styles/pages/HomePage.scss';

const HomePage: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Animate content on load
  useEffect(() => {
    if (!contentRef.current) return;
  }, []);

  return (
    <div className="home-page">
      <SpaceBackground />
      
      <motion.div 
        className="content-container" 
        ref={contentRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0 }}
      >
        <motion.h1 
          className="home-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Ваше Ім'я
        </motion.h1>
        
        <motion.p 
          className="home-description"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Фронтенд розробник, який створює вражаючі інтерактивні веб-додатки з використанням сучасних технологій
        </motion.p>
        
        <motion.div 
          className="cta-buttons"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Link to="/roadmap" className="start-journey-btn">
            Почати подорож
          </Link>
          <Link to="/contact" className="contact-btn">
            Зв'язатися зі мною
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default HomePage;