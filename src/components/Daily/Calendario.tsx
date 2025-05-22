'use client';
import { Smile, Frown, AlertTriangle, Meh, Zap, Angry } from 'lucide-react';

const emociones = [
  { nombre: 'Felicidad', icon: Smile, color: '#FFE066' },
  { nombre: 'Tristeza', icon: Frown, color: '#7EC8E3' },
  { nombre: 'Ansiedad', icon: AlertTriangle, color: '#F7A8E7' },
  { nombre: 'Preocupación', icon: Meh, color: '#B6F7A8' },
  { nombre: 'Sorpresa', icon: Zap, color: '#B8B8F7' },
  { nombre: 'Enojo', icon: Angry, color: '#FF914D' }
];

const dias = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];

export default function Calendario({ emocionesDelDia }: { emocionesDelDia: (string | null)[] }) {
  return (
    <div className="bg-white rounded-3xl p-8 md:p-14 w-full max-w-2xl text-center shadow-xl">
      <h1 className="text-2xl font-bold mb-4 text-gray-600">Mi día a día</h1>
      <p className="text-lg text-gray-700 mb-8">
        Te presentamos tu ruta semanal, en la que podrás consultar cómo han estado las cosas día a día durante tu semana.
      </p>
      <div className="flex justify-between items-center mb-8">
        {dias.map((dia, idx) => {
          const emocionNombre = emocionesDelDia[idx];
          const emocion = emociones.find(e => e.nombre === emocionNombre);
          return (
            <div key={idx} className="flex flex-col items-center">
              <span className="text-lg font-semibold text-gray-400">{dia}</span>
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mt-3"
                style={{
                  backgroundColor: emocion ? emocion.color : '#e5e7eb'
                }}
              >
                {emocion && (
                  <emocion.icon size={40} className="text-gray-700" />
                )}
              </div>
              {emocion && (
                <span className="text-xs mt-1 text-gray-500 font-medium">
                  {emocion.nombre}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}