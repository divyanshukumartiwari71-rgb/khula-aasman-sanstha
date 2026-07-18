import { supabase, isSupabaseConfigured } from './supabase';
import { IMAGES } from './images';
import { GalleryItem } from '@/data/gallery';

export interface HomepageContent {
  heroTitle: string;
  heroSubtitle: string;
  mission: string;
  vision: string;
  stats: {
    childrenEducated: string;
    womenEmpowered: string;
    mealsServed: string;
    volunteersCount: string;
  };
  heroImage?: string;
  id?: string;
}

export interface ProgramItem {
  id: string;
  slug: string;
  title: string;
  banner_image: string;
  description: string;
  gallery_images: string[];
  read_more_content: string;
}

export interface Volunteer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  skills?: string;
  experience?: string;
  status: string;
  created_at: string;
}

export interface Donation {
  id: string;
  donor_name: string;
  email: string;
  phone: string;
  amount: number;
  payment_method: string;
  sponsor_child_id?: string;
  status: string;
  message?: string;
  transaction_id: string;
  proof_image?: string;

  verification_reason?: string;
  admin_note?: string;
  verified_by?: string;
  verified_at?: string;
  email_sent?: boolean;
  last_email_type?: string;
  updated_at?: string;

  created_at: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: string;
  created_at: string;
}
export interface Testimonial {
  id: string;
  name: string;
  designation: string;
  message: string;
  image_url: string;
  display_order: number;
  status: boolean;
  created_at?: string;
}
export interface SuccessStory {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  image_url: string;
  category: string;
  created_at: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio?: string;
  image: string;
  image_url?: string;
  display_order?: number;
}

export interface Partner {
  name: string;
  logo: string;
  website?: string;
}

export interface Testimonial{
  quote: string;
  name: string;
  role: string;
  image: string;
}
export interface DonationSettings {
  id?: string;
  upi_id: string;
  qr_image: string;
  account_name: string;
  bank_name: string;
  account_number: string;
  ifsc: string;
  branch: string;
  account_type: string;
  created_at?: string;
}


// Fallback in-memory database for server-side mock operations
let mockDbInitialized = false;
let mockHomepageContent: HomepageContent | null = null;
let mockPrograms: ProgramItem[] = [];
let mockGallery: GalleryItem[] = [];
let mockVolunteers: Volunteer[] = [];
let mockDonations: Donation[] = [];
let mockContacts: Contact[] = [];
let mockSuccessStories: SuccessStory[] = [];
let mockTeamMembers: TeamMember[] = [];
let mockPartners: Partner[] = [];
let mockTestimonials: Testimonial[] = [];
let mockDonationSettings: DonationSettings | null = null;

function getLocalStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function setLocalStorage(key: string, value: unknown) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to localStorage', error);
  }
}

function initMockDb() {
  if (mockDbInitialized) return;

  // 1. Homepage Content
  mockHomepageContent = getLocalStorage('kas_homepage_content', {
    heroTitle: "Empowering Underprivileged Communities in Varanasi",
    heroSubtitle: "Khula Aasman Sanstha is dedicated to uplifting lives through Child Education, Women Empowerment, Nutrition, and Sustainable Development.",
    mission: "To create an inclusive society where every child gets quality education, every woman finds self-reliance, and every community thrives in health and harmony.",
    vision: "An empowered nation where geographical, gender, and social barriers are dissolved, allowing every individual to achieve their full potential under a 'Khula Aasman' (Open Sky).",
    stats: {
      childrenEducated: "1,200+",
      womenEmpowered: "350+",
      mealsServed: "50,000+",
      volunteersCount: "150+",
    }
  });

  // 2. Programs
  mockPrograms = getLocalStorage('kas_programs', [
    {
      id: 'child-education',
      slug: 'child-education',
      title: 'Child Education',
      banner_image: IMAGES.programs.education,
      description: 'Providing primary education, bridging classes, and evening tuition centers for children in rural areas and slums of Varanasi.',
      gallery_images: [IMAGES.gallery[0].url, IMAGES.gallery[1].url],
      read_more_content: `Our Child Education Initiative targets children in marginalized communities who have dropped out of school or have never attended. We run:
      - Bridge Education Centers to prepare children for formal schooling.
      - Remedial Tuition Centers to help school-going kids cope with curriculum and reduce dropout rates.
      - Free study materials, school uniforms, and bags.
      - Computer literacy and basic programming workshops.`
    },
    {
      id: 'women-empowerment',
      slug: 'women-empowerment',
      title: 'Women Empowerment',
      banner_image: IMAGES.programs.women,
      description: 'Skill development training including sewing, stitching, handicraft making, and financial literacy workshops to ensure self-reliance.',
      gallery_images: [IMAGES.gallery[1].url, IMAGES.gallery[3].url],
      read_more_content: `We believe that empowering a woman empowers an entire family. Our centers offer:
      - Certified tailoring, embroidery, and fashion designing courses.
      - Self-Help Group (SHG) formation to promote micro-saving and community loans.
      - Adult literacy courses and awareness camps regarding women's rights and hygiene.
      - Assistance in setting up small home-based businesses.`
    },
    {
      id: 'meals-nutrition',
      slug: 'meals-nutrition',
      title: 'Meals & Nutrition',
      banner_image: IMAGES.programs.meals,
      description: 'Regular nutrition distribution drives for children, lactating mothers, and destitute elderlies in Varanasi.',
      gallery_images: [IMAGES.gallery[2].url, IMAGES.gallery[0].url],
      read_more_content: `Malnutrition is a severe barrier to education and development. Our program focuses on:
      - Daily nutritious cooked meals for children at our education centers.
      - Distribution of dry ration kits (wheat, rice, pulses, oil) to low-income families.
      - Nutritional supplements and health tonics for pregnant and lactating mothers.
      - Regular growth tracking and health checkup camps.`
    },
    {
      id: 'rural-development',
      slug: 'rural-development',
      title: 'Social & Rural Development',
      banner_image: IMAGES.programs.rural,
      description: 'Infrastructure support, sanitation drives, clean drinking water awareness, and government scheme linkage in Varanasi villages.',
      gallery_images: [IMAGES.gallery[3].url, IMAGES.gallery[4].url],
      read_more_content: `Developing the rural landscape in Varanasi through direct community interventions:
      - Building community toilets and installing handpumps for drinking water.
      - Organizing clean-up drives and educating villagers on waste segregation.
      - Linking eligible villagers with government welfare schemes (pension, healthcare cards).
      - Leadership workshops for rural youth.`
    },
    {
      id: 'environment',
      slug: 'environment',
      title: 'Environment & Forestry',
      banner_image: IMAGES.programs.environment,
      description: 'Annual tree plantation drives, water conservation workshops, and promoting solar usage in rural spaces.',
      gallery_images: [IMAGES.gallery[4].url, IMAGES.gallery[5].url],
      read_more_content: `Combating climate change and local ecological degradation in Varanasi:
      - Target to plant 5,000 saplings annually in schools, community lands, and roadsides.
      - Recharging local ponds and rain-water harvesting installations.
      - Workshops on eco-friendly agricultural practices for local farmers.
      - Creating public awareness regarding single-use plastics.`
    },
    {
      id: 'sports-skills',
      slug: 'sports-skills',
      title: 'Sports & Skill Development',
      banner_image: IMAGES.programs.sports,
      description: 'Youth leadership programs, local sports leagues, and vocational skills matching with local job opportunities.',
      gallery_images: [IMAGES.gallery[5].url, IMAGES.gallery[2].url],
      read_more_content: `Engaging youth productively through sports and skill development:
      - Training in football, athletics, and traditional sports to build discipline and physical health.
      - Soft skills, English speaking, and resume building workshops.
      - Collaborations with local Varanasi enterprises for apprenticeship programs.
      - Digital literacy coaching in remote villages.`
    }
  ]);

  // 3. Gallery
  mockGallery = getLocalStorage('kas_gallery', IMAGES.gallery);

  // 4. Success Stories
  mockSuccessStories = getLocalStorage('kas_success_stories', [
    {
      id: '1',
      slug: 'shabnam-story',
      title: 'Shabnam’s Journey to Financial Independence',
      summary: 'From a helpless housewife to running a sewing center in her village, Shabnam now supports her family.',
      content: `Shabnam lived in a small village near Varanasi. Her husband, a daily wage laborer, struggled to feed their family of five. After joining the Khula Aasman Sanstha sewing classes, Shabnam learned professional tailoring. Within six months, she secured a small loan from our self-help group and purchased a sewing machine. Today, she earns Rs. 6,000 a month, and is funding her children's education.`,
      image_url: IMAGES.programs.women,
      category: 'women',
      created_at: new Date(2026, 1, 15).toISOString()
    },
    {
      id: '2',
      slug: 'rohit-education',
      title: 'How Rohit Became the First Graduate in His Family',
      summary: 'A child from Varanasi railway slum, Rohit is now working as a junior developer.',
      content: `Rohit spent his early years picking plastic bottles at the Varanasi railway station. Identified by our street education program, he joined the bridge classes. With tutoring and financial sponsorship, Rohit completed school and went on to obtain a diploma in Computer Applications. Last month, he joined a local IT firm, bringing his family out of extreme poverty.`,
      image_url: IMAGES.programs.education,
      category: 'education',
      created_at: new Date(2026, 3, 10).toISOString()
    }
  ]);

  // 5. Team, Partners, Testimonials, Volunteers, Donations, Contacts
  mockTeamMembers = getLocalStorage('kas_team', IMAGES.team);
  mockPartners = getLocalStorage('kas_partners', IMAGES.partners);
  mockTestimonials = [] as Testimonial[];
  mockVolunteers = getLocalStorage('kas_volunteers', []);
  mockDonations = getLocalStorage('kas_donations', []);
  mockContacts = getLocalStorage('kas_contacts', []);
 
  // 6. Donation Settings
mockDonationSettings = getLocalStorage('kas_donation_settings', {
  upi_id: '',
  qr_image: '',
  account_name: '',
  bank_name: '',
  account_number: '',
  ifsc: '',
  branch: '',
  account_type: '',
});

  mockDbInitialized = true;
}

// ----------------------------------------------------
// ----------------------------------------------------
// DATABASE API EXPORTS
// ----------------------------------------------------

export async function getHomepageContent(): Promise<any> {
  if (isSupabaseConfigured()) {
    const { data, error } = await supabase
      .from("homepage")
      .select("*")
      .single();

    if (!error && data) {
      return {
        heroTitle: data.hero_title,
        heroSubtitle: data.hero_description,
        mission: data.mission,
        vision: data.vision,
        heroImage: data.hero_image,

        stats: {
          childrenEducated: "1200+",
          womenEmpowered: "200+",
          mealsServed: "15000+",
          volunteersCount: "150+",
          
        },
      };
    }
  }
  return {
        heroTitle: "",
        heroSubtitle: "",
        mission: "",
        vision: "",
        heroImage: "",

        stats: {
          childrenEducated: "",
          womenEmpowered: "",
          mealsServed: "",
          volunteersCount: ""
        }
      };

  initMockDb();

  return mockHomepageContent || {
    heroTitle: "",
    heroSubtitle: "",
    mission: "",
    vision: "",
    heroImage: "",

    stats: {
      childrenEducated: "",
      womenEmpowered: "",
      mealsServed: "",
      volunteersCount: "",
    },
  };
}

export async function updateHomepageContent(content: Partial<HomepageContent>) {
  if (isSupabaseConfigured()) {
    const { error } = await supabase.from('homepage').upsert(content);
    if (!error) return { success: true };
  }
  initMockDb();
  mockHomepageContent = { ...(mockHomepageContent || {}), ...content } as HomepageContent;
  setLocalStorage('kas_homepage_content', mockHomepageContent);
  return { success: true };
}

export async function getPrograms(): Promise<ProgramItem[]> {
  if (isSupabaseConfigured()) {
    const { data, error } = await supabase.from('programs').select('*').order('title');
    if (!error && data) return data as ProgramItem[];
  }
  initMockDb();
  return mockPrograms;
}

export async function updateProgram(id: string, updated: Partial<ProgramItem>) {
  if (isSupabaseConfigured()) {
    const { error } = await supabase.from('programs').update(updated).eq('id', id);
    if (!error) return { success: true };
  }
  initMockDb();
  mockPrograms = mockPrograms.map(p => p.id === id ? { ...p, ...updated } : p);
  setLocalStorage('kas_programs', mockPrograms);
  return { success: true };
}

export async function getGallery(): Promise<GalleryItem[]> {
  if (isSupabaseConfigured()) {
    const { data, error } = await supabase.from('gallery').select('*').order('created_at', { ascending: false });
    if (!error && data) {
      return (data as any[]).map(item => ({
        ...item,
        url: item.url || item.image_url
      })) as GalleryItem[];
    }
  }
  initMockDb();
  return mockGallery;
}

export async function addGalleryImage(image: Omit<GalleryItem, 'id' | 'created_at'>) {
  if (isSupabaseConfigured()) {
    const dbPayload = {
      title: image.title,
      category: image.category,
      caption: image.caption,
      image_url: image.image_url || image.url
    };
    const { data, error } = await supabase.from('gallery').insert([dbPayload]).select();
    if (!error && data) {
      return { 
        success: true, 
        data: {
          ...data[0],
          url: data[0].url || data[0].image_url
        } as GalleryItem 
      };
    }
  }
  initMockDb();
  const url = image.url || image.image_url || '';
  const newImg = { 
    id: Date.now().toString(), 
    title: image.title, 
    category: image.category, 
    caption: image.caption, 
    url, 
    image_url: url, 
    created_at: new Date().toISOString() 
  };
  mockGallery = [newImg, ...mockGallery];
  setLocalStorage('kas_gallery', mockGallery);
  return { success: true, data: newImg };
}

export async function deleteGalleryImage(id: string) {
  if (isSupabaseConfigured()) {
    const { error } = await supabase.from('gallery').delete().eq('id', id);
    if (!error) return { success: true };
  }
  initMockDb();
  mockGallery = mockGallery.filter(g => g.id !== id);
  setLocalStorage('kas_gallery', mockGallery);
  return { success: true };
}

export async function getVolunteers(): Promise<Volunteer[]> {
  if (isSupabaseConfigured()) {
    const { data, error } = await supabase
      .from('volunteers')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      return data.map((v: any) => ({
        id: v.id,
        name: v.full_name,
        email: v.email,
        phone: v.phone,
        address: v.address,
        skills: v.skills,
        experience: v.experience,
        status: v.status,
        created_at: v.created_at,
      }));
    }
  }

  initMockDb();
  return mockVolunteers;
}

export async function addVolunteer(volunteer: Omit<Volunteer, 'id' | 'status' | 'created_at'>) {
  if (isSupabaseConfigured()) {
    const { data, error } = await supabase
  .from('volunteers')
  .insert([
    {
      full_name: volunteer.name,
      email: volunteer.email,
      phone: volunteer.phone,
      address: volunteer.address,
      skills: volunteer.skills,
      experience: volunteer.experience,
      status: 'pending',
    },
  ])
  .select();
  
    if (error) {
  
  return { success: false, error };
}

return {
  success: true,
  data: data[0] as Volunteer,
};
  }
  initMockDb();
  const newVol = { id: Date.now().toString(), ...volunteer, status: 'pending', created_at: new Date().toISOString() };
  mockVolunteers = [newVol, ...mockVolunteers];
  setLocalStorage('kas_volunteers', mockVolunteers);
  return { success: true, data: newVol };
}

export async function updateVolunteerStatus(id: string, status: string) {
  if (isSupabaseConfigured()) {
    const { error } = await supabase.from('volunteers').update({ status }).eq('id', id);
    if (!error) return { success: true };
  }
  initMockDb();
  mockVolunteers = mockVolunteers.map(v => v.id === id ? { ...v, status } : v);
  setLocalStorage('kas_volunteers', mockVolunteers);
  return { success: true };
}

export async function getDonations(): Promise<Donation[]> {
  if (isSupabaseConfigured()) {
    const { data, error } = await supabase.from('donations').select('*').order('created_at', { ascending: false });
    if (!error && data) return data as Donation[];
  }
  initMockDb();
  return mockDonations;
}

export async function addDonation(donation: Omit<Donation, 'id' | 'status' | 'created_at'>) {
  if (isSupabaseConfigured()) {
    const { data, error } = await supabase
  .from('donations')
  .insert([donation])
  .select();



if (!error && data) {
  return { success: true, data: data[0] as Donation };
}
  }
  initMockDb();
  const newDon = { id: Date.now().toString(), ...donation, status: 'completed', created_at: new Date().toISOString() };
  mockDonations = [newDon, ...mockDonations];
  setLocalStorage('kas_donations', mockDonations);
  return { success: true, data: newDon };
}

export async function updateDonationStatus(
  id: string,
  status: string,
  verification_reason: string = '',
  admin_note: string = '',
  verified_by: string = ''
) {
  const updateData: any = {
  status,
  verification_reason,
  admin_note,
  updated_at: new Date().toISOString(),

  email_sent: true,

  last_email_type:
  status.toLowerCase() === "verified"
    ? "Donation Approved"
    : status.toLowerCase() === "pending"
    ? "Verification Required"
    : "Donation Rejected",
};

  if (status.toLowerCase() === 'verified') {
    updateData.verified_at = new Date().toISOString();
    updateData.verified_by = verified_by;
  }

  if (isSupabaseConfigured()) {
    const { error } = await supabase
      .from('donations')
      .update(updateData)
      .eq('id', id);

    if (!error) {
      return { success: true };
    }

    return { success: false, error };
  }

  initMockDb();

  mockDonations = mockDonations.map((d) =>
    d.id === id
      ? {
          ...d,
          ...updateData,
        }
      : d
  );

  setLocalStorage('kas_donations', mockDonations);

  return { success: true };
}
export async function getContacts(): Promise<Contact[]> {
  if (isSupabaseConfigured()) {
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      return data as Contact[];
    }
  }

  initMockDb();

  return mockContacts;
}

export async function updateContactStatus(
  id: string,
  status: string
) {
  if (isSupabaseConfigured()) {
    const { error } = await supabase
      .from('contacts')
      .update({ status })
      .eq('id', id);

    if (!error) {
      return { success: true };
    }

    return { success: false, error };
  }

  initMockDb();

  mockContacts = mockContacts.map((c) =>
    c.id === id ? { ...c, status } : c
  );

  setLocalStorage('kas_contacts', mockContacts);

  return { success: true };
}
export async function addContact(
  contact: Omit<Contact, 'id' | 'status' | 'created_at'>
) {
  if (isSupabaseConfigured()) {
    const { data, error } = await supabase
      .from('contacts')
      .insert([contact])
      .select();

    if (!error && data) {
      return {
        success: true,
        data: data[0] as Contact,
      };
    }

    return {
      success: false,
      error,
    };
  }

  initMockDb();

  const newContact: Contact = {
    id: Date.now().toString(),
    ...contact,
    status: 'unread',
    created_at: new Date().toISOString(),
  };

  mockContacts = [newContact, ...mockContacts];

  setLocalStorage('kas_contacts', mockContacts);

  return {
    success: true,
    data: newContact,
  };
}
export async function getSuccessStories(): Promise<SuccessStory[]> {
  if (isSupabaseConfigured()) {
    const { data, error } = await supabase.from('success_stories').select('*').order('created_at', { ascending: false });
    if (!error && data) return data as SuccessStory[];
  }
  initMockDb();
  return mockSuccessStories;
}

export async function addSuccessStory(story: Omit<SuccessStory, 'id' | 'created_at'>) {
  if (isSupabaseConfigured()) {
    const { data, error } = await supabase.from('success_stories').insert([story]).select();
    if (!error && data) return { success: true, data: data[0] as SuccessStory };
  }
  initMockDb();
  const newStory = { id: Date.now().toString(), ...story, created_at: new Date().toISOString() };
  mockSuccessStories = [newStory, ...mockSuccessStories];
  setLocalStorage('kas_success_stories', mockSuccessStories);
  return { success: true, data: newStory };
}

export async function updateSuccessStory(id: string, updated: Partial<SuccessStory>) {
  if (isSupabaseConfigured()) {
    const { error } = await supabase.from('success_stories').update(updated).eq('id', id);
    if (!error) return { success: true };
  }
  initMockDb();
  mockSuccessStories = mockSuccessStories.map(s => s.id === id ? { ...s, ...updated } : s);
  setLocalStorage('kas_success_stories', mockSuccessStories);
  return { success: true };
}

export async function deleteSuccessStory(id: string) {
  if (isSupabaseConfigured()) {
    const { error } = await supabase.from('success_stories').delete().eq('id', id);
    if (!error) return { success: true };
  }
  initMockDb();
  mockSuccessStories = mockSuccessStories.filter(s => s.id !== id);
  setLocalStorage('kas_success_stories', mockSuccessStories);
  return { success: true };
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  if (isSupabaseConfigured()) {
    const { data, error } = await supabase.from('team_members').select('*').order('display_order');
    if (!error && data) return data as TeamMember[];
  }
  initMockDb();
  return mockTeamMembers;
}

export async function getPartners(): Promise<Partner[]> {
  if (isSupabaseConfigured()) {
    const { data, error } = await supabase.from('partners').select('*').order('id');
    if (!error && data) return data as Partner[];
  }
  initMockDb();
  return mockPartners;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  if (isSupabaseConfigured()) {
    const { data, error } = await supabase.from('testimonials').select('*').order('id');
    if (!error && data) return data as Testimonial[];
  }
  initMockDb();
  return mockTestimonials;
}
export async function getDonationSettings(): Promise<DonationSettings> {
  if (isSupabaseConfigured()) {
    const { data, error } = await supabase
      .from('donation_settings')
      .select('*')
      .single();

    if (!error && data) return data as DonationSettings;
  }

  initMockDb();

  return (
    mockDonationSettings || {
      upi_id: '',
      qr_image: '',
      account_name: '',
      bank_name: '',
      account_number: '',
      ifsc: '',
      branch: '',
      account_type: '',
    }
  );
}
export async function updateDonationSettings(
  settings: Partial<DonationSettings>
) {
  if (isSupabaseConfigured()) {
    const { error } = await supabase
      .from('donation_settings')
      .update(settings)
      .eq('id', settings.id);

    if (!error) return { success: true };
  }

  initMockDb();

  mockDonationSettings = {
    ...(mockDonationSettings || {}),
    ...settings,
  } as DonationSettings;

  setLocalStorage('kas_donation_settings', mockDonationSettings);

  return { success: true };
}
export async function deleteContact(id: string) {
  if (isSupabaseConfigured()) {
    const { error } = await supabase
      .from('contacts')
      .delete()
      .eq('id', id);

    if (!error) {
      return { success: true };
    }

    return { success: false, error };
  }

  initMockDb();

  mockContacts = mockContacts.filter(contact => contact.id !== id);

  setLocalStorage('kas_contacts', mockContacts);

  return { success: true };
}
export async function getSiteBanner(page: string) {
  if (isSupabaseConfigured()) {
    const { data, error } = await supabase
      .from("site_banners")
      .select("*")
      .eq("page", page)
      .single();

    if (!error) {
      return data;
    }
  }

  return null;
}

export async function updateSiteBanner(
  page: string,
  image_url: string
) {
  if (isSupabaseConfigured()) {
    const { error } = await supabase
      .from("site_banners")
      .update({
        image_url,
        updated_at: new Date().toISOString(),
      })
      .eq("page", page);

    if (!error) {
      return { success: true };
    }

    return { success: false, error };
  }

  return { success: false };
}


