import { Hero } from "@/components/sections/Hero";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { CoreServices } from "@/components/sections/CoreServices";
import { GovernmentFunding } from "@/components/sections/GovernmentFunding";
import { AboutWhyChoose } from "@/components/sections/AboutWhyChoose";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { Testimonials } from "@/components/sections/Testimonials";
import { LatestInsights } from "@/components/sections/LatestInsights";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { MaintenanceModal } from "@/components/maintenance/MaintenanceModal";

export default function Home() {
  return (
    <>
      <MaintenanceModal />
      <Hero />
      <StatsStrip />
      <CoreServices />
      <GovernmentFunding />
      <AboutWhyChoose />
      <ProcessSteps />
      <Testimonials />
      <LatestInsights />
      <CtaBanner />
    </>
  );
}
