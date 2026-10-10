'use client';
import { useRef, useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import Image from 'next/image';
import * as THREE from 'three';
import { useLanguage } from '@/context/LanguageContext';
import useIsMobile from '@/lib/useIsMobile';

const AboutSection = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 800px;
  background-color: transparent;
  overflow: visible;
  font-family: ${({ theme }) => theme.fonts?.sans || "'Inter', sans-serif"};

  @media (min-width: 769px) {
    touch-action: none;
  }
`;

const CanvasContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const UILayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  pointer-events: none;
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;

  @media (min-width: 768px) {
    padding: 2.5rem;
    flex-direction: row;
  }
`;

const HeaderBox = styled.header`
  max-width: 38rem;
  pointer-events: auto;
  animation: fadeIn 1s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const Badge = styled.div`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  margin-bottom: 1rem;
  border-radius: 9999px;
  background-color: ${({ theme }) => theme.name === 'dark' ? 'rgba(99, 102, 241, 0.2)' : 'rgba(99, 102, 241, 0.1)'};
  border: 1px solid ${({ theme }) => theme.name === 'dark' ? 'rgba(99, 102, 241, 0.3)' : 'rgba(99, 102, 241, 0.5)'};
  color: ${({ theme }) => theme.colors.accentDark || theme.colors.accent};
  font-size: 0.75rem;
  font-family: ${({ theme }) => theme.fonts?.mono || "'Fira Code', monospace"};
  letter-spacing: 0.05em;
  text-transform: uppercase;
`;

const InfoContent = styled.div`
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-out;
  
  &.fade-out {
    opacity: 0;
    transform: translateY(10px);
  }
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
`;

const CardIcon = styled.span`
  font-size: 2.25rem;
  filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));

  @media (min-width: 768px) {
    font-size: 3rem;
  }
`;

const CardTitle = styled.h1`
  font-size: 2.25rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  letter-spacing: -0.025em;
  margin: 0;
  filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));

  @media (min-width: 768px) {
    font-size: 2.75rem;
  }
`;

const CardDesc = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.875rem;
  max-width: 28rem;
  line-height: 1.625;
  margin: 0;

  @media (min-width: 768px) {
    font-size: 1rem;
  }
`;

/* Profile Card Component */
const ProfileCard = styled.div`
  pointer-events: auto;
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1rem 1.25rem;
  border-radius: 20px;
  background: ${({ theme }) => theme.name === 'dark' 
    ? 'rgba(15, 23, 42, 0.75)' 
    : 'rgba(255, 255, 255, 0.85)'};
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid ${({ theme }) => theme.name === 'dark' 
    ? 'rgba(255, 255, 255, 0.12)' 
    : 'rgba(0, 0, 0, 0.08)'};
  box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.4);
  max-width: 380px;
  width: 100%;
  margin-top: 1rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  @media (min-width: 768px) {
    margin-top: 0;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 25px 50px -12px rgba(99, 102, 241, 0.25);
  }
`;

const ProfileImgRing = styled.div`
  position: relative;
  width: 76px;
  height: 76px;
  min-width: 76px;
  border-radius: 50%;
  padding: 3px;
  background: linear-gradient(135deg, #6366f1, #10b981, #06b6d4);
  box-shadow: 0 4px 15px rgba(99, 102, 241, 0.35);

  img {
    border-radius: 50%;
    object-fit: cover;
    display: block;
  }
`;

const ProfileTextWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const ProfileName = styled.h3`
  font-size: 1.125rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ProfileRole = styled.p`
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.accentDark || '#6366f1'};
  font-weight: 600;
  margin: 0;
`;

const ProfileStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.name === 'dark' ? '#94a3b8' : '#64748b'};
  margin-top: 0.2rem;
`;

const StatusDot = styled.span`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: #10b981;
  box-shadow: 0 0 8px #10b981;
  display: inline-block;
  animation: pulseDot 2s infinite ease-in-out;

  @keyframes pulseDot {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(0.85); }
  }
`;

const contentData = {
  default: {
    title: "Engineering Command Center",
    desc: "Hover or interact with elements on my desk to explore my tech stack, projects, and problem-solving journey. Move your cursor to rotate the 3D space.",
    icon: "🚀"
  },
  laptop: {
    title: "Software Development Stack",
    desc: "Building responsive, high-performance applications using Python, React.js, Vite, and MySQL.",
    icon: "💻"
  },
  monitor: {
    title: "DSA & Problem Solving",
    desc: "460+ problems solved across LeetCode (210+) and CodeChef (250+), mastering dynamic programming, graph algorithms, and space-time optimization.",
    icon: "⚡"
  },
  coffee: {
    title: "Backend Architecture & Code",
    desc: "Engineering scalable backend architectures, high-performance data processing pipelines, and clean, modular software solutions.",
    icon: "☕"
  },
  trophy: {
    title: "Leadership & Certifications",
    desc: "PR & Outreach Head at Technovation Club (ABESEC), Anthropic MCP trained, and competitive programming achiever.",
    icon: "🏆"
  }
};

export default function About() {
  const { t, isRTL } = useLanguage();
  const themeContext = useTheme();
  const isMobile = useIsMobile();
  const mountRef = useRef(null);
  const [hoveredData, setHoveredData] = useState(contentData.default);
  const [isFading, setIsFading] = useState(false);
  const sceneElementsRef = useRef({});

  // Provide a state-based update UI instead of DOM manipulation
  const handleUpdateUI = (dataKey) => {
    const data = contentData[dataKey] || contentData.default;

    // Use a functional update to avoid stale closures inside three.js animations
    setHoveredData(prev => {
      if (prev.title === data.title) return prev;
      setIsFading(true);
      setTimeout(() => {
        setHoveredData(data);
        setIsFading(false);
      }, 150);
      return prev;
    });
  };

  useEffect(() => {
    if (!mountRef.current || isMobile === undefined) return;

    const initialThemeName = themeContext?.name || 'dark';
    const initialBgColor = themeContext?.colors?.bg || '#0f172a';

    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;
    const initialDensity = initialThemeName === 'dark' ? 0.025 : 0.012;

    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(initialBgColor, initialDensity);

    const baseRadius = Math.sqrt(12 * 12 + 15 * 15); // ~19.2
    const baseAngle = Math.atan2(12, 15);
    const baseHeight = 10;

    camera.position.set(12, 10, 15);
    camera.lookAt(0, 1, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: !isMobile, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isMobile ? 1.0 : Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = !isMobile; // Disable shadow maps on mobile
    if (!isMobile) {
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    }
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfff0dd, 1.2);
    dirLight.position.set(5, 12, 8);
    if (!isMobile) {
      dirLight.castShadow = true;
      dirLight.shadow.mapSize.width = 1024;
      dirLight.shadow.mapSize.height = 1024;
      dirLight.shadow.camera.near = 0.5;
      dirLight.shadow.camera.far = 25;
      dirLight.shadow.camera.left = -10;
      dirLight.shadow.camera.right = 10;
      dirLight.shadow.camera.top = 10;
      dirLight.shadow.camera.bottom = -10;
      dirLight.shadow.bias = -0.001;
    }
    scene.add(dirLight);

    const fillLight = new THREE.DirectionalLight(0xcceeff, 0.4);
    fillLight.position.set(-5, 5, -5);
    scene.add(fillLight);

    const monitorLight = new THREE.PointLight(0x00f3ff, 1.5, 8);
    monitorLight.position.set(0, 3, 1);
    scene.add(monitorLight);

    const interactables = [];

    // Load photo texture for 3D monitor screen
    const textureLoader = new THREE.TextureLoader();
    const monitorTexture = textureLoader.load('/profile-monitor.jpg');
    monitorTexture.colorSpace = THREE.SRGBColorSpace;
    monitorTexture.wrapS = THREE.ClampToEdgeWrapping;
    monitorTexture.wrapT = THREE.ClampToEdgeWrapping;

    const mats = {
      wood: new THREE.MeshStandardMaterial({ color: 0x5c4033, roughness: 0.8, name: "wood" }),
      woodEdge: new THREE.MeshStandardMaterial({ color: 0x4a332a, roughness: 0.9 }),
      silver: new THREE.MeshStandardMaterial({ color: 0xc0c0c0, metalness: 0.5, roughness: 0.4 }),
      darkSilver: new THREE.MeshStandardMaterial({ color: 0x808080, metalness: 0.6, roughness: 0.5 }),
      dark: new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.7 }),
      screen: new THREE.MeshStandardMaterial({ color: 0x050505, roughness: 0.2 }),
      screenGlow: new THREE.MeshStandardMaterial({ color: 0x00f3ff, emissive: 0x004488, emissiveIntensity: 0.8 }),
      photoScreen: new THREE.MeshStandardMaterial({ 
        map: monitorTexture, 
        roughness: 0.3,
        metalness: 0.1,
        emissive: 0x222222,
        emissiveIntensity: 0.2
      }),
      white: new THREE.MeshStandardMaterial({ color: 0xf3f4f6, roughness: 0.2 }),
      coffee: new THREE.MeshStandardMaterial({ color: 0x3b2818, roughness: 0.1 }),
      gold: new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 0.8, roughness: 0.2 }),
      leaf: new THREE.MeshStandardMaterial({ color: 0x2e8b57, roughness: 0.7 }),
      pot: new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.5 })
    };

    function createMesh(geometry, material, castShadow = true) {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.castShadow = castShadow;
      mesh.receiveShadow = true;
      return mesh;
    }

    const floor = createMesh(new THREE.PlaneGeometry(50, 50), new THREE.MeshStandardMaterial({ color: initialBgColor, roughness: 1 }), false);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -3;
    scene.add(floor);

    const gridColor = initialThemeName === 'dark' ? 0x1e293b : 0xe2e8f0; // Adjust grid color based on theme
    const grid = new THREE.GridHelper(50, 50, gridColor, gridColor);
    grid.material.vertexColors = false;
    grid.material.color.setHex(gridColor);
    grid.position.y = -2.99;
    scene.add(grid);

    sceneElementsRef.current = {
      scene,
      floorMaterial: floor.material,
      gridMaterial: grid.material,
      ambientLight,
      dirLight
    };

    const deskGroup = new THREE.Group();
    const top = createMesh(new THREE.BoxGeometry(14, 0.4, 7), mats.wood);
    top.position.y = -0.2;

    const legGeo = new THREE.CylinderGeometry(0.15, 0.1, 2.8);
    const positions = [
      [-6.5, -1.6, -3], [6.5, -1.6, -3],
      [-6.5, -1.6, 3], [6.5, -1.6, 3]
    ];
    positions.forEach(pos => {
      const leg = createMesh(legGeo, mats.dark);
      leg.position.set(...pos);
      deskGroup.add(leg);
    });

    deskGroup.add(top);
    scene.add(deskGroup);

    const laptop = new THREE.Group();
    const lBase = createMesh(new THREE.BoxGeometry(2.6, 0.1, 1.8), mats.silver);
    lBase.position.y = 0.05;
    const lKeyboard = createMesh(new THREE.BoxGeometry(2.2, 0.11, 1.0), mats.dark);
    lKeyboard.position.set(0, 0.05, -0.1);
    const lScreen = createMesh(new THREE.BoxGeometry(2.6, 1.7, 0.1), mats.silver);
    lScreen.position.set(0, 0.9, -0.85);
    lScreen.rotation.x = -Math.PI / 15;
    const lDisplay = createMesh(new THREE.BoxGeometry(2.4, 1.5, 0.11), mats.screen);
    lDisplay.position.set(0, 0.9, -0.85);
    lDisplay.rotation.x = -Math.PI / 15;

    laptop.add(lBase, lKeyboard, lScreen, lDisplay);
    laptop.position.set(-3.5, 0, 1.5);
    laptop.rotation.y = Math.PI / 6;

    laptop.userData = { id: 'laptop', originalY: 0, hoverScale: 1.05 };
    scene.add(laptop);
    interactables.push(laptop);

    const monitor = new THREE.Group();
    const mBase = createMesh(new THREE.BoxGeometry(1.5, 0.1, 1.2), mats.darkSilver);
    mBase.position.y = 0.05;
    const mNeck = createMesh(new THREE.CylinderGeometry(0.1, 0.15, 1.5), mats.darkSilver);
    mNeck.position.set(0, 0.8, -0.2);
    mNeck.rotation.x = Math.PI / 16;
    const mBody = createMesh(new THREE.BoxGeometry(5.0, 3.0, 0.2), mats.dark);
    mBody.position.set(0, 2.0, 0);

    const mDisplayMats = [
      mats.dark, mats.dark, mats.dark, mats.dark, mats.photoScreen, mats.dark
    ];
    const mDisplay = createMesh(new THREE.BoxGeometry(4.8, 2.8, 0.22), mDisplayMats);
    mDisplay.position.set(0, 2.0, 0);
    mDisplay.userData.isGlow = true; // Use emissive smartly

    monitor.add(mBase, mNeck, mBody, mDisplay);
    monitor.position.set(0, 0, -1.5);

    monitor.userData = { id: 'monitor', originalY: 0, hoverScale: 1.02 };
    scene.add(monitor);
    interactables.push(monitor);

    const coffee = new THREE.Group();
    const cCup = createMesh(new THREE.CylinderGeometry(0.35, 0.28, 0.7, 16), mats.white);
    cCup.position.y = 0.35;
    const cHandle = createMesh(new THREE.TorusGeometry(0.18, 0.06, 8, 16), mats.white);
    cHandle.position.set(0.35, 0.35, 0);
    cHandle.rotation.y = Math.PI / 2;
    const cLiquid = createMesh(new THREE.CylinderGeometry(0.32, 0.32, 0.65, 16), mats.coffee);
    cLiquid.position.y = 0.36;

    coffee.add(cCup, cHandle, cLiquid);
    coffee.position.set(3.5, 0, 1.5);

    coffee.userData = { id: 'coffee', originalY: 0, hoverScale: 1.1 };
    scene.add(coffee);
    interactables.push(coffee);

    const plant = new THREE.Group();
    const pPot = createMesh(new THREE.CylinderGeometry(0.5, 0.35, 0.8, 16), mats.pot);
    pPot.position.y = 0.4;

    const pLeaf1 = createMesh(new THREE.SphereGeometry(0.4, 8, 8), mats.leaf);
    pLeaf1.scale.set(0.3, 1, 0.8);
    pLeaf1.rotation.set(0.4, 0.2, -0.3);
    pLeaf1.position.set(0.1, 0.9, 0);

    const pLeaf2 = createMesh(new THREE.SphereGeometry(0.35, 8, 8), mats.leaf);
    pLeaf2.scale.set(0.3, 0.9, 0.7);
    pLeaf2.rotation.set(-0.3, -0.4, 0.4);
    pLeaf2.position.set(-0.1, 0.8, 0.1);

    const pLeaf3 = createMesh(new THREE.SphereGeometry(0.3, 8, 8), mats.leaf);
    pLeaf3.scale.set(0.25, 0.8, 0.6);
    pLeaf3.rotation.set(0.1, 0.8, 0.2);
    pLeaf3.position.set(0, 0.85, -0.1);

    plant.add(pPot, pLeaf1, pLeaf2, pLeaf3);
    plant.position.set(5.2, 0, -1.8);

    scene.add(plant);

    const trophy = new THREE.Group();
    const tBase = createMesh(new THREE.CylinderGeometry(0.3, 0.35, 0.2, 16), mats.dark);
    tBase.position.y = 0.1;
    const tStem = createMesh(new THREE.CylinderGeometry(0.08, 0.08, 0.4, 8), mats.gold);
    tStem.position.y = 0.4;
    const tCup = createMesh(new THREE.CylinderGeometry(0.25, 0.1, 0.5, 16), mats.gold);
    tCup.position.y = 0.8;

    trophy.add(tBase, tStem, tCup);
    trophy.position.set(-5.2, 0, -1.8);

    trophy.userData = { id: 'trophy', originalY: 0, hoverScale: 1.15 };
    scene.add(trophy);
    interactables.push(trophy);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-1000, -1000);
    let targetCameraAngle = baseAngle;
    let targetCameraRadius = baseRadius;
    let targetCameraHeight = baseHeight;

    let currentCameraAngle = baseAngle;
    let currentCameraRadius = baseRadius;
    let currentCameraHeight = baseHeight;

    const onPointerMove = (event) => {
      const rect = container.getBoundingClientRect();
      const clientX = event.clientX !== undefined ? event.clientX : (event.touches && event.touches[0].clientX);
      const clientY = event.clientY !== undefined ? event.clientY : (event.touches && event.touches[0].clientY);

      if (clientX === undefined || clientY === undefined) return;

      mouse.x = ((clientX - rect.left) / width) * 2 - 1;
      mouse.y = -((clientY - rect.top) / height) * 2 + 1;

      // Restrict camera movement on mobile to avoid heavy continuous layout recalcs
      const factor = isMobile ? 0.3 : 0.8;
      targetCameraAngle = baseAngle + mouse.x * (Math.PI / 10) * factor;
      targetCameraHeight = baseHeight - mouse.y * 3 * factor;
      targetCameraRadius = baseRadius + mouse.y * 2 * factor;
    };

    container.addEventListener('pointermove', onPointerMove, { passive: true });
    container.addEventListener('touchstart', onPointerMove, { passive: true });

    let hoveredObject = null;

    const checkIntersections = () => {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactables, true);

      if (intersects.length > 0) {
        let topGroup = intersects[0].object;
        while (topGroup.parent && !topGroup.userData.id && topGroup.parent !== scene) {
          topGroup = topGroup.parent;
        }

        if (topGroup.userData && topGroup.userData.id) {
          if (hoveredObject !== topGroup) {
            if (hoveredObject) resetHover(hoveredObject);
            hoveredObject = topGroup;
            applyHover(hoveredObject);
          }
          return;
        }
      }

      if (hoveredObject) {
        resetHover(hoveredObject);
        hoveredObject = null;
      }
    };

    const applyHover = (obj) => {
      document.body.style.cursor = 'pointer';
      handleUpdateUI(obj.userData.id);
    };

    const resetHover = (obj) => {
      document.body.style.cursor = 'default';
      handleUpdateUI('default');
    };

    let animationFrameId;
    let isVisible = true;

    function animate() {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return; // Skip rendering when section is out of viewport

      currentCameraAngle += (targetCameraAngle - currentCameraAngle) * 0.05;
      currentCameraRadius += (targetCameraRadius - currentCameraRadius) * 0.05;
      currentCameraHeight += (targetCameraHeight - currentCameraHeight) * 0.05;

      camera.position.x = Math.sin(currentCameraAngle) * currentCameraRadius;
      camera.position.z = Math.cos(currentCameraAngle) * currentCameraRadius;
      camera.position.y = currentCameraHeight;
      camera.lookAt(0, 1, 0);

      interactables.forEach(item => {
        const isTarget = hoveredObject === item;
        const targetScale = isTarget ? item.userData.hoverScale : 1.0;
        item.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

        if (item.userData.id === 'laptop') {
          const targetRot = isTarget ? Math.PI / 5 : Math.PI / 6;
          item.rotation.y += (targetRot - item.rotation.y) * 0.1;
        } else if (item.userData.id === 'coffee') {
          if (isTarget) {
            item.position.y = item.userData.originalY + Math.sin(Date.now() * 0.005) * 0.08;
          } else {
            item.position.y += (item.userData.originalY - item.position.y) * 0.1;
          }
        } else if (item.userData.id === 'trophy') {
          if (isTarget) {
            item.rotation.y += 0.03;
          }
        }
      });

      checkIntersections();
      renderer.render(scene, camera);
    }

    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(isMobile ? 1.0 : Math.min(window.devicePixelRatio, 2));
      checkIntersections();
    };

    window.addEventListener('resize', handleResize);

    // Pause rendering when out of view for GPU savings
    const visibilityObserver = new IntersectionObserver((entries) => {
      isVisible = entries[0].isIntersecting;
    }, { threshold: 0.05 });
    visibilityObserver.observe(container);

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      visibilityObserver.disconnect();
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('pointermove', onPointerMove);
      container.removeEventListener('touchstart', onPointerMove);

      scene.traverse(object => {
        if (object.isMesh) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach(m => m.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      document.body.style.cursor = 'default';
      sceneElementsRef.current = {};
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]); // Re-create scene if mobile state changes

  useEffect(() => {
    if (!sceneElementsRef.current.scene || !themeContext) return;

    const { scene, floorMaterial, gridMaterial, ambientLight, dirLight } = sceneElementsRef.current;

    // We adjust fog density: lower for light mode so we don't wash out colors in white fog
    const targetDensity = themeContext.name === 'dark' ? 0.025 : 0.012;
    const bgColor = new THREE.Color(themeContext.colors.bg);

    if (scene.fog) {
      scene.fog.color.copy(bgColor);
      scene.fog.density = targetDensity;
    }

    // In light mode we slightly adjust the ambient and directional lights for better contrast
    if (ambientLight) {
      ambientLight.intensity = themeContext.name === 'dark' ? 0.6 : 0.8;
    }
    if (dirLight) {
      dirLight.intensity = themeContext.name === 'dark' ? 1.2 : 0.9;
    }

    if (floorMaterial) {
      floorMaterial.color.copy(bgColor);
    }
    if (gridMaterial) {
      gridMaterial.color.setHex(themeContext.name === 'dark' ? 0x1e293b : 0xcbd5e1);
    }
  }, [themeContext]);

  return (
    <AboutSection id="about" $isRTL={isRTL}>
      <CanvasContainer ref={mountRef}></CanvasContainer>
      <UILayer>
        <HeaderBox>
          <Badge>{t('about.label') || 'Interactive Workspace'}</Badge>

          <InfoContent className={isFading ? 'fade-out' : ''}>
            <TitleRow>
              <CardIcon>{hoveredData.icon}</CardIcon>
              <CardTitle>{hoveredData.title}</CardTitle>
            </TitleRow>
            <CardDesc>
              {hoveredData.desc}
            </CardDesc>
          </InfoContent>
        </HeaderBox>

        <ProfileCard>
          <ProfileImgRing>
            <Image 
              src="/profile-about.jpg" 
              alt="Harshit Gupta" 
              width={70} 
              height={70} 
              priority
            />
          </ProfileImgRing>
          <ProfileTextWrap>
            <ProfileName>Harshit Gupta</ProfileName>
            <ProfileRole>Software Developer • AIML</ProfileRole>
            <ProfileStatus>
              <StatusDot /> Open for Opportunities
            </ProfileStatus>
          </ProfileTextWrap>
        </ProfileCard>
      </UILayer>
    </AboutSection>
  );
}
