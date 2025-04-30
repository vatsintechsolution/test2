"use client";

import { useEffect, useState, useRef } from "react";
import { RemoteControl } from './RemoteControl/RemoteControlEcoLink';
import Link from "next/link";
import React from "react";
// Import dynamic to handle client-side only components

type RotationSpeed = "off" | "speed1" | "speed2" | "speed3" | "speed4" | "speed5" | "speed6";

interface ArStatusChangeEvent extends Event {
  detail: {
    status: string;
  };
}

interface ModelViewerElement extends HTMLElement {
  model: {
    materials: Array<{
      pbrMetallicRoughness: {
        setBaseColorFactor: (color: string) => void;
      }
    }>;
  };
}

export default function ARViewer2({ modelPath }: { modelPath: string }) {
  const [rotationSpeed, setRotationSpeed] = useState<RotationSpeed>("off");
  const [showAR, setShowAR] = useState(false);
  const [scale] = useState(0.5);
  const [verticalAngle] = useState(-180);
  const modelViewerLoaded = useRef(false);
  const [modelError, setModelError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const modelRef = useRef<HTMLElement | null>(null);
  const [arError, setArError] = useState<string | null>(null);
  const [direction, setDirection] = useState<"clockwise" | "anticlockwise">("clockwise");
  const [currentColor, setCurrentColor] = useState('#F8F6F0');
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  useEffect(() => {
    if (!modelViewerLoaded.current) {
      modelViewerLoaded.current = true;
      setIsLoading(true);

      if (!customElements.get("model-viewer")) {
        import("@google/model-viewer")
          .then(() => {
            setIsLoading(false);
            // Initialize model-viewer properly
            // @ts-expect-error - This is expected for custom elements
            customElements.define(
              "model-viewer",
              // @ts-expect-error - Model viewer types are complex
              window["model-viewer"].ModelViewer
            );
          })
          .catch((error: Error) => {
            setArError(error.message);
            setIsLoading(false);
          });
      } else {
        setIsLoading(false);
      }
    }
  }, []);

  // Update the document title with the current color
  useEffect(() => {
    document.title = `AR Viewer - ${currentColor}`;
  }, [currentColor]);

  if (modelError) {
    return <div className="text-red-500 p-4">{modelError}</div>;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const speedValues = {
    off: "0deg",
    speed1: direction === "clockwise" ? "540deg" : "-540deg",
    speed2: direction === "clockwise" ? "720deg" : "-720deg",
    speed3: direction === "clockwise" ? "1080deg" : "-1080deg",
    speed4: direction === "clockwise" ? "1440deg" : "-1440deg",
    speed5: direction === "clockwise" ? "1800deg" : "-1800deg",
    speed6: direction === "clockwise" ? "2000deg" : "-2000deg",
  };

  // const handleARClick = (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   setShowAR(true);
  //   router.push('/ar/fan2');
  // };

  const handleColorChange = (color: string) => {
    setCurrentColor(color);
    if (modelRef.current) {
      const model = (modelRef.current as ModelViewerElement).model;
      if (model) {
        const [material] = model.materials;
        material.pbrMetallicRoughness.setBaseColorFactor(color);
      }
    }
  };

  return (
    <div className="w-full h-[500px] md:h-[600px] bg-[url(/home/ar-bg.jpg)] bg-cover bg-top bg-no-repeat relative">
      {/* 
        This uses a lowercase model-viewer element which Next.js
        will process as a custom element. TypeScript will flag this
        but Next.js config ignores these errors during build.

        Point Towards open area on ceiling
      */}
      <model-viewer
        ref={modelRef}
        src={modelPath}
        ar
        ar-modes="webxr scene-viewer quick-look"
        camera-controls="true"
        touch-action="pan-y"
        ar-placement="wall"
        scale={`${scale} ${scale} ${scale}`}
        orientation={`0deg ${verticalAngle}deg 0deg`}
        auto-rotate
        ios-src="/fan-3d.usdz"
        rotation-per-second={speedValues[rotationSpeed]}
        interaction-policy="allow-when-focused"
        disable-zoom
        disable-tap
        disable-scroll
        camera-orbit="0deg 120deg 100%"
        min-camera-orbit="auto 120deg 100%"
        max-camera-orbit="auto 120deg 200%"
        camera-target="0m -300.5m 0m"
        field-of-view="30deg"
        shadow-intensity="1"
        exposure="1"
        ar-scale="fixed"
        environment-image="neutral"
        loading="eager"
        onError={(error: Event) => {
          console.error("AR Error:", error);
          setModelError("Failed to load AR experience");
          setArError("Failed to load AR experience");
        }}
        onArStatusChange={(e: ArStatusChangeEvent) => {
          const status = e.detail.status;
          console.log("AR Status:", status);
          setShowAR(status === "session-started");
          if (status === "failed") {
            setArError("AR session failed to start");
          }
        }}
        style={{ width: "100%", height: "100%" }}
      ></model-viewer>

      {/* Color Controls with inline styles */}
      <div style={{
        position: 'fixed',
        bottom: '80px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'rgba(0, 0, 0, 0.7)',
        padding: '10px 20px',
        borderRadius: '30px',
        zIndex: 1002 // Higher than RemoteControl but lower than mobile menu
      }} className="hidden">
        {/* White/Default Color Button */}
        <button
          onClick={() => handleColorChange('#F8F6F0')}
          aria-label={`White color (current: ${currentColor === '#F8F6F0' ? 'active' : 'inactive'})`}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: currentColor === '#F8F6F0' ? '3px solid #fff' : '2px solid #000',
            backgroundColor: '#F8F6F0',
            margin: '0 8px',
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: hoveredButton === 'white' ? '0 0 10px rgba(0,0,0,0.5)' : '0 0 5px rgba(0,0,0,0.3)',
            transform: hoveredButton === 'white' ? 'scale(1.1)' : 'scale(1)'
          }}
          onMouseOver={() => setHoveredButton('white')}
          onMouseOut={() => setHoveredButton(null)}
        />
        
        {/* Gray Color Button */}
        <button
          onClick={() => handleColorChange('#808080')}
          aria-label={`Grey color (current: ${currentColor === '#808080' ? 'active' : 'inactive'})`}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: currentColor === '#808080' ? '3px solid #fff' : '2px solid #fff',
            backgroundColor: '#808080',
            margin: '0 8px',
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: hoveredButton === 'gray' ? '0 0 10px rgba(0,0,0,0.5)' : '0 0 5px rgba(0,0,0,0.3)',
            transform: hoveredButton === 'gray' ? 'scale(1.1)' : 'scale(1)'
          }}
          onMouseOver={() => setHoveredButton('gray')}
          onMouseOut={() => setHoveredButton(null)}
        />
        
        {/* Dark Brown Color Button */}
        <button
          onClick={() => handleColorChange('#4e2a2a')}
          aria-label={`Dark Brown color (current: ${currentColor === '#4e2a2a' ? 'active' : 'inactive'})`}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            border: currentColor === '#4e2a2a' ? '3px solid #fff' : '2px solid #fff',
            backgroundColor: '#4e2a2a',
            margin: '0 8px',
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: hoveredButton === 'brown' ? '0 0 10px rgba(0,0,0,0.5)' : '0 0 5px rgba(0,0,0,0.3)',
            transform: hoveredButton === 'brown' ? 'scale(1.1)' : 'scale(1)'
          }}
          onMouseOver={() => setHoveredButton('brown')}
          onMouseOut={() => setHoveredButton(null)}
        />
      </div>

      {arError && (
        <div className="absolute top-4 left-4 bg-red-500 hidden text-white px-4 py-2 rounded">
          {arError}
        </div>
      )}

      <div className="fixed bottom-[-150px] md:bottom-10 left-[-100px] md:left-6 z-[999]">
        <div className="p-3 rounded-lg bg-no-repeat">
          <RemoteControl
            onPowerClick={() => {
              // Power on - set to speed1 if currently off
              if (rotationSpeed === "off") {
                setRotationSpeed("speed1");
              }
            }}
            onPowerOffClick={() => {
              // Power off - always turn off regardless of current state
              setRotationSpeed("off");
            }}
            onSpeedClick={(speed) => {
              switch(speed) {
                case 1:
                  setRotationSpeed("speed1");
                  break;
                case 2:
                  setRotationSpeed("speed2");
                  break;
                case 3:
                  setRotationSpeed("speed3");
                  break;
                case 4:
                  setRotationSpeed("speed4");
                  break;
                case 5:
                  setRotationSpeed("speed5");
                  break;
                case 6:
                  setRotationSpeed("speed6");
                  break;
                default:
                  setRotationSpeed("off");
              }
            }}
            onLightClick={() => console.log('Light clicked')}
            onAntiClockwiseClick={() => setDirection(prev => prev === "clockwise" ? "anticlockwise" : "clockwise")}
          />
        </div>
      </div>

      <button 
       
        className="fixed z-[9998] bottom-4 right-4 bg-black/70 text-white px-6 py-3 rounded-full hover:bg-black transition-colors font-medium"
      >
        <Link href="/elevate-ar">View in AR</Link>
      </button>

      {showAR && (
< > </>
)}
    </div>
  );
}
