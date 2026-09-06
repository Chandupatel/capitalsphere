import { Container } from "@/components/ui/Container";
import { SectionKicker } from "@/components/ui/SectionKicker";
import { Button } from "@/components/ui/Button";
import { TestimonialCard } from "@/components/sections/TestimonialCard";
import { TESTIMONIALS } from "@/constants/data";

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
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>
      </Container>
    </section>
  );
}
