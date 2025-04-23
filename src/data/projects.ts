export interface Project {
  id: number;
  title: string;
  description: string;
  images: string[]; // Changed from single image to array of images
  technologies: string[];
  demoUrl: string;
  codeUrl: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Space Portal',
    description: 'Interactive 3D website using Three.js and GSAP. Space journey with interactive elements and WebGL animations.',
    images: [
      '/projects/space-portal/preview.jpg',
      '/projects/space-portal/screenshot1.jpg',
      '/projects/space-portal/screenshot2.jpg'
    ],
    technologies: ['React', 'Three.js', 'GSAP', 'TypeScript'],
    demoUrl: 'https://example.com/demo1',
    codeUrl: 'https://github.com/username/space-portal',
    featured: true
  },
  {
    id: 2,
    title: 'Task Manager',
    description: 'Application for task management with drag-and-drop features, priority marking and reminders. Integrated with local storage.',
    images: [
      '/projects/task-manager/preview.jpg',
      '/projects/task-manager/screenshot1.jpg'
    ],
    technologies: ['React', 'TypeScript', 'SCSS', 'Redux'],
    demoUrl: 'https://example.com/demo2',
    codeUrl: 'https://github.com/username/task-manager',
    featured: true
  },
  {
    id: 3,
    title: 'Music Visualizer',
    description: 'Interactive music visualizer that analyzes audio through Web Audio API and creates synchronized visual effects using Canvas.',
    images: [
      '/projects/music-visualizer/preview.jpg',
      '/projects/music-visualizer/screenshot1.jpg',
      '/projects/music-visualizer/screenshot2.jpg',
      '/projects/music-visualizer/screenshot3.jpg'
    ],
    technologies: ['JavaScript', 'Canvas API', 'Web Audio API'],
    demoUrl: 'https://example.com/demo3',
    codeUrl: 'https://github.com/username/music-visualizer',
    featured: true
  },
  {
    id: 4,
    title: 'Photographer Portfolio',
    description: 'Minimalist portfolio website for a photographer with image gallery, smooth transitions and responsive design.',
    images: [
      '/projects/photo-portfolio/preview.jpg'
    ],
    technologies: ['React', 'Framer Motion', 'CSS Grid'],
    demoUrl: 'https://example.com/demo4',
    codeUrl: 'https://github.com/username/photo-portfolio',
    featured: false
  },
  {
    id: 5,
    title: 'Weather App',
    description: 'Web application for viewing weather using a public API and geolocation. Interactive animated weather icons.',
    images: [
      '/projects/weather-app/preview.jpg',
      '/projects/weather-app/screenshot1.jpg'
    ],
    technologies: ['React', 'API', 'GeoLocation'],
    demoUrl: '',  // Empty demo URL example
    codeUrl: 'https://github.com/username/weather-app',
    featured: false
  },
  {
    id: 6,
    title: 'Interactive Infographics',
    description: 'Animated data visualization about climate change using D3.js and SVG.',
    images: [
      '/projects/climate-infographic/preview.jpg',
      '/projects/climate-infographic/screenshot1.jpg',
      '/projects/climate-infographic/screenshot2.jpg'
    ],
    technologies: ['D3.js', 'SVG', 'TypeScript'],
    demoUrl: 'https://example.com/demo6',
    codeUrl: '',  // Empty code URL example
    featured: true
  }
];
