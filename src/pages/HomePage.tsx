import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SpaceBackground from '../components/home/SpaceBackground';
import { contacts } from '@/data/contact';
import '../styles/pages/HomePage.scss';

// Skill icon component with floating animation
const SkillIcons = () => {
  const skills = [
    { name: 'React', color: '#61DAFB' },
    { name: 'NestJS', color: '#E0234E' },
    { name: 'Node.js', color: '#7BC74D' },
    { name: 'SASS', color: '#CD6799' },
    { name: 'Redux', color: '#764ABC' },
    { name: 'RestAPI', color: '#FF8F59' },
    { name: 'TypeScript', color: '#3178C6' },
    { name: 'MongoDB', color: '#47A248' },
    { name: 'ThreeJS', color: '#8C8DFC' },
    { name: 'PostgreSQL', color: '#336791' },
    { name: 'Tailwind CSS', color: '#38B2AC' },
    { name: 'C++', color: '#649AD2' },
    { name: 'WebSockets', color: '#7F7FFF' },
    { name: 'AI Integration', color: '#10A37F' },
    { name: 'Phaser', color: '#5DD3F8' },
    { name: 'Python', color: '#4B8BBE' },
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
            x: Math.sin((index + 1) * 0.5) * 40,
            y: Math.cos((index + 1) * 0.8) * 40,
            opacity: 0.8,
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

const SocialLinks = () => {
  return (
    <motion.div 
      className="social-links"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <a 
        href={contacts.github} 
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
        href={contacts.telegram}
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="Telegram"
        className="social-link"
      >
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M23.1117 4.49449C23.4296 2.94472 21.9074 1.65683 20.4317 2.227L2.3425 9.21601C0.694517 9.85273 0.621087 12.1572 2.22518 12.8975L6.1645 14.7157L8.03849 21.2746C8.13583 21.6153 8.40618 21.8791 8.74917 21.968C9.09216 22.0568 9.45658 21.9576 9.70712 21.707L12.5938 18.8203L16.6375 21.8531C17.8113 22.7334 19.5019 22.0922 19.7967 20.6549L23.1117 4.49449ZM3.0633 11.0816L21.1525 4.0926L17.8375 20.2531L13.1 16.6999C12.7019 16.4013 12.1448 16.4409 11.7929 16.7928L10.5565 18.0292L10.928 15.9861L18.2071 8.70703C18.5614 8.35278 18.5988 7.79106 18.2947 7.39293C17.9906 6.99479 17.4389 6.88312 17.0039 7.13168L6.95124 12.876L3.0633 11.0816ZM8.17695 14.4791L8.78333 16.6015L9.01614 15.321C9.05253 15.1209 9.14908 14.9366 9.29291 14.7928L11.5128 12.573L8.17695 14.4791Z" fill="#FFFFFF"></path>
      </svg>
      </a>
    </motion.div>
  );
};

const ExperienceStats = () => {
  return (
    <motion.div 
      className="stats-container"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
    >
      <div className="stat-item">
        <span className="stat-number">+4</span>
        <span className="stat-label">Years of Experience</span>
      </div>
      <div className="stat-item">
        <span className="stat-number">+17</span>
        <span className="stat-label">Projects Completed</span>
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
        <div className="hero-section">
          <motion.h1 
            className="home-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Matviichuk Kostiantyn
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
          
          <motion.div 
            className="action-container"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="cta-buttons">
              <Link to="/projects" className="start-journey-btn">
                View Projects
              </Link>
              <Link to="/contact" className="contact-btn">
                Contact Me
              </Link>
            </div>
            
            <SocialLinks />
          </motion.div>
        </div>
        
        <div className="skills-section">
          <SkillIcons />
        </div>
      </motion.div>
    </div>
  );
}

export default HomePage;