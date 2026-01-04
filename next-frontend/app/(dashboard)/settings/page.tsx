'use client';

import { useAuth } from '@/lib/hooks/useAuth';
import DashboardLayout from '@/components/Layoutpage/SideBarLayout';
export default function SettingsPage() {
    const { user } = useAuth();
    return (
        <DashboardLayout user={user}>
            <h1>Settings...</h1>
        </DashboardLayout>
    );
}