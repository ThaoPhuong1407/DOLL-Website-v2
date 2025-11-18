import { HomePageClient } from "@/components/home/home-page-client";
import { getNewsItems, getProjects, getSolutions } from "@/lib/strapi";

export default async function HomePage() {
  const [newsItems, solutions, projects] = await Promise.all([
    getNewsItems(),
    getSolutions(),
    getProjects(),
  ]);

  return (
    <HomePageClient
      newsItems={newsItems}
      solutions={solutions}
      projects={projects}
    />
  );
}
