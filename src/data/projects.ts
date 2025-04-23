export interface Project {
  id: number;
  title: string;
  description: string;
  images: string[]; // Changed from single image to array of images
  technologies: string[];
  demoUrl?: string;
  codeUrl?: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Avoids.io',
    description: 'Avoids.io (formerly Phoenix.io) – my first project, launched in 2018. It\'s a multiplayer game centered around the core concept of dodging enemies, unlocking new worlds and characters, and having fun with friends.',
    images: [
      '/projects/avoids.io/avoids1.png',
      '/projects/avoids.io/Screenshot_5.png',
      '/projects/avoids.io/Screenshot_97.png',
    ],
    technologies: ['React', 'JavaScript', 'uWebSockets'],
    demoUrl: 'https://avoids.io/',
    featured: true
  },
  {
    id: 2,
    title: 'Swordbattle.io',
    description: 'Swordbattle.io is an online sword fighting io game! Fight with friends and enemies in this multiplayer battle arena! Collect coins to be huge, rule the land and upgrade your character.',
    images: [
      '/projects/swordbattle.io/Screenshot_2.png',
      '/projects/swordbattle.io/Screenshot_3.png',
      '/projects/swordbattle.io/Screenshot_4.png',
      '/projects/swordbattle.io/Screenshot_1.png',
      '/projects/swordbattle.io/Screenshot_169.png',
    ],
    technologies: ['Phaser', 'TypeScript', 'uWebSockets'],
    demoUrl: 'https://swordbattle.io/',
    featured: true
  },
  {
    id: 3,
    title: 'Cubeshot.io',
    description: 'CubeShot is an objective-based 3D first person shooter. On this awesome first person shooter game every match is an intense unique experience.',
    images: [
      '/projects/cubeshot.io/Screenshot_193.png',
      '/projects/cubeshot.io/Screenshot_273.png',
      '/projects/cubeshot.io/Screenshot_338.png',
    ],
    technologies: ['ThreeJS', 'Vue', 'Web Audio API'],
    demoUrl: 'https://cubeshot.io/',
    featured: true
  },
  {
    id: 4,
    title: 'Clipper',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.',
    images: [
      '/projects/clipper/Screenshot_1.png',
    ],
    technologies: ['TypeScript', 'React', 'Tailwind', 'fastify', 'RestAPI', 'Swagger'],
    demoUrl: 'https://dev.clipper.io/',
    codeUrl: '',
    featured: true
  },
  {
    id: 5,
    title: 'CryptoSlither',
    description: 'CryptoSlither – a multiplayer slither.io-style game with an integrated cryptocurrency system and real-time PvP mechanics.',
    images: [
      '/projects/crypto.slither/Screenshot_666.png',
      '/projects/crypto.slither/Screenshot_171.png',
      '/projects/crypto.slither/Screenshot_276.png',
    ],
    technologies: ['Canvas', 'JavaScript', 'express', 'React'],
    featured: true
  },
  {
    id: 6,
    title: 'CosmoTravel',
    description: 'CosmoTravel – a space-themed website designed to capture the beauty of the cosmos; winner of a Web Design competition (see certificate in Projects).',
    images: [
      '/projects/cosmo.travel/Screenshot_3.png',
      '/projects/cosmo.travel/Screenshot_1.png',
      '/projects/cosmo.travel/Screenshot_2.png',
    ],
    technologies: ['React', 'Framer Motion', 'CSS Grid'],
    demoUrl: 'https://cosmospace-tourism.netlify.app/',
    codeUrl: 'https://github.com/PhoenixIO/space-tourism',
    featured: false
  },
  {
    id: 7,
    title: 'Vinnitsia Castles',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.',
    images: [
      '/projects/castles/Screenshot_98.png',
    ],
    technologies: ['React', 'JavaScript', 'SASS'],
    codeUrl: 'https://github.com/PhoenixIO/castles',
    featured: false
  },
  {
    id: 8,
    title: 'Drivva',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.',
    images: [
      '/projects/drivva/Screenshot_4.png',
    ],
    technologies: ['NestJS', 'React', 'TypeScript', 'SASS'],
    demoUrl: 'https://drivva.com/',
    featured: true
  },
];
