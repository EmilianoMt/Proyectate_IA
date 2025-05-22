"use client";
import { ArrowLeft, HeartPulse } from "lucide-react";
import Image from "next/image";

export default function ChatHeader({ onBack }: { onBack?: () => void }) {
  return (
    <div className="flex items-center gap-4 px-6 pt-6 pb-2">
      <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-200 transition absolute left-0 top-7 ml-4 text-white">
        <ArrowLeft size={24} />
      </button>
      <div className="flex-1 flex justify-center">
           <Image
                  src="/abrazo.png"
                  alt="Logo"
                  width={46}
                  height={46}
                  className="rounded-full"/>
        {/* <HeartPulse size={36} color="#57ABFF" /> */}
      </div>
    </div>
  );
}
