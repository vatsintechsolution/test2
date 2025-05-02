// Ensure this file is treated as a module
export {};

// Extend the JSX namespace to include model-viewer as a valid HTML element
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string;
        ar?: boolean;
        'ar-modes'?: string;
        'camera-controls'?: string;
        'touch-action'?: string;
        'ar-placement'?: string;
        scale?: string;
        orientation?: string;
        'auto-rotate'?: boolean;
        'ios-src'?: string;
        'rotation-per-second'?: string;
        'interaction-policy'?: string;
        'disable-zoom'?: boolean;
        'disable-tap'?: boolean;
        'disable-scroll'?: boolean;
        'camera-orbit'?: string;
        'min-camera-orbit'?: string;
        'max-camera-orbit'?: string;
        'camera-target'?: string;
        'field-of-view'?: string;
        'shadow-intensity'?: string;
        exposure?: string;
        'ar-scale'?: string;
        'environment-image'?: string;
        loading?: string;
        onError?: (event: Event) => void;
        onArStatusChange?: (event: CustomEvent) => void;
      };
    }
  }

  // Declare the ModelViewer module
  interface ModelViewerElement extends HTMLElement {
    model: {
      materials: Array<{
        pbrMetallicRoughness: {
          setBaseColorFactor: (color: string) => void;
        }
      }>;
    };
  }
}

// Declare window.model-viewer
interface Window {
  'model-viewer': {
    ModelViewer: CustomElementConstructor;
  };
} 