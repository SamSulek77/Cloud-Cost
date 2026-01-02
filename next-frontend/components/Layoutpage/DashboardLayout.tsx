'use client';

import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { LogOut, Home, DollarSign, BarChart3, User, Settings } from 'lucide-react';
import { removeCookie } from '@/lib/cookies';
import { cn } from '@/lib/utils';

interface User {
  id: number;
  name: string;
  email: string;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  user?: User | null;
}

export default function DashboardLayout({ children, user }: DashboardLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    removeCookie('token');
    router.push('/login');
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
              <span className="text-white text-xl font-bold">S</span>
            </div>
            <span className="text-xl font-bold">silentmode®</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="mb-2">
            <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">

            </p>
            <Link
              href="/home"
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium",
                pathname === '/home'
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-600 hover:bg-gray-100"
              )}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>

            <Link
              href="/settings"
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium mt-1",
                pathname === '/settings'
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-600 hover:bg-gray-100"
              )}
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </Link>
          </div>
        </nav>

        {/* User Info & Logout */}
        <div className="border-t border-gray-200">
          {user && (
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center">
                  <span className="text-sm font-medium text-white">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
              </div>
            </div>
          )}
          <div className="p-4">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 w-full"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900">AWS Cost Dashboard</h1>
            <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center cursor-pointer">
              <span className="text-sm font-medium text-white">
                {user?.name.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}