import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import SiteFooter from "@/components/site-footer";

export default function PrivacyPage() {
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
            <p className="text-sm uppercase tracking-[0.5em] text-zinc-500">
              Privacy Policy
            </p>
            <h1 className="text-4xl font-semibold text-zinc-900">
              How we handle your data
            </h1>
            <p className="text-sm text-zinc-600">
              This notice explains what we collect, why we collect it, and how you can
              exercise your choices.
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-zinc-900">What we collect</h2>
            <ul className="list-disc space-y-2 pl-5 text-sm text-zinc-700">
              <li>Contact details you provide (name, email, phone, company, role).</li>
              <li>Context you share in forms or messages (project details, requests).</li>
              <li>Usage data from our sites (device/browser info, pages visited).</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-zinc-900">How we use it</h2>
            <ul className="list-disc space-y-2 pl-5 text-sm text-zinc-700">
              <li>To respond to inquiries and provide services you request.</li>
              <li>To improve our products, sites, and support.</li>
              <li>To send updates if you opt in; you can opt out anytime.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-zinc-900">Sharing</h2>
            <ul className="list-disc space-y-2 pl-5 text-sm text-zinc-700">
              <li>Vendors who help us operate (hosting, analytics, email, support).</li>
              <li>We do not sell your personal information.</li>
              <li>We may disclose if required by law or to protect rights and safety.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-zinc-900">Retention</h2>
            <p className="text-sm text-zinc-700">
              We keep data only as long as needed for the purposes above or to comply with
              legal obligations, then delete or anonymize it.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-zinc-900">Your choices</h2>
            <ul className="list-disc space-y-2 pl-5 text-sm text-zinc-700">
              <li>Request access, correction, or deletion of your information.</li>
              <li>Opt out of marketing emails via the unsubscribe link.</li>
              <li>Manage cookies via your browser or device settings.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-zinc-900">Security</h2>
            <p className="text-sm text-zinc-700">
              We use technical and organizational measures to protect data, but no system is
              100% secure. Contact us if you suspect an issue.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-zinc-900">Contact</h2>
            <p className="text-sm text-zinc-700">
              Questions or requests? Email{" "}
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
