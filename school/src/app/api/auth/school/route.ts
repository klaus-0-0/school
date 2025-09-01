import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, address, city, imgurl, userid } = body;

  try {
    const school = await prisma.school.create({
      data: {
        name,
        address,
        city,
        imgurl,
        userid,
      },
    });

    return NextResponse.json(school, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}