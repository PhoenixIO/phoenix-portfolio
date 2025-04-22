import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import ThemeSwitcher from '../common/ThemeSwitcher';
import './Header.scss';

interface NavLink {
  title: string;
  path: string;
}

const navLinks: NavLink[] = [
  { title: 'Main', path: '/' },
  { title: 'Technology', path: '/roadmap' },
  { title: 'Projects', path: '/projects' },
  { title: 'Contact', path: '/contact' }
];

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  // Відстежуємо скролл для зміни стилю шапки
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Анімація для меню на мобільних
  useEffect(() => {
    if (isMenuOpen) {
      // Анімація появи мобільного меню
      gsap.to('.mobile-menu', {
        x: 0,
        duration: 0.3,
        ease: 'expo.out'
      });
      
      // Блокуємо скролл сторінки
      document.body.style.overflow = 'hidden';
    } else {
      // Анімація зникнення мобільного меню
      gsap.to('.mobile-menu', {
        x: '100%',
        duration: 0.3,
        ease: 'expo.in'
      });
      
      // Розблоковуємо скролл сторінки
      document.body.style.overflow = '';
    }
  }, [isMenuOpen]);
  
  // Закриваємо меню при зміні шляху
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);
  
  // Перемикання мобільного меню
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <Link to="/" className="logo">
          <span className="logo-text">PhoenixStudio</span>
        </Link>
        
        <nav className="desktop-nav">
          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.path} className={location.pathname === link.path ? 'active' : ''}>
                <Link to={link.path}>{link.title}</Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="header-right">
          <ThemeSwitcher />
          
          <button 
            className={`menu-toggle ${isMenuOpen ? 'open' : ''}`} 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
      </div>
      
      {/* Мобільне меню */}
      <div className="mobile-menu">
        <nav className="mobile-nav">
          <ul className="mobile-nav-links">
            {navLinks.map((link) => (
              <li key={link.path} className={location.pathname === link.path ? 'active' : ''}>
                <Link to={link.path}>{link.title}</Link>
              </li>
            ))}
          </ul>
          
          <div className="mobile-theme-switcher">
            <ThemeSwitcher />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;