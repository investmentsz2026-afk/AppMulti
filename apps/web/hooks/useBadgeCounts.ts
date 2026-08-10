import { useState, useEffect } from 'react';
import { getUnreadNotificationsCount, getUnreadDMsCountAction } from '@/app/actions/social';

export function useBadgeCounts() {
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [unreadMessages, setUnreadMessages] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const notifCount = await getUnreadNotificationsCount();
        setUnreadNotifications(notifCount);
        const msgCount = await getUnreadDMsCountAction();
        setUnreadMessages(msgCount);
      } catch (err) {
        console.error('Error fetching badge counts:', err);
      }
    };

    fetchCounts();
    // Poll every 10 seconds for real-time responsiveness as requested
    const interval = setInterval(fetchCounts, 10000);
    return () => clearInterval(interval);
  }, []);

  return { unreadNotifications, unreadMessages };
}
