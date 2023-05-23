import { NextRequest, NextResponse } from 'next/server';

import db from '@/server/lib/db';
import AuthService from '@/server/services/auth.service';

export async function POST(req: NextRequest) {
  try {
    await db();
    const body = await req.json();
    const isUserExist = await AuthService.isUserExist(body.email);

    if (isUserExist)
      return NextResponse.json(
        { message: 'Email is already exist' },
        { status: 409 }
      );
    const { id, name, email } = await AuthService.createUser(body);

    return NextResponse.json({ data: { id, name, email } }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
