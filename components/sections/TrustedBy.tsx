import { Container } from "@/components/ui/Container";
import { TRUSTED_BY } from "@/constants/data";

export function TrustedBy() {
  const loop = [...TRUSTED_BY, ...TRUSTED_BY];

  return (
    <section className="border-y border-border bg-surface py-10">
      <Container>
        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
          Trusted by 10,000+ businesses across India
        </p>
      </Container>
      <div className="overflow-hidden">
        <div className="flex w-max animate-marquee items-center gap-16">
          {loop.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="shrink-0 text-xl font-bold tracking-tight text-navy-900/40 sm:text-2xl"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
