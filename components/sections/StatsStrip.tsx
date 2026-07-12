import { Container } from "@/components/ui/Container";
import { STATS } from "@/constants/data";

export function StatsStrip() {
  return (
    <div className="relative z-10 -mt-8 sm:-mt-10">
      <Container>
        <div className="grid grid-cols-2 gap-y-6 rounded-2xl border border-border bg-white px-6 py-7 shadow-[var(--shadow-soft)] sm:grid-cols-3 sm:px-10 lg:grid-cols-5 lg:gap-x-4">
          {STATS.map((stat, i) => (
            <div
              key={stat.id}
              className={`flex items-center gap-3 ${i !== STATS.length - 1 ? "lg:border-r lg:border-border lg:pr-4" : ""}`}
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gold-100 text-gold-600">
                {stat.icon}
              </span>
              <div className="leading-tight">
                <p className="font-display text-lg font-bold text-navy-950">{stat.value}</p>
                <p className="text-xs text-slate-500">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
