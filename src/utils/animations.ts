import { gsap } from 'gsap';

// Типові анімації для повторного використання
export const animations = {
  // Анімація появи з затуханням
  fadeIn: (element: string | HTMLElement, delay = 0, duration = 1) => {
    return gsap.fromTo(
      element,
      { opacity: 0 },
      { 
        opacity: 1, 
        duration, 
        delay,
        ease: 'power2.out' 
      }
    );
  },
  
  // Анімація появи з рухом знизу
  fadeInUp: (element: string | HTMLElement, delay = 0, duration = 1, distance = 50) => {
    return gsap.fromTo(
      element,
      { opacity: 0, y: distance },
      { 
        opacity: 1, 
        y: 0, 
        duration, 
        delay,
        ease: 'power3.out' 
      }
    );
  },
  
  // Анімація появи з рухом зліва
  fadeInLeft: (element: string | HTMLElement, delay = 0, duration = 1, distance = 50) => {
    return gsap.fromTo(
      element,
      { opacity: 0, x: -distance },
      { 
        opacity: 1, 
        x: 0, 
        duration, 
        delay,
        ease: 'power3.out' 
      }
    );
  },
  
  // Анімація появи з рухом справа
  fadeInRight: (element: string | HTMLElement, delay = 0, duration = 1, distance = 50) => {
    return gsap.fromTo(
      element,
      { opacity: 0, x: distance },
      { 
        opacity: 1, 
        x: 0, 
        duration, 
        delay,
        ease: 'power3.out' 
      }
    );
  },
  
  // Анімація пульсації (для привернення уваги)
  pulse: (element: string | HTMLElement, delay = 0, duration = 0.5, scale = 1.05) => {
    return gsap.fromTo(
      element,
      { scale: 1 },
      { 
        scale: scale, 
        duration: duration / 2, 
        delay,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: 1 
      }
    );
  },
  
  // Анімація мерехтіння
  blink: (element: string | HTMLElement, delay = 0, duration = 1, opacity = 0.5) => {
    return gsap.fromTo(
      element,
      { opacity: 1 },
      { 
        opacity: opacity, 
        duration: duration / 2, 
        delay,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: 1 
      }
    );
  }
};
