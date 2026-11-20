import { useState } from 'react'
import Icon from '../components/Icon'
import { Reveal, Section, Tag } from '../components/Section'
import { profile, publications } from '../content/load'
import type { Publication } from '../content/schemas'
import { formatDate } from '../lib/format'

function CopyBibtex({ bibtex }: { bibtex: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(bibtex)
          setCopied(true)
          setTimeout(() => setCopied(false), 1800)
        } catch {
          /* clipboard blocked */
        }
      }}
      className="inline-flex items-center gap-1.5 text-muted transition hover:text-ink"
    >
      <Icon name={copied ? 'check' : 'copy'} className="size-3.5" />
      {copied ? 'Copied' : 'BibTeX'}
    </button>
  )
}

function Authors({ authors }: { authors: string[] }) {
  return (
    <>
      {authors.map((a, i) => (
        <span key={a}>
          {a === profile.name ? <strong className="font-semibold text-ink">{a}</strong> : a}
          {i < authors.length - 1 ? ', ' : ''}
        </span>
      ))}
    </>
  )
}

function Item({ p }: { p: Publication }) {
  return (
    <article className="py-6">
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <span className="font-mono text-xs text-muted">{formatDate(p.date)}</span>
        <Tag tone={p.status === 'published' || p.status === 'accepted' ? 'accent' : 'amber'}>{p.status}</Tag>
      </div>
      <h3 className="font-serif text-xl leading-snug">{p.title}</h3>
      <p className="mt-1 text-sm text-muted">
        <Authors authors={p.authors} />
      </p>
      {p.venue && <p className="mt-1 text-sm text-accent italic">{p.venue}</p>}
      <div className="mt-3 flex flex-wrap gap-4 text-sm">
        {p.links.pdf && <a className="inline-flex items-center gap-1.5 text-muted hover:text-ink" href={p.links.pdf} target="_blank" rel="noopener noreferrer"><Icon name="doc" className="size-3.5" />PDF</a>}
        {p.links.doi && <a className="inline-flex items-center gap-1.5 text-muted hover:text-ink" href={p.links.doi} target="_blank" rel="noopener noreferrer"><Icon name="external" className="size-3.5" />DOI</a>}
        {p.links.code && <a className="inline-flex items-center gap-1.5 text-muted hover:text-ink" href={p.links.code} target="_blank" rel="noopener noreferrer"><Icon name="github" className="size-3.5" />Code</a>}
        {p.bibtex && <CopyBibtex bibtex={p.bibtex} />}
      </div>
    </article>
  )
}

export default function Publications() {
  return (
    <Section id="publications" title="Publications">
      <div className="max-w-3xl divide-y divide-line border-y border-line">
        {publications.map((p) => (
          <Reveal key={p.slug}>
            <Item p={p} />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
