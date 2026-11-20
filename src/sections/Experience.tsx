import { Section } from '../components/Section'
import Timeline from '../components/Timeline'
import { education, experience } from '../content/load'

export default function Experience() {
  return (
    <Section id="experience" title="Experience & education" intro="Industry internships in AI and backend engineering, and current training in digital IC design.">
      <div className="grid gap-16 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <h3 className="mb-8 font-mono text-xs tracking-wider text-muted uppercase">Experience</h3>
          <Timeline
            items={experience.map((e) => ({
              key: e.slug,
              title: e.role,
              subtitle: e.org,
              kind: e.kind,
              start: e.start,
              end: e.end,
              link: e.link,
              linkLabel: e.linkLabel,
              highlights: e.highlights,
            }))}
          />
        </div>
        <div>
          <h3 className="mb-8 font-mono text-xs tracking-wider text-muted uppercase">Education</h3>
          <Timeline
            items={education.map((e) => ({
              key: e.slug,
              title: e.degree,
              subtitle: e.institution,
              meta: e.grade,
              start: e.start,
              end: e.end,
              link: e.link,
              linkLabel: e.linkLabel,
              highlights: e.highlights,
            }))}
          />
        </div>
      </div>
    </Section>
  )
}
