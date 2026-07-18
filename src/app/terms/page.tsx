import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: "Terms & Conditions | Khula Aasman Sanstha",
  description: "Read the Terms & Conditions of Khula Aasman Sanstha. Understand terms regarding donations, refunds, and volunteer codes of conduct.",
};

export default function TermsPage() {
  const lastUpdated = new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="bg-slate-50 min-h-screen py-24 sm:py-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-lg border border-slate-100 space-y-6 text-slate-600 text-sm leading-relaxed sm:text-base">
          
          <div className="border-b border-slate-100 pb-6">
            <h1 className="text-3xl font-extrabold text-slate-900">Terms & Conditions</h1>
            <p className="text-slate-400 text-xs mt-2">Last Updated: {lastUpdated}</p>
          </div>

          <p>
            Welcome to <strong>khulaaasmansanstha.org</strong>. By browsing this website or using our donation/registration facilities, you agree to comply with and be bound by the following terms and conditions of use.
          </p>

          <h2 className="text-xl font-bold text-slate-900 pt-4">1. Online Donations & Payments</h2>
          <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
            <li><strong>Verification:</strong> Financial contributions via UPI or Bank Transfers are subject to bank clearing verification. Receipts will be emailed only after the transaction matches our banking statements.</li>
            <li><strong>Refund Policy:</strong> All donations to the Sanstha are final and non-refundable. Please ensure transaction parameters (amount, reference) are correct before making a payment.</li>
            <li><strong>Tax Exemptions:</strong> Tax deduction certificates (80G) will be issued based on the PAN details provided. It is the donor&apos;s responsibility to input correct details.</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900 pt-4">2. Volunteer Conduct</h2>
          <p>
            Registering as a volunteer does not guarantee selection. Approved volunteers operating at our Varanasi primary centers or women training facilities must adhere to the Sanstha&apos;s code of ethics, focusing on child safety, respect for local customs, and clean language.
          </p>

          <h2 className="text-xl font-bold text-slate-900 pt-4">3. Content Copyright</h2>
          <p>
            All website assets—including the official Khula Aasman Sanstha logo, code scripts, structure layout, copy text, timelines, and photographs—are intellectual property of the organization. Unauthorized reproduction or commercial use is strictly prohibited.
          </p>

          <h2 className="text-xl font-bold text-slate-900 pt-4">4. Website Availability & Modifications</h2>
          <p>
            We strive to maintain 100% uptime of this website. However, we reserve the right to temporarily suspend, modify, or permanently disable services or content pages without notice for maintenance, server migrations, or updates.
          </p>

          <h2 className="text-xl font-bold text-slate-900 pt-4">5. Dispute & Jurisdiction</h2>
          <p>
            Any disputes or legal actions arising out of the use of this website or donations made shall be governed by the laws of India and subject to the exclusive jurisdiction of the courts in <strong>Varanasi, Uttar Pradesh</strong>.
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
