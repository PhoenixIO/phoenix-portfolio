import { Link } from 'react-router-dom';
import './Footer.scss';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-logo">
            <span className="logo-text">YourName</span>
            <p className="tagline">Web Developer & UI Designer</p>
          </div>
          
          <div className="footer-links">
            <div className="links-group">
              <h3>Навігація</h3>
              <ul>
                <li><Link to="/">Головна</Link></li>
                <li><Link to="/roadmap">Технології</Link></li>
                <li><Link to="/projects">Проєкти</Link></li>
              </ul>
            </div>
            
            <div className="links-group">
              <h3>Контакти</h3>
              <ul>
                <li><a href="mailto:your.email@example.com">your.email@example.com</a></li>
                <li><a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                <li><a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} YourName. Всі права захищені.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;