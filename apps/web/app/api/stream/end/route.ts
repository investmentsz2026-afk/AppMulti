import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { decrypt } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const sessionCookie = req.cookies.get('session')?.value;
    if (!sessionCookie) {
      return NextResponse.json({ error: 'No session' }, { status: 401 });
    }

    const payload = await decrypt(sessionCookie);
    if (!payload?.sub) {
      return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
    }

    // Force-end any active stream for this user
    await prisma.user.update({
      where: { id: payload.sub },
      data: { isLive: false }
    });

    await prisma.stream.updateMany({
      where: { userId: payload.sub },
      data: { isLive: false }
    });

    // Also finish any active or pending battles for this user's streams
    const userStreams = await prisma.stream.findMany({
      where: { userId: payload.sub },
      select: { id: true }
    });
    const streamIds = userStreams.map(s => s.id);

    if (streamIds.length > 0) {
      await prisma.streamBattle.updateMany({
        where: {
          OR: [
            { stream1Id: { in: streamIds } },
            { stream2Id: { in: streamIds } }
          ],
          status: { in: ['ONGOING', 'PENDING'] }
        },
        data: {
          status: 'FINISHED',
          endTime: new Date()
        }
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Stream end error:', error);
    return NextResponse.json({ error: 'Error' }, { status: 500 });
  }
}
