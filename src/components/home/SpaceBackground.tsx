import { motion } from 'framer-motion';
import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass.js';

const SpaceBackground: React.FC = () => {
  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const composerRef = useRef<EffectComposer | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  
  // Refs for scene objects
  const starsRef = useRef<THREE.Points[]>([]);
  const nebulaRef = useRef<THREE.Points | null>(null);
  const dustRef = useRef<THREE.Points | null>(null);
  const constellationsRef = useRef<{stars: THREE.Points, lines: THREE.Line[]}[]>([]);
  
  // State
  const [loaded, setLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Textures and utilities
  const generateStarTexture = useCallback(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    
    const context = canvas.getContext('2d');
    if (!context) return new THREE.Texture();
    
    const gradient = context.createRadialGradient(
      16, 16, 0, 16, 16, 16
    );
    
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.8)');
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.3)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    
    context.fillStyle = gradient;
    context.fillRect(0, 0, 32, 32);
    
    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  const generateNebulaTexture = useCallback(() => {
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
  }, []);
  
  const generateDustTexture = useCallback(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    
    const context = canvas.getContext('2d');
    if (!context) return new THREE.Texture();
    
    const gradient = context.createRadialGradient(
      16, 16, 0, 16, 16, 16
    );
    
    // Enhanced dust texture for more visibility
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.5)');  // Increased opacity from 0.2 to 0.5
    gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.3)'); // Increased opacity from 0.1 to 0.3
    gradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.15)'); // Increased opacity from 0.05 to 0.15
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    
    context.fillStyle = gradient;
    context.fillRect(0, 0, 32, 32);
    
    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  // Scene setup
  const createScene = useCallback(() => {
    if (!containerRef.current || !canvasRef.current) return;
    
    // Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x070714, 0.001);
    sceneRef.current = scene;
    
    // Camera
    const camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );
    camera.position.set(0, 0, 30);
    cameraRef.current = camera;
    
    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(new THREE.Color('#070714'), 1);
    rendererRef.current = renderer;
    
    // Post-processing
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);
    
    // UnrealBloomPass constructor only accepts up to 3 arguments in this version
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      0.5,
      0.4,1
    );
    composer.addPass(bloomPass);
    
    const filmPass = new FilmPass(0.2, false);
    filmPass.renderToScreen = true;
    composer.addPass(filmPass);
    
    composerRef.current = composer;
  }, []);

  // Create nebulae
  const createNebulae = useCallback(() => {
    if (!sceneRef.current) return;
    
    // Main spiral nebula
    createNebula({
      count: 300,
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
  }, []);
  
  // Create a nebula with specific properties
  const createNebula = useCallback(({
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
  }, [generateNebulaTexture]);

  // Create cosmic dust - Enhanced for visibility
  const createCosmicDust = useCallback(() => {
    if (!sceneRef.current) return;
    
    const count = 3000; // Increased from 2000 to 3000 for more particles
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const sizes = new Float32Array(count); // Added sizes array for variation
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Random position in a large sphere - more concentrated in visible area
      const radius = 150 + Math.random() * 300; // Reduced min radius from 300 to bring particles closer
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
      
      // Very slow random velocity
      velocities[i3] = (Math.random() - 0.5) * 0.02; // Doubled velocity from 0.01
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.02;
      
      // Random size for particles
      sizes[i] = Math.random() * 10 + 5;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('customVelocity', new THREE.BufferAttribute(velocities, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    // Using shader material for more control over dust appearance
    const material = new THREE.ShaderMaterial({
      uniforms: {
        pointTexture: { value: generateDustTexture() }
      },
      vertexShader: `
        attribute float size;
        attribute vec3 customVelocity;
        varying float vSize;
        
        void main() {
          vSize = size;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (100.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform sampler2D pointTexture;
        varying float vSize;
        
        void main() {
          vec4 texColor = texture2D(pointTexture, gl_PointCoord);
          gl_FragColor = vec4(1.0, 1.0, 1.0, 0.7) * texColor;
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    
    const dust = new THREE.Points(geometry, material);
    sceneRef.current.add(dust);
    dustRef.current = dust;
  }, [generateDustTexture]);

  // Create constellations - Simplified without hover effect
  const createConstellations = useCallback(() => {
    if (!sceneRef.current) return;
    
    // Define constellation data
    const constellationData = [
      {
        stars: [
          { x: 50, y: 30, z: -150 },
          { x: 65, y: 40, z: -150 },
          { x: 70, y: 20, z: -150 },
          { x: 45, y: 15, z: -150 },
          { x: 40, y: 0, z: -150 },
          { x: 60, y: 0, z: -150 },
          { x: 75, y: -15, z: -150 },
        ],
        connections: [
          [0, 1], [1, 2], [0, 3], [3, 4], [3, 5], [5, 6]
        ]
      },
      {
        stars: [
          { x: -50, y: 60, z: -180 },
          { x: -35, y: 65, z: -180 },
          { x: -20, y: 70, z: -180 },
          { x: -10, y: 55, z: -180 },
          { x: -15, y: 40, z: -180 },
          { x: -30, y: 35, z: -180 },
          { x: -45, y: 40, z: -180 },
        ],
        connections: [
          [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 0]
        ]
      },
      {
        stars: [
          { x: 0, y: 100, z: -160 },
          { x: 20, y: 110, z: -160 },
          { x: 35, y: 100, z: -160 },
          { x: 45, y: 115, z: -160 },
          { x: 60, y: 105, z: -160 },
        ],
        connections: [
          [0, 1], [1, 2], [2, 3], [3, 4]
        ]
      }
    ];
    
    // Create each constellation
    constellationData.forEach(data => {
      if (!sceneRef.current) return;
      
      // Create star positions
      const starGeometry = new THREE.BufferGeometry();
      const starPositions = new Float32Array(data.stars.length * 3);
      
      data.stars.forEach((star, i) => {
        starPositions[i * 3] = star.x;
        starPositions[i * 3 + 1] = star.y;
        starPositions[i * 3 + 2] = star.z;
      });
      
      starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
      
      // Create material for stars - slightly enhanced brightness 
      const starMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 2.2, // Increased from 1.8 to be more visible
        map: generateStarTexture(),
        transparent: true,
        opacity: 0.8, // Increased from 0.7
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      
      // Create stars Points object
      const stars = new THREE.Points(starGeometry, starMaterial);
      sceneRef.current.add(stars);
      
      // Create lines for connections - enhanced visibility
      const lines: THREE.Line[] = [];
      
      data.connections.forEach(([from, to]) => {
        const lineGeometry = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(
            data.stars[from].x,
            data.stars[from].y,
            data.stars[from].z
          ),
          new THREE.Vector3(
            data.stars[to].x,
            data.stars[to].y,
            data.stars[to].z
          )
        ]);
        
        const lineMaterial = new THREE.LineBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.15, // Increased from 0.08 for better visibility
          blending: THREE.AdditiveBlending,
        });
        
        const line = new THREE.Line(lineGeometry, lineMaterial);
        sceneRef.current!.add(line);
        lines.push(line);
      });
      
      // Add to constellations ref
      constellationsRef.current.push({ stars, lines });
    });
  }, [generateStarTexture]);
  
  // Animation function - removed constellation hover effect
  const animate = useCallback(() => {
    if (!sceneRef.current || !cameraRef.current || !composerRef.current) return;
    
    // Camera movement
    if (cameraRef.current) {
      cameraRef.current.position.x += (mousePosition.x * 2 - cameraRef.current.position.x) * 0.01;
      cameraRef.current.position.y += (-mousePosition.y * 2 - cameraRef.current.position.y) * 0.01;
      cameraRef.current.lookAt(0, 0, 0);
    }
    
    // Animate stars
    starsRef.current.forEach((starLayer, index) => {
      const material = starLayer.material as THREE.ShaderMaterial;
      if (material.uniforms.time) {
        material.uniforms.time.value = Date.now() * 0.0005;
      }
      
      const rotationSpeed = 0.00005 * (index + 1) * 0.5;
      starLayer.rotation.y += rotationSpeed;
      starLayer.rotation.z += rotationSpeed * 0.7;
    });
    
    // Animate nebulae
    if (nebulaRef.current) {
      nebulaRef.current.rotation.z += 0.0001;
      
      const time = Date.now() * 0.0003;
      const scale = 1 + Math.sin(time) * 0.02;
      nebulaRef.current.scale.set(scale, scale, scale);
    }
    
    // Animate dust
    if (dustRef.current && 
        dustRef.current.geometry.attributes.position &&
        dustRef.current.geometry.attributes.customVelocity) {
      dustRef.current.rotation.y += 0.0001;
      
      const positions = dustRef.current.geometry.attributes.position.array as Float32Array;
      const velocities = dustRef.current.geometry.attributes.customVelocity.array as Float32Array;
      
      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += velocities[i];
        positions[i + 1] += velocities[i + 1];
        positions[i + 2] += velocities[i + 2];
      }
      
      dustRef.current.geometry.attributes.position.needsUpdate = true;
    }
    
    composerRef.current.render();
    animationFrameRef.current = requestAnimationFrame(animate);
  }, [mousePosition]);
  
  // Event handlers - simplified
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({
      x: (e.clientX / window.innerWidth - 0.5) * 2,
      y: (e.clientY / window.innerHeight - 0.5) * 2
    });
  }, []);
  
  const handleResize = useCallback(() => {
    if (!cameraRef.current || !rendererRef.current || !composerRef.current) return;
    
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    cameraRef.current.aspect = width / height;
    cameraRef.current.updateProjectionMatrix();
    
    rendererRef.current.setSize(width, height);
    composerRef.current.setSize(width, height);
  }, []);
  
  // Initialize THREE.js scene
  useEffect(() => {
    try {
      createScene();
      createNebulae();
      createCosmicDust();
      createConstellations();
      
      window.addEventListener('resize', handleResize);
      window.addEventListener('mousemove', handleMouseMove);
      
      setLoaded(true);
    } catch (error) {
      console.error("Error initializing space background:", error);
    }
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      cleanup();
    };
  }, [createScene, createNebulae, createCosmicDust, createConstellations, handleResize, handleMouseMove]);
  
  // Start animation
  useEffect(() => {
    if (loaded) {
      animate();
    }
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [loaded, animate]);
  
  // Cleanup resources
  const cleanup = () => {
    if (!sceneRef.current || !rendererRef.current) return;
    
    sceneRef.current.traverse((object) => {
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
    
    rendererRef.current.dispose();
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