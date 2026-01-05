'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import DashboardLayout from '@/components/Layoutpage/SideBarLayout';

export default function SettingsPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && user && user.role !== 'admin') {
            router.push('/home');
        }
    }, [user, loading, router]);

    return (
        <DashboardLayout user={user}>
            <h1>Settings...</h1>
        </DashboardLayout>
    );
}