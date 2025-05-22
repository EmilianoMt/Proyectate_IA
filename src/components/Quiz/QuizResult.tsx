import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BotMessageSquare, BookOpenCheck, ArrowLeft } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const labels = [
  "Felicidad",
  "Tristeza",
  "Ansiedad",
  "Preocupación",
  "Sorpresa",
  "Enojo",
];

const barColors = [
  "#FFE066", // Felicidad (amarillo)
  "#7EC8E3", // Tristeza (azul)
  "#F7A8E7", // Ansiedad (rosa)
  "#B6F7A8", // Preocupación (verde)
  "#B8B8F7", // Sorpresa (lila)
  "#FF914D", // Enojo (naranja)
];

export default function QuizResult({
  answers,
  note,
}: {
  answers: number[];
  note: string;
}) {
  const router = useRouter();
  const [notes, setNotes] = useState(
    "Hoy hice sentir mal a mi perro porque le pisé la cola :("
  );
  const fecha = new Date().toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Estado de ánimo",
        data: answers.map((v) => (v ? (v / 10) * 100 : 0)),
        backgroundColor: barColors,
        borderRadius: 8,
        barPercentage: 0.7,
        categoryPercentage: 0.7,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx: any) => `${ctx.parsed.y}%`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: (tickValue: string | number) => `${tickValue}%`,
          color: "#222",
        },
        grid: { color: "#eee" },
      },
      x: {
        ticks: {
          color: "#222",
          callback: function (value: string | number, index: number) {
            return labels[index];
          },
        },
        grid: { display: false },
      },
    },
  };

  return (
    <>
      <button
        onClick={() => router.push("/Home")}
        className="p-2 rounded-full hover:bg-gray-200 transition absolute left-0 top-7 ml-4 text-white"
      >
        <ArrowLeft size={24} />
      </button>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="bg-white rounded-xl p-8 shadow-lg max-w-4xl w-full">
          <h2 className="text-2xl text-black font-semibold mb-6 text-center">
            Resumen de tu estado de ánimo actual
          </h2>
          <div className="flex flex-row gap-8 items-start justify-center">
            {/* Gráfica */}
            <div className="flex-1 min-w-0">
              <Bar data={data} options={options} height={260} />
            </div>
            {/* Panel lateral */}
            <div className="w-[320px] flex flex-col gap-4">
              <div className="text-left mb-2">
                <span className="font-bold text-lg text-gray-900 block mb-1">
                  {fecha}
                </span>
                <span className="text-sm text-gray-700 font-semibold">
                  Tus notas:
                </span>
                <textarea
                  className="w-full mt-1 border border-gray-300 rounded-md p-2 text-sm text-black resize-none"
                  rows={4}
                  value={note}
                  readOnly
                />
              </div>
              <button
                className="w-full h-[10vh] flex items-center justify-center gap-2 bg-[#79C4FF] hover:bg-[#255E8A] text-white py-2 rounded-lg font-semibold text-base transition-colors"
                onClick={() => router.push("/Home")}
              >
                <BotMessageSquare size={22} />
                Consultar tu psicólogo virtual
              </button>
              <button
                className="w-full h-[10vh] flex items-center justify-center gap-2 bg-[#7C7FDD] hover:bg-[#3A3D94] text-white py-2 rounded-lg font-semibold text-base transition-colors"
                onClick={() => router.push("/Home")}
              >
                <BookOpenCheck size={22} />
                Consultar un profesional
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
