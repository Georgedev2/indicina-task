import { NextRequest, NextResponse } from 'next/server';
import { decodeBase62, get500ResponseBody } from '../serverUtils';
import { TCatchBlockError } from '@/app/types';
import db from '../db';

export const POST = async (req: NextRequest) => {
  try {
    const body = (await req.json()) as { shortUrl: string };
    if (body && !body.shortUrl) {
      return NextResponse.json(
        {
          message: 'invalid URL',
        },
        {
          status: 400,
        }
      );
    }

    const { pathname } = new URL(body.shortUrl);
    const slug = pathname?.replaceAll('/', '');
    const decoded =  parseInt(decodeBase62(slug));

    const url = await db.urls.findUnique({
      where: {
        id: decoded,
      },
    });

    if (!url) {
      return NextResponse.json(
        {
          message: 'Not found',
        },
        {
          status: 404,
        }
      );
    }
    return NextResponse.json({ longUrl: url.longUrl, success: true });
  } catch (error) {
    return NextResponse.json(get500ResponseBody(error as TCatchBlockError), {
      status: 500,
    });
  }
};
