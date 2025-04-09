import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/header/Header";
import StyledComponentsRegistry from '../lib/registry';
import { ThemeProvider } from "@/lib/ThemeProvider";
import ScrollToTop from '@/components/ScrollToTop';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    template: '%s | EcoLink - Premium Fans & Lighting Solutions',
    default: 'EcoLink - Premium Fans & Lighting Solutions',
  },
  description: "Discover EcoLink's premium range of BLDC ceiling fans, lighting solutions and smart home products. Energy-efficient, beautifully designed, technologically advanced products for modern homes.",
  keywords: ["EcoLink", "BLDC fans", "ceiling fans", "lighting", "smart home", "energy efficient", "Signify", "LED lights", "home decor"],
  authors: [{ name: "Signify Innovations" }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.ecolink.in',
    siteName: 'EcoLink',
    title: 'EcoLink - Premium Fans & Lighting Solutions',
    description: "Discover EcoLink's premium range of BLDC ceiling fans, lighting solutions and smart home products.",
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'EcoLink',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EcoLink - Premium Fans & Lighting Solutions',
    description: "Discover EcoLink's premium range of BLDC ceiling fans, lighting solutions and smart home products.",
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/faviconn.png',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme') || 'dark';
                  const root = document.documentElement;
                  
                  if (theme === 'system') {
                    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                    root.classList.add(systemTheme);
                  } else {
                    root.classList.add(theme);
                  }
                } catch (error) {
                  // Default to dark theme if localStorage is not available
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className="antialiased"
      >
        <ScrollToTop />
        <StyledComponentsRegistry>
          <ThemeProvider>
            <Header />
            <main>{children}</main>
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
