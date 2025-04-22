import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';

const SpaceBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const starsRef = useRef<THREE.Points[]>([]);
  const nebulaRef = useRef<THREE.Points | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Initialize THREE.js scene
  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );
    camera.position.set(0, 0, 30);
    cameraRef.current = camera;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(new THREE.Color('#070714'), 1);
    rendererRef.current = renderer;
    
    // Create stars
    createStarLayers();
    
    // Create nebula
    createNebulae();

    createConstellations();
    
    // Handle resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    setLoaded(true);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      // Clean up resources
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (object.material instanceof THREE.Material) {
            object.material.dispose();
          } else if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          }
        } else if (object instanceof THREE.Points) {
          object.geometry.dispose();
          if (object.material instanceof THREE.Material) {
            object.material.dispose();
          }
        }
      });
      
      renderer.dispose();
    };
  }, []);
  
  // Handle mouse movement for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Animation loop
  useEffect(() => {
    if (!loaded) return;
    
    const animate = () => {
      if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return;
      
      // Apply subtle camera movement based on mouse position
      cameraRef.current.position.x += (mousePosition.x * 2 - cameraRef.current.position.x) * 0.01;
      cameraRef.current.position.y += (-mousePosition.y * 2 - cameraRef.current.position.y) * 0.01;
      cameraRef.current.lookAt(0, 0, 0);
      
      // Animate stars
      starsRef.current.forEach((starLayer, index) => {
        const rotationSpeed = 0.0001 * (index + 1) * 0.5;
        starLayer.rotation.y += rotationSpeed;
        starLayer.rotation.z += rotationSpeed * 0.7;
      });

      // Animate nebulae
      if (nebulaRef.current) {
        nebulaRef.current.rotation.z += 0.0001;
        
        // Subtle pulsating effect
        const time = Date.now() * 0.0003;
        const scale = 1 + Math.sin(time) * 0.02;
        nebulaRef.current.scale.set(scale, scale, scale);
      }
      
      rendererRef.current.render(sceneRef.current, cameraRef.current);
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [loaded, mousePosition]);
  
  // Create multiple layers of stars with different properties
  const createStarLayers = () => {
    if (!sceneRef.current) return;
    
    // Create far distant stars - many tiny dots
    createStarLayer({
      count: 3000,
      maxSize: 1.2,
      minSize: 0.2,
      spread: 1000,
      depth: 1000,
      colors: [
        new THREE.Color(0xFFFFFF),  // White
        new THREE.Color(0xCCDDFF),  // Light blue
        new THREE.Color(0xE6C8FF),  // Light purple
        new THREE.Color(0xFFD6AD)   // Light orange
      ],
      colorDistribution: [0.7, 0.1, 0.1, 0.1] // 70% white, 10% for each other color
    });
    
    // Create mid-distance stars - medium-sized
    createStarLayer({
      count: 800,
      maxSize: 1.8,
      minSize: 0.8,
      spread: 500,
      depth: 600,
      colors: [
        new THREE.Color(0xFFFFFF),   // White
        new THREE.Color(0x6699FF),   // Blue
        new THREE.Color(0x9966FF),   // Purple
        new THREE.Color(0xFF9966)    // Orange
      ],
      colorDistribution: [0.5, 0.2, 0.2, 0.1]
    });
    
    // Create near stars - fewer but brighter
    createStarLayer({
      count: 100,
      maxSize: 2.5,
      minSize: 1.2,
      spread: 300,
      depth: 400,
      colors: [
        new THREE.Color(0xFFFFFF),   // White
        new THREE.Color(0x00AAFF),   // Bright blue
        new THREE.Color(0xAA00FF),   // Bright purple
        new THREE.Color(0xFFAA00)    // Bright orange/yellow
      ],
      colorDistribution: [0.4, 0.2, 0.2, 0.2]
    });
  };
  
  // Create a layer of stars with specific properties
  const createStarLayer = ({
    count,
    maxSize,
    minSize,
    spread,
    depth,
    colors,
    colorDistribution
  }: {
    count: number;
    maxSize: number;
    minSize: number;
    spread: number;
    depth: number;
    colors: THREE.Color[];
    colorDistribution: number[];
  }) => {
    if (!sceneRef.current) return;
    
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const colorsArray = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Position - random in sphere
      const radius = Math.random() * spread;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = -depth + radius * Math.cos(phi);
      
      // Size - random between min and max
      sizes[i] = Math.random() * (maxSize - minSize) + minSize;
      
      // Color - based on distribution
      const colorRand = Math.random();
      let colorIndex = 0;
      let sum = 0;
      
      for (let j = 0; j < colorDistribution.length; j++) {
        sum += colorDistribution[j];
        if (colorRand <= sum) {
          colorIndex = j;
          break;
        }
      }
      
      const color = colors[colorIndex];
      colorsArray[i3] = color.r;
      colorsArray[i3 + 1] = color.g;
      colorsArray[i3 + 2] = color.b;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));
    
    // Shader material for stars with realistic glow
    const material = new THREE.ShaderMaterial({
      uniforms: {
        pointTexture: { value: generateStarTexture() }
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (150.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform sampler2D pointTexture;
        varying vec3 vColor;
        void main() {
          vec4 texture = texture2D(pointTexture, gl_PointCoord);
          gl_FragColor = vec4(vColor, 1.0) * texture;
        }
      `,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      transparent: true
    });
    
    const stars = new THREE.Points(geometry, material);
    starsRef.current.push(stars);
    sceneRef.current.add(stars);
  };
  
  // Generate a texture for stars
  const generateStarTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    
    const context = canvas.getContext('2d');
    if (!context) return new THREE.Texture();
    
    const gradient = context.createRadialGradient(
      16, 16, 0, 16, 16, 16
    );
    
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.2, 'rgba(255,255,255,0.8)');
    gradient.addColorStop(0.5, 'rgba(255,255,255,0.3)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    
    context.fillStyle = gradient;
    context.fillRect(0, 0, 32, 32);
    
    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
  };
  
  // Create colorful nebulae
  const createNebulae = () => {
    if (!sceneRef.current) return;
    
    // Main spiral nebula
    createNebula({
      count: 1000,
      shape: 'spiral',
      radius: 400,
      height: 100,
      colors: [
        new THREE.Color(0x3311bb), // Deep blue
        new THREE.Color(0x5522dd), // Blue purple
        new THREE.Color(0x8800ff), // Bright purple
        new THREE.Color(0xaa33ff), // Light purple
      ],
      position: new THREE.Vector3(0, 0, -300)
    });
    
    // Smaller nebula clouds
    createNebula({
      count: 300,
      shape: 'cloud',
      radius: 150,
      height: 50,
      colors: [
        new THREE.Color(0x0066ff), // Bright blue
        new THREE.Color(0x5500ff), // Purple blue
        new THREE.Color(0xff00aa), // Pink
      ],
      position: new THREE.Vector3(-200, 100, -200)
    });
    
    createNebula({
      count: 300,
      shape: 'cloud',
      radius: 200,
      height: 60,
      colors: [
        new THREE.Color(0xff6644), // Orange
        new THREE.Color(0xaa22ff), // Purple
        new THREE.Color(0x2200aa), // Deep blue
      ],
      position: new THREE.Vector3(300, -150, -250)
    });
  };
  
  // Create a nebula with specific properties
  const createNebula = ({
    count,
    shape,
    radius,
    height,
    colors,
    position
  }: {
    count: number;
    shape: 'spiral' | 'cloud';
    radius: number;
    height: number;
    colors: THREE.Color[];
    position: THREE.Vector3;
  }) => {
    if (!sceneRef.current) return;
    
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const colorsArray = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      if (shape === 'spiral') {
        // Spiral shape
        const angle = i / count * Math.PI * 10;
        const r = (0.1 + 0.9 * Math.pow(i / count, 0.5)) * radius;
        const x = Math.cos(angle) * r;
        const y = (Math.random() - 0.5) * height;
        const z = Math.sin(angle) * r;
        
        positions[i3] = x;
        positions[i3 + 1] = y;
        positions[i3 + 2] = z;
      } else {
        // Cloud shape
        const r = Math.pow(Math.random(), 2) * radius;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        
        positions[i3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i3 + 2] = r * Math.cos(phi);
      }
      
      // Random size
      sizes[i] = Math.random() * 15 + 5;
      
      // Random color from the palette
      const color = colors[Math.floor(Math.random() * colors.length)];
      colorsArray[i3] = color.r;
      colorsArray[i3 + 1] = color.g;
      colorsArray[i3 + 2] = color.b;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));
    
    // Shader for nebula gas
    const material = new THREE.ShaderMaterial({
      uniforms: {
        pointTexture: { value: generateNebulaTexture() }
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (200.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform sampler2D pointTexture;
        varying vec3 vColor;
        void main() {
          vec4 texture = texture2D(pointTexture, gl_PointCoord);
          gl_FragColor = vec4(vColor, 0.7) * texture;
        }
      `,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
    });
    
    const nebula = new THREE.Points(geometry, material);
    nebula.position.copy(position);
    
    sceneRef.current.add(nebula);
    nebulaRef.current = nebula;
  };
  
  // Generate a texture for nebula particles
  const generateNebulaTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    
    const context = canvas.getContext('2d');
    if (!context) return new THREE.Texture();
    
    const gradient = context.createRadialGradient(
      32, 32, 0, 32, 32, 32
    );
    
    gradient.addColorStop(0, 'rgba(255,255,255,0.5)');
    gradient.addColorStop(0.3, 'rgba(255,255,255,0.2)');
    gradient.addColorStop(0.7, 'rgba(255,255,255,0.1)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    
    context.fillStyle = gradient;
    context.fillRect(0, 0, 64, 64);
    
    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
  };
  
  // Draw constellations as subtle connected star patterns
  const createConstellations = () => {
    if (!sceneRef.current) return;
    
    // Simple constellation patterns (like Orion, Big Dipper, etc)
    const constellations = [
      // Orion-like
      [
        [-20, 30, -100],
        [-15, 40, -100],
        [-10, 35, -100],
        [-15, 25, -100],
        [-10, 15, -100],
        [-5, 5, -100],
        [0, 25, -100],
        [10, 35, -100],
        [15, 40, -100],
        [5, 15, -100],
        [15, 10, -100],
      ],
      // Big Dipper-like
      [
        [40, 60, -150],
        [50, 65, -150],
        [60, 67, -150],
        [70, 63, -150],
        [75, 55, -150],
        [65, 50, -150],
        [60, 40, -150],
      ],
      // Custom pattern
      [
        [-50, -40, -130],
        [-40, -50, -130],
        [-30, -45, -130],
        [-20, -55, -130],
        [-10, -40, -130],
        [-20, -30, -130],
        [-30, -25, -130],
      ]
    ];
    
    constellations.forEach(constellation => {
      // Create stars at each point
      const geometry = new THREE.BufferGeometry();
      const material = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 2.5,
        transparent: true,
        blending: THREE.AdditiveBlending
      });
      
      const positions = new Float32Array(constellation.length * 3);
      
      constellation.forEach((point, i) => {
        positions[i * 3] = point[0];
        positions[i * 3 + 1] = point[1];
        positions[i * 3 + 2] = point[2];
      });
      
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      
      const stars = new THREE.Points(geometry, material);
      sceneRef.current?.add(stars);
      
      // Create lines connecting the stars
      const linesMaterial = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.2,
        blending: THREE.AdditiveBlending
      });
      
      // Connect stars with lines
      for (let i = 0; i < constellation.length - 1; i++) {
        const lineGeometry = new THREE.BufferGeometry();
        const linePositions = new Float32Array(6);
        
        linePositions[0] = constellation[i][0];
        linePositions[1] = constellation[i][1];
        linePositions[2] = constellation[i][2];
        linePositions[3] = constellation[i + 1][0];
        linePositions[4] = constellation[i + 1][1];
        linePositions[5] = constellation[i + 1][2];
        
        lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
        
        const line = new THREE.Line(lineGeometry, linesMaterial);
        sceneRef.current?.add(line);
      }
    });
  };
  
  return (
    <div ref={containerRef} className="cosmic-background">
      <motion.div 
        className="vignette-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />
      <canvas ref={canvasRef} className="cosmic-canvas" />
      <style>{`
        .cosmic-background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          overflow: hidden;
        }
        
        .cosmic-canvas {
          width: 100%;
          height: 100%;
          display: block;
        }
        
        .vignette-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(
            circle at center,
            transparent 40%,
            rgba(5, 5, 25, 0.4) 80%,
            rgba(5, 5, 25, 0.7) 100%
          );
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};

export default SpaceBackground;