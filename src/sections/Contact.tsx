import { useState } from 'react'
import Icon from '../components/Icon'
import { Reveal, Section } from '../components/Section'
import { profile } from '../content/load'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const links = [
    { href: profile.links.github, label: 'GitHub', handle: profile.links.github.replace('https://github.com/', '@'), icon: 'github' as const },
    { href: profile.links.linkedin, label: 'LinkedIn', handle: 'in/inamjadoon', icon: 'linkedin' as const },
    { href: profile.links.scholar, label: 'Google Scholar', handle: 'Profile', icon: 'scholar' as const },
    { href: profile.links.orcid, label: 'ORCID', handle: profile.links.orcid.split('/').pop() ?? '', icon: 'doc' as const },
  ].filter((l) => l.href)

  return (
    <Section id="contact" title={<>Let's work on something that matters.</>} intro={profile.openTo}>
      <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
        <Reveal>
          <div className="rounded-2xl border border-line bg-card p-6 sm:p-8">
            <p className="font-mono text-xs tracking-wider text-muted uppercase">Email</p>
            <a href={`mailto:${profile.email}`} className="mt-2 block font-serif text-[clamp(1.3rem,4.5vw,2.25rem)] break-all transition hover:text-accent">
              {profile.email}
            </a>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition hover:bg-accent hover:text-accent-ink"
              >
                <Icon name="mail" /> Write to me
              </a>
              <button
                type="button"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(profile.email)
                    setCopied(true)
                    setTimeout(() => setCopied(false), 1800)
                  } catch {
                    /* clipboard blocked */
                  }
                }}
                className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm transition hover:border-accent hover:text-accent"
              >
                <Icon name={copied ? 'check' : 'copy'} /> {copied ? 'Copied' : 'Copy address'}
              </button>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <ul className="divide-y divide-line border-y border-line">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 py-4 transition hover:text-accent"
                >
                  <Icon name={l.icon} className="size-5 text-muted group-hover:text-accent" />
                  <span className="font-medium">{l.label}</span>
                  <span className="ml-auto font-mono text-xs text-muted">{l.handle}</span>
                  <Icon name="external" className="size-3.5 text-muted" />
                </a>
              </li>
            ))}
            <li>
              <a href={`/${profile.cv}`} download="Inam_Ullah_Khan_CV.pdf" className="group flex items-center gap-4 py-4 transition hover:text-accent">
                <Icon name="download" className="size-5 text-muted group-hover:text-accent" />
                <span className="font-medium">Curriculum Vitae</span>
                <span className="ml-auto font-mono text-xs text-muted">PDF</span>
              </a>
            </li>
          </ul>
        </Reveal>
      </div>
    </Section>
  )
}
