"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

interface ConsultationModalContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const ConsultationModalContext = createContext<ConsultationModalContextValue | null>(null);

export function ConsultationModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ isOpen, open, close }), [isOpen, open, close]);

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
