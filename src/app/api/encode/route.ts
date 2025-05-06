/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server';
import { encodeBase62, get500ResponseBody } from '../serverUtils';
import { TCatchBlockError } from '@/app/types';
import db from '../db';

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
    const newUrl = await db.urls.create({
      data: {
        longUrl: href,
      },
    });
    const encoded = encodeBase62(String(newUrl.id) );

    const updateUrl = await db.urls.update({
      where: {
        id: newUrl.id,
      },
      data: {
        shortUrlId: encoded,
        shortUrl: `${origin}/${encoded}`,
      },
    });

    const {
      id,
      createdAt,
      shortUrlId,
      ...rest
    } = updateUrl;

    return NextResponse.json(
      {
        urlDetail: rest,
        success: true,
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
