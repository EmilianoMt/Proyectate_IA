"use client";
import { useEffect, useRef } from "react";

export default function ChatMessages({
  messages,
}: {
  messages: { from: "user" | "bot"; text: string }[];
}) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col gap-4 px-8 py-4 flex-1 overflow-y-auto hide-scrollbar">
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`flex ${
            msg.from === "user" ? "justify-end" : "justify-start"
          }`}
        >
          {msg.from === "user" ? (
            <div className="rounded-xl px-4 py-2 max-w-[70%] text-sm bg-[#E0E0E0] text-[#222]">
              {msg.text}
            </div>
          ) : (
            <div className="max-w-[80%] text-sm text-[#F5F5F5] whitespace-pre-line">
              {msg.text}
            </div>
          )}
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
