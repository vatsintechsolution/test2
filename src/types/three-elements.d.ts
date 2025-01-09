import { ThreeElements } from '@react-three/fiber'

declare global {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {
      // Add any additional Three.js elements if needed
      mesh: JSX.IntrinsicElements['mesh'];
      boxGeometry: JSX.IntrinsicElements['boxGeometry'];
      meshStandardMaterial: JSX.IntrinsicElements['meshStandardMaterial'];
    }
  }
} 