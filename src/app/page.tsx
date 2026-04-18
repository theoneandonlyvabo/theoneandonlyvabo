import Hero from '@/components/Hero'
import JourneySection from '@/components/JourneySection'
import SkillsSection from '@/components/SkillsSection'
import ProjectsSection from '@/components/ProjectsSection'
import ChatbotSection from '@/components/ChatbotSection'

export default function Home() {
  return (
    <main>
      <Hero />
      <JourneySection />
      <SkillsSection />
      <ProjectsSection />
      <ChatbotSection />
    </main>
  )
}