import { NextRequest, NextResponse } from 'next/server';
import { urlStore } from '../../dataStore';
import { get500ResponseBody } from '../../serverUtils';
import { TCatchBlockError } from '@/app/types';

type Props = {
  params: Promise<{
    shortUrlId: string;
  }>;
};
export const GET = async (_: NextRequest, prop: Props) => {
  try {
    const params = await prop.params;
    const r = urlStore.getOriginalUrlGivenLongUrl(
      { shortUrlId: params.shortUrlId },
      true
    );
    console.log( 'R',r)
    return NextResponse.json({
      r,
    });
  } catch (error) {
    return NextResponse.json(get500ResponseBody(error as TCatchBlockError), {
      status: 500,
    });
  }
};
