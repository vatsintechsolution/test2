'use client'

import { useEffect, useState, useRef } from 'react'

type RotationSpeed = 'off' | 'low' | 'medium' | 'high'

interface ArStatusChangeEvent extends Event {
  detail: {
    status: string;
  }
}

export default function ARViewer({ modelPath }: { modelPath: string }) {
  const [rotationSpeed, setRotationSpeed] = useState<RotationSpeed>('off')
  const [isAR, setIsAR] = useState(false)
  const [scale, setScale] = useState(0.5)
  const [verticalAngle, setVerticalAngle] = useState(0)
  const modelViewerLoaded = useRef(false)

  

  useEffect(() => {
    if (!modelViewerLoaded.current) {
      modelViewerLoaded.current = true
      if (!customElements.get('model-viewer')) {
        import('@google/model-viewer')
      }
    }
  }, [])

  const speedValues = {
    off: '0deg',
    low: '360deg',
    medium: '720deg',
    high: '1440deg'
  }

  return (
    <div className="w-full h-[600px] bg-[url(/fan-bg.jpeg)] bg-cover bg-top bg-no-repeat relative">
      <model-viewer
        src={modelPath}
        ar
        ar-modes="webxr scene-viewer quick-look"
        camera-controls="true"
        ar-scale="auto"
        ar-placement="wall"
        scale={`${scale} ${scale} ${scale}`}
        orientation={`0deg ${verticalAngle}deg 0deg`}
        auto-rotate
        rotation-per-second={speedValues[rotationSpeed]}
        interaction-policy="allow-when-focused"
        camera-orbit="0deg 120deg 100%"
        min-camera-orbit="auto 100deg 100%"
        max-camera-orbit="auto 120deg 200%"
        camera-target="0m 0.5m 0m"
        field-of-view="30deg"
        shadow-intensity="1"
        bounds="tight"
        onArStatusChange={(e: ArStatusChangeEvent) => setIsAR(e.detail.status === 'session-started')}
        style={{ width: '100%', height: '100%' }}
      >
        
        <button slot="ar-button" className="absolute bottom-4 right-4 bg-black/50 text-white px-4 py-2 rounded">
          View in AR
        </button>

       
      </model-viewer>

      <div className="absolute bottom-4 left-4 z-[9999]">
        <div className="flex gap-2  p-3 rounded-lg   bg-black bg-cover bg-center bg-no-repeat">
          <button 
            onClick={() => setRotationSpeed('low')}
            className={`px-4 py-2 rounded ${
              rotationSpeed === 'low' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            1
          </button>
          <button 
            onClick={() => setRotationSpeed('medium')}
            className={`px-4 py-2 rounded ${
              rotationSpeed === 'medium' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            3
          </button>
          <button 
            onClick={() => setRotationSpeed('high')}
            className={`px-4 py-2 rounded ${
              rotationSpeed === 'high' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            Turbo
          </button>
          {rotationSpeed !== 'off' && (
            <button 
              onClick={() => setRotationSpeed('off')}
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
  )
} 