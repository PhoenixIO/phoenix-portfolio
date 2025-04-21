export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  demoUrl: string;
  codeUrl: string;
  category: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Космічний портал',
    description: 'Інтерактивний 3D веб-сайт з використанням Three.js та GSAP. Космічна подорож з інтерактивними елементами та анімаціями на WebGL.',
    image: '/project1.jpg',
    technologies: ['React', 'Three.js', 'GSAP', 'TypeScript'],
    demoUrl: 'https://example.com/demo1',
    codeUrl: 'https://github.com/username/space-portal',
    category: '3D',
    featured: true
  },
  {
    id: 2,
    title: 'Таск-менеджер',
    description: 'Додаток для управління завданнями з функціями перетягування (drag-and-drop), маркування пріоритетів та нагадувань. Інтегрований з локальним сховищем.',
    image: '/project2.jpg',
    technologies: ['React', 'TypeScript', 'SCSS', 'Redux'],
    demoUrl: 'https://example.com/demo2',
    codeUrl: 'https://github.com/username/task-manager',
    category: 'Веб-додаток',
    featured: true
  },
  {
    id: 3,
    title: 'Музичний візуалізатор',
    description: 'Інтерактивний візуалізатор музики, який аналізує аудіо через Web Audio API та створює синхронізовані візуальні ефекти за допомогою Canvas.',
    image: '/project3.jpg',
    technologies: ['JavaScript', 'Canvas API', 'Web Audio API'],
    demoUrl: 'https://example.com/demo3',
    codeUrl: 'https://github.com/username/music-visualizer',
    category: 'Креативний',
    featured: true
  },
  {
    id: 4,
    title: 'Портфоліо фотографа',
    description: 'Мінімалістичний сайт-портфоліо для фотографа з галереєю зображень, плавними переходами та адаптивним дизайном.',
    image: '/project4.jpg',
    technologies: ['React', 'Framer Motion', 'CSS Grid'],
    demoUrl: 'https://example.com/demo4',
    codeUrl: 'https://github.com/username/photo-portfolio',
    category: 'Веб-сайт',
    featured: false
  },
  {
    id: 5,
    title: 'Weather App',
    description: 'Веб-додаток для перегляду погоди з використанням публічного API та геолокації. Інтерактивні анімовані іконки погоди.',
    image: '/project5.jpg',
    technologies: ['React', 'API', 'GeoLocation'],
    demoUrl: 'https://example.com/demo5',
    codeUrl: 'https://github.com/username/weather-app',
    category: 'Веб-додаток',
    featured: false
  },
  {
    id: 6,
    title: 'Інтерактивна інфографіка',
    description: 'Анімована візуалізація даних про зміну клімату з використанням D3.js та SVG.',
    image: '/project6.jpg',
    technologies: ['D3.js', 'SVG', 'TypeScript'],
    demoUrl: 'https://example.com/demo6',
    codeUrl: 'https://github.com/username/climate-infographic',
    category: 'Візуалізація даних',
    featured: true
  }
];

export const categories = [
  'Всі',
  'Веб-додаток',
  'Веб-сайт',
  '3D',
  'Візуалізація даних',
  'Креативний'
];