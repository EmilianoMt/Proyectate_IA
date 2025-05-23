import Image from "next/image";
import { User } from "lucide-react";

interface CardEspecialistaProps {
  imgSrc?: string;
  nombre: string;
  direccion: string;
  telefono: string;
  dias: string;
  horario: string;
}

export default function CardEspecialista({
  imgSrc,
  nombre,
  direccion,
  telefono,
  dias,
  horario,
}: CardEspecialistaProps) {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-3xl shadow-xl flex flex-row items-center p-0 w-[540px] min-h-[180px] overflow-hidden border border-blue-200">
      <div className="flex flex-col items-center justify-center bg-white h-full px-4 py-6">
        <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-blue-300 shadow-md flex items-center justify-center bg-gray-100">
          {imgSrc ? (
            <Image
              src={imgSrc}
              alt={nombre}
              width={112}
              height={112}
              className="object-cover w-full h-full"
            />
          ) : (
            <User size={72} className="text-blue-300" />
          )}
        </div>
        <span className="mt-3 text-base font-semibold text-gray-700">{nombre}</span>
      </div>
      <div className="flex flex-col gap-1 w-full px-6 py-4">
        <span className="text-lg font-bold text-blue-900">{direccion}</span>
        <span className="text-sm text-gray-500 mb-2">¡Agenda tu cita en un solo click!</span>
        <div className="flex gap-4 items-center mb-1">
          <span className="text-base font-semibold text-purple-700">{horario}</span>
          <span className="text-xs text-gray-400">{dias}</span>
        </div>
        <span className="text-sm text-blue-600 font-semibold">
          <b>Tel:</b> {telefono}
        </span>
      </div>
    </div>
  );
}