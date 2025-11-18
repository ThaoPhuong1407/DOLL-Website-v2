const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL ?? "http://localhost:1337";
const CMS_TOKEN = process.env.STRAPI_API_TOKEN;

type StrapiEntry<T> =
  | {
      id: number;
      attributes: T;
    }
  | (T & { id: number });

type StrapiCollectionResponse<T> = {
  data: Array<StrapiEntry<T>>;
};

type NewsAttributes = {
  title: string;
  slug: string;
  publishDate: string;
  category: string;
  summary: string;
  body: unknown;
  ctaUrl?: string | null;
  heroImageUrl?: string | null;
};

type SolutionAttributes = {
  title: string;
  slug: string;
  excerpt: string;
  description: string;
  order?: number | null;
  imageUrl?: string | null;
};

type ProjectAttributes = {
  title: string;
  slug: string;
  summary: string;
  description: string;
  projectStatus: string;
  link?: string | null;
  projectType?: string | null;
  timeline?: string | null;
  tools?: string[] | null;
  heroImageUrl?: string | null;
  bodySections?: Array<{
    heading: string;
    body: unknown;
    imageUrl?: string | null;
  }> | null;
};

export type NewsItem = {
  id: number;
  title: string;
  slug: string;
  publishDate: string;
  category: string;
  summary: string;
  body: unknown;
  ctaUrl?: string | null;
  imageUrl?: string | null;
};

export type Solution = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  description: string;
  order: number;
  imageUrl?: string | null;
};

export type Project = {
  id: number;
  title: string;
  slug: string;
  summary: string;
  description: string;
  projectStatus: string;
  link?: string | null;
  projectType?: string | null;
  timeline?: string | null;
  tools?: string[] | null;
  heroImageUrl?: string | null;
  bodySections?: Array<{
    heading: string;
    body: unknown;
    imageUrl?: string | null;
  }> | null;
};

export type ContactSubmission = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  jobTitle?: string | null;
  company?: string | null;
  country?: string | null;
  message?: string | null;
};

async function fetchFromStrapi<T>(
  path: string,
  { revalidate = 300 }: { revalidate?: number } = {},
) {
  if (!CMS_URL) {
    throw new Error("NEXT_PUBLIC_CMS_URL is not set");
  }

  const res = await fetch(`${CMS_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(CMS_TOKEN ? { Authorization: `Bearer ${CMS_TOKEN}` } : {}),
    },
    next: { revalidate },
  });

  if (!res.ok) {
    throw new Error(
      `Failed to fetch ${path} from Strapi: ${res.status} ${res.statusText}`,
    );
  }

  return (await res.json()) as T;
}

const normalizeUrl = (url?: string | null) => {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return `${CMS_URL}${url}`;
};

const unwrapAttributes = <T>(entry: StrapiEntry<T>) => {
  if ("attributes" in entry && entry.attributes) {
    return { id: entry.id, ...entry.attributes };
  }
  return entry as T & { id: number };
};

export async function getNewsItems(): Promise<NewsItem[]> {
  const response = await fetchFromStrapi<StrapiCollectionResponse<NewsAttributes>>(
    "/api/news-items?sort=publishDate:desc",
    { revalidate: 300 },
  );

  const entries = Array.isArray(response.data) ? response.data : [];

  return entries
    .map((entry) => unwrapAttributes<NewsAttributes>(entry))
    .map((item) => ({
      id: item.id,
      title: item.title,
      slug: item.slug,
      publishDate: item.publishDate,
      category: item.category,
      summary: item.summary,
      body: item.body,
      ctaUrl: item.ctaUrl ?? null,
      imageUrl: normalizeUrl(item.heroImageUrl),
    }));
}

export async function getSolutions(): Promise<Solution[]> {
  const response = await fetchFromStrapi<
    StrapiCollectionResponse<SolutionAttributes>
  >("/api/solutions?sort=order:asc", { revalidate: 300 });

  const entries = Array.isArray(response.data) ? response.data : [];

  return entries
    .map((entry) => unwrapAttributes<SolutionAttributes>(entry))
    .map((item) => ({
      id: item.id,
      title: item.title,
      slug: item.slug,
      excerpt: item.excerpt,
      description: item.description,
      order: item.order ?? 0,
      imageUrl: normalizeUrl(item.imageUrl),
    }));
}

export async function getProjects(): Promise<Project[]> {
  const response = await fetchFromStrapi<
    StrapiCollectionResponse<ProjectAttributes>
  >("/api/projects?sort=title:asc&populate=*", { revalidate: 300 });

  const entries = Array.isArray(response.data) ? response.data : [];

  return entries
    .map((entry) => unwrapAttributes<ProjectAttributes>(entry))
    .map((item) => ({
      id: item.id,
      title: item.title,
      slug: item.slug,
      summary: item.summary,
      description: item.description,
      projectStatus: item.projectStatus,
      link: item.link ?? null,
      projectType: item.projectType ?? null,
      timeline: item.timeline ?? null,
      tools: item.tools ?? null,
      heroImageUrl: normalizeUrl(item.heroImageUrl),
      bodySections: item.bodySections ?? null,
    }));
}

export async function createContactSubmission(
  payload: ContactSubmission,
): Promise<void> {
  if (!CMS_URL) throw new Error("NEXT_PUBLIC_CMS_URL is not set");
  if (!CMS_TOKEN) throw new Error("STRAPI_API_TOKEN is not set");

  const res = await fetch(`${CMS_URL}/api/contact-submissions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${CMS_TOKEN}`,
    },
    body: JSON.stringify({ data: payload }),
  });

  if (!res.ok) {
    const info = await res.text().catch(() => "");
    throw new Error(
      `Failed to create contact submission: ${res.status} ${res.statusText} ${info}`,
    );
  }
}

export async function getNewsItem(slug: string): Promise<NewsItem | null> {
  const response = await fetchFromStrapi<StrapiCollectionResponse<NewsAttributes>>(
    `/api/news-items?filters[slug][$eq]=${encodeURIComponent(
      slug,
    )}&publicationState=preview`,
    { revalidate: 60 },
  );

  const entry = response.data?.[0];
  if (!entry) return null;

  const item = unwrapAttributes<NewsAttributes>(entry);
  return {
    id: item.id,
    title: item.title,
    slug: item.slug,
    publishDate: item.publishDate,
    category: item.category,
    summary: item.summary,
    body: item.body,
    ctaUrl: item.ctaUrl ?? null,
    imageUrl: normalizeUrl(item.heroImageUrl),
  };
}
