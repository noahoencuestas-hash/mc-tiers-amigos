/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'minecraft.wiki',
      },
      {
        protocol: 'https',
        hostname: 'mc-heads.net',
      },
    ],
  },
}

export default nextConfig
