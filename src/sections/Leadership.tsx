import { Section } from '../components/Section'
import Timeline from '../components/Timeline'
import { leadership } from '../content/load'

export default function Leadership() {
  return (
    <Section id="leadership" title="Leadership & service" intro="Work outside the lab that shaped how I think about who technology is for.">
      <div className="max-w-3xl">
        <Timeline
          items={leadership.map((l) => ({
            key: l.slug,
            title: l.role,
            subtitle: l.org,
            start: l.start,
            end: l.end,
            link: l.link,
            linkLabel: l.linkLabel || 'Link',
            highlights: l.highlights,
          }))}
        />
      </div>
    </Section>
  )
}
