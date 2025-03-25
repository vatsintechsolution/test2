// Import product data from JSON file
import productsData from '../../public/data/products.json';

// Re-export Product interface for use in components
export interface ProductData {
  products: Product[];
  categories: Category[];
  featureIcons: Record<string, string>;
}

export interface Product {
  id: string;
  slug: string;
  modelName: string;
  fullName: string;
  tagline: string;
  description: string;
  price: number;
  starRating: number;
  warranty: {
    standard: number;
    extended: number;
    note: string;
  };
  specifications: {
    sweepSize: string;
    power: string;
    speed: string;
    airDelivery: string;
    dimensions: string;
    type: string;
    brand: string;
  };
  colors: Array<{
    name: string;
    primary: string;
    secondary: string;
    gradientFrom: string;
    gradientTo: string;
  }>;
  sizes: Array<{
    label: string;
    value: string;
  }>;
  keyFeature: string;
  features: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  seasonalFeatures: {
    summer: {
      title: string;
      description: string;
      image: string;
    };
    winter: {
      title: string;
      description: string;
      image: string;
    };
  };
  energyEfficiency: {
    savingsPercentage: number;
    annualSavings: number;
    description: string;
    icon: string;
  };
  remoteFeatures: {
    type: string;
    range: string;
    functions: string[];
    image: string;
    lightModeImage: string;
  };
  images: {
    main: string;
    gallery: string[];
    arModel: string;
  };
  videos: {
    promotional: string;
    thumbnail: string;
  };
  aesthetics: {
    title: string;
    description: string;
    highlightPoints: string[];
  };
  categories: string[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

// Export the data with correct typing
export default productsData; 