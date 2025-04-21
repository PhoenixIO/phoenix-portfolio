import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Реєструємо плагін
gsap.registerPlugin(ScrollTrigger);

// Основні ефекти для скролл-анімацій
export const scrollEffects = {
  // Ефект паралаксу (елементи рухаються з різною швидкістю)
  parallax: (
    elementSelector: string, 
    scrollContainer: string = '.roadmap-page', 
    speed: number = 0.2
  ) => {
    gsap.to(elementSelector, {
      scrollTrigger: {
        trigger: scrollContainer,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      },
      y: () => {
        return window.innerHeight * speed;
      },
      ease: 'none'
    });
  },
  
  // Ефект fade-in при скролі
  fadeIn: (
    elementSelector: string, 
    triggerSelector: string = elementSelector, 
    start: string = 'top 80%'
  ) => {
    gsap.fromTo(
      elementSelector,
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: triggerSelector,
          start,
          toggleActions: 'play none none reverse'
        }
      }
    );
  },
  
  // Ефект reveal (розкриття контенту)
  reveal: (
    elementSelector: string, 
    triggerSelector: string = elementSelector, 
    direction: 'left' | 'right' | 'top' | 'bottom' = 'bottom'
  ) => {
    const config = {
      left: { x: -100, y: 0 },
      right: { x: 100, y: 0 },
      top: { x: 0, y: -100 },
      bottom: { x: 0, y: 100 }
    };
    
    gsap.fromTo(
      elementSelector,
      { 
        opacity: 0, 
        x: config[direction].x, 
        y: config[direction].y 
      },
      { 
        opacity: 1, 
        x: 0, 
        y: 0, 
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: triggerSelector,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  },
  
  // Ефект прогрес-бару
  progressBar: (
    elementSelector: string, 
    triggerSelector: string = elementSelector, 
    value: number = 100
  ) => {
    gsap.fromTo(
      elementSelector,
      { width: '0%' },
      {
        width: `${value}%`,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: triggerSelector,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  },
  
  // Ефект "pin" - фіксує елемент під час скролу
  pin: (
    elementSelector: string, 
    duration: number = 1
  ) => {
    ScrollTrigger.create({
      trigger: elementSelector,
      start: 'top top',
      end: `+=${duration * 100}%`,
      pin: true,
      pinSpacing: true
    });
  },
  
  // Ефект для покрокової анімації (корисно для елементів списку)
  stagger: (
    elementSelector: string, 
    triggerSelector: string,
    staggerTime: number = 0.2
  ) => {
    const elements = document.querySelectorAll(elementSelector);
    
    gsap.fromTo(
      elements,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: staggerTime,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: triggerSelector,
          start: 'top 80%'
        }
      }
    );
  }
};
