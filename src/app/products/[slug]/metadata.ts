import type { Metadata } from 'next';

// Import the product data from the lib file
import productsData from '@/lib/products';

// Define a type for the route params
type ProductPageParams = {
  slug: string;
};

// Map of product slugs to their static metadata
const staticMetadata: { [key: string]: { title: string, description: string } } = {
  "airoelevate": {
    title: "EcoLink AiroElevate BLDC Ceiling Fan | Energy-Efficient Ceiling Fan",
    description: "Experience superior cooling and energy savings with EcoLink AiroElevate BLDC Ceiling Fan- with Unique hollow hub design and powerful motor. A cool choice for any home!"
  },
  "airoquad": {
    title: "EcoLink AiroQuad BLDC Ceiling Fan | Modern Design, Powerful Cooling",
    description: "Experience powerful cooling and modern elegance with EcoLink AiroQuad BLDC Ceiling Fan- having unique square hub design!"
  },
  "airojewel": {
    title: "EcoLink AiroJewel BLDC Ceiling fan | Diamond cut design, high on performance",
    description: "Discover EcoLink AiroJewel BLDC Ceiling Fan. Combines elegant diamond-cut design with superior energy efficiency"
  },
  "airogeometry": {
    title: "EcoLink AiroGeometry BLDC ceiling Fan | Modern Ceiling Fan",
    description: "Discover EcoLink AiroGeometry BLDC Ceiling fan- stylish ceiling fan with unique triangular hub design that enhance your home's aesthetics and provide efficient cooling."
  },
  "airojewelsmart": {
    title: "EcoLink AiroJewel BLDC Smart Ceiling Fan | Diamond cut design",
    description: "Explore EcoLink AiroJewel BLDC Smart ceiling fan with a sophisticated, jewel-like aesthetic and connected with Wiz mobile application."
  },
  "airogeometrysmart": {
    title: "EcoLink AiroGeometry BLDC Smart ceiling Fan | BLDC Smart Ceiling Fan",
    description: "Explore EcoLink AiroGeometry BLDC Smart ceiling fan with triangular hub design & superior air delivery."
  },
  "airozephyr": {
    title: "EcoLink AiroZephyr Decorative Ceiling Fan with superior air delivery",
    description: "Elegant ceiling fan featuring durable aluminum blades for optimal airflow and lasting performance"
  },
  "airosleek": {
    title: "EcoLink AiroSleek Decorative Ceiling Fan | stylish fan for modern homes",
    description: "Discover EcoLink AiroSleek decorative ceiling fan- a sleek and modern ceiling fan with superior air delivery & lasting performance."
  },
  "airoserenade": {
    title: "EcoLink AiroSerenade Ceiling Fan | Elegant Design & Powerful Airflow",
    description: "Experience superior air delivery with EcoLink AiroSerenade ceiling fan, having elegant design and with durable aluminium blades for powerful and efficient airflow."
  },
  "vayuprohs": {
    title: "EcoLink VayuPro High Speed Ceiling Fan for powerful airflow",
    description: "Get powerful airflow and energy savings with the EcoLink VayuPro High Speed ceiling fan, delivering 210 cmm air delivery at just 50W."
  },
  "vayuultra": {
    title: "EcoLink VayuUltra Ceiling Fan- powerful & affordable",
    description: "Experience superior cooling with EcoLink VayuUltra ceiling fan, having robust motor for exceptional airflow for any room."
  }
};

// This is a dynamic metadata function that will generate metadata for each product page
export async function generateMetadata({ params }: { params: ProductPageParams }): Promise<Metadata> {
  // Properly await params to access the slug in Next.js 15
  const { slug } = await params;
  
  // Check if we have static metadata for this slug
  if (staticMetadata[slug]) {
    const { title, description } = staticMetadata[slug];
    
    // Find the product with the matching slug for additional data
    const product = productsData.products.find(p => p.slug === slug);
    
    // If no product is found, return just the static metadata
    if (!product) {
      return {
        title,
        description,
      };
    }
    
    // Return static metadata with dynamic OpenGraph and Twitter data
    return {
      title,
      description,
      keywords: [
        "BLDC fan",
        "ceiling fan",
        "energy efficient",
        "premium fan",
        "EcoLink",
        "runs 3x longer",
        "inverter compatible",
        ...(product.features.map(feature => feature.title.toLowerCase())),
      ],
      openGraph: {
        title,
        description,
        images: [product.images.main],
        url: `https://fans.ecolinklighting.in/products/${slug}`,
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [product.images.main],
      },
    };
  }
  
  // If no static metadata found, fallback to dynamic generation
  const product = productsData.products.find(p => p.slug === slug);

  // If no product is found, return a basic metadata object
  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found.',
    };
  }

  // Fallback to dynamic metadata construction
  return {
    title: `${product.fullName}`,
    description: `${product.fullName} - Ceiling Fan with air delivery. Runs 3x longer on inverter.`,
    keywords: [
      "BLDC fan",
      "ceiling fan",
      "energy efficient",
      "premium fan",
      "EcoLink",
      "runs 3x longer",
      "inverter compatible",
      ...(product.features.map(feature => feature.title.toLowerCase())),
    ],
    openGraph: {
      title: product.fullName,
      description: `${product.fullName} Ceiling Fan with air delivery. Runs 3x longer on inverter. Features a powerful BLDC motor, maximizing energy savings.`,
      images: [product.images.main],
      url: `https://fans.ecolinklighting.in/products/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: product.fullName,
      description: `Ceiling Fan with air delivery. Runs 3x longer on inverter. Features a powerful BLDC motor.`,
      images: [product.images.main],
    },
  };
} 