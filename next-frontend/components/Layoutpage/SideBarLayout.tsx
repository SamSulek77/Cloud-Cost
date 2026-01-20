'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { LogOut, Home, Settings, Upload, ChevronLeft, ChevronRight, TrendingUp, PieChart, BarChart3, ChevronDown, Table, RefreshCw } from 'lucide-react';
import { removeCookie } from '@/lib/cookies';
import { cn } from '@/lib/utils';
import axios from '@/lib/axios';
import { API_ENDPOINTS } from '@/lib/constants';

import { User } from '@/types';

interface DashboardLayoutProps {
  children: React.ReactNode;
  user?: User | null;
}

export default function DashboardLayout({ children, user }: DashboardLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isHomeSubMenuOpen, setIsHomeSubMenuOpen] = useState(pathname === '/home');
  const [isAnalysisSubMenuOpen, setIsAnalysisSubMenuOpen] = useState(pathname === '/analysis');
  const [isInitialized, setIsInitialized] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Load persisted state on mount home and analysis
  useEffect(() => {
    const savedHome = localStorage.getItem('nav_home_open');
    const savedAnalysis = localStorage.getItem('nav_analysis_open');

    if (savedHome !== null) {
      setIsHomeSubMenuOpen(savedHome === 'true');
    }
    if (savedAnalysis !== null) {
      setIsAnalysisSubMenuOpen(savedAnalysis === 'true');
    }

    setIsInitialized(true);
  }, []);

  // Save state on change
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('nav_home_open', String(isHomeSubMenuOpen));
      localStorage.setItem('nav_analysis_open', String(isAnalysisSubMenuOpen));
    }
  }, [isHomeSubMenuOpen, isAnalysisSubMenuOpen, isInitialized]);

  const handleLogout = () => {
    removeCookie('token');
    router.push('/login');
  };

  const handleCloudSync = async () => {
    if (isSyncing) return;

    // Simple confirmation if needed, or just run it. Using simple state feedback.
    if (!confirm('Run manual S3 Cloud Sync? This will import any new files found in your bucket.')) return;

    setIsSyncing(true);
    setSyncStatus('idle');

    try {
      const response = await axios.post(API_ENDPOINTS.S3_SYNC);
      setSyncStatus('success');

      alert(response.data.message || 'Sync completed successfully.');

      // Dispatch event AFTER user acknowledges the alert
      window.dispatchEvent(new Event('cost-data-updated'));

    } catch (error: any) {
      console.error('Cloud Sync failed:', error);
      setSyncStatus('error');
      alert('Cloud Sync failed. Please check the logs.');
    } finally {
      setIsSyncing(false);
      // Reset status after 3 seconds
      setTimeout(() => setSyncStatus('idle'), 3000);
    }
  };

  const canUpload = user && ['devops', 'super_admin', 'admin'].includes(user.role || '');

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={cn(
          "bg-white border-r border-gray-200 flex flex-col transition-all duration-300 relative",
          isCollapsed ? "w-20" : "w-64"
        )}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-9 bg-white border border-gray-200 rounded-full p-1.5 shadow-sm hover:bg-gray-50 z-10 cursor-pointer"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4 text-gray-600" /> : <ChevronLeft className="w-4 h-4 text-gray-600" />}
        </button>

        {/* Logo */}
        <div className="p-6 border-b border-gray-200 flex justify-center overflow-hidden">
          <div className="flex items-center gap-2">
            <img
              src="/images/logo.png"
              alt="Silentmode Logo"
              className={cn(
                "transition-all duration-300 object-contain",
                isCollapsed ? "h-8 w-8" : "h-13 w-auto"
              )}
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="mb-2 space-y-1">
            <div className="space-y-1">
              <div className="relative group">
                <Link
                  href="/home"
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors w-full",
                    pathname === '/home'
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-100",
                    isCollapsed && "justify-center px-0"
                  )}
                  title={isCollapsed ? "Home" : undefined}
                >
                  <Home className="w-5 h-5 shrink-0" />
                  {!isCollapsed && <span className="flex-1 text-left">Home</span>}
                </Link>

                {!isCollapsed && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setIsHomeSubMenuOpen(!isHomeSubMenuOpen);
                    }}
                    className={cn(
                      "absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-gray-200 transition-all",
                      isHomeSubMenuOpen ? "rotate-0" : "-rotate-90"
                    )}
                  >
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </button>
                )}
              </div>

              {/* Sub-navigation items */}
              {!isCollapsed && isHomeSubMenuOpen && (
                <div className="ml-9 space-y-1 border-l border-gray-100 pl-2 py-1 flex flex-col overflow-hidden transition-all duration-300">
                  <Link
                    href="/home#cost-trend"
                    className="flex items-center gap-2 px-2 py-1.5 rounded-md text-[13px] text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                  >
                    <TrendingUp className="w-4 h-4" />
                    Monthly AWS Trend
                  </Link>
                  <Link
                    href="/home#cost-breakdown"
                    className="flex items-center gap-2 px-2 py-1.5 rounded-md text-[13px] text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                  >
                    <BarChart3 className="w-4 h-4" />
                    Account Breakdown
                  </Link>

                  <Link
                    href="/home#account-trends"
                    className="flex items-center gap-2 px-2 py-1.5 rounded-md text-[13px] text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                  >
                    <Table className="w-4 h-4" />
                    Account Trends
                  </Link>
                </div>
              )}
            </div>

            <div className="relative group">
              <Link
                href="/analysis"
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors w-full",
                  pathname === '/analysis'
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:bg-gray-100",
                  isCollapsed && "justify-center px-0"
                )}
                title={isCollapsed ? "Service Analysis" : undefined}
              >
                <PieChart className="w-5 h-5 shrink-0" />
                {!isCollapsed && <span className="flex-1 text-left">Service Analysis</span>}
              </Link>

              {!isCollapsed && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setIsAnalysisSubMenuOpen(!isAnalysisSubMenuOpen);
                  }}
                  className={cn(
                    "absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-gray-200 transition-all",
                    isAnalysisSubMenuOpen ? "rotate-0" : "-rotate-90"
                  )}
                >
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
              )}
            </div>

            {/* Analysis Sub-navigation items */}
            {!isCollapsed && isAnalysisSubMenuOpen && (
              <div className="ml-9 space-y-1 border-l border-gray-100 pl-2 py-1 flex flex-col overflow-hidden transition-all duration-300">
                <Link
                  href="/analysis#service-comparison"
                  className="flex items-center gap-2 px-2 py-1.5 rounded-md text-[13px] text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                >
                  <BarChart3 className="w-4 h-4" />
                  Service Comparison
                </Link>
                <Link
                  href="/analysis#cost-trends"
                  className="flex items-center gap-2 px-2 py-1.5 rounded-md text-[13px] text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                >
                  <TrendingUp className="w-4 h-4" />
                  Cost Trends
                </Link>
              </div>
            )}


            {canUpload && (
              <>
                <Link
                  href="/upload"
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    pathname === '/upload'
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-100",
                    isCollapsed && "justify-center px-0"
                  )}
                  title={isCollapsed ? "Upload" : undefined}
                >
                  <Upload className="w-5 h-5 shrink-0" />
                  {!isCollapsed && <span>Upload</span>}
                </Link>

                <button
                  onClick={handleCloudSync}
                  disabled={isSyncing}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors w-full",
                    "text-gray-600 hover:bg-gray-100",
                    isSyncing && "opacity-70 cursor-wait",
                    isCollapsed && "justify-center px-0"
                  )}
                  title={isCollapsed ? "Cloud Sync" : undefined}
                >
                  <RefreshCw className={cn(
                    "w-5 h-5 shrink-0",
                    isSyncing && "animate-spin",
                    syncStatus === 'success' && "text-green-500",
                    syncStatus === 'error' && "text-red-500"
                  )} />
                  {!isCollapsed && (
                    <span className={cn(
                      syncStatus === 'success' && "text-green-600",
                      syncStatus === 'error' && "text-red-600"
                    )}>
                      {isSyncing ? "Syncing..." : syncStatus === 'success' ? "Synced!" : "Cloud Sync"}
                    </span>
                  )}
                </button>
              </>
            )}
          </div>
        </nav>



        {/* User Info & Logout */}
        <div className="border-t border-gray-200">
          {user && (
            <div className={cn("border-b border-gray-200", isCollapsed ? "p-2" : "p-4")}>
              <div className={cn("flex items-center gap-3", isCollapsed && "justify-center")}>
                <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center shrink-0">
                  <span className="text-sm font-medium text-white">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                {!isCollapsed && (
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                    <p className="text-xs text-gray-500 truncate mb-1">{user.email}</p>
                    <span className={cn(
                      "text-[10px] px-1.5 py-0.5 rounded font-medium border capitalize",
                      canUpload
                        ? "bg-purple-50 text-purple-700 border-purple-200"
                        : "bg-gray-100 text-gray-600 border-gray-200"
                    )}>
                      {user.role}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
          <div className="p-4">
            <button
              onClick={handleLogout}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 w-full transition-colors",
                isCollapsed && "justify-center px-0"
              )}
              title={isCollapsed ? "Logout" : undefined}
            >
              <LogOut className="w-5 h-5 shrink-0" />
              {!isCollapsed && <span>Logout</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">


        {/* Page Content */}
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}