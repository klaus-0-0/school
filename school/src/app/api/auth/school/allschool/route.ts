import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const schools = await prisma.school.findMany();

    return NextResponse.json(schools);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}