import { db } from '@/server/lib/db';
import Room from '@/server/models/room.model';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    await db();
    const newRoom = await Room.create({});

    return new Response(newRoom.id);
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
