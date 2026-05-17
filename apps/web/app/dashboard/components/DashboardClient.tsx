'use client';

import React, { useState } from 'react';
import DesktopDashboard from './DesktopDashboard';
import MobileDashboard from './MobileDashboard';
import DesktopForYou from './DesktopForYou';
import MobileInicio from './MobileInicio';

export default function DashboardClient({ user }: { user: any }) {
  const [tab, setTab] = useState<'inicio' | 'parati'>('inicio');

  return (
    <>
      {/* Desktop Views */}
      <div className="hidden lg:block h-full">
        {tab === 'inicio' ? (
          <DesktopDashboard user={user} setTab={setTab} tab={tab} />
        ) : (
          <DesktopForYou user={user} setTab={setTab} tab={tab} />
        )}
      </div>

      {/* Mobile Views */}
      <div className="block lg:hidden h-full">
        {tab === 'inicio' ? (
          <MobileInicio user={user} setTab={setTab} tab={tab} />
        ) : (
          <MobileDashboard user={user} setTab={setTab} tab={tab} />
        )}
      </div>
    </>
  );
}
