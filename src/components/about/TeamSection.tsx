'use client';

import TeamCard from './TeamCard';

export default function TeamSection() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <p className="uppercase tracking-[0.25em] text-orange-500 font-semibold">
            Our Team
          </p>

          <h2 className="text-4xl font-bold text-slate-900 mt-4">
            Meet Our Core Team
          </h2>

          <p className="max-w-2xl mx-auto text-slate-600 mt-5">
            Dedicated professionals working every day to create meaningful impact in the community.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          <TeamCard
            name="Diwakar Mishra"
            designation="Program Manager"
            image="/images/team/program-manager.jpg"
          />

          <TeamCard
            name="Utkarsh Rai"
            designation="Field Coordinator"
            image="/images/team/field-coordinator.jpg"
          />

          <TeamCard
            name="Saisa Khandelwal"
            designation="Media Manager"
            image="/images/team/media-manager.jpg"
          />

        </div>

      </div>
    </section>
  );
}