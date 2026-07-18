import React from 'react';
import GalleryGrid from '@/components/GalleryGrid';
import { getGallery } from '@/lib/db';
import { IMAGES } from '@/lib/images';

export const metadata = {
  title: "Photo Gallery | Grassroot Action in Varanasi",
  description: "Browse photographs of our educational bridge classes, women vocational tailoring training, environment plantations, and slum food distribution in Varanasi.",
};

export const revalidate = 60; // Revalidate every 60 seconds

export default async function GalleryPage() {
  const galleryItems = await getGallery();

  return (
    <div className="bg-white min-h-screen">
      {/* Header Banner */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-200 pt-20 pb-4">
        <div
  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage: "url('/images/header-images/hero-gallery.jpg')",
  }}
/>

<div className="absolute inset-0 bg-black/25" />
        <div className="absolute right-0 top-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-0 bottom-0 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col justify-start pt-28">
          <span className="inline-block self-center text-[#F97316] font-bold text-xs uppercase tracking-widest bg-orange-500/15 px-4 py-2 rounded-full border border-orange-500/30 mb-10">
            Our Gallery
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mt-6">
            Moments of Transformation
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mt-4 leading-relaxed">
            Visual glimpses of our daily work, workshops, distribution camps, and clean campaigns in Varanasi.
          </p>
        </div>
      </section>

      {/* Interactive Gallery Section */}
      <section className="-mt-25 relative z-25 bg-white rounded-t-3xl w-full">
        <GalleryGrid initialItems={galleryItems} />
      </section>
    </div>
  );
}
