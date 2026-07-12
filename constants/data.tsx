import {
  Building2,
  FileText,
  Rocket,
  Landmark,
  Copyright,
  LineChart,
  Users2,
  IndianRupee,
  ShieldCheck,
  BadgeCheck,
  Globe2,
  Award,
  Wallet,
  ShieldHalf,
  BadgePercent,
  CircleDollarSign,
  UserCog,
  FileCheck2,
  Wallet2,
  MessagesSquare,
  ClipboardList,
  SearchCheck,
  FilePenLine,
  Building,
  MailCheck,
  Star,
} from "lucide-react";
import type {
  Article,
  FeatureItem,
  FooterLinkGroup,
  FundingProgram,
  NavLink,
  ProcessStep,
  ServiceItem,
  StatItem,
  Testimonial,
} from "@/types";

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "#home" },
  {
    label: "Services",
    href: "#services",
    children: [
      { label: "Business Registration", href: "#services", groupStart: "Services" },
      { label: "Tax & Compliance", href: "#services" },
      { label: "Startup Services", href: "#services" },
      { label: "Intellectual Property", href: "#services" },
      { label: "Business Consulting", href: "#services" },
      { label: "Startup India Recognition", href: "#funding", groupStart: "Government Funding" },
      { label: "MSME Loans", href: "#funding" },
      { label: "CGTMSE", href: "#funding" },
      { label: "PMEGP", href: "#funding" },
      { label: "Mudra Loan", href: "#funding" },
    ],
  },
  { label: "Resources", href: "#resources" },
  { label: "About Us", href: "#about" },
  { label: "Contact Us", href: "#contact" },
];

// TODO: Replace with client-confirmed figures once shared — currently placeholders.
export const STATS: StatItem[] = [
  { id: "clients", value: "500+", label: "Happy Clients", icon: <Users2 className="size-5" /> },
  { id: "funding", value: "₹50+ Cr", label: "Funding Assisted", icon: <IndianRupee className="size-5" /> },
  { id: "success", value: "95%", label: "Success Rate", icon: <ShieldCheck className="size-5" /> },
  { id: "experience", value: "3+ Years", label: "Experience", icon: <BadgeCheck className="size-5" /> },
  { id: "reach", value: "PAN India", label: "Services", icon: <Globe2 className="size-5" /> },
];

export const SERVICES: ServiceItem[] = [
  {
    id: "business-registration",
    title: "Business Registration",
    description: "Private Limited, LLP, OPC, Partnership, Proprietorship and more.",
    icon: <Building2 className="size-6" />,
    href: "#services",
  },
  {
    id: "tax-compliance",
    title: "Tax & Compliance",
    description: "GST, ROC Compliance, Accounting, Income Tax and more.",
    icon: <FileText className="size-6" />,
    href: "#services",
  },
  {
    id: "startup-services",
    title: "Startup Services",
    description: "Startup India, DPIIT, MSME, ISO Certification, DSC and more.",
    icon: <Rocket className="size-6" />,
    href: "#services",
  },
  {
    id: "government-funding",
    title: "Government Funding",
    description: "Grants, loans, subsidies and schemes for your business growth.",
    icon: <Landmark className="size-6" />,
    href: "#funding",
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    description: "Trademark, Copyright, Patent and IP protection services.",
    icon: <Copyright className="size-6" />,
    href: "#services",
  },
  {
    id: "business-consulting",
    title: "Business Consulting",
    description: "Legal Advisory, Financial Planning, Compliance and Strategy.",
    icon: <LineChart className="size-6" />,
    href: "#services",
  },
];

export const FUNDING_PROGRAMS: FundingProgram[] = [
  { id: "startup-india", title: "Startup India Recognition", subtitle: "Benefits up to ₹50 Lakhs", icon: <Rocket className="size-6" /> },
  { id: "msme-loans", title: "MSME Loans", subtitle: "Collateral Free Business Loans", icon: <Wallet className="size-6" /> },
  { id: "cgtmse", title: "CGTMSE", subtitle: "Collateral Free Credit Guarantee", icon: <ShieldHalf className="size-6" /> },
  { id: "pmegp", title: "PMEGP", subtitle: "Government Subsidy Up to 35%", icon: <BadgePercent className="size-6" /> },
  { id: "mudra-loan", title: "Mudra Loan", subtitle: "Funding up to ₹10 Lakhs", icon: <CircleDollarSign className="size-6" /> },
];

export const WHY_CHOOSE_US: FeatureItem[] = [
  { id: "experts", title: "Expert Professionals", description: "Experienced & skilled team", icon: <UserCog className="size-5" /> },
  { id: "pricing", title: "Affordable Pricing", description: "Transparent & competitive", icon: <FileCheck2 className="size-5" /> },
  { id: "support", title: "End-to-End Support", description: "Complete assistance from start to finish", icon: <Wallet2 className="size-5" /> },
  { id: "secure", title: "Secure & Confidential", description: "100% data protection", icon: <ShieldCheck className="size-5" /> },
  { id: "turnaround", title: "Fast Turnaround", description: "Quick & efficient process", icon: <Award className="size-5" /> },
  { id: "pan-india", title: "PAN India Support", description: "We serve across India", icon: <Globe2 className="size-5" /> },
];

export const PROCESS_STEPS: ProcessStep[] = [
  { id: "01", step: "01", title: "Free Consultation", description: "Understand your requirements", icon: <MessagesSquare className="size-6" /> },
  { id: "02", step: "02", title: "Document Collection", description: "We collect and verify required documents", icon: <ClipboardList className="size-6" /> },
  { id: "03", step: "03", title: "Verification & Review", description: "Our experts review and verify all documents", icon: <SearchCheck className="size-6" /> },
  { id: "04", step: "04", title: "Application Filing", description: "We file the application with the authority", icon: <FilePenLine className="size-6" /> },
  { id: "05", step: "05", title: "Government Processing", description: "Application is processed by the government", icon: <Building className="size-6" /> },
  { id: "06", step: "06", title: "Certificate Delivery", description: "Receive your certificate on your email", icon: <MailCheck className="size-6" /> },
];

export const TRUSTED_BY = ["OYO", "Zomato", "Paytm", "BYJU'S", "CRED", "Mamaearth", "Nykaa", "PolicyBazaar"];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "rohit",
    quote:
      "CapitalSphere made our company registration process so smooth and hassle-free. Highly professional team!",
    name: "Rohit Sharma",
    role: "Founder, TechNova Pvt. Ltd.",
    rating: 5,
  },
  {
    id: "neha",
    quote: "They helped us secure government funding for our startup. Excellent support throughout the process.",
    name: "Neha Verma",
    role: "CEO, BrightMind Innovations",
    rating: 5,
  },
  {
    id: "amit",
    quote: "From GST to compliance, everything is handled perfectly. Truly a one-stop solution.",
    name: "Amit Mehta",
    role: "Director, Mehta Exports",
    rating: 5,
  },
];

export const ARTICLES: Article[] = [
  {
    id: "private-limited",
    title: "Private Limited Company Registration – A Complete Guide",
    category: "Business Registration",
    date: "May 20, 2024",
    href: "#resources",
    accent: "navy",
  },
  {
    id: "govt-schemes",
    title: "Top Government Schemes for Startups in India",
    category: "Government Funding",
    date: "May 15, 2024",
    href: "#resources",
    accent: "gold",
  },
  {
    id: "trademark",
    title: "Trademark Registration Process in India – Step by Step",
    category: "Intellectual Property",
    date: "May 10, 2024",
    href: "#resources",
    accent: "navy",
  },
  {
    id: "gst",
    title: "GST Registration: Documents, Process & Benefits",
    category: "Tax & Compliance",
    date: "May 05, 2024",
    href: "#resources",
    accent: "gold",
  },
];

export const FOOTER_LINKS: FooterLinkGroup[] = [
  {
    title: "Quick Links",
    links: [
      { label: "About Us", href: "#about" },
      { label: "Our Services", href: "#services" },
      { label: "Government Funding", href: "#funding" },
      { label: "Resources", href: "#resources" },
      { label: "Blog", href: "#resources" },
      { label: "Contact Us", href: "#contact" },
    ],
  },
  {
    title: "Our Services",
    links: [
      { label: "Company Registration", href: "#services" },
      { label: "GST Registration", href: "#services" },
      { label: "Trademark Registration", href: "#services" },
      { label: "Compliance Services", href: "#services" },
      { label: "Business Loans", href: "#funding" },
      { label: "All Services", href: "#services" },
    ],
  },
  {
    title: "Government Funding",
    links: [
      { label: "Startup India", href: "#funding" },
      { label: "MSME Loans", href: "#funding" },
      { label: "CGTMSE", href: "#funding" },
      { label: "PMEGP", href: "#funding" },
      { label: "Mudra Loan", href: "#funding" },
      { label: "All Schemes", href: "#funding" },
    ],
  },
];

export const RATING_STAR = <Star className="size-4 fill-gold-500 text-gold-500" />;
