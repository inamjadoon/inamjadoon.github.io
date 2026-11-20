const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/** "2026-07" → "Jul 2026", "2026" → "2026", "" → "" */
export function formatDate(d: string): string {
  if (!d) return ''
  const [y, m] = d.split('-')
  return m ? `${MONTHS[Number(m) - 1]} ${y}` : y
}

/** Start/end → "Jul – Oct 2026", "2023 – 2025", "2026 – Present" */
export function formatRange(start: string, end: string): string {
  if (!start && !end) return ''
  if (!start) return formatDate(end)
  if (!end) return `${formatDate(start)} – Present`
  const [sy, sm] = start.split('-')
  const [ey, em] = end.split('-')
  if (sy === ey && sm && em) return `${MONTHS[Number(sm) - 1]} – ${MONTHS[Number(em) - 1]} ${ey}`
  return `${formatDate(start)} – ${formatDate(end)}`
}
