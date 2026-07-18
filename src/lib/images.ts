export function getImagePath(category: string, filename: string): string {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const storageBucket = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || 'khula-aasman';
  const useSupabase = process.env.NEXT_PUBLIC_USE_SUPABASE_STORAGE === 'true';

  if (supabaseUrl && useSupabase) {
    return `${supabaseUrl.replace(/\/$/, '')}/storage/v1/object/public/${storageBucket}/${category}/${filename}`;
  }

  // Fallback to local public/images folder
  return `/images/${category}/${filename}`;
}

export const IMAGES = {
  logo: {
    primary: getImagePath('logo', 'logo.svg'),
    dark: getImagePath('logo', 'logo-dark.svg'),
  },
  hero: {
  bg: getImagePath('hero', 'heroimage.png'),
},
pageHero: {
  about: getImagePath('about', 'aboutimage.jpg'),
  programs: getImagePath('header-images', 'hero-programs.jpg'),
  gallery: getImagePath('header-images', 'hero-gallery.jpg'),
  successStories: getImagePath('header-images', 'hero-success-stories.jpg'),
  volunteer: getImagePath('header-images', 'hero-volunteer.jpg'),
  donate: getImagePath('header-images', 'hero-donate.jpg'),
  contact: getImagePath('header-images', 'hero-contact.jpg'),
},
  founder: {
    profile: getImagePath('founder', 'founder.svg'),
  },
  programs: {
    education: getImagePath('programs', 'child-education.svg'),
    women: getImagePath('programs', 'women-empowerment.svg'),
    meals: getImagePath('programs', 'meals-nutrition.svg'),
    rural: getImagePath('programs', 'rural-development.svg'),
    environment: getImagePath('programs', 'environment.svg'),
    sports: getImagePath('programs', 'sports-skills.svg'),
  },
  gallery: [
    { id: '1', url: getImagePath('gallery', 'gallery-1.svg'), title: 'Learning Center Activities', category: 'education' },
    { id: '2', url: getImagePath('gallery', 'gallery-2.svg'), title: 'Vocational Training Class', category: 'women' },
    { id: '3', url: getImagePath('gallery', 'gallery-3.svg'), title: 'Nutrition Distribution Drive', category: 'meals' },
    { id: '4', url: getImagePath('gallery', 'gallery-4.svg'), title: 'Rural Community Gathering', category: 'rural' },
    { id: '5', url: getImagePath('gallery', 'gallery-5.svg'), title: 'Tree Plantation Campaign', category: 'environment' },
    { id: '6', url: getImagePath('gallery', 'gallery-6.svg'), title: 'Youth Football Tournament', category: 'sports' },
  ],
  events: {
    event1: getImagePath('events', 'event-1.svg'),
    event2: getImagePath('events', 'event-2.svg'),
  },
  volunteers: {
    hero: getImagePath('volunteers', 'volunteer-hero.svg'),
  },
  donations: {
  qr: getImagePath('donations', 'upi-qr.png'),
},
  team: [
  {
    id: '1',
    name: 'Saisa Maam',
    role: 'General Secretary',
    image: getImagePath('team', 'general-secretary.jpg')
  },
  {
    id: '2',
    name: 'Diwakar Sir',
    role: 'Program Coordinator',
    image: getImagePath('team', 'program-coordinator.jpg')
  },
  {
    id: '3',
    name: 'Utkarsh Sir',
    role: 'Community Outreach Coordinator',
    image: getImagePath('team', 'community-outreach-coordinator.jpg')
  },
  {
    id: '4',
    name: 'Ankit Sir',
    role: 'Social Media Manager',
    image: getImagePath('team', 'social-media-manager.jpg')
  },
],
  partners: [
    { name: 'Varanasi Development Trust', logo: getImagePath('partners', 'partner-1.svg') },
    { name: 'Ganga Clean Initiative', logo: getImagePath('partners', 'partner-2.svg') },
    { name: 'Kashi Education Foundation', logo: getImagePath('partners', 'partner-3.svg') },
    { name: 'India Giving Portal', logo: getImagePath('partners', 'partner-4.svg') },
  ],
  testimonials: [
    { quote: "Khula Aasman Sanstha gave me the opportunity to pursue higher secondary education when my family couldn't afford it.", name: "Suman Kumari", role: "Beneficiary (Student)", image: getImagePath('testimonials', 'avatar-1.svg') },
    { quote: "Volunteering with the meals program in Varanasi slums has been a life-changing experience for me.", name: "Rahul Gupta", role: "Volunteer", image: getImagePath('testimonials', 'avatar-2.svg') },
    { quote: "We partner with them because of their absolute transparency and direct grassroot impact in rural Varanasi.", name: "Vikram Malhotra", role: "Donor Partner", image: getImagePath('testimonials', 'avatar-3.svg') },
  ]
};
