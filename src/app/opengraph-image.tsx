import { renderSocialCard } from '@/lib/og';

export const alt =
  'Boost Digital: agencia de eventos, BTL, audiovisuales y marketing digital en Honduras';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return renderSocialCard();
}
