import Link from "next/link";
import type { ReactNode, SVGProps } from "react";

type SiteNavProps = {
  mode?: "hero" | "default";
  fullWidth?: boolean;
};

const navLinks = [
  { label: "About us", href: "/#news" },
  { label: "Projects", href: "/projects" },
  { label: "Consultant", href: "/consultant" },
  { label: "Newsroom", href: "/newsroom" },
  { label: "Contact", href: "/contact" },
];

export function SiteNav({ mode = "default", fullWidth = false }: SiteNavProps) {
  const isHero = mode === "hero";

  const containerClasses = isHero
    ? "rounded-full border border-white/20 bg-white/10 px-5 py-3 shadow-lg backdrop-blur-md text-white"
    : "rounded-full border border-zinc-200 bg-white px-5 py-3 shadow-md text-zinc-900";

  const brandColor = isHero ? "text-white/70" : "text-zinc-500";
  const navLinkColor = isHero
    ? "text-white/75 hover:text-white"
    : "text-zinc-600 hover:text-zinc-900";

  const ctaClasses = isHero
    ? "rounded-full border border-white/30 bg-white/10 px-5 py-2 text-sm font-semibold uppercase tracking-wide text-white shadow-[0_10px_35px_rgba(0,0,0,0.35)] transition hover:bg-white/20"
    : "rounded-full border border-zinc-300 bg-zinc-50 px-5 py-2 text-sm font-semibold uppercase tracking-wide text-zinc-900 transition hover:bg-zinc-100";

  const iconButtonClasses = isHero
    ? "border-white/30 bg-white/10 text-white hover:bg-white/20"
    : "border-zinc-300 bg-zinc-50 text-zinc-800 hover:bg-zinc-100";

  const widthClasses = fullWidth ? "w-full max-w-7xl" : "";

  return (
    <header
      className={`flex flex-nowrap items-center justify-between gap-4 ${containerClasses} ${widthClasses}`}
    >
      <Link href="/#news" className="flex items-center gap-3 transition hover:opacity-80">
        <DroneBadge isHero={isHero} />
        <div
          className={`text-xs font-semibold uppercase tracking-[0.3em] ${brandColor}`}
        >
          Dynamic Object Language Labs
        </div>
      </Link>
      <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className={`transition ${navLinkColor}`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-2">
        <Link href="/contact" className={ctaClasses}>
          Get Started
        </Link>
        <IconButton label="Search" className={iconButtonClasses}>
          <SearchIcon className="h-5 w-5" />
        </IconButton>
        <IconButton label="Open menu" className={iconButtonClasses}>
          <MenuIcon className="h-5 w-5" />
        </IconButton>
      </div>
    </header>
  );
}

const IconButton = ({
  label,
  className,
  children,
}: {
  label: string;
  className: string;
  children: ReactNode;
}) => (
  <button
    className={`flex h-11 w-11 items-center justify-center rounded-full border text-current transition ${className}`}
  >
    <span className="sr-only">{label}</span>
    {children}
  </button>
);

const SearchIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <circle
      cx="11"
      cy="11"
      r="6.5"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="m15.5 15.5 3.75 3.75"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const MenuIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <path
      d="M4 7h16M4 12h16M4 17h16"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const DroneBadge = ({ isHero }: { isHero: boolean }) => (
  <div
    className={`flex h-11 w-11 items-center justify-center rounded-full border ${
      isHero
        ? "border-white/30 bg-white/10 text-white"
        : "border-zinc-200 bg-zinc-50 text-zinc-700"
    }`}
  >
    <svg viewBox="0 0 48 48" fill="none" className="h-8 w-8">
      <path
        d="M8 16h6l6 6h8l6-6h6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M18 28h12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle
        cx="24"
        cy="32"
        r="4"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  </div>
);
