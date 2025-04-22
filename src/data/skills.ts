export interface Skill {
  id: number;
  name: string;
  description: string;
  icon?: string;
  level: number;
  category: string;
}

export const skills: Skill[] = [
  {
    id: 1,
    name: "React",
    description: "Library for building interactive user interfaces using a component-based approach.",
    icon: "react",
    level: 90,
    category: "frontend"
  },
  {
    id: 2,
    name: "TypeScript",
    description: "Typed superset of JavaScript that enhances code quality and simplifies development.",
    icon: "typescript",
    level: 85,
    category: "language"
  },
  {
    id: 3,
    name: "SASS",
    description: "Powerful CSS preprocessor that provides additional styling capabilities and organization.",
    icon: "sass",
    level: 80,
    category: "frontend"
  },
  {
    id: 4,
    name: "Three.js",
    description: "JavaScript library for creating 3D graphics in web browsers using WebGL.",
    icon: "threejs",
    level: 75,
    category: "frontend"
  },
  {
    id: 5,
    name: "Redux",
    description: "State management library for JavaScript applications, commonly used with React.",
    icon: "redux",
    level: 78,
    category: "frontend"
  },
  {
    id: 6,
    name: "Node.js",
    description: "JavaScript runtime environment that allows executing JavaScript code outside a web browser.",
    icon: "nodejs",
    level: 80,
    category: "backend"
  },
  {
    id: 7,
    name: "NestJS",
    description: "Progressive Node.js framework for building efficient and scalable server-side applications.",
    icon: "nestjs",
    level: 75,
    category: "backend"
  },
  {
    id: 8,
    name: "REST API",
    description: "Architectural approach for building web applications that enables client-server communication.",
    icon: "api",
    level: 82,
    category: "backend"
  },
  {
    id: 9,
    name: "MongoDB",
    description: "Document-oriented NoSQL database used for high-volume data storage and flexible schema design.",
    icon: "mongodb",
    level: 70,
    category: "backend"
  },
  {
    id: 10,
    name: "PostgreSQL",
    description: "Powerful, open-source object-relational database system with strong reputation for reliability.",
    icon: "postgresql",
    level: 68,
    category: "backend"
  },
  {
    id: 11,
    name: "GSAP",
    description: "Professional JavaScript animation library for creating fast and complex animations.",
    icon: "gsap",
    level: 70,
    category: "frontend"
  },
  {
    id: 12,
    name: "Tailwind CSS",
    description: "Utility-first CSS framework for rapidly building custom user interfaces.",
    icon: "tailwind",
    level: 85,
    category: "frontend"
  },
  {
    id: 13,
    name: "C++",
    description: "General-purpose programming language with a bias toward system programming and embedded applications.",
    icon: "cpp",
    level: 60,
    category: "language"
  },
  {
    id: 14,
    name: "Python",
    description: "High-level programming language known for its simplicity and versatility across various domains.",
    icon: "python",
    level: 65,
    category: "language"
  },
  {
    id: 15,
    name: "WebSockets",
    description: "Communication protocol that provides full-duplex communication channels over a single TCP connection.",
    icon: "websocket",
    level: 72,
    category: "backend"
  },
  {
    id: 16,
    name: "AI Integration",
    description: "Implementation of artificial intelligence capabilities into web applications and services.",
    icon: "ai",
    level: 65,
    category: "tooling"
  },
  {
    id: 17,
    name: "Phaser",
    description: "Fast, free and fun open source HTML5 game framework for Canvas and WebGL powered games.",
    icon: "phaser",
    level: 60,
    category: "frontend"
  },
  {
    id: 18,
    name: "Git",
    description: "Version control system for tracking changes in files and coordinating work in a team.",
    icon: "git",
    level: 85,
    category: "tooling"
  },
  {
    id: 19,
    name: "Vite",
    description: "Modern build tool for frontend projects, providing fast development and performance.",
    icon: "vite",
    level: 80,
    category: "tooling"
  }
];
