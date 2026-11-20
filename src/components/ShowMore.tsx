import { useState } from 'react'

/** Show the first `initial` items; a "See all" button reveals the rest. */
export function useShowMore<T>(items: T[], initial: number) {
  const [open, setOpen] = useState(false)
  const visible = open ? items : items.slice(0, initial)
  const hidden = items.length - visible.length
  return { visible, hidden, open, toggle: () => setOpen((o) => !o) }
}

export function ShowMoreButton({
  hidden,
  open,
  toggle,
  noun,
}: {
  hidden: number
  open: boolean
  toggle: () => void
  noun: string
}) {
  if (!open && hidden <= 0) return null
  return (
    <div className="mt-8 text-center">
      <button
        type="button"
        aria-expanded={open}
        onClick={toggle}
        className="rounded-full border border-line px-5 py-2.5 text-sm transition hover:border-accent hover:text-accent"
      >
        {open ? 'Show less' : `See ${hidden} more ${noun}`}
      </button>
    </div>
  )
}
