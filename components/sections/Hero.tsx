import Image from "next/image";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-white pb-20 pt-14 sm:pb-24 sm:pt-20">
      {/* ambient dotted-globe texture */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 opacity-[0.35] lg:block"
        style={{
          backgroundImage: "radial-gradient(var(--color-navy-100) 1.4px, transparent 1.4px)",
          backgroundSize: "18px 18px",
          maskImage: "radial-gradient(ellipse 70% 70% at 70% 40%, black 40%, transparent 80%)",
        }}
        aria-hidden
      />

      <Container className="relative grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
        <div className="animate-fade-up">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold-400/60 bg-gold-100/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-gold-600">
            Trusted by 500+ businesses across India
          </div>
          <h1 className="text-balance font-display text-4xl font-bold leading-[1.12] tracking-tight text-navy-950 sm:text-5xl lg:text-[3.4rem]">
            Empowering Businesses with Smart{" "}
            <span className="text-gold-600">Legal &amp; Financial</span> Solutions
          </h1>
          <p className="mt-6 max-w-lg text-balance text-base leading-relaxed text-slate-600 sm:text-lg">
            From company registration to government funding, we help entrepreneurs launch,
            grow and scale their businesses with confidence.
          </p>
          <div className="mt-8 flex flex-col gap-3.5 sm:flex-row">
            <Button href="#contact" variant="primary" withArrow>
              Get Started
            </Button>
            <Button href="#services" variant="outline-light">
              Explore Services
            </Button>
          </div>
        </div>

        <div className="relative mx-auto flex w-full max-w-md items-center justify-center py-6 lg:max-w-none">
          {/* radial glow */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(circle at 50% 42%, rgba(198,167,106,0.18), transparent 62%)",
            }}
            aria-hidden
          />

          {/* podium base beneath the wordmark */}
          <div className="absolute bottom-[6%] h-8 w-[58%] rounded-full bg-navy-900/90 blur-[1px]" />
          <div className="absolute bottom-[11%] h-2.5 w-[48%] rounded-full bg-gold-500" />

          <TrendingUp
            className="absolute right-[6%] top-[4%] size-10 text-gold-500 drop-shadow-sm sm:size-12"
            strokeWidth={1.75}
            aria-hidden
          />

          {/* full logo — icon + wordmark, always shown in full, never cropped */}
          <div className="relative z-10 w-[82%] sm:w-[70%] lg:w-[78%]">
            <Image
              src="/images/logo-full.png"
              alt="CapitalSphere — Funding Today, Building Tomorrow"
              width={1059}
              height={760}
              className="h-auto w-full object-contain drop-shadow-[0_18px_30px_rgba(11,42,74,0.28)]"
              priority
            />
          </div>

          {/* floating stat chip */}
          <div className="absolute left-0 top-2 flex items-center gap-2 rounded-2xl border border-border bg-white px-4 py-3 shadow-[var(--shadow-card)] sm:left-2">
            <ArrowUpRight className="size-4 text-gold-600" />
            <div className="leading-tight">
              <p className="text-sm font-bold text-navy-950">₹50+ Cr</p>
              <p className="text-[11px] text-slate-500">Funding Assisted</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
