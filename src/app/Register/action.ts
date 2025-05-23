"use server";

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

  try {
    const res = await fetch(`/api/auth/register`, {
      method: "POST",
      body: JSON.stringify({ email, name, lastName, phoneNumber, password }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    if (!res.ok) {
      return { error: data.error || "Error al registrar usuario." };
    }
    return { user: data };
  } catch {
    return { error: "Error en el servidor." };
  }
}