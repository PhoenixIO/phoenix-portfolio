export interface Skill {
  id: number;
  name: string;
  description: string;
  icon: string;
  level: number;
  category: string;
}

export const skills: Skill[] = [
  {
    id: 1,
    name: "React",
    description: "Бібліотека для створення інтерактивних користувацьких інтерфейсів за допомогою компонентного підходу.",
    icon: "react",
    level: 90,
    category: "frontend"
  },
  {
    id: 2,
    name: "TypeScript",
    description: "Типізована надмножина JavaScript, що підвищує якість коду та спрощує розробку.",
    icon: "typescript",
    level: 85,
    category: "language"
  },
  {
    id: 3,
    name: "SCSS",
    description: "Потужний препроцесор CSS, що надає додаткові можливості стилізації та організації стилів.",
    icon: "sass",
    level: 80,
    category: "frontend"
  },
  {
    id: 4,
    name: "Three.js",
    description: "JavaScript бібліотека для створення 3D графіки у веб-браузері на основі WebGL.",
    icon: "threejs",
    level: 75,
    category: "frontend"
  },
  {
    id: 5,
    name: "GSAP",
    description: "Професійна JavaScript бібліотека для анімацій, що дозволяє створювати швидкі та складні анімації.",
    icon: "gsap",
    level: 70,
    category: "frontend"
  },
  {
    id: 6,
    name: "Vite",
    description: "Сучасний інструмент збірки для фронтенд-проєктів, що забезпечує швидку розробку та продуктивність.",
    icon: "vite",
    level: 80,
    category: "tooling"
  },
  {
    id: 7,
    name: "Git",
    description: "Система контролю версій для відстеження змін у файлах та координації роботи в команді.",
    icon: "git",
    level: 85,
    category: "tooling"
  },
  {
    id: 8,
    name: "REST API",
    description: "Підхід до побудови архітектури веб-додатків, що забезпечує комунікацію між клієнтом і сервером.",
    icon: "api",
    level: 75,
    category: "backend"
  }
];
