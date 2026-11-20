import { motion, useReducedMotion } from 'motion/react'
import { Link } from 'react-router'
import ContourField from '../components/ContourField'
import Icon from '../components/Icon'
import Portrait from '../components/Portrait'
import { profile } from '../content/load'

export default function Hero() {
  const reduce = useReducedMotion()
  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
        }

  const [first, ...rest] = profile.name.split(' ')

  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden pt-16" aria-label="Introduction">
      <ContourField className="absolute inset-0" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-paper" />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-full bg-gradient-to-r from-paper via-paper/70 to-transparent md:w-2/3" />

      <div className="relative mx-auto grid w-full max-w-6xl flex-1 items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_18.5rem]">
        <div className="flex flex-col">
        <motion.p {...rise(0.05)} className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs tracking-wider text-muted uppercase">
          <span className="text-accent">●</span>
          {profile.headline.split('·').map((part, i) => (
            <span key={i} className="flex items-center gap-3">
              {i > 0 && <span className="text-line">/</span>}
              {part.trim()}
            </span>
          ))}
        </motion.p>

        <motion.h1
          {...rise(0.12)}
          className="font-serif text-[clamp(2.9rem,9vw,6.5rem)] leading-[0.95] font-medium tracking-[-0.03em]"
        >
          {first}
          <br />
          <span className="text-accent italic">{rest.join(' ')}</span>
        </motion.h1>

        <motion.p {...rise(0.2)} className="mt-8 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
          {profile.statement}
        </motion.p>

        <motion.div {...rise(0.28)} className="mt-10 flex flex-wrap items-center gap-3">
          <Link
            to="/#research"
            className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-paper transition hover:bg-accent hover:text-accent-ink"
          >
            View research
            <Icon name="arrow" className="size-4 transition group-hover:translate-x-0.5" />
          </Link>
          <a
            href={`/${profile.cv}`}
            download="Inam_Ullah_Khan_CV.pdf"
            className="inline-flex items-center gap-2 rounded-full border border-line bg-card/70 px-5 py-3 text-sm font-medium backdrop-blur transition hover:border-accent hover:text-accent"
          >
            <Icon name="download" />
            Download CV
          </a>
          <div className="flex items-center gap-1 sm:ml-2">
            {[
              { href: profile.links.github, icon: 'github' as const, label: 'GitHub' },
              { href: profile.links.linkedin, icon: 'linkedin' as const, label: 'LinkedIn' },
              { href: profile.links.scholar, icon: 'scholar' as const, label: 'Google Scholar' },
              { href: `mailto:${profile.email}`, icon: 'mail' as const, label: 'Email' },
            ]
              .filter((l) => l.href)
              .map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target={l.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={l.label}
                  title={l.label}
                  className="grid size-11 place-items-center rounded-full text-muted transition hover:bg-accent-soft hover:text-accent"
                >
                  <Icon name={l.icon} className="size-[18px]" />
                </a>
              ))}
          </div>
        </motion.div>

        {/* Optional "open to …" pill: shown only when profile.openTo is filled in */}
        {profile.openTo && (
          <motion.p {...rise(0.36)} className="mt-10 inline-flex max-w-full items-center gap-2.5 self-start rounded-full border border-line bg-card/70 px-4 py-2 text-sm backdrop-blur">
            <span className="relative flex size-2 shrink-0">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            <span className="text-muted">{profile.openTo}</span>
          </motion.p>
        )}
        </div>

        <motion.div {...rise(0.2)} className="hidden lg:block">
          <Portrait eager className="rotate-[1.5deg] transition duration-500 hover:rotate-0" />
        </motion.div>
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-4 pb-6 sm:px-6">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4">
          {profile.stats.map((s) => (
            <div key={s.label} className="flex flex-col bg-paper/90 px-4 py-4 backdrop-blur sm:px-5">
              <dt className="order-2 mt-1 font-mono text-[11px] leading-snug text-muted uppercase">{s.label}</dt>
              <dd className="font-serif text-2xl font-medium sm:text-3xl">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
