import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://khulaaasmansanstha.org';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/login', '/admin/dashboard'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
