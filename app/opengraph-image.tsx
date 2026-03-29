import { ImageResponse } from 'next/og';
import { readFile } from 'fs/promises';
import { join } from 'path';

export const alt = 'Upscale Outhouse — Luxury Restroom Trailer Rentals';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const [bgBuffer, logoBuffer] = await Promise.all([
    readFile(join(process.cwd(), 'public/images/gallery/evt-winery-evening-front.jpg')),
    readFile(join(process.cwd(), 'public/images/gallery/logo-clear.jpg')),
  ]);

  const bgSrc = `data:image/jpeg;base64,${bgBuffer.toString('base64')}`;
  const logoSrc = `data:image/jpeg;base64,${logoBuffer.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          position: 'relative',
        }}
      >
        {/* Background photo */}
        <img
          src={bgSrc}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: '65% 30%',
          }}
        />

        {/* Left-to-right gradient overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to right, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.75) 45%, rgba(10,10,10,0.2) 100%)',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '60px 70px',
            position: 'relative',
            width: '100%',
            height: '100%',
          }}
        >
          {/* Logo */}
          <img
            src={logoSrc}
            style={{
              width: 100,
              height: 100,
              borderRadius: 12,
              marginBottom: 28,
            }}
          />

          {/* Brand name */}
          <div
            style={{
              display: 'flex',
              fontSize: 52,
              fontWeight: 700,
              color: '#C9A84C',
              letterSpacing: 2,
              lineHeight: 1.1,
              marginBottom: 12,
            }}
          >
            Upscale Outhouse
          </div>

          {/* Tagline */}
          <div
            style={{
              display: 'flex',
              fontSize: 22,
              color: '#D4D4D4',
              letterSpacing: 1,
              marginBottom: 24,
            }}
          >
            Luxury Restroom Trailer Rentals
          </div>

          {/* Divider */}
          <div
            style={{
              display: 'flex',
              width: 80,
              height: 2,
              background: '#C9A84C',
              marginBottom: 20,
            }}
          />

          {/* Location */}
          <div
            style={{
              display: 'flex',
              fontSize: 16,
              color: '#9CA3AF',
              letterSpacing: 0.5,
            }}
          >
            Fresno & Central California · Veteran-Owned
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
