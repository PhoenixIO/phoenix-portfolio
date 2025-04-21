import { useTheme } from '../../context/ThemeContext';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './ThemeSwitcher.scss';

const ThemeSwitcher: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const switcherRef = useRef<HTMLDivElement>(null);
  
  // Анімація при зміні теми
  useEffect(() => {
    if (!switcherRef.current) return;
    
    // Анімуємо перемикач
    gsap.to(switcherRef.current.querySelector('.switcher-thumb'), {
      x: isDark ? 0 : 22,
      backgroundColor: isDark ? '#5500ff' : '#ff9500',
      duration: 0.3,
      ease: 'power2.out'
    });
    
    // Анімуємо іконки
    gsap.to(switcherRef.current.querySelector('.moon-icon'), {
      opacity: isDark ? 1 : 0.3,
      scale: isDark ? 1 : 0.8,
      duration: 0.3
    });
    
    gsap.to(switcherRef.current.querySelector('.sun-icon'), {
      opacity: isDark ? 0.3 : 1,
      scale: isDark ? 0.8 : 1,
      duration: 0.3
    });
    
  }, [theme, isDark]);

  return (
    <div className="theme-switcher" ref={switcherRef}>
      <div className="switcher-icons">
        <div className="moon-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </div>
        <div className="sun-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        </div>
      </div>
      <div className="switcher-track" onClick={toggleTheme}>
        <div className="switcher-thumb"></div>
      </div>
    </div>
  );
};

export default ThemeSwitcher;
