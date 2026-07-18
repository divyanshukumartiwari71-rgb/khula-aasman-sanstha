import React from 'react';
import VolunteerForm from '@/components/VolunteerForm';
import { Mail, Phone, Gift, Clock, Award } from 'lucide-react';
import { CONTACT_INFO } from '@/data/contact';
import { IMAGES } from '@/lib/images';

export const metadata = {
  title: "Volunteer Registration | Join Us in Varanasi",
  description: "Register as a volunteer with Khula Aasman Sanstha. Support our teaching, women tailoring, or green rural campaigns in Varanasi.",
};

export default function VolunteerPage() {
  const benefits = [
    { title: "Direct Grassroot Exposure", desc: "Gain hands-on experience by teaching or managing workshops directly in Varanasi slums.", icon: <Award className="w-5 h-5" /> },
    { title: "Flexible Commitments", desc: "Choose between weekly evening bridge classes, weekend camps, or project-based drives.", icon: <Clock className="w-5 h-5" /> },
    { title: "Certificate of Action", desc: "Receive an official letter of recommendation/certificate detailing your hours and contributions.", icon: <Gift className="w-5 h-5" /> }
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-900 pt-20">
        <div
  className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-[position:center_30%]"
  style={{
    backgroundImage: `url(${IMAGES.pageHero.volunteer})`,
  }}
/>

<div className="absolute inset-0 bg-black/55" />
        <div className="absolute right-0 top-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-0 bottom-0 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[#F97316] font-bold text-xs uppercase tracking-widest bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/25">
            Get Involved
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mt-4">
            Become a Volunteer
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mt-4 leading-relaxed">
            Spend your hours productively. Dedicate your weekends, teaching skills, or administrative abilities to Varanasi youth.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Info Column */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-[#F97316] font-bold text-xs uppercase tracking-widest">Why Volunteer?</span>
              <h2 className="text-3xl font-extrabold text-slate-950 mt-1">Make an Impact While You Learn</h2>
              <p className="text-slate-500 text-sm mt-3 leading-relaxed">
                Volunteering with Khula Aasman Sanstha is not a passive task. We assign you specific roles matching your interests, so you see real changes on the ground.
              </p>
            </div>

            {/* Benefits cards */}
            <div className="space-y-4">
              {benefits.map((b, idx) => (
                <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center flex-shrink-0">
                    {b.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{b.title}</h4>
                    <p className="text-slate-500 text-xs mt-1 leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Helpline contact info */}
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 space-y-4">
              <h4 className="font-bold text-blue-900 text-sm">Varanasi Volunteer Support</h4>
              <p className="text-blue-700/80 text-xs leading-relaxed">
                Have questions about program locations or batch timings? Get in touch with our coordinator.
              </p>
              <div className="space-y-2 text-xs font-semibold text-blue-900">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-blue-700" />
                  <span>{CONTACT_INFO.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-700" />
                  <a href={`mailto:${CONTACT_INFO.emailSupport}`} className="hover:underline">{CONTACT_INFO.emailSupport}</a>
                </div>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <VolunteerForm />
          </div>

        </div>
      </section>
    </div>
  );
}
