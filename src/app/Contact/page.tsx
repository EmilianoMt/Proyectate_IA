"use client";
import CardEspecialista from "@/components/Contact/CardEspecialista";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Contact() {
  const router = useRouter();
  return (
    <>
      <button
        onClick={() => router.push("/Home")}
        className="p-2 rounded-full hover:bg-gray-200 transition absolute left-0 top-9 ml-4 text-white"
      >
        <ArrowLeft size={24} />
      </button>
      <div className="flex flex-col items-center py-10">
        <h2 className="text-3xl font-bold text-white mb-10">Profesionales</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <CardEspecialista
            nombre="Dr. Linda Isea"
            direccion="Medanta Hospital, CDMX"
            telefono="55 1234 5678"
            dias="Lunes a Viernes"
            horario="10:00 - 18:00"
          />
          <CardEspecialista
            nombre="Dra. Ana Pérez"
            direccion="Clínica Bienestar, Monterrey"
            telefono="81 8765 4321"
            dias="Martes y Jueves"
            horario="09:00 - 15:00"
          />
          <CardEspecialista
            nombre="Dr. Carlos Gómez"
            direccion="Centro Integral, Guadalajara"
            telefono="33 9876 5432"
            dias="Lunes, Miércoles y Viernes"
            horario="11:00 - 17:00"
          />
          <CardEspecialista
            nombre="Dra. Sofía Ruiz"
            direccion="Salud Mental, Puebla"
            telefono="22 1122 3344"
            dias="Sábados"
            horario="10:00 - 14:00"
          />
        </div>
      </div>
    </>
  );
}