'use client';

import React, { useState, useEffect } from 'react';
import DesktopExplorar from './DesktopExplorar';
import MobileExplorar from './MobileExplorar';
import { getRealExploreDataAction } from '@/app/actions/admin';

export default function ExplorarClient({ user }: { user: any }) {
  const [isMobile, setIsMobile] = React.useState(false);
  const [exploreData, setExploreData] = useState<any>({
    streams: [],
    topStreamers: [],
    topDonors: [],
    activeBattles: []
  });
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    async function loadExploreData() {
      try {
        const data = await getRealExploreDataAction();
        setExploreData(data);
      } catch (err) {
        console.error('Error loading explore data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadExploreData();
  }, []);

  return isMobile ? (
    <MobileExplorar 
      user={user} 
      streams={exploreData.streams} 
      topStreamers={exploreData.topStreamers} 
      topDonors={exploreData.topDonors} 
      activeBattles={exploreData.activeBattles} 
      loading={loading}
    />
  ) : (
    <DesktopExplorar 
      user={user} 
      streams={exploreData.streams} 
      topStreamers={exploreData.topStreamers} 
      topDonors={exploreData.topDonors} 
      activeBattles={exploreData.activeBattles} 
      loading={loading}
    />
  );
}
