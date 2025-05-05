import { NextRequest, NextResponse } from 'next/server';
import { decodeBase62, get500ResponseBody } from '../serverUtils';
import { TCatchBlockError } from '@/app/types';
import db from '../db';

type Props = {
  params: Promise<{
    shortUrlId: string;
  }>;
};

export const GET = async (_: NextRequest, prop: Props) => {
  try {
    const { shortUrlId } = await prop.params;
    if (!shortUrlId) {
      return NextResponse.json(
        {
          message: 'invalid URL',
        },
        {
          status: 400,
        }
      );
    }
console.log('shortUrlId',shortUrlId)
    const decoded = decodeBase62(shortUrlId);
    console.log('decoded ',decoded )
    const url = await db.urls.findUnique({
      where: {
        id: decoded,
      },
    });
    console.log(' url ', url  )
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
    return NextResponse.json({
      longUrl: url. longUrl,
    });
  } catch (error) {
    return NextResponse.json(get500ResponseBody(error as TCatchBlockError), {
      status: 500,
    });
  }
};
