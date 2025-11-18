import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import SiteFooter from "@/components/site-footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900">
      <header className="sticky top-0 z-20 bg-white/90 px-4 py-4 shadow-sm backdrop-blur md:px-8 lg:px-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-4">
          <SiteNav mode="default" fullWidth />
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-4 py-12 md:px-8 lg:px-0">
        <Link
          href="/"
          className="text-sm font-semibold uppercase tracking-[0.4em] text-zinc-500 transition hover:text-zinc-900"
        >
          ← Back home
        </Link>

        <div className="mt-8 space-y-6 rounded-[32px] bg-white p-10 shadow-lg ring-1 ring-zinc-200">
          <div className="space-y-2">
            <p className="text-sm uppercase tracking-[0.5em] text-zinc-500">Terms</p>
            <h1 className="text-4xl font-semibold text-zinc-900">Terms & Conditions</h1>
            <p className="text-sm text-zinc-600">
              These terms govern your use of our site and services. By using them, you agree to these terms.
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-zinc-900">Use of the site</h2>
            <p className="text-sm text-zinc-700">
              You may browse and use the site for lawful purposes. Do not interfere with security, attempt to access non-public areas,
              or use the site to infringe others’ rights.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-zinc-900">Content</h2>
            <p className="text-sm text-zinc-700">
              Content is provided “as is” for informational purposes. We may update or remove content without notice.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-zinc-900">Privacy</h2>
            <p className="text-sm text-zinc-700">
              Our handling of personal data is described in the{" "}
              <Link href="/privacy" className="font-semibold underline">
                Privacy Policy
              </Link>
              .
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-zinc-900">Disclaimers</h2>
            <p className="text-sm text-zinc-700">
              Services are provided “as is” without warranties. To the extent permitted by law, we disclaim implied warranties of
              merchantability, fitness for a particular purpose, and non-infringement.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-zinc-900">Limitation of liability</h2>
            <p className="text-sm text-zinc-700">
              To the extent permitted by law, we will not be liable for indirect, incidental, or consequential damages arising from use
              of the site or services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-zinc-900">Changes</h2>
            <p className="text-sm text-zinc-700">
              We may update these terms. Continued use after changes means you accept the updated terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-zinc-900">Contact</h2>
            <p className="text-sm text-zinc-700">
              Questions? Email{" "}
              <a className="font-semibold underline" href="mailto:tphuong141607@gmail.com">
                tphuong141607@gmail.com
              </a>
              .
            </p>
          </section>

          <p className="text-xs text-zinc-500">Last updated: {new Date().getFullYear()}</p>
        </div>
      </main>
      <div className="mx-auto max-w-4xl px-4 pb-12 md:px-8 lg:px-0">
        <SiteFooter />
      </div>
    </div>
  );
}
