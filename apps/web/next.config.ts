import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@qadir/shared-types', '@qadir/ui'],
  output: 'standalone',
  images: {
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
