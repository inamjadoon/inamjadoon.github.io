import { useState } from 'react'
import ProjectCard from '../components/ProjectCard'
import { Reveal, Section } from '../components/Section'
import { areas, projects } from '../content/load'
import { splitTitle } from '../lib/title'

// Only areas that have at least one project are shown.
const usedAreas = areas
  .map((a) => ({ ...a, projects: projects.filter((p) => p.areas.includes(a.id)) }))
  .filter((a) => a.projects.length > 0)

export default function Research() {
  const [area, setArea] = useState<string | null>(null)
  const [showAll, setShowAll] = useState(false)

  const filtered = area ? projects.filter((p) => p.areas.includes(area)) : projects
  const visible = showAll || area ? filtered : filtered.filter((p) => p.featured)
  const hiddenCount = filtered.length - visible.length
  const active = usedAreas.find((a) => a.id === area)

  const pick = (id: string | null) => {
    setArea(id)
    document.getElementById('project-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <Section
      id="research"
      title="Research areas & projects"
      intro="My work crosses several fields. Pick an area to see the projects behind it, or browse everything below."
    >
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {usedAreas.map((a, i) => (
          <li key={a.id}>
            <Reveal delay={Math.min(i, 5) * 0.04} className="h-full">
              <button
                type="button"
                onClick={() => pick(area === a.id ? null : a.id)}
                aria-pressed={area === a.id}
                className={`flex h-full w-full flex-col rounded-2xl border p-5 text-left transition hover:-translate-y-0.5 ${
                  area === a.id ? 'border-accent bg-accent-soft' : 'border-line bg-card hover:border-accent/50'
                }`}
              >
                <span className="flex w-full items-baseline justify-between gap-3">
                  <span className="font-serif text-lg leading-snug">{a.name}</span>
                  <span className="font-mono text-xs text-accent">{String(a.projects.length).padStart(2, '0')}</span>
                </span>
                <span className="mt-2 text-sm text-muted">{a.blurb}</span>
                <span className="mt-auto pt-4 font-mono text-[11px] leading-relaxed text-muted">
                  {a.projects.map((p) => splitTitle(p.title).name).join(' · ')}
                </span>
              </button>
            </Reveal>
          </li>
        ))}
      </ul>

      <div id="project-grid" className="mt-14 mb-6 flex scroll-mt-24 flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-xs tracking-wider text-muted uppercase">
          {active ? (
            <>
              {filtered.length} project{filtered.length === 1 ? '' : 's'} in <span className="text-accent">{active.name}</span>
            </>
          ) : (
            <>{showAll ? 'All projects' : 'Selected projects'}</>
          )}
        </p>
        {area && (
          <button type="button" onClick={() => setArea(null)} className="rounded-full border border-line px-3.5 py-1.5 text-sm transition hover:border-accent hover:text-accent">
            Show all areas ✕
          </button>
        )}
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((p, i) => (
          <Reveal key={`${area}-${p.slug}`} delay={Math.min(i, 5) * 0.05}>
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>

      {hiddenCount > 0 && (
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className="rounded-full border border-line px-5 py-2.5 text-sm transition hover:border-accent hover:text-accent"
          >
            Show {hiddenCount} more project{hiddenCount > 1 ? 's' : ''}
          </button>
        </div>
      )}
    </Section>
  )
}
