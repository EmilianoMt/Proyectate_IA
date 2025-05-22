"use client";
const scaleColors = [
  "bg-lime-500 text-white",   // 1
  "bg-lime-400 text-white",   // 2
  "bg-lime-300 text-white",   // 3
  "bg-yellow-300 text-white", // 4
  "bg-yellow-500 text-white", // 5
  "bg-orange-400 text-white", // 6
  "bg-orange-500 text-white", // 7
  "bg-red-500 text-white",    // 8
  "bg-red-600 text-white",    // 9
  "bg-red-800 text-white",    // 10
];

export default function QuizQuestion({
  question,
  step,
  total,
  value,
  onSelect,
  onNext,
  onBack,
}: {
  question: string;
  step: number;
  total: number;
  value?: number;
  onSelect: (val: number) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white rounded-xl p-12 shadow-lg max-w-2xl w-full text-center">
        <h3 className="text-lg font-bold text-black mb-4">Pregunta {step}</h3>
        <p className="mb-6 text-gray-900">{question}</p>
        <div className="flex gap-2 justify-center mb-6 flex-wrap">
          {[...Array(10)].map((_, i) => (
            <button
              key={i}
              className={`rounded-full w-12 h-12 font-bold text-lg transition
                ${scaleColors[i]}
                ${value === i + 1 ? "ring-4 ring-black/30 scale-110" : ""}
              `}
              onClick={() => onSelect(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <div className="flex justify-between">
          <button
            className="bg-red-400 text-white px-4 py-2 rounded-lg"
            onClick={onBack}
            disabled={step === 1}
          >
            Atrás
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg"
            onClick={onNext}
            disabled={value == null}
          >
            {step < total ? "Siguiente" : "Finalizar"}
          </button>
        </div>
      </div>
    </div>
  );
}