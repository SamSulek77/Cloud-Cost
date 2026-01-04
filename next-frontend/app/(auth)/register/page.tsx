'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from '@/lib/axios';
import { Button } from '@/components/ui/button';
import { API_ENDPOINTS } from '@/lib/constants';

import AnimatedBackground from '@/components/ui/AnimatedBackground';

type RegisterForm = {
    name: string;
    email: string;
    password: string;
};

export default function RegisterPage() {
    const [form, setForm] = useState<RegisterForm>({ name: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Basic client-side validation
        if (form.password.length < 6) {
            setError('Password must be at least 6 characters');
            setLoading(false);
            return;
        }

        try {
            await axios.post(API_ENDPOINTS.REGISTER, form);
            // Registration successful, redirect to login
            router.push('/login');
        } catch (err: any) {
            console.error('Registration error:', err);
            // Extract error message from Laravel validation response if available
            const message = err?.response?.data?.message || 'Registration failed. Please try again.';
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatedBackground>
            <div className="w-full max-w-md space-y-6 bg-white/80 backdrop-blur-md border border-white/20 p-8 rounded-xl shadow-2xl">
                <div className="space-y-2 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900">Create an Account</h2>
                    <p className="text-sm text-slate-500">
                        Join us to start managing your cloud costs
                    </p>
                </div>

                {error && (
                    <div className="p-3 bg-red-50 border border-red-100 text-red-600 rounded-md text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-slate-700">Full Name</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="John Doe"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full h-11 px-3 py-2 border border-slate-200 bg-white/50 rounded-lg text-sm transition-all focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-slate-700">Email Address</label>
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
                            minLength={6}
                        />
                        <p className="text-[11px] text-slate-400">Security requirement: at least 6 characters</p>
                    </div>

                    <Button type="submit" className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors" disabled={loading}>
                        {loading ? 'Creating account...' : 'Create Account'}
                    </Button>
                </form>

                <p className="text-center text-sm text-slate-500">
                    Already have an account?{' '}
                    <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-700">
                        Sign in instead
                    </Link>
                </p>
            </div>
        </AnimatedBackground>
    );
}
