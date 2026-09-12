import LeadershipSection from '@/components/about/LeadershipSection';
import React from 'react';
import { Award, Compass, Heart, Users } from 'lucide-react';
import { ABOUT_CONTENT } from '@/data/about';
import TeamSection from '@/components/about/TeamSection';

export const metadata = {
  title: "About Us | Our Story, Founder & Values",
  description:
    "Learn about the origins of Khula Aasman Sanstha in Varanasi, our founder Dr. Devendra Kumar, our core values, and our board team.",
};

export default function AboutPage() {
  return (
    <main className="relative bg-white text-slate-900">

      {/* =========================================================
          GLOBAL DECORATIVE BACKGROUND
      ========================================================= */}

      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">

        {/* Soft pastel circles */}
<div className="absolute -left-24 top-32 h-72 w-72 rounded-full bg-blue-100/40 blur-sm" />
<div className="absolute -right-24 top-[500px] h-80 w-80 rounded-full bg-orange-100/40 blur-sm" />

<div className="absolute left-[12%] top-[900px] h-32 w-32 rounded-full bg-orange-100/50" />
<div className="absolute right-[10%] top-[1100px] h-44 w-44 rounded-full bg-blue-100/50" />

<div className="absolute -left-28 top-[1500px] h-80 w-80 rounded-full bg-blue-100/35 blur-sm" />
<div className="absolute -right-24 top-[1900px] h-72 w-72 rounded-full bg-orange-100/40 blur-sm" />

<div className="absolute left-[8%] top-[2450px] h-36 w-36 rounded-full bg-orange-100/45" />
<div className="absolute right-[8%] top-[2750px] h-40 w-40 rounded-full bg-blue-100/45" />

<div className="absolute -left-24 top-[3200px] h-72 w-72 rounded-full bg-orange-100/35 blur-sm" />
<div className="absolute -right-24 top-[3500px] h-80 w-80 rounded-full bg-blue-100/35 blur-sm" />

{/* Left botanical decorations */}
<div className="absolute -left-10 top-[100px] rotate-[-15deg] text-blue-300/60">
  <LeafBranch />
</div>

<div className="absolute -left-12 top-[750px] rotate-[-22deg] text-orange-300/50">
  <LeafBranch />
</div>

<div className="absolute -left-10 top-[1450px] rotate-[-15deg] text-blue-300/55">
  <LeafBranch />
</div>

<div className="absolute -left-12 top-[2200px] rotate-[-20deg] text-orange-300/50">
  <LeafBranch />
</div>

<div className="absolute -left-10 top-[3000px] rotate-[-15deg] text-blue-300/55">
  <LeafBranch />
</div>

{/* Right botanical decorations */}
<div className="absolute -right-10 top-[300px] rotate-[15deg] scale-x-[-1] text-blue-300/60">
  <LeafBranch />
</div>

<div className="absolute -right-12 top-[950px] rotate-[20deg] scale-x-[-1] text-blue-300/55">
  <LeafBranch />
</div>

<div className="absolute -right-10 top-[1700px] rotate-[15deg] scale-x-[-1] text-orange-300/50">
  <LeafBranch />
</div>

<div className="absolute -right-12 top-[2450px] rotate-[20deg] scale-x-[-1] text-blue-300/55">
  <LeafBranch />
</div>

<div className="absolute -right-10 top-[3200px] rotate-[15deg] scale-x-[-1] text-orange-300/50">
  <LeafBranch />
</div>

{/* Small decorative dots */}
<div className="absolute left-[6%] top-[600px] h-4 w-4 rounded-full bg-orange-200/70" />
<div className="absolute right-[8%] top-[720px] h-6 w-6 rounded-full bg-blue-200/70" />

<div className="absolute left-[14%] top-[1300px] h-5 w-5 rounded-full bg-blue-200/60" />
<div className="absolute right-[15%] top-[1500px] h-4 w-4 rounded-full bg-orange-200/70" />

<div className="absolute left-[8%] top-[2050px] h-6 w-6 rounded-full bg-orange-200/60" />
<div className="absolute right-[10%] top-[2200px] h-5 w-5 rounded-full bg-blue-200/60" />

<div className="absolute left-[16%] top-[2850px] h-4 w-4 rounded-full bg-blue-200/60" />
<div className="absolute right-[14%] top-[3000px] h-6 w-6 rounded-full bg-orange-200/60" />
{/* More botanical decorations — middle sections */}

<div className="absolute -left-10 top-[450px] rotate-[-18deg] text-blue-300/50">
  <LeafBranch />
</div>

<div className="absolute -right-10 top-[600px] rotate-[18deg] scale-x-[-1] text-orange-300/45">
  <LeafBranch />
</div>

<div className="absolute -left-12 top-[1150px] rotate-[-20deg] text-blue-300/50">
  <LeafBranch />
</div>

<div className="absolute -right-12 top-[1350px] rotate-[20deg] scale-x-[-1] text-orange-300/45">
  <LeafBranch />
</div>

<div className="absolute -left-10 top-[1800px] rotate-[-15deg] text-orange-300/45">
  <LeafBranch />
</div>

<div className="absolute -right-10 top-[2050px] rotate-[18deg] scale-x-[-1] text-blue-300/50">
  <LeafBranch />
</div>

<div className="absolute -left-12 top-[2550px] rotate-[-20deg] text-blue-300/50">
  <LeafBranch />
</div>

<div className="absolute -right-12 top-[2700px] rotate-[20deg] scale-x-[-1] text-orange-300/45">
  <LeafBranch />
</div>

<div className="absolute -left-10 top-[3100px] rotate-[-18deg] text-orange-300/45">
  <LeafBranch />
</div>

<div className="absolute -right-10 top-[3350px] rotate-[18deg] scale-x-[-1] text-blue-300/50">
  <LeafBranch />
</div>

<div className="absolute -left-12 top-[3700px] rotate-[-20deg] text-blue-300/50">
  <LeafBranch />
</div>

<div className="absolute -right-12 top-[3950px] rotate-[20deg] scale-x-[-1] text-orange-300/45">
  <LeafBranch />
</div>

<div className="absolute -left-10 top-[4300px] rotate-[-18deg] text-orange-300/45">
  <LeafBranch />
</div>

<div className="absolute -right-10 top-[4550px] rotate-[18deg] scale-x-[-1] text-blue-300/50">
  <LeafBranch />
</div>

<div className="absolute -left-12 top-[4900px] rotate-[-20deg] text-blue-300/45">
  <LeafBranch />
</div>
      </div>

      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="relative z-10 pt-24 pb-16 sm:pt-28 sm:pb-20">
        <div className="relative mx-auto max-w-6xl px-6 text-center">

          <div className="mb-5 flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-orange-400" />

            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
              About Us
            </span>

            <span className="h-px w-10 bg-orange-400" />
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            People.
            <span className="text-orange-500"> Purpose.</span>
            <br className="sm:hidden" /> Possibilities.
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg">
            At Khula Aasman Sanstha, we believe in a more inclusive,
            compassionate and empowered society — where every individual gets
            a fair chance to grow.
          </p>

          {/* Side quote */}
          <div className="absolute -left-10 top-20 hidden w-32 -rotate-6 text-left text-xl leading-7 text-blue-300 lg:block">
            <span className="font-serif italic">
              “Empowering
              <br />
              communities,
              <br />
              building
              <br />
              brighter
              <br />
              tomorrows.”
            </span>
          </div>

          <div className="absolute -right-10 top-28 hidden w-32 rotate-6 text-right text-xl leading-7 text-blue-300 lg:block">
            <span className="font-serif italic">
              “Small
              <br />
              steps
              <br />
              create
              <br />
              big
              <br />
              change.”
            </span>
          </div>

        </div>
      </section>

      {/* =========================================================
          IMPACT STATS
      ========================================================= */}

      <section className="relative pb-16">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-5 px-6 md:grid-cols-4">

          <ImpactCard
            icon={<Users className="h-6 w-6" />}
            number="500+"
            label="Lives Touched"
            blue
          />

          <ImpactCard
            icon={<Award className="h-6 w-6" />}
            number="20+"
            label="Community Programs"
          />

          <ImpactCard
            icon={<Heart className="h-6 w-6" />}
            number="100+"
            label="Active Volunteers"
            blue
          />

          <ImpactCard
            icon={<Compass className="h-6 w-6" />}
            number="5+"
            label="Years of Impact"
          />

        </div>
      </section>

      {/* =========================================================
          STORY
      ========================================================= */}

      <section className="relative py-16">
        <div className="mx-auto max-w-5xl px-6">

          <SectionHeading
            eyebrow="Our Story"
            title="Where Hope Takes Flight"
            description="Our journey is rooted in the belief that meaningful change begins when communities are given the opportunity to grow."
          />

          <div className="mt-12 rounded-[2rem] border border-slate-100 bg-white/90 p-7 shadow-[0_15px_50px_rgba(15,23,42,0.06)] sm:p-10">

            <h3 className="text-2xl font-bold text-slate-950">
              {ABOUT_CONTENT.story.title}
            </h3>

            <div className="mt-6 space-y-5 text-sm leading-7 text-slate-600 sm:text-base">
              {ABOUT_CONTENT.story.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================
          MISSION & VISION
      ========================================================= */}

      <section className="relative py-16">
        <div className="mx-auto max-w-6xl px-6">

          <SectionHeading
            eyebrow="What Drives Us"
            title="Mission & Vision"
            description="Two guiding ideas shape every initiative we undertake."
          />

          <div className="mt-12 grid gap-7 md:grid-cols-2">

            <InfoCard
              icon={<Compass className="h-7 w-7" />}
              title="Our Mission"
              text="To create equal opportunities for education, skill development and holistic growth, especially for underserved communities."
              type="orange"
            />

            <InfoCard
              icon={<Heart className="h-7 w-7" />}
              title="Our Vision"
              text="A society where every individual, regardless of background, can dream, learn and build a better tomorrow."
              type="blue"
            />

          </div>

        </div>
      </section>

      {/* =========================================================
          LEADERSHIP
      ========================================================= */}

      <section className="relative py-16">
        <LeadershipSection />
      </section>

      {/* =========================================================
          TEAM
      ========================================================= */}

      <section className="relative py-10">
        <TeamSection />
      </section>

      {/* =========================================================
          JOURNEY / TIMELINE
      ========================================================= */}

      <section className="relative py-20">
        <div className="mx-auto max-w-6xl px-6">

          <SectionHeading
            eyebrow="Our Journey"
            title="Growing Through Every Milestone"
            description="Every milestone reflects our commitment to creating lasting impact in education, women empowerment and community development."
          />

          <div className="relative mt-14">

            {/* Timeline line */}
            <div className="absolute left-4 top-0 bottom-0 hidden w-px bg-orange-200 md:left-1/2 md:block" />

            <div className="space-y-10 md:space-y-16">

              {ABOUT_CONTENT.timeline.map((item, index) => (
                <div
                  key={index}
                  className={`relative flex flex-col md:flex-row ${
                    index % 2 !== 0 ? 'md:flex-row-reverse' : ''
                  }`}
                >

                  <div className="w-full md:w-1/2 md:px-8">
                    <div className="rounded-3xl border border-slate-100 bg-white p-7 shadow-[0_12px_40px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

                      <span className="text-sm font-bold text-orange-500">
                        {item.year}
                      </span>

                      <h3 className="mt-2 text-xl font-bold text-slate-950 sm:text-2xl">
                        {item.title}
                      </h3>

                      <p className="mt-4 text-sm leading-7 text-slate-600">
                        {item.description}
                      </p>

                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div className="absolute left-1/2 top-8 hidden h-4 w-4 -translate-x-1/2 rounded-full border-4 border-white bg-orange-500 shadow md:block" />

                </div>
              ))}

            </div>
          </div>

        </div>
      </section>

      {/* =========================================================
          VALUES
      ========================================================= */}

      <section className="relative py-20">
        <div className="mx-auto max-w-6xl px-6">

          <SectionHeading
            eyebrow="Our Values"
            title="Principles We Live By"
            description="The values behind every program, every volunteer and every community we serve."
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {ABOUT_CONTENT.values.map((value, index) => (
              <div
                key={index}
                className="group rounded-3xl border border-slate-100 bg-white p-7 text-center shadow-[0_10px_35px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >

                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-orange-50 text-orange-500 transition-transform duration-300 group-hover:scale-110">
                  {index === 0 ? (
                    <Heart className="h-6 w-6" />
                  ) : index === 1 ? (
                    <Users className="h-6 w-6" />
                  ) : index === 2 ? (
                    <Award className="h-6 w-6" />
                  ) : (
                    <Compass className="h-6 w-6" />
                  )}
                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-950">
                  {value.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {value.description}
                </p>

              </div>
            ))}

          </div>

        </div>
      </section>

      {/* =========================================================
          CLOSING QUOTE
      ========================================================= */}

      <section className="relative px-6 pb-24 pt-10">
        <div className="mx-auto max-w-4xl">

          <div className="relative overflow-hidden rounded-[2.5rem] bg-blue-50/70 px-7 py-12 text-center sm:px-14">

            <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-white/70" />
            <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-orange-100/50" />

            <div className="relative">

              <div className="text-5xl leading-none text-blue-300">
                “
              </div>

              <p className="mx-auto max-w-2xl font-serif text-2xl font-medium italic leading-relaxed text-slate-800 sm:text-3xl">
                A better tomorrow is possible when we work together today.
              </p>

              <div className="mt-5 text-sm font-semibold text-slate-500">
                — Khula Aasman Sanstha
              </div>

              <div className="mx-auto mt-5 h-1 w-14 rounded-full bg-orange-500" />

            </div>

          </div>

        </div>
      </section>

    </main>
  );
}

/* =============================================================
   REUSABLE COMPONENTS
============================================================= */

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">

      <div className="mb-4 flex items-center justify-center gap-4">
        <span className="h-px w-9 bg-orange-400" />

        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
          {eyebrow}
        </span>

        <span className="h-px w-9 bg-orange-400" />
      </div>

      <h2 className="text-3xl font-extrabold text-slate-950 sm:text-4xl">
        {title}
      </h2>

      <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
        {description}
      </p>

    </div>
  );
}

function ImpactCard({
  icon,
  number,
  label,
  blue = false,
}: {
  icon: React.ReactNode;
  number: string;
  label: string;
  blue?: boolean;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-slate-100 bg-white/90 px-4 py-6 text-center shadow-sm">

      <div
        className={`flex h-12 w-12 items-center justify-center rounded-full ${
          blue
            ? 'bg-blue-50 text-blue-500'
            : 'bg-orange-50 text-orange-500'
        }`}
      >
        {icon}
      </div>

      <div className="mt-3 text-2xl font-extrabold text-slate-950">
        {number}
      </div>

      <div className="mt-1 text-xs text-slate-500">
        {label}
      </div>

    </div>
  );
}

function InfoCard({
  icon,
  title,
  text,
  type,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  type: 'orange' | 'blue';
}) {
  return (
    <div
      className={`rounded-[2rem] border p-8 shadow-sm ${
        type === 'orange'
          ? 'border-orange-100 bg-orange-50/50'
          : 'border-blue-100 bg-blue-50/50'
      }`}
    >

      <div
        className={`flex h-14 w-14 items-center justify-center rounded-full ${
          type === 'orange'
            ? 'bg-orange-100 text-orange-500'
            : 'bg-blue-100 text-blue-500'
        }`}
      >
        {icon}
      </div>

      <h3 className="mt-6 text-2xl font-bold text-slate-950">
        {title}
      </h3>

      <p className="mt-4 leading-7 text-slate-600">
        {text}
      </p>

    </div>
  );
}

/* =============================================================
   SIMPLE SVG LEAF BRANCH
============================================================= */

function LeafBranch() {
  return (
    <svg
      width="150"
      height="180"
      viewBox="0 0 150 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="opacity-80"
    >
      <path
        d="M20 170C38 130 62 92 122 30"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      <path
        d="M47 119C31 108 18 94 12 78C31 80 44 92 47 119Z"
        stroke="currentColor"
        strokeWidth="1.3"
      />

      <path
        d="M61 98C50 80 48 62 52 47C68 58 73 76 61 98Z"
        stroke="currentColor"
        strokeWidth="1.3"
      />

      <path
        d="M78 78C78 58 87 43 101 35C104 52 95 68 78 78Z"
        stroke="currentColor"
        strokeWidth="1.3"
      />

      <path
        d="M37 139C23 136 11 127 5 115C20 114 33 123 37 139Z"
        stroke="currentColor"
        strokeWidth="1.3"
      />

      <path
        d="M94 61C103 45 117 37 132 37C126 52 113 62 94 61Z"
        stroke="currentColor"
        strokeWidth="1.3"
      />
    </svg>
  );
}