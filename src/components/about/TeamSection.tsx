'use client';

import TeamCard from './TeamCard';

export default function TeamSection() {
  return (
    <section className="relative py-10 overflow-hidden bg-transparent">

      

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-14">

          <p className="uppercase tracking-[0.3em] text-slate-500 font-semibold text-sm">
            Our Team
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-4">
            Meet the <span className="text-orange-500">People</span>
          </h2>

          <p className="max-w-2xl mx-auto text-slate-600 mt-5 text-base md:text-lg">
            Different roles, one mission — a brighter, more inclusive tomorrow.
          </p>

        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 gap-7 lg:gap-8 max-w-6xl mx-auto">

          {/* TOP — Diwyanshu */}
          <TeamCard
            name="Diwyanshu Tiwari"
            designation="Technical Team Lead"
            image="/images/team/technical-team-lead.jpg"
            description="Leading the digital infrastructure, website development and technical solutions to strengthen our impact."
          />

          {/* TOP — Harshita */}
          <TeamCard
            name="Harshita Goel"
            designation="Digital Marketing Manager"
            image="/images/team/digital-marketing-manager.jpg"
            description="Managing digital communication, social media and awareness campaigns to amplify our mission and connect with a wider audience."
          />

          {/* BOTTOM — Diwakar */}
          <TeamCard
            name="Diwakar Mishra"
            designation="Program Manager"
            image="/images/team/program-manager.jpg"
            description="Overseeing program planning, execution and community outreach initiatives to ensure maximum impact."
          />

          {/* BOTTOM — Utkarsh */}
          <TeamCard
            name="Utkarsh Rai"
            designation="Field Coordinator"
            image="/images/team/field-coordinator.jpg"
            description="Coordinating field activities, volunteer engagement and grassroots initiatives to drive positive change."
          />

        </div>

        {/* Bottom message */}
        <div className="text-center mt-14">
          <div className="inline-flex items-center gap-4 text-slate-500">
            <span className="w-12 h-px bg-orange-400" />
            <span className="text-sm tracking-[0.2em] uppercase">
              Stronger Together
            </span>
            <span className="w-12 h-px bg-orange-400" />
          </div>
        </div>

      </div>
    </section>
  );
}