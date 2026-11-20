import profileJson from '../../content/profile.json'
import areasJson from '../../content/areas.json'
import skillsJson from '../../content/skills.json'
import type { Area, CollectionName, Entry, Profile, Skills } from './schemas'

// Markdown files are validated and converted to { ...frontmatter, slug, body, html }
// at build time by scripts/content-plugin.ts. One glob per folder (Vite needs literal
// patterns). Files starting with "_" are ignored.
type Files<K extends CollectionName> = Record<string, Entry<K>>

const files = {
  projects: import.meta.glob('/content/projects/[!_]*.md', { import: 'default', eager: true }),
  hackathons: import.meta.glob('/content/hackathons/[!_]*.md', { import: 'default', eager: true }),
  honors: import.meta.glob('/content/honors/[!_]*.md', { import: 'default', eager: true }),
  certificates: import.meta.glob('/content/certificates/[!_]*.md', { import: 'default', eager: true }),
  experience: import.meta.glob('/content/experience/[!_]*.md', { import: 'default', eager: true }),
  education: import.meta.glob('/content/education/[!_]*.md', { import: 'default', eager: true }),
  leadership: import.meta.glob('/content/leadership/[!_]*.md', { import: 'default', eager: true }),
  publications: import.meta.glob('/content/publications/[!_]*.md', { import: 'default', eager: true }),
}

/** Sort: explicit `order` first (lower = earlier), then newest date. */
function byOrderThenDate(a: Record<string, unknown>, b: Record<string, unknown>) {
  const oa = (a.order as number) ?? 100
  const ob = (b.order as number) ?? 100
  if (oa !== ob) return oa - ob
  const d = (x: Record<string, unknown>) => ((x.date ?? x.end ?? x.start ?? '') as string)
  return d(b).localeCompare(d(a))
}

function load<K extends CollectionName>(name: K): Entry<K>[] {
  return Object.values(files[name] as Files<K>).sort(byOrderThenDate)
}

// profile.json and skills.json are validated by `npm run check:content`.
export const profile = profileJson as Profile
export const skills = skillsJson as Skills
export const areas = areasJson as Area[]
export const areaName = (id: string) => areas.find((a) => a.id === id)?.name ?? id

export const projects = load('projects')
export const hackathons = load('hackathons')
export const honors = load('honors')
export const certificates = load('certificates')
export const experience = load('experience')
export const education = load('education')
export const leadership = load('leadership')
export const publications = load('publications')

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug)
export const hackathonBySlug = (slug: string) => hackathons.find((h) => h.slug === slug)
