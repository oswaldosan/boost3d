import type { Metadata } from 'next';
import { Manrope, Sora } from 'next/font/google';
import './globals.css';

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
});

const sora = Sora({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sora',
});

export const metadata: Metadata = {
  title: 'Boost Digital HN | Agencia de Marketing & Eventos BTL en Honduras',
  description:
    'Agencia líder en marketing estratégico, producción de eventos BTL, activaciones de marca y marketing experiencial en Honduras. Transformamos marcas en experiencias memorables.',
  keywords: [
    'marketing Honduras',
    'eventos BTL Honduras',
    'agencia de marketing',
    'activaciones de marca',
    'marketing experiencial',
    'Boost Digital',
    'marketing digital Honduras',
    'producción de eventos',
    'BTL Tegucigalpa',
  ],
  authors: [{ name: 'Boost Digital HN' }],
  creator: 'Boost Digital HN',
  metadataBase: new URL('https://boostdigitalhn.com'),
  openGraph: {
    type: 'website',
    locale: 'es_HN',
    url: 'https://boostdigitalhn.com',
    siteName: 'Boost Digital HN',
    title: 'Boost Digital HN | Marketing & Eventos BTL de Clase Mundial',
    description:
      'Transformamos marcas en experiencias memorables. Estrategia digital, producción BTL y activaciones de clase mundial desde Honduras.',
    images: [
      {
        url: '/brand/logoboost2.png',
        width: 1200,
        height: 630,
        alt: 'Boost Digital HN',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Boost Digital HN | Marketing & Eventos BTL',
    description:
      'Agencia líder en marketing estratégico y producción de eventos BTL en Honduras.',
    images: ['/brand/logoboost2.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// Schema.org structured data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Boost Digital HN',
  url: 'https://boostdigitalhn.com',
  logo: 'https://boostdigitalhn.com/brand/logoboost2.png',
  description:
    'Agencia líder en marketing estratégico, producción de eventos BTL y activaciones de marca en Honduras.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Tegucigalpa',
    addressCountry: 'HN',
  },
  sameAs: [
    'https://instagram.com/boostdigitalhn',
    'https://facebook.com/boostdigitalhn',
    'https://linkedin.com/company/boostdigitalhn',
    'https://tiktok.com/@boostdigitalhn',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'hola@boostdigitalhn.com',
    contactType: 'customer service',
    availableLanguage: ['Spanish'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${manrope.variable} ${sora.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  );
}
