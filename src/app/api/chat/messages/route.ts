import { NextResponse } from "next/server";
import prisma from "@/libs/db";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function POST(request: Request) {
  const { chatId, text } = await request.json();
  console.log("ChatId", chatId);
    console.log("Texto", text); 

  const token = (await cookies()).get("Auth_psiq")?.value;
  if (!token)
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  const { payload } = await jwtVerify(token, secret);

  await prisma.message.create({
    data: {
      chatId,
      from: "user",
      text,
    },
  });

  const aiRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "openai/gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "Eres un psicólogo virtual profesional. Responde de manera empática, profesional y útil a las inquietudes emocionales y personales del usuario.",
        },
        { role: "user", content: text },
      ],
    }),
  });
  const aiData = await aiRes.json();
  const aiText = aiData.choices?.[0]?.message?.content || "No response";

  await prisma.message.create({
    data: {
      chatId,
      from: "bot",
      text: aiText,
    },
  });

  return NextResponse.json({ aiText }, { status: 200 });
}
