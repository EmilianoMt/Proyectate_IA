"use client";
import { Mic, ArrowUp } from "lucide-react";

export default function ChatInput({
  value,
  onChange,
  onSend,
}: {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
}) {
  return (
    <div className="w-full flex justify-center pb-6">
      <div className="flex items-center bg-[#5A5A5A] rounded-xl px-4 py-2 w-[150vh] max-w-full gap-2">
        <input
          className="flex-1 bg-transparent text-white placeholder:text-[#CFCFCF] outline-none"
          placeholder="¿En qué podemos ayudarte?"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSend()}
        />
        <button
          type="button"
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#6A6A6A] transition"
          tabIndex={-1}
        >
          <Mic size={18} color="#fff" />
        </button>
        <button
          onClick={onSend}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-[#EDEDED] hover:bg-[#d1d1d1] transition"
        >
          <ArrowUp size={18} color="#222" />
        </button>
      </div>
    </div>
  );
}