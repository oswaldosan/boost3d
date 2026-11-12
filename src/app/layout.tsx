import type { Metadata, Viewport } from 'next';
import { Manrope, Sora } from 'next/font/google';
import MotionProvider from '@/components/providers/MotionProvider';
import { site } from '@/lib/constants';
import { SEO_DESCRIPTION, SEO_TITLE, SITE_URL } from '@/lib/seo';
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
  metadataBase: new URL(SITE_URL),
  title: {
    default: SEO_TITLE,
    template: `%s | ${site.name}`,
  },
  description: SEO_DESCRIPTION,
  applicationName: site.name,
  keywords: [
    'Boost Digital',
    'agencia de marketing en Honduras',
    'marketing digital Honduras',
    'BTL Honduras',
    'activaciones de marca',
    'producción de eventos Honduras',
    'producción audiovisual Honduras',
    'eventos corporativos Honduras',
    'pantallas LED',
    'manejo de redes sociales',
  ],
  authors: [{ name: 'Boost Digital HN', url: SITE_URL }],
  creator: 'Boost Digital HN',
  publisher: 'Boost Digital HN',
  category: 'marketing',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_HN',
    url: '/',
    siteName: site.name,
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    // Image comes from src/app/opengraph-image.tsx (file convention).
  },
  twitter: {
    card: 'summary_large_image',
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: '#0d0869',
  colorScheme: 'light',
};

/** Structured data limited to facts published on the site itself. */
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Boost Digital HN',
      alternateName: site.name,
      url: SITE_URL,
      logo: `${SITE_URL}/brand/logoboost2.png`,
      image: `${SITE_URL}/opengraph-image`,
      description: site.description,
      slogan: site.tagline,
      email: site.email,
      areaServed: { '@type': 'Country', name: 'Honduras' },
      address: { '@type': 'PostalAddress', addressCountry: 'HN' },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        email: site.email,
        availableLanguage: ['es'],
        areaServed: 'HN',
      },
      knowsAbout: ['BTL', 'Marketing digital', 'Producción de eventos', 'Audiovisuales'],
      sameAs: site.socials.map((s) => s.href),
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: site.name,
      inLanguage: 'es-HN',
      publisher: { '@id': `${SITE_URL}/#organization` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-HN" className={`${manrope.variable} ${sora.variable}`}>
      <body className="font-sans">
        <script
          type="application/ld+json"
          // Escape "<" so the JSON can never close the script tag early.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Saltar al contenido
        </a>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
