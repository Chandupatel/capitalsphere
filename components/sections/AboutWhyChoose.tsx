import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionKicker } from "@/components/ui/SectionKicker";
import { Button } from "@/components/ui/Button";
import { WHY_CHOOSE_US } from "@/constants/data";

export function AboutWhyChoose() {
  return (
    <section id="about" className="bg-surface py-20 sm:py-28">
      <Container className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionKicker>Who We Are</SectionKicker>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-navy-950 sm:text-4xl">
            Your Trusted Partner for Business <span className="text-gold-600">Growth</span>
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-slate-600">
            CapitalSphere is a one-stop business solutions company helping startups,
            entrepreneurs and enterprises with legal, financial and compliance
            solutions under one roof.
          </p>
          <Button href="#about" variant="primary" withArrow className="mt-7">
            Know More About Us
          </Button>

          <div className="relative mt-10 overflow-hidden rounded-2xl bg-navy-950 shadow-[var(--shadow-lift)]">
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 15% 20%, rgba(198,167,106,0.35), transparent 45%), radial-gradient(circle at 85% 80%, rgba(27,74,122,0.5), transparent 50%)",
              }}
              aria-hidden
            />
            <div className="relative flex items-center gap-6 px-7 py-8 sm:px-10 sm:py-10">
              <span className="flex size-20 shrink-0 items-center justify-center rounded-2xl bg-white/5 p-3 ring-1 ring-white/10 sm:size-24">
                <Image
                  src="/images/logo-mark.png"
                  alt="CapitalSphere emblem"
                  width={96}
                  height={86}
                  className="h-full w-full object-contain drop-shadow-lg"
                />
              </span>
              <div>
                <p className="font-display text-lg font-semibold leading-snug text-white sm:text-xl">
                  Capital Sphere Business Solution
                </p>
                <p className="mt-1.5 text-sm text-navy-100/65">Jaipur, Rajasthan &mdash; PAN India Service</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <SectionKicker>Why Choose CapitalSphere</SectionKicker>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {WHY_CHOOSE_US.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-4 rounded-xl border border-border bg-white p-5 transition-shadow duration-300 hover:shadow-[var(--shadow-card)]"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-navy-50 text-navy-800">
                  {item.icon}
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-navy-950">{item.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
