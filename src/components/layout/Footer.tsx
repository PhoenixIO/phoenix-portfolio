import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaTelegram, FaEnvelope } from 'react-icons/fa';
import { contacts } from '@/data/contacts';
import './Footer.scss';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-info">
            <h2 className="footer-name">{contacts.fullname}</h2>
            <p className="footer-role">Fullstack Web Developer & Software Engineer</p>
            <p className="footer-description">
              Creating clean, user-friendly solutions with modern web technologies.
            </p>
          </div>
          
          <div className="footer-nav">
            <div className="footer-section">
              <h3>Navigation</h3>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/roadmap">Technologies</Link></li>
                <li><Link to="/projects">Projects</Link></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h3>Contact</h3>
              <div className="social-links">
                <a href={`mailto:${contacts.email}`} aria-label="Email">
                  <FaEnvelope />
                  <span>{contacts.email}</span>
                </a>
                <a href={contacts.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <FaGithub />
                  <span>{contacts.github.split('/').pop()}</span>
                </a>
                <a href={contacts.telegram} target="_blank" rel="noopener noreferrer" aria-label="Telegram">
                  <FaTelegram />
                  <span>{contacts.telegram.split('/').pop()}</span>
                </a>
                <a href={contacts.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <FaLinkedin />
                  <span>{contacts.linkedin.split('/in/')[1]?.replace('/', '')}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} {contacts.fullname}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;