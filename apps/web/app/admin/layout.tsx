'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, Users, BarChart3, Settings, LogOut, Database, AlertCircle } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const adminMenu = [
    { icon: BarChart3, label: 'Stats', href: '/admin' },
    { icon: Users, label: 'Users', href: '/admin/users' },
    { icon: Database, label: 'Logs', href: '/admin/logs' },
    { icon: AlertCircle, label: 'Reports', href: '/admin/reports' },
  ];

  return (
    <div className="flex h-screen bg-zinc-950 overflow-hidden text-zinc-100">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-900/50 border-r border-white/5 flex flex-col p-6">
        <div className="flex items-center gap-3 mb-10 text-primary">
          <Shield className="w-8 h-8 fill-primary/20" />
          <span className="font-bold text-lg tracking-tight uppercase">Admin Panel</span>
        </div>

        <nav className="flex-1 space-y-2">
          {adminMenu.map((item) => (
            <Link 
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors text-zinc-400 hover:text-white"
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium text-sm">{item.label}</span>
            </Link>
          ))}
        </nav>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 text-red-400 transition-colors mt-auto"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium text-sm">Exit Admin</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-zinc-900/30">
          <div className="text-sm font-bold text-zinc-500 uppercase tracking-widest">
            System Overview
          </div>
          <div className="flex items-center gap-4">
             <div className="text-right">
                <div className="text-sm font-bold">{user?.username || 'Admin'}</div>
                <div className="text-[10px] text-primary font-bold">SUPERUSER</div>
             </div>
             <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
             </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
