"use server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import prisma from "@/libs/db";
import { Chat } from "@/types/chat";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function getUserChats() {
  const token = (await cookies()).get("Auth_psiq")?.value;
  if (!token) return [];

  const { payload } = await jwtVerify(token, secret);
  const userId = payload.userId as string;
  console.log("UserId", userId);

  // Busca todos los chats del usuario
  const chats = await prisma.chat.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: {
      messages: {
        orderBy: { createdAt: "asc" },
        take: 1, // Solo el primer mensaje
      },
    },
  });

  // Formatea para el frontend
  return chats.map((chat: Chat) => ({
    id: chat.id,
    firstMessage: chat.messages[0]?.text ?? "(Sin mensajes)",
    createdAt: chat.createdAt,
  }));
}