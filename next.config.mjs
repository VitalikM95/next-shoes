/** @type {import('next').NextConfig} */

// Збільшуємо ліміт слухачів подій для вирішення попередження EventEmitter
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
  webpack: (config, { isServer, dev }) => {
    // Додаткові оптимізації для EventEmitter
    if (dev) {
      // Увімкнення відстеження витоків пам'яті в режимі розробки
      config.optimization = {
        ...config.optimization,
        nodeEnv: 'development',
      }
    }
    return config
  },
}

export default nextConfig
