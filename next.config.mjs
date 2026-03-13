/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Enable optimization so hero/LCP image is served at display size (saves ~119 KiB on mobile)
    unoptimized: false,
  },
  trailingSlash: false,
  async rewrites() {
    return [
      // Google (and many tools) request /favicon.ico at the root; serve our favicon there
      { source: "/favicon.ico", destination: "/images/favicon/favicon.ico" },
    ];
  },
};

export default nextConfig;
