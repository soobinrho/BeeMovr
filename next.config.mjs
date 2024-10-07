/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Content-Security-Policy',
            value:
              "img-src 'self' data: blob: ; \
              style-src 'self' 'unsafe-inline'; \
              font-src 'self' https://fonts.googleapis.com; \
              worker-src 'self' blob: ; \
              base-uri 'none'; \
              form-action 'self'; \
              manifest-src 'self'; \
              object-src 'none'; \
              child-src blob: ; \
              connect-src 'self' https://*.tiles.mapbox.com https://api.mapbox.com https://events.mapbox.com; \
              script-src 'self' 'unsafe-inline' 'unsafe-eval' http: https:;",
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Permissions-Policy',
            // Prevent XSS attacks. The following line disallows access
            // to camera, geolocation, and microphone.
            value: 'camera=(), geolocation=(), microphone=()',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  // Recommended by Next.js documentation to export as standalone
  // for Docker projects. However, I commented this out because better-sqlite3
  // seems to be unable to create an SQLite file at all if used with standalone.
  // Normally, for Docker projects, I would use standalone to minimize Docker
  // image size, but this will be an exception since SQLite is necessary.
  // Source:
  //   https://github.com/vercel/next.js/tree/canary/examples/with-docker#in-existing-projects
  // output: 'standalone',
};

export default nextConfig;
