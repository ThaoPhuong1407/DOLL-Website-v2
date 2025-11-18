import Image from "next/image";
import { notFound } from "next/navigation";
import BlocksRenderer from "@/components/blocks-renderer";
import { renderRichText } from "@/lib/richtext";
import SiteFooter from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { getProjects } from "@/lib/strapi";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const projects = await getProjects();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const heroImage =
    project.heroImageUrl ??
    project.bodySections?.find((section) => section.imageUrl)?.imageUrl ??
    null;

  const statusLabel = project.projectStatus
    ? project.projectStatus.charAt(0).toUpperCase() + project.projectStatus.slice(1)
    : "";

  return (
    <div className="bg-white text-zinc-900">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-8">
          <SiteNav mode="default" fullWidth />
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-10 sm:px-8">
        <section className="space-y-6">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.4em] text-zinc-500">
              {statusLabel}
            </p>
            <h1 className="text-4xl font-semibold leading-tight text-zinc-900">
              {project.title}
            </h1>
            <p className="text-lg text-zinc-600">{project.summary}</p>
          </div>
          <div className="grid gap-6 border-t border-b border-zinc-200 py-6 sm:grid-cols-2 md:grid-cols-4">
            <InfoItem label="Project Type" value={project.projectType} />
            <InfoItem label="Timeline" value={project.timeline} />
            <InfoItem
              label="Tools"
              value={project.tools ? project.tools.join(", ") : undefined}
            />
          </div>
        </section>

        {heroImage ? (
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl bg-zinc-100">
            <Image
              src={heroImage}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>
        ) : null}

        <section className="space-y-14">
          {project.bodySections?.map((section, idx) => {
            const imageFirst = idx % 2 === 1;
            return (
              <div
                key={`${section.heading}-${idx}`}
                className="grid gap-10 md:grid-cols-2 md:items-center"
              >
                <div
                  className={`space-y-3 ${imageFirst ? "md:order-2" : ""}`}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.4em] text-zinc-500">
                    {section.heading}
                  </p>
                  <p className="text-2xl font-semibold text-zinc-900">
                    {section.heading}
                  </p>
                  {section.body ? (
                    Array.isArray(section.body) ? (
                      <div className="prose prose-zinc max-w-none text-sm text-zinc-700 prose-p:mb-3">
                        <BlocksRenderer content={section.body as unknown[]} />
                      </div>
                    ) : (
                      <div
                        className="prose prose-zinc max-w-none text-sm text-zinc-700 prose-p:mb-3"
                        dangerouslySetInnerHTML={{
                          __html: renderRichText(section.body as string),
                        }}
                      />
                    )
                  ) : null}
                </div>
                {section.imageUrl ? (
                  <div
                    className={`relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-zinc-100 ${
                      imageFirst ? "md:order-1" : ""
                    }`}
                  >
                    <Image
                      src={section.imageUrl}
                      alt={section.heading}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : null}
              </div>
            );
          })}
        </section>
        <div className="mx-auto max-w-6xl px-4 pb-12 sm:px-8">
          <SiteFooter />
        </div>
      </main>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div className="space-y-1">
      <p className="text-xs font-semibold uppercase tracking-[0.4em] text-zinc-500">
        {label}
      </p>
      <p className="text-sm text-zinc-800">{value}</p>
    </div>
  );
}
