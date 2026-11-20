import type { ComponentType } from 'react'
import About from '../sections/About'
import Competitions from '../sections/Competitions'
import Contact from '../sections/Contact'
import Experience from '../sections/Experience'
import Hero from '../sections/Hero'
import Honors from '../sections/Honors'
import Leadership from '../sections/Leadership'
import Publications from '../sections/Publications'
import Research from '../sections/Research'
import Skills from '../sections/Skills'
import { sections } from '../site'

/** Section id (from site.ts) → component. Register new sections here. */
const registry: Record<string, ComponentType> = {
  about: About,
  research: Research,
  publications: Publications,
  experience: Experience,
  competitions: Competitions,
  honors: Honors,
  leadership: Leadership,
  skills: Skills,
  contact: Contact,
}

export default function Home() {
  return (
    <>
      <Hero />
      {sections.map((s) => {
        const C = registry[s.id]
        return C ? <C key={s.id} /> : null
      })}
    </>
  )
}
