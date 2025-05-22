"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ChatPreview from "@/components/History/ChatPreview";
import { MessageCircle, ArrowLeft } from "lucide-react";
import Header from "@/components/Home/Header";

export default function History() {
  const [chats, setChats] = useState<
    { id: string; firstMessage: string; createdAt: string }[]
  >([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/chat/history", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setChats(data.chats || []));
  }, []);

  return (
    <>
      <button
        onClick={() => router.push("/Home")}
        className="p-2 rounded-full hover:bg-gray-200 transition absolute left-0 top-8 ml-4"
        aria-label="Volver"
      >
        <ArrowLeft size={28} className="text-[#D9D9D9]" />
      </button>
      <div className="max-w-md mx-auto py-8">
        <div
          className="relative mb-6 flex items-center"
          style={{ minHeight: 48 }}
        >
          <h1 className="text-2xl font-bold text-[#D9D9D9] mx-auto">
            Historial de Chats
          </h1>
        </div>
        <div className="flex flex-col gap-2">
          {chats.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[50vh]">
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
    </> 
  );
}
