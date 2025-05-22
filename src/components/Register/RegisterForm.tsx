"use client";

import Link from "next/link";
import { useState } from "react";
import { registerUser } from "@/app/Register/action";

export default function RegisterForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function action(formData: FormData) {
    setServerError(null);
    setSuccess(null);
    const res = await registerUser(formData);
    if (res?.error) {
      setServerError(res.error);
    } else {
      setSuccess("¡Registro exitoso! Ahora puedes iniciar sesión.");
    }
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg border border-blue-300 w-full max-w-[120vh]">
      <h2 className="text-4xl text-center font-bold mb-6 text-black">
        Regístrate
      </h2>
      <form action={action} className="space-y-8 w-full">
        <div className="w-full flex flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Nombre(s)
            </label>
            <input
              type="text"
              name="name"
              placeholder="Nombre"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
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
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
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
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
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
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
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
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
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
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
        </div>
        {serverError && (
          <div className="text-red-500 text-center">{serverError}</div>
        )}
        {success && (
          <div className="text-green-600 text-center">{success}</div>
        )}
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