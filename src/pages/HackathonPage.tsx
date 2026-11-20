import { useParams } from 'react-router'
import DetailLayout, { AsideBlock } from '../components/DetailLayout'
import Icon from '../components/Icon'
import ProjectCard from '../components/ProjectCard'
import { Tag } from '../components/Section'
import { hackathonBySlug, profile, projectBySlug } from '../content/load'
import { formatDate } from '../lib/format'
import NotFound from './NotFound'

const LINK_LABELS = { event: 'Event / project page', devpost: 'Devpost submission', certificate: 'Certificate' } as const

export default function HackathonPage() {
  const { slug = '' } = useParams()
  const h = hackathonBySlug(slug)
  if (!h) return <NotFound />

  const project = h.project ? projectBySlug(h.project) : undefined
  const links = Object.entries(h.links).filter(([, v]) => v) as [keyof typeof LINK_LABELS, string][]

  return (
    <>
      <title>{`${h.title} — ${profile.name}`}</title>
      <DetailLayout
        back={{ to: '/#competitions', label: 'All hackathons & competitions' }}
        kicker={
          <>
            <span>{formatDate(h.date)}</span>
            <span className="text-line">/</span>
            <span>{h.type}</span>
            {h.international && <Tag tone="accent">international</Tag>}
          </>
        }
        title={h.title}
        tagline={h.challenge ? `Challenge: ${h.challenge}` : undefined}
        aside={
          <>
            <AsideBlock label="Result">
              <Tag tone={/^participant$/i.test(h.result) ? 'plain' : 'amber'}>{h.result}</Tag>
            </AsideBlock>
            {h.organizer && <AsideBlock label="Organizer">{h.organizer}</AsideBlock>}
            {h.location && <AsideBlock label="Where">{h.location}</AsideBlock>}
            {h.role && <AsideBlock label="My role">{h.role}</AsideBlock>}
            {h.team.length > 0 && <AsideBlock label="Team">{h.team.join(', ')}</AsideBlock>}
            {links.length > 0 && (
              <div className="flex flex-col gap-2">
                {links.map(([k, href]) => (
                  <a
                    key={k}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between rounded-full border border-line px-4 py-2.5 text-sm transition hover:border-accent hover:text-accent"
                  >
                    {LINK_LABELS[k]} <Icon name="external" />
                  </a>
                ))}
              </div>
            )}
          </>
        }
      >
        {h.image && <img src={h.image} alt={`${h.title}`} className="mb-8 rounded-xl border border-line" />}
        <div className="prose" dangerouslySetInnerHTML={{ __html: h.html }} />
        {project && (
          <div className="mt-12">
            <h2 className="mb-4 font-mono text-xs tracking-wider text-muted uppercase">What we built</h2>
            <ProjectCard project={project} />
          </div>
        )}
      </DetailLayout>
    </>
  )
}
