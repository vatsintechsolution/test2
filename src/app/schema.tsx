// Server component for home page schema
export default function HomePageSchema() {
  // ItemList schema
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "EcoLink AiroElevate BLDC Ceiling Fan",
        "url": "https://fans.ecolinklighting.in/products/airoelevate"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "EcoLink AiroQuad BLDC Ceiling Fan",
        "url": "https://fans.ecolinklighting.in/products/airoquad"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "EcoLink AiroJewel BLDC Ceiling Fan",
        "url": "https://fans.ecolinklighting.in/products/airojewel"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "EcoLink AiroGeometry BLDC Ceiling Fan",
        "url": "https://fans.ecolinklighting.in/products/airogeometry"
      },
      {
        "@type": "ListItem",
        "position": 5,
        "name": "EcoLink Stardust BLDC Ceiling Fan",
        "url": "https://fans.ecolinklighting.in/products/stardustbldc"
      },
      {
        "@type": "ListItem",
        "position": 6,
        "name": "EcoLink AiroJewel BLDC Smart Ceiling Fan",
        "url": "https://fans.ecolinklighting.in/products/airojewelsmart"
      },
      {
        "@type": "ListItem",
        "position": 7,
        "name": "EcoLink AiroGeometry BLDC Smart Ceiling Fan",
        "url": "https://fans.ecolinklighting.in/products/airogeometrysmart"
      },
      {
        "@type": "ListItem",
        "position": 8,
        "name": "EcoLink AiroZephyr Ceiling Fan",
        "url": "https://fans.ecolinklighting.in/products/airozephyr"
      },
      {
        "@type": "ListItem",
        "position": 9,
        "name": "EcoLink AiroSerenade Ceiling Fan",
        "url": "https://fans.ecolinklighting.in/products/airoserenade"
      },
      {
        "@type": "ListItem",
        "position": 10,
        "name": "EcoLink AiroSleek Ceiling Fan",
        "url": "https://fans.ecolinklighting.in/products/airosleek"
      },
      {
        "@type": "ListItem",
        "position": 11,
        "name": "EcoLink VayuPro High Speed Ceiling Fan",
        "url": "https://fans.ecolinklighting.in/products/vayuprohs"
      },
      {
        "@type": "ListItem",
        "position": 12,
        "name": "EcoLink VayuUltra Ceiling Fan",
        "url": "https://fans.ecolinklighting.in/products/vayuultra"
      }
    ]
  };

  // Breadcrumb schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://fans.ecolinklighting.in/"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
} 