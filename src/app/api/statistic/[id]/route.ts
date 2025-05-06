import { NextRequest, NextResponse } from 'next/server';
import { decodeBase62, get500ResponseBody } from '../../serverUtils';
import { TCatchBlockError } from '@/app/types';
import db from '../../db';

type Props = {
  params: Promise<{
    id: string;
  }>;
};
export const GET = async (_: NextRequest, props: Props) => {
  try {
    const { id } = await props.params;
    if (!id) {
      return NextResponse.json(
        {
          message: 'invalid URL',
        },
        {
          status: 400,
        }
      );
    }
    const decoded = parseInt(decodeBase62(id));

    const url = await db.urls.findUnique({
      select: {
        visits: true,
        createdAt: true,
      },

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
    return NextResponse.json({
      urlStats: url,
      success: true,
    });
  } catch (error) {
    return NextResponse.json(get500ResponseBody(error as TCatchBlockError), {
      status: 500,
    });
  }
};
