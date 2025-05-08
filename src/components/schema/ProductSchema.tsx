
export function ProductSchema({ product, slug }: { product: Product; slug: string }) {
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