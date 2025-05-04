import { NextRequest, NextResponse } from 'next/server';
import { get500ResponseBody } from '../serverUtils';
import { TCatchBlockError } from '@/app/types';
import { urlStore } from '../dataStore';

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    if (body && !body.longUrl) {
      return NextResponse.json(
        {
          message: 'invalid URL',
        },
        {
          status: 400,
        }
      );
    }

    const { origin, href } = new URL(body.longUrl);
   const newUrl =urlStore.createUrl({
      longUrl: href,
      origin,
    });

    return NextResponse.json(
      {
        data: newUrl,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    return NextResponse.json(get500ResponseBody(error as TCatchBlockError), {
      status: 500,
    });
  }
};
