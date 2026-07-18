import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Home, Heart, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-24 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center bg-white p-8 sm:p-12 rounded-2xl shadow-xl border border-slate-100 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-100 rounded-full blur-2xl opacity-50"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-orange-100 rounded-full blur-2xl opacity-50"></div>

        <div className="relative">
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-blue-50 text-blue-600 mb-6">
            <Compass className="h-10 w-10 animate-spin" style={{ animationDuration: '10s' }} />
          </div>
          
          <h1 className="text-6xl font-extrabold text-slate-900 tracking-tight mb-2">404</h1>
          <h2 className="text-xl font-bold text-slate-800 mb-4">Page Not Found</h2>
          
          <p className="text-sm text-slate-500 leading-relaxed mb-8">
            The page you are looking for doesn&apos;t exist or has been moved. Under the open sky of &quot;Khula Aasman&quot;, you are never truly lost—let&apos;s guide you back.
          </p>

          <div className="flex flex-col gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-colors"
            >
              <Home className="w-4 h-4" />
              Go Back Home
            </Link>

            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/donate"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-orange-200 hover:border-orange-300 bg-orange-50/50 hover:bg-orange-50 text-orange-700 font-semibold text-xs transition-colors"
              >
                <Heart className="w-3.5 h-3.5 fill-orange-700" />
                Donate Now
              </Link>
              <Link
                href="/volunteer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors"
              >
                Become Volunteer
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
