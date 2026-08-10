'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, Users, BarChart3, Settings, LogOut, Database, AlertCircle, Sword, Coins, Wallet, Menu, X, ArrowDownLeft } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import { logoutUser } from '@/app/actions/auth';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const handleLogout = async () => {
    logout();
    await logoutUser();
  };

  const adminMenu = [
    { icon: BarChart3, label: 'Stats', href: '/admin' },
    { icon: Users, label: 'Users', href: '/admin/users' },
    { icon: Wallet, label: 'Solicitudes de Recarga', href: '/admin/recargas' },
    { icon: ArrowDownLeft, label: 'Solicitudes de Retiro', href: '/admin/retiros' },
    { icon: Coins, label: 'Monedas / Cortes', href: '/admin/monedas' },
    { icon: Database, label: 'Logs', href: '/admin/logs' },
    { icon: AlertCircle, label: 'Reports', href: '/admin/reports' },
    { icon: Sword, label: 'Batallas y PvP', href: '/admin/wagers' },
  ];

  return (
    <div className="flex h-screen bg-zinc-950 overflow-hidden text-zinc-100 relative">
      {/* Mobile Sidebar Backdrop */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)} 
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden animate-in fade-in duration-200" 
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-zinc-900 border-r border-white/5 flex flex-col p-6 
        transition-transform duration-300 md:static md:flex md:bg-zinc-900/50 md:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between mb-10 text-primary">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 fill-primary/20" />
            <span className="font-bold text-lg tracking-tight uppercase">Admin Panel</span>
          </div>
          {/* Close button inside sidebar on mobile */}
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden p-1.5 hover:bg-white/5 rounded-lg text-zinc-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-2">
          {adminMenu.map((item) => (
            <Link 
              key={item.label}
              href={item.href}
              onClick={() => setIsSidebarOpen(false)}
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
      <main className="flex-1 flex flex-col overflow-hidden w-full">
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-4 md:px-8 bg-zinc-900/30">
          <div className="flex items-center gap-3">
            {/* Hamburger button on mobile */}
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-2 hover:bg-white/5 rounded-xl text-zinc-400 hover:text-white cursor-pointer"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="text-xs md:text-sm font-bold text-zinc-500 uppercase tracking-widest">
              System Overview
            </div>
          </div>
          <div className="flex items-center gap-3 md:gap-4">
             <div className="text-right hidden sm:block">
                <div className="text-sm font-bold">{user?.username || 'Admin'}</div>
                <div className="text-[10px] text-primary font-bold">SUPERUSER</div>
             </div>
             <div className="w-9 h-9 md:w-10 md:w-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                <Shield className="w-5 h-5 md:w-6 md:h-6 text-primary" />
             </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
