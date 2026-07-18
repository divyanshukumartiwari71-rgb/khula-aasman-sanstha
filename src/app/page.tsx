import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Award, Heart, Calendar, Sparkles, ShieldCheck, HelpCircle } from 'lucide-react';
import { getHomepageContent, getPrograms, getSuccessStories, getPartners, getTestimonials } from '@/lib/db';
import { IMPACT_STATS } from '@/data/stats';
import { HOME_CONTENT } from '@/data/home';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function HomePage() {
  // Fetch dynamic content (with fallback built-in)
  const homeData = await getHomepageContent();
  const programs = await getPrograms();
  const successStories = await getSuccessStories();
  const partners = await getPartners();
  const testimonials = await getTestimonials();

  // Highlight 3 programs for the homepage grid
  const featuredPrograms = programs.slice(0, 3);
  const latestActivities = successStories.slice(0, 2);


  return (
    <div className="relative">
      {/* 1. Full Screen Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-900 pt-20">
       
  {/* Background Image */}
<div
  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage: `url(${homeData.heroImage || HOME_CONTENT.hero.bgImage})`,
  }}
/>

{/* Dark Overlay */}
<div className="absolute inset-0 bg-black/35" />

        
        
        {/* Decorative Glowing Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white py-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs sm:text-sm font-semibold mb-6 animate-fade-in">
            <Sparkles className="w-4 h-4 text-orange-400 fill-orange-400" />
            Registered NGO in Varanasi, India
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight max-w-5xl mx-auto mb-6 bg-gradient-to-r from-white via-white to-blue-200 bg-clip-text text-transparent">
            {homeData.heroTitle || HOME_CONTENT.hero.title}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            {homeData.heroSubtitle || HOME_CONTENT.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              href="/donate"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-base shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <Heart className="w-5 h-5 fill-white" />
              {HOME_CONTENT.hero.ctaPrimary}
            </Link>
            <Link
              href="/volunteer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-white/80 hover:border-white bg-white/10 hover:bg-white/20 text-white font-bold text-base transition-all duration-300 hover:scale-105 active:scale-95"
            >
              {HOME_CONTENT.hero.ctaSecondary}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Our Impact Stats Section */}
      <section className="relative -mt-16 z-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl border border-slate-100 p-8 sm:p-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 lg:divide-x divide-slate-100">
            {IMPACT_STATS.map((stat, idx) => {
              // Map database fields if available
              let val = stat.value;
              if (homeData.stats) {
                if (idx === 0) val = homeData.stats.childrenEducated;
                if (idx === 1) val = homeData.stats.womenEmpowered;
                if (idx === 2) val = homeData.stats.mealsServed;
                if (idx === 3) val = homeData.stats.volunteersCount;
              }
              return (
                <div key={stat.label} className={`text-center ${idx > 0 ? 'sm:pt-0 pt-6 sm:pl-0 lg:pl-6' : ''}`}>
                  <span className="block text-4xl sm:text-5xl font-extrabold text-blue-700 mb-2">
                    {val}
                  </span>
                  <span className="block text-sm font-bold text-slate-800 uppercase tracking-wider">
                    {stat.label}
                  </span>
                  <span className="block text-xs text-slate-400 mt-2 max-w-[200px] mx-auto">
                    {stat.description}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Mission & Vision */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
            {/* Mission Box */}
            <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-md border border-slate-100 flex flex-col justify-between hover:shadow-xl transition-all duration-300">
              <div>
                <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase">
                  Our Mission
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-4 mb-4">Uplifting Varanasi Slums & Rural Communities</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {homeData.mission || HOME_CONTENT.aboutPreview.description}
                </p>
              </div>
              <div className="flex items-center gap-3 pt-6 border-t border-slate-100 mt-8 text-blue-700 font-semibold text-xs uppercase">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                Dedicated Grassroot Operations
              </div>
            </div>

            {/* Vision Box */}
            <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-md border border-slate-100 flex flex-col justify-between hover:shadow-xl transition-all duration-300">
              <div>
                <span className="bg-orange-100 text-orange-800 text-xs font-bold px-3 py-1 rounded-full uppercase">
                  Our Vision
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-4 mb-4">An Equal Sky of Opportunities</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {homeData.vision || HOME_CONTENT.aboutPreview.description}
                </p>
              </div>
              <div className="flex items-center gap-3 pt-6 border-t border-slate-100 mt-8 text-orange-700 font-semibold text-xs uppercase">
                <Award className="w-5 h-5 text-orange-500" />
                Empowering Individuals to Fly High
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Featured Programs */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#F97316] font-bold text-xs uppercase tracking-widest">Our Programs</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mt-2 mb-4">Core Pillars of Social Development</h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              We execute targeted interventions across child education, women skilling, basic meals, sanitation, environment, and sports.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPrograms.map((program) => (
              <div key={program.id} className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden flex flex-col justify-between hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl">
                <div>
                  <div className="h-52 overflow-hidden relative">
                    <img
                      src={program.banner_image}
                      alt={program.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 bg-blue-600 text-white font-bold text-xs px-3 py-1 rounded-full shadow-md">
                      Pillar
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{program.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">
                      {program.description}
                    </p>
                  </div>
                </div>
                <div className="p-6 pt-0 border-t border-slate-50 mt-4">
                  <Link
                    href={`/programs#${program.slug}`}
                    className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 text-sm font-bold mt-4"
                  >
                    Read Detailed Plan
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/programs"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-blue-600 text-blue-700 hover:bg-blue-50 font-bold text-sm transition-colors"
            >
              View All 6 Program Pillars
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Why Choose Us */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[#F97316] font-bold text-xs uppercase tracking-widest">
                Our Strengths
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 mb-6">
                {HOME_CONTENT.whyChooseUs.title}
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed mb-8">
                {HOME_CONTENT.whyChooseUs.subtitle}
              </p>
              
              <div className="space-y-6">
                {HOME_CONTENT.whyChooseUs.features.map((feature, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0">
                      {index === 0 ? <Heart className="w-4 h-4" /> : index === 1 ? <ShieldCheck className="w-4 h-4" /> : index === 2 ? <Award className="w-4 h-4" /> : <HelpCircle className="w-4 h-4" />}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-base">{feature.title}</h4>
                      <p className="text-slate-500 text-xs mt-1 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Graphic Representation */}
            <div className="bg-gradient-to-tr from-blue-700 to-indigo-900 rounded-3xl shadow-xl p-8 sm:p-12 text-white relative overflow-hidden">
              <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl" />
              <h3 className="text-2xl font-bold mb-4">Empowerment Timeline</h3>
              <p className="text-indigo-200 text-sm leading-relaxed mb-6">
                Since our registration in Varanasi, we have transitioned from a single evening tuition tree-classroom to a fully-functioning multi-facility NGO.
              </p>
              <div className="space-y-4 text-xs">
                <div className="flex gap-3 items-center">
                  <span className="bg-orange-500 px-2 py-0.5 rounded font-bold">2018</span>
                  <span>TUITION TREE-CLASS (15 kids)</span>
                </div>
                <div className="w-0.5 h-4 bg-indigo-500 ml-4"></div>
                <div className="flex gap-3 items-center">
                  <span className="bg-indigo-700 border border-indigo-500 px-2 py-0.5 rounded font-bold">2020</span>
                  <span>WOMEN SEWING CENTER</span>
                </div>
                <div className="w-0.5 h-4 bg-indigo-500 ml-4"></div>
                <div className="flex gap-3 items-center">
                  <span className="bg-indigo-700 border border-indigo-500 px-2 py-0.5 rounded font-bold">2022</span>
                  <span>DAILY SLUM MEAL NETWORK</span>
                </div>
                <div className="w-0.5 h-4 bg-indigo-500 ml-4"></div>
                <div className="flex gap-3 items-center">
                  <span className="bg-orange-500 px-2 py-0.5 rounded font-bold">2026</span>
                  <span>1,200+ STUDENTS & DIGITAL HUB</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Success Stories / Activities */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12">
            <div>
              <span className="text-[#F97316] font-bold text-xs uppercase tracking-widest">Our Success</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mt-2">Latest Activities & Success Stories</h2>
            </div>
            <Link
              href="/success-stories"
              className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 text-sm font-bold mt-4 sm:mt-0 hover:underline"
            >
              View All Impact Stories
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {latestActivities.map((story) => (
              <div key={story.id} className="bg-slate-50 rounded-2xl overflow-hidden shadow-md border border-slate-100 flex flex-col md:flex-row hover:shadow-xl transition-all duration-300">
                <div className="md:w-2/5 h-48 md:h-auto relative">
                  <img
                    src={story.image_url}
                    alt={story.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 md:w-3/5 flex flex-col justify-between">
                  <div>
                    <span className="text-xs text-blue-600 font-bold uppercase tracking-wider flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(story.created_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'short' })}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mt-2 mb-2 leading-snug">{story.title}</h3>
                    <p className="text-slate-500 text-xs leading-relaxed line-clamp-3">{story.summary}</p>
                  </div>
                  <Link
                    href={`/success-stories#${story.slug}`}
                    className="text-blue-600 hover:text-blue-800 text-xs font-bold mt-4 inline-flex items-center gap-1"
                  >
                    Read Full Story
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Testimonials */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#F97316] font-bold text-xs uppercase tracking-widest">Testimonials</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mt-2 mb-4">Voices of Varanasi Beneficiaries</h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              Read how our volunteers, students, and donors view their association with Khula Aasman Sanstha.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-md border border-slate-100 flex flex-col justify-between relative hover:shadow-lg transition-shadow">
                <div className="text-slate-500 text-sm italic leading-relaxed mb-6">
                  &ldquo;{t.quote}&rdquo;
                </div>
                <div className="flex items-center gap-3 border-t border-slate-50 pt-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 flex-shrink-0">
                    <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">{t.name}</h4>
                    <span className="text-slate-400 text-[10px] uppercase font-semibold">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Partners */}
      <section className="py-12 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 opacity-85">
            <span className="font-bold text-xs uppercase text-slate-400 tracking-wider flex-shrink-0">Supported By & Partners:</span>
            <div className="grid grid-cols-2 md:flex md:flex-wrap items-center justify-center gap-8 md:gap-12 w-full">
              {partners.map((partner, index) => (
                <div key={index} className="flex justify-center items-center h-12 bg-slate-50 rounded-lg px-4 border border-slate-100 flex-shrink-0">
                  <span className="text-slate-500 font-bold text-xs tracking-tight uppercase">{partner.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 9. Dual CTAs (Donate & Volunteer) */}
      <section className="bg-slate-900 text-white relative overflow-hidden">
        {/* Glow background */}
        <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-0 bottom-0 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 divide-y md:divide-y-0 md:divide-x divide-slate-800">
            {/* Volunteer CTA */}
            <div className="flex flex-col justify-between items-start pb-8 md:pb-0 md:pr-8">
              <div>
                <span className="text-orange-500 font-bold text-xs uppercase tracking-wider">{HOME_CONTENT.volunteerCta.buttonText}</span>
                <h3 className="text-2xl sm:text-3xl font-extrabold mt-3 mb-4">{HOME_CONTENT.volunteerCta.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {HOME_CONTENT.volunteerCta.description}
                </p>
              </div>
              <Link
                href="/volunteer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm transition-colors"
              >
                Apply As Volunteer
                <ArrowRight className="w-4 h-4 text-orange-500" />
              </Link>
            </div>

            {/* Donation CTA */}
            <div className="flex flex-col justify-between items-start pt-8 md:pt-0 md:pl-12">
              <div>
                <span className="text-blue-500 font-bold text-xs uppercase tracking-wider">{HOME_CONTENT.donationCta.buttonText}</span>
                <h3 className="text-2xl sm:text-3xl font-extrabold mt-3 mb-4">{HOME_CONTENT.donationCta.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {HOME_CONTENT.donationCta.description}
                </p>
              </div>
              <Link
                href="/donate"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm transition-colors"
              >
                Sponsor Online
                <Heart className="w-4 h-4 fill-white" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
