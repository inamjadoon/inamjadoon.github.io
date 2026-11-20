import { Link } from 'react-router'
import Icon from '../components/Icon'
import { ShowMoreButton, useShowMore } from '../components/ShowMore'
import { Reveal, Section, Tag } from '../components/Section'
import { hackathons, projectBySlug } from '../content/load'
import { formatDate } from '../lib/format'
import { splitTitle } from '../lib/title'

export default function Competitions() {
  const intl = hackathons.filter((h) => h.international).length
  const more = useShowMore(hackathons, 3)
  return (
    <Section
      id="competitions"
      title="Hackathons & competitions"
      intro={`${intl} international hackathon${intl === 1 ? '' : 's'} and programming contest${intl === 1 ? '' : 's'}: ideas built under time pressure, often with teams across borders.`}
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {more.visible.map((h, i) => {
          const project = h.project ? projectBySlug(h.project) : undefined
          const won = h.result && !/^participant$/i.test(h.result)
          return (
            <Reveal key={h.slug} delay={Math.min(i, 5) * 0.05}>
              <article className="group relative flex h-full flex-col rounded-2xl border border-line bg-card p-6 transition duration-300 hover:-translate-y-1 hover:border-accent/50">
                <div className="mb-5 flex items-start justify-between gap-3">
                  <span className="grid size-11 place-items-center rounded-xl bg-accent-soft text-accent">
                    <Icon name={h.type === 'contest' ? 'trophy' : 'globe'} className="size-5" />
                  </span>
                  <span className="font-mono text-[11px] text-muted uppercase">{formatDate(h.date)}</span>
                </div>
                <h3 className="font-serif text-xl leading-snug font-medium">
                  <Link to={`/hackathons/${h.slug}`} className="after:absolute after:inset-0 after:rounded-2xl">
                    {h.title}
                  </Link>
                </h3>
                <p className="mt-1 text-sm text-muted">
                  {[h.organizer, h.location].filter(Boolean).join(' · ')}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  <Tag tone={won ? 'amber' : 'plain'}>{h.result}</Tag>
                  <Tag>{h.type}</Tag>
                  {h.international && <Tag tone="accent">international</Tag>}
                </div>
                {h.body && <p className="mt-4 line-clamp-3 text-[15px] text-muted">{h.body.replace(/\*\*/g, '')}</p>}
                {project && (
                  <p className="mt-auto pt-5 text-sm">
                    <span className="font-mono text-xs text-muted uppercase">Built · </span>
                    <span className="text-accent">{splitTitle(project.title).name}</span>
                  </p>
                )}
              </article>
            </Reveal>
          )
        })}
      </div>
      <ShowMoreButton {...more} noun={more.hidden === 1 ? 'competition' : 'competitions'} />
    </Section>
  )
}
