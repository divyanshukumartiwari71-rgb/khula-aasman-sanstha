'use client';

import React, { useState, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { GalleryItem, GALLERY_CATEGORIES } from '@/data/gallery';

interface GalleryGridProps {
  initialItems: GalleryItem[];
}

export default function GalleryGrid({ initialItems }: GalleryGridProps) {
  const [items, setItems] = useState<GalleryItem[]>(initialItems);
  const [prevInitialItems, setPrevInitialItems] = useState<GalleryItem[]>(initialItems);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Sync props to state using derived state
  if (initialItems !== prevInitialItems) {
    setItems(initialItems);
    setPrevInitialItems(initialItems);
  }

  const filteredItems = activeCategory === 'all'
    ? items
    : items.filter(item => item.category === activeCategory);

  const openLightbox = (url: string) => {
    // Find index in the *filtered* list to make next/prev navigation intuitive
    const idx = filteredItems.findIndex(item => item.url === url);
    if (idx !== -1) {
      setLightboxIndex(idx);
    }
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev !== null ? (prev + 1) % filteredItems.length : null));
    }
  }, [lightboxIndex, filteredItems.length]);

  const prevImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : null));
    }
  }, [lightboxIndex, filteredItems.length]);

  // Keyboard navigation for lightbox
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, nextImage, prevImage]);


  return (
    <div className="pt-5 space-y-8">
      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2">
        {GALLERY_CATEGORIES.map(category => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all shadow-sm cursor-pointer border ${
              activeCategory === category.id
                ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Grid Layout */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-20 text-slate-400 text-sm">
          No images uploaded in this category yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id || idx}
              onClick={() => openLightbox(item.url || item.image_url || "")}
              className="group bg-slate-50 rounded-2xl overflow-hidden shadow-md border border-slate-100 aspect-[4/3] relative cursor-pointer hover:shadow-xl transition-all duration-300"
            >
              <img
                src={item.url || item.image_url}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                <span className="text-[10px] text-orange-400 font-bold uppercase tracking-wider">
                  {GALLERY_CATEGORIES.find(c => c.id === item.category)?.label || item.category}
                </span>
                <h3 className="font-bold text-base mt-1 line-clamp-1">{item.title}</h3>
                {item.caption && <p className="text-xs text-slate-300 mt-1 line-clamp-1">{item.caption}</p>}
                
                <div className="absolute top-4 right-4 bg-white/20 p-2 rounded-full backdrop-blur-sm">
                  <Maximize2 className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div
          onClick={closeLightbox}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 select-none"
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Left Navigation */}
          <button
            onClick={prevImage}
            className="absolute left-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all cursor-pointer hidden sm:block"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Image Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl max-h-[80vh] w-full flex flex-col items-center justify-center"
          >
            <img
              src={filteredItems[lightboxIndex].url || filteredItems[lightboxIndex].image_url}
              alt={filteredItems[lightboxIndex].title}
              className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl"
            />
            {/* Title / Caption banner */}
            <div className="text-center text-white mt-4 max-w-xl">
              <span className="text-xs text-orange-400 font-bold uppercase tracking-wider">
                {GALLERY_CATEGORIES.find(c => c.id === filteredItems[lightboxIndex].category)?.label || filteredItems[lightboxIndex].category}
              </span>
              <h3 className="font-bold text-lg sm:text-xl mt-1">{filteredItems[lightboxIndex].title}</h3>
              {filteredItems[lightboxIndex].caption && (
                <p className="text-slate-400 text-xs sm:text-sm mt-1">{filteredItems[lightboxIndex].caption}</p>
              )}
            </div>
          </div>

          {/* Right Navigation */}
          <button
            onClick={nextImage}
            className="absolute right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all cursor-pointer hidden sm:block"
            aria-label="Next Image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Mobile Tap areas */}
          <div className="absolute inset-x-0 bottom-6 flex justify-center gap-6 sm:hidden">
            <button
              onClick={prevImage}
              className="p-3 rounded-full bg-white/10 text-white cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="p-3 rounded-full bg-white/10 text-white cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
