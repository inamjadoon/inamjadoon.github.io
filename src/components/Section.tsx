import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'
import { sectionIndex, sections } from '../site'

/** Home-page section with the "01 — Label" mono index and a serif title. */
export function Section({
  id,
  title,
  intro,
  children,
}: {
  id: string
  title: ReactNode
  intro?: ReactNode
  children: ReactNode
}) {
  const label = sections.find((s) => s.id === id)?.label ?? ''
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
      <Reveal>
        <p className="mb-4 flex items-center gap-3 font-mono text-xs tracking-wider text-accent uppercase">
          <span>{sectionIndex(id)}</span>
          <span className="h-px w-8 bg-accent/60" />
          <span>{label}</span>
        </p>
        <h2 id={`${id}-title`} className="max-w-3xl font-serif text-3xl leading-tight font-medium tracking-tight sm:text-[2.6rem]">
          {title}
        </h2>
        {intro && <p className="mt-4 max-w-2xl text-muted">{intro}</p>}
      </Reveal>
      <div className="mt-12">{children}</div>
    </section>
  )
}

/** Fade-and-rise on first scroll into view. Disabled under reduced motion. */
export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion()
  if (reduce) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function Tag({ children, tone = 'plain' }: { children: ReactNode; tone?: 'plain' | 'accent' | 'amber' }) {
  const tones = {
    plain: 'border-line text-muted',
    accent: 'border-transparent bg-accent-soft text-accent',
    amber: 'border-transparent bg-amber-soft text-amber',
  }
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[11px] leading-5 ${tones[tone]}`}>
      {children}
    </span>
  )
}

export function ExternalLink({ href, children, className = '' }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  )
}
