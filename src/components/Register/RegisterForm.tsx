"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError(null);
    setSuccess(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const name = formData.get("name") as string;
    const lastName = formData.get("lastName") as string;
    const phoneNumber = formData.get("phoneNumber") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (!email || !name || !lastName || !phoneNumber || !password || !confirmPassword) {
      setServerError("Todos los campos son obligatorios.");
      return;
    }
    if (password !== confirmPassword) {
      setServerError("Las contraseñas no coinciden.");
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({ email, name, lastName, phoneNumber, password }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (!res.ok) {
        setServerError(data.error || "Error al registrar usuario.");
      } else {
        setSuccess("¡Registro exitoso! Ahora puedes iniciar sesión.");
        setTimeout(() => {
          router.push("/Login");
        }, 2000);
      }
    } catch {
      setServerError("Error en el servidor.");
    }
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg border border-blue-300 w-full max-w-[120vh]">
      <h2 className="text-4xl text-center font-bold mb-6 text-black">
        Regístrate
      </h2>
      <form onSubmit={handleSubmit} className="space-y-8 w-full">
        <div className="w-full flex flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Nombre(s)
            </label>
            <input
              type="text"
              name="name"
              placeholder="Nombre"
              className="text-black mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Apellido(s)
            </label>
            <input
              type="text"
              name="lastName"
              placeholder="Apellido"
              className="text-black mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
        </div>
        <div className="w-full flex flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Correo electrónico
            </label>
            <input
              type="email"
              name="email"
              placeholder="example@gmail.com"
              className="text-black mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Teléfono
            </label>
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Ingrese un número de teléfono"
              className="text-black mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
        </div>
        <div className="w-full flex flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              placeholder="Ingrese una contraseña"
              className="text-black mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Confirmar contraseña
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirme su contraseña"
              className="text-black mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
        </div>
        {serverError && (
          <div className="text-red-500 text-center">{serverError}</div>
        )}
        {success && <div className="text-green-600 text-center">{success}</div>}
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-[60vh] bg-blue-500 text-white py-2 my-4 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Registrarme
          </button>
        </div>
      </form>
      <p className="text-center text-sm text-gray-600 mt-4">
        ¿Ya tienes cuenta?{" "}
        <Link href="/Login" className="text-blue-500 hover:underline">
          Inicia Sesión
        </Link>
      </p>
    </div>
  );
}