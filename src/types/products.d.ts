// Define the product data structure
interface ProductColor {
  name: string;
  primary: string;
  secondary: string;
  gradientFrom: string;
  gradientTo: string;
}

interface ProductSize {
  label: string;
  value: string;
}

interface ProductFeature {
  title: string;
  description: string;
  icon: string;
}

interface ProductSeasonalFeature {
  title: string;
  description: string;
  image: string;
}

interface ProductEnergyEfficiency {
  savingsPercentage: number;
  annualSavings: number;
  description: string;
  icon: string;
}

interface ProductRemoteFeatures {
  type: string;
  range: string;
  functions: string[];
  image: string;
  lightModeImage: string;
}

interface ProductImages {
  main: string;
  gallery: string[];
  arModel: string;
}

interface ProductVideos {
  promotional: string;
  thumbnail: string;
}

interface ProductAesthetics {
  title: string;
  description: string;
  highlightPoints: string[];
}

interface ProductWarranty {
  standard: number;
  extended: number;
  note: string;
}

interface ProductSpecifications {
  sweepSize: string;
  power: string;
  speed: string;
  airDelivery: string;
  dimensions: string;
  type: string;
  brand: string;
}

interface Product {
  id: string;
  slug: string;
  modelName: string;
  fullName: string;
  tagline: string;
  description: string;
  price: number;
  starRating: number;
  warranty: ProductWarranty;
  specifications: ProductSpecifications;
  colors: ProductColor[];
  sizes: ProductSize[];
  keyFeature: string;
  features: ProductFeature[];
  seasonalFeatures: {
    summer: ProductSeasonalFeature;
    winter: ProductSeasonalFeature;
  };
  energyEfficiency: ProductEnergyEfficiency;
  remoteFeatures: ProductRemoteFeatures;
  images: ProductImages;
  videos: ProductVideos;
  aesthetics: ProductAesthetics;
  categories: string[];
}

interface Category {
  id: string;
  name: string;
  description: string;
}

interface FeatureIcons {
  [key: string]: string;
}

interface ProductsData {
  products: Product[];
  categories: Category[];
  featureIcons: FeatureIcons;
}

declare module "*.json" {
  const value: ProductsData;
  export default value;
} 