export type NewsSeed = {
  title: string;
  slug: string;
  publishDate: string;
  category: "News" | "Press Release" | "Blog" | "Conference";
  summary: string;
  body: unknown;
  ctaUrl?: string;
  heroImageUrl?: string;
};

const summary =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer blandit sapien id sem elementum maximus.";

const paragraphBlock = (text: string) => [
  {
    type: "paragraph",
    children: [{ type: "text", text }],
  },
];

const body = paragraphBlock(
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ut erat nisl. Proin eleifend nisl quis neque aliquet, vitae accumsan urna mattis. Nullam sed risus id lectus gravida interdum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla facilisi.",
);

export const newsSeedData: NewsSeed[] = [
  {
    title:
      "The Fifth International Workshop on Situated Self-guided Learning (IWSSL 2025)",
    slug:
      "the-fifth-international-workshop-on-situated-self-guided-learning-iwssl-2025",
    publishDate: "2025-07-01",
    category: "Conference",
    summary:
      "DOLL will join researchers at Reykjavik University for IWSSL 2025 to discuss scaling, ethics, and self-guided developmental learning toward AGI.",
    body: [
      {
        type: "heading",
        level: 3,
        children: [
          {
            type: "text",
            text: "By Reykjavik University, Iceland | August 14-15, 2025",
          },
        ],
      },
      {
        type: "paragraph",
        children: [
          { type: "text", text: "Registration " },
          {
            type: "link",
            url: "https://docs.google.com/forms/d/e/1FAIpQLSfU9DMOCsyn-lPt9OxKWV4sufkyrXh1cZsCMbKN5tbro0HWUA/formResponse",
            children: [{ type: "text", text: "Click to register" }],
          },
        ],
      },
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            text:
              "In this fifth workshop, we continue to explore an expanding field of research that attempts to build systems that can learn without human intervention and with little or no hard-wired knowledge, as would a newborn child or animal. Last year’s workshop in Oxford was consecutive with the IWAI workshop in Oxford that enabled many of us to benefit from both. This year we are consecutive with AGI2025. Some of us believe that self-guided developmental learning is a more likely approach to succeed in reaching the AGI goal than other contemporary efforts. This will be a discussion topic for this year’s workshop. What advances do we require to get there? Scaling will be a topic for this year’s workshop. If we succeed in reaching AGI through a developmental learning approach, we should start considering ethical issues. Ethics will be a discussion topic for the workshop too.",
          },
        ],
      },
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            text:
              "How do intelligent systems, such as humans and software agents, learn about the world? They should primarily learn about themselves and their environment and how the two interact effectively through exploration and self-motivated experimentation. Many learning systems being proposed continue to ignore the fundamental mechanisms underlying self-motivated learning through experience in the open world that could ultimately lead to intelligent behaviors such as (for example) how to recognize objects through visual and other senses, how to move another object to reach an object otherwise out of reach, and how to use those objects as tools, by experimenting. Higher-level learning (e.g.) the use of specialized tools, can be taught both by example and by building upon existing learned competencies. Historically, this approach has seemed difficult due to the run-time computation burden and the need for large memories. In addition, training time has been seen as limiting. Today, processors are more powerful and cheaper, and large memories are increasingly less of an obstacle.",
          },
        ],
      },
      {
        type: "heading",
        level: 3,
        children: [{ type: "text", text: "Topics" }],
      },
      {
        type: "list",
        format: "unordered",
        children: [
          {
            type: "list-item",
            children: [{ type: "text", text: "Developmental learning approaches to achieving AGI" }],
          },
          {
            type: "list-item",
            children: [{ type: "text", text: "Ethical considerations for self-guided intelligent agents" }],
          },
          {
            type: "list-item",
            children: [{ type: "text", text: "Scaling developmental learning to address real-world domains" }],
          },
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text:
                  "Developmental approaches to other intelligences such as social and emotional intelligence",
              },
            ],
          },
          {
            type: "list-item",
            children: [{ type: "text", text: "Grounded learning, representations, and algorithms" }],
          },
          {
            type: "list-item",
            children: [{ type: "text", text: "Online learning, representations, and algorithms" }],
          },
          {
            type: "list-item",
            children: [{ type: "text", text: "Intrinsic motivations" }],
          },
          {
            type: "list-item",
            children: [{ type: "text", text: "Inspirations from animal and human intelligence" }],
          },
          {
            type: "list-item",
            children: [
              {
                type: "text",
                text:
                  "Developmental and constructivist learning; integrated language and visual learning",
              },
            ],
          },
        ],
      },
      {
        type: "heading",
        level: 3,
        children: [{ type: "text", text: "Important dates (AOE)" }],
      },
      {
        type: "paragraph",
        children: [
          {
            type: "text",
            text: "Registration and optional abstract: August 8th, 2025",
          },
        ],
      },
      {
        type: "heading",
        level: 3,
        children: [{ type: "text", text: "Program" }],
      },
      {
        type: "paragraph",
        children: [{ type: "text", text: "Day 1: August 14, 2025" }],
      },
      {
        type: "list",
        format: "unordered",
        children: [
          {
            type: "list-item",
            children: [{ type: "text", text: "Sessions 8:00 am - 12:00 pm" }],
          },
          {
            type: "list-item",
            children: [{ type: "text", text: "Lunch 12:00 pm - 1:30 pm" }],
          },
          {
            type: "list-item",
            children: [{ type: "text", text: "Sessions 1:30 pm - 5:00 pm" }],
          },
          {
            type: "list-item",
            children: [{ type: "text", text: "Dinner 7:00 pm" }],
          },
        ],
      },
      {
        type: "paragraph",
        children: [{ type: "text", text: "Day 2: August 15, 2025" }],
      },
      {
        type: "list",
        format: "unordered",
        children: [
          {
            type: "list-item",
            children: [{ type: "text", text: "Sessions 8:00 am - 12:00 pm" }],
          },
          {
            type: "list-item",
            children: [{ type: "text", text: "Lunch 12:00 pm - 1:30 pm" }],
          },
          {
            type: "list-item",
            children: [{ type: "text", text: "Sessions 1:30 pm - 5:00 pm" }],
          },
          {
            type: "list-item",
            children: [
              { type: "text", text: "Sky Lagoon (if selected) 6:00 pm" },
            ],
          },
        ],
      },
      {
        type: "heading",
        level: 3,
        children: [{ type: "text", text: "Prior workshop proceedings" }],
      },
      {
        type: "list",
        format: "unordered",
        children: [
          {
            type: "list-item",
            children: [
              {
                type: "link",
                url: "https://link.springer.com/book/10.1007/978-3-031-96325-4",
                children: [
                  { type: "text", text: "Proceedings of the Fourth IWSSL Workshop" },
                ],
              },
            ],
          },
          {
            type: "list-item",
            children: [
              {
                type: "link",
                url: "https://proceedings.mlr.press/v192/",
                children: [
                  { type: "text", text: "Volume 192 Proceedings of the Third IWSSL Workshop" },
                ],
              },
            ],
          },
          {
            type: "list-item",
            children: [
              {
                type: "link",
                url: "https://proceedings.mlr.press/v159/",
                children: [
                  { type: "text", text: "Volume 159 Proceedings of the Second IWSSL Workshop" },
                ],
              },
            ],
          },
          {
            type: "list-item",
            children: [
              {
                type: "link",
                url: "https://proceedings.mlr.press/v131/",
                children: [
                  { type: "text", text: "Volume 131 Proceedings of the First IWSSL Workshop" },
                ],
              },
            ],
          },
        ],
      },
      {
        type: "heading",
        level: 3,
        children: [{ type: "text", text: "Publication" }],
      },
      {
        type: "paragraph",
        children: [{ type: "text", text: "Details coming soon" }],
      },
      {
        type: "heading",
        level: 3,
        children: [{ type: "text", text: "Organizing committee" }],
      },
      {
        type: "list",
        format: "unordered",
        children: [
          {
            type: "list-item",
            children: [
              { type: "text", text: "Professor Kristinn Thorisson (Reykjavik University)" },
            ],
          },
          {
            type: "list-item",
            children: [
              { type: "text", text: "Olivier Georgeon (Catholic University of Lyon, UCLy)" },
            ],
          },
          {
            type: "list-item",
            children: [{ type: "text", text: "Dr. Paul Robertson (DOLL Inc.)" }],
          },
          {
            type: "list-item",
            children: [{ type: "text", text: "Dr. Cyrus Shaoul (Leela.ai)" }],
          },
          {
            type: "list-item",
            children: [{ type: "text", text: "Henry Minsky (Leela.ai)" }],
          },
          {
            type: "list-item",
            children: [{ type: "text", text: "Dr. Robert Laddaga (DOLL Inc.)" }],
          },
        ],
      },
    ],
    ctaUrl:
      "https://www.dollabs.com/post/the-fifth-international-workshop-on-situated-self-guided-learning-(iwssl-2025)-6823998f4309ec0a18d09122",
    heroImageUrl: "https://lh3.googleusercontent.com/d/1-n660xZ0KTnXnfY2PHfoKJnkwpki60xs",
  },
  {
    title: "DOLL/Vanderbilt University wins CASE",
    slug: "doll-vanderbilt-university-wins-case",
    publishDate: "2025-01-12",
    category: "News",
    summary,
    body,
    ctaUrl: "https://example.com/case",
    heroImageUrl:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "DOLL Team Demonstrates CART Robot-Assisted Repair Technology",
    slug: "cart-robot-assisted-repair-demo",
    publishDate: "2025-02-01",
    category: "Press Release",
    summary,
    body,
    ctaUrl: "https://example.com/cart",
    heroImageUrl:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Autonomous ISR platform earns tactical readiness seal",
    slug: "autonomous-isr-platform-readiness",
    publishDate: "2025-03-10",
    category: "News",
    summary,
    body,
    ctaUrl: "https://example.com/isr",
    heroImageUrl:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "DOLL/Vanderbilt University renews CASE partnership",
    slug: "doll-vanderbilt-case-renewal",
    publishDate: "2025-04-05",
    category: "News",
    summary,
    body,
    ctaUrl: "https://example.com/case-renewal",
    heroImageUrl:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Rapid inference toolkit deployed to naval task force",
    slug: "rapid-inference-toolkit-navy",
    publishDate: "2025-05-18",
    category: "Blog",
    summary,
    body,
    ctaUrl: "https://example.com/rit",
    heroImageUrl:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "C2 cockpit integrates live UAS telemetry",
    slug: "c2-cockpit-uas-telemetry",
    publishDate: "2025-06-02",
    category: "Conference",
    summary,
    body,
    ctaUrl: "https://example.com/c2-cockpit",
    heroImageUrl:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
  },
];
