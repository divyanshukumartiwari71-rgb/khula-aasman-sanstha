import { IMAGES } from '@/lib/images';

export interface GalleryItem {
  id: string;
  url: string;
  image_url?: string;
  title: string;
  category: string;
  caption?: string;
  created_at?: string;
}

export const GALLERY_CATEGORIES = [
  { id: 'all', label: 'All Photos' },
  { id: 'education', label: 'Education' },
  { id: 'women', label: 'Women Empowerment' },
  { id: 'nutrition', label: 'Meals & Nutrition' },
  { id: 'rural-development', label: 'Rural Development' },
  { id: 'environment', label: 'Environment' },
  { id: 'sports', label: 'Sports & Skills' },
  { id: 'outreach', label: 'Community Outreach' },
  { id: 'events', label: 'Events' }
];

export const FALLBACK_GALLERY: GalleryItem[] = IMAGES.gallery;
