// src/components/ThreeJSParticles.jsx
import React, { useEffect, useRef } from 'react';

const ThreeJSParticles = () => {
  const threeJsContainer = useRef(null);

  useEffect(() => {
    // Load Three.js dynamically
    const loadThreeJS = () => {
      return new Promise((resolve) => {
        if (window.THREE) return resolve();
        
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
        script.onload = () => {
          // Load additional Three.js components if needed
          const script2 = document.createElement('script');
          script2.src = 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.min.js';
          document.body.appendChild(script2);
          resolve();
        };
        document.body.appendChild(script);
      });
    };

    // Initialize Three.js scene
    const initThreeJS = async () => {
      await loadThreeJS();
      
      if (!threeJsContainer.current || !window.THREE) return;

      const { THREE } = window;
      
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75, 
        window.innerWidth / window.innerHeight, 
        0.1, 
        1000
      );
      camera.position.z = 30;

      const renderer = new THREE.WebGLRenderer({ 
        alpha: true, 
        antialias: true,
        precision: 'mediump'
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0);
      threeJsContainer.current.appendChild(renderer.domElement);

      // Create a circular snowflake texture
      const createSnowTexture = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        
        // Draw circular snowflake with soft shadow
        const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.8)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(32, 32, 30, 0, Math.PI * 2);
        ctx.fill();
        
        // Add subtle shadow for visibility on images
        ctx.globalCompositeOperation = 'source-over';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.beginPath();
        ctx.arc(32, 32, 28, 0, Math.PI * 2);
        ctx.fill();
        
        return canvas;
      };

      // Create orange snowball texture
      const createOrangeSnowTexture = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        
        // Draw circular snowball with orange tint
        const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        gradient.addColorStop(0, 'rgba(255, 230, 180, 1)');
        gradient.addColorStop(0.5, 'rgba(255, 200, 120, 0.9)');
        gradient.addColorStop(1, 'rgba(255, 180, 80, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(32, 32, 30, 0, Math.PI * 2);
        ctx.fill();
        
        // Add stronger shadow for better visibility
        ctx.globalCompositeOperation = 'source-over';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
        ctx.shadowBlur = 12;
        ctx.shadowOffsetX = 3;
        ctx.shadowOffsetY = 3;
        ctx.beginPath();
        ctx.arc(32, 32, 28, 0, Math.PI * 2);
        ctx.fill();
        
        return canvas;
      };

      // Create textures
      const snowTextureCanvas = createSnowTexture();
      const orangeSnowTextureCanvas = createOrangeSnowTexture();
      
      const snowTexture = new THREE.CanvasTexture(snowTextureCanvas);
      const orangeSnowTexture = new THREE.CanvasTexture(orangeSnowTextureCanvas);

      // Create snowflake particle system
      const particlesGeometry = new THREE.BufferGeometry();
      const particleCount = 2000;

      const posArray = new Float32Array(particleCount * 3);
      const velArray = new Float32Array(particleCount * 3);
      const sizeArray = new Float32Array(particleCount);
      const opacityArray = new Float32Array(particleCount);
      const swayArray = new Float32Array(particleCount);
      const typeArray = new Float32Array(particleCount); // 0 = snowflake, 1 = orange snowball
      
      for (let i = 0; i < particleCount; i++) {
        // Position - start at random positions in the view
        posArray[i * 3] = (Math.random() - 0.5) * 100;
        posArray[i * 3 + 1] = Math.random() * 50 + 25; // Start above the view
        posArray[i * 3 + 2] = (Math.random() - 0.5) * 30;
        
        // Velocity - different speeds for realism
        const speed = Math.random() * 0.1 + 0.03;
        velArray[i * 3] = (Math.random() - 0.5) * 0.02; // Slight horizontal movement
        velArray[i * 3 + 1] = -speed; // Downward motion
        velArray[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
        
        // Size - different sizes for snowflakes and snowballs
        const isSnowball = Math.random() > 0.8; // 20% chance to be a snowball
        if (isSnowball) {
          sizeArray[i] = Math.random() * 0.8 + 0.5; // Larger size for snowballs
          typeArray[i] = 1; // Mark as orange snowball
        } else {
          sizeArray[i] = Math.random() * 0.3 + 0.1; // Regular size for snowflakes
          typeArray[i] = 0; // Mark as snowflake
        }
        
        // Opacity - variation for depth effect
        opacityArray[i] = Math.random() * 0.5 + 0.3;
        
        // Sway factor for gentle side-to-side motion
        swayArray[i] = Math.random() * 0.02;
      }

      particlesGeometry.setAttribute(
        'position',
        new THREE.BufferAttribute(posArray, 3)
      );
      
      particlesGeometry.setAttribute(
        'velocity',
        new THREE.BufferAttribute(velArray, 3)
      );
      
      particlesGeometry.setAttribute(
        'size',
        new THREE.BufferAttribute(sizeArray, 1)
      );
      
      particlesGeometry.setAttribute(
        'opacity',
        new THREE.BufferAttribute(opacityArray, 1)
      );
      
      particlesGeometry.setAttribute(
        'sway',
        new THREE.BufferAttribute(swayArray, 1)
      );
      
      particlesGeometry.setAttribute(
        'type',
        new THREE.BufferAttribute(typeArray, 1)
      );

      // Create custom shader material for different snow types
      const snowMaterial = new THREE.ShaderMaterial({
        uniforms: {
          snowTexture: { value: snowTexture },
          orangeSnowTexture: { value: orangeSnowTexture },
        },
        vertexShader: `
          attribute float size;
          attribute float opacity;
          attribute float type;
          varying float vType;
          varying float vOpacity;
          
          void main() {
            vType = type;
            vOpacity = opacity;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = size * (300.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          uniform sampler2D snowTexture;
          uniform sampler2D orangeSnowTexture;
          varying float vType;
          varying float vOpacity;
          
          void main() {
            vec2 uv = gl_PointCoord;
            vec4 texColor;
            
            if (vType > 0.5) {
              texColor = texture2D(orangeSnowTexture, uv);
            } else {
              texColor = texture2D(snowTexture, uv);
            }
            
            gl_FragColor = vec4(texColor.rgb, texColor.a * vOpacity);
          }
        `,
        blending: THREE.NormalBlending,
        depthTest: true,
        transparent: true
      });

      const particlesMesh = new THREE.Points(particlesGeometry, snowMaterial);
      scene.add(particlesMesh);

      // Add lighting to enhance visibility
      const ambientLight = new THREE.AmbientLight(0x606060);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
      directionalLight.position.set(1, 1, 1);
      scene.add(directionalLight);

      // Add a subtle orange-tinted light for the snowballs
      const orangeLight = new THREE.PointLight(0xffa050, 0.5, 100);
      orangeLight.position.set(10, 10, 10);
      scene.add(orangeLight);

      // Animation loop
      const clock = new THREE.Clock();
      
      const animate = () => {
        requestAnimationFrame(animate);
        
        const delta = clock.getDelta();
        const time = clock.getElapsedTime();
        
        const positions = particlesGeometry.attributes.position.array;
        const velocities = particlesGeometry.attributes.velocity.array;
        const opacities = particlesGeometry.attributes.opacity.array;
        const sways = particlesGeometry.attributes.sway.array;
        
        for (let i = 0; i < particleCount * 3; i += 3) {
          // Add gentle swaying motion to snowflakes
          positions[i] += Math.sin(time + i) * sways[i/3] * delta * 10;
          
          // Update position with velocity
          positions[i] += velocities[i] * delta * 20;
          positions[i + 1] += velocities[i + 1] * delta * 20;
          positions[i + 2] += velocities[i + 2] * delta * 20;
          
          // Reset particles that fall below the view
          if (positions[i + 1] < -30) {
            positions[i + 1] = Math.random() * 20 + 30;
            positions[i] = (Math.random() - 0.5) * 100;
            positions[i + 2] = (Math.random() - 0.5) * 30;
            
            // Randomize velocity slightly when resetting
            velocities[i + 1] = -(Math.random() * 0.1 + 0.03);
          }
          
          // Subtle opacity changes for more dynamic appearance
          opacities[i/3] = 0.3 + Math.sin(time + i) * 0.2;
        }
        
        particlesGeometry.attributes.position.needsUpdate = true;
        particlesGeometry.attributes.opacity.needsUpdate = true;
        
        // Very gentle overall rotation for natural feel
        particlesMesh.rotation.y += 0.0001;

        renderer.render(scene, camera);
      };
      animate();

      // Handle resize
      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        if (threeJsContainer.current && renderer.domElement) {
          threeJsContainer.current.removeChild(renderer.domElement);
        }
      };
    };

    initThreeJS();

    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <div 
      ref={threeJsContainer} 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        opacity: 0.9,
        pointerEvents: 'none'
      }}
    />
  );
};

export default ThreeJSParticles;