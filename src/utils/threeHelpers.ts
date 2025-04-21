import * as THREE from 'three';

// Функція для створення зірок в космосі
export const createStarField = (
  count: number = 1000, 
  size: number = 0.1, 
  color: string = '#ffffff',
  spread: number = 50
): THREE.Points => {
  const starGeometry = new THREE.BufferGeometry();
  const starMaterial = new THREE.PointsMaterial({
    color,
    size,
    sizeAttenuation: true,
  });
  
  const positions = new Float32Array(count * 3);
  
  for (let i = 0; i < count * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * spread;      // x
    positions[i + 1] = (Math.random() - 0.5) * spread;  // y
    positions[i + 2] = (Math.random() - 0.5) * spread;  // z
  }
  
  starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  
  return new THREE.Points(starGeometry, starMaterial);
};

// Функція для створення планети
export const createPlanet = (
  radius: number, 
  color: string | number, 
  wireframe: boolean = false,
  segments: number = 32
): THREE.Mesh => {
  const geometry = new THREE.SphereGeometry(radius, segments, segments);
  const material = new THREE.MeshBasicMaterial({ 
    color, 
    wireframe,
  });
  
  return new THREE.Mesh(geometry, material);
};

// Функція для створення орбіти
export const createOrbit = (
  radius: number, 
  width: number = 0.02, 
  color: string | number = 0xffffff,
  segments: number = 64
): THREE.Line => {
  const geometry = new THREE.BufferGeometry();
  const points: THREE.Vector3[] = [];
  
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const y = 0;
    const z = Math.sin(angle) * radius;
    points.push(new THREE.Vector3(x, y, z));
  }
  
  geometry.setFromPoints(points);
  
  const material = new THREE.LineBasicMaterial({ 
    color, 
    linewidth: width
  });
  
  return new THREE.Line(geometry, material);
};

// Функція для випадкового числа з діапазону
export const randomRange = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

// Функція для плавного руху камери до точки
export const moveCamera = (
  camera: THREE.Camera, 
  target: THREE.Vector3, 
  duration: number = 2,
  onComplete?: () => void
): void => {
  const startPosition = camera.position.clone();
  const startTime = Date.now();
  
  const animate = () => {
    const now = Date.now();
    const elapsed = (now - startTime) / 1000; // Переводимо в секунди
    
    if (elapsed < duration) {
      const t = elapsed / duration; // Прогрес від 0 до 1
      
      // Використовуємо функцію ease-in-out для плавного руху
      const progress = t < 0.5 
        ? 2 * t * t 
        : -1 + (4 - 2 * t) * t;
      
      camera.position.x = startPosition.x + (target.x - startPosition.x) * progress;
      camera.position.y = startPosition.y + (target.y - startPosition.y) * progress;
      camera.position.z = startPosition.z + (target.z - startPosition.z) * progress;
      
      requestAnimationFrame(animate);
    } else {
      // Завершуємо анімацію
      camera.position.copy(target);
      
      if (onComplete) {
        onComplete();
      }
    }
  };
  
  animate();
};

// Функція для створення туманності (частинок з градієнтом)
export const createNebula = (
  count: number = 100,
  size: number = 5,
  colors: string[] = ['#ff00ff', '#00ffff', '#8800ff'],
  spread: number = 30
): THREE.Points => {
  const geometry = new THREE.BufferGeometry();
  
  // Позиції частинок
  const positions = new Float32Array(count * 3);
  // Кольори частинок
  const colorsAttribute = new Float32Array(count * 3);
  // Розміри частинок
  const sizes = new Float32Array(count);
  
  // Створюємо випадкові частинки з різними кольорами
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    
    // Позиції
    positions[i3] = (Math.random() - 0.5) * spread;
    positions[i3 + 1] = (Math.random() - 0.5) * spread;
    positions[i3 + 2] = (Math.random() - 0.5) * spread;
    
    // Випадковий колір із наданих
    const color = new THREE.Color(colors[Math.floor(Math.random() * colors.length)]);
    colorsAttribute[i3] = color.r;
    colorsAttribute[i3 + 1] = color.g;
    colorsAttribute[i3 + 2] = color.b;
    
    // Випадковий розмір
    sizes[i] = Math.random() * size;
  }
  
  // Встановлюємо атрибути для геометрії
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colorsAttribute, 3));
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
  
  // Створюємо шейдерний матеріал для більш вражаючих частинок
  const material = new THREE.PointsMaterial({
    size: size,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
  });
  
  return new THREE.Points(geometry, material);
};
