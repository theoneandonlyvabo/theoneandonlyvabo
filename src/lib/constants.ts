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
      "SME operations platform integrating finance, inventory, and analytics with AI-driven insights.",
    why:
      "End-to-end product development. From problem discovery to full-stack execution with real business impact.",
    tags: ["Next.js", "TypeScript", "Full Stack", "AI"],
    links: [
      { label: "GitHub", url: "https://github.com/theoneandonlyvabo/qios-web" },
    ],
    image: "/screenshots/qios-ss-1.jpeg",
    role: "Product Lead / Full-Stack",
    year: "2025",
    status: "in-progress",
    featured: true,
  },
  {
    id: "eternafall",
    title: "ETERNAFALL",
    description:
      "Pure Java 2D RPG with custom rendering engine, battle system, and full game architecture.",
    why:
      "Built without a game engine to fully control systems, performance, and architecture from scratch.",
    tags: ["Java", "Game Dev", "Engine", "Architecture"],
    links: [
      { label: "GitHub", url: "https://github.com/theoneandonlyvabo/project-eternal" },
    ],
    image: "/screenshots/eternafall-ss-1.jpeg",
    role: "Solo Developer",
    year: "2026",
    status: "active",
    featured: true,
  },
  {
    id: "grimoire",
    title: "Grimoire",
    description:
      "Terminal-based documentation tool for developers to manage knowledge without leaving the workflow.",
    why:
      "Built to eliminate context switching and explore backend/system design using Go.",
    tags: ["Go", "CLI", "TUI", "Dev Tool"],
    links: [
      { label: "GitHub", url: "https://github.com/theoneandonlyvabo/grimoire" },
    ],
    image: "/screenshots/grimoire-ss-1.jpeg",
    role: "Solo Developer",
    year: "2026",
    status: "active",
    featured: true,
  },
]

/**
 * simple list section
 */
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
    items: ["Express", "Laravel", "Go Concurrency", "REST API"],
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

/**
 * animated bubbles
 */
export const SKILLS_DETAILED: Skill[] = [

  {
    id: "java",
    label: "Java",
    category: "Language",
    color: "#b07219",
    description: "Strongly-typed backend language used for enterprise systems, Android apps, and high-scale backend services.",
    related: ["Spring Boot", "Backend Systems", "OOP"],
    offsetY: 20,
    imagePath: "/icons/java.png",
  },

  {
    id: "go",
    label: "Go",
    category: "Language",
    color: "#00ADD8",
    description: "Efficient backend language designed for concurrency, microservices, and cloud-native systems.",
    related: ["Microservices", "DevOps", "Concurrency"],
    offsetY: -20,
    imagePath: "/icons/golang.png",
  },

  {
    id: "python",
    label: "Python",
    category: "Language",
    color: "#3776AB",
    description: "General-purpose language used for automation, data processing, backend services, and AI workflows.",
    related: ["Data Science", "Automation", "AI/ML"],
    offsetY: -10,
    imagePath: "/icons/python.png",
  },

  {
    id: "javascript",
    label: "JavaScript",
    category: "Language",
    color: "#f7df1e",
    description: "Core language of the web used for frontend interactivity and backend (Node.js) development.",
    related: ["Web Development", "React", "Node.js"],
    offsetY: 15,
    imagePath: "/icons/javascript.png",
  },

  {
    id: "typescript",
    label: "TypeScript",
    category: "Language",
    color: "#3178C6",
    description: "Typed superset of JavaScript used for scalable frontend and full-stack web applications.",
    related: ["React", "Next.js", "Node.js"],
    offsetY: -30,
    imagePath: "/icons/typescript.png",
  },

  {
    id: "php",
    label: "PHP",
    category: "Backend Language",
    color: "#777bb4",
    description: "Server-side scripting language widely used for web applications and CMS-driven systems.",
    related: ["Laravel", "MySQL", "Web Backend"],
    offsetY: 30,
    imagePath: "/icons/php.png",
  },

  {
    id: "laravel",
    label: "Laravel",
    category: "Backend Framework",
    color: "#ff2d20",
    description: "PHP framework for building structured backend applications with MVC architecture.",
    related: ["PHP", "REST API", "MySQL"],
    offsetY: 45,
    imagePath: "/icons/laravel.png",
  },

  {
    id: "nextjs",
    label: "Next.js",
    category: "Fullstack Framework",
    color: "#ffffff",
    description: "React-based framework for SSR, full-stack apps, and production-ready web platforms.",
    related: ["React", "Vercel", "API Routes"],
    offsetY: 20,
    imagePath: "/icons/nextjs.png",
  },

  {
    id: "springboot",
    label: "Spring Boot",
    category: "Backend Framework",
    color: "#6db33f",
    description: "Java framework for building scalable REST APIs and enterprise backend systems.",
    related: ["Java", "Microservices", "REST API"],
    offsetY: -30,
    imagePath: "/icons/springboot.png",
  },

  {
    id: "mysql",
    label: "MySQL",
    category: "Database",
    color: "#00758f",
    description: "Relational database system used for structured data storage in web applications.",
    related: ["SQL", "Backend Systems", "Laravel"],
    offsetY: 35,
    imagePath: "/icons/mysql.png",
  },

  {
    id: "postgres",
    label: "PostgreSQL",
    category: "Database",
    color: "#336791",
    description: "Advanced relational database with strong consistency and complex query support.",
    related: ["SQL", "Schema Design", "Backend Systems"],
    offsetY: -15,
    imagePath: "/icons/postgresql.png",
  },

  {
    id: "mongodb",
    label: "MongoDB",
    category: "Database",
    color: "#47a248",
    description: "NoSQL document database used for flexible and scalable data models.",
    related: ["Node.js", "Express", "NoSQL"],
    offsetY: 25,
    imagePath: "/icons/mongodb.png",
  },

  {
    id: "figma",
    label: "Figma",
    category: "Design",
    color: "#f24e1e",
    description: "Collaborative UI/UX design tool used for prototyping and design systems.",
    related: ["UI Design", "Design System", "Prototyping"],
    offsetY: -45,
    imagePath: "/icons/figma.png",
  },

  {
    id: "claude",
    label: "Claude",
    category: "AI Tool",
    color: "#d97757",
    description: "Large language model used to accelerate development, ideation, and code generation workflows.",
    related: ["LLM", "Prompt Engineering", "AI Assisted Dev"],
    offsetY: 15,
    imagePath: "/icons/claude.png",
  },

  {
    id: "ollama",
    label: "Ollama",
    category: "AI Tool",
    color: "#ffffff",
    description: "Local LLM runtime for running and testing open-source AI models offline.",
    related: ["Local AI", "LLM", "Inference"],
    offsetY: -25,
    imagePath: "/icons/ollama.png",
    isExperimental: true,
  },

  {
    id: "openclaw",
    label: "OpenClaw",
    category: "AI Tooling",
    color: "#ff3232",
    description: "Local orchestration tool for managing and experimenting with multiple LLM workflows.",
    related: ["LLM Orchestration", "Prompting", "Local AI", "Ollama"],
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

export const CHATBOT_SYSTEM_PROMPT = `You are a portfolio assistant for Vano (Airel Adrivano)...`