import React from 'react';
import ContactForm from '@/components/ContactForm';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { CONTACT_INFO } from '@/data/contact';
import { SOCIAL_LINKS } from '@/data/social';
import { IMAGES } from '@/lib/images';

// Custom inline SVG Social Icons for older Lucide compatibility
const Facebook = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Twitter = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const Instagram = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const Youtube = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

const Linkedin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);


export const metadata = {
  title: "Contact Us | Varanasi Office Location & Support",
  description: "Get in touch with Khula Aasman Sanstha. Reach out to our Varanasi office via phone, email, or contact form.",
};

export default function ContactPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-900 pt-20">
        <div
  className="absolute inset-0 bg-cover bg-no-repeat bg-[position:center_40%]"
  style={{
    backgroundImage: `url(${IMAGES.pageHero.contact})`,
  }}
/>

<div className="absolute inset-0 bg-black/55" />
        <div className="absolute right-0 top-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-0 bottom-0 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[#F97316] font-bold text-xs uppercase tracking-widest bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/25">
            Get In Touch
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mt-4">
            Contact Varanasi Office
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mt-4 leading-relaxed">
            Reach out for volunteering queries, donation receipt issues, or CSR collaboration programs.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Info Column */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-[#F97316] font-bold text-xs uppercase tracking-widest">Connect With Us</span>
              <h2 className="text-3xl font-extrabold text-slate-950 mt-1">Our Office Address</h2>
              <p className="text-slate-500 text-sm mt-3 leading-relaxed">
                Visit our office or call during working hours. We welcome visitors who wish to witness center classes.
              </p>
            </div>

            {/* Channels lists */}
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Varanasi Location</h4>
                  <p className="text-slate-500 text-xs mt-1 leading-relaxed">{CONTACT_INFO.address}</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Phone Contacts</h4>
                  <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                    Primary: {CONTACT_INFO.phone}<br />
                    Office: {CONTACT_INFO.phoneAlt}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Email Inquiries</h4>
                  <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                    General: <a href={`mailto:${CONTACT_INFO.email}`} className="hover:underline">{CONTACT_INFO.email}</a><br />
                    Sponsorships: <a href={`mailto:${CONTACT_INFO.emailSupport}`} className="hover:underline">{CONTACT_INFO.emailSupport}</a>
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Office Hours</h4>
                  <p className="text-slate-500 text-xs mt-1 leading-relaxed">{CONTACT_INFO.officeHours}</p>
                </div>
              </div>
            </div>

            {/* Social channels */}
            <div className="pt-6 border-t border-slate-200">
              <h4 className="font-bold text-slate-900 text-sm mb-4">Follow Varanasi Activities</h4>
              <div className="flex space-x-3">
                <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-blue-600 hover:text-white transition-all text-slate-600" aria-label="Facebook">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noopener noreferrer" className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-sky-500 hover:text-white transition-all text-slate-600" aria-label="Twitter">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-pink-600 hover:text-white transition-all text-slate-600" aria-label="Instagram">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-red-600 hover:text-white transition-all text-slate-600" aria-label="YouTube">
                  <Youtube className="w-5 h-5" />
                </a>
                <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-blue-700 hover:text-white transition-all text-slate-600" aria-label="LinkedIn">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

        </div>

        {/* 3. Google Maps Section */}
        <div className="mt-16 bg-white p-4 rounded-3xl shadow-lg border border-slate-100 overflow-hidden h-[450px]">
          <iframe
            src={CONTACT_INFO.googleMapsEmbed}
            width="100%"
            height="100%"
            style={{ border: 0, borderRadius: '1.25rem' }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Khula Aasman Sanstha Varanasi Location Map"
          ></iframe>
        </div>

      </section>
    </div>
  );
}
