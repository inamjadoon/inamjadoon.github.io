import { Link } from 'react-router'
import Icon from '../components/Icon'

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-start justify-center px-4 pt-24 sm:px-6">
      <title>Page not found</title>
      <meta name="robots" content="noindex" />
      <p className="font-mono text-xs tracking-wider text-accent uppercase">404 · off the map</p>
      <h1 className="mt-3 font-serif text-5xl font-medium tracking-tight">This trail doesn't exist.</h1>
      <p className="mt-4 text-muted">The page may have moved. Head back to base camp.</p>
      <Link to="/" className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm text-paper hover:bg-accent hover:text-accent-ink">
        <Icon name="back" /> Home
      </Link>
    </div>
  )
}
