import { Link, useParams } from 'react-router'
import DetailLayout, { AsideBlock } from '../components/DetailLayout'
import Icon from '../components/Icon'
import { Tag } from '../components/Section'
import { areaName, hackathonBySlug, profile, projectBySlug, projects } from '../content/load'
import { formatDate } from '../lib/format'
import { splitTitle } from '../lib/title'
import NotFound from './NotFound'

const LINK_LABELS = { github: 'Source code', demo: 'Live demo', devpost: 'Devpost', paper: 'Paper', video: 'Video' } as const

export default function ProjectPage() {
  const { slug = '' } = useParams()
  const project = projectBySlug(slug)
  if (!project) return <NotFound />

  const { name, tagline } = splitTitle(project.title)
  const hackathon = project.hackathon ? hackathonBySlug(project.hackathon) : undefined
  const idx = projects.indexOf(project)
  const next = projects[(idx + 1) % projects.length]
  const links = Object.entries(project.links).filter(([, v]) => v) as [keyof typeof LINK_LABELS, string][]

  return (
    <>
      <title>{`${name} — ${profile.name}`}</title>
      <meta name="description" content={project.summary} />
      <DetailLayout
        back={{ to: '/#research', label: 'All projects' }}
        kicker={
          <>
            <span>{formatDate(project.date)}</span>
            <span className="text-line">/</span>
            <span>{areaName(project.areas[0])}</span>
            {project.status === 'ongoing' && <Tag tone="amber">ongoing</Tag>}
          </>
        }
        title={name}
        tagline={tagline}
        aside={
          <>
            {links.length > 0 && (
              <div className="flex flex-col gap-2">
                {links.map(([k, href]) => (
                  <a
                    key={k}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center justify-between rounded-full px-4 py-2.5 text-sm font-medium transition ${
                      k === 'demo' || (k === 'github' && !project.links.demo)
                        ? 'bg-ink text-paper hover:bg-accent hover:text-accent-ink'
                        : 'border border-line hover:border-accent hover:text-accent'
                    }`}
                  >
                    {LINK_LABELS[k]}
                    <Icon name={k === 'github' ? 'github' : 'external'} />
                  </a>
                ))}
              </div>
            )}
            {project.role && <AsideBlock label="Role">{project.role}</AsideBlock>}
            {hackathon && (
              <AsideBlock label="Built at">
                <Link to={`/hackathons/${hackathon.slug}`} className="text-accent hover:underline">
                  {hackathon.title}
                </Link>
              </AsideBlock>
            )}
            <AsideBlock label="Stack">
              <ul className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <li key={t}>
                    <Tag>{t}</Tag>
                  </li>
                ))}
              </ul>
            </AsideBlock>
            <AsideBlock label="Areas">
              <p className="text-muted">{project.areas.map(areaName).join(' · ')}</p>
            </AsideBlock>
            {project.tags.length > 0 && (
              <AsideBlock label="Topics">
                <p className="text-muted">{project.tags.join(' · ')}</p>
              </AsideBlock>
            )}
          </>
        }
      >
        <p className="mb-8 text-xl leading-relaxed text-ink/90">{project.summary}</p>
        {project.image && <img src={project.image} alt={`${name} screenshot`} className="mb-8 rounded-xl border border-line" />}
        <div className="prose" dangerouslySetInnerHTML={{ __html: project.html }} />

        {next && next !== project && (
          <Link
            to={`/projects/${next.slug}`}
            className="group mt-16 flex items-center justify-between rounded-2xl border border-line bg-card p-6 transition hover:border-accent"
          >
            <span>
              <span className="block font-mono text-xs text-muted uppercase">Next project</span>
              <span className="font-serif text-2xl">{splitTitle(next.title).name}</span>
            </span>
            <Icon name="arrow" className="size-5 text-accent transition group-hover:translate-x-1" />
          </Link>
        )}
      </DetailLayout>
    </>
  )
}
