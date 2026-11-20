import { profile } from '../content/load'

/** Framed portrait with a field-notes caption. Uses photo.webp when present beside photo.jpg. */
export default function Portrait({ className = '', eager = false }: { className?: string; eager?: boolean }) {
  if (!profile.photo) return null
  const webp = profile.photo.replace(/\.jpe?g$/i, '.webp')
  return (
    <figure className={`rounded-2xl border border-line bg-card p-2.5 shadow-[0_30px_60px_-35px_rgb(0_0_0/0.45)] ${className}`}>
      <picture>
        {webp !== profile.photo && <source srcSet={webp} type="image/webp" />}
        <img
          src={profile.photo}
          alt={`Portrait of ${profile.name}`}
          width={800}
          height={1000}
          loading={eager ? 'eager' : 'lazy'}
          className="aspect-[4/5] w-full rounded-xl object-cover"
        />
      </picture>
      <figcaption className="flex items-center justify-between px-1.5 pt-2.5 pb-0.5 font-mono text-[10.5px] text-muted uppercase">
        <span>{profile.name}</span>
        <span>{profile.location}</span>
      </figcaption>
    </figure>
  )
}
