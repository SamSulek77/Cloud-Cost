'use client';

import { useEffect, useState } from 'react';
import { X, TrendingUp, TrendingDown, ArrowRight, Database, ChevronsRight, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

import { Button } from '@/components/ui/button';
import { API_ENDPOINTS } from '@/lib/constants';
import { useAuth } from '@/lib/hooks/useAuth';
import axios from '@/lib/axios';

interface CostInvestigationPanelProps {
    isOpen: boolean;
    onClose: () => void;
    serviceName: string;
    productCode: string; // Needed for API
    monthA: string;      // "November 2025"
    monthB: string;      // "December 2025"
    accountName?: string | null;
}

interface UsageTypeChange {
    usage_type: string;
    cost_a: number;
    cost_b: number;
    cost_change: number;
    percent_change: number;
    quantity_a: number;
    quantity_b: number;
    quantity_change: number;
    is_new: boolean;
}

export default function CostInvestigationPanel({
    isOpen,
    onClose,
    serviceName,
    productCode,
    monthA,
    monthB,
    accountName
}: CostInvestigationPanelProps) {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<UsageTypeChange[]>([]);
    const [summary, setSummary] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        if (isOpen && productCode && monthA && monthB) {
            fetchInvestigationData();
            setShowAll(false); // Reset on open
        }
    }, [isOpen, productCode, monthA, monthB]);

    const fetchInvestigationData = async () => {
        try {
            setLoading(true);
            setError(null);
            const token = localStorage.getItem('token');

            const response = await axios.get(API_ENDPOINTS.COST_INVESTIGATION, {
                params: {
                    product_code: productCode,
                    month_a: monthA,
                    month_b: monthB,
                    account_name: accountName
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.data.success) {
                setData(response.data.data);
                setSummary(response.data.summary);
            }
        } catch (err) {
            console.error("Failed to fetch investigation data", err);
            setError("Failed to load cost details. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    const displayedData = showAll ? data : data.slice(0, 5);

    return (
        <div className="fixed inset-y-0 right-0 w-[500px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out border-l border-gray-200 flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <TrendingUp className="h-4 w-4" />
                        <span>Cost Investigation</span>
                    </div>
                    <Button variant="ghost" size="sm" onClick={onClose} className="h-8 -ml-2 text-gray-500 hover:text-gray-900 gap-1.5 px-2">
                        <ChevronsRight className="h-4 w-4" />
                        <span className="text-sm">Collapse</span>
                    </Button>
                </div>

                <h2 className="text-xl font-bold text-gray-900 mb-1">{serviceName}</h2>
                <div className="flex flex-col space-y-1 text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-700">{monthB}</span>
                        <span>vs</span>
                        <span className="text-gray-500">{monthA}</span>
                    </div>
                    <div className="text-xs text-gray-400">
                        Code: {productCode} | Account: {accountName || 'All'}
                    </div>
                </div>

                {/* Summary Stats */}
                {/* Summary Stats */}
                {summary && (
                    <div className="mt-4 bg-white p-4 rounded-lg border border-gray-200">
                        <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                            <div>
                                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Total Cost</p>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-gray-500">${data.reduce((sum, item) => sum + (item.cost_a || 0), 0).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                                    <ArrowRight className="h-3 w-3 text-gray-400" />
                                    <span className="text-lg font-bold text-gray-900">${data.reduce((sum, item) => sum + (item.cost_b || 0), 0).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Net Change</p>
                            <div className={`text-lg font-bold flex items-center ${summary.total_change >= 0 ? 'text-red-600' : 'text-green-600'}`}>
                                {summary.total_change >= 0 ? '+' : ''}${Math.abs(summary.total_change).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                <span className="ml-2 text-sm font-medium bg-red-50 px-1.5 py-0.5 rounded">
                                    {summary.total_change >= 0 ? '↑' : '↓'} {Math.abs(summary.total_percent_change).toFixed(1)}%
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="flex-1 p-6 overflow-y-auto">
                {loading ? (
                    <div className="flex flex-col items-center justify-center h-full space-y-3 opacity-60">
                        <Loader2 className="animate-spin h-6 w-6 text-primary" />
                        <p className="text-sm">Analyzing usage patterns...</p>
                    </div>
                ) : error ? (
                    <div className="text-red-500 text-center py-8 text-sm">{error}</div>
                ) : data.length === 0 ? (
                    <div className="text-center py-10 text-gray-500 text-sm">
                        No significant usage changes found between these months.
                    </div>
                ) : (

                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-gray-900 text-sm flex items-center">
                                Detailed Breakdown
                            </h3>
                            <span className="text-[10px] text-gray-500 font-medium bg-gray-100 px-2 py-0.5 rounded-full">{data.length} records</span>
                        </div>

                        <div className="space-y-2.5">
                            {displayedData.map((item, idx) => (
                                <UsageTypeRow key={idx} item={item} />
                            ))}
                        </div>

                        {data.length > 5 && (
                            <Button
                                variant="outline"
                                className="w-full text-xs text-gray-500 h-8"
                                onClick={() => setShowAll(!showAll)}
                            >
                                {showAll ? 'Show Less' : `Show More`}
                            </Button>
                        )}
                    </div >
                )
                }
            </div >
        </div>
    );
}

function Loader2({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
    )
}

function UsageTypeRow({ item }: { item: UsageTypeChange }) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="border border-gray-100 rounded-lg bg-white hover:border-gray-200 transition-all shadow-sm">
            <div
                className="flex items-center justify-between p-4 cursor-pointer"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center gap-3 overflow-hidden">
                    <div className={`transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                    <div>
                        <div className="font-medium text-sm text-gray-900 truncate pr-2">
                            {item.usage_type}
                        </div>

                    </div>
                </div>

                <div className="text-right whitespace-nowrap pl-4">
                    <div className={`font-bold text-sm ${item.cost_change >= 0 ? 'text-red-600' : 'text-green-600'}`}>
                        {item.cost_change >= 0 ? '+' : '-'}${Math.abs(item.cost_change).toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
                    </div>
                    <div className={`text-xs font-medium mt-0.5 ${item.cost_change >= 0 ? 'text-red-500' : 'text-green-500'}`}>
                        {item.percent_change > 999 ? '>999%' : `${item.percent_change > 0 ? '+' : ''}${item.percent_change.toFixed(1)}%`}
                    </div>
                </div>
            </div>

            {isExpanded && (
                <div className="px-4 pb-4 pt-0 border-t border-gray-50 bg-gray-50/30">
                    <div className="mt-3 grid grid-cols-2 gap-4 text-xs">
                        <div className="space-y-1">
                            <span className="text-[10px] uppercase font-semibold text-gray-400 tracking-wider">Usage Quantity</span>
                            <div className="flex items-center gap-2 text-gray-600">
                                <Database className="w-3 h-3" />
                                <span>{item.quantity_a.toLocaleString()} → {item.quantity_b.toLocaleString()}</span>
                            </div>
                        </div>
                        <div className="text-right space-y-1">
                            <span className="text-[10px] uppercase font-semibold text-gray-400 tracking-wider">Impact</span>
                            <div className={`font-medium ${item.quantity_change > 0 ? 'text-red-500' : 'text-gray-600'}`}>
                                {item.quantity_change > 0 ? '+' : ''}{item.quantity_change.toLocaleString()} units
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

