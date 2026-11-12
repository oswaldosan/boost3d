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
  title: 'Boost Digital – Marketing y Diseño Digital',
  description:
    'Empresa de eventos, BTL, audiovisuales y Marketing digital. Creamos, producimos, administramos e implementamos sus requerimientos publicitarios.',
  keywords: [
    'Boost Digital',
    'marketing Honduras',
    'BTL Honduras',
    'eventos Honduras',
    'audiovisuales',
    'marketing digital Honduras',
    'activaciones',
    'producción de eventos',
  ],
  authors: [{ name: 'Boost Digital HN' }],
  creator: 'Boost Digital HN',
  metadataBase: new URL('https://www.boostdigitalhn.com'),
  icons: {
    icon: '/brand/buho.png',
    apple: '/brand/buho.png',
  },
  openGraph: {
    type: 'website',
    locale: 'es_HN',
    url: 'https://www.boostdigitalhn.com',
    siteName: 'Boost Digital',
    title: 'Boost Digital – Marketing y Diseño Digital',
    description:
      'Empresa de eventos, BTL, audiovisuales y Marketing digital en Honduras.',
    images: [
      {
        url: '/brand/logoboost2.png',
        width: 1200,
        height: 630,
        alt: 'Boost Digital',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Boost Digital – Marketing y Diseño Digital',
    description:
      'Eventos, BTL, audiovisuales y Marketing digital en Honduras.',
    images: ['/brand/logoboost2.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Boost Digital HN',
  url: 'https://www.boostdigitalhn.com',
  logo: 'https://www.boostdigitalhn.com/brand/logoboost2.png',
  description:
    'Empresa de eventos, BTL, audiovisuales y Marketing digital en Honduras.',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'HN',
  },
  sameAs: [
    'https://instagram.com/boostdigitalhn',
    'https://facebook.com/boostdigitalhn',
    'https://linkedin.com/company/boost-digital-hn',
  ],
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
