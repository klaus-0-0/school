import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const signupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(3),
    username: z.string().min(3),
});

export async function POST(req: NextRequest) {
    const body = await req.json();
    const result = signupSchema.safeParse(body);

    if (!result.success) {
        return NextResponse.json({ error: "invalid input" }, { status: 400 });
    }

    const { email, password, username } = result.data;
    console.log(result.data);
    
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        return NextResponse.json({ error: "User already exists" }, { status: 404 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
        data: {
            username,
            email,
            password: hashedPassword,
        },
    });

    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET!, { expiresIn: "1h" })

    return NextResponse.json(
        {
            message: "Signup successful",
            token,
            user: { email: newUser.email, name: newUser.username, userid: newUser.id },
        },
        { status: 201 }
    );
}