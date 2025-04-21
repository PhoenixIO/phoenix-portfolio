import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Реєструємо плагін GSAP
gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimationOptions {
  trigger: string;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  markers?: boolean;
  animation: gsap.TweenVars;
  target: string;
}

export const useScrollAnimation = (animations: ScrollAnimationOptions[]) => {
  useEffect(() => {
    // Створюємо анімації скроллінгу
    const scrollTriggers = animations.map(({
      trigger,
      start = 'top 80%',
      end = 'bottom 20%',
      scrub = false,
      markers = false,
      animation,
      target
    }) => {
      const tween = gsap.to(target, animation);
      
      return ScrollTrigger.create({
        trigger,
        start,
        end,
        scrub,
        markers,
        animation: tween
      });
    });
    
    // Очищуємо ScrollTrigger при розмонтуванні
    return () => {
      scrollTriggers.forEach(trigger => trigger.kill());
    };
  }, [animations]);
};