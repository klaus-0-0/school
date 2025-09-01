import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";

const prisma = new PrismaClient();

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const result = loginSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const { email, password } = result.data;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });

  return NextResponse.json(
    {
      message: "Login successful",
      token,
      user: { email: user.email, name: user.username, userid: user.id },
    },
    { status: 200 }
  );
}