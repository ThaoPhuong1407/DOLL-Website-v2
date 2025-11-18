import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import SiteFooter from "@/components/site-footer";

export default function CookiesPage() {
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
              Cookies
            </p>
            <h1 className="text-4xl font-semibold text-zinc-900">Cookie Settings</h1>
            <p className="text-sm text-zinc-600">
              We use cookies to improve your experience. You can manage preferences below.
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-zinc-900">Types of cookies</h2>
            <ul className="list-disc space-y-2 pl-5 text-sm text-zinc-700">
              <li><strong>Essential:</strong> Required for core functionality (security, session).</li>
              <li><strong>Analytics:</strong> Understand usage to improve the site.</li>
              <li><strong>Marketing:</strong> Personalize content/ads if enabled.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-zinc-900">Your choices</h2>
            <p className="text-sm text-zinc-700">
              Adjust cookies via your browser settings or use the controls below. Disabling some cookies may impact site functionality.
            </p>
            <div className="space-y-2 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-800">
              <label className="flex items-center justify-between">
                <span>Essential</span>
                <input type="checkbox" checked disabled className="h-4 w-4" />
              </label>
              <label className="flex items-center justify-between">
                <span>Analytics</span>
                <input type="checkbox" className="h-4 w-4" />
              </label>
              <label className="flex items-center justify-between">
                <span>Marketing</span>
                <input type="checkbox" className="h-4 w-4" />
              </label>
              <button
                type="button"
                className="mt-2 w-full rounded-full bg-zinc-900 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-white transition hover:bg-zinc-800"
              >
                Save preferences
              </button>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-zinc-900">More info</h2>
            <p className="text-sm text-zinc-700">
              See our{" "}
              <Link href="/privacy" className="font-semibold underline">
                Privacy Policy
              </Link>{" "}
              for details on how we process data.
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
