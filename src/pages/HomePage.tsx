import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SpaceBackground from '../components/home/SpaceBackground';
import '../styles/pages/HomePage.scss';

// Skill icon component with floating animation
const SkillIcons = () => {
  // Skills to display
  const skills = [
    { name: 'React', color: '#61DAFB' },
    { name: 'TypeScript', color: '#3178C6' },
    { name: 'Node.js', color: '#339933' },
    { name: 'SASS', color: '#CC6699' },
    { name: 'C++', color: '#00599C' },
    { name: 'Python', color: '#3776AB' }
  ];

  return (
    <div className="floating-skills">
      {skills.map((skill, index) => (
        <motion.div
          key={skill.name}
          className="skill-icon"
          initial={{ 
            x: 0, 
            y: 0,
            opacity: 0.7
          }}
          animate={{
            x: Math.sin((index + 1) * 0.5) * 30,
            y: Math.cos((index + 1) * 0.8) * 30,
            opacity: 0.7,
            rotateZ: Math.sin((index + 2) * 0.3) * 5
          }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 3 + index * 0.5,
            ease: "easeInOut"
          }}
          whileHover={{
            scale: 1.2,
            opacity: 1,
            rotateZ: 0,
            transition: { duration: 0.3 }
          }}
          style={{
            background: `${skill.color}20`,
            border: `2px solid ${skill.color}`
          }}
        >
          {skill.name}
        </motion.div>
      ))}
    </div>
  );
};

// Social links component
const SocialLinks = () => {
  return (
    <motion.div 
      className="social-links"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.7 }}
    >
      <a 
        href="https://github.com/yourusername" 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="GitHub"
        className="social-link"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
        </svg>
      </a>
      
      <a 
        href="https://t.me/yourusername" 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="Telegram"
        className="social-link"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21.198 2.433a2.242 2.242 0 0 0-1.022.215l-16.55 6.62a3.042 3.042 0 0 0-.1 5.411l4.095 1.638 1.59 5.322a2.278 2.278 0 0 0 1.855 1.486 2.212 2.212 0 0 0 2.039-.689l2.996-2.996 5.845 4.385a2.279 2.279 0 0 0 3.189-.801l3.742-7.483a2.242 2.242 0 0 0-1.304-3.102"></path>
          <path d="M7.333 10.902L15.5 7l-2 6.5-6.167 3.402z"></path>
        </svg>
      </a>
    </motion.div>
  );
};

// Experience stats component
const ExperienceStats = () => {
  return (
    <motion.div 
      className="stats-container"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
    >
      <div className="stat-item">
        <span className="stat-number">+12</span>
        <span className="stat-label">Years of Experience</span>
      </div>
      <div className="stat-item">
        <span className="stat-number">+46</span>
        <span className="stat-label">Projects Completed</span>
      </div>
      <div className="stat-item">
        <span className="stat-number">+20</span>
        <span className="stat-label">Worldwide Clients</span>
      </div>
    </motion.div>
  );
};

const HomePage: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  
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
          className="home-subtitle"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Software Engineer
        </motion.p>
        
        <motion.p 
          className="home-description"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Passionate about creating intuitive and engaging user experiences. 
          Specialize in transforming ideas into beautifully crafted products.
        </motion.p>
        
        <ExperienceStats />
        
        <SkillIcons />
        
        <motion.div 
          className="cta-buttons"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Link to="/projects" className="start-journey-btn">
            View Projects
          </Link>
          <Link to="/contact" className="contact-btn">
            Contact Me
          </Link>
        </motion.div>
        
        <SocialLinks />
      </motion.div>
    </div>
  );
}

export default HomePage;