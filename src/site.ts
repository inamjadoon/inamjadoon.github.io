import {
  certificates,
  education,
  experience,
  hackathons,
  honors,
  leadership,
  publications,
} from './content/load'

type Section = { id: string; label: string; nav?: string; show: boolean }

/**
 * Home-page sections in display order. `show: false` hides a section (e.g. no publications yet).
 * Section numbers (01, 02 …) are assigned automatically from this order. `nav` = label in the top menu.
 */
export const sections: Section[] = [
  { id: 'about', label: 'About', show: true },
  { id: 'research', label: 'Research & Projects', nav: 'Projects', show: true },
  { id: 'publications', label: 'Publications', nav: 'Publications', show: publications.length > 0 },
  { id: 'experience', label: 'Experience & Education', nav: 'Experience', show: experience.length + education.length > 0 },
  { id: 'competitions', label: 'Hackathons & Competitions', nav: 'Hackathons', show: hackathons.length > 0 },
  { id: 'honors', label: 'Honors & Certificates', nav: 'Honors', show: honors.length + certificates.length > 0 },
  { id: 'leadership', label: 'Leadership & Service', show: leadership.length > 0 },
  { id: 'skills', label: 'Skills', show: true },
  { id: 'contact', label: 'Contact', nav: 'Contact', show: true },
].filter((s) => s.show)

export const navItems = sections.filter((s) => s.nav)

export function sectionIndex(id: string) {
  return String(sections.findIndex((s) => s.id === id) + 1).padStart(2, '0')
}
