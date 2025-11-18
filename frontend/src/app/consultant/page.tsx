import Image from "next/image";
import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import SiteFooter from "@/components/site-footer";

const consultingSteps = [
  {
    title: "1. We ask",
    subtitle: "What is slowing you down?",
    body: "Where are the bottlenecks? What does success actually look like for your team?",
  },
  {
    title: "2. Fit over flash",
    subtitle: "We guide you to what works",
    body: "Maybe it’s deep learning, maybe it’s a simpler rule-based system. We coach you toward the solution that actually delivers.",
  },
  {
    title: "3. No buzzwords. Just results.",
    subtitle: "Solve the real problem",
    body: "We pick the right tools — custom AI, integrating existing platforms, or advising that AI isn’t the answer yet.",
  },
];

const processSteps = [
  {
    step: "Step 1",
    title: "Experience",
    body: "We immerse ourselves in your workflow, seeing challenges through your team’s eyes.",
  },
  {
    step: "Step 2",
    title: "Diagnose",
    body: "We pinpoint friction points and bottlenecks where AI and automation can make an immediate impact.",
  },
  {
    step: "Step 3",
    title: "Prototype",
    body: "We build a working proof-of-concept fast so you can see and test the solution early.",
  },
  {
    step: "Step 4",
    title: "Adapt, Integrate & Scale",
    body: "We refine with your team’s feedback, then automate and expand once it proves its value.",
  },
];

const engagementOptions = [
  {
    title: "Strategic Consulting",
    body: "Expert guidance to chart your AI roadmap and build internal capabilities.",
    accent: "border-l-4 border-emerald-400 pl-4",
  },
  {
    title: "Hands-On Development",
    body: "Technical heavy lifting as your contract integration partner.",
    accent: "border-l-4 border-amber-400 pl-4",
  },
  {
    title: "Hybrid Partnership",
    body: "Blend our expertise with your domain knowledge for the best of both worlds.",
    accent: "border-l-4 border-sky-400 pl-4",
  },
];

const trainingBullets = [
  "AI for Operations — learn what AI can realistically do and how to use it safely.",
  "Graph Databases for Business — find hidden connections and make smarter decisions.",
  "Automation Basics — spot opportunities, remove repetitive tasks, and deliver immediate ROI.",
];

const capabilities = [
  { title: "AI Planning", body: "Optimize operations, allocate resources dynamically, and make smarter decisions without manual overhead." },
  { title: "Autonomous Robotics", body: "Deploy systems that think and adapt. Handle real-world variability and deliver consistent results." },
  { title: "Intelligent AI User Interfaces", body: "Design interfaces that understand context, anticipate needs, and make technology feel invisible." },
  { title: "Computer Vision", body: "Automate visual inspection, enable intelligent monitoring, and extract insights from images and video." },
  { title: "Knowledge Graphs", body: "Map complex relationships, uncover hidden connections, and answer questions traditional databases cannot." },
  { title: "Knowledge Management", body: "Keep institutional knowledge accessible, surface critical insights instantly, and prevent information loss." },
];

export default function ConsultantPage() {
  return (
    <div className="bg-white text-zinc-900">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-8 lg:px-16">
          <SiteNav mode="default" fullWidth />
        </div>
      </header>

      <main className="space-y-16">
        <section className="bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 text-white">
          <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-8 lg:px-16">
            <p className="text-xs font-semibold uppercase tracking-[0.5em] text-white/70">
              Consulting
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
              Turn AI Potential into Business Results
            </h1>
            <p className="mt-4 text-base leading-relaxed text-white/80 md:text-lg">
              We make it happen with a proven track record of successful implementations across industries — from startups to enterprises.
              We bring the technical depth and strategic insight to turn your AI vision into reality.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="rounded-full bg-white px-8 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-800 shadow-lg transition hover:-translate-y-0.5"
              >
                Contact DOLL
              </Link>
              <Link
                href="/newsroom"
                className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-white/10"
              >
                See recent work
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-zinc-50">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-8 lg:grid-cols-[1.2fr_1fr] lg:px-16">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.5em] text-emerald-700">
                Listen first, build smart
              </p>
              <h1 className="text-4xl font-semibold leading-tight text-slate-800 md:text-5xl">
                We start with your business, not the buzzwords.
              </h1>
              <p className="text-sm font-semibold text-slate-700">
                We do not start with a solution looking for a problem. We start with your goals.
              </p>
              <p className="text-base leading-relaxed text-slate-700">
                Before we recommend any technology, we invest time understanding your operations, challenges, and goals.
                What is slowing you down? Where are the bottlenecks? What does success actually look like for your team?
              </p>
            </div>
            <div className="flex justify-center">
              <Image
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1000&q=80"
                alt="Consulting illustration"
                width={520}
                height={420}
                className="rounded-2xl object-cover shadow-lg"
              />
            </div>
          </div>
          <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-8 lg:px-16">
            <div className="grid gap-4 md:grid-cols-3">
              {consultingSteps.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-zinc-100"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-700">
                    {item.title}
                  </p>
                  <p className="mt-3 text-sm font-semibold uppercase tracking-[0.05em] text-slate-800">
                    {item.subtitle}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-700">{item.body}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-center text-sm text-slate-700">
              Solutions that fit your workflow, scale with your growth, and deliver measurable value—not shelfware.
            </p>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-8 lg:px-16">
            <p className="text-sm font-semibold uppercase tracking-[0.4em] text-emerald-700">
              What we deliver
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {capabilities.map((cap) => (
                <div
                  key={cap.title}
                  className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-zinc-100"
                >
                  <p className="text-lg font-semibold text-slate-800">{cap.title}</p>
                  <p className="mt-2 text-sm text-slate-700 leading-relaxed">{cap.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-8 lg:px-16">
            <div className="space-y-2 text-center">
              <h2 className="text-3xl font-semibold text-slate-800">Consulting — Co-creating solutions that work</h2>
              <p className="text-sm text-slate-600">
                Great AI solutions do not come from a template—they emerge from understanding your unique challenges.
              </p>
            </div>

            <div className="mt-10 grid gap-8 lg:grid-cols-2">
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-700">
                  Our collaborative process
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  {processSteps.map((step) => (
                    <div
                      key={step.title}
                      className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-zinc-100"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">
                        {step.step}
                      </p>
                      <p className="mt-2 text-sm font-semibold text-slate-800">{step.title}</p>
                      <p className="mt-2 text-sm text-slate-700 leading-relaxed">{step.body}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-700">
                  Work with us your way
                </p>
                <div className="space-y-3">
                  {engagementOptions.map((option) => (
                    <div
                      key={option.title}
                      className={`rounded-2xl bg-white p-5 shadow-sm ring-1 ring-zinc-100 ${option.accent ?? ""}`}
                    >
                      <p className="text-sm font-semibold text-slate-800">{option.title}</p>
                      <p className="mt-2 text-sm text-slate-700 leading-relaxed">{option.body}</p>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-slate-700">
                  Whether you’re enhancing your online presence or embedding intelligence into your products, we meet you where you are and adapt to how you work best.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-zinc-50">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-8 lg:px-16">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-start">
              <div className="space-y-4">
                <h3 className="text-3xl font-semibold text-slate-800">
                  Empower your team with targeted AI training
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Success with AI is about people. Our customized training programs equip your staff with practical skills they can apply immediately, turning AI from a buzzword into a competitive advantage.
                </p>
                <p className="text-sm text-slate-700 leading-relaxed">
                  We tailor courses to your goals—deep technical training for developers or AI literacy for decision-makers across your organization.
                </p>
              </div>
              <div className="space-y-3 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-zinc-100">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
                  Fast-track learning for business teams
                </p>
                <p className="text-sm text-slate-700">
                  Short, practical courses to help non-technical teams understand and apply AI where it matters most:
                </p>
                <ul className="space-y-2 text-sm text-slate-800">
                  {trainingBullets.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 text-emerald-600">✔</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 text-white">
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 py-16 text-center sm:px-8">
            <h3 className="text-3xl font-semibold md:text-4xl">Ready to get started?</h3>
            <p className="text-base leading-relaxed text-white/85">
              Let’s discuss how AI can drive value for your organization. Contact us at{" "}
              <a href="mailto:firstcontact@dollabs.com" className="font-semibold text-emerald-200 underline">
                firstcontact@dollabs.com
              </a>{" "}
              to schedule a meeting and explore how we can support your AI journey.
            </p>
            <Link
              href="/contact"
              className="rounded-full bg-white px-8 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-800 shadow-lg transition hover:-translate-y-0.5"
            >
              Contact DOLL
            </Link>
          </div>
        </section>
      </main>

      <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-8 lg:px-16">
        <SiteFooter />
      </div>
    </div>
  );
}
