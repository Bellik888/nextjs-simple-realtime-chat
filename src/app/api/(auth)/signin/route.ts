import { NextRequest, NextResponse } from 'next/server';

import db from '@/server/lib/db';
import AuthService from '@/server/services/auth.service';

export async function POST(req: NextRequest) {
  try {
    await db();
    const body = await req.json();
    const user = await AuthService.authUser(body.email, body.password);

    if (!user)
      return NextResponse.json({ message: 'Bad Credentials' }, { status: 403 });

    const access_token = await AuthService.getToken(user);

    const { id, name, email } = user;

    const result = { id, name, email, access_token };

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
