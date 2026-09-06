"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ConsultationButton } from "@/components/consultation/ConsultationButton";
import { NAV_LINKS } from "@/constants/data";
import { PHONES } from "@/constants/contact";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
  const [phoneRevealed, setPhoneRevealed] = useState(false);
  const phoneRevealRef = useRef<HTMLDivElement>(null);

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

  // Close the revealed phone numbers on outside click / Escape (click is the
  // touch-friendly equivalent of hover, so it needs an explicit close path).
  useEffect(() => {
    if (!phoneRevealed) return;
    const onPointerDown = (e: MouseEvent) => {
      if (!phoneRevealRef.current?.contains(e.target as Node)) setPhoneRevealed(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPhoneRevealed(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [phoneRevealed]);

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-white/95 backdrop-blur transition-shadow duration-300 ${
        scrolled ? "shadow-[0_4px_20px_-8px_rgba(11,42,74,0.18)]" : ""
      }`}
    >
      <Container className="flex h-20 items-center justify-between gap-4">
        <Link href="#home" className="flex shrink-0 items-center gap-2.5">
          <Image
            src="/images/logo-mark.png"
            alt="CapitalSphere mark"
            width={44}
            height={40}
            className="h-9 w-auto sm:h-10"
            priority
          />
          <span className="flex flex-col leading-none">
            <span className="whitespace-nowrap font-display text-[17px] font-bold tracking-tight text-navy-900 sm:text-[19px]">
              Capital<span className="text-gold-600">Sphere</span>
            </span>
            <span className="mt-0.5 hidden whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-500 sm:block">
              Funding Today, Building Tomorrow
            </span>
          </span>
        </Link>

        <nav className="hidden items-center xl:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <div key={link.label} className="group relative">
              <a
                href={link.href}
                className="flex items-center gap-1 whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium text-navy-900/85 transition-colors hover:text-gold-600"
              >
                {link.label}
                {link.megaMenu && (
                  <ChevronDown
                    className="size-3.5 shrink-0 transition-transform duration-200 group-hover:rotate-180"
                    aria-hidden
                  />
                )}
              </a>
              {link.megaMenu && (
                <div className="invisible absolute left-1/2 top-full z-20 w-[min(92vw,820px)] -translate-x-1/2 translate-y-2 rounded-xl border border-border bg-white p-6 opacity-0 shadow-[var(--shadow-lift)] transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="grid grid-cols-5 gap-5">
                    {link.megaMenu.map((category) => (
                      <div key={category.title}>
                        <p className="mb-2 px-1 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                          {category.title}
                        </p>
                        <ul className="flex flex-col gap-0.5">
                          {category.items.map((item) => (
                            <li key={item.label}>
                              <a
                                href={item.href}
                                className="block rounded-lg px-1 py-1.5 text-[13px] leading-snug text-navy-900/80 transition-colors hover:bg-navy-50 hover:text-gold-600"
                              >
                                {item.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <div
            ref={phoneRevealRef}
            className="relative"
            onMouseEnter={() => setPhoneRevealed(true)}
            onMouseLeave={() => setPhoneRevealed(false)}
          >
            <button
              type="button"
              aria-label="Show phone numbers"
              aria-expanded={phoneRevealed}
              onClick={() => setPhoneRevealed((v) => !v)}
              className="flex size-10 items-center justify-center rounded-full border border-border text-navy-900 transition-colors hover:border-gold-500 hover:text-gold-600"
            >
              <Phone className="size-4" aria-hidden />
            </button>
            {phoneRevealed && (
              <div className="absolute right-0 top-full z-20 mt-2 w-56 translate-y-0 rounded-xl border border-border bg-white p-2 shadow-[var(--shadow-lift)]">
                {PHONES.map((phone) => (
                  <a
                    key={phone.tel}
                    href={phone.tel}
                    className="flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold text-navy-900 transition-colors hover:bg-navy-50 hover:text-gold-600"
                  >
                    <Phone className="size-3.5 shrink-0 text-gold-600" aria-hidden />
                    {phone.display}
                  </a>
                ))}
              </div>
            )}
          </div>
          <ConsultationButton variant="primary" size="sm" className="whitespace-nowrap">
            Get Free Consultation
          </ConsultationButton>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-navy-900 xl:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </Container>

      {mobileOpen && (
        <div className="max-h-[calc(100vh-5rem)] overflow-y-auto border-t border-border bg-white xl:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => (
              <div key={link.label} className="border-b border-border/70 py-1 last:border-none">
                <div className="flex w-full items-center justify-between rounded-md py-1 text-left">
                  <a
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 px-2 py-2.5 text-sm font-semibold text-navy-900"
                  >
                    {link.label}
                  </a>
                  {link.megaMenu && (
                    <button
                      type="button"
                      aria-label={`Toggle ${link.label} submenu`}
                      className="flex size-9 shrink-0 items-center justify-center text-navy-900"
                      onClick={() =>
                        setOpenMobileDropdown((v) => (v === link.label ? null : link.label))
                      }
                    >
                      <ChevronDown
                        className={`size-4 transition-transform ${openMobileDropdown === link.label ? "rotate-180" : ""}`}
                      />
                    </button>
                  )}
                </div>
                {link.megaMenu && openMobileDropdown === link.label && (
                  <div className="flex flex-col gap-3 pb-3 pl-4">
                    {link.megaMenu.map((category) => (
                      <div key={category.title}>
                        <p className="px-2 pb-1 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                          {category.title}
                        </p>
                        <div className="flex flex-col gap-0.5">
                          {category.items.map((item) => (
                            <a
                              key={item.label}
                              href={item.href}
                              onClick={() => setMobileOpen(false)}
                              className="block rounded-md px-2 py-2 text-sm text-slate-600 hover:text-gold-600"
                            >
                              {item.label}
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="mt-3 flex flex-col gap-3">
              {PHONES.map((phone) => (
                <a
                  key={phone.tel}
                  href={phone.tel}
                  className="flex items-center justify-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm font-semibold text-navy-900"
                >
                  <Phone className="size-4 text-gold-600" /> {phone.display}
                </a>
              ))}
              <ConsultationButton
                variant="primary"
                className="w-full"
                onBeforeOpen={() => setMobileOpen(false)}
              >
                Get Free Consultation
              </ConsultationButton>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
