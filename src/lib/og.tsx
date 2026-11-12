import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { ImageResponse } from 'next/og';
import { services, site, stats } from '@/lib/constants';

export const OG_SIZE = { width: 1200, height: 630 };
/** Shared 1200×630 social card used by opengraph-image and twitter-image. */
export async function renderSocialCard() {
  const [logo, owl] = await Promise.all([
    readFile(path.join(process.cwd(), 'public/brand/logoboost2.png')),
    readFile(path.join(process.cwd(), 'public/brand/buho2.png')),
  ]);
  const toDataUrl = (buf: Buffer) => `data:image/png;base64,${buf.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: 'linear-gradient(135deg, #f8f9ff 0%, #e6e8f2 100%)',
          color: '#0d0869',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '64px 0 64px 72px',
            width: 760,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={toDataUrl(logo)} width={270} height={155} alt="" />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 60, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>
              Hacemos crecer marcas en Honduras
            </div>
            <div style={{ marginTop: 24, fontSize: 28, color: '#565b7e' }}>
              {services.map((s) => s.title).join(' · ')}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', fontSize: 24, fontWeight: 700 }}>
            <div
              style={{
                display: 'flex',
                background: '#d62928',
                color: '#ffffff',
                borderRadius: 999,
                padding: '10px 24px',
              }}
            >
              {stats[3].value} marcas confían en nosotros
            </div>
            <div style={{ marginLeft: 24, color: '#565b7e', fontWeight: 600 }}>
              {site.url.replace(/^https?:\/\/(www\.)?/, '')}
            </div>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 440,
            background: '#0d0869',
            borderTopLeftRadius: 64,
            borderBottomLeftRadius: 64,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 340,
              height: 340,
              borderRadius: 48,
              background: '#ffffff',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={toDataUrl(owl)} width={280} height={261} alt="" />
          </div>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
