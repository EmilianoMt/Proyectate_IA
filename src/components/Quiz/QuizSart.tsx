"use client";
import Image from "next/image";

export default function QuizStart({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white rounded-xl p-8 shadow-lg max-w-xl w-full text-center">
        <h2 className="text-xl font-bold mb-4 text-black">
          Empecemos con un pequeño cuestionario sobre tu estado de ánimo
        </h2>
        <Image 
            src="/Psiq.webp"
            alt="Quiz"
            width={500}
            height={200}
            className="mb-4"/>
        <p className="mb-4 text-gray-700">
          Recuerda tomártelo con calma y responder honestamente. Tus respuestas serán almacenadas para ti en la sección de "Mi día a día" para que puedas tener tu propio registro. Recuerda que solo puedes hacer este cuestionario una vez al día.
        </p>
        <button
          className="bg-blue-400 text-white px-6 py-2 rounded-lg font-bold"
          onClick={onStart}
        >
          Comenzar cuestionario
        </button>
      </div>
    </div>
  );
}