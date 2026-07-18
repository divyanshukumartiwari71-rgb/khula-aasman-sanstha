'use client';

import React, { useState } from 'react';
import { Sparkles, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { addVolunteer } from '@/lib/db';

export default function VolunteerForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    skills: '',
    experience: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("Submit button clicked");
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      setStatus('error');
      setErrorMessage('Please fill in all required fields (Name, Email, Phone, and Address).');
      return;
    }

    setStatus('submitting');
    try {
      const response = await addVolunteer(formData);
      if (response.success) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', address: '', skills: '', experience: '' });
      } else {
        throw new Error('Database operation failed');
      }
    } catch (error) {
      console.error('Volunteer Form error:', error);
      setStatus('error');
      setErrorMessage('Something went wrong. Please check your network and try again.');
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 max-w-2xl mx-auto">
      {status === 'success' ? (
        <div className="text-center py-8">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-50 text-blue-600 mb-6">
            <CheckCircle className="h-10 w-10 animate-bounce" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-2">Registration Submitted!</h3>
          <p className="text-sm text-slate-500 leading-relaxed max-w-md mx-auto">
            Thank you for applying to volunteer with Khula Aasman Sanstha. Our Varanasi office team will review your application and contact you over email or phone within 2-3 working days.
          </p>
          <button
            onClick={() => setStatus('idle')}
            className="mt-6 inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-[#F97316] hover:bg-orange-600 text-white font-semibold text-sm transition-colors"
          >
            Submit Another Application
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-orange-500 fill-orange-100 animate-pulse" />
              Volunteer Registration
            </h3>
            <p className="text-sm text-slate-500 mt-1">Join our network of 150+ changemakers and make a difference directly in Varanasi communities.</p>
          </div>

          {status === 'error' && (
            <div className="flex items-center gap-3 p-4 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-sm">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                value={formData.name}
                onChange={handleChange}
                disabled={status === 'submitting'}
                placeholder="e.g. Anand Mishra"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-slate-50"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                Email Address <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                value={formData.email}
                onChange={handleChange}
                disabled={status === 'submitting'}
                placeholder="e.g. anand@example.com"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-slate-50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-2">
                WhatsApp / Phone Number <span className="text-rose-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                disabled={status === 'submitting'}
                placeholder="e.g. +91 99887 76655"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-slate-50"
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-semibold text-slate-700 mb-2">
                Residential Address <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="address"
                id="address"
                required
                value={formData.address}
                onChange={handleChange}
                disabled={status === 'submitting'}
                placeholder="e.g. Lanka, Varanasi"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-slate-50"
              />
            </div>
          </div>

          <div>
            <label htmlFor="skills" className="block text-sm font-semibold text-slate-700 mb-2">
              Skills & Areas of Interest (e.g. Teaching, Tailoring, Social Media, Health Camp)
            </label>
            <input
              type="text"
              name="skills"
              id="skills"
              value={formData.skills}
              onChange={handleChange}
              disabled={status === 'submitting'}
              placeholder="e.g. Primary Teaching, English speaking, Graphic Design"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-slate-50"
            />
          </div>

          <div>
            <label htmlFor="experience" className="block text-sm font-semibold text-slate-700 mb-2">
              Prior Experience / Why do you want to join us?
            </label>
            <textarea
              name="experience"
              id="experience"
              rows={3}
              value={formData.experience}
              onChange={handleChange}
              disabled={status === 'submitting'}
              placeholder="Tell us a little bit about yourself and your motivation..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:bg-slate-50 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold text-sm shadow-md transition-all cursor-pointer hover:scale-[1.01] active:scale-95"
          >
            {status === 'submitting' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Registering...
              </>
            ) : (
              "Submit Volunteer Application"
            )}
          </button>
        </form>
      )}
    </div>
  );
}
