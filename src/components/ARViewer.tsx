"use client";

import { useEffect, useState, useRef } from "react";
import { RemoteControl } from './RemoteControl/RemoteControl';
import { useRouter } from 'next/navigation';
import Link from "next/link";

type RotationSpeed = "off" | "speed1" | "speed2" | "speed3" | "speed4" | "speed5" | "speed6";

interface ArStatusChangeEvent extends Event {
  detail: {
    status: string;
  };
}

export default function ARViewer({ modelPath }: { modelPath: string }) {
  const router = useRouter();
  const [rotationSpeed, setRotationSpeed] = useState<RotationSpeed>("off");
  const [isAR, setIsAR] = useState(false);
  const [scale] = useState(0.5);
  const [verticalAngle] = useState(0);
  const modelViewerLoaded = useRef(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const modelRef = useRef<HTMLElement | null>(null);
  const [arError, setArError] = useState<string | null>(null);
  const [direction, setDirection] = useState<"clockwise" | "anticlockwise">("clockwise");
  // const [currentModel, setCurrentModel] = useState('/fan-export.glb');

  useEffect(() => {
    if (!modelViewerLoaded.current) {
      modelViewerLoaded.current = true;
      setIsLoading(true);

      if (!customElements.get("model-viewer")) {
        import("@google/model-viewer")
          .then(() => {
            setIsLoading(false);
            // Initialize model-viewer properly
            // @ts-expect-error - type mismatch but works at runtime
            customElements.define(
              "model-viewer",
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

  if (error) {
    setError(error);
    return <div className="text-red-500 p-4">{error}</div>;
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
    speed1: direction === "clockwise" ? "180deg" : "-180deg",
    speed2: direction === "clockwise" ? "360deg" : "-360deg",
    speed3: direction === "clockwise" ? "540deg" : "-540deg",
    speed4: direction === "clockwise" ? "720deg" : "-720deg",
    speed5: direction === "clockwise" ? "1080deg" : "-1080deg",
    speed6: direction === "clockwise" ? "1440deg" : "-1440deg",
  };

  // const toggleModel = async () => {
  //   if (modelRef.current) {
  //     if (isAR) {
  //       await modelRef.current.exitAR();
  //     }
      
  //     const newModel = currentModel === '/fan-export.glb' ? '/base_basic_pbr.glb' : '/fan-export.glb';
  //     setCurrentModel(newModel);
      
  //     if (isAR) {
  //       setTimeout(() => {
  //         modelRef.current?.activateAR();
  //       }, 300);
  //     }
  //   }
  // };

  const handleARClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAR(true);
    router.push('/ar/fan1');
  };

  return (
    <div className="w-full h-[500px] md:h-[600px] bg-[url(/fan-bg-zoomed.jpg)] bg-cover bg-top bg-no-repeat relative">
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
        camera-orbit="0deg 120deg 100%"
        min-camera-orbit="auto 100deg 100%"
        max-camera-orbit="auto 120deg 200%"
        camera-target="0m -200.5m 0m"
        field-of-view="30deg"
        shadow-intensity="1"
        exposure="1"
        ar-scale="fixed"
        environment-image="neutral"
        loading="eager"
        onError={(error: Event) => {
          console.error("AR Error:", error);
          setArError("Failed to load AR experience");
        }}
        onArStatusChange={(e: ArStatusChangeEvent) => {
          const status = e.detail.status;
          console.log("AR Status:", status);
          setIsAR(status === "session-started");
          if (status === "failed") {
            setArError("AR session failed to start");
          }
        }}
        style={{ width: "100%", height: "100%" }}
      >
      

        {/* <div id="ar-prompt" className="absolute bottom-10 left-12 z-[9999]">
          <button 
            onClick={toggleModel}
            className="bg-black/50 text-white px-4 py-2 rounded hover:bg-black/70 transition-colors"
          >
            Switch Model ({currentModel.includes('export') ? 'Model 1' : 'Model 2'})
          </button>
        </div> */}
      </model-viewer>

      {arError && (
        <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded">
          {/* {arError} */}
        </div>
      )}

      <div className="fixed bottom-[-150px] left-4 z-[999]">
        <div className="p-3 rounded-lg bg-no-repeat">
          <RemoteControl
            onPowerClick={() => setRotationSpeed(prev => prev === "off" ? "speed1" : "off")}
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
            onClockwiseClick={() => setDirection("clockwise")}
            onAntiClockwiseClick={() => setDirection("anticlockwise")}
          />

<button
          onClick={handleARClick}
          className="fixed z-[99999] bottom-4 right-4 bg-black/50 text-white px-4 py-2 rounded hover:bg-black/70 transition-colors"
        >
          <Link href="/ar/fan1"> 
          View in AR
          </Link>
        </button>
        </div>
      </div>

      {isAR && (
        <div></div>
      )}
    </div>
  );
}
