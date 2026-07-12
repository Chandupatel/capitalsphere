import { Container } from "@/components/ui/Container";
import { SectionKicker } from "@/components/ui/SectionKicker";
import { PROCESS_STEPS } from "@/constants/data";

export function ProcessSteps() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <SectionKicker align="center">Our Process</SectionKicker>
          <h2 className="mt-4 font-display text-3xl font-bold text-navy-950 sm:text-4xl">
            Simple Steps, Successful Outcomes
          </h2>
        </div>

        <div className="relative mt-16 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-6 lg:gap-y-0">
          <div
            className="pointer-events-none absolute left-[8%] right-[8%] top-8 hidden border-t-2 border-dashed border-gold-400/50 lg:block"
            aria-hidden
          />
          {PROCESS_STEPS.map((step) => (
            <div key={step.id} className="relative flex flex-col items-center text-center">
              <div className="relative z-10 flex size-16 items-center justify-center rounded-full bg-navy-900 text-gold-400 shadow-[0_10px_25px_-8px_rgba(11,42,74,0.5)]">
                {step.icon}
                <span className="absolute -right-1 -top-1 flex size-6 items-center justify-center rounded-full bg-gold-500 text-[10px] font-bold text-navy-950">
                  {step.step}
                </span>
              </div>
              <h3 className="mt-4 text-sm font-semibold text-navy-950">{step.title}</h3>
              <p className="mt-1.5 max-w-[10rem] text-xs leading-relaxed text-slate-500">{step.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
