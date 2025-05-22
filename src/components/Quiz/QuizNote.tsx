"use client";
import { useState } from "react";

export default function QuizNote({
  note,
  setNote,
  onNext,
  onBack,
}: {
  note: string;
  setNote: (val: string) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white rounded-xl p-8 shadow-lg max-w-xl w-full text-center">
        <h3 className="text-lg text-black font-semibold mb-2">Algo más por decir (Opcional)</h3>
        <h2 className="text-2xl text-gray-800 font-bold mb-6">Deja una nota para ti</h2>
        <textarea
          className="w-full border border-gray-400 rounded-md p-2 text-sm resize-none mb-2"
          rows={5}
          maxLength={300}
          value={note}
          onChange={e => setNote(e.target.value)}
        />
        <div className="text-right text-xs text-gray-500 mb-4">{note.length}/300</div>
        <div className="flex justify-center gap-6">
          <button
            className="bg-red-400 text-white px-8 py-2 rounded-lg font-bold"
            onClick={onBack}
          >
            Atrás
          </button>
          <button
            className="bg-green-500 text-white px-8 py-2 rounded-lg font-bold"
            onClick={onNext}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
}