'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from '@/lib/axios';
import { Button } from '@/components/ui/button';
import { API_ENDPOINTS } from '@/lib/constants';



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
        <div className="flex items-center justify-center min-h-screen p-4 bg-background">
            <div className="w-full max-w-md space-y-6 bg-card border border-border p-8 rounded-lg shadow-lg">
                <div className="space-y-2 text-center">
                    <h2 className="text-3xl font-bold tracking-tight">Create an Account</h2>
                    <p className="text-sm text-muted-foreground">
                        Enter your details to create your account
                    </p>
                </div>

                {error && (
                    <div className="p-3 bg-destructive/10 border border-destructive/20 text-destructive rounded-md text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">Name</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="John Doe"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md text-sm"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="name@company.com"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md text-sm"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="password" className="text-sm font-medium">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md text-sm"
                            required
                            minLength={6}
                        />
                        <p className="text-xs text-muted-foreground">Must be at least 6 characters</p>
                    </div>

                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? 'Creating account...' : 'Sign Up'}
                    </Button>
                </form>

                <p className="text-center text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <Link href="/login" className="font-medium text-primary hover:underline">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
}
