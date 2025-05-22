"use server";

import prisma from "@/libs/db";
import bcrypt from "bcryptjs";

export async function registerUser(formData: FormData) {
  const email = formData.get("email") as string;
  const name = formData.get("name") as string;
  const lastName = formData.get("lastName") as string;
  const phoneNumber = formData.get("phoneNumber") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!email || !name || !lastName || !phoneNumber || !password || !confirmPassword) {
    return { error: "Todos los campos son obligatorios." };
  }

  if (password !== confirmPassword) {
    return { error: "Las contraseñas no coinciden." };
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return { error: "El correo ya está registrado." };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { email, name, lastName, phoneNumber, password: hashedPassword },
  });

  // No devuelvas la contraseña
  const { password: _, ...userWithoutPassword } = user;

  return { success: true, user: userWithoutPassword };
}