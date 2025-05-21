import { HeartPulse, LogOut, User } from "lucide-react";

interface HeaderProps {
  userName: string;
  onLogout?: () => void;
}

export default function Header({ userName, onLogout }: HeaderProps) {
  return (
    <header className="w-full flex items-center justify-between bg-[#262626] px-8 py-3">
      <div className="flex items-center gap-2">
        <HeartPulse size={36} color="#57ABFF" />
        <span className="text-white font-semibold text-2xl">Proyéctate 2025</span>
      </div>
      <div className="flex items-center gap-6">
        <span className="text-white text-sm font-bold">{userName}</span>
        <button
          onClick={onLogout}
          className="flex items-center gap-2 border border-[#F0626E] text-[#F0626E] px-4 py-1 rounded-md hover:bg-[#F0626E] hover:text-white transition"
        >
          Cerrar sesión
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
}