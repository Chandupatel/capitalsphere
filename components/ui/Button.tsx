import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowRight } from "lucide-react";

type Variant = "primary" | "secondary" | "outline-light" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold transition-all duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50";

const sizes = {
  md: "px-6 py-3",
  sm: "px-5 py-2.5 text-[13px]",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-navy-900 text-white shadow-[0_10px_25px_-10px_rgba(11,42,74,0.55)] hover:bg-navy-800 hover:-translate-y-0.5 active:translate-y-0",
  secondary:
    "bg-gold-500 text-navy-950 shadow-[0_10px_25px_-10px_rgba(198,167,106,0.6)] hover:bg-gold-400 hover:-translate-y-0.5 active:translate-y-0",
  "outline-light":
    "border border-navy-900/15 text-navy-900 bg-white hover:bg-navy-50 hover:-translate-y-0.5 active:translate-y-0",
  ghost:
    "border border-white/30 text-white hover:bg-white/10 hover:-translate-y-0.5 active:translate-y-0",
};

interface CommonProps {
  variant?: Variant;
  size?: keyof typeof sizes;
  withArrow?: boolean;
  children: ReactNode;
  className?: string;
}

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button({
  variant = "primary",
  size = "md",
  withArrow = false,
  children,
  className = "",
  href,
  ...rest
}: ButtonProps) {
  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
        {withArrow && <ArrowRight className="size-4" aria-hidden />}
      </a>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
      {withArrow && <ArrowRight className="size-4" aria-hidden />}
    </button>
  );
}
