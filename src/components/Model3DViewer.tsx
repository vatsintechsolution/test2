'use client'

import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default function Model3DViewer() {
  const gltf = useLoader(GLTFLoader, '/base.gltf')

  return <primitive object={gltf.scene} scale={1} />
} 