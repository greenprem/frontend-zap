import { useState, useEffect, useRef } from "react";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";
import * as THREE from 'three';

// Models configuration - Add new models here
const MODELS_CONFIG = [
  {
    id: "alka",
    title: "ALKA Satellite",
    subtitle: "",
    modelPath: "/assets/models/alka_assembly.glb",
    type: "CanSat",
    mission: "Earth Observation",
    status: "Development",
    specifications: {
      model: "ALKA Assembly",
      type: "CanSat",
      mission: "Earth Observation",
      status: "Development"
    },
    components: [

    ],
    missionGoals: [

    ],
    description: "Our handcrafted satellite model brought to life in interactive 3D.",
    fallbackColor: 0x00ff88
  },
  {
    id: "inspace",
    title: "InSpace Satellite",
    subtitle: "",
    modelPath: "/assets/models/new_assembly.glb",
    type: "CanSat",
    mission: "Earth Observation",
    status: "Development",
    specifications: {
      model: "InSpace Assembly",
      type: "CanSat",
      mission: "Earth Observation",
      status: "Development"
    },
    components: [

    ],
    missionGoals: [

    ],
    description: "Our handcrafted satellite model brought to life in interactive 3D.",
    fallbackColor: 0x00ff88
  },
  {
    id: "rocketry",
    title: "Rocketry Payload",
    subtitle: "",
    modelPath: "/assets/models/assem_final.glb",
    type: "CanSat",
    mission: "Earth Observation",
    status: "Development",
    specifications: {
      model: "Rocketery Assembly",
      type: "CanSat",
      mission: "Earth Observation",
      status: "Development"
    },
    components: [

    ],
    missionGoals: [

    ],
    description: "Our handcrafted satellite model brought to life in interactive 3D.",
    fallbackColor: 0x00ff88
  },
  // Example of how to add a new model:
  /*
  {
    id: "beta",
    title: "BETA Communications Satellite",
    subtitle: "Advanced Communication Array",
    modelPath: "/assets/models/beta_comms.glb",
    type: "Communications Satellite",
    mission: "Global Communications",
    status: "Testing Phase",
    specifications: {
      model: "BETA-COMM-01",
      type: "Communications Satellite",
      mission: "Global Communications",
      status: "Testing Phase"
    },
    components: [
      "High-Gain Antenna Array",
      "Signal Processing Unit",
      "Power Management System",
      "Thermal Control System"
    ],
    missionGoals: [
      "Global Coverage",
      "High-Speed Data Transfer",
      "Emergency Communications",
      "Internet Connectivity"
    ],
    description: "Next-generation communication satellite for global connectivity.",
    fallbackColor: 0xff6600
  }
  */
];

// Individual 3D Model Viewer Component
const ModelViewer = ({ modelConfig, viewerHeight = "500px" }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const frameRef = useRef<number>();
  const controlsRef = useRef<any>(null);
  
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isAutoRotating, setIsAutoRotating] = useState(true);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(5, 5, 5);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Enhanced lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    const fillLight1 = new THREE.DirectionalLight(0xffffff, 0.3);
    fillLight1.position.set(-10, 5, 0);
    scene.add(fillLight1);

    const fillLight2 = new THREE.DirectionalLight(0xffffff, 0.2);
    fillLight2.position.set(0, -5, 10);
    scene.add(fillLight2);

    // Initialize orbit controls
    const initControls = async () => {
      try {
        const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls.js');
        
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.screenSpacePanning = false;
        controls.minDistance = 2;
        controls.maxDistance = 50;
        controls.maxPolarAngle = Math.PI;
        controls.autoRotate = isAutoRotating;
        controls.autoRotateSpeed = 2.0;
        
        controlsRef.current = controls;
        
        const animate = () => {
          frameRef.current = requestAnimationFrame(animate);
          
          if (controlsRef.current) {
            controlsRef.current.autoRotate = isAutoRotating;
            controlsRef.current.update();
          }
          
          renderer.render(scene, camera);
        };
        
        animate();
        
      } catch (error) {
        console.error('Error loading OrbitControls:', error);
        setupManualControls();
      }
    };

    // Fallback manual controls
    const setupManualControls = () => {
      let isMouseDown = false;
      let mouseX = 0;
      let mouseY = 0;
      let rotationX = 0;
      let rotationY = 0;
      const rotationSpeed = 0.005;

      const handleMouseDown = (event: MouseEvent) => {
        isMouseDown = true;
        mouseX = event.clientX;
        mouseY = event.clientY;
        renderer.domElement.style.cursor = 'grabbing';
      };

      const handleMouseMove = (event: MouseEvent) => {
        if (!isMouseDown) return;
        
        const deltaX = event.clientX - mouseX;
        const deltaY = event.clientY - mouseY;
        
        rotationY += deltaX * rotationSpeed;
        rotationX += deltaY * rotationSpeed;
        
        rotationX = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, rotationX));
        
        const radius = camera.position.length();
        camera.position.x = radius * Math.sin(rotationY) * Math.cos(rotationX);
        camera.position.y = radius * Math.sin(rotationX);
        camera.position.z = radius * Math.cos(rotationY) * Math.cos(rotationX);
        
        camera.lookAt(0, 0, 0);
        
        mouseX = event.clientX;
        mouseY = event.clientY;
      };

      const handleMouseUp = () => {
        isMouseDown = false;
        renderer.domElement.style.cursor = 'grab';
      };

      const handleWheel = (event: WheelEvent) => {
        event.preventDefault();
        
        const direction = new THREE.Vector3();
        camera.getWorldDirection(direction);
        
        const distance = event.deltaY > 0 ? 0.5 : -0.5;
        camera.position.add(direction.multiplyScalar(distance));
        
        const distanceFromOrigin = camera.position.length();
        if (distanceFromOrigin < 2) {
          camera.position.normalize().multiplyScalar(2);
        } else if (distanceFromOrigin > 50) {
          camera.position.normalize().multiplyScalar(50);
        }
      };

      renderer.domElement.addEventListener('mousedown', handleMouseDown);
      renderer.domElement.addEventListener('mousemove', handleMouseMove);
      renderer.domElement.addEventListener('mouseup', handleMouseUp);
      renderer.domElement.addEventListener('mouseleave', handleMouseUp);
      renderer.domElement.addEventListener('wheel', handleWheel, { passive: false });
      
      const animate = () => {
        frameRef.current = requestAnimationFrame(animate);
        
        if (isAutoRotating && !isMouseDown && modelRef.current) {
          modelRef.current.rotation.y += 0.005;
        }
        
        renderer.render(scene, camera);
      };
      
      animate();
      
      return () => {
        renderer.domElement.removeEventListener('mousedown', handleMouseDown);
        renderer.domElement.removeEventListener('mousemove', handleMouseMove);
        renderer.domElement.removeEventListener('mouseup', handleMouseUp);
        renderer.domElement.removeEventListener('mouseleave', handleMouseUp);
        renderer.domElement.removeEventListener('wheel', handleWheel);
      };
    };

    // Load GLB model
    const loadModel = async () => {
      try {
        const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js');
        const { DRACOLoader } = await import('three/examples/jsm/loaders/DRACOLoader.js');
        
        const loader = new GLTFLoader();
        
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
        loader.setDRACOLoader(dracoLoader);
        
        const gltf = await new Promise<any>((resolve, reject) => {
          loader.load(
            modelConfig.modelPath,
            resolve,
            (progress) => {
              console.log(`Loading ${modelConfig.title}:`, (progress.loaded / progress.total * 100) + '%');
            },
            reject
          );
        });
        
        const model = gltf.scene;
        
        // Process model materials
        model.traverse((child: any) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            
            if (child.material) {
              if (Array.isArray(child.material)) {
                child.material.forEach((mat: any) => {
                  if (mat.metalness !== undefined) mat.metalness = Math.min(mat.metalness + 0.1, 1);
                  if (mat.roughness !== undefined) mat.roughness = Math.max(mat.roughness - 0.1, 0);
                  if (!mat.map && (!mat.color || mat.color.getHex() === 0x000000)) {
                    mat.color.setHex(0x888888);
                  }
                });
              } else {
                if (child.material.metalness !== undefined) child.material.metalness = Math.min(child.material.metalness + 0.1, 1);
                if (child.material.roughness !== undefined) child.material.roughness = Math.max(child.material.roughness - 0.1, 0);
                if (!child.material.map && (!child.material.color || child.material.color.getHex() === 0x000000)) {
                  child.material.color.setHex(0x888888);
                }
              }
            }
          }
        });
        
        // Scale and center the model
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const maxSize = Math.max(size.x, size.y, size.z);
        const scale = 8 / maxSize;
        model.scale.setScalar(scale);
        
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center.multiplyScalar(scale));
        
        modelRef.current = model;
        scene.add(model);
        setIsLoading(false);
        
        dracoLoader.dispose();
        
      } catch (error) {
        console.error(`Error loading model ${modelConfig.title}:`, error);
        setLoadError('Failed to load 3D model. Please check if the model file exists.');
        setIsLoading(false);
        
        // Add a fallback cube
        const geometry = new THREE.BoxGeometry(2, 2, 2);
        const material = new THREE.MeshStandardMaterial({ color: modelConfig.fallbackColor || 0x00ff88 });
        const cube = new THREE.Mesh(geometry, material);
        cube.castShadow = true;
        cube.receiveShadow = true;
        scene.add(cube);
      }
    };

    loadModel();
    initControls();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current || !renderer || !camera) return;
      
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);
    renderer.domElement.style.cursor = 'grab';

    // Cleanup
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      
      window.removeEventListener('resize', handleResize);
      
      if (controlsRef.current) {
        controlsRef.current.dispose();
      }
      
      if (mountRef.current && renderer?.domElement && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      if (scene) {
        scene.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            object.geometry.dispose();
            if (Array.isArray(object.material)) {
              object.material.forEach(material => material.dispose());
            } else {
              object.material.dispose();
            }
          }
        });
      }
      
      if (renderer) {
        renderer.dispose();
      }
    };
  }, [isAutoRotating, modelConfig]);

  const toggleAutoRotation = () => {
    setIsAutoRotating(!isAutoRotating);
  };

  const resetView = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    } else if (cameraRef.current) {
      cameraRef.current.position.set(5, 5, 5);
      cameraRef.current.lookAt(0, 0, 0);
    }
    
    if (modelRef.current) {
      modelRef.current.rotation.set(0, 0, 0);
    }
  };

  return (
    <div className="bg-gray-900 bg-opacity-70 border border-cyan-800 rounded-lg overflow-hidden">
      <div className="relative">
        <div 
          ref={mountRef}
          className="w-full bg-black relative overflow-hidden"
          style={{ 
            height: viewerHeight,
            cursor: isLoading ? 'default' : 'grab' 
          }}
        >
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mb-4"></div>
                <p className="text-cyan-400">Loading 3D Model...</p>
              </div>
            </div>
          )}
          
          {loadError && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="text-center text-red-400">
                <p className="mb-2">⚠️ {loadError}</p>
                <p className="text-sm text-gray-400">Using fallback cube for testing</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Model name in bottom right */}
        <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 rounded-lg p-2">
          <div className="text-cyan-400 font-bold text-sm">{modelConfig.title}</div>
        </div>

        {/* Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button
            onClick={toggleAutoRotation}
            className="bg-black bg-opacity-70 text-white p-2 rounded-lg hover:bg-opacity-90 transition-all"
          >
            {isAutoRotating ? '⏸️' : '▶️'}
          </button>
          <button
            onClick={resetView}
            className="bg-black bg-opacity-70 text-white p-2 rounded-lg hover:bg-opacity-90 transition-all"
          >
            🏠
          </button>
        </div>
      </div>
    </div>
  );
};

// Individual Model Section Component
const ModelSection = ({ modelConfig, isReversed = false }) => {
  const ModelDetails = () => (
    <div className="bg-gray-900 bg-opacity-70 border border-cyan-800 rounded-lg p-6 h-full">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-cyan-400 mb-2">{modelConfig.title}</h2>
        <p className="text-gray-300">{modelConfig.subtitle}</p>
      </div>

      {/* Specifications */}
      <div className="mb-6">
        <div className="flex items-center mb-3">
          <div className="w-6 h-6 bg-cyan-400 rounded-full flex items-center justify-center mr-3">
            <span className="text-black font-bold text-sm">📡</span>
          </div>
          <h3 className="text-lg font-bold text-cyan-400">Specifications</h3>
        </div>
        <div className="space-y-1 text-gray-300 text-sm ml-9">
          {Object.entries(modelConfig.specifications).map(([key, value]) => (
            <p key={key}>
              <span className="text-cyan-400 capitalize">{key}:</span> {value}
            </p>
          ))}
        </div>
      </div>

      {/* Components */}
      <div className="mb-6">
        <div className="flex items-center mb-3">
          <div className="w-6 h-6 bg-cyan-400 rounded-full flex items-center justify-center mr-3">
            <span className="text-black font-bold text-sm">⚙️</span>
          </div>
          <h3 className="text-lg font-bold text-cyan-400">Components</h3>
        </div>
        <div className="space-y-1 text-gray-300 text-sm ml-9">
          {modelConfig.components.map((component, index) => (
            <p key={index}>• {component}</p>
          ))}
        </div>
      </div>

      {/* Mission Goals */}
      <div>
        <div className="flex items-center mb-3">
          <div className="w-6 h-6 bg-cyan-400 rounded-full flex items-center justify-center mr-3">
            <span className="text-black font-bold text-sm">🎯</span>
          </div>
          <h3 className="text-lg font-bold text-cyan-400">Mission Goals</h3>
        </div>
        <div className="space-y-1 text-gray-300 text-sm ml-9">
          {modelConfig.missionGoals.map((goal, index) => (
            <p key={index}>• {goal}</p>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="mb-16">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {isReversed ? (
          <>
            {/* 3D Model Viewer */}
            <div className="lg:col-span-1">
              <ModelViewer modelConfig={modelConfig} viewerHeight="500px" />
            </div>
            {/* Model Details */}
            <div className="lg:col-span-2">
              <ModelDetails />
            </div>
          </>
        ) : (
          <>
            {/* Model Details */}
            <div className="lg:col-span-2">
              <ModelDetails />
            </div>
            {/* 3D Model Viewer */}
            <div className="lg:col-span-1">
              <ModelViewer modelConfig={modelConfig} viewerHeight="500px" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Main Models Component
const Models = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black bg-opacity-90 text-white" style={{ 
      backgroundImage: "url('/assets/stars-bg.png')",
      backgroundSize: "cover",
      backgroundPosition: "center"
    }}>
      <NavigationBar />
      
      <main className="flex-grow container mx-auto px-4 py-8 pt-24 md:pt-28">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold bg-white inline-block text-transparent bg-clip-text mb-4 font-orbitron">MODELS</h1>
          <div className="w-24 h-1 bg-cyan-400 mx-auto mb-8"></div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Our handcrafted satellite models brought to life in interactive 3D.
          </p>
        </div>

        {/* Render all models dynamically */}
        {MODELS_CONFIG.map((modelConfig, index) => (
          <ModelSection 
            key={modelConfig.id} 
            modelConfig={modelConfig} 
            isReversed={index % 2 !== 0} // Alternate layout for visual variety
          />
        ))}

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 inline-block text-transparent bg-clip-text mb-6">
            Interested in Our Models?
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            Learn more about our satellite development process and how you can get involved in our space missions.
          </p>
          <button className="inline-flex items-center justify-center px-8 py-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-black bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-all duration-300">
            Contact Our Team
          </button>
        </div>
      </main>
      
      <Footer/>
    </div>
  );
};

export default Models;