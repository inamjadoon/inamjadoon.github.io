import Icon from '../components/Icon'
import { profile } from '../content/load'

export default function CVPage() {
  const src = `/${profile.cv}`
  return (
    <>
      <title>{`CV — ${profile.name}`}</title>
      <div className="mx-auto max-w-5xl px-4 pt-28 pb-20 sm:px-6">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs tracking-wider text-accent uppercase">Curriculum Vitae</p>
            <h1 className="mt-2 font-serif text-4xl font-medium tracking-tight">{profile.name}</h1>
          </div>
          <div className="flex gap-2">
            <a
              href={src}
              download="Inam_Ullah_Khan_CV.pdf"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition hover:bg-accent hover:text-accent-ink"
            >
              <Icon name="download" /> Download PDF
            </a>
            <a
              href={src}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm transition hover:border-accent hover:text-accent"
            >
              <Icon name="external" /> Open
            </a>
          </div>
        </div>
        <object
          data={src}
          type="application/pdf"
          className="h-[80vh] w-full rounded-xl border border-line bg-card"
          aria-label={`CV of ${profile.name}`}
        >
          <p className="p-8 text-muted">
            Your browser can't show the PDF here.{' '}
            <a href={src} className="text-accent underline">
              Download the CV
            </a>
            .
          </p>
        </object>
      </div>
    </>
  )
}
