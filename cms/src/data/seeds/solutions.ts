export type SolutionSeed = {
  title: string;
  slug: string;
  excerpt: string;
  description: string;
  order: number;
  imageUrl?: string;
};

const excerpt =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer blandit sapien id sem elementum maximus.";

const description =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ut erat nisl. Proin eleifend nisl quis neque aliquet, vitae accumsan urna mattis. Nullam sed risus id lectus gravida interdum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.";

export const solutionSeedData: SolutionSeed[] = [
  {
    title: "Social Intelligence",
    slug: "social-intelligence",
    excerpt,
    description,
    order: 1,
    imageUrl:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Active Perception",
    slug: "active-perception",
    excerpt,
    description,
    order: 2,
    imageUrl:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Mission Automation",
    slug: "mission-automation",
    excerpt,
    description,
    order: 3,
    imageUrl:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Resilient Infrastructure",
    slug: "resilient-infrastructure",
    excerpt,
    description,
    order: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=900&q=80",
  },
];
