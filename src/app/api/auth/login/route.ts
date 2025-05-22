import { NextResponse } from "next/server";
import prisma from "@/libs/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Correo y contraseña son obligatorios." },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json(
        { error: "Credenciales inválidas." },
        { status: 401 }
      );
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json(
        { error: "Credenciales inválidas." },
        { status: 401 }
      );
    }

    const payload = {
      userId: user.id,
      email: user.email,
      name: user.name,
      lastName: user.lastName,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: "7d",
    });

    const response = NextResponse.json(
      { user: { ...user, password: undefined } },
      { status: 200 }
    );
    response.cookies.set("Auth_psiq", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Error en el servidor." },
      { status: 500 }
    );
  }
}
