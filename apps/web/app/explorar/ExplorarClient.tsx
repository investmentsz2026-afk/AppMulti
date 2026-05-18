'use client';

import React from 'react';
import DesktopExplorar from './DesktopExplorar';
import MobileExplorar from './MobileExplorar';

export default function ExplorarClient({ user }: { user: any }) {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return isMobile ? <MobileExplorar user={user} /> : <DesktopExplorar user={user} />;
}
