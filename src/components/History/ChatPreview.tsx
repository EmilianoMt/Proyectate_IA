import Image from "next/image";

export default function ChatPreview({
  firstMessage,
  createdAt,
  onClick,
}: {
  firstMessage: string;
  createdAt: string | Date;
  onClick?: () => void;
}) {
  const date = new Date(createdAt);
  const formatted = date.toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div
      className="flex items-center gap-4 px-4 py-3 hover:bg-gray-100 rounded-xl cursor-pointer transition"
      onClick={onClick}
    >
      <Image
        src="/abrazo.png"
        alt="Chat"
        width={44}
        height={44}
        className="rounded-full"
      />
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-[#D9D9D9]  truncate">{firstMessage}</div>
      </div>
      <div className="text-xs text-gray-500 font-medium">{formatted}</div>
    </div>
  );
}