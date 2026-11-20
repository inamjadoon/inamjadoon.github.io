import Portrait from '../components/Portrait'
import { Reveal, Section } from '../components/Section'
import { education, profile } from '../content/load'

export default function About() {
  const edu = education[0]
  return (
    <Section id="about" title={<>A model is only useful once it reaches the people who need it.</>}>
      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <Reveal className="space-y-5 text-[1.0625rem] leading-relaxed">
          {profile.bio.map((p, i) => (
            <p key={i} className={i === 0 ? 'text-ink' : 'text-muted'}>
              {p}
            </p>
          ))}
        </Reveal>

        <Reveal delay={0.1} className="space-y-8">
          {/* On large screens the portrait sits in the hero instead */}
          <Portrait className="max-w-xs lg:hidden" />
          <div>
            <h3 className="mb-3 font-mono text-xs tracking-wider text-muted uppercase">Research interests</h3>
            <ul className="flex flex-wrap gap-2">
              {profile.interests.map((t) => (
                <li key={t} className="rounded-full border border-line bg-card px-3 py-1.5 text-sm">
                  {t}
                </li>
              ))}
            </ul>
          </div>
          {profile.offline.length > 0 && (
            <div>
              <h3 className="mb-3 font-mono text-xs tracking-wider text-muted uppercase">Outside work</h3>
              <p className="text-[15px]">{profile.offline.join(' · ')}</p>
            </div>
          )}
          {edu && (
            <div className="rounded-xl border border-line bg-card p-5">
              <h3 className="mb-2 font-mono text-xs tracking-wider text-muted uppercase">Education</h3>
              <p className="font-serif text-lg leading-snug">{edu.degree}</p>
              <p className="text-sm text-muted">{edu.institution}</p>
              {edu.grade && <p className="mt-2 font-mono text-sm text-accent">{edu.grade}</p>}
            </div>
          )}
          <p className="font-mono text-xs text-muted">Based in {profile.location}</p>
        </Reveal>
      </div>
    </Section>
  )
}
