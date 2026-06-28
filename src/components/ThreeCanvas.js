'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeCanvas() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 25;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group to hold everything
    const group = new THREE.Group();
    scene.add(group);

    // Create contract node system (constellation)
    const particleCount = 45;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = [];

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 16;
      const y = (Math.random() - 0.5) * 16;
      const z = (Math.random() - 0.5) * 16;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      originalPositions.push({ x, y, z, speed: 0.2 + Math.random() * 0.8, seed: Math.random() * 100 });
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Particle Material (Glowing nodes)
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xf6a11e,
      size: 0.45,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(geometry, particleMaterial);
    group.add(particles);

    // Add lines connecting the nodes
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xfdd79a,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending
    });

    // We dynamically update lines in animation loop
    let lineGeometry = new THREE.BufferGeometry();
    let lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    group.add(lineMesh);

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // Directional light
    const dirLight = new THREE.DirectionalLight(0xf6a11e, 0.8);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    // Mouse interactive tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      targetX = (x / width - 0.5) * 4;
      targetY = (y / height - 0.5) * 4;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Animation loop
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Slow drift particles
      const posAttr = geometry.attributes.position;
      for (let i = 0; i < particleCount; i++) {
        const orig = originalPositions[i];
        posAttr.setX(i, orig.x + Math.sin(elapsedTime * orig.speed + orig.seed) * 0.4);
        posAttr.setY(i, orig.y + Math.cos(elapsedTime * orig.speed * 0.8 + orig.seed) * 0.4);
      }
      posAttr.needsUpdate = true;

      // Rebuild line segments
      const linePositions = [];
      const currentPos = posAttr.array;

      for (let i = 0; i < particleCount; i++) {
        const x1 = currentPos[i * 3];
        const y1 = currentPos[i * 3 + 1];
        const z1 = currentPos[i * 3 + 2];

        // Find closest particles and connect
        let connections = 0;
        for (let j = i + 1; j < particleCount; j++) {
          if (connections >= 2) break;
          const x2 = currentPos[j * 3];
          const y2 = currentPos[j * 3 + 1];
          const z2 = currentPos[j * 3 + 2];

          const dist = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2 + (z1 - z2) ** 2);
          if (dist < 6.5) {
            linePositions.push(x1, y1, z1);
            linePositions.push(x2, y2, z2);
            connections++;
          }
        }
      }

      lineMesh.geometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
      lineMesh.geometry.attributes.position.needsUpdate = true;

      // Mouse movements smooth lag
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      // Rotate scene slowly
      group.rotation.y = elapsedTime * 0.08 + mouseX;
      group.rotation.x = elapsedTime * 0.05 - mouseY;

      renderer.render(scene, camera);
    };

    animate();

    // Clean up
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 0,
        pointerEvents: 'none'
      }}
    />
  );
}
