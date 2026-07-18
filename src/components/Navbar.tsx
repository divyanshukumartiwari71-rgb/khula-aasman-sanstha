'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Heart } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Programs', path: '/programs' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Success Stories', path: '/success-stories' },
    { name: 'Volunteer', path: '/volunteer' },
    { name: 'Contact', path: '/contact' },
  ];

  // Check if current page is homepage to apply initial transparent navbar behavior
  const transparentPages = [
  '/',
  '/programs',
  '/gallery',
  '/success-stories',
  '/volunteer',
  '/contact',
  '/donate',
];

const isTransparentPage = transparentPages.includes(pathname);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
       isScrolled || !isTransparentPage
          ? 'bg-white/95 backdrop-blur-md shadow-md py-3 text-slate-800'
          : 'bg-gradient-to-b from-black/50 to-transparent py-5 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-3">
              {/* Logo icon/wrapper */}
              <Image
            src="/images/logo/logoimage.png"
            alt="Khula Aasman Sanstha Logo"
            width={50}
            height={50}
            className="rounded-full shadow-md"
          />
              <div className="flex flex-col">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight leading-none">
                  KHULA AASMAN
                </span>
                <span className="text-[10px] sm:text-[11px] tracking-widest font-semibold uppercase opacity-90 mt-0.5">
                  SANSTHA
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.name}
                  href={link.path}
                  className={`text-sm font-medium transition-colors duration-200 hover:text-orange-500 ${
                    isActive
                      ? 'text-orange-500 font-semibold'
                      : isScrolled || !isTransparentPage
                      ? 'text-slate-600 hover:text-slate-900'
                      : 'text-white/90 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            
            <Link
              href="/donate"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F97316] text-white font-semibold text-sm shadow-md hover:bg-orange-600 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <Heart className="w-4 h-4 fill-white" />
              Donate
            </Link>

            <Link
              href="/admin/dashboard"
              className={`text-xs px-3 py-1.5 rounded border transition-colors ${
                isScrolled || !isTransparentPage
                  ? 'border-slate-300 text-slate-500 hover:bg-slate-50'
                  : 'border-white/30 text-white/70 hover:bg-white/10'
              }`}
            >
              Admin
            </Link>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden items-center gap-3">
            <Link
  href="/donate"
  className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#F97316] text-white font-semibold text-xs shadow-md hover:bg-orange-600 transition-all"
>
              <Heart className="w-3.5 h-3.5 fill-white" />
              Donate
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className={`inline-flex items-center justify-center p-2 rounded-md transition-colors ${
                isScrolled || !isTransparentPage ? 'text-slate-700 hover:bg-slate-100' : 'text-white hover:bg-white/10'
              }`}
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      <div
        className={`md:hidden absolute top-20 left-0 right-0 bg-white border-t border-slate-100 shadow-xl transition-all duration-300 ease-in-out ${
          isOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-4 invisible'
        }`}
        id="mobile-menu"
      >
        <div className="px-4 pt-2 pb-6 space-y-1 sm:px-3 text-slate-800">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.name}
                href={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-3 rounded-md text-base font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 font-semibold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          
          <div className="pt-4 flex flex-col gap-3 px-3">
            <Link
              href="/donate"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#F97316] text-white font-bold text-sm shadow-md hover:bg-orange-600 transition-colors"
            >
              <Heart className="w-4 h-4 fill-white" />
              Support Our Mission (Donate)
            </Link>
            
            <Link
              href="/admin/dashboard"
              onClick={() => setIsOpen(false)}
              className="w-full text-center px-4 py-2 rounded-lg border border-slate-200 text-slate-500 text-sm hover:bg-slate-50"
            >
              Admin Dashboard
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
