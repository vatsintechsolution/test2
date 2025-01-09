interface ModelViewerElement extends HTMLElement {
  src: string;
  ar: boolean;
  'ar-modes': string;
  'camera-controls': boolean;
  'shadow-intensity': string;
  'auto-rotate': boolean;
  'rotation-per-second': string;
  'ar-scale': string;
  'ar-placement': string;
  scale: string;
  orientation: string;
  'interaction-policy': string;
  'camera-orbit': string;
  'min-camera-orbit': string;
  'max-camera-orbit': string;
  'camera-target': string;
  'field-of-view': string;
}

declare namespace JSX {
  interface IntrinsicElements {
    'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<ModelViewerElement>, ModelViewerElement>;
  }
} 