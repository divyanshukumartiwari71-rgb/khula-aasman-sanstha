import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: "Privacy Policy | Khula Aasman Sanstha",
  description: "Read the Privacy Policy of Khula Aasman Sanstha. Learn how we handle your donations and volunteer information safely.",
};

export default function PrivacyPage() {
  const lastUpdated = new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="bg-slate-50 min-h-screen py-24 sm:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-lg border border-slate-100 space-y-6 text-slate-600 text-sm leading-relaxed sm:text-base">
          
          <div className="border-b border-slate-100 pb-6">
            <h1 className="text-3xl font-extrabold text-slate-900">Privacy Policy</h1>
            <p className="text-slate-400 text-xs mt-2">Last Updated: {lastUpdated}</p>
          </div>

          <p>
            Welcome to the official website of <strong>Khula Aasman Sanstha</strong> (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;). We are committed to protecting your personal privacy. This Privacy Policy describes how we collect, store, use, and protect your information when you visit our website, register as a volunteer, or make financial donations.
          </p>

          <h2 className="text-xl font-bold text-slate-900 pt-4">1. Information We Collect</h2>
          <p>
            We collect personal information that you voluntarily provide to us when interacting with our portal, including:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
            <li><strong>Volunteer Submissions:</strong> Full name, email address, WhatsApp/phone number, residential address, professional skills, and motivation write-ups.</li>
            <li><strong>Donation Submissions:</strong> Donor name, email address, telephone contact, donation tier (monthly, one-time, sponsor-a-child), gift amount, and payment references (UPI Reference IDs / Bank deposit transaction numbers).</li>
            <li><strong>Contact Submissions:</strong> Name, email address, phone number, and message descriptions.</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900 pt-4">2. How We Use Your Information</h2>
          <p>
            We process your details based on legitimate interest and consent for the following purposes:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
            <li>To verify financial deposits against bank ledgers and issue official 80G tax-exemption receipts.</li>
            <li>To process your volunteer registration and coordinate center visits or workshops in Varanasi.</li>
            <li>To respond to your inquiries submitted via our contact forms.</li>
            <li>To send periodic progress newsletters or child sponsorship report cards (if selected).</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900 pt-4">3. Data Retention & Protection</h2>
          <p>
            All submitted entries are stored securely in our centralized <strong>Supabase PostgreSQL Database</strong>. We implement standard security measures to protect against unauthorized access, editing, or deletion of your information. We do not sell, rent, or trade your personal information with third-party marketing companies.
          </p>

          <h2 className="text-xl font-bold text-slate-900 pt-4">4. Third-Party Links</h2>
          <p>
            Our website contains links to other networks (e.g. social platforms like Facebook, YouTube, or Google Maps embeds). We do not control or endorse the privacy terms of these external platforms.
          </p>

          <h2 className="text-xl font-bold text-slate-900 pt-4">5. Contact Our Privacy Desk</h2>
          <p>
            If you have questions regarding your data, wish to request removal of your contact history, or want to modify your monthly sponsorship settings, please write to us at:
          </p>
          <p className="bg-slate-50 p-4 rounded-xl font-semibold text-slate-800 text-xs sm:text-sm border border-slate-100">
            Khula Aasman Sanstha<br />
            Email: info@khulaaasmansanstha.org<br />
            Address: B-23/45, Sector 4, Rohaniya, Varanasi, UP - 221108
          </p>

          <div className="pt-6 border-t border-slate-100 text-center">
            <Link href="/" className="text-blue-600 hover:underline font-semibold text-sm">
              Return to Homepage
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
