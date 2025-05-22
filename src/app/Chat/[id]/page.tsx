"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ChatHeader from "@/components/Chat/ChatHeader";
import ChatMessages from "@/components/Chat/ChatMessages";
import ChatQuickReplies from "@/components/Chat/ChatQuickReplies";
import ChatInput from "@/components/Chat/ChatInput";

export default function ChatPage() {
  const router = useRouter();
  const { id: chatId } = useParams() as { id: string };

  const [messages, setMessages] = useState<
    { from: "user" | "bot"; text: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchHistory = async () => {
    if (!chatId) return;
    const res = await fetch(`/api/chat/history?chatId=${chatId}`, { credentials: "include" });
    const data = await res.json();
    if (data.messages) setMessages(data.messages);
  };

  useEffect(() => {
    fetchHistory();
  }, [chatId]);

  const handleSend = async (msg?: string) => {
    const text = msg || input.trim();
    if (!text || !chatId) return;
    setInput("");
    setLoading(true);

    await fetch("/api/chat/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ chatId, text }),
    });

    await fetchHistory();
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#262626] flex flex-col">
      <ChatHeader onBack={() => router.push("/Home")} />
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full gap-2 max-w-2xl h-[70vh] bg-transparent flex flex-col justify-center">
          <ChatMessages messages={messages} />
          <ChatQuickReplies options={[]} onSelect={handleSend} />
          <ChatInput value={input} onChange={setInput} onSend={() => handleSend()} />
          {loading && <div className="text-center text-white">Pensando...</div>}
        </div>
      </div>
    </div>
  );
}