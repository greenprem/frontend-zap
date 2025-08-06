import { useState, useEffect, useRef } from "react";
import * as THREE from 'three';

const Models = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const frameRef = useRef<number>();
  
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [isMouseDown, setIsMouseDown] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff); // White background for canvas
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(5, 5, 5);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Basic lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    scene.add(directionalLight);

    // Mouse controls
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;

    const handleMouseDown = (event: MouseEvent) => {
      setIsMouseDown(true);
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!isMouseDown || !modelRef.current) return;
      
      const deltaX = event.clientX - mouseX;
      const deltaY = event.clientY - mouseY;
      
      targetRotationY += deltaX * 0.01;
      targetRotationX += deltaY * 0.01;
      
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const handleMouseUp = () => {
      setIsMouseDown(false);
    };

    // Wheel zoom
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      const scale = event.deltaY > 0 ? 1.1 : 0.9;
      camera.position.multiplyScalar(scale);
      camera.position.clampLength(2, 50);
    };

    renderer.domElement.addEventListener('mousedown', handleMouseDown);
    renderer.domElement.addEventListener('mousemove', handleMouseMove);
    renderer.domElement.addEventListener('mouseup', handleMouseUp);
    renderer.domElement.addEventListener('wheel', handleWheel);

    // Load GLB model with DRACO support
    const loadModel = async () => {
      try {
        const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js');
        const { DRACOLoader } = await import('three/examples/jsm/loaders/DRACOLoader.js');
        
        const loader = new GLTFLoader();
        
        // Setup DRACO loader
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
        loader.setDRACOLoader(dracoLoader);
        
        const gltf = await new Promise<any>((resolve, reject) => {
          loader.load(
            '/assets/models/alka_assembly.glb',
            resolve,
            (progress) => {
              console.log('Loading progress:', (progress.loaded / progress.total * 100) + '%');
            },
            reject
          );
        });
        
        const model = gltf.scene;
        
        // Handle texture loading errors gracefully
        model.traverse((child: any) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            
            // Create fallback materials if textures fail to load
            if (child.material) {
              if (Array.isArray(child.material)) {
                child.material.forEach((mat: any) => {
                  if (mat.map && !mat.map.image) {
                    mat.color.setHex(0x888888); // Gray fallback
                  }
                });
              } else {
                if (child.material.map && !child.material.map.image) {
                  child.material.color.setHex(0x888888); // Gray fallback
                }
              }
            }
          }
        });
        
        // Scale and position the model
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const maxSize = Math.max(size.x, size.y, size.z);
        const scale = 3 / maxSize;
        model.scale.setScalar(scale);
        
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center.multiplyScalar(scale));
        
        // Adjust model position: move to the right and center it vertically
        model.position.x += 4;  // Move right (increase value to shift more)
        model.position.y += 5;  // Center vertically (adjust as needed)
        modelRef.current = model;
        scene.add(model);
        setIsLoading(false);
        
        // Dispose of DRACO loader
        dracoLoader.dispose();
        
      } catch (error) {
        console.error('Error loading model:', error);
        setLoadError('Failed to load 3D model. Please check if the model file exists.');
        setIsLoading(false);
      }
    };

    loadModel();

    // Animation loop with smooth rotation
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      
      if (modelRef.current) {
        // Smooth manual rotation
        currentRotationX += (targetRotationX - currentRotationX) * 0.1;
        currentRotationY += (targetRotationY - currentRotationY) * 0.1;
        
        if (!isMouseDown) {
          modelRef.current.rotation.x = currentRotationX;
          modelRef.current.rotation.y = currentRotationY;
          
          if (isAutoRotating) {
            modelRef.current.rotation.y += 0.005;
            targetRotationY += 0.005;
          }
        } else {
          modelRef.current.rotation.x = currentRotationX;
          modelRef.current.rotation.y = currentRotationY;
        }
      }
      
      renderer.render(scene, camera);
    };
    
    animate();

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

    // Cleanup
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      
      window.removeEventListener('resize', handleResize);
      if (renderer?.domElement) {
        renderer.domElement.removeEventListener('mousedown', handleMouseDown);
        renderer.domElement.removeEventListener('mousemove', handleMouseMove);
        renderer.domElement.removeEventListener('mouseup', handleMouseUp);
        renderer.domElement.removeEventListener('wheel', handleWheel);
      }
      
      if (mountRef.current && renderer?.domElement && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose of Three.js resources
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
  }, [isAutoRotating]);

  const toggleAutoRotation = () => {
    setIsAutoRotating(!isAutoRotating);
  };

  const resetView = () => {
    if (modelRef.current) {
      modelRef.current.rotation.set(0, 0, 0);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-black">
      {/* Navigation Bar */}
      <nav className="bg-gray-900 border-b border-gray-700 fixed top-0 w-full z-50">
        <div className="container mx-auto px-4 py-3">
          <h1 className="text-white text-xl font-bold">ALKA Satellite Viewer</h1>
        </div>
      </nav>
      
      <main className="flex-grow container mx-auto px-4 py-8 pt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left column - Model Information */}
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-white">ALKA Satellite</h1>
            
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h2 className="text-xl font-bold text-white mb-4">Specifications</h2>
              <div className="space-y-2 text-gray-300">
                <p><span className="font-semibold text-blue-400">Model:</span> ALKA Assembly</p>
                <p><span className="font-semibold text-blue-400">Type:</span> CubeSat</p>
                <p><span className="font-semibold text-blue-400">Mission:</span> Earth Observation</p>
                <p><span className="font-semibold text-blue-400">Status:</span> Development</p>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h2 className="text-xl font-bold text-white mb-4">Components</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>Solar Panel Arrays</li>
                <li>Communication Antenna</li>
                <li>Main Processing Unit</li>
                <li>Attitude Control System</li>
                <li>Power Management System</li>
                <li>Payload Bay</li>
              </ul>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <h2 className="text-xl font-bold text-white mb-4">Controls</h2>
              <div className="space-y-2 text-gray-300 text-sm">
                <p><span className="font-semibold text-blue-400">Mouse Drag:</span> Rotate model</p>
                <p><span className="font-semibold text-blue-400">Mouse Wheel:</span> Zoom in/out</p>
                <p><span className="font-semibold text-blue-400">Auto Rotate:</span> Toggle continuous rotation</p>
              </div>
            </div>
          </div>

          {/* Right column - 3D Viewer */}
          <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
            <div className="p-4 border-b border-gray-700 bg-gray-900">
              <div className="flex space-x-4">
                <button
                  onClick={toggleAutoRotation}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  {isAutoRotating ? 'Stop Rotation' : 'Auto Rotate'}
                </button>
                <button
                  onClick={resetView}
                  className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                >
                  Reset View
                </button>
              </div>
            </div>
            
            <div 
              ref={mountRef}
              className="w-full h-[600px] relative"
              style={{ cursor: isLoading ? 'default' : (isMouseDown ? 'grabbing' : 'grab') }}
            >
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-90">
                  <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
                    <p className="mt-2 text-white">Loading 3D Model...</p>
                  </div>
                </div>
              )}
              
              {loadError && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                  <div className="text-center p-6">
                    <div className="text-red-400 text-6xl mb-4">⚠️</div>
                    <h3 className="text-white text-lg font-semibold mb-2">Failed to Load Model</h3>
                    <p className="text-gray-300 text-sm mb-4">{loadError}</p>
                    <button
                      onClick={() => window.location.reload()}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      Retry
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-700 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">© 2025 ALKA Satellite Project. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Models;