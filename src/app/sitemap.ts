import { MetadataRoute } from 'next';
import { getPrograms, getSuccessStories } from '@/lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://khulaaasmansanstha.org';

  // Static routes
  const staticRoutes = [
    '',
    '/about',
    '/programs',
    '/gallery',
    '/success-stories',
    '/volunteer',
    '/donate',
    '/contact',
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  try {
    const programs = await getPrograms();
    const programRoutes = programs.map((p) => ({
      url: `${baseUrl}/programs#${p.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

    const stories = await getSuccessStories();
    const storyRoutes = stories.map((s) => ({
      url: `${baseUrl}/success-stories#${s.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));

    return [...staticRoutes, ...programRoutes, ...storyRoutes];
  } catch (error) {
    console.error('Error compiling sitemap dynamic routes:', error);
    return staticRoutes;
  }
}
