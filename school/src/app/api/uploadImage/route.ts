import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/app/lib/cloudinary';

export async function POST(req: NextRequest) {
  const { image } = await req.json();

  try {
    const result = await cloudinary.uploader.upload(image, {
      folder: 'schoolImages',
    });

    return NextResponse.json({ url: result.secure_url });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}