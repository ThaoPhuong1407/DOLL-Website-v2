import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import SiteFooter from "@/components/site-footer";
import { getNewsItems } from "@/lib/strapi";

const filterTabs = ["All", "News", "Press Release", "Blog", "Conference"];

const timeline = [
  {
    year: 2020,
    events: ["Thao Phuong joins DOLL as Software Engineer"],
  },
  {
    year: 2018,
    events: [
      "DOLL/Vanderbilt University wins CASE",
      "DOLL/SIFT wins CPS",
      "DOLL Team Demonstrates CART Robot-Assisted Repair Technology",
      "DOLL/Vencore wins CHASE",
    ],
  },
  {
    year: 2017,
    events: [
      "DOLL wins phase I SBIR for hardware supported fast path planning for robots",
    ],
  },
  {
    year: 2016,
    events: [
      "DOLL wins DARPA Distributed Autonomous Network Communication Enabler (DANCE) contract to develop autonomous quadcopter network",
      "DOLL wins Phase II STTR for its CART project with MIT",
    ],
  },
];

const formatDate = (input: string) => {
  const date = new Date(input);
  if (Number.isNaN(date.getTime())) return input;
  return date.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
};

type SearchParams = {
  category?: string;
  page?: string;
};

export default async function NewsroomPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const activeCategory = params.category ?? "All";
  const pageParam = Number.parseInt(params.page ?? "1", 10);
  const pageSize = 6;
  const page = Number.isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;

  const articles = await getNewsItems();
  const filteredArticles =
    activeCategory === "All"
      ? articles
      : articles.filter(
          (article) =>
            article.category.toLowerCase() === activeCategory.toLowerCase(),
        );
  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * pageSize;
  const paginatedArticles = filteredArticles.slice(start, start + pageSize);

  const buildHref = (nextPage: number) => {
    const params = new URLSearchParams();
    if (activeCategory !== "All") params.set("category", activeCategory);
    if (nextPage > 1) params.set("page", String(nextPage));
    const query = params.toString();
    return query ? `/newsroom?${query}` : "/newsroom";
  };

  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900">
      <header className="sticky top-0 z-20 bg-white/90 px-4 py-4 shadow-sm backdrop-blur md:px-8 lg:px-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-4">
          <SiteNav mode="default" fullWidth />
        </div>
      </header>

      <main className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-12 md:px-8 lg:px-16 lg:flex-row">
        <div className="flex-1">
          <section className="space-y-8 rounded-[36px] bg-white p-8 shadow-lg ring-1 ring-zinc-200">
            <div className="flex flex-wrap items-center gap-3">
              {filterTabs.map((label) => {
                const isActive = label === activeCategory;
                const href =
                  label === "All"
                    ? "/newsroom"
                    : `/newsroom?category=${encodeURIComponent(label)}`;
                return (
                  <Link
                    key={label}
                    href={href}
                    className={`rounded-full border px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] transition ${
                      isActive
                        ? "border-zinc-900 bg-zinc-900 text-white"
                        : "border-zinc-200 text-zinc-600 hover:bg-zinc-100"
                    }`}
                  >
                    {label}
                  </Link>
                );
              })}
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.5em] text-zinc-500">
                Newsroom
              </p>
              <h1 className="mt-3 text-4xl font-semibold text-zinc-900">
                Updates, research, and field notes.
              </h1>
            </div>

            <div className="space-y-4">
              {paginatedArticles.length > 0 ? (
                paginatedArticles.map((article) => (
                  <article
                    key={article.id}
                    className="rounded-2xl border border-zinc-200 bg-zinc-50 px-6 py-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <Link
                      href={`/newsroom/${article.slug}`}
                      className="block space-y-4"
                    >
                      <div className="flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-zinc-500">
                        <span>{formatDate(article.publishDate)}</span>
                        <span className="rounded-full bg-white px-3 py-1 text-[0.65rem] text-zinc-700">
                          {article.category}
                        </span>
                      </div>
                      <div className="flex flex-col gap-3">
                        <h3 className="text-xl font-semibold leading-snug text-zinc-900">
                          {article.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-zinc-600">
                          {article.summary}
                        </p>
                      </div>
                      <span className="text-sm font-semibold text-zinc-700 underline-offset-2 hover:underline">
                        Read
                      </span>
                    </Link>
                  </article>
                ))
              ) : (
                <p className="text-sm text-zinc-500">
                  Nothing published in this category yet.
                </p>
              )}
            </div>
            {totalPages > 1 ? (
              <div className="mt-6 flex items-center justify-between border-t border-zinc-200 pt-4 text-sm font-semibold">
                <Link
                  href={buildHref(Math.max(1, currentPage - 1))}
                  className={`rounded-full border px-3 py-1 uppercase tracking-[0.2em] transition ${
                    currentPage === 1
                      ? "cursor-not-allowed border-zinc-200 text-zinc-400"
                      : "border-zinc-800 text-zinc-800 hover:bg-zinc-50"
                  }`}
                  aria-disabled={currentPage === 1}
                  tabIndex={currentPage === 1 ? -1 : 0}
                >
                  ← Prev
                </Link>
                <span className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                  Page {currentPage} of {totalPages}
                </span>
                <Link
                  href={buildHref(Math.min(totalPages, currentPage + 1))}
                  className={`rounded-full border px-3 py-1 uppercase tracking-[0.2em] transition ${
                    currentPage === totalPages
                      ? "cursor-not-allowed border-zinc-200 text-zinc-400"
                      : "border-zinc-800 text-zinc-800 hover:bg-zinc-50"
                  }`}
                  aria-disabled={currentPage === totalPages}
                  tabIndex={currentPage === totalPages ? -1 : 0}
                >
                  Next →
                </Link>
              </div>
            ) : null}
          </section>
        </div>

        <aside className="w-full max-w-sm rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <p className="text-sm uppercase tracking-[0.5em] text-zinc-500">
            Timeline
          </p>
          <div className="relative mt-6 pl-8">
            <span className="absolute inset-y-0 left-4 w-px bg-zinc-200" />
            <div className="space-y-8">
              {timeline.map((entry) => (
                <div key={entry.year} className="flex gap-6">
                  <div className="w-12 text-sm font-semibold text-zinc-400">
                    {entry.year}
                  </div>
                  <ul className="flex-1 space-y-2 text-sm text-zinc-700">
                    {entry.events.map((event) => (
                      <li
                        key={event}
                        className="leading-relaxed break-words"
                      >
                        {event}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </main>
      <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-8 lg:px-16">
        <SiteFooter />
      </div>
    </div>
  );
}
