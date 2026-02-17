import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://qadir.com';
  return [
    { url: base, lastModified: new Date(), priority: 1.0 },
    { url: `${base}/about`, lastModified: new Date(), priority: 0.8 },
    { url: `${base}/collection`, lastModified: new Date(), priority: 0.9 },
    { url: `${base}/collection/asl`, lastModified: new Date(), priority: 0.8 },
    { url: `${base}/collection/noor`, lastModified: new Date(), priority: 0.8 },
    { url: `${base}/collection/hayba`, lastModified: new Date(), priority: 0.8 },
    { url: `${base}/collection/miqdar`, lastModified: new Date(), priority: 0.8 },
    { url: `${base}/appointments`, lastModified: new Date(), priority: 0.7 },
    { url: `${base}/private`, lastModified: new Date(), priority: 0.7 },
    { url: `${base}/contact`, lastModified: new Date(), priority: 0.7 },
  ];
}
