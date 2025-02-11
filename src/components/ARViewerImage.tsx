"use client";

import { useEffect, useState, useRef } from "react";

type RotationSpeed = "off" | "low" | "medium" | "high";

interface ArStatusChangeEvent extends Event {
  detail: {
    status: string;
  };
}

export default function ARViewer({ modelPath }: { modelPath: string }) {
  const [rotationSpeed, setRotationSpeed] = useState<RotationSpeed>("off");
  const [isAR, setIsAR] = useState(false);
  const [scale, setScale] = useState(0.5);
  const [verticalAngle, setVerticalAngle] = useState(0);
  const modelViewerLoaded = useRef(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const modelRef = useRef<HTMLElement | null>(null);
  const [arError, setArError] = useState<string | null>(null);
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
    low: "360deg",
    medium: "720deg",
    high: "1440deg",
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

  return (
    <div className="w-full h-[500px] md:h-[600px] bg-[url(/fan-bg.jpeg)] bg-cover bg-top bg-no-repeat relative">
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
        ios-src="/fan3d.usdc"
        rotation-per-second={speedValues[rotationSpeed]}
        interaction-policy="allow-when-focused"
        camera-orbit="0deg 120deg 100%"
        min-camera-orbit="auto 100deg 100%"
        max-camera-orbit="auto 120deg 200%"
        camera-target="0m -0.10m 0m"
        field-of-view="30deg"
        shadow-intensity="1"
        exposure="1"
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
        <button
          slot="ar-button"
          className="absolute bottom-4 right-4 bg-black/50 text-white px-4 py-2 rounded"
        >
          View in AR
        </button>

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

      <div className="absolute bottom-4 left-4 z-[9999]">
        <div className="flex gap-2  p-3 rounded-lg   bg-black bg-cover bg-center bg-no-repeat">
          <button
            onClick={() => setRotationSpeed("low")}
            className={`px-4 py-2 rounded ${
              rotationSpeed === "low"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            1
          </button>
          <button
            onClick={() => setRotationSpeed("medium")}
            className={`px-4 py-2 rounded ${
              rotationSpeed === "medium"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            3
          </button>
          <button
            onClick={() => setRotationSpeed("high")}
            className={`px-4 py-2 rounded ${
              rotationSpeed === "high"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            Turbo
          </button>
          {rotationSpeed !== "off" && (
            <button
              onClick={() => setRotationSpeed("off")}
              className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
            >
              Stop
            </button>
          )}
        </div>
      </div>

      {isAR && (
        <div className="fixed inset-x-0 bottom-0 flex flex-col gap-4 z-[9999] p-4">
          <div className="mx-auto flex items-center gap-4 bg-white/70 p-3 rounded-lg">
            <span className="text-white">Size:</span>
            <input
              type="range"
              min="0.1"
              max="1.0"
              step="0.05"
              value={scale}
              onChange={(e) => setScale(Number(e.target.value))}
              className="w-32"
            />
            <span className="text-white">{scale.toFixed(2)}x</span>
          </div>

          <div className="mx-auto flex items-center gap-4 bg-black/70 p-3 rounded-lg">
            <span className="text-white">Angle:</span>
            <input
              type="range"
              min="-180"
              max="180"
              value={verticalAngle}
              onChange={(e) => setVerticalAngle(Number(e.target.value))}
              className="w-32"
            />
            <span className="text-white">{verticalAngle}°</span>
          </div>
        </div>
      )}
    </div>
  );
}
