import type { Project, SkillCategory, SocialLink, Skill } from "./types"

export const BIO = {
  name: "Vano",
  title: "Developer | Product Builder",
  subtitle: "Full-stack engineer with game dev depth. Comfortable in Go and Java.",
  description:
    "Systems Information student at UPN Veteran Jakarta. I build products end-to-end — from strategy to execution. Primary stack: TypeScript/Next.js, Go, Java.",
  philosophy: "Build from scratch. Understand deeply. Ship with intention.",
}

export const PROJECTS: Project[] = [
  {
    id: "qios",
    title: "QIOS",
    description:
      "One dashboard for payments, inventory, and AI insights. Eliminates spreadsheet chaos and tool fragmentation for Indonesian SMEs. Cuts operational overhead by 60%.",
    why:
      "Solving real SME problems with full-stack execution. From discovery and architecture to deployment and business impact.",
    tags: ["SaaS", "SCM", "Business Intelligence"],
    techStack: [
      { name: "Next.js 16.2", icon: "/icons/nextjs.png", alt: "Frontend Framework" },
      { name: "Go 1.26.2", icon: "/icons/golang.png", alt: "Backend Framework" },
      { name: "PostgreSQL 18.3", icon: "/icons/postgresql.png", alt: "Database" },
      { name: "Midtrans", icon: "/icons/midtrans.png", alt: "Payment Gateway" },
      { name: "JWT", icon: "/icons/jwt.png", alt: "Authentication" },
      { name: "Biznet GioCloud", icon: "/icons/biznetgiocloud.png", alt: "Cloud Provider" }
    ],
    links: [
      { label: "GitHub", url: "https://github.com/theoneandonlyvabo/qios-web" },
    ],
    image: "/screenshots/qios-ss-1.jpeg",
    role: "Product Lead / Full-Stack",
    year: "2025",
    status: "in-development",
    featured: true,
    accentColor: "64,96,208",
  },
  {
    id: "eternafall",
    title: "ETERNAFALL",
    description:
      "A dark RPG set in Witherfeld, a world where gods fell to corruption and left humanity to rot. Hand-crafted from pure Java, no engine, no shortcuts. Turn-based combat, deep lore, and a story that loops back on itself.",
    why:
      "Built without a game engine to fully control systems, performance, and architecture from scratch.",
    tags: ["Indie Game Development", "Engine", "Architecture"],
    techStack: [
      { name: "Java 26", icon: "/icons/java.png", alt: "Programming Language" },
    ],
    links: [
      { label: "GitHub", url: "https://github.com/theoneandonlyvabo/project-eternal" },
    ],
    image: "/screenshots/eternafall-ss-1.jpeg",
    role: "Solo Developer",
    year: "2026",
    status: "in-development",
    featured: true,
    accentColor: "200,120,50",
  },
  {
    id: "grimoire",
    title: "Grimoire",
    description:
      "Grimoire, a terminal-native documentation tool that doesn't just store what you built, but why you built it, where it's going, and what it means to your codebase. All without leaving the terminal.",
    why:
      "Built to eliminate context switching and explore backend/system design using Go.",
    tags: ["CLI", "TUI", "Dev Tool"],
    techStack: [
      { name: "Go 1.26.2", icon: "/icons/golang.png", alt: "Programming Language" },
      { name: "Bubble Tea v2", icon: "/icons/bubbletea.png", alt: "TUI Framework" },
      { name: "Cobra v1.9", icon: "/icons/cobra.png", alt: "CLI Framework" }
    ],
    links: [
      { label: "GitHub", url: "https://github.com/theoneandonlyvabo/grimoire" },
    ],
    image: "/screenshots/grimoire-ss-1.jpeg",
    role: "Solo Developer",
    year: "2026",
    status: "testing",
    featured: true,
    accentColor: "0,173,216",
  },
]

export const SKILLS: SkillCategory[] = [
  {
    category: "Languages",
    items: ["TypeScript", "JavaScript", "Java", "Go", "PHP", "C"],
  },
  {
    category: "Frontend",
    items: ["React", "Next.js", "Tailwind", "HTML/CSS", "Figma"],
  },
  {
    category: "Backend & Systems",
    items: ["Express", "Laravel", "Go", "REST API"],
  },
  {
    category: "Data & Tools",
    items: ["MySQL", "PostgreSQL", "MongoDB", "Git", "Linux"],
  },
  {
    category: "Specialties",
    items: [
      "Game Development (Java)",
      "System Architecture",
      "CLI/TUI Tools",
      "Full-Stack Product Development",
    ],
  },
]

export const SKILLS_DETAILED: Skill[] = [
  {
    id: "typescript",
    label: "TypeScript",
    category: "Language",
    color: "#3178C6",
    description:
      "Primary language for all web projects. Used across the full stack, Next.js on the frontend, Node/Express on the backend. Chosen for type safety and better DX at scale.",
    related: ["React", "Next.js", "Node.js"],
    offsetY: -30,
    imagePath: "/icons/typescript.png",
  },
  {
    id: "javascript",
    label: "JavaScript",
    category: "Language",
    color: "#F7DF1E",
    description:
      "Foundation of all web work. Used directly for scripting, browser APIs, and anywhere TypeScript overhead isn't worth it.",
    related: ["TypeScript", "React"],
    offsetY: 15,
    imagePath: "/icons/javascript.png",
  },
  {
    id: "php",
    label: "PHP",
    category: "Language",
    color: "#777BB4",
    description:
      "Server-side scripting used in the Laravel ecosystem. Applied in Moneytor for backend logic, routing, and database integration.",
    related: ["Laravel", "MySQL"],
    offsetY: 30,
    imagePath: "/icons/php.png",
  },
  {
    id: "java",
    label: "Java",
    category: "Language",
    color: "#5382A1",
    description:
      "Systems and game development language. Used to build ETERNAFALL from scratch, custom rendering pipeline, game loop, battle systems, and entity management. No engine, full control.",
    related: ["AWT/Canvas", "Game Dev", "OOP"],
    offsetY: 40,
    imagePath: "/icons/java.png",
  },
  {
    id: "go",
    label: "Go",
    category: "Language",
    color: "#00ADD8",
    description:
      "Backend and CLI tooling language. Used to build Grimoire : a terminal-first developer documentation tool. Chosen for simplicity, fast compilation, and first-class concurrency.",
    related: ["Concurrency", "Bubbletea", "Gin"],
    offsetY: -20,
    imagePath: "/icons/golang.png",
  },
  {
    id: "python",
    label: "Python",
    category: "Language",
    color: "#3776AB",
    description:
      "Used for data analysis, scripting, and ML exploration. Applied in research contexts and automation tasks, not a primary production language.",
    related: ["Analytics", "Automation", "ML"],
    offsetY: -10,
    imagePath: "/icons/python.png",
  },
  {
    id: "nextjs",
    label: "Next.js",
    category: "Frontend & Backend",
    color: "#FFFFFF",
    description:
      "Primary framework for full-stack web projects. Used in QIOS and this portfolio. App Router, API routes, SSR, and server actions. Used in production context.",
    related: ["React", "TypeScript", "Vercel"],
    offsetY: 20,
    imagePath: "/icons/nextjs.png",
  },
  {
    id: "laravel",
    label: "Laravel",
    category: "Backend",
    color: "#FF2D20",
    description:
      "PHP backend framework used for Moneytor. Handled routing, ORM, authentication, and API structuring. Useful for rapid backend scaffolding.",
    related: ["PHP", "MySQL", "Eloquent"],
    offsetY: 45,
    imagePath: "/icons/laravel.png",
  },
  {
    id: "springboot",
    label: "Spring Boot",
    category: "Backend",
    color: "#45d000",
    description:
      "Java-based backend framework explored for REST API development. Familiar with its project structure, dependency injection, and MVC pattern. Not yet used in a shipped project.",
    related: ["Java", "REST API", "MVC"],
    offsetY: -30,
    imagePath: "/icons/springboot.png",
    isExperimental: true,
  },
  {
    id: "mysql",
    label: "MySQL",
    category: "Data",
    color: "#006c85",
    description:
      "Relational database used in Laravel-based projects. Handles structured data with schema design, relational modeling, and query optimization.",
    related: ["Laravel", "PHP", "SQL"],
    offsetY: 35,
    imagePath: "/icons/mysql.png",
  },
  {
    id: "postgres",
    label: "PostgreSQL",
    category: "Data",
    color: "#336791",
    description:
      "Primary relational database for Next.js projects. Used for schema design, indexing, and more complex relational data requirements.",
    related: ["Next.js", "Prisma", "SQL"],
    offsetY: -15,
    imagePath: "/icons/postgresql.png",
  },
  {
    id: "mongodb",
    label: "MongoDB",
    category: "Data",
    color: "#47A248",
    description:
      "NoSQL database for flexible, document-based data storage. Used where schema flexibility and horizontal scaling matter more than strict relational structure.",
    related: ["Node.js", "Express", "NoSQL"],
    offsetY: 25,
    imagePath: "/icons/mongodb.png",
  },
  {
    id: "figma",
    label: "Figma",
    category: "Design",
    color: "#F24E1E",
    description:
      "UI/UX design and prototyping tool. Used for wireframing and component design before development, part of the standard workflow before touching code.",
    related: ["UI/UX", "Design System", "Prototyping"],
    offsetY: -45,
    imagePath: "/icons/figma.png",
  },
  {
    id: "claude",
    label: "Claude",
    category: "AI",
    color: "#D97757",
    description:
      "Deep daily use of Anthropic's Claude for development workflow, architecture decisions, code review, debugging, and documentation. Also exploring Claude Code and API integration.",
    related: ["LLM", "Claude Code", "Anthropic"],
    offsetY: 15,
    imagePath: "/icons/claude.png",
  },
  {
    id: "ollama",
    label: "Ollama",
    category: "AI",
    color: "#AAAAAA",
    description:
      "Running open-source LLMs locally for privacy-focused experimentation. Used to explore local inference, model behavior, and offline AI workflows.",
    related: ["Local LLM", "Open Source AI"],
    offsetY: -25,
    imagePath: "/icons/ollama.png",
    isExperimental: true,
  },
  {
    id: "openclaw",
    label: "OpenClaw",
    category: "AI / Tools",
    color: "#ff3232",
    description:
      "Internal experiment exploring LLM orchestration and local AI tooling. Early-stage, direction and scope still being defined.",
    related: ["LLM", "Local AI", "Ollama"],
    offsetY: 10,
    imagePath: "/icons/openclaw.png",
    isExperimental: true,
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "GitHub", url: "https://github.com/theoneandonlyvabo" },
  { label: "LinkedIn", url: "https://linkedin.com/in/aireladrivano" },
  { label: "Email", url: "mailto:aireladrivano196@gmail.com" },
  { label: "Instagram", url: "https://instagram.com/aireladrivano" },
]