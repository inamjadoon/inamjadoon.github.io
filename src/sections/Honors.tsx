import { useMemo, useState } from 'react'
import Icon from '../components/Icon'
import { ShowMoreButton, useShowMore } from '../components/ShowMore'
import { Reveal, Section } from '../components/Section'
import { certificates, honors } from '../content/load'
import { formatDate } from '../lib/format'

type Row = { key: string; kind: string; title: string; issuer: string; detail: string; date: string; link: string }

const KIND_LABEL: Record<string, string> = {
  award: 'Award',
  contest: 'Contest',
  scholarship: 'Scholarship',
  test: 'Test score',
  recognition: 'Recognition',
  certificate: 'Certificate',
}

export default function Honors() {
  const rows: Row[] = useMemo(
    () => [
      ...honors.map((h) => ({ key: h.slug, kind: h.kind, title: h.title, issuer: h.issuer, detail: h.detail, date: h.date, link: h.link })),
      ...certificates.map((c) => ({
        key: c.slug,
        kind: 'certificate',
        title: c.title,
        issuer: c.issuer,
        detail: c.skills.join(' · '),
        date: c.date,
        link: c.credentialUrl,
      })),
    ],
    [],
  )
  const kinds = ['all', ...new Set(rows.map((r) => r.kind))]
  const [kind, setKind] = useState('all')
  const shown = kind === 'all' ? rows : rows.filter((r) => r.kind === kind)
  const more = useShowMore(shown, 4)

  return (
    <Section id="honors" title="Honors, awards & certificates">
      {kinds.length > 2 && (
        <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Filter honors">
          {kinds.map((k) => (
            <button
              key={k}
              type="button"
              aria-pressed={kind === k}
              onClick={() => setKind(k)}
              className={`rounded-full border px-3.5 py-1.5 text-sm transition ${
                kind === k ? 'border-ink bg-ink text-paper' : 'border-line text-muted hover:border-accent hover:text-ink'
              }`}
            >
              {k === 'all' ? 'All' : KIND_LABEL[k]}
            </button>
          ))}
        </div>
      )}
      <ul className="divide-y divide-line border-y border-line">
        {more.visible.map((r, i) => (
          <li key={r.key}>
            <Reveal delay={Math.min(i, 6) * 0.04}>
              <div className="grid gap-x-6 gap-y-1 py-5 sm:grid-cols-[8.5rem_1fr_auto] sm:items-baseline">
                <span className="font-mono text-[11px] tracking-wider text-amber uppercase">{KIND_LABEL[r.kind]}</span>
                <div>
                  <p className="font-serif text-lg leading-snug">{r.title}</p>
                  <p className="text-sm text-muted">
                    {[r.issuer, r.detail].filter(Boolean).join(' — ')}
                  </p>
                </div>
                <div className="flex items-center gap-4 sm:justify-end">
                  {r.date && <span className="font-mono text-xs text-muted">{formatDate(r.date)}</span>}
                  {r.link && (
                    <a
                      href={r.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-accent hover:underline"
                    >
                      Proof <Icon name="external" className="size-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
      <ShowMoreButton {...more} noun={more.hidden === 1 ? 'item' : 'items'} />
    </Section>
  )
}
