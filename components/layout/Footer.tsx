import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { NewsletterForm } from "@/components/layout/NewsletterForm";
import { FOOTER_LINKS } from "@/constants/data";

const SOCIALS = [
  { initials: "f", label: "Facebook" },
  { initials: "ig", label: "Instagram" },
  { initials: "in", label: "LinkedIn" },
  { initials: "x", label: "Twitter / X" },
  { initials: "yt", label: "YouTube" },
];

export function Footer() {
  return (
    <footer id="contact" className="bg-navy-950 text-navy-100">
      <Container className="grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1.1fr]">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2.5">
            <Image
              src="/images/logo-mark.png"
              alt="CapitalSphere mark"
              width={40}
              height={36}
              className="h-9 w-auto"
            />
            <span className="font-display text-lg font-bold text-white">
              Capital<span className="text-gold-500">Sphere</span>
            </span>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-navy-100/70">
            Your trusted partner for Legal, Financial and Business Growth solutions.
          </p>
          <div className="flex gap-2 pt-2">
            {SOCIALS.map(({ initials, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="flex size-9 items-center justify-center rounded-full border border-white/15 text-[11px] font-bold uppercase text-navy-100/80 transition-colors hover:border-gold-500 hover:text-gold-500"
              >
                {initials}
              </a>
            ))}
          </div>
        </div>

        {FOOTER_LINKS.map((group) => (
          <div key={group.title}>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">{group.title}</h3>
            <ul className="flex flex-col gap-2.5">
              {group.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-navy-100/70 transition-colors hover:text-gold-500"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-white">Contact Us</h3>
          <ul className="flex flex-col gap-3 text-sm text-navy-100/70">
            <li className="flex items-start gap-2.5">
              <Phone className="mt-0.5 size-4 shrink-0 text-gold-500" />
              +91 98765 43210
            </li>
            <li className="flex items-start gap-2.5">
              <Mail className="mt-0.5 size-4 shrink-0 text-gold-500" />
              info@capitalsphere.in
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-gold-500" />
              Jaipur, Rajasthan, India
            </li>
          </ul>
          <h3 className="mb-3 mt-6 text-sm font-semibold uppercase tracking-wide text-white">Newsletter</h3>
          <NewsletterForm />
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-3 py-5 text-xs text-navy-100/60 sm:flex-row">
          <p>© {new Date().getFullYear()} CapitalSphere. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-gold-500">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gold-500">
              Terms &amp; Conditions
            </a>
          </div>
        </Container>
      </div>
    </footer>
  );
}
