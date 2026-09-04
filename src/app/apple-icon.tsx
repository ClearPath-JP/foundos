import { ImageResponse } from 'next/og';

/**
 * apple-touch-icon — the tile iOS uses when somebody saves foundos.ai to a
 * home screen, and what Safari shows in a few other places. There was none, so
 * iOS was rasterising a screenshot of the page instead.
 *
 * It is the mark from icon.svg at 180px and nothing else: white ground, one
 * #1D9E75 circle. That file's own note records why the mark is the dot alone —
 * the `f` + dot lockup was drawn, rasterised small, and never resolved in a
 * square tile. This must not quietly become a different logo at a bigger size.
 *
 * Geometry is icon.svg's exact ratio: r=11 in a 32 viewBox is a diameter of
 * 22/32, so 180 * 0.6875 = 123.75 → 124. iOS rounds the corners itself; the
 * circle sits far enough inside that the mask never touches it.
 *
 * White, not the #1a1a1a of theme-color, because the browser-tab favicon is
 * white and two versions of one mark that disagree on ground is how a logo
 * stops reading as a logo.
 *
 * Generated rather than committed as a PNG for the same reason as the OG card:
 * there is no design budget and no binary to keep in sync with icon.svg.
 */

export const size = { width: 180, height: 180 };

export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FFFFFF',
        }}
      >
        <div
          style={{
            width: 124,
            height: 124,
            borderRadius: '50%',
            backgroundColor: '#1D9E75',
          }}
        />
      </div>
    ),
    { ...size },
  );
}
