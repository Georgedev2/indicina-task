import { NextRequest, NextResponse } from 'next/server';
import { get500ResponseBody } from '../serverUtils';
import { TCatchBlockError } from '@/app/types';
import { SEARCH_KEY } from '@/app/globalConstant';
import { urlList } from '../dataStore';

export const GET = (request: NextRequest) => {
  const query = request.nextUrl.searchParams.get(SEARCH_KEY) || '';
  try {
    const data = urlList.filter((item) =>
      item?.LongUrl?.toLowerCase().includes(query.toLowerCase())
    );

    return NextResponse.json({
      data,
      success: true,
    });
  } catch (error) {
    return NextResponse.json(get500ResponseBody(error as TCatchBlockError), {
      status: 500,
    });
  }
};
