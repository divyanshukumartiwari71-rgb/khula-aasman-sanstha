import React from 'react';
import { Calendar, User, ArrowRight, Quote } from 'lucide-react';
import { getSuccessStories } from '@/lib/db';
import { IMAGES } from '@/lib/images';


export const metadata = {
  title: "Success Impact Stories | Real Life Changes",
  description: "Read real stories of children joining school, women starting micro-tailoring shops, and rural development in Varanasi slums through Khula Aasman Sanstha.",
};

export const revalidate = 60;

export default async function SuccessStoriesPage() {
  const stories = await getSuccessStories();

  return (
    <div className="bg-white min-h-screen">
      {/* Header Banner */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-900 pt-60">
        <div
  className="absolute inset-0 bg-cover bg-no-repeat bg-[position:center_40%]"
  style={{
    backgroundImage: `url(${IMAGES.pageHero.successStories})`,
  }}
/>

<div className="absolute inset-0 bg-black/55" />
        <div className="absolute right-0 top-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-0 bottom-0 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[#F97316] font-bold text-xs uppercase tracking-widest bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/25">
            Changing Lives
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mt-4">
            Stories of Hope & Transformation
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mt-4 leading-relaxed">
            Every story reflects the journey of individuals and families whose lives have been transformed through education, empowerment, healthcare, and community support.
          </p>
        </div>
      </section>

      {/* Stories Listing */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {stories.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            No success stories recorded yet. Check back soon!
          </div>
        ) : (
          <div className="space-y-24">
            {stories.map((story) => (
              <article
                key={story.id}
                id={story.slug}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start scroll-mt-28"
              >
                {/* Story Image */}
                <div className="md:col-span-5">
                  <div className="h-64 sm:h-80 rounded-2xl overflow-hidden shadow-xl border border-slate-100 bg-slate-50 relative">
                    <img
                      src={story.image_url}
                      alt={story.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </div>

                {/* Story Text */}
                <div className="md:col-span-7 space-y-4">
                  <div className="flex items-center gap-4 text-xs font-semibold text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-orange-500" />
                      {new Date(story.created_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-200"></span>
                    <span className="uppercase text-[#F97316]">Program:: {story.category}</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                    {story.title}
                  </h2>
                  
                  <p className="text-slate-500 font-bold text-sm leading-relaxed">
                    {story.summary}
                  </p>

                  <div className="text-slate-600 text-sm leading-relaxed whitespace-pre-line space-y-4 border-l-4 border-blue-500 pl-4 py-1">
                    {story.content}
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl text-xs text-slate-500 flex items-center gap-2 mt-6">
                    <Quote className="w-4 h-4 text-blue-500 fill-blue-100 flex-shrink-0" />
                    <span>
                      Every transformed life inspires us to continue our mission. Together, we can create many more stories of hope and opportunity.
                      </span>  
                      </div>               
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
