import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Heart } from 'lucide-react';
import { CONTACT_INFO } from '@/data/contact';
import { SOCIAL_LINKS } from '@/data/social';

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


export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t-4 border-[#F97316]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-slate-800">
          
          {/* Column 1: Organization Details */}
          <div className="flex flex-col space-y-4">
            <Link href="/" className="flex items-center gap-3 text-white">
              <img
  src="/images/logo/logoimage.png"
  alt="Khula Aasman Sanstha"
  className="h-12 w-auto"
/>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg tracking-tight leading-none text-white">
                  KHULA AASMAN
                </span>
                <span className="text-[10px] tracking-widest font-semibold uppercase text-orange-500 mt-0.5">
                  SANSTHA
                </span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed pt-2">
              A registered non-profit organization (NGO) operating in Varanasi, Uttar Pradesh. Empowering lives through Child Education, Women Empowerment, nutrition drives, and sustainable rural development.
            </p>
            <div className="flex space-x-3 pt-4">
              <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-800 rounded-full hover:bg-blue-600 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-800 rounded-full hover:bg-sky-500 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-800 rounded-full hover:bg-pink-600 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-800 rounded-full hover:bg-red-600 hover:text-white transition-colors" aria-label="YouTube">
                <Youtube className="w-4 h-4" />
              </a>
              <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-800 rounded-full hover:bg-blue-700 hover:text-white transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6 relative pb-2 before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-8 before:h-0.5 before:bg-orange-500">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="hover:text-white hover:underline transition-all">About Our Story</Link>
              </li>
              <li>
                <Link href="/programs" className="hover:text-white hover:underline transition-all">Our Program Pillars</Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white hover:underline transition-all">Photo Gallery</Link>
              </li>
              <li>
                <Link href="/success-stories" className="hover:text-white hover:underline transition-all">Success Impact Stories</Link>
              </li>
              <li>
                <Link href="/volunteer" className="hover:text-white hover:underline transition-all">Become a Volunteer</Link>
              </li>
              <li>
                <Link href="/donate" className="hover:text-white hover:underline transition-all">Sponsor & Donate</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white hover:underline transition-all">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Program Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6 relative pb-2 before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-8 before:h-0.5 before:bg-orange-500">
              Our Core Pillars
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/programs#child-education" className="hover:text-white hover:underline transition-all">Child Education</Link>
              </li>
              <li>
                <Link href="/programs#women-empowerment" className="hover:text-white hover:underline transition-all">Women Empowerment</Link>
              </li>
              <li>
                <Link href="/programs#meals-nutrition" className="hover:text-white hover:underline transition-all">Meals & Nutrition</Link>
              </li>
              <li>
                <Link href="/programs#rural-development" className="hover:text-white hover:underline transition-all">Social & Rural Development</Link>
              </li>
              <li>
                <Link href="/programs#environment" className="hover:text-white hover:underline transition-all">Environment Protection</Link>
              </li>
              <li>
                <Link href="/programs#sports-skills" className="hover:text-white hover:underline transition-all">Sports & Skill Development</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Information */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-white font-semibold text-lg mb-2 relative pb-2 before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-8 before:h-0.5 before:bg-orange-500">
              Contact Varanasi Office
            </h3>
            <div className="flex items-start gap-3 text-sm">
              <MapPin className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
              <span>{CONTACT_INFO.address}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Phone className="w-5 h-5 text-orange-500 flex-shrink-0" />
              <a href={`tel:${CONTACT_INFO.phone.replace(/\s+/g, '')}`} className="hover:text-white">{CONTACT_INFO.phone}</a>
            </div>
            <div className="flex items-center gap-3 text-sm font-medium">
              <Mail className="w-5 h-5 text-orange-500 flex-shrink-0" />
              <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-white break-all">{CONTACT_INFO.email}</a>
            </div>
            <div className="pt-2">
              <Link
                href="/donate"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm shadow-md transition-colors"
              >
                <Heart className="w-4 h-4 fill-white" />
                Donate Online
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            &copy; {currentYear} Khula Aasman Sanstha (Reg. Varanasi). All rights reserved.
          </div>
          <div className="flex space-x-6">
            <Link href="/privacy" className="hover:text-slate-300">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-300">Terms & Conditions</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
