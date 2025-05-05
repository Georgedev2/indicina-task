import { NextRequest, NextResponse } from 'next/server';
import { get500ResponseBody } from '../serverUtils';
import { TCatchBlockError } from '@/app/types';
import { SEARCH_KEY } from '@/app/globalConstant';
import db from '../db';

export const GET = async (request: NextRequest) => {
  try {
    const query = request.nextUrl.searchParams.get(SEARCH_KEY) || '';
    let urls;
    if (query == '') {
      urls = await db.urls.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      });
    }

    urls = await db.urls.findMany({
      where: {
        longUrl: {
          contains: query,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json({
      data: urls,
      success: true,
    });
  } catch (error) {
    return NextResponse.json(get500ResponseBody(error as TCatchBlockError), {
      status: 500,
    });
  }
};
