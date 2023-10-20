import '@/app/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_TITLE_AND_HEADER ?? ``,
  description: process.env.NEXT_PUBLIC_DESCRIPTION ?? '',
  category: 'technology',
  keywords: [
    'Beekeepers',
    'map',
    'nectar availability',
    'honey yield prediction',
  ],
  openGraph: {
    title: process.env.NEXT_PUBLIC_TITLE_AND_HEADER ?? '',
    description: process.env.NEXT_PUBLIC_DESCRIPTION ?? '',
    url: process.env.NEXT_PUBLIC_URL ?? '',
    siteName: process.env.NEXT_PUBLIC_TITLE ?? '',
    images: process.env.NEXT_PUBLIC_OPENGRAPH_IMAGE ?? '',
    type: 'website',
  },
  twitter: {
    title: process.env.NEXT_PUBLIC_TITLE_AND_HEADER ?? '',
    card: 'summary_large_image',
    description: process.env.NEXT_PUBLIC_DESCRIPTION ?? '',
    images: process.env.NEXT_PUBLIC_OPENGRAPH_IMAGE ?? '',
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL ?? ''),
  authors: [
    {
      name: process.env.NEXT_PUBLIC_TITLE ?? '',
      url: process.env.NEXT_PUBLIC_GITHUB ?? '',
    },
  ],
  creator: process.env.NEXT_PUBLIC_TITLE ?? '',
  publisher: process.env.NEXT_PUBLIC_TITLE ?? '',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
    },
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
