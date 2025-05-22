import { NextResponse } from "next/server";
import prisma from "@/libs/db";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log(body);
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: "Correo y contraseña son obligatorios." }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "Credenciales inválidas." }, { status: 401 });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({ error: "Credenciales inválidas." }, { status: 401 });
    }

    const { password: _, ...userWithoutPassword } = user;
    return NextResponse.json(userWithoutPassword, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error en el servidor." }, { status: 500 });
  }
}