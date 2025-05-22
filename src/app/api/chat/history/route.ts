import { NextResponse } from "next/server";
import prisma from "@/libs/db";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const chatId = searchParams.get("chatId");

  // Si hay chatId, devuelve los mensajes de ese chat
  if (chatId) {
    const messages = await prisma.message.findMany({
      where: { chatId },
      orderBy: { createdAt: "asc" },
      select: { from: true, text: true },
    });
    return NextResponse.json({ messages });
  }

  // Si NO hay chatId, devuelve el historial de chats del usuario autenticado
  const token = (await cookies()).get("Auth_psiq")?.value;
  if (!token) return NextResponse.json({ chats: [] });

  const { payload } = await jwtVerify(token, secret);
  const userId = payload.userId as string;

  const chats = await prisma.chat.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: {
      messages: {
        orderBy: { createdAt: "asc" },
        take: 1,
      },
    },
  });

  return NextResponse.json({
    chats: chats.map((chat: any) => ({
      id: chat.id,
      firstMessage: chat.messages[0]?.text ?? "(Sin mensajes)",
      createdAt: chat.createdAt,
    })),
  });
}