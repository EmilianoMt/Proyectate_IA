"use client";

import OptionCard from "@/components/Home/OptionCard";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HomeClient({ userName }: { userName: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCreateChat = async () => {
    setLoading(true);
    const res = await fetch("/api/chat", {
      method: "POST",
      credentials: "include",
    });
    const data = await res.json();
    setLoading(false);
    if (data.chatId) {
      router.push(`/Chat/${data.chatId}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="flex gap-12">
        <h1 className="text-4xl font-bold mb-6 text-white">
          ¡Bienvenido, {userName ?? "usuario"}!
        </h1>
      </div>
      <div className="flex flex-col gap-8 items-center w-[80vh] h=[100vh]">
        <div className="flex flex-row gap-8">
          <OptionCard color="red" title="¿Cómo te sientes hoy?" to="/Quiz" />
          <OptionCard
            color="yellow"
            title="Mi Psicólogo virtual"
            onClick={handleCreateChat}
            loading={loading}
          />
        </div>
        <div className="flex flex-row gap-8">
          <OptionCard color="purple" title="Ayuda profesional" to="/Contact" />
          <OptionCard color="green" title="Mi día a día" to="/History" />
        </div>
      </div>
    </div>
  );
}