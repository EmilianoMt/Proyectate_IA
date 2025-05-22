import { NextResponse } from "next/server";
import prisma from "@/libs/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const chatId = searchParams.get("chatId");
  if (!chatId) return NextResponse.json({ messages: [] });

  const messages = await prisma.message.findMany({
    where: { chatId },
    orderBy: { createdAt: "asc" },
    select: { from: true, text: true },
  });

  return NextResponse.json({ messages });
}