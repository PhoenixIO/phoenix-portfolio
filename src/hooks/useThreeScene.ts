import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ThreeSceneOptions {
  cameraPosition?: THREE.Vector3;
  clearColor?: string | number;
  alpha?: boolean;
  antialias?: boolean;
}

interface ThreeSceneResult {
  scene: THREE.Scene | null;
  camera: THREE.PerspectiveCamera | null;
  renderer: THREE.WebGLRenderer | null;
  rendererDomElement: HTMLCanvasElement | null;
  animate: (callback: (time: number) => void) => void;
  stopAnimation: () => void;
}

export const useThreeScene = (
  containerRef: React.RefObject<HTMLElement>,
  {
    cameraPosition = new THREE.Vector3(0, 0, 5),
    clearColor = 0x000000,
    alpha = true,
    antialias = true
  }: ThreeSceneOptions = {}
): ThreeSceneResult => {
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const rendererDomElementRef = useRef<HTMLCanvasElement | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Створення та ініціалізація сцени Three.js
  useEffect(() => {
    if (!containerRef.current || isInitialized) return;

    // Створюємо сцену
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Створюємо камеру
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.copy(cameraPosition);
    cameraRef.current = camera;

    // Створюємо рендерер
    const renderer = new THREE.WebGLRenderer({ 
      alpha, 
      antialias 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    if (!alpha) {
      renderer.setClearColor(clearColor);
    }
    
    // Додаємо canvas до контейнера
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    rendererDomElementRef.current = renderer.domElement;

    // Розмір сцени при зміні розміру вікна
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);
    setIsInitialized(true);

    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (animationIdRef.current !== null) {
        cancelAnimationFrame(animationIdRef.current);
      }
      
      if (renderer.domElement && containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      // Очищуємо ресурси
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [containerRef, cameraPosition, clearColor, alpha, antialias, isInitialized]);

  // Функція анімації
  const animate = (callback: (time: number) => void) => {
    if (!rendererRef.current || !sceneRef.current || !cameraRef.current) return;
    
    const animateFrame = (time: number) => {
      callback(time);
      
      rendererRef.current?.render(sceneRef.current!, cameraRef.current!);
      animationIdRef.current = requestAnimationFrame(animateFrame);
    };
    
    animationIdRef.current = requestAnimationFrame(animateFrame);
  };

  // Зупинка анімації
  const stopAnimation = () => {
    if (animationIdRef.current !== null) {
      cancelAnimationFrame(animationIdRef.current);
      animationIdRef.current = null;
    }
  };

  return {
    scene: sceneRef.current,
    camera: cameraRef.current,
    renderer: rendererRef.current,
    rendererDomElement: rendererDomElementRef.current,
    animate,
    stopAnimation
  };
};