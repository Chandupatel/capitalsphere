"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Quote, Star, X } from "lucide-react";
import type { Testimonial } from "@/types";

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("");
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial: t }: TestimonialCardProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!modalOpen) return;
    document.body.style.overflow = "hidden";
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus();
    };
  }, [modalOpen]);

  const stars = (sizeClass: string) =>
    Array.from({ length: t.rating }).map((_, i) => (
      <Star key={i} className={`${sizeClass} fill-gold-500 text-gold-500`} />
    ));

  return (
    <>
      {/* Preview card — quote is clamped to 4 lines, full text lives in the modal */}
      <div className="flex flex-col gap-3.5 rounded-xl border border-white/10 bg-white/[0.04] p-5">
        <div className="flex items-center justify-between">
          <Quote className="size-5 text-gold-500/70" />
          <div className="flex gap-0.5">{stars("size-3")}</div>
        </div>
        <p className="line-clamp-4 text-[13px] leading-relaxed text-navy-100/85">
          &ldquo;{t.quote}&rdquo;
        </p>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          aria-haspopup="dialog"
          className="inline-flex w-fit items-center gap-1 text-xs font-semibold text-gold-500 transition-colors hover:text-gold-400"
        >
          View More
          <ArrowRight className="size-3" aria-hidden />
        </button>
        <div className="mt-auto flex items-center gap-2.5 pt-1">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-xs font-bold text-gold-500">
            {initials(t.name)}
          </span>
          <div>
            <p className="text-[13px] font-semibold text-white">{t.name}</p>
            <p className="text-[11px] text-navy-100/55">{t.role}</p>
          </div>
        </div>
      </div>

      {modalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby={`testimonial-modal-title-${t.id}`}
        >
          <button
            type="button"
            aria-label="Close dialog"
            className="absolute inset-0 bg-navy-950/60 backdrop-blur-sm"
            onClick={() => setModalOpen(false)}
          />

          <div className="animate-fade-up relative flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white shadow-[var(--shadow-lift)]">
            <div className="flex items-start justify-between gap-4 border-b border-border px-6 py-5">
              <div className="flex items-center gap-2.5">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gold-100 text-gold-600">
                  <Quote className="size-4" />
                </span>
                <h2
                  id={`testimonial-modal-title-${t.id}`}
                  className="font-display text-lg font-bold text-navy-950"
                >
                  Client Testimonial
                </h2>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setModalOpen(false)}
                aria-label="Close"
                className="-mr-1.5 -mt-1.5 flex size-8 shrink-0 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-navy-50 hover:text-navy-900"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="overflow-y-auto px-6 py-6">
              <div className="mb-3 flex gap-0.5">{stars("size-4")}</div>
              <p className="text-sm leading-relaxed text-slate-600">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-gold-100 text-sm font-bold text-gold-600">
                  {initials(t.name)}
                </span>
                <div>
                  <p className="text-sm font-semibold text-navy-950">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
