export type ProjectLink = {
  label: string
  url: string
}

export type Project = {
  id: string
  title: string
  description: string
  why: string
  tags: string[]
  techStack: { name: string; icon: string; alt?: string }[]
  links: { label: string; url: string }[]
  image?: string
  role: string
  year: string
  status: "in-development" | "testing" | "live"
  featured: boolean
  accentColor: string
}

export type SkillCategory = {
  category: string
  items: string[]
}

/**
 * 🔥 NEW: detailed skill (buat SkillsSection)
 */
export type Skill = {
  id: string
  label: string
  category: string
  color: string
  description: string
  related: string[]
  offsetY: number
  imagePath: string
  isExperimental?: boolean
}

export type SocialLink = {
  label: string
  url: string
}

export type ChatMessage = {
  role: 'user' | 'assistant'
  content: string
}