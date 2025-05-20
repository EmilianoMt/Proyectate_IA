'use client';
import {
  BookOpenCheck,
  BotMessageSquare,
  ChartBar,
  CircleArrowRight,
  Drama,
} from "lucide-react";
import Link from "next/link";

type OptionCardProps = {
  color: "red" | "yellow" | "purple" | "green";
  title: string;
  description?: string;
  to: string;
};

const colorVariants = {
  red: "bg-[#F0626E]",
  yellow: "bg-[#FBC16A]",
  purple: "bg-[#8B8DF7]",
  green: "bg-[#3ED7B6]",
};

export default function OptionCard({
  color,
  title,
  description,
  to,
}: OptionCardProps) {
  const getIcon = () => {
    switch (color) {
      case "red":
        return <Drama size={36} color="#fff" />;
      case "yellow":
        return <BotMessageSquare size={36} color="#fff" />;
      case "purple":
        return <BookOpenCheck size={36} color="#fff" />;
      case "green":
        return <ChartBar size={36} color="#fff" />;
      default:
        return null;
    }
  };

  return (
    <Link
      href={to}
      className={`relative flex flex-col justify-between w-[260px] h-[160px] p-6 rounded-2xl shadow-md transition-transform hover:scale-105 active:scale-95 ${colorVariants[color]}`}
      style={{ textDecoration: "none" }}
    >
      <div>
        <h1 className="text-2xl font-semibold text-white mb-2">{title}</h1>
        {description && <p className="text-white text-sm mb-2">{description}</p>}
        <div className="mt-4">{getIcon()}</div>
      </div>
      <div className="absolute bottom-4 right-4 flex items-center justify-center w-8 h-8 rounded-full border border-white">
        <CircleArrowRight size={24} color="#fff" />
      </div>
    </Link>
  );
}