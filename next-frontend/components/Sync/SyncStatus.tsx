'use client';

import { useState, useEffect } from 'react';
import { CheckCircle2, Clock, XCircle } from 'lucide-react';

export function SyncStatus() {
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [lastSyncTime, setLastSyncTime] = useState<string | null>(null);

    useEffect(() => {
        // 1. Function to load status from localStorage
        const loadStatus = () => {
            const storedStatus = localStorage.getItem('sync_status') as 'idle' | 'success' | 'error';
            const storedTime = localStorage.getItem('sync_timestamp');

            if (storedStatus) setStatus(storedStatus);
            if (storedTime) setLastSyncTime(storedTime);
        };

        // 2. Load initially on mount
        loadStatus();

        // 3. Listen for custom event to update immediately without refresh
        window.addEventListener('sync-status-updated', loadStatus);

        // Cleanup listener
        return () => {
            window.removeEventListener('sync-status-updated', loadStatus);
        };
    }, []);

    // Don't show anything if no sync has ever happened
    if (!lastSyncTime) return null;

    return (
        <div className="flex items-center gap-6 mt-4 text-sm text-gray-500 bg-gray-50/50 p-2 rounded-lg w-fit border border-gray-100">
            {/* Status Section */}
            <div className="flex items-center gap-2">
                <span className="font-medium text-gray-700">Sync Status:</span>
                <span className={`flex items-center gap-1.5 ${status === 'success' ? 'text-green-600' :
                        status === 'error' ? 'text-red-600' : 'text-gray-600'
                    }`}>
                    {status === 'success' ? (
                        <CheckCircle2 className="w-4 h-4" />
                    ) : status === 'error' ? (
                        <XCircle className="w-4 h-4" />
                    ) : null}
                    <span className="capitalize">{status === 'success' ? 'Passed' : status}</span>
                </span>
            </div>

            {/* Time Section */}
            <div className="flex items-center gap-2 border-l border-gray-200 pl-4">
                <span className="font-medium text-gray-700">Latest Sync:</span>
                <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {lastSyncTime}
                </span>
            </div>
        </div>
    );
}