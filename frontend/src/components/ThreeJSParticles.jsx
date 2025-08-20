// src/components/ThreeJSParticles.jsx
import React, { useEffect, useRef } from "react";

const ThreeJSParticles = () => {
  const threeJsContainer = useRef(null);

  useEffect(() => {
    const loadThreeJS = () => {
      return new Promise((resolve) => {
        if (window.THREE) return resolve();

        const script = document.createElement("script");
        script.src =
          "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
        script.onload = () => {
          const script2 = document.createElement("script");
          script2.src =
            "https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.min.js";
          document.body.appendChild(script2);
          resolve();
        };
        document.body.appendChild(script);
      });
    };

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
      camera.position.z = 40;

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0);
      threeJsContainer.current.appendChild(renderer.domElement);

      // ==============================
      // REAL LEAF TEXTURES (PNG images)
      // ==============================
      const loader = new THREE.TextureLoader();
      const leafTextures = [
        loader.load("/threeJS/snow/snow1.png"),
        loader.load("/threeJS/snow/snow3.png"),
        loader.load("/threeJS/snow/snow3.png"),
      ];
      leafTextures.forEach((t) => {
        t.minFilter = THREE.LinearFilter;
        t.magFilter = THREE.LinearFilter;
        t.generateMipmaps = false;
      });

      // ==============================
      // LEAF PARTICLE SYSTEM
      // ==============================
      const particleCount = 400; // fewer leaves
      const particlesGeometry = new THREE.BufferGeometry();

      const posArray = new Float32Array(particleCount * 3);
      const velArray = new Float32Array(particleCount * 3);
      const sizeArray = new Float32Array(particleCount);
      const opacityArray = new Float32Array(particleCount);
      const swayArray = new Float32Array(particleCount);
      const typeArray = new Float32Array(particleCount);
      const rotationSpeedArray = new Float32Array(particleCount);

      for (let i = 0; i < particleCount; i++) {
        posArray[i * 3] = (Math.random() - 0.5) * 100;
        posArray[i * 3 + 1] = Math.random() * 50 + 25;
        posArray[i * 3 + 2] = (Math.random() - 0.5) * 30;

        const speed = Math.random() * 0.1 + 0.02;
        velArray[i * 3] = (Math.random() - 0.5) * 0.05;
        velArray[i * 3 + 1] = -speed;
        velArray[i * 3 + 2] = (Math.random() - 0.5) * 0.05;

        // Random sizes (small, medium, big)
        const rand = Math.random();
        if (rand < 0.3) sizeArray[i] = 1; // small
        else if (rand < 0.7) sizeArray[i] = 3; // medium
        else sizeArray[i] = 4; // big

        opacityArray[i] = Math.random() * 0.6 + 0.4;
        swayArray[i] = Math.random() * 0.03;
        typeArray[i] = Math.floor(Math.random() * leafTextures.length);

        // Each leaf tumbles differently
        rotationSpeedArray[i] = (Math.random() - 0.5) * 2.0;
      }

      particlesGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(posArray, 3)
      );
      particlesGeometry.setAttribute(
        "velocity",
        new THREE.BufferAttribute(velArray, 3)
      );
      particlesGeometry.setAttribute(
        "size",
        new THREE.BufferAttribute(sizeArray, 1)
      );
      particlesGeometry.setAttribute(
        "opacity",
        new THREE.BufferAttribute(opacityArray, 1)
      );
      particlesGeometry.setAttribute(
        "sway",
        new THREE.BufferAttribute(swayArray, 1)
      );
      particlesGeometry.setAttribute(
        "type",
        new THREE.BufferAttribute(typeArray, 1)
      );
      particlesGeometry.setAttribute(
        "rotationSpeed",
        new THREE.BufferAttribute(rotationSpeedArray, 1)
      );

      // ==============================
      // SHADER FOR LEAF TEXTURES
      // ==============================
      const leafMaterial = new THREE.ShaderMaterial({
        uniforms: {
          leaf1: { value: leafTextures[0] },
          leaf2: { value: leafTextures[1] },
          leaf3: { value: leafTextures[2] },
        },
        vertexShader: `
          attribute float size;
          attribute float opacity;
          attribute float type;
          attribute float rotationSpeed;
          varying float vType;
          varying float vOpacity;
          varying float vRotation;

          void main() {
            vType = type;
            vOpacity = opacity;
            vRotation = rotationSpeed * position.y * 0.05; // spin as it falls
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = size * (300.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          uniform sampler2D leaf1;
          uniform sampler2D leaf2;
          uniform sampler2D leaf3;
          varying float vType;
          varying float vOpacity;
          varying float vRotation;

          void main() {
            vec2 uv = gl_PointCoord;
            // rotate texture coordinates
            float angle = vRotation;
            float s = sin(angle);
            float c = cos(angle);
            uv = vec2(
              c * (uv.x - 0.5) - s * (uv.y - 0.5) + 0.5,
              s * (uv.x - 0.5) + c * (uv.y - 0.5) + 0.5
            );

            vec4 texColor;
            if (vType < 0.5) texColor = texture2D(leaf1, uv);
            else if (vType < 1.5) texColor = texture2D(leaf2, uv);
            else texColor = texture2D(leaf3, uv);

            if (texColor.a < 0.1) discard; // transparent edges
            gl_FragColor = vec4(texColor.rgb, texColor.a * vOpacity);
          }
        `,
        blending: THREE.NormalBlending,
        depthTest: true,
        transparent: true,
      });

      const particlesMesh = new THREE.Points(particlesGeometry, leafMaterial);
      scene.add(particlesMesh);

      // Lights
      scene.add(new THREE.AmbientLight(0xffffff, 0.7));

      // Animation
      const clock = new THREE.Clock();
      const animate = () => {
        requestAnimationFrame(animate);
        const delta = clock.getDelta();
        const time = clock.getElapsedTime();

        const positions = particlesGeometry.attributes.position.array;
        const velocities = particlesGeometry.attributes.velocity.array;
        const sways = particlesGeometry.attributes.sway.array;

        for (let i = 0; i < particleCount * 3; i += 3) {
          positions[i] += Math.sin(time + i) * sways[i / 3] * delta * 10;
          positions[i] += velocities[i] * delta * 20;
          positions[i + 1] += velocities[i + 1] * delta * 20;
          positions[i + 2] += velocities[i + 2] * delta * 20;

          // Leaves "land" on bottom instead of resetting
          if (positions[i + 1] < -25) {
            velocities[i + 1] = 0; // stop falling
            velocities[i] = 0; // no more horizontal drift
            velocities[i + 2] = 0;
          }
        }

        particlesGeometry.attributes.position.needsUpdate = true;
        renderer.render(scene, camera);
      };
      animate();

      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        if (threeJsContainer.current && renderer.domElement) {
          threeJsContainer.current.removeChild(renderer.domElement);
        }
      };
    };

    initThreeJS();
  }, []);

  return (
    <div
      ref={threeJsContainer}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        opacity: 0.95,
        pointerEvents: "none",
      }}
    />
  );
};

export default ThreeJSParticles;
