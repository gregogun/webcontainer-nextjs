/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  trailingSlash: true,
  images: {
    domains: ["arweave.net"],
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "require-corp",
          },
          {
            key: "Cross-Origin-Resource-Policy",
            value: "same-site",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
