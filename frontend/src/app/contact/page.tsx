import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import ContactForm from "@/components/contact-form";
import SiteFooter from "@/components/site-footer";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900">
      <header className="sticky top-0 z-20 bg-white/90 px-4 py-4 shadow-sm backdrop-blur md:px-8 lg:px-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-4">
          <SiteNav mode="default" fullWidth />
        </div>
      </header>
      <main className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-12 md:px-8 lg:px-16">
        <Link
          href="/"
          className="text-sm font-semibold uppercase tracking-[0.4em] text-zinc-500 transition hover:text-zinc-900"
        >
          ← Back home
        </Link>
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr] lg:items-start">
          <ContactForm />
          <aside className="space-y-4 rounded-[32px] bg-white p-6 shadow-lg ring-1 ring-zinc-200">
            <h2 className="text-sm font-semibold uppercase tracking-[0.4em] text-zinc-500">
              Contact Information
            </h2>
            <div className="space-y-3 text-sm text-zinc-700">
              <div>
                <p className="font-semibold text-zinc-900">Phone</p>
                <p>(+1) 978-372-7635</p>
              </div>
              <div>
                <p className="font-semibold text-zinc-900">Fax</p>
                <p>(+1) 619-828-6605</p>
              </div>
              <div>
                <p className="font-semibold text-zinc-900">Email</p>
                <a
                  href="mailto:info@dollabs.com"
                  className="text-emerald-700 underline underline-offset-2"
                >
                  info@dollabs.com
                </a>
              </div>
              <div>
                <p className="font-semibold text-zinc-900">Address</p>
                <p>DOLL Inc.</p>
                <p>114 Waltham Street #14</p>
                <p>Lexington, MA 02421</p>
              </div>
            </div>
          </aside>
        </div>
      </main>
      <div className="mx-auto max-w-7xl px-4 pb-12 md:px-8 lg:px-16">
        <SiteFooter />
      </div>
    </div>
  );
}
