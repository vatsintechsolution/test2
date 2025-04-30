"use client";

import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useRouter } from 'next/navigation';

export default function SimpleAR() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cameraPermissionGranted, setCameraPermissionGranted] = useState(false);
  const [showPermissionPrompt, setShowPermissionPrompt] = useState(true);
  const [arSupported, setArSupported] = useState(false);
  const [arActive, setArActive] = useState(false);
  
  // Store scene elements in refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const requestRef = useRef<number | null>(null);

  // Check if WebXR is supported
  useEffect(() => {
    if (navigator.xr) {
      navigator.xr.isSessionSupported('immersive-ar')
        .then(supported => {
          setArSupported(supported);
          console.log('AR supported:', supported);
        })
        .catch(err => {
          console.error('Error checking AR support:', err);
          setArSupported(false);
        });
    } else {
      console.log('WebXR not supported in this browser');
      setArSupported(false);
    }
  }, []);

  // Function to create XR compatible WebGL context
  const createXRCompatibleWebGLContext = (canvas: HTMLCanvasElement) => {
    let context = null;
    
    // Try WebGL2 first
    try {
      context = canvas.getContext('webgl2', { 
        alpha: true, 
        antialias: true,
        xrCompatible: true,
        premultipliedAlpha: true,
        preserveDrawingBuffer: false,
        powerPreference: 'default'
      });
      if (context) {
        console.log('Using WebGL2 context');
        return context;
      }
    } catch (e) {
      console.warn('WebGL2 not available:', e);
    }
    
    // Fall back to WebGL1
    try {
      context = canvas.getContext('webgl', { 
        alpha: true, 
        antialias: true,
        xrCompatible: true,
        premultipliedAlpha: true,
        preserveDrawingBuffer: false 
      });
      if (context) {
        console.log('Using WebGL1 context');
        return context;
      }
    } catch (e) {
      console.error('WebGL not available:', e);
    }
    
    return null;
  };

  // AR Session Start Function
  const startARSession = async () => {
    if (!rendererRef.current || !sceneRef.current || !cameraRef.current) {
      console.error('Renderer, scene, or camera not initialized');
      setError('Unable to start AR: scene not initialized');
      return;
    }
    
    if (!arSupported) {
      setError('AR is not supported on this device');
      return;
    }
    
    try {
      // Try different reference spaces if one fails
      const referenceSpaceTypes = ['local', 'local-floor', 'viewer', 'unbounded'];
      
      // Make sure XR is enabled on the renderer
      rendererRef.current.xr.enabled = true;
      
      // Request AR session with minimal features for compatibility
      const session = await navigator.xr.requestSession('immersive-ar', {
        optionalFeatures: []
      });
      
      // Set session
      await rendererRef.current.xr.setSession(session);
      setArActive(true);
      
      // Try different reference spaces
      for (const spaceType of referenceSpaceTypes) {
        try {
          const referenceSpace = await session.requestReferenceSpace(spaceType as XRReferenceSpaceType);
          rendererRef.current.xr.setReferenceSpace(referenceSpace);
          console.log(`Using reference space: ${spaceType}`);
          break;
        } catch (e) {
          console.warn(`Failed to get reference space ${spaceType}:`, e);
          // Continue trying other space types
        }
      }
      
      // Setup session end handling
      session.addEventListener('end', () => {
        setArActive(false);
        console.log('AR session ended');
      });
      
    } catch (error) {
      console.error('Failed to start AR session:', error);
      setError(`Failed to start AR session: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  // Initialize camera stream and scene setup with useCallback
  const startCamera = useCallback(async () => {
    // First check if the ref is available
    if (!videoRef.current) {
      console.log('Video ref not yet available, retrying in 500ms');
      setTimeout(() => startCamera(), 500);
      return;
    }
    
    try {
      setError(null);
      setShowPermissionPrompt(false);
      
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment', 
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      
      // Double check ref is still available before setting srcObject
      if (!videoRef.current) {
        console.error('Video element disappeared after getting camera stream');
        setError('Video element not available. Please reload the page.');
        setShowPermissionPrompt(true);
        return;
      }
      
      videoRef.current.srcObject = stream;
      videoRef.current.play();
      setCameraPermissionGranted(true);
      console.log('Camera started successfully');
      
      // Initialize the 3D scene now that we have camera permission
      if (containerRef.current && canvasRef.current) {
        setIsLoading(true);
        setError(null);
        
        // Setup scene
        const scene = new THREE.Scene();
        sceneRef.current = scene;
        
        // Setup camera - position it further away to see the entire model
        const aspectRatio = containerRef.current.clientWidth / containerRef.current.clientHeight;
        const camera = new THREE.PerspectiveCamera(45, aspectRatio, 0.1, 1000);
        camera.position.set(0, 0, 25); // Increased distance from 20 to 25 to zoom out more
        cameraRef.current = camera;
        
        // Create XR-compatible context and initialize renderer with it
        const glContext = createXRCompatibleWebGLContext(canvasRef.current);
        
        if (!glContext) {
          setError('Failed to create WebGL context');
          return;
        }
        
        // Setup renderer with the XR-compatible context
        const renderer = new THREE.WebGLRenderer({
          canvas: canvasRef.current,
          context: glContext,
          alpha: true, // Transparent background
          antialias: true
        });
        
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        
        // Enable XR
        renderer.xr.enabled = true;
        rendererRef.current = renderer;
        
        // Add lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);
        
        // Add OrbitControls with restricted rotation
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.autoRotate = false; // Disable auto-rotation for this model
        
        // Set the target to the center of the model to ensure proper rotation axis
        controls.target.set(0, 0, 0);
        
        // Allow vertical rotation but restrict horizontal rotation
        controls.enableRotate = true;
        
        // Lock horizontal rotation - remove these if they're causing issues
        controls.minAzimuthAngle = 0; // Lock to front view
        controls.maxAzimuthAngle = 0; // Lock to front view
        
        // Strict zoom limits (95% to 105% of default view)
        controls.minDistance = 24; // 95% of default distance (25)
        controls.maxDistance = 26; // 105% of default distance (25)
        
        controls.minPolarAngle = Math.PI / 4; // 45 degrees from top
        controls.maxPolarAngle = Math.PI * 3/4; // 45 degrees from bottom
        
        // Disable panning to prevent user from moving the model
        controls.enablePan = false;
        
        controlsRef.current = controls;
        
        // Load model with simplified approach matching working AR viewer
        const loader = new GLTFLoader();
        
        // Simple direct path without environment checks or fallbacks
        const modelPath = '/models/airo-quad.glb';
        console.log('Loading model from path:', modelPath);
        
        loader.load(
          modelPath,
          (gltf) => {
            try {
              console.log('Model loaded successfully, processing...');
              const model = gltf.scene;
              
              // Traverse all materials to ensure they're properly processed
              model.traverse((object) => {
                if ((object as THREE.Mesh).isMesh) {
                  const mesh = object as THREE.Mesh;
                  if (mesh.material) {
                    // Make sure materials use correct color space
                    const material = mesh.material as THREE.MeshStandardMaterial;
                    if (material.map) material.map.colorSpace = THREE.SRGBColorSpace;
                    if (material.normalMap) material.normalMap.colorSpace = THREE.NoColorSpace;
                  }
                }
              });
              
              // Scale model
              model.scale.set(0.01, 0.01, 0.01);
              
              // Center model
              const box = new THREE.Box3().setFromObject(model);
              const center = box.getCenter(new THREE.Vector3());
              
              // Instead of moving the model, set the orbital controls target to the center
              controls.target.set(center.x, center.y, center.z);
              
              // Keep the position adjustment for height only
              model.position.y = 4; // Move model up by 4 units
              
              // Add model to scene
              scene.add(model);
              modelRef.current = model;
              setIsLoading(false);
              console.log('Model successfully added to scene');
            } catch (err) {
              console.error('Error processing loaded model:', err);
              setError(`Error processing 3D model: ${err instanceof Error ? err.message : 'Unknown error'}`);
              setIsLoading(false);
            }
          },
          (xhr) => {
            // Progress callback
            const percentComplete = xhr.loaded / xhr.total * 100;
            console.log(`${Math.round(percentComplete)}% loaded`);
          },
          (err) => {
            // Error callback with simplified handling
            console.error('Error loading model:', err);
            setError(`Failed to load 3D model: ${err instanceof Error ? err.message : 'Unknown error'}`);
            setIsLoading(false);
          }
        );
        
        // Animation loop - using requestAnimationFrame for better cleanup
        const animate = () => {
          if (controlsRef.current) {
            controlsRef.current.update();
          }
          
          if (!rendererRef.current?.xr.isPresenting && sceneRef.current && cameraRef.current && rendererRef.current) {
            rendererRef.current.render(sceneRef.current, cameraRef.current);
          }
          
          requestRef.current = requestAnimationFrame(animate);
        };
        
        // Start animation loop
        requestRef.current = requestAnimationFrame(animate);
        
        // Handle resize
        const handleResize = () => {
          if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
          
          const width = containerRef.current.clientWidth;
          const height = containerRef.current.clientHeight;
          
          cameraRef.current.aspect = width / height;
          cameraRef.current.updateProjectionMatrix();
          
          rendererRef.current.setSize(width, height);
        };
        
        window.addEventListener('resize', handleResize);
        
        // Set up cleanup for resize listener
        const cleanupResize = () => {
          window.removeEventListener('resize', handleResize);
        };
        
        // Store cleanup function
        return cleanupResize;
      }
      
    } catch (err) {
      console.error('Error accessing camera:', err);
      setError(err instanceof Error ? err.message : 'Failed to access camera');
      setShowPermissionPrompt(true);
    }
  }, []);

  // Stop camera stream and redirect to /elevate
  const stopCamera = () => {
    if (!videoRef.current || !videoRef.current.srcObject) return;
    
    const stream = videoRef.current.srcObject as MediaStream;
    const tracks = stream.getTracks();
    
    tracks.forEach(track => track.stop());
    videoRef.current.srcObject = null;
    console.log('Camera stopped');
    
    // End AR session if active
    if (rendererRef.current?.xr.isPresenting) {
      rendererRef.current.xr.getSession()?.end().catch(err => {
        console.error('Error ending XR session:', err);
      });
    }
    
    // Redirect to /elevate
    router.push('/quad');
  };
  
  // Auto-start camera when component mounts
  useEffect(() => {
    startCamera();
    
    // Clean up on unmount
    return () => {
      // Save a reference to the current video element and stream
      const currentVideo = videoRef.current;
      const currentStream = currentVideo?.srcObject as MediaStream | null;
      
      // Clean up stream if it exists
      if (currentStream) {
        const tracks = currentStream.getTracks();
        tracks.forEach(track => track.stop());
      }
      
      // End AR session if active
      if (rendererRef.current?.xr.isPresenting) {
        rendererRef.current.xr.getSession()?.end().catch(err => {
          console.error('Error ending XR session:', err);
        });
      }
      
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
        requestRef.current = null;
      }
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      
      if (controlsRef.current) {
        controlsRef.current.dispose();
      }
    };
  }, [startCamera]); // Add startCamera as a dependency

  return (
    <div className="h-screen w-full bg-black">
      {/* Add Cross-Origin headers for better WebGL support */}
      <head>
        <meta httpEquiv="Cross-Origin-Opener-Policy" content="same-origin" />
        <meta httpEquiv="Cross-Origin-Embedder-Policy" content="require-corp" />
      </head>
      
      <div 
        ref={containerRef} 
        className="relative w-full h-full"
      >
        {/* Camera Video Feed (background) */}
        <video
          ref={videoRef}
          className="absolute inset-0 object-cover w-full h-full mt-[-75px]"
          autoPlay
          playsInline
          muted
        />
        
        {/* WebGL Canvas (Overlay) - Only show when camera permission granted */}
        {cameraPermissionGranted && (
          <canvas 
            ref={canvasRef} 
            className="absolute inset-0 w-full h-full z-10"
          />
        )}
        
        {/* Permission Prompt */}
        {showPermissionPrompt && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-30">
            <div className="bg-white rounded-lg p-6 max-w-md text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Camera Access Required</h3>
              <p className="text-gray-600 mb-4">
                To experience AR view, we need access to your camera. 
                The 3D model will be displayed once camera access is granted.
              </p>
              <button
                onClick={startCamera}
                className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-medium"
              >
                Grant Camera Access
              </button>
              <button
                onClick={() => router.push('/quad')}
                className="mt-3 px-6 py-2 text-gray-700 hover:text-gray-900 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        
        {/* Loading Indicator - Only show when camera permission granted */}
        {cameraPermissionGranted && isLoading && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        )}
        
        {/* Error Display */}
        {error && (
          <div className="absolute top-4 left-4 bg-red-500/90 text-white px-4 py-2 rounded-md z-30 max-w-xs">
            {error}
          </div>
        )}
        
        {/* AR Button - Only show when camera is active and AR is supported */}
        {cameraPermissionGranted && arSupported && !arActive && !isLoading && (
          <div className="fixed bottom-24 left-0 right-0 flex justify-center z-50">
            <button
              onClick={startARSession}
              className="px-8 py-4 rounded-full font-bold text-lg shadow-lg bg-blue-500 hover:bg-blue-600 text-white"
            >
              START AR
            </button>
          </div>
        )}
        
        {/* Camera Button - Only show when camera is active */}
        {cameraPermissionGranted && (
          <div className="fixed bottom-10 left-0 right-0 flex justify-center z-50">
            <button
              onClick={stopCamera}
              className="px-8 py-4 rounded-full font-bold text-lg shadow-lg bg-red-500 hover:bg-red-600 text-white"
            >
              EXIT AR VIEW
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 