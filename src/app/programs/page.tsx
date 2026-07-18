import React from 'react';
import Link from 'next/link';
import { Heart, UserCheck, CheckCircle2, ChevronRight, HelpCircle } from 'lucide-react';
import { getPrograms } from '@/lib/db';
import { IMAGES } from '@/lib/images';

export const metadata = {
  title: "Our Programs | Education, Empowerment, Nutrition & Development",
  description: "Explore the 6 core development pillars of Khula Aasman Sanstha: Child Education, Women Empowerment, Nutrition, Rural Development, Forestry, and Sports.",
};

export default async function ProgramsPage() {
  const programs = await getPrograms();
  console.log(programs);

  return (
    <div className="bg-white">
      {/* 1. Header Banner */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-900 pt-20">
        <div
  className="absolute inset-0 bg-cover bg-top bg-no-repeat"
  style={{
    backgroundImage: `url(${IMAGES.pageHero.programs})`,
    
  }}
/>

<div className="absolute inset-0 bg-black/55" />
        {/* Abstract background graphics */}
        <div className="absolute right-0 top-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute left-0 bottom-0 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[#F97316] font-bold text-xs uppercase tracking-widest bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/25">
            Our Focus Areas
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mt-4">
            Creating Sustainable Change Through Six Core Programs
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mt-4 leading-relaxed">
            Our programs are designed to educate children, empower women, improve nutrition, protect the environment, and build stronger communities across Varanasi.
          </p>
        </div>
      </section>

      {/* 2. Program Navigation Index */}
      <section className="bg-slate-50 border-b border-slate-100 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {programs.map((program) => (
              <a
                key={program.id}
                href={`#program-${program.id}`}
                className="bg-white text-slate-700 hover:text-blue-700 border border-slate-200 hover:border-blue-300 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-sm transition-all"
              >
                {program.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Detailed Program Sections */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
          {programs.map((program, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={program.id}
                id={`program-${program.id}`}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-start scroll-mt-28 ${
                  isEven ? '' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Column A: Banner & Mini Gallery */}
                <div className={`lg:col-span-5 space-y-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="h-64 sm:h-80 rounded-2xl overflow-hidden shadow-xl border border-slate-100 bg-slate-100 relative">
                    <img
                      src={program.banner_image}
                      alt={program.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  
                  {/* Mini Gallery Section */}
                  
                </div>

                {/* Column B: Description & CTA */}
                <div className={`lg:col-span-7 space-y-6 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div>
                    <span className="text-[#F97316] font-bold text-xs uppercase tracking-widest">Pillar 0{index + 1}</span>
                    <h2 className="text-3xl font-extrabold text-slate-950 mt-1">{program.title}</h2>
                  </div>
                  
                  {/* Parse lines / formatting in read_more_content */}
                  <div className="text-slate-600 text-sm leading-relaxed whitespace-pre-line sm:text-base space-y-4">
                    {program.description}
                  </div>

                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="flex gap-3 items-start">
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <HelpCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">Be a Part of This Mission</h4>
                        <p className="text-slate-500 text-xs mt-1 leading-relaxed max-w-sm">
                          Your support can help provide education, healthcare, nutrition, training, and opportunities to those who need them most.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2 w-full sm:w-auto">
                      <Link
                        href="/donate"
                        className="flex-grow sm:flex-grow-0 inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-colors"
                      >
                        <Heart className="w-3.5 h-3.5 fill-white" />
                        Donate
                      </Link>
                      <Link
                        href="/volunteer"
                        className="flex-grow sm:flex-grow-0 inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors"
                      >
                        <UserCheck className="w-3.5 h-3.5" />
                        Volunteer
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
