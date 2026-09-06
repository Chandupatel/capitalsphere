"use client";

import { ArrowRight } from "lucide-react";
import { useConsultationModal } from "@/components/consultation/ConsultationModalProvider";

interface ServiceLearnMoreButtonProps {
  /** Service title — passed as context to the consultation modal so the
   *  submitted enquiry can be traced back to the service that was clicked. */
  serviceTitle: string;
}

export function ServiceLearnMoreButton({ serviceTitle }: ServiceLearnMoreButtonProps) {
  const { open } = useConsultationModal();

  return (
    <button
      type="button"
      onClick={() => open(serviceTitle)}
      className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-600"
    >
      Learn More
      <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
    </button>
  );
}
