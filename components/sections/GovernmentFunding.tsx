import { Container } from "@/components/ui/Container";
import { SectionKicker } from "@/components/ui/SectionKicker";
import { ConsultationButton } from "@/components/consultation/ConsultationButton";
import { FUNDING_PROGRAMS } from "@/constants/data";

export function GovernmentFunding() {
  return (
    <section id="funding" className="bg-navy-950 py-16 sm:py-20">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.85fr_1.4fr] lg:items-center">
          <div>
            <SectionKicker tone="gold">Funding Opportunities</SectionKicker>
            <h2 className="mt-4 font-display text-2xl font-bold leading-tight text-white sm:text-3xl">
              Explore Government <span className="text-gold-500">Funding</span> Programs
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-navy-100/70">
              We help you identify, apply and secure the right funding &amp; grants to
              accelerate your business growth.
            </p>
            <ConsultationButton variant="secondary" withArrow className="mt-6">
              Check Funding Eligibility
            </ConsultationButton>
          </div>

          <div className="-mx-1 flex snap-x gap-4 overflow-x-auto px-1 pb-2 sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-5">
            {FUNDING_PROGRAMS.map((program) => (
              <div
                key={program.id}
                className="group flex w-[190px] shrink-0 snap-start flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-colors duration-300 hover:border-gold-500/50 hover:bg-white/[0.07] sm:w-auto"
              >
                <span className="flex size-11 items-center justify-center rounded-lg bg-gold-500/15 text-gold-500">
                  {program.icon}
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-white">{program.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-navy-100/60">{program.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
