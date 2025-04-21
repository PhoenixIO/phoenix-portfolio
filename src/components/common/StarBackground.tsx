import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useThreeScene } from '../../hooks/useThreeScene';
import './StarBackground.scss';

interface StarBackgroundProps {
  starCount?: number;
  starSize?: number;
  starColor?: string;
  depth?: number;
  parallaxIntensity?: number;
}

const StarBackground: React.FC<StarBackgroundProps> = ({
  starCount = 2000,
  starSize = 0.1,
  starColor = '#ffffff',
  depth = 50,
  parallaxIntensity = 0.05
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<THREE.Points | null>(null);
  const mousePosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  
  const { scene, animate, stopAnimation } = useThreeScene(containerRef as React.RefObject<HTMLElement>);
  
  // Створюємо зірки та додаємо їх до сцени
  useEffect(() => {
    if (!scene) return;
    
    // Геометрія зірок (частинок)
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({
      color: starColor,
      size: starSize,
      sizeAttenuation: true
    });
    
    // Створюємо позиції зірок
    const positions = new Float32Array(starCount * 3);
    
    for (let i = 0; i < starCount * 3; i += 3) {
      // Випадкова позиція в просторі
      positions[i] = (Math.random() - 0.5) * depth;      // x
      positions[i + 1] = (Math.random() - 0.5) * depth;  // y
      positions[i + 2] = (Math.random() - 0.5) * depth;  // z
    }
    
    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    // Створюємо зірки
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);
    starsRef.current = stars;
    
    // Обробник руху миші для паралакс-ефекту
    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      };
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Запускаємо анімацію
    animate((time) => {
      if (starsRef.current) {
        // Базове обертання
        starsRef.current.rotation.x += 0.0001;
        starsRef.current.rotation.y += 0.0001;
        
        // Паралакс-ефект при русі миші
        starsRef.current.rotation.x += (mousePosition.current.y * parallaxIntensity - starsRef.current.rotation.x) * 0.05;
        starsRef.current.rotation.y += (mousePosition.current.x * parallaxIntensity - starsRef.current.rotation.y) * 0.05;
        
        // Пульсація звізд (легке масштабування туди-сюди)
        const pulsation = Math.sin(time * 0.001) * 0.02 + 1;
        starsRef.current.scale.set(pulsation, pulsation, pulsation);
      }
    });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      stopAnimation();
      
      // Очищуємо ресурси
      if (starsRef.current) {
        scene.remove(starsRef.current);
        starGeometry.dispose();
        starMaterial.dispose();
      }
    };
  }, [scene, animate, stopAnimation, starCount, starSize, starColor, depth, parallaxIntensity]);
  
  return <div ref={containerRef} className="star-background"></div>;
};

export default StarBackground;
