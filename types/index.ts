import type { ReactNode } from "react";

export interface NavChild {
  label: string;
  href: string;
  description?: string;
  groupStart?: string;
}

export interface NavLink {
  label: string;
  href: string;
  children?: NavChild[];
}

export interface StatItem {
  id: string;
  label: string;
  value: string;
  icon: ReactNode;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  href: string;
}

export interface FundingProgram {
  id: string;
  title: string;
  subtitle: string;
  icon: ReactNode;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
}

export interface ProcessStep {
  id: string;
  step: string;
  title: string;
  description: string;
  icon: ReactNode;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  rating: number;
}

export interface Article {
  id: string;
  title: string;
  category: string;
  date: string;
  href: string;
  accent: "navy" | "gold";
}

export interface FooterLinkGroup {
  title: string;
  links: { label: string; href: string }[];
}
