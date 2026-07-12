import { Quote, Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionKicker } from "@/components/ui/SectionKicker";
import { Button } from "@/components/ui/Button";
import { TESTIMONIALS } from "@/constants/data";

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("");
}

export function Testimonials() {
  return (
    <section className="bg-navy-950 py-16 sm:py-20">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <SectionKicker tone="gold">Client Testimonials</SectionKicker>
            <h2 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">
              What Our Clients Say
            </h2>
          </div>
          <Button href="#testimonials" variant="ghost" withArrow>
            View All Testimonials
          </Button>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="flex flex-col gap-3.5 rounded-xl border border-white/10 bg-white/[0.04] p-5"
            >
              <div className="flex items-center justify-between">
                <Quote className="size-5 text-gold-500/70" />
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="size-3 fill-gold-500 text-gold-500" />
                  ))}
                </div>
              </div>
              <p className="text-[13px] leading-relaxed text-navy-100/85">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-auto flex items-center gap-2.5 pt-1">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-xs font-bold text-gold-500">
                  {initials(t.name)}
                </span>
                <div>
                  <p className="text-[13px] font-semibold text-white">{t.name}</p>
                  <p className="text-[11px] text-navy-100/55">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
