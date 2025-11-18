type FooterLink = { label: string; href: string };

const companyLinks: FooterLink[] = [
  { label: "About us", href: "/#news" },
  { label: "Projects", href: "/projects" },
  { label: "Consultant", href: "/consultant" },
  { label: "Solutions", href: "/#solutions" },
];

const engageLinks: FooterLink[] = [
  { label: "Newsroom", href: "/newsroom" },
  { label: "Contact", href: "/contact" },
];

const legalLinks: FooterLink[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Cookie Settings", href: "/cookies" },
];

function FooterColumn({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs font-semibold uppercase tracking-[0.4em] text-zinc-500">
        {title}
      </p>
      <ul className="space-y-1">
        {links.map((link) => (
          <li key={link.label}>
            <a href={link.href} className="text-zinc-700 transition hover:text-zinc-900">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="flex flex-col gap-10 border-t border-zinc-200 pt-10 text-sm text-zinc-700">
      <div className="grid gap-6 sm:grid-cols-3">
        <FooterColumn title="Company" links={companyLinks} />
        <FooterColumn title="Engage" links={engageLinks} />
        <FooterColumn title="Legal" links={legalLinks} />
      </div>
      <p className="text-center text-xs text-zinc-500">
        © {new Date().getFullYear()} Dynamic Object Language Labs Inc. All rights reserved.
      </p>
    </footer>
  );
}

export default SiteFooter;
