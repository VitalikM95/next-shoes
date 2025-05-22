/** @type {import('next').NextConfig} */

import { EventEmitter } from 'events'
EventEmitter.defaultMaxListeners = 20

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
      },
    ],
  },
  reactStrictMode: false,
  swcMinify: true,
  transpilePackages: ['@shadcn/ui', 'vaul', 'embla-carousel-react'],
  modularizeImports: {
    'lucide-react': {
      transform: 'lucide-react/dist/esm/icons/{{ kebabCase member }}',
    },
  },
  experimental: {
    appDir: true,
  },
  webpack: (config, { isServer, dev }) => {
    if (dev) {
      config.optimization = {
        ...config.optimization,
        nodeEnv: 'development',
      }
    }
    return config
  },
}

export default nextConfig
