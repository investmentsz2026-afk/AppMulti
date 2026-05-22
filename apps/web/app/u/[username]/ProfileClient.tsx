'use client';

import React from 'react';
import DesktopProfile from './DesktopProfile';
import MobileProfile from './MobileProfile';

export default function ProfileClient({ sessionUser, targetUser }: { sessionUser: any, targetUser: any }) {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const isOwnProfile = sessionUser?.id === targetUser?.id;

  return isMobile ? (
    <MobileProfile sessionUser={sessionUser} targetUser={targetUser} isOwnProfile={isOwnProfile} />
  ) : (
    <DesktopProfile sessionUser={sessionUser} targetUser={targetUser} isOwnProfile={isOwnProfile} />
  );
}
