import { NextResponse } from "next/server";
import prisma from "@/libs/db";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function POST(request: Request) {
  const token = (await cookies()).get("Auth_psiq")?.value;
  if (!token) return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  const { payload } = await jwtVerify(token, secret);
  const userId = payload.userId as string;

  const chat = await prisma.chat.create({
    data: { userId },
  });

  return NextResponse.json({ chatId: chat.id }, { status: 201 });
}