import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BeeMovr',
  description: 'Helping beekeepers save their bees.',
  keywords: [
    'Beekeepers',
    'map',
    'nectar availability',
    'honey yield prediction',
  ],
  openGraph: {
    title: 'BeeMovr',
    description: 'Helping beekeepers save their bees.',
    url: 'https://BeeMovr.com',
    siteName: 'BeeMovr',
    images: process.env.NEXT_PUBLIC_OPENGRAPH_IMAGE,
    type: 'website',
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL || ''),
  authors: [{ name: 'BeeMovr', url: process.env.NEXT_PUBLIC_URL }],
  creator: 'BeeMovr',
  publisher: 'BeeMovr',
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
