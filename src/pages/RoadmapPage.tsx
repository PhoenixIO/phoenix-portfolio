import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skills } from '../data/skills';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { scrollEffects } from '../utils/scrollUtils';
import '../styles/pages/RoadmapPage.scss';

// Реєструємо плагін ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const RoadmapPage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);
  
  // Налаштовуємо скролл-анімації
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Анімуємо заголовок та текст
    scrollEffects.fadeIn('.roadmap-header');
    
    // Паралакс-ефект для фону
    scrollEffects.parallax('.parallax-bg', '.roadmap-page', 0.3);
    
    // Анімуємо з'єднувальну лінію (timeline)
    gsap.fromTo(
      '.timeline',
      { height: 0 },
      { 
        height: '100%', 
        duration: 2,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: '.roadmap-container',
          start: 'top 50%',
          end: 'bottom 50%',
          scrub: 1
        }
      }
    );
    
    // Додаємо анімації для категорій
    document.querySelectorAll('.category-section').forEach((section, index) => {
      scrollEffects.reveal(
        section as HTMLElement, 
        section as HTMLElement, 
        index % 2 === 0 ? 'left' : 'right'
      );
    });
    
    // Для кожної навички анімуємо прогрес-бар
    document.querySelectorAll('.skill-item').forEach((item) => {
      const level = item.getAttribute('data-level') || '0';
      
      scrollEffects.progressBar(
        item.querySelector('.progress-bar-fill') as HTMLElement,
        item as HTMLElement,
        parseInt(level)
      );
      
      // Пульсуюча анімація для іконки
      const icon = item.querySelector('.icon-placeholder');
      
      if (icon) {
        ScrollTrigger.create({
          trigger: item,
          start: 'top 70%',
          onEnter: () => {
            gsap.to(icon, {
              scale: 1.2,
              duration: 0.5,
              repeat: 1,
              yoyo: true,
              ease: 'power2.inOut'
            });
          },
          once: true
        });
      }
    });
    
    // Очищуємо ScrollTrigger при розмонтуванні компонента
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Групуємо навички за категоріями для кращої візуалізації
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  // Назви категорій для відображення
  const categoryNames: Record<string, string> = {
    frontend: 'Frontend',
    backend: 'Backend',
    language: 'Мови програмування',
    tooling: 'Інструменти розробки'
  };
  
  // Функція для додавання секцій до refs
  const addSectionRef = (el: HTMLDivElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <div className="roadmap-page" ref={containerRef}>
      <div className="parallax-bg"></div>
      
      <div className="roadmap-header">
        <h1>Моя технологічна подорож</h1>
        <p>Прокрутіть вниз, щоб дослідити мої навички та технології</p>
      </div>
      
      <div className="roadmap-container">
        <div className="timeline" ref={timelineRef}></div>
        
        {Object.entries(skillsByCategory).map(([category, categorySkills], categoryIndex) => (
          <div 
            key={category} 
            className="category-section"
            ref={addSectionRef}
          >
            <h2 className="category-title">{categoryNames[category] || category}</h2>
            
            <div className="skills-wrapper">
              {categorySkills.map((skill, index) => (
                <div 
                  key={skill.id} 
                  className={`skill-item ${index % 2 === 0 ? 'left' : 'right'}`}
                  data-level={skill.level}
                >
                  <div className="skill-content">
                    <div className="skill-icon">
                      <div className="icon-placeholder">{skill.name.charAt(0)}</div>
                    </div>
                    
                    <h3 className="skill-name">{skill.name}</h3>
                    <p className="skill-description">{skill.description}</p>
                    
                    <div className="skill-progress">
                      <div className="progress-bar">
                        <div className="progress-bar-fill" style={{ width: 0 }}></div>
                      </div>
                      <span className="skill-level">{skill.level}%</span>
                    </div>
                  </div>
                  
                  <div className="connector"></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="navigation-buttons">
        <Link to="/" className="nav-btn prev-btn">На головну</Link>
        <Link to="/projects" className="nav-btn next-btn">Мої проєкти</Link>
      </div>
    </div>
  );
};

export default RoadmapPage;
