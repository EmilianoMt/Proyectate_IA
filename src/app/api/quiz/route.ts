import { NextResponse } from "next/server";
import prisma from "@/libs/db";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

function startOfToday() {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return now;
}

export async function GET() {
  const token = (await cookies()).get("Auth_psiq")?.value;
  if (!token) return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  const { payload } = await jwtVerify(token, secret);
  const userId = payload.userId as string;

  const today = startOfToday();
  const quiz = await prisma.quiz.findFirst({
    where: {
      userId,
      date: {
        gte: today,
      },
    },
  });

  if (!quiz) return NextResponse.json({ quiz: null });
  return NextResponse.json({ quiz });
}

export async function POST(request: Request) {
  const token = (await cookies()).get("Auth_psiq")?.value;
  if (!token) return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  const { payload } = await jwtVerify(token, secret);
  const userId = payload.userId as string;

  const today = startOfToday();
  const existing = await prisma.quiz.findFirst({
    where: {
      userId,
      date: {
        gte: today,
      },
    },
  });
  if (existing) return NextResponse.json({ error: "Ya existe quiz hoy" }, { status: 409 });

  const { answers, note, mainEmotion } = await request.json();
  const quiz = await prisma.quiz.create({
    data: {
      userId,
      answers,
      note,
      mainEmotion, 
    },
  });
  return NextResponse.json({ quiz });
}