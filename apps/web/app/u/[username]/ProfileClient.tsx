'use client';

import React from 'react';
import DesktopProfile from './DesktopProfile';
import MobileProfile from './MobileProfile';

export default function ProfileClient({ sessionUser, targetUsername }: { sessionUser: any, targetUsername: string }) {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const isOwnProfile = sessionUser?.username?.toLowerCase() === targetUsername?.toLowerCase();

  return isMobile ? (
    <MobileProfile sessionUser={sessionUser} targetUsername={targetUsername} isOwnProfile={isOwnProfile} />
  ) : (
    <DesktopProfile sessionUser={sessionUser} targetUsername={targetUsername} isOwnProfile={isOwnProfile} />
  );
}
