// Типи для проєктів
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

// Типи для навичок
export interface Skill {
  id: number;
  name: string;
  description: string;
  icon: string;
  level: number;
  category: string;
}

// Типи для анімацій
export interface AnimationOptions {
  duration?: number;
  delay?: number;
  ease?: string;
}

// Типи для конфігурації Three.js
export interface ThreeSceneConfig {
  cameraPosition?: {
    x: number;
    y: number;
    z: number;
  };
  backgroundColor?: string;
  fog?: boolean;
  fogDensity?: number;
  fogColor?: string;
}
