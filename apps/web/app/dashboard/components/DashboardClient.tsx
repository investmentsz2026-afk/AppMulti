'use client';

import React, { useState } from 'react';
import DesktopDashboard from './DesktopDashboard';
import MobileDashboard from './MobileDashboard';
import DesktopForYou from './DesktopForYou';
import MobileInicio from './MobileInicio';
import DesktopFollowing from './DesktopFollowing';
import MobileFollowing from './MobileFollowing';

export default function DashboardClient({ user }: { user: any }) {
  const [tab, setTab] = useState<'inicio' | 'parati' | 'siguiendo'>('inicio');

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab');
      if (tabParam === 'siguiendo' || tabParam === 'parati' || tabParam === 'inicio') {
        setTab(tabParam);
      }
    }
  }, []);

  return (
    <>
      {/* Desktop Views */}
      <div className="hidden lg:block h-full">
        {tab === 'inicio' ? (
          <DesktopDashboard user={user} setTab={setTab} tab={tab} />
        ) : tab === 'parati' ? (
          <DesktopForYou user={user} setTab={setTab} tab={tab} />
        ) : (
          <DesktopFollowing user={user} setTab={setTab} tab={tab} />
        )}
      </div>

      {/* Mobile Views */}
      <div className="block lg:hidden h-full">
        {tab === 'inicio' ? (
          <MobileInicio user={user} setTab={setTab} tab={tab} />
        ) : tab === 'parati' ? (
          <MobileDashboard user={user} setTab={setTab} tab={tab} />
        ) : (
          <MobileFollowing user={user} setTab={setTab} tab={tab} />
        )}
      </div>
    </>
  );
}
