import { formatRange } from '../lib/format'
import Icon from './Icon'
import { Reveal, Tag } from './Section'

export type TimelineItem = {
  key: string
  title: string
  subtitle: string
  start: string
  end: string
  kind?: string
  meta?: string
  link?: string
  linkLabel?: string
  highlights: string[]
}

export default function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="relative border-l border-line">
      {items.map((it, i) => (
        <li key={it.key} className="relative pb-10 pl-7 last:pb-0 sm:pl-10">
          <span className="absolute top-2 -left-[5px] size-[9px] rounded-full border-2 border-paper bg-accent ring-1 ring-accent/40" />
          <Reveal delay={Math.min(i, 4) * 0.05}>
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
              <h3 className="font-serif text-xl leading-snug font-medium">{it.title}</h3>
              <p className="shrink-0 font-mono text-xs text-muted">{formatRange(it.start, it.end)}</p>
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <p className="text-accent">{it.subtitle}</p>
              {it.kind && <Tag>{it.kind}</Tag>}
              {it.meta && <span className="font-mono text-sm text-muted">· {it.meta}</span>}
            </div>
            {it.highlights.length > 0 && (
              <ul className="mt-3 space-y-1.5 text-[15px] text-muted">
                {it.highlights.map((h) => (
                  <li key={h} className="relative pl-4 before:absolute before:top-[0.7em] before:left-0 before:h-px before:w-2 before:bg-line">
                    {h}
                  </li>
                ))}
              </ul>
            )}
            {it.link && (
              <a
                href={it.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-sm text-muted transition hover:text-accent"
              >
                <Icon name="doc" className="size-3.5" />
                {it.linkLabel || 'Certificate'}
              </a>
            )}
          </Reveal>
        </li>
      ))}
    </ol>
  )
}
