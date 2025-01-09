import { ModelViewerElement } from './model-viewer'

declare namespace JSX {
  interface IntrinsicElements {
    'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<ModelViewerElement>, ModelViewerElement>;
  }
} 