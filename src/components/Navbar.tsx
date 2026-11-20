import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { profile } from '../content/load'
import { navItems } from '../site'
import Icon from './Icon'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background,border-color] duration-300 ${
        scrolled || open ? 'border-b border-line bg-paper/85 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6" aria-label="Main">
        <Link to="/" className="group flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="grid size-8 place-items-center rounded-lg bg-ink font-serif text-[15px] font-semibold text-paper">
            IK
          </span>
          <span className="font-serif text-[17px] font-medium tracking-tight">{profile.name}</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((s) => (
            <Link
              key={s.id}
              to={`/#${s.id}`}
              className="rounded-full px-3 py-1.5 text-sm text-muted transition hover:bg-accent-soft hover:text-ink"
            >
              {s.nav}
            </Link>
          ))}
          <Link
            to="/cv"
            className="ml-2 rounded-full bg-ink px-4 py-1.5 text-sm font-medium text-paper transition hover:bg-accent hover:text-accent-ink"
          >
            CV
          </Link>
          <span className="ml-2">
            <ThemeToggle />
          </span>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="grid size-9 place-items-center rounded-full border border-line"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            <Icon name={open ? 'close' : 'menu'} />
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-line px-4 pt-2 pb-5 md:hidden">
          {[...navItems.map((s) => ({ to: `/#${s.id}`, label: s.nav })), { to: '/cv', label: 'CV' }].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between border-b border-line py-3 font-serif text-lg"
            >
              {item.label}
              <Icon name="arrow" className="size-4 text-muted" />
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
