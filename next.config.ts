/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },
  async headers() {
    return [
      {
        // Aplica headerele pentru toate rutele din aplicație
        source: "/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, max-age=0, must-revalidate", // Dezactivează complet cache-ul
          },
          {
            key: "Pragma",
            value: "no-cache", // Suport suplimentar pentru browserele mai vechi
          },
          {
            key: "Expires",
            value: "0", // Forțează expirarea imediată a resurselor
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
