import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './SpaceBackground.scss';

interface SpaceBackgroundProps {
  interactive?: boolean;
}

const SpaceBackground: React.FC<SpaceBackgroundProps> = ({ interactive = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const starsRef = useRef<THREE.Points | null>(null);
  const nebulaRef = useRef<THREE.Points | null>(null);
  const planetsRef = useRef<THREE.Group | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    // Створюємо сцену
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Налаштування камери
    const aspectRatio = window.innerWidth / window.innerHeight;
    const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
    camera.position.z = 15;
    cameraRef.current = camera;

    // Налаштування рендерера
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Створення зірок
    const createStars = () => {
      const starGeometry = new THREE.BufferGeometry();
      const starCount = 2000;
      const positions = new Float32Array(starCount * 3);
      const sizes = new Float32Array(starCount);
      const colors = new Float32Array(starCount * 3);

      for (let i = 0; i < starCount; i++) {
        const i3 = i * 3;
        // Розподіляємо зірки у сферичній формі навколо камери
        const radius = 50 + Math.random() * 50;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;

        positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i3 + 2] = radius * Math.cos(phi);

        // Випадковий розмір для кожної зірки
        sizes[i] = Math.random() * 1.5;

        // Колір зірок з відтінками синього та фіолетового
        const colorChoice = Math.random();
        if (colorChoice > 0.9) {
          // Блакитні зірки
          colors[i3] = 0.7;
          colors[i3 + 1] = 0.8;
          colors[i3 + 2] = 1;
        } else if (colorChoice > 0.8) {
          // Фіолетові зірки
          colors[i3] = 0.8;
          colors[i3 + 1] = 0.6;
          colors[i3 + 2] = 1;
        } else if (colorChoice > 0.7) {
          // Жовтуваті зірки
          colors[i3] = 1;
          colors[i3 + 1] = 0.9;
          colors[i3 + 2] = 0.7;
        } else {
          // Білі зірки
          colors[i3] = 1;
          colors[i3 + 1] = 1;
          colors[i3 + 2] = 1;
        }
      }

      starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      starGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
      starGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      // Вертексний шейдер для точок
      const vertexShader = `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `;

      // Фрагментний шейдер для точок з ефектом світіння
      const fragmentShader = `
        varying vec3 vColor;
        void main() {
          float distance = length(gl_PointCoord - vec2(0.5, 0.5));
          if (distance > 0.5) discard;
          gl_FragColor = vec4(vColor, 1.0) * (1.0 - distance * 2.0);
        }
      `;

      const starMaterial = new THREE.ShaderMaterial({
        uniforms: {},
        vertexShader,
        fragmentShader,
        transparent: true,
        blending: THREE.AdditiveBlending
      });

      const stars = new THREE.Points(starGeometry, starMaterial);
      scene.add(stars);
      starsRef.current = stars;
    };

    // Створення туманності
    const createNebula = () => {
      const nebulaGeometry = new THREE.BufferGeometry();
      const particleCount = 500;
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const sizes = new Float32Array(particleCount);

      // Основні кольори туманності
      const nebulaColors = [
        new THREE.Color(0x5500ff), // фіолетовий
        new THREE.Color(0x00ddff), // блакитний
        new THREE.Color(0xff00aa)  // рожевий
      ];

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        
        // Розміщуємо частинки туманності у формі спіралі
        const angle = (i / particleCount) * Math.PI * 10;
        const radius = Math.random() * 15 + 10;
        const spiral = Math.random() * 5;
        
        positions[i3] = Math.cos(angle) * radius + (Math.random() - 0.5) * spiral;
        positions[i3 + 1] = (Math.random() - 0.5) * 5;
        positions[i3 + 2] = Math.sin(angle) * radius + (Math.random() - 0.5) * spiral;

        // Інтерполюємо між кольорами туманності
        const color = nebulaColors[Math.floor(Math.random() * nebulaColors.length)];
        colors[i3] = color.r;
        colors[i3 + 1] = color.g;
        colors[i3 + 2] = color.b;

        // Різні розміри частинок
        sizes[i] = Math.random() * 5 + 2;
      }

      nebulaGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      nebulaGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      nebulaGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

      // Вертексний шейдер для туманності
      const vertexShader = `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `;

      // Фрагментний шейдер для ефекту світіння туманності
      const fragmentShader = `
        varying vec3 vColor;
        void main() {
          float distance = length(gl_PointCoord - vec2(0.5, 0.5));
          if (distance > 0.5) discard;
          float opacity = 0.3 * (1.0 - distance * 1.5);
          gl_FragColor = vec4(vColor, opacity);
        }
      `;

      const nebulaMaterial = new THREE.ShaderMaterial({
        uniforms: {},
        vertexShader,
        fragmentShader,
        transparent: true,
        blending: THREE.AdditiveBlending
      });

      const nebula = new THREE.Points(nebulaGeometry, nebulaMaterial);
      scene.add(nebula);
      nebulaRef.current = nebula;
    };

    // Створення планет
    const createPlanets = () => {
      const planetsGroup = new THREE.Group();
      
      // Функція для створення планети
      const createPlanet = (radius: number, color: number, wireframe: boolean, position: THREE.Vector3) => {
        const planetGeometry = new THREE.SphereGeometry(radius, 32, 32);
        const planetMaterial = new THREE.MeshBasicMaterial({ 
          color, 
          wireframe,
          transparent: true,
          opacity: 0.8
        });
        const planet = new THREE.Mesh(planetGeometry, planetMaterial);
        planet.position.copy(position);
        
        // Створюємо кільця для деяких планет
        if (Math.random() > 0.6) {
          const ringGeometry = new THREE.RingGeometry(radius * 1.3, radius * 1.7, 32);
          const ringMaterial = new THREE.MeshBasicMaterial({ 
            color, 
            wireframe: true,
            transparent: true,
            opacity: 0.5,
            side: THREE.DoubleSide
          });
          const ring = new THREE.Mesh(ringGeometry, ringMaterial);
          
          // Нахиляємо кільця
          ring.rotation.x = Math.PI / 2;
          ring.rotation.y = Math.random() * Math.PI / 4;
          
          planet.add(ring);
        }
        
        return planet;
      };
      
      // Створюємо кілька планет з різними параметрами
      const planets = [
        createPlanet(0.8, 0x00dbde, true, new THREE.Vector3(-12, 3, -10)),
        createPlanet(1.2, 0xfc00ff, true, new THREE.Vector3(15, -4, -15)),
        createPlanet(0.5, 0xffcc00, true, new THREE.Vector3(5, 8, -20)),
        createPlanet(1.5, 0x00ffaa, true, new THREE.Vector3(-8, -6, -25))
      ];
      
      // Додаємо планети до групи
      planets.forEach(planet => {
        // Зберігаємо дані для анімації
        planet.userData = {
          rotationSpeed: Math.random() * 0.01 + 0.005,
          orbitRadius: planet.position.length(),
          orbitSpeed: Math.random() * 0.0005 + 0.0002,
          initialAngle: Math.atan2(planet.position.z, planet.position.x),
          orbitCenter: new THREE.Vector3(0, planet.position.y, 0)
        };
        
        planetsGroup.add(planet);
      });
      
      scene.add(planetsGroup);
      planetsRef.current = planetsGroup;
    };

    // Ініціалізуємо елементи сцени
    createStars();
    createNebula();
    createPlanets();
    
    // Функція анімації
    const animate = () => {
      if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return;
      
      // Обертаємо зірки
      if (starsRef.current) {
        starsRef.current.rotation.y += 0.0001;
      }
      
      // Анімуємо туманність
      if (nebulaRef.current) {
        nebulaRef.current.rotation.y += 0.0002;
        
        // Змінюємо розмір туманності для ефекту пульсації
        const time = Date.now() * 0.0005;
        const scale = 1 + Math.sin(time) * 0.04;
        nebulaRef.current.scale.set(scale, scale, scale);
      }
      
      // Анімуємо планети
      if (planetsRef.current) {
        planetsRef.current.children.forEach(planet => {
          // Обертання навколо своєї осі
          planet.rotation.y += planet.userData.rotationSpeed;
          
          // Рух по орбіті
          const time = Date.now() * planet.userData.orbitSpeed;
          const angle = planet.userData.initialAngle + time;
          const radius = planet.userData.orbitRadius;
          
          planet.position.x = Math.cos(angle) * radius;
          planet.position.z = Math.sin(angle) * radius;
          
          // Анімуємо кільця, якщо вони є
          if (planet.children.length > 0) {
            planet.children[0].rotation.z += 0.001;
          }
        });
      }
      
      // Рух камери в залежності від положення миші (якщо інтерактивний режим)
      if (interactive && cameraRef.current) {
        // Плавно рухаємо камеру до цільової позиції
        cameraRef.current.position.x += (mouseRef.current.x * 2 - cameraRef.current.position.x) * 0.02;
        cameraRef.current.position.y += (mouseRef.current.y * 2 - cameraRef.current.position.y) * 0.02;
        
        // Спрямовуємо камеру на центр сцени
        cameraRef.current.lookAt(new THREE.Vector3(0, 0, 0));
      }
      
      // Рендеримо сцену
      rendererRef.current.render(sceneRef.current, cameraRef.current);
      
      // Продовжуємо анімаційний цикл
      animationIdRef.current = requestAnimationFrame(animate);
    };
    
    // Запускаємо анімацію
    animate();
    
    // Обробник руху миші для інтерактивності
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current = {
        x: (event.clientX / window.innerWidth - 0.5) * 0.5,
        y: (event.clientY / window.innerHeight - 0.5) * 0.5
      };
    };
    
    // Додаємо обробник руху миші, якщо включений інтерактивний режим
    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    
    // Обробник зміни розміру вікна
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      
      // Оновлюємо співвідношення сторін камери
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      
      // Оновлюємо розмір рендерера
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Очищення ресурсів при розмонтуванні компонента
    return () => {
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      window.removeEventListener('resize', handleResize);
      
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      
      if (rendererRef.current && rendererRef.current.domElement && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      
      // Очищуємо Three.js об'єкти
      if (starsRef.current) {
        starsRef.current.geometry.dispose();
        (starsRef.current.material as THREE.Material).dispose();
      }
      
      if (nebulaRef.current) {
        nebulaRef.current.geometry.dispose();
        (nebulaRef.current.material as THREE.Material).dispose();
      }
      
      if (planetsRef.current) {
        planetsRef.current.children.forEach(planet => {
          (planet as THREE.Mesh).geometry.dispose();
          ((planet as THREE.Mesh).material as THREE.Material).dispose();
          
          // Очищуємо кільця, якщо вони є
          if (planet.children.length > 0) {
            (planet.children[0] as THREE.Mesh).geometry.dispose();
            ((planet.children[0] as THREE.Mesh).material as THREE.Material).dispose();
          }
        });
      }
    };
  }, [interactive]);

  return <div className="space-background" ref={containerRef}></div>;
};

export default SpaceBackground;