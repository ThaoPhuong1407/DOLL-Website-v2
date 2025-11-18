"use client";

import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import type { NewsItem, Project, Solution } from "@/lib/strapi";
import Image from "next/image";
import { useMemo, useState, type SVGProps } from "react";
import SiteFooter from "@/components/site-footer";

const VISIBLE_NEWS = 3;

const backgroundImage =
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1800&q=80";

const ctaImage =
  "https://images.unsplash.com/photo-1472220625704-91e1462799b2?auto=format&fit=crop&w=1600&q=80";

const ArrowDownIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <path
      d="M12 5v14m0 0-4.5-4.5M12 19l4.5-4.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

type HomePageClientProps = {
  newsItems: NewsItem[];
  solutions: Solution[];
  projects: Project[];
};

export function HomePageClient({
  newsItems,
  solutions,
  projects,
}: HomePageClientProps) {
  const [startIndex, setStartIndex] = useState(0);
  const [activeSolution, setActiveSolution] = useState<Solution | null>(null);
  const totalNews = newsItems.length;
  const clampedVisibleCount = useMemo(
    () => Math.min(VISIBLE_NEWS, totalNews || VISIBLE_NEWS),
    [totalNews],
  );

  const canGoPrev = startIndex > 0;
  const canGoNext = startIndex + clampedVisibleCount < totalNews;

  const handlePrev = () => {
    if (canGoPrev) setStartIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    if (canGoNext)
      setStartIndex((prev) =>
        Math.min(totalNews - clampedVisibleCount, prev + 1),
      );
  };

  const visibleNews = useMemo(
    () => newsItems.slice(startIndex, startIndex + clampedVisibleCount),
    [clampedVisibleCount, newsItems, startIndex],
  );

  return (
    <div className="bg-black text-white">
      <section className="relative min-h-screen overflow-hidden">
        <Image
          src={backgroundImage}
          alt="Engineers reviewing drone intelligence data above a city"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70" />
        <div className="relative z-10 flex min-h-screen flex-col px-4 py-6 sm:px-8 lg:px-16">
          <SiteNav mode="default" />

          <main className="flex flex-1 flex-col items-center justify-center text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.7em] text-white/70">
              Human + Machine Coordination
            </p>
            <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-wide text-white sm:text-5xl md:text-6xl">
              Intelligence that Powers Action
            </h1>
            <p className="mt-6 max-w-2xl text-base text-white/80 sm:text-lg">
              We translate complex, real-time environments into decisive
              guidance for teams operating at the edge.
            </p>
          </main>

          <a
            href="#news"
            className="group flex flex-col items-center gap-3 pb-4 text-white/80 transition hover:text-white"
            aria-label="Scroll to explore recent work"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-white/5 transition group-hover:bg-white/20">
              <ArrowDownIcon className="h-6 w-6 transition group-hover:translate-y-1" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-[0.5em]">
              Scroll to Explore
            </span>
          </a>
        </div>
      </section>

      <section
        id="news"
        className="rounded-t-[32px] bg-zinc-50 px-4 pb-20 pt-16 text-zinc-900 sm:px-8 lg:px-16"
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-12">
          <header className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.4em] text-zinc-500">
                What we&apos;ve been into lately
              </p>
            </div>
            <div className="flex items-center gap-2 text-emerald-500">
              <button
                type="button"
                aria-label="Previous stories"
                onClick={handlePrev}
                disabled={!canGoPrev}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-100 text-xl disabled:cursor-not-allowed disabled:opacity-40"
              >
                ←
              </button>
              <button
                type="button"
                aria-label="Next stories"
                onClick={handleNext}
                disabled={!canGoNext}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-100 text-xl disabled:cursor-not-allowed disabled:opacity-40"
              >
                →
              </button>
            </div>
          </header>

          <div className="grid gap-6 md:grid-cols-3">
            {newsItems.length > 0 ? (
              (visibleNews.length > 0 ? visibleNews : newsItems).map((item) => (
                <article
                  key={item.id}
                  className="flex h-full flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-6 text-zinc-900 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <Link href={`/newsroom/${item.slug}`} className="flex h-full flex-col gap-4">
                    <div className="flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-zinc-500">
                      <span>
                        {new Date(item.publishDate).toLocaleDateString("en-US", {
                          month: "2-digit",
                          day: "2-digit",
                          year: "numeric",
                        })}
                      </span>
                      <span className="rounded-full bg-zinc-100 px-3 py-1 text-[0.65rem] text-zinc-700">
                        {item.category}
                      </span>
                    </div>
                    <div className="flex flex-col gap-3">
                      <h3 className="text-lg font-semibold leading-snug text-zinc-900">
                        {item.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-zinc-600">
                        {item.summary}
                      </p>
                    </div>
                    <span className="mt-auto text-right text-sm font-semibold text-zinc-700 underline-offset-2 hover:underline">
                      Read
                    </span>
                  </Link>
                </article>
              ))
            ) : (
              <p className="text-sm text-zinc-500">
                No newsroom entries yet. Check back soon.
              </p>
            )}
          </div>

          <div id="about" className="px-6 py-12 sm:px-10">
            <p className="text-sm font-semibold uppercase tracking-[0.4em] text-zinc-500">
              Who we are
            </p>
            <p className="mt-6 text-2xl leading-relaxed text-zinc-800 md:text-3xl">
              DOLL builds the intelligence layer for the real world — enabling
              real-time decisions in defense, infrastructure, and industry where
              precision and trust matter most.
            </p>
          </div>
        </div>
      </section>

      <section
        id="solutions"
        className="w-full bg-[#f5f4f2] px-4 py-16 text-zinc-900 sm:px-8 lg:px-16"
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-10">
          <h2 className="text-xl font-semibold">Our Solutions</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {solutions.length > 0 ? (
              solutions.map((solution) => (
                <button
                  key={solution.id}
                  type="button"
                  onClick={() => setActiveSolution(solution)}
                  className="flex flex-col gap-6 rounded-3xl bg-white p-6 text-left shadow-md ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-lg md:flex-row md:items-center md:p-8"
                >
                  <div className="flex-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.5em] text-zinc-500">
                      {solution.title}
                    </p>
                    <p className="mt-3 text-lg leading-relaxed text-zinc-700">
                      {solution.excerpt}
                    </p>
                  </div>
                  <div className="flex-1">
                    <div className="relative h-40 w-full overflow-hidden rounded-2xl sm:h-48">
                      {solution.imageUrl ? (
                        <Image
                          src={solution.imageUrl}
                          alt={solution.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center rounded-2xl bg-zinc-100 text-sm text-zinc-500">
                          Image coming soon
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              ))
            ) : (
              <p className="text-sm text-zinc-500">
                Solutions are coming soon.
              </p>
            )}
          </div>
        </div>
      </section>

      <section
        id="projects"
        className="w-full bg-white px-4 py-16 text-zinc-900 sm:px-8 lg:px-16"
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.4em] text-zinc-500">
                Key Projects
              </p>
              <h2 className="mt-2 text-3xl font-semibold">
                Where we test and learn.
              </h2>
            </div>
            <Link
              href="/projects"
              className="text-sm font-semibold uppercase tracking-[0.35em] text-zinc-500 hover:text-zinc-900"
            >
              View more →
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {projects.slice(0, 3).map((project) => (
              <article
                key={project.id}
                className="flex h-full flex-col gap-4 rounded-3xl border border-zinc-200 bg-zinc-50 p-6 shadow-sm"
              >
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-zinc-500">
                  <span>Status</span>
                  <span className="rounded-full bg-white px-3 py-1 text-[0.65rem] text-zinc-700">
                    {project.projectStatus}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-zinc-900">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                    {project.summary}
                  </p>
                </div>
                <Link
                  href={`/projects/${project.slug}`}
                  className="text-sm font-semibold text-zinc-700 underline-offset-2 hover:underline"
                >
                  Read more
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="w-full bg-white px-4 py-16 sm:px-8 lg:px-16"
      >
        <div className="mx-auto flex max-w-5xl flex-col gap-16">
          <a
            href="mailto:contact@doll.ai"
            className="group relative flex min-h-[260px] flex-col justify-center gap-4 overflow-hidden rounded-[32px] text-left text-white shadow-lg transition hover:-translate-y-1"
          >
            <Image
              src={ctaImage}
              alt="Team collaborating on advanced robotics"
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 transition group-hover:bg-black/50" />
            <div className="relative z-10 px-8 py-12 sm:px-12">
              <span className="text-2xl font-medium sm:text-3xl">
                Let’s start building.
              </span>
              <span className="mt-2 block text-3xl font-semibold sm:text-4xl">
                Request a Demo.
              </span>
            </div>
            <span className="absolute right-8 top-8 z-10 text-3xl transition group-hover:translate-x-1">
              →
            </span>
          </a>

          <SiteFooter />
        </div>
      </section>
      {activeSolution && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white p-8 text-zinc-900 shadow-2xl">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.5em] text-zinc-500">
                  {activeSolution.title}
                </p>
                <h2 className="mt-2 text-3xl font-semibold text-zinc-900">
                  Solution Overview
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setActiveSolution(null)}
                className="text-sm font-semibold uppercase tracking-[0.4em] text-zinc-500 transition hover:text-zinc-900"
              >
                Close
              </button>
            </div>
            <p className="mt-6 text-lg leading-relaxed text-zinc-700">
              {activeSolution.description}
            </p>
            {activeSolution.imageUrl && (
              <div className="relative mt-8 h-64 w-full overflow-hidden rounded-2xl">
                <Image
                  src={activeSolution.imageUrl}
                  alt={activeSolution.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
