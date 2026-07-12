interface SectionKickerProps {
  children: string;
  align?: "left" | "center";
  tone?: "gold" | "navy";
}

export function SectionKicker({
  children,
  align = "left",
  tone = "gold",
}: SectionKickerProps) {
  return (
    <div
      className={`flex items-center gap-3 ${align === "center" ? "justify-center" : "justify-start"}`}
    >
      <span className="h-px w-8 bg-gold-500" aria-hidden />
      <span
        className={`text-xs font-bold uppercase tracking-[0.18em] ${
          tone === "gold" ? "text-gold-600" : "text-navy-100"
        }`}
      >
        {children}
      </span>
    </div>
  );
}
