import LeadershipSection from '@/components/about/LeadershipSection';
import React from 'react';
import { Award, Compass, Heart, Users, Calendar } from 'lucide-react';
import { getTeamMembers } from '@/lib/db';
import { ABOUT_CONTENT } from '@/data/about';
import TeamSection from '@/components/about/TeamSection';

export const metadata = {
  title: "About Us | Our Story, Founder & Values",
  description: "Learn about the origins of Khula Aasman Sanstha in Varanasi, our founder Dr. Devendra Kumar, our core values, and our board team.",
};

export default async function AboutPage() {
  const teamMembers = await getTeamMembers();

  return (
    <div className="bg-white">
      {/* 1. Header Banner */}
      <section className="relative text-white py-28 sm:py-36 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-500 opacity-100"style={{ backgroundImage: "url('/images/about/hero-image.jpg')" }}/>
        <div className="absolute inset-0 bg-black/25" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[#F97316] font-bold text-xs uppercase tracking-widest bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/25">
            About Khula Aasman Sanstha
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mt-4">
            Building Hope, Creating Opportunities
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mt-4 leading-relaxed">
            Spreading wings of hope and self-reliance to children and women across the slums and villages of Varanasi.
          </p>
        </div>
      </section>

      {/* 2. Detailed Story Narrative */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-slate-950 mb-8 border-b-2 border-orange-500 pb-3 inline-block">
            {ABOUT_CONTENT.story.title}
          </h2>
          <div className="space-y-6 text-slate-600 text-sm leading-relaxed sm:text-base">
            {ABOUT_CONTENT.story.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </div>
      </section>
     {/* 3. Meet Our Leadership */}
<LeadershipSection />

<TeamSection />

{/* Timeline */}
<section className="py-24 bg-white">
  <div className="max-w-6xl mx-auto px-6">

    <div className="text-center mb-20">
      <span className="uppercase tracking-[0.3em] text-orange-500 font-semibold">
        Our Journey
      </span>

      <h2 className="text-4xl font-bold text-slate-900 mt-4">
        Timeline of Growth
      </h2>

      <p className="text-slate-600 max-w-2xl mx-auto mt-5">
        Every milestone reflects our commitment to creating lasting impact in
        education, women empowerment and community development.
      </p>
    </div>

    <div className="relative">

      {/* Vertical Line */}
      <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 bg-orange-100 -translate-x-1/2"></div>

      <div className="space-y-16">

        {ABOUT_CONTENT.timeline.map((item, index) => (
          <div
            key={index}
            className={`relative flex flex-col md:flex-row items-center ${
              index % 2 === 0 ? "" : "md:flex-row-reverse"
            }`}
          >

            {/* Content */}
            <div className="w-full md:w-1/2 px-6 relative z-10">
              <div className="bg-slate-50 rounded-3xl p-8 shadow-lg border border-slate-100">

                <span className="text-orange-500 font-bold text-sm">
                  {item.year}
                </span>

                <h3 className="text-2xl font-bold text-slate-900 mt-2">
                  {item.title}
                </h3>

                <p className="text-slate-600 mt-4 leading-7">
                  {item.description}
                </p>

              </div>
            </div>

            {/* Circle */}
            <div className="absolute left-6 md:left-1/2 w-5 h-5 rounded-full bg-orange-500 border-4 border-white shadow-lg -translate-x-1/2"></div>

            {/* Empty side */}
            <div className="hidden md:block md:w-1/2"></div>

          </div>
        ))}

      </div>

    </div>

  </div>
</section>
      
      {/* 4. Core Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#F97316] font-bold text-xs uppercase tracking-widest">Our DNA</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mt-2 mb-4">Core Principles We Live By</h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              Every coin spent and every workshop taught is grounded in these foundational philosophies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {ABOUT_CONTENT.values.map((v, index) => (
              <div key={index} className="bg-slate-50 p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-all duration-300">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
                    {index === 0 ? <ShieldCheckIcon /> : index === 1 ? <AwardIcon /> : index === 2 ? <UsersIcon /> : <CompassIcon />}
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-base mb-3">{v.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{v.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// Inline icons for cleaner dependency
function ShieldCheckIcon() {
  return <Heart className="w-5 h-5" />;
}
function AwardIcon() {
  return <Award className="w-5 h-5" />;
}
function UsersIcon() {
  return <Users className="w-5 h-5" />;
}
function CompassIcon() {
  return <Compass className="w-5 h-5" />;
}
