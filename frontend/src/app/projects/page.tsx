import Link from "next/link";
import Image from "next/image";
import { SiteNav } from "@/components/site-nav";
import SiteFooter from "@/components/site-footer";
import { getProjects } from "@/lib/strapi";

export default async function ProjectsPage() {
  const projects = await getProjects();

  const formatStatus = (value?: string | null) => {
    if (!value) return "";
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  return (
    <div className="bg-zinc-100 text-zinc-900">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-8">
          <SiteNav mode="default" fullWidth />
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-8">
        {projects.map((project) => (
          <section
            key={project.id}
            className="mb-10 rounded-[32px] bg-white p-8 shadow-md ring-1 ring-zinc-200 md:flex md:items-stretch md:gap-10"
          >
            <div className="flex w-full flex-col gap-4 md:w-1/2">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.4em] text-zinc-500">
                  {formatStatus(project.projectStatus)}
                </p>
                <Link href={`/projects/${project.slug}`} className="block">
                  <h2 className="mt-2 text-3xl font-semibold hover:text-zinc-700 transition">
                    {project.title}
                  </h2>
                </Link>
              <p className="mt-1 text-zinc-500">{project.summary}</p>
            </div>
            <p className="text-sm leading-relaxed text-zinc-600">
              {project.description}
            </p>
            <div>
              <Link
                href={`/projects/${project.slug}`}
                className="inline-flex items-center rounded-md bg-zinc-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
              >
                  View project
                </Link>
              </div>
            </div>
            <div className="relative mt-6 h-64 w-full overflow-hidden rounded-3xl bg-zinc-200 md:mt-0 md:w-1/2">
              <Image
                src={
                  project.heroImageUrl ??
                  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80"
                }
                alt={project.title}
                fill
                className="object-cover opacity-70"
              />
            </div>
          </section>
        ))}
      </main>
      <div className="mx-auto max-w-6xl px-4 pb-12 sm:px-8">
        <SiteFooter />
      </div>
    </div>
  );
}
