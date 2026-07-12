"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { useConsultationModal } from "@/components/consultation/ConsultationModalProvider";

type Variant = "primary" | "secondary" | "outline-light" | "ghost";

interface ConsultationButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  variant?: Variant;
  size?: "md" | "sm";
  withArrow?: boolean;
  children: ReactNode;
  className?: string;
  onBeforeOpen?: () => void;
}

export function ConsultationButton({ children, onBeforeOpen, ...rest }: ConsultationButtonProps) {
  const { open } = useConsultationModal();

  return (
    <Button
      type="button"
      onClick={() => {
        onBeforeOpen?.();
        open();
      }}
      {...rest}
    >
      {children}
    </Button>
  );
}
