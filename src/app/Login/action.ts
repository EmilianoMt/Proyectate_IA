"use server";

export async function loginUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;


  if (!email || !password) {
    return { error: "Correo y contraseña son obligatorios." };
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    if (!res.ok) {
      return { error: data.error || "Error al iniciar sesión." };
    }
    return { user: data };
  } catch {
    return { error: "Error en el servidor." };
  }
}