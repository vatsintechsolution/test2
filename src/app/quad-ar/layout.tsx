import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quad AR',
  description: 'Experience AR with AiroQuad Fan',
  other: {
    'http-equiv': 'Cross-Origin-Opener-Policy',
    'Cross-Origin-Opener-Policy': 'same-origin',
    'Cross-Origin-Embedder-Policy': 'require-corp',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>{children}</body>
    </html>
  );
}