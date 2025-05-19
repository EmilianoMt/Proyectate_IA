'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para iniciar sesión
    console.log({ email, password });
  };

  return (
    
      <div className="bg-white p-8 rounded-lg shadow-lg border border-blue-300 w-full max-w-md">
        <h2 className="text-4xl font-bold mb-6 text-black">
          Te damos la bienvenida <span className="inline-block">♪</span>
        </h2>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Correo electrónico
            </label>
            <input
              type="email"
              placeholder="example@mail.com"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 my-4 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Iniciar sesión
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          ¿Nuevo?{' '}
          <Link href="/Register" className="text-blue-500 hover:underline">
            Regístrate
          </Link>
        </p>
      </div>
  );
}
