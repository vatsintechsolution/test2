/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  async headers() {
    return [
      {
        source: '/ar-data/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
      // Add CORS headers for GLB model files with proper MIME type
      {
        source: '/models/:path*.glb',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Content-Type',
            value: 'model/gltf-binary',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Add CORS headers for GLB model files
      {
        source: '/models/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Add headers for static assets to ensure proper handling
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
        has: [
          {
            type: 'header',
            key: 'accept',
            value: '(image|font|application).*',
          },
        ],
      },
    ]
  },
  // Add redirects configuration to handle old URL structure
  async redirects() {
    // List of specific product slugs that need to be redirected
    const productSlugs = [
      'airoelevate',
      'airoquad',
      'airogeometry',
      'airojewel',
      'stardustbldc',
      'airojewelsmart',
      'airogeometrysmart',
      'airozephyr',
      'airoserenade',
      'airosleek',
      'vayuprohs',
      'vayuultra'
    ];
    
    // Create a redirect rule for each specific product slug
    // Use the has condition to only apply to HTML pages, not to assets
    const redirectRules = productSlugs.map(slug => ({
      source: `/${slug}`,
      destination: `/products/${slug}`,
      permanent: true, // 301 redirects for SEO benefit
      has: [
        {
          type: 'header',
          key: 'accept',
          value: 'text/html.*',
        }
      ]
    }));

    return redirectRules;
  },
  // Add rewrites configuration to fix static asset resolution from product pages
  async rewrites() {
    return [
      // Handle static assets requested from /products/* paths
      {
        source: '/products/home/:path*',
        destination: '/home/:path*',
      },
      {
        source: '/products/images/:path*',
        destination: '/images/:path*',
      },
      {
        source: '/products/fonts/:path*',
        destination: '/fonts/:path*',
      },
      {
        source: '/products/models/:path*',
        destination: '/models/:path*',
      },
      {
        source: '/products/textures/:path*',
        destination: '/textures/:path*',
      },
      {
        source: '/products/sliders/:path*',
        destination: '/sliders/:path*',
      },
      {
        source: '/products/logo.svg',
        destination: '/logo.svg',
      },
      {
        source: '/products/faviconn.png',
        destination: '/faviconn.png',
      },
      {
        source: '/products/:path*/:file.svg',
        destination: '/:path*/:file.svg',
      },
      {
        source: '/products/:path*/:file.png',
        destination: '/:path*/:file.png',
      },
      {
        source: '/products/:path*/:file.jpg',
        destination: '/:path*/:file.jpg',
      }
    ];
  }
}

module.exports = nextConfig