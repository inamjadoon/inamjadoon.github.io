import { Link } from 'react-router'
import { areaName } from '../content/load'
import type { Project } from '../content/schemas'
import { formatDate } from '../lib/format'
import { splitTitle } from '../lib/title'
import Icon from './Icon'
import { Tag } from './Section'

export default function ProjectCard({ project }: { project: Project }) {
  const { name, tagline } = splitTitle(project.title)

  return (
    <article className="group relative flex h-full flex-col rounded-2xl border border-line bg-card p-6 transition duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_18px_40px_-24px_rgb(0_0_0/0.35)]">
      <div className="mb-5 flex flex-wrap items-center gap-2 font-mono text-[11px] text-muted uppercase">
        <span>{formatDate(project.date)}</span>
        <span className="text-line">/</span>
        <span className="text-accent">{areaName(project.areas[0])}</span>
        {project.status === 'ongoing' && <Tag tone="amber">ongoing</Tag>}
        {project.links.demo && <Tag tone="accent">live</Tag>}
      </div>

      <h3 className="font-serif text-2xl leading-tight font-medium tracking-tight">
        <Link to={`/projects/${project.slug}`} className="after:absolute after:inset-0 after:rounded-2xl">
          {name}
        </Link>
      </h3>
      {tagline && <p className="mt-1 text-[15px] text-ink/80">{tagline}</p>}
      <p className="mt-4 text-[15px] text-muted">{project.summary}</p>
      {project.role && <p className="mt-3 font-mono text-xs text-muted">{project.role}</p>}

      <div className="mt-auto pt-6">
        <ul className="flex flex-wrap gap-1.5">
          {project.tech.slice(0, 5).map((t) => (
            <li key={t}>
              <Tag>{t}</Tag>
            </li>
          ))}
        </ul>
        {/* Row is click-through so "Details" reaches the card link; only Code/Live catch clicks */}
        <div className="pointer-events-none relative z-10 mt-5 flex items-center gap-4 text-sm">
          {project.links.github && (
            <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="pointer-events-auto inline-flex items-center gap-1.5 text-muted transition hover:text-ink">
              <Icon name="github" /> Code
            </a>
          )}
          {project.links.demo && (
            <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="pointer-events-auto inline-flex items-center gap-1.5 font-medium text-accent transition hover:underline">
              <Icon name="external" /> Live demo
            </a>
          )}
          <span className="pointer-events-none ml-auto inline-flex items-center gap-1 text-muted transition group-hover:text-accent">
            Details <Icon name="arrow" className="size-3.5 transition group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </article>
  )
}
