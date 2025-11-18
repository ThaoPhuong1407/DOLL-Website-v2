import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getNewsItem, getNewsItems } from "@/lib/strapi";
import BlocksRenderer from "@/components/blocks-renderer";
import SiteFooter from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";

type Params = { slug: string };

export async function generateStaticParams() {
  const items = await getNewsItems();
  return items.map((item) => ({ slug: item.slug }));
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const [article, allNewsItems] = await Promise.all([
    getNewsItem(slug),
    getNewsItems(),
  ]);

  if (!article) {
    notFound();
  }

  const recentItems = allNewsItems
    .filter((item) => item.slug !== article.slug)
    .slice(0, 5);

  return (
    <div className="bg-zinc-100 text-zinc-900">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <SiteNav mode="default" fullWidth />
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Link
          href="/newsroom"
          className="text-sm font-semibold uppercase tracking-[0.4em] text-zinc-500 transition hover:text-zinc-900"
        >
          ← Back to newsroom
        </Link>
        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(260px,1fr)]">
          <article className="rounded-[32px] bg-white p-10 shadow-lg ring-1 ring-zinc-200">
            <div className="text-xs uppercase tracking-[0.45em] text-zinc-500">
              <span>{new Date(article.publishDate).toLocaleDateString()}</span>
              <span className="ml-4 rounded-full bg-zinc-100 px-3 py-1 text-[0.65rem] text-zinc-700">
                {article.category}
              </span>
            </div>
            <h1 className="mt-6 text-4xl font-semibold leading-tight text-zinc-900">
              {article.title}
            </h1>
            <p className="mt-4 text-lg text-zinc-600">{article.summary}</p>
            {article.imageUrl && (
              <div className="relative mt-8 aspect-[3/1.3] overflow-hidden rounded-3xl">
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 768px"
                />
              </div>
            )}
            <article className="prose prose-zinc mt-8 max-w-none">
              <BlocksRenderer content={article.body} />
            </article>
          </article>

          <aside className="space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-zinc-500">
              Latest updates
            </h2>
            {recentItems.length ? (
              <ul className="divide-y divide-zinc-200 overflow-hidden rounded-2xl bg-white shadow ring-1 ring-zinc-200">
                {recentItems.map((item) => (
                  <li key={item.id} className="hover:bg-zinc-50">
                    <Link
                      href={`/newsroom/${item.slug}`}
                      className="block px-4 py-3 transition"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
                        {new Date(item.publishDate).toLocaleDateString()}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-zinc-900">
                        {item.title}
                      </p>
                      <p className="mt-1 text-sm text-zinc-600">
                        {item.summary}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-zinc-500">No other articles yet.</p>
            )}
          </aside>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <SiteFooter />
      </div>
    </div>
  );
}
