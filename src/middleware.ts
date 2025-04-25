import { NextRequest, NextResponse } from 'next/server';

/**
 * Middleware to handle redirects from old URL structure to new URL structure
 * Old: /<slug>
 * New: /products/<slug>
 */
export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const { pathname } = url;

  // Special handling for the root path ("/")
  if (pathname === '/' || pathname === '' || pathname.toLowerCase() === '/index') {
    // Ensure we never redirect the home page
    return NextResponse.next();
  }

  // Define the list of valid product slugs that should be redirected
  const validProductSlugs = [
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

  // Extract the slug from the path (removing the leading slash)
  const slug = pathname.slice(1);

  // Only redirect if this is exactly one of our valid product slugs
  // Check that there are no additional path segments
  if (validProductSlugs.includes(slug) && pathname.split('/').filter(Boolean).length === 1) {
    url.pathname = `/products${pathname}`;
    return NextResponse.redirect(url, {
      status: 301, // Permanent redirect for SEO benefit
    });
  }

  // For all other paths, including potentially nested routes, continue without redirect
  return NextResponse.next();
}

// Define specific patterns to match only the product slugs we want to redirect
// Explicitly list all product paths to avoid intercepting any static assets
export const config = {
  matcher: [
    // Only match exactly these product slugs and nothing else
    '/airoelevate', '/airoquad', '/airogeometry', '/airojewel', 
    '/stardustbldc', '/airojewelsmart', '/airogeometrysmart', 
    '/airozephyr', '/airoserenade', '/airosleek', '/vayuprohs', '/vayuultra'
  ],
}; 