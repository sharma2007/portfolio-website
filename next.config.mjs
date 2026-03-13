/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Enable optimization so hero/LCP image is served at display size (saves ~119 KiB on mobile)
    unoptimized: false,
  },
  trailingSlash: false,
};

export default nextConfig;
