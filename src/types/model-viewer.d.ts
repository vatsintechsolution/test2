/// <reference types="@google/model-viewer" />

declare namespace JSX {
  interface IntrinsicElements {
    'model-viewer': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        src?: string;
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
        ar?: boolean;
        slot?: string;
      },
      HTMLElement
    >;
  }
}