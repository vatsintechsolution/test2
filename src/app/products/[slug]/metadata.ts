import type { Metadata } from 'next';

// Import the product data from the lib file
import productsData from '@/lib/products';

// This is a dynamic metadata function that will generate metadata for each product page
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  // Find the product with the matching slug
  const product = productsData.products.find(p => p.slug === params.slug);

  // If no product is found, return a basic metadata object
  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found.',
    };
  }

  // Create a formatted price with the ₹ symbol
  const formattedPrice = `₹${product.price.toLocaleString()}`;

  // Construct metadata for the product
  return {
    title: `${product.fullName} | Premium Ceiling Fan`,
    description: `${product.fullName} - ${product.specifications.sweepSize} BLDC Ceiling Fan with ${product.specifications.airDelivery} air delivery. Runs 3x longer on inverter. ${formattedPrice}.`,
    keywords: [
      product.modelName,
      "BLDC fan",
      "ceiling fan",
      "energy efficient",
      "premium fan",
      product.specifications.sweepSize,
      "EcoLink",
      "runs 3x longer",
      "inverter compatible",
      ...(product.features.map(feature => feature.title.toLowerCase())),
    ],
    openGraph: {
      title: product.fullName,
      description: `${product.fullName} - ${product.specifications.sweepSize} BLDC Ceiling Fan with ${product.specifications.airDelivery} air delivery. Runs 3x longer on inverter. Features a powerful BLDC motor, maximizing energy savings.`,
      images: [product.images.main],
      url: `https://www.ecolink.in/products/${product.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: product.fullName,
      description: `${product.specifications.sweepSize} BLDC Ceiling Fan with ${product.specifications.airDelivery} air delivery. Runs 3x longer on inverter. Features a powerful BLDC motor.`,
      images: [product.images.main],
    },
  };
} 