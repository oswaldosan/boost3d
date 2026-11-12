import type { MetadataRoute } from 'next';
import { site } from '@/lib/constants';
import { SEO_DESCRIPTION } from '@/lib/seo';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Boost Digital HN',
    short_name: site.name,
    description: SEO_DESCRIPTION,
    lang: 'es-HN',
    start_url: '/',
    display: 'browser',
    background_color: '#eef0f8',
    theme_color: '#0d0869',
    icons: [
      { src: '/icon.png', sizes: '512x512', type: 'image/png' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  };
}
