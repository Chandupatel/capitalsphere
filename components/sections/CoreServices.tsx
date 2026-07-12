import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionKicker } from "@/components/ui/SectionKicker";
import { SERVICES } from "@/constants/data";

export function CoreServices() {
  return (
    <section id="services" className="bg-white py-20 sm:py-28">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <SectionKicker align="center">What We Offer</SectionKicker>
          <h2 className="mt-4 font-display text-3xl font-bold text-navy-950 sm:text-4xl">
            Our Core Services
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <a
              key={service.id}
              href={service.href}
              className="group relative flex flex-col gap-4 rounded-2xl border border-border bg-white p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-transparent hover:shadow-[var(--shadow-lift)]"
            >
              <span className="flex size-13 w-fit items-center justify-center rounded-xl bg-navy-50 p-3.5 text-navy-800 transition-colors duration-300 group-hover:bg-navy-900 group-hover:text-gold-400">
                {service.icon}
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold text-navy-950">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{service.description}</p>
              </div>
              <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-600">
                Learn More
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
