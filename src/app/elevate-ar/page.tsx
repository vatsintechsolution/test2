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
  const [modelLoadAttempts, setModelLoadAttempts] = useState(0);
  
  // Store scene elements in refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const requestRef = useRef<number | null>(null);

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
        camera.position.set(0, 0, 20); // Position camera further back
        cameraRef.current = camera;
        
        // Setup renderer
        const renderer = new THREE.WebGLRenderer({
          canvas: canvasRef.current,
          alpha: true, // Transparent background
          antialias: true
        });
        
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        rendererRef.current = renderer;
        
        // Add lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);
        
        // Add OrbitControls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.autoRotate = true; // Auto-rotate the model
        controls.autoRotateSpeed = 0.5;
        
        // Restrict zoom limits (80% to 110% of default view)
        controls.minDistance = 17; // 85% of default distance (20)
        controls.maxDistance = 22; // 110% of default distance (20)
        
        // Restrict rotation - limit vertical rotation to prevent model flipping
        controls.minPolarAngle = Math.PI / 4; // 45 degrees from top
        controls.maxPolarAngle = Math.PI * 3/4; // 45 degrees from bottom
        
        // Optional: Disable panning to prevent user from moving the model off-center
        controls.enablePan = false;
        
        controlsRef.current = controls;
        
        // Load model with better error handling and absolute path
        const loader = new GLTFLoader();
        
        // Use a direct URL regardless of environment
        // Don't rely on NODE_ENV which may not be correct in production
        const modelPath = 'https://fans.ecolinklighting.in/models/airoelevate.glb';
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
              
              // Flip the model to correct orientation
              model.rotation.x = Math.PI; // Rotate 180 degrees around X axis
              
              // Center model
              const box = new THREE.Box3().setFromObject(model);
              const center = box.getCenter(new THREE.Vector3());
              model.position.x = -center.x;
              model.position.y = -center.y + 4; // Move model up by 4 units
              model.position.z = -center.z;
              
              // Add model to scene
              scene.add(model);
              modelRef.current = model;
              setIsLoading(false);
              setModelLoadAttempts(0); // Reset attempts counter on success
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
            // Error callback with specific AWS S3 error detection
            console.error('Error loading model:', err);
            
            // Check if the error is likely a MIME type issue
            const errorString = err instanceof Error ? err.message : String(err);
            if (errorString.includes('Failed to load resource') || errorString.includes('Unexpected token')) {
              setError(`MIME type configuration issue detected. The server is likely not serving .glb files with the correct MIME type (model/gltf-binary). Please check AWS S3 configuration.`);
              console.error('Server configuration issue: GLB files should be served with MIME type "model/gltf-binary". Check S3/server configuration.');
            }
            
            // Retry logic - try up to 3 times with different paths
            if (modelLoadAttempts < 3) {
              console.log(`Retrying model load, attempt ${modelLoadAttempts + 1}/3`);
              setModelLoadAttempts(prev => prev + 1);
              
              // Try different paths on each attempt
              let retryPath = 'https://fans.ecolinklighting.in/models/airoelevate.glb';
              if (modelLoadAttempts === 1) retryPath = 'https://d2s50w7dshxhiq.cloudfront.net/models/airoelevate.glb'; // Try a CDN URL if available
              if (modelLoadAttempts === 2) retryPath = '/models/airoelevate.glb'; // Try local path as last resort
              
              setTimeout(() => {
                loader.load(
                  retryPath,
                  (gltf) => {
                    // Same success callback as original
                    try {
                      console.log('Model loaded successfully on retry, processing...');
                      const model = gltf.scene;
                      
                      // Process model same as above...
                      model.scale.set(0.01, 0.01, 0.01);
                      model.rotation.x = Math.PI;
                      const box = new THREE.Box3().setFromObject(model);
                      const center = box.getCenter(new THREE.Vector3());
                      model.position.x = -center.x;
                      model.position.y = -center.y + 4;
                      model.position.z = -center.z;
                      
                      scene.add(model);
                      modelRef.current = model;
                      setIsLoading(false);
                      setModelLoadAttempts(0);
                      console.log('Model successfully added to scene on retry');
                    } catch (retryErr) {
                      console.error('Error processing loaded model on retry:', retryErr);
                      setError(`Error processing 3D model on retry: ${retryErr instanceof Error ? retryErr.message : 'Unknown error'}`);
                      setIsLoading(false);
                    }
                  },
                  undefined,
                  (retryErr) => {
                    console.error(`Retry ${modelLoadAttempts} failed:`, retryErr);
                    // Let the next attempt try or show final error
                    if (modelLoadAttempts === 3) {
                      setError(`Failed to load 3D model after 3 attempts: ${retryErr instanceof Error ? retryErr.message : 'Unknown error'}`);
                      setIsLoading(false);
                    }
                  }
                );
              }, 1000); // Add a small delay between retries
            } else {
              setError(`Failed to load 3D model: ${err instanceof Error ? err.message : 'Unknown error'}`);
              setIsLoading(false);
            }
          }
        );
        
        // Animation loop
        const animate = () => {
          if (controlsRef.current) {
            controlsRef.current.update();
          }
          
          if (sceneRef.current && cameraRef.current && rendererRef.current) {
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
    
    // Redirect to /elevate
    router.push('/elevate');
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
      
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
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
                onClick={() => router.push('/elevate')}
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