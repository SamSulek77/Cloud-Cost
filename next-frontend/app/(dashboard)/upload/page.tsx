'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import DashboardLayout from '@/components/Layoutpage/SideBarLayout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import axios from '@/lib/axios'; // Use configured axios instance
import { API_ENDPOINTS } from '@/lib/constants';

export default function UploadPage() {
    const { user, loading: loadingUser } = useAuth();
    const router = useRouter();
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        if (!loadingUser && user && !['devops', 'super_admin', 'admin'].includes(user.role)) {
            router.push('/home');
        }
    }, [user, loadingUser, router]);

    useEffect(() => {
        if (!loadingUser && !user) {
            router.push('/login');
        }
    }, [user, loadingUser, router]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setMessage(null);
        }
    };

    const handleUpload = async () => {
        if (!file) {
            setMessage({ type: 'error', text: 'Please select a file first' });
            return;
        }

        setLoading(true);
        setMessage(null);

        const formData = new FormData();
        formData.append('file', file);

        try {
            await axios.post(API_ENDPOINTS.UPLOAD, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setMessage({ type: 'success', text: 'File uploaded successfully!' });
            setFile(null);
            // Reset file input
            const fileInput = document.getElementById('file-upload') as HTMLInputElement;
            if (fileInput) fileInput.value = '';

        } catch (error: any) {
            console.error('Upload error:', error);
            const errorMsg = error.response?.data?.error || 'Failed to upload file. Please try again.';
            setMessage({ type: 'error', text: errorMsg });
        } finally {
            setLoading(false);
        }
    };

    return (
        <DashboardLayout user={user}>
            <div className="max-w-2xl mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Upload className="h-6 w-6" />
                            Upload Cost Report
                        </CardTitle>
                        <CardDescription>
                            Upload your AWS Cost and Usage Report (CSV format) to update the dashboard.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Drag & Drop / File Input Zone */}
                        <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center hover:bg-gray-50 transition-colors">
                            <input
                                id="file-upload"
                                type="file"
                                accept=".csv"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                            <label
                                htmlFor="file-upload"
                                className="cursor-pointer flex flex-col items-center gap-4"
                            >
                                <div className="h-12 w-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                                    <FileText className="h-6 w-6" />
                                </div>
                                <div>
                                    <span className="font-semibold text-blue-600 hover:text-blue-700">Click to upload</span>
                                    <span className="text-gray-500"> or drag and drop</span>
                                    <p className="text-sm text-gray-400 mt-1">CSV files up to 100MB</p>
                                </div>
                            </label>
                        </div>

                        {/* Selected File Display */}
                        {file && (
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md border border-gray-100">
                                <div className="flex items-center gap-3">
                                    <FileText className="h-5 w-5 text-gray-400" />
                                    <span className="text-sm font-medium text-gray-700">{file.name}</span>
                                    <span className="text-xs text-gray-400">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                                </div>
                                <button
                                    onClick={() => setFile(null)}
                                    className="text-gray-400 hover:text-red-500"
                                >
                                    ×
                                </button>
                            </div>
                        )}

                        {/* Status Message */}
                        {message && (
                            <div className={`flex items-center gap-2 p-3 rounded-md text-sm ${message.type === 'success'
                                ? 'bg-green-50 text-green-700 border border-green-100'
                                : 'bg-red-50 text-red-700 border border-red-100'
                                }`}>
                                {message.type === 'success' ? (
                                    <CheckCircle className="h-4 w-4" />
                                ) : (
                                    <AlertCircle className="h-4 w-4" />
                                )}
                                {message.text}
                            </div>
                        )}

                        {/* Upload Button */}
                        <Button
                            className="w-full bg-blue-600 hover:bg-blue-700"
                            onClick={handleUpload}
                            disabled={!file || loading}
                        >
                            {loading ? 'Uploading...' : 'Upload Report'}
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
}