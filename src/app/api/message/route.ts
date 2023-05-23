import { db } from '@/server/lib/db';
import { pusherServer } from '@/lib/pusher';
import Message from '@/server/models/message.model';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { text, roomId, ownerId } = await req.json();

  await pusherServer.trigger(roomId, 'incoming-message', { ownerId, text });

  try {
    await db();
    await Message.create({ text, chatRoomId: roomId, ownerId });
    return new Response(JSON.stringify({ success: true }));
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
