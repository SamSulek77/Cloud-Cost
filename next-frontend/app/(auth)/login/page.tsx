'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from '@/lib/axios';
import { Button } from '@/components/ui/button';
import { API_ENDPOINTS } from '@/lib/constants';
import { setCookie } from '@/lib/cookies';

import AnimatedBackground from '@/components/ui/AnimatedBackground';

type LoginForm = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const [form, setForm] = useState<LoginForm>({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await axios.post(API_ENDPOINTS.LOGIN, form);
      setCookie('token', res.data.access_token);
      router.push('/home');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatedBackground>
      <div className="w-full max-w-md space-y-6 bg-white/80 backdrop-blur-md border border-white/20 p-8 rounded-xl shadow-2xl">
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 italic">
            Welcome to the <span className="text-blue-600 non-italic">AWS Cost Dashboard</span>
          </h2>
          <p className="text-sm text-slate-500">
            Enter your credentials to access your account
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-100 text-red-600 rounded-md text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-slate-700">Email</label>
            <input
              id="email"
              type="email"
              placeholder="name@company.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full h-11 px-3 py-2 border border-slate-200 bg-white/50 rounded-lg text-sm transition-all focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-slate-700">Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full h-11 px-3 py-2 border border-slate-200 bg-white/50 rounded-lg text-sm transition-all focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
              required
            />
          </div>

          <Button type="submit" className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        <p className="text-center text-sm text-slate-500">
          Don't have an account?{' '}
          <Link href="/register" className="font-semibold text-blue-600 hover:text-blue-700">
            Register for free
          </Link>
        </p>
      </div>
    </AnimatedBackground>
  );
}