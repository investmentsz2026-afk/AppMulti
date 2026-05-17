import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import DesktopLiveRoom from './components/DesktopLiveRoom';
import MobileLiveRoom from './components/MobileLiveRoom';

export default async function LiveRoomPage({ params }: { params: { id: string } }) {
  const session = await getSession();
  
  if (!session) {
    redirect('/login');
  }

  // The 'id' parameter corresponds to the streamer's name (e.g. SofiLive)
  const streamerName = decodeURIComponent(params.id);

  return (
    <>
      <div className="hidden lg:block h-full">
        <DesktopLiveRoom user={session} streamerName={streamerName} />
      </div>
      <div className="block lg:hidden h-full">
        <MobileLiveRoom user={session} streamerName={streamerName} />
      </div>
    </>
  );
}
