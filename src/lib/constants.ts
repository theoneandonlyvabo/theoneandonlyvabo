import type { Project, SkillCategory, SocialLink } from "./types"

export const BIO = {
  name: "Vano",
  title: "Developer | Product Builder",
  subtitle: "Full-stack engineer with game dev depth. Comfortable in Go and Java.",
  description:
    "Systems Information student at UPN Veteran Jakarta. I build products end-to-end — from strategy to execution. Primary stack: TypeScript/Next.js, Go, Java. Currently shipping QIOS (SME operations platform), Moneytor (AI finance app), and EternaFall (pure Java 2D RPG). Also exploring game architecture, scalable systems, and what actually matters.",
  philosophy: "Build from scratch. Understand deeply. Ship with intention.",
}

export const PROJECTS: Project[] = [
  {
    id: "qios",
    title: "QIOS",
    description:
      "Web-based SME operations platform integrating finance, inventory, and analytics. AI-driven insights to reduce operational risk. Built with Next.js and TypeScript.",
    why: "End-to-end product development. From problem identification to full-stack execution with real business impact.",
    tags: ["Next.js", "TypeScript", "Full Stack", "AI Analytics"],
    links: [
      { label: "GitHub", url: "https://github.com/theoneandonlyvabo/qios-web" },
    ],
    image: "/screenshots/qios.png",
    status: "in-progress",
    featured: true,
  },
  {
    id: "eternalfall",
    title: "EternaFall",
    description:
      "Pure Java 2D RPG. Custom rendering engine, battle system with AP economy, NPC dialog system, full inventory architecture. Built without game engine.",
    why: "Full control over every system. No abstractions hiding how things work. Game architecture and performance optimization from scratch.",
    tags: ["Java", "Game Dev", "Custom Engine", "Architecture"],
    links: [
      { label: "GitHub", url: "https://github.com/theoneandonlyvabo/project-eternal" },
    ],
    image: "/screenshots/eternalfall.png",
    status: "active",
    featured: true,
  },
  {
    id: "grimoire",
    title: "Grimoire",
    description:
      "Developer-focused documentation tool built in Go. TUI application for managing code knowledge and team insights directly in the development workflow.",
    why: "Backend systems thinking. Different paradigm than web. Go's simplicity forces clarity in architecture.",
    tags: ["Go", "TUI", "CLI", "Developer Tools"],
    links: [
      { label: "GitHub", url: "https://github.com/theoneandonlyvabo/grimoire" },
    ],
    image: "/screenshots/grimoire.png",
    status: "active",
    featured: true,
  },
]

export const SKILLS: SkillCategory[] = [
  {
    category: "Languages",
    items: ["TypeScript", "JavaScript", "Java", "Go", "PHP", "C"],
  },
  {
    category: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "HTML/CSS", "Figma"],
  },
  {
    category: "Backend & Systems",
    items: ["Node.js", "Express", "Laravel", "Go (Concurrency)", "REST API"],
  },
  {
    category: "Databases & Tools",
    items: ["MySQL", "PostgreSQL", "MongoDB", "Git", "Linux"],
  },
  {
    category: "Specialties",
    items: ["Game Development (Java)", "System Architecture", "CLI/TUI Tools", "Full-Stack Product Development"],
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "GitHub", url: "https://github.com/theoneandonlyvabo" },
  { label: "LinkedIn", url: "https://linkedin.com/in/aireladrivano" },
  { label: "Email", url: "mailto:aireladrivano196@gmail.com" },
  { label: "Instagram", url: "https://instagram.com/aireladrivano" },
]

export const CHATBOT_SYSTEM_PROMPT = `You are a portfolio assistant for Vano (Airel Adrivano), a full-stack developer and product builder.

About Vano:
- Developer: TypeScript/Next.js primary, Java and Go specialist
- Education: S1 Sistem Informasi at UPN Veteran Jakarta (2024–active), Focus on Product Development & Business-Driven Technology
- Leadership: Internal Supervisory Unit @ PSDM, Founder of 2030 SUKSES! project initiative
- Experienced: Full-stack development, product management, business development, live production

Current Projects:
- QIOS: Web-based SME operations platform (Next.js, TypeScript, AI analytics) - pre-launch
- EternaFall: Pure Java 2D RPG, custom rendering engine, no game engine - in development
- Grimoire: Developer documentation tool in Go (TUI/CLI) - active
- Moneytor: AI-powered personal finance app (Laravel, PHP) - pre-testing

Skills:
- Languages: TypeScript, JavaScript, Java, Go, PHP, C
- Frontend: React, Next.js, Tailwind CSS, HTML/CSS, Figma
- Backend: Node.js, Express, Laravel, Go (Concurrency)
- Databases: MySQL, PostgreSQL, MongoDB
- Specialties: Full-stack product development, Game development (Java), System architecture, CLI/TUI tools

Philosophy: "Build from scratch. Understand deeply. Ship with intention."

Answer questions about Vano's work, projects, skills, and experience. Be concise and accurate. Keep tone professional but direct. Emphasize full-stack thinking and architectural depth.`