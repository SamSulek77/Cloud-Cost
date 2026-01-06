'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { LogOut, Home, Settings, Upload, ChevronLeft, ChevronRight, TrendingUp, PieChart, BarChart3, ChevronDown } from 'lucide-react';
import { removeCookie } from '@/lib/cookies';
import { cn } from '@/lib/utils';

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

  // Auto-collapse Home sub-menu when navigating to other pages
  useEffect(() => {
    if (pathname !== '/home') {
      setIsHomeSubMenuOpen(false);
    } else {
      setIsHomeSubMenuOpen(true);
    }
  }, [pathname]);

  const handleLogout = () => {
    removeCookie('token');
    router.push('/login');
  };

  const isAdmin = user?.role === 'admin';

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={cn(
          "bg-white border-r border-gray-200 flex flex-col transition-all duration-300 relative",
          isCollapsed ? "w-20" : "w-64"
        )}
      >
        {/* ... (Toggle Button and Logo remain same - skipped for brevity in replacement if not touched) */}
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
                  <a
                    href="#cost-trend"
                    className="flex items-center gap-2 px-2 py-1.5 rounded-md text-[13px] text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                  >
                    <TrendingUp className="w-4 h-4" />
                    Monthly AWS Trend
                  </a>
                  <a
                    href="#cost-breakdown"
                    className="flex items-center gap-2 px-2 py-1.5 rounded-md text-[13px] text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                  >
                    <PieChart className="w-4 h-4" />
                    Account Breakdown
                  </a>
                  <a
                    href="#service-comparison"
                    className="flex items-center gap-2 px-2 py-1.5 rounded-md text-[13px] text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                  >
                    <BarChart3 className="w-4 h-4" />
                    Service Comparison
                  </a>
                </div>
              )}
            </div>

            {isAdmin && (
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


              </>
            )}
          </div>
        </nav>

        {/* Settings */}
        {isAdmin && (
          <div className="px-4 pb-2">
            <Link
              href="/settings"
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                pathname === '/settings'
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-600 hover:bg-gray-100",
                isCollapsed && "justify-center px-0"
              )}
              title={isCollapsed ? "Settings" : undefined}
            >
              <Settings className="w-5 h-5 shrink-0" />
              {!isCollapsed && <span>Settings</span>}
            </Link>
          </div>
        )}

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
                      "text-[10px] px-1.5 py-0.5 rounded font-medium border",
                      isAdmin
                        ? "bg-purple-50 text-purple-700 border-purple-200"
                        : "bg-gray-100 text-gray-600 border-gray-200"
                    )}>
                      {isAdmin ? 'Admin' : 'Viewer'}
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