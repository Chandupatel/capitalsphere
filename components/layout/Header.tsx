"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { NAV_LINKS } from "@/constants/data";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-white/95 backdrop-blur transition-shadow duration-300 ${
        scrolled ? "shadow-[0_4px_20px_-8px_rgba(11,42,74,0.18)]" : ""
      }`}
    >
      <Container className="flex h-20 items-center justify-between gap-6">
        <Link href="#home" className="flex shrink-0 items-center gap-2.5">
          <Image
            src="/images/logo-mark.png"
            alt="CapitalSphere mark"
            width={44}
            height={40}
            className="h-10 w-auto"
            priority
          />
          <span className="flex flex-col leading-none">
            <span className="font-display text-[19px] font-bold tracking-tight text-navy-900">
              Capital<span className="text-gold-600">Sphere</span>
            </span>
            <span className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-500">
              Funding Today, Building Tomorrow
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <div key={link.label} className="group relative">
              <a
                href={link.href}
                className="flex items-center gap-1 rounded-md px-3.5 py-2 text-sm font-medium text-navy-900/85 transition-colors hover:text-gold-600"
              >
                {link.label}
                {link.children && <ChevronDown className="size-3.5 transition-transform duration-200 group-hover:rotate-180" aria-hidden />}
              </a>
              {link.children && (
                <div className="invisible absolute left-0 top-full z-20 w-64 translate-y-2 rounded-xl border border-border bg-white p-2 opacity-0 shadow-[var(--shadow-lift)] transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  {link.children.map((child) => (
                    <a
                      key={child.label}
                      href={child.href}
                      className="block rounded-lg px-3.5 py-2.5 text-sm text-navy-900/80 transition-colors hover:bg-navy-50 hover:text-gold-600"
                    >
                      {child.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="tel:+919876543210"
            className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold text-navy-900 transition-colors hover:border-gold-400"
          >
            <Phone className="size-4 text-gold-600" aria-hidden />
            +91 98765 43210
          </a>
          <Button href="#contact" variant="primary" size="sm">
            Get Free Consultation
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-navy-900 lg:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </Container>

      {mobileOpen && (
        <div className="max-h-[calc(100vh-5rem)] overflow-y-auto border-t border-border bg-white lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => (
              <div key={link.label} className="border-b border-border/70 py-1 last:border-none">
                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded-md px-2 py-3 text-left text-sm font-semibold text-navy-900"
                  onClick={() =>
                    link.children
                      ? setOpenMobileDropdown((v) => (v === link.label ? null : link.label))
                      : setMobileOpen(false)
                  }
                >
                  <a href={link.href} onClick={() => setMobileOpen(false)} className="flex-1">
                    {link.label}
                  </a>
                  {link.children && (
                    <ChevronDown
                      className={`size-4 shrink-0 transition-transform ${openMobileDropdown === link.label ? "rotate-180" : ""}`}
                    />
                  )}
                </button>
                {link.children && openMobileDropdown === link.label && (
                  <div className="flex flex-col gap-0.5 pb-2 pl-4">
                    {link.children.map((child) => (
                      <a
                        key={child.label}
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        className="rounded-md px-2 py-2 text-sm text-slate-600 hover:text-gold-600"
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="mt-3 flex flex-col gap-3">
              <a
                href="tel:+919876543210"
                className="flex items-center justify-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm font-semibold text-navy-900"
              >
                <Phone className="size-4 text-gold-600" /> +91 98765 43210
              </a>
              <Button href="#contact" variant="primary" className="w-full">
                Get Free Consultation
              </Button>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
