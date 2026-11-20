import { Reveal, Section } from '../components/Section'
import { skills } from '../content/load'

export default function Skills() {
  return (
    <Section id="skills" title="Toolkit">
      <dl className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((g, i) => (
          <Reveal
            key={g.group}
            delay={Math.min(i, 5) * 0.04}
            // Let the last card fill the row so no empty cell shows.
            className={`bg-card p-6 ${
              i === skills.length - 1
                ? `${skills.length % 2 === 1 ? 'sm:col-span-2' : ''} ${skills.length % 3 === 2 ? 'lg:col-span-2' : skills.length % 3 === 1 ? 'lg:col-span-3' : 'lg:col-span-1'}`
                : ''
            }`}
          >
            <dt className="mb-3 font-mono text-xs tracking-wider text-accent uppercase">{g.group}</dt>
            <dd className="flex flex-wrap gap-x-3 gap-y-1.5 text-[15px]">
              {g.items.map((s, j) => (
                <span key={s} className="whitespace-nowrap">
                  {s}
                  {j < g.items.length - 1 && <span className="ml-3 text-line">/</span>}
                </span>
              ))}
            </dd>
          </Reveal>
        ))}
      </dl>
    </Section>
  )
}
