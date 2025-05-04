import { NextRequest, NextResponse } from 'next/server';
import { get500ResponseBody } from '../serverUtils';
import { TCatchBlockError } from '@/app/types';
import { urlStore } from '../dataStore';

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
    
    const newUrl = urlStore.getOriginalUrlGivenLongUrl({
      shortUrlId: pathname,
    });
    if (!newUrl) {
      return NextResponse.json(
        {
          message: 'no long url found for this given short url',
        },
        {
          status: 400,
        }
      );
    }
    return NextResponse.json({ newUrl, success:true });
  } catch (error) {
    return NextResponse.json(get500ResponseBody(error as TCatchBlockError), {
      status: 500,
    });
  }
};
