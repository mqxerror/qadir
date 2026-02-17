import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@qadir/shared-types', '@qadir/ui'],
  output: 'standalone',
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async rewrites() {
    const apiUrl = process.env.INTERNAL_API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';
    // Strip /api/v1 suffix to get base URL for rewrite destination
    const apiBase = apiUrl.replace(/\/api\/v1\/?$/, '');
    return [
      {
        source: '/api/v1/:path*',
        destination: `${apiBase}/api/v1/:path*`,
      },
    ];
  },
};

export default nextConfig;
