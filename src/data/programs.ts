import { IMAGES } from '@/lib/images';

export interface ProgramItem {
  id: string;
  slug: string;
  title: string;
  banner_image: string;
  description: string;
  gallery_images: string[];
  read_more_content: string;
}

export const FALLBACK_PROGRAMS: ProgramItem[] = [
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
];
