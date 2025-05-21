"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ChatHeader from "@/components/Chat/ChatHeader";
import ChatMessages from "@/components/Chat/ChatMessages";
import ChatQuickReplies from "@/components/Chat/ChatQuickReplies";
import ChatInput from "@/components/Chat/ChatInput";

export default function ChatPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<{ from: "user" | "bot"; text: string }[]>([
    { from: "bot", text: "¿Estás bien?" },
  ]);
  const [input, setInput] = useState("");
  const [quickReplies, setQuickReplies] = useState([
    "Cansado hoy",
    "Con mucho estrés",
    "Preocupado hoy",
  ]);

  const handleSend = (msg?: string) => {
    const text = msg || input.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { from: "user", text }]);
    setInput("");
    setQuickReplies([]);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Gracias por compartir. ¿Quieres hablar más al respecto?" },
      ]);
      setQuickReplies(["Sí", "No"]);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#262626] flex flex-col">
      <ChatHeader onBack={() => router.push("/Home")} />
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full gap-2 max-w-2xl h-[70vh] bg-transparent flex flex-col justify-center">
          <ChatMessages messages={messages} />
          <ChatQuickReplies options={quickReplies} onSelect={handleSend} />
          <ChatInput value={input} onChange={setInput} onSend={handleSend} />
        </div>
      </div>
    </div>
  );
}