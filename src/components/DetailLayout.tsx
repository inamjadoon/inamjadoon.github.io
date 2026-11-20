import type { ReactNode } from 'react'
import { Link } from 'react-router'
import Icon from './Icon'

/** Shared layout for project and hackathon pages. */
export default function DetailLayout({
  back,
  kicker,
  title,
  tagline,
  aside,
  children,
}: {
  back: { to: string; label: string }
  kicker: ReactNode
  title: string
  tagline?: string
  aside: ReactNode
  children: ReactNode
}) {
  return (
    <article className="mx-auto max-w-6xl px-4 pt-28 pb-24 sm:px-6 sm:pt-36">
      <Link to={back.to} className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-accent">
        <Icon name="back" /> {back.label}
      </Link>
      <header className="mt-8 max-w-4xl">
        <div className="mb-4 flex flex-wrap items-center gap-2 font-mono text-xs text-muted uppercase">{kicker}</div>
        <h1 className="font-serif text-[clamp(2.2rem,6vw,4rem)] leading-[1.05] font-medium tracking-tight">{title}</h1>
        {tagline && <p className="mt-3 text-xl text-accent sm:text-2xl">{tagline}</p>}
      </header>
      <div className="mt-12 grid gap-12 border-t border-line pt-10 lg:grid-cols-[1fr_18rem]">
        <div className="min-w-0">{children}</div>
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">{aside}</aside>
      </div>
    </article>
  )
}

export function AsideBlock({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="mb-2 font-mono text-[11px] tracking-wider text-muted uppercase">{label}</h2>
      <div className="text-[15px]">{children}</div>
    </div>
  )
}
