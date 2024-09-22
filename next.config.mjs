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
              "default-src 'none'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; connect-src 'self'; img-src 'self'; style-src 'self' 'unsafe-inline'; font-src 'self' https://fonts.googleapis.com; worker-src 'self'; base-uri 'self'; form-action 'self'; manifest-src 'self'; object-src 'self';",
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
  // for Docker projects.
  // Source:
  //   https://github.com/vercel/next.js/tree/canary/examples/with-docker#in-existing-projects
  output: 'standalone',
};

export default nextConfig;
