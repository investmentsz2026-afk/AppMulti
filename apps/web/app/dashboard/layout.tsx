import { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen w-full bg-[#05050a] text-white overflow-hidden">
      {children}
    </div>
  );
}
