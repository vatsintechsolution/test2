import productsData from "@/lib/products";

// This is a server component that will generate the schema for products
export default async function ProductPageSchema({ params }: { params: { slug: string } }) {
  // Correctly await the params if they might be a promise
  const resolvedParams = params ? await Promise.resolve(params) : { slug: '' };
  const { slug } = resolvedParams;
  
  // Find the product data
  const product = productsData.products.find(p => p.slug === slug);
  
  if (!product) {
    // If product not found, return a minimal breadcrumb
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://fans.ecolinklighting.in/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Products",
                "item": "https://fans.ecolinklighting.in/products"
              }
            ]
          })
        }}
      />
    );
  }
  
  // Create breadcrumb schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://fans.ecolinklighting.in/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Products",
        "item": "https://fans.ecolinklighting.in/products"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": product.fullName,
        "item": `https://fans.ecolinklighting.in/products/${slug}`
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
    />
  );
} 