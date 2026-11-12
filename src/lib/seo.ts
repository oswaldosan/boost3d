import { site } from '@/lib/constants';

/**
 * Canonical origin used for metadata, sitemap, robots and JSON-LD.
 * Set NEXT_PUBLIC_SITE_URL per environment (e.g. preview deployments);
 * falls back to the production domain declared in `site.url`.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || site.url).replace(/\/+$/, '');

export const SEO_TITLE = 'Boost Digital | Eventos, BTL, audiovisuales y marketing digital en Honduras';

export const SEO_DESCRIPTION =
  'Agencia hondureña de eventos, BTL, audiovisuales y marketing digital. Creamos, producimos e implementamos campañas y activaciones que hacen crecer marcas en Honduras.';
