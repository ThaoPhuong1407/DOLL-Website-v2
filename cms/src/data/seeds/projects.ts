export type ProjectSeed = {
  title: string;
  slug: string;
  summary: string;
  description: string;
  projectStatus: "planning" | "active" | "completed";
  link?: string;
  projectType?: string;
  timeline?: string;
  tools?: string[];
  bodySections?: Array<{
    heading: string;
    body: unknown;
    imageUrl?: string;
  }>;
  heroImageUrl?: string;
};

const summary =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer blandit sapien id sem elementum maximus.";

const description =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ut erat nisl. Proin eleifend nisl quis neque aliquet, vitae accumsan urna mattis. Nullam sed risus id lectus gravida interdum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.";

const paragraphBlock = (text: string) => [
  {
    type: "paragraph",
    children: [{ type: "text", text }],
  },
];

const body = paragraphBlock(
  "Dopago invites people to reframe their relationship with dopamine. Rather than shaming addictive behavior, the product meets users where they are and guides them toward healthier routines through prompts, feedback, and micro-interactions.",
);

export const projectSeedData: ProjectSeed[] = [
  {
    title: "Skyline Guardian",
    slug: "skyline-guardian",
    summary,
    description,
    projectStatus: "active",
    link: "https://example.com/skyline-guardian",
    projectType: "Solo Project",
    timeline: "Dec 2022 — Jan 2023",
    tools: ["Figma", "Miro"],
    heroImageUrl:
      "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1400&q=80",
    bodySections: [
      {
        heading: "Designing a kinder dopamine companion",
        body,
        imageUrl:
          "https://images.unsplash.com/photo-1520440229-b2c1d8c0fea4?auto=format&fit=crop&w=1200&q=80",
      },
      {
        heading: "Instant gratification is exhausting",
        body,
        imageUrl:
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
      },
      {
        heading: "Make the journey pleasurable",
        body,
        imageUrl:
          "https://images.unsplash.com/photo-1462396881884-de2c07cb95ed?auto=format&fit=crop&w=1200&q=80",
      },
    ],
  },
  {
    title: "Harbor Atlas",
    slug: "harbor-atlas",
    summary,
    description,
    projectStatus: "completed",
    link: "https://example.com/harbor-atlas",
    projectType: "Client Engagement",
    timeline: "Apr 2023 — Jul 2023",
    tools: ["Figma", "Notion"],
    heroImageUrl:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=80",
    bodySections: [
      {
        heading: "Operational picture above the harbor",
        body,
      },
      {
        heading: "Incident response under pressure",
        body,
      },
    ],
  },
  {
    title: "Sentinel Field Kit",
    slug: "sentinel-field-kit",
    summary,
    description,
    projectStatus: "planning",
    link: "https://example.com/sentinel-field-kit",
    projectType: "R&D",
    timeline: "In progress",
    tools: ["Python", "Edge AI Toolkit"],
    heroImageUrl:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80",
    bodySections: [
      {
        heading: "Edge-ready autonomy",
        body,
      },
    ],
  }
];
