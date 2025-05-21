"use client";
import { ArrowLeft, HeartPulse } from "lucide-react";

export default function ChatHeader({ onBack }: { onBack?: () => void }) {
  return (
    <div className="flex items-center gap-4 px-6 pt-6 pb-2">
      <button onClick={onBack} className="text-white">
        <ArrowLeft size={24} />
      </button>
      <div className="flex-1 flex justify-center">
        <HeartPulse size={36} color="#57ABFF" />
      </div>
    </div>
  );
}
