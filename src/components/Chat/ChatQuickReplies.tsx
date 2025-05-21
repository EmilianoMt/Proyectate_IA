"use client";
export default function ChatQuickReplies({
  options,
  onSelect,
}: {
  options: string[];
  onSelect: (opt: string) => void;
}) {
  if (!options.length) return null;
  return (
    <div className="flex gap-2 justify-center mb-2">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onSelect(opt)}
          className="border border-[#3ED7B6] text-[#3ED7B6] px-3 py-1 rounded-full hover:bg-[#3ED7B6] hover:text-white transition"
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
