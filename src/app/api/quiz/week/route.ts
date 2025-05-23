import { NextResponse } from "next/server";
import prisma from "@/libs/db";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { Quiz } from "@/generated/prisma";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

function getStartOfWeek() {
  const now = new Date();
  const day = now.getDay(); 
  const diff = now.getDate() - day;
  const start = new Date(now.setDate(diff));
  start.setHours(0, 0, 0, 0);
  return start;
}

export async function GET() {
  const token = (await cookies()).get("Auth_psiq")?.value;
  if (!token) return NextResponse.json({ quizWeek: [] });
  const { payload } = await jwtVerify(token, secret);
  const userId = payload.userId as string;

  const startOfWeek = getStartOfWeek();
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(endOfWeek.getDate() + 7);

  const quizzes = await prisma.quiz.findMany({
    where: {
      userId,
      date: {
        gte: startOfWeek,
        lt: endOfWeek,
      },
    },
    select: { date: true, mainEmotion: true },
  });

  const emocionesPorDia: (string | null)[] = Array(7).fill(null);
  quizzes.forEach((quiz: Quiz) => {
    const quizDate = new Date(quiz.date);
    const dayIdx = quizDate.getDay(); 
    emocionesPorDia[dayIdx] = quiz.mainEmotion;
  });

  return NextResponse.json({ quizWeek: emocionesPorDia });
}