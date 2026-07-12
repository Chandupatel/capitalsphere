import { Handshake, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function CtaBanner() {
  return (
    <section className="px-4 pb-4 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-[1280px] overflow-hidden rounded-3xl bg-navy-950">
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(circle at 85% 30%, rgba(198,167,106,0.28), transparent 55%), radial-gradient(circle at 10% 80%, rgba(27,74,122,0.5), transparent 50%)",
          }}
          aria-hidden
        />
        <Container className="relative flex flex-col items-center gap-8 py-14 text-center lg:flex-row lg:justify-between lg:text-left">
          <div className="flex items-center gap-5">
            <span className="hidden size-16 shrink-0 items-center justify-center rounded-2xl bg-gold-500/15 text-gold-500 sm:flex">
              <Handshake className="size-8" />
            </span>
            <div>
              <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
                Ready to Start Your Business Journey?
              </h2>
              <p className="mt-2 max-w-md text-sm text-navy-100/70">
                Get expert consultation and grow your business with CapitalSphere.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center gap-3.5 sm:flex-row">
            <Button href="#contact" variant="secondary" withArrow>
              Book Free Consultation
            </Button>
            <span className="text-xs font-semibold uppercase tracking-wide text-navy-100/50">Or</span>
            <Button href="tel:+919876543210" variant="ghost">
              <Phone className="size-4" /> Request Callback
            </Button>
          </div>
        </Container>
      </div>
    </section>
  );
}
