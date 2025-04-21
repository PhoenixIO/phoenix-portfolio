import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import SpaceBackground from '../components/home/SpaceBackground';
import { animations } from '../utils/animations';
import '../styles/pages/HomePage.scss';

const HomePage: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Анімуємо контент при завантаженні
  useEffect(() => {
    if (!contentRef.current) return;
    
    const title = contentRef.current.querySelector('.home-title') as HTMLElement;
    const description = contentRef.current.querySelector('.home-description') as HTMLElement;
    const button = contentRef.current.querySelector('.start-journey-btn') as HTMLElement;
    
    // Анімації появи елементів з затримкою
    if (title) animations.fadeInUp(title, 0.2, 1);
    if (description) animations.fadeInUp(description, 0.5, 1);
    if (button) animations.fadeInUp(button, 0.8, 1);
    
    // Додаємо анімацію пульсації для кнопки
    if (button) {
      gsap.to(button, {
        scale: 1.05,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });
    }
  }, []);

  return (
    <div className="home-page">
      {/* Використовуємо новий компонент SpaceBackground замість простої Three.js сцени */}
      <SpaceBackground />
      
      <div className="content-container" ref={contentRef}>
        <h1 className="home-title">Ваше Ім'я</h1>
        <p className="home-description">
          Фронтенд розробник, який створює вражаючі інтерактивні веб-додатки з використанням сучасних технологій
        </p>
        <div className="cta-buttons">
          <Link to="/roadmap" className="start-journey-btn">
            Почати подорож
          </Link>
          <Link to="/contact" className="contact-btn">
            Зв'язатися зі мною
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;