"use client";

import Link from "next/link";
import { useState } from "react";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para iniciar sesión
    console.log({ email, password, name, lastName, phone });
  };

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
              placeholder="Nombre"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Apellido(s)
            </label>
            <input
              type="text"
              placeholder="Apellido"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
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
              placeholder="example@gmail.com"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Teléfono
            </label>
            <input
              type="tel"
              placeholder="Ingrese un número de teléfono"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
              placeholder="Ingrese una contraseña"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              Confirmar contraseña
            </label>
            <input
              type="password"
              placeholder="Confirme su contraseña"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        </div>
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
