"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ChatPreview from "@/components/History/ChatPreview";
import { MessageCircle, ArrowLeft } from "lucide-react";
import Calendario from "@/components/Daily/Calendario";

export default function History() {
  const [chats, setChats] = useState<
    { id: string; firstMessage: string; createdAt: string }[]
  >([]);
  const [emocionesSemana, setEmocionesSemana] = useState<(string | null)[]>([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/chat/history", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setChats(data.chats || []));
    fetch("/api/quiz/week", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setEmocionesSemana(
          data.quizWeek || [null, null, null, null, null, null, null]
        );
      });
  }, []);

  return (
    <>
      <button
        onClick={() => router.push("/Home")}
        className="p-2 rounded-full hover:bg-gray-200 transition "
        aria-label="Volver"
      >
        <ArrowLeft size={28} className="text-[#D9D9D9]" />
      </button>
      <div className="min-h-screen flex flex-row bg-[#262626] items-center justify-center">
        {/* Panel izquierdo: Chats */}
        <div className="w-1/2 max-w-lg px-8 py-8 flex flex-col justify-center">
          <div
            className="mb-6 flex items-center gap-2 -mt-32"
            style={{ minHeight: 48 }}
          >
            <h1 className="text-2xl font-bold text-[#D9D9D9] mx-auto">
              Historial de Chats
            </h1>
          </div>
          <div className="flex flex-col gap-2">
            {chats.length === 0 ? (
              <div className="flex flex-col items-center justify-start ">
                <MessageCircle size={64} className="text-[#bdbdbd] mb-4" />
                <span className="text-gray-500 text-lg font-medium">
                  No tienes chats aún
                </span>
              </div>
            ) : (
              chats.map((chat) => (
                <ChatPreview
                  key={chat.id}
                  firstMessage={chat.firstMessage}
                  createdAt={chat.createdAt}
                  onClick={() => router.push(`/Chat/${chat.id}`)}
                />
              ))
            )}
          </div>
        </div>
        {/* Panel derecho: Calendario de emociones */}
        <div className="flex-1 flex items-center justify-center">
          <Calendario emocionesDelDia={emocionesSemana} />
        </div>
      </div>
    </>
  );
}
