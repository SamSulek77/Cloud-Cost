'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import { getCookie } from '@/lib/cookies';
import DashboardLayout from '@/components/Layoutpage/SideBarLayout';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

export default function SettingsPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    const [syncing, setSyncing] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (!loading && user && user.role !== 'admin') {
            router.push('/home');
        }
    }, [user, loading, router]);

    const handleSync = async () => {
        setSyncing(true);
        setMessage('');
        try {
            const token = getCookie('token');
            // Assuming you have a way to make requests, e.g., using axios or fetch with token
            // Here I'll use a fetch for simplicity, you might want to use your axios instance
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/aws/s3/cost-reports/import-latest`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });

            const data = await res.json();

            if (res.ok) {
                setMessage('✅ Success: ' + data.message);
            } else {
                setMessage('❌ Error: ' + (data.error || 'Failed to sync'));
            }
        } catch (error: any) {
            setMessage('❌ Network Error: ' + error.message);
        } finally {
            setSyncing(false);
        }
    };

    return (
        <DashboardLayout user={user}>
            <div className="p-8 max-w-2xl">
                <h1 className="text-3xl font-bold mb-6">Settings</h1>

                <Card>
                    <CardHeader>
                        <CardTitle>AWS S3 Integration</CardTitle>
                        <CardDescription>Manage your connection to AWS S3 Buckets</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="bg-blue-50 p-4 rounded-md text-sm text-blue-700">
                            <strong>Note:</strong> Since you are running locally, the automatic AWS Webhook cannot reach your computer. Use the button below to manually check for new files.
                        </div>

                        {message && (
                            <div className={`p-4 rounded-md text-sm ${message.includes('Error') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                                {message}
                            </div>
                        )}

                        <Button
                            onClick={handleSync}
                            disabled={syncing}
                            className="w-full sm:w-auto"
                        >
                            {syncing ? 'Syncing...' : 'Sync Latest Report from S3'}
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}