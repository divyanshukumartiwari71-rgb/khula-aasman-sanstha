import React from 'react';
import DonationForm from '@/components/DonationForm';
import { ShieldCheck, Heart, Mail, HelpCircle } from 'lucide-react';
import { CONTACT_INFO } from '@/data/contact';
import { IMAGES } from '@/lib/images';

export const metadata = {
  title: "Donate Online | Sponsor a Child's Education",
  description: "Support Khula Aasman Sanstha in Varanasi. Donate online via UPI or Bank transfer. Sponsoring child education is 80G tax-exempt.",
};

export default function DonatePage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-900 pt-20">
      
      <div
  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage: `url(${IMAGES.pageHero.donate})`
  }}
/>

<div className="absolute inset-0 bg-black/55" />
        <div className="absolute right-0 top-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-0 bottom-0 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[#F97316] font-bold text-xs uppercase tracking-widest bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/25">
            Support Us
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mt-4">
            Donate & Sponsor
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mt-4 leading-relaxed">
            Every contribution directly funds study materials, nutritious lunches, sewing machines, or village saplings in Varanasi.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Info Column */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-[#F97316] font-bold text-xs uppercase tracking-widest">Tax Exemption</span>
              <h2 className="text-3xl font-extrabold text-slate-950 mt-1">Donations are 80G Certified</h2>
              <p className="text-slate-500 text-sm mt-3 leading-relaxed">
                Khula Aasman Sanstha is a registered society under the Societies Registration Act, 1860. All Indian donations qualify for a 50% tax deduction under section 80G of the Income Tax Act.
              </p>
            </div>

            {/* Credibility highlights */}
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">100% Transparency Guarantee</h4>
                  <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                    We send quarterly impact reports detailing how your sponsored funds were utilized, along with children&apos;s report cards if you sponsor education.
                  </p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Cancel or Pause Sponsorships</h4>
                  <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                    Monthly sustainer plans can be paused or modified at any point. Simply mail our helpdesk with your reference ID.
                  </p>
                </div>
              </div>
            </div>

            {/* Helpline details */}
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 space-y-4">
              <h4 className="font-bold text-blue-900 text-sm flex items-center gap-2">
                <HelpCircle className="w-4 h-4" />
                Donation Helpline
              </h4>
              <p className="text-blue-700/80 text-xs leading-relaxed">
                Need details for corporate giving, CSR partnerships, or wire transfers? Get in touch with our treasury desk.
              </p>
              <div className="space-y-1 text-xs font-semibold text-blue-900">
                <p>Phone: {CONTACT_INFO.phone}</p>
                <p>Email: {CONTACT_INFO.email}</p>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <DonationForm />
          </div>

        </div>
      </section>
    </div>
  );
}
