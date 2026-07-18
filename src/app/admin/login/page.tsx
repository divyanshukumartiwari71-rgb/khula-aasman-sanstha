'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldAlert, Lock, Mail, Loader2, Sparkles } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  // If already logged in, skip login
  useEffect(() => {
    const checkUser = async () => {
      if (isSupabaseConfigured()) {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          router.push('/admin/dashboard');
        }
      } else {
        // Check mock session
        const mockSession = localStorage.getItem('kas_admin_session');
        if (mockSession === 'active') {
          router.push('/admin/dashboard');
        }
      }
    };
    checkUser();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setStatus('error');
      setErrorMessage('Please fill in both fields.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      if (isSupabaseConfigured()) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) throw error;
        
        router.push('/admin/dashboard');
      } else {
        // Fallback offline verification
        // Default testing credentials: admin@khulaaasmansanstha.org / admin123
        if (email === 'admin@khulaaasmansanstha.org' && password === 'admin123') {
          localStorage.setItem('kas_admin_session', 'active');
          localStorage.setItem('kas_admin_email', email);
          setTimeout(() => {
            router.push('/admin/dashboard');
          }, 800);
        } else {
          throw new Error('Invalid email or password for offline testing. Use admin@khulaaasmansanstha.org and admin123');
        }
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setStatus('error');
      setErrorMessage(err.message || 'Authentication failed. Please verify credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 py-16 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute left-0 bottom-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full bg-slate-800/80 backdrop-blur-md p-8 sm:p-10 rounded-3xl shadow-2xl border border-slate-700 relative z-10">
        <div className="text-center mb-8">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-500/20 text-blue-400 mb-4">
            <Lock className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">NGO Admin Panel</h1>
          <p className="text-slate-400 text-xs mt-2">
            Secure login for Khula Aasman Sanstha editors
          </p>
        </div>

        {status === 'error' && (
          <div className="flex items-start gap-2.5 p-4 bg-rose-950/50 border border-rose-800 text-rose-300 rounded-2xl text-xs mb-6">
            <ShieldAlert className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Access Denied:</span>
              <p className="mt-1 leading-relaxed">{errorMessage}</p>
            </div>
          </div>
        )}

        {/* Info tip about mock details */}
        {!isSupabaseConfigured() && (
          <div className="mb-6 p-4 bg-blue-950/50 border border-blue-800 text-blue-300 rounded-2xl text-xs space-y-1">
            <div className="font-bold flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
              <Sparkles className="w-3.5 h-3.5 text-orange-400 fill-orange-400" />
              Offline Testing Mode Active
            </div>
            <p className="leading-relaxed">
              Supabase is not configured yet. Log in using:<br />
              <strong>User:</strong> <code className="bg-blue-900/50 px-1 rounded">admin@khulaaasmansanstha.org</code><br />
              <strong>Pass:</strong> <code className="bg-blue-900/50 px-1 rounded">admin123</code>
            </p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'loading'}
                placeholder="editor@khulaaasmansanstha.org"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white text-sm transition-all"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Secret Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type="password"
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={status === 'loading'}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white text-sm transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-bold text-sm shadow-lg transition-all cursor-pointer"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Signing in...
              </>
            ) : (
              'Authenticate Access'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
