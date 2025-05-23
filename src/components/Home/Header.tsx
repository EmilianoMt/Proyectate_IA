"use client";
import { HeartPulse, LogOut } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface HeaderProps {
  userName: string;
}

export default function Header({ userName }: HeaderProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/Login");
  };

  return (
    <header className="w-full flex items-center justify-between bg-[#282828] px-8 py-3">
      <div className="flex items-center gap-2">
        <Image
          src="/abrazo.png"
          alt="Logo"
          width={45}
          height={45}
          className="rounded-full"
        />
        <span className="text-white font-semibold text-2xl">Future Health</span>
      </div>
      <div className="flex items-center gap-6">
        <span className="text-white text-sm font-bold">{userName}</span>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 border border-[#F0626E] text-[#F0626E] px-4 py-1 rounded-md hover:bg-[#F0626E] hover:text-white transition"
        >
          Cerrar sesión
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
} 