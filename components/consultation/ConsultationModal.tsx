"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, X } from "lucide-react";
import { useConsultationModal } from "@/components/consultation/ConsultationModalProvider";

type Status = "idle" | "submitting" | "success" | "error";

const inputClasses =
  "w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-navy-950 placeholder:text-slate-400 transition-colors focus:border-gold-500 focus:outline-none";

export function ConsultationModal() {
  const { isOpen } = useConsultationModal();
  if (!isOpen) return null;
  return <ConsultationDialog />;
}

function ConsultationDialog() {
  const { close, context } = useConsultationModal();
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const previouslyFocused = document.activeElement as HTMLElement | null;
    firstFieldRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus();
    };
  }, [close]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      fullName: String(data.get("fullName") || ""),
      companyName: String(data.get("companyName") || ""),
      email: String(data.get("email") || ""),
      phone: String(data.get("phone") || ""),
      message: String(data.get("message") || ""),
      service: context ?? "", // which service card (if any) opened this modal
      website: String(data.get("website") || ""), // honeypot
    };

    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(json?.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="consultation-modal-title"
    >
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 bg-navy-950/60 backdrop-blur-sm"
        onClick={close}
      />

      <div
        ref={dialogRef}
        className="animate-fade-up relative flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white shadow-[var(--shadow-lift)]"
      >
        <div className="flex items-start justify-between border-b border-border px-6 py-5">
          <div>
            <h2 id="consultation-modal-title" className="font-display text-xl font-bold text-navy-950">
              {context ? `Enquire About ${context}` : "Book a Free Consultation"}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {context
                ? `Share a few details and our team will get back to you about ${context.toLowerCase()}.`
                : "Share a few details and our team will get back to you shortly."}
            </p>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="-mr-1.5 -mt-1.5 flex size-8 shrink-0 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-navy-50 hover:text-navy-900"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-6">
          {status === "success" ? (
            <div className="flex flex-col items-center gap-3 py-8 text-center">
              <CheckCircle2 className="size-12 text-emerald-500" />
              <h3 className="font-display text-lg font-semibold text-navy-950">Request sent!</h3>
              <p className="max-w-xs text-sm text-slate-500">
                Thank you for reaching out. A confirmation email is on its way, and our
                team will contact you shortly.
              </p>
              <button
                type="button"
                onClick={close}
                className="mt-2 rounded-full bg-navy-900 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
              >
                Close
              </button>
            </div>
          ) : (
            <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
              {/* Honeypot field — hidden from real users, visible to bots */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              <div>
                <label htmlFor="fullName" className="mb-1.5 block text-xs font-semibold text-navy-950">
                  Full Name <span className="text-gold-600">*</span>
                </label>
                <input
                  ref={firstFieldRef}
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  placeholder="Your full name"
                  className={inputClasses}
                />
              </div>

              <div>
                <label htmlFor="companyName" className="mb-1.5 block text-xs font-semibold text-navy-950">
                  Company Name
                </label>
                <input
                  id="companyName"
                  name="companyName"
                  type="text"
                  placeholder="Your company (optional)"
                  className={inputClasses}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-xs font-semibold text-navy-950">
                    Email Address <span className="text-gold-600">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@company.com"
                    className={inputClasses}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="mb-1.5 block text-xs font-semibold text-navy-950">
                    Phone Number <span className="text-gold-600">*</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="+91 96941 34403"
                    className={inputClasses}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="mb-1.5 block text-xs font-semibold text-navy-950">
                  Message <span className="text-gold-600">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  placeholder="Tell us a little about what you need help with"
                  className={`${inputClasses} resize-none`}
                />
              </div>

              {status === "error" && (
                <p className="rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-600">{errorMessage}</p>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-navy-900 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-navy-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "submitting" && <Loader2 className="size-4 animate-spin" />}
                {status === "submitting" ? "Sending…" : "Submit"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
