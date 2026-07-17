"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Cone, Mail, RefreshCw } from "lucide-react";
import { MAINTENANCE_CONTACT_EMAIL } from "@/constants/contact";

const STORAGE_KEY = "csbs_maintenance_notice_seen";

type Phase = "checking" | "visible" | "dismissed";

export function MaintenanceModal() {
  const [phase, setPhase] = useState<Phase>("checking");

  useEffect(() => {
    let seen = false;
    try {
      seen = window.localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      // localStorage unavailable (privacy mode, etc.) — fail open rather than
      // permanently blocking the site.
      seen = true;
    }
    setPhase(seen ? "dismissed" : "visible"); // eslint-disable-line react-hooks/set-state-in-effect -- localStorage is only readable client-side; this is a one-time sync on mount, not a render loop.
  }, []);

  useEffect(() => {
    if (phase !== "visible") return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [phase]);

  const dismiss = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore — worst case the notice reappears next visit
    }
    setPhase("dismissed");
  };

  // "checking" briefly blocks the page too, so nothing is clickable before
  // we know whether the notice needs to show (avoids a flash of interactivity).
  if (phase === "dismissed") return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="maintenance-modal-title"
      // No onClick here on purpose: clicking the backdrop must not dismiss.
    >
      <div className="absolute inset-0 bg-navy-950/70 backdrop-blur-sm" />

      {phase === "visible" && (
        <div className="animate-fade-up relative flex max-h-[92vh] w-full max-w-md flex-col overflow-y-auto rounded-2xl bg-white p-6 text-center shadow-[var(--shadow-lift)] sm:max-w-lg sm:p-8">
          <div className="flex items-center justify-center gap-3 border-b border-border pb-5">
            <Image
              src="/images/logo-mark.png"
              alt="CapitalSphere mark"
              width={44}
              height={40}
              className="h-10 w-auto shrink-0"
            />
            <div className="h-8 w-px bg-border" aria-hidden />
            <div className="text-left leading-none">
              <p className="whitespace-nowrap font-display text-lg font-bold tracking-tight text-navy-900 sm:text-xl">
                Capital<span className="text-gold-600">Sphere</span>
              </p>
              <p className="mt-1 whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                Business Solution
              </p>
            </div>
          </div>

          <div className="relative mx-auto my-6 flex h-28 w-40 items-center justify-center">
            <Cone className="absolute bottom-1 left-0 size-8 -rotate-12 text-gold-500" />
            <Cone className="absolute bottom-1 right-0 size-8 rotate-12 text-gold-500" />
            <div className="relative flex size-20 items-center justify-center rounded-2xl border-2 border-navy-800 bg-navy-50">
              <RefreshCw className="size-9 text-navy-800" strokeWidth={1.75} />
              <span className="absolute -right-2 -top-2 flex size-7 items-center justify-center rounded-full bg-gold-500 text-white shadow-sm">
                <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <path d="M14.7 3.3a1 1 0 0 1 1.6.4l.9 2.2 2.2.9a1 1 0 0 1 .4 1.6l-1.6 1.8.2 2.4a1 1 0 0 1-1.3 1l-2.2-.8-2.1 1a1 1 0 0 1-1.4-.7l-.4-2.3-1.9-1.4a1 1 0 0 1 0-1.6l1.9-1.4.4-2.3a1 1 0 0 1 1.4-.7z" />
                </svg>
              </span>
            </div>
            <div className="absolute inset-x-3 bottom-0 h-1.5 rounded-full bg-gold-400/40" />
          </div>

          <h2 id="maintenance-modal-title" className="font-display text-2xl font-bold leading-tight text-navy-950 sm:text-[26px]">
            Our Services Are
            <br />
            <span className="text-gold-600">Under Maintenance</span>
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-slate-500">
            We&apos;re working behind the scenes to improve your experience and will be
            available shortly.
          </p>

          <div className="mt-6 flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3.5 text-left">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-navy-900 text-white">
              <Mail className="size-4" />
            </span>
            <p className="text-xs leading-relaxed text-slate-600">
              For any further queries, feel free to reach out to us at{" "}
              <a
                href={`mailto:${MAINTENANCE_CONTACT_EMAIL}`}
                className="font-semibold text-navy-900 hover:text-gold-600"
              >
                {MAINTENANCE_CONTACT_EMAIL}
              </a>
            </p>
          </div>

          <button
            type="button"
            onClick={dismiss}
            className="mt-6 w-full rounded-full bg-navy-900 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
          >
            OK
          </button>
          <button
            type="button"
            onClick={dismiss}
            className="mt-3 text-sm font-semibold text-navy-800 underline-offset-2 transition-colors hover:text-gold-600 hover:underline"
          >
            View Website
          </button>
        </div>
      )}
    </div>
  );
}
