/// <reference types="@google/model-viewer" />

/**
 * Type declarations for Google's <model-viewer> Web Component
 */

declare namespace JSX {
  interface IntrinsicElements {
    'model-viewer': ModelViewerAttributes;
  }
}

/**
 * Interface for model-viewer element attributes
 */
interface ModelViewerAttributes extends React.HTMLAttributes<HTMLElement> {
  src: string;
  alt?: string;
  ar?: boolean;
  'ar-modes'?: string;
  'ar-scale'?: string;
  'ar-placement'?: string;
  'camera-controls'?: boolean | string;
  'camera-orbit'?: string;
  'camera-target'?: string;
  'field-of-view'?: string;
  'min-camera-orbit'?: string;
  'max-camera-orbit'?: string;
  'rotation-per-second'?: string;
  'touch-action'?: string;
  'auto-rotate'?: boolean;
  'environment-image'?: string;
  exposure?: string;
  'ios-src'?: string;
  'loading'?: string;
  poster?: string;
  preload?: boolean;
  reveal?: string;
  'shadow-intensity'?: string;
  'interaction-policy'?: string;
  'shadow-softness'?: string;
  scale?: string;
  orientation?: string;
  'min-field-of-view'?: string;
  'max-field-of-view'?: string;
  'disable-zoom'?: boolean;
  'disable-tap'?: boolean;
  'disable-pan'?: boolean;
  'interpolation-decay'?: number;
  'skybox-image'?: string;
  'animation-name'?: string;
  'animation-crossfade-duration'?: string;
  autoplay?: boolean;
  'pixel-art'?: boolean;
  'variant-name'?: string;
  'orbit-sensitivity'?: string;
  ref?: React.Ref<HTMLElement>;
  onError?: (event: Event) => void;
  onLoad?: (event: Event) => void;
  onProgress?: (event: Event) => void;
  onArStatusChange?: (event: CustomEvent) => void;
  onModelVisibility?: (event: CustomEvent) => void;
  onAnimationStart?: (event: CustomEvent) => void;
  onAnimationEnd?: (event: CustomEvent) => void;
  children?: React.ReactNode;
}