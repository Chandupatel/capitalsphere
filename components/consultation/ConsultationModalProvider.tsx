"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

interface ConsultationModalContextValue {
  isOpen: boolean;
  /** Which service (if any) the visitor was enquiring about when the modal was opened. */
  context: string | null;
  /** Optional `context` identifies the service/section that triggered the modal, so the
   *  submitted enquiry can be traced back to it (e.g. from a service card's "Learn More"). */
  open: (context?: string) => void;
  close: () => void;
}

const ConsultationModalContext = createContext<ConsultationModalContextValue | null>(null);

export function ConsultationModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [context, setContext] = useState<string | null>(null);

  const open = useCallback((ctx?: string) => {
    setContext(ctx ?? null);
    setIsOpen(true);
  }, []);
  const close = useCallback(() => {
    setIsOpen(false);
    setContext(null);
  }, []);

  const value = useMemo(
    () => ({ isOpen, context, open, close }),
    [isOpen, context, open, close],
  );

  return (
    <ConsultationModalContext.Provider value={value}>{children}</ConsultationModalContext.Provider>
  );
}

export function useConsultationModal() {
  const ctx = useContext(ConsultationModalContext);
  if (!ctx) {
    throw new Error("useConsultationModal must be used within a ConsultationModalProvider");
  }
  return ctx;
}
