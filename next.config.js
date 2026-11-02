/** @type {import('next').NextConfig} */
const nextConfig = {
  // Hostinger: Static HTML export
  output: 'export',

  // Disable Next.js Image Optimization server requirement
  images: {
    unoptimized: true,
  },

  webpack: (config, { dev }) => {
    if (dev) config.cache = false
    return config
  },
}
module.exports = nextConfig
